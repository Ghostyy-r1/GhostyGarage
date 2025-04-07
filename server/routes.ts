import axios from 'axios';
import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { WebSocketServer, WebSocket } from "ws";
import { insertUserSchema, insertMotorcycleSchema, insertEventSchema, insertRouteSchema, insertMaintenanceRecordSchema, insertGearReviewSchema, insertChatRoomSchema, insertChatMessageSchema, insertUserPreferencesSchema } from "@shared/schema";
import { log } from "./vite";
import { z } from "zod";
import { getGhostyResponse, type ChatMessage } from "./ai-chat";

// Discord API endpoints
const DISCORD_API_BASE = 'https://discord.com/api/v10';
const DISCORD_CDN_BASE = 'https://cdn.discordapp.com';

export async function getDiscordServerInfo(req: Request, res: Response) {
  const serverId = '1295517643243130920';
  const botToken = process.env.DISCORD_BOT_TOKEN;

  if (!botToken) {
    return res.status(200).json({
      name: "Ghosty's Garage",
      description: "Join our motorcycle community!",
      memberCount: 0,
      presenceCount: 0,
      channels: [],
      inviteUrl: 'https://discord.gg/h6QUNDjs'
    });
  }

  try {
    const [serverInfo, channels] = await Promise.all([
      axios.get(`${DISCORD_API_BASE}/guilds/${serverId}`, {
        headers: { Authorization: `Bot ${botToken}` }
      }),
      axios.get(`${DISCORD_API_BASE}/guilds/${serverId}/channels`, {
        headers: { Authorization: `Bot ${botToken}` }
      })
    ]);

    const onlineMembers = await axios.get(`${DISCORD_API_BASE}/guilds/${serverId}/preview`, {
      headers: { Authorization: `Bot ${botToken}` }
    });

    return res.json({
      name: serverInfo.data.name,
      icon: serverInfo.data.icon ? 
        `${DISCORD_CDN_BASE}/icons/${serverId}/${serverInfo.data.icon}.${serverInfo.data.icon.startsWith('a_') ? 'gif' : 'png'}` : null,
      banner: serverInfo.data.banner ?
        `${DISCORD_CDN_BASE}/banners/${serverId}/${serverInfo.data.banner}.${serverInfo.data.banner.startsWith('a_') ? 'gif' : 'png'}` : null,
      description: serverInfo.data.description,
      memberCount: serverInfo.data.approximate_member_count,
      presenceCount: serverInfo.data.approximate_presence_count,
      channels: channels.data.filter((c: any) => c.type === 0).slice(0, 3),
      inviteUrl: 'https://discord.gg/h6QUNDjs'
    });
  } catch (error) {
    console.error('Discord API error:', error);
    return res.status(500).json({ error: 'Failed to fetch Discord server info' });
  }
}

// Middleware to handle API errors
function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  console.error(err);
  
  if (err instanceof z.ZodError) {
    return res.status(400).json({
      error: "Validation error",
      details: err.format(),
    });
  }
  
  return res.status(500).json({
    error: "Internal server error",
    message: err.message,
  });
}

// Helper to validate request body against schema
function validateBody<T extends z.ZodSchema>(schema: T) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = await schema.parseAsync(req.body);
      next();
    } catch (error) {
      next(error);
    }
  };
}

// Register all routes
export async function registerRoutes(app: Express): Promise<Server> {
  // Discord endpoints
  app.get('/api/discord/server-info', getDiscordServerInfo);

  // Create HTTP server 
  const httpServer = createServer(app);

  // Initialize WebSocket server
  const wss = new WebSocketServer({ server: httpServer, path: '/ws' });

  // Store connected clients
  const clients = new Map<WebSocket, {
    userId?: number,
    username?: string,
    aiConversation?: ChatMessage[]
  }>();

  // WebSocket connection handling
  wss.on('connection', (ws) => {
    clients.set(ws, { aiConversation: [] });

    ws.on('message', async (data) => {
      try {
        const message = JSON.parse(data.toString());

        switch (message.type) {
          case 'auth':
            if (message.userId && message.username) {
              clients.set(ws, {
                ...clients.get(ws),
                userId: message.userId,
                username: message.username
              });
            }
            break;

          case 'chat':
            if (message.roomId && message.content && clients.get(ws)?.userId) {
              const userId = clients.get(ws)?.userId;
              const chatMessage = await storage.createChatMessage({
                roomId: message.roomId,
                userId: userId!,
                message: message.content,
              });

              wss.clients.forEach((client) => {
                if (client.readyState === WebSocket.OPEN) {
                  client.send(JSON.stringify({
                    type: 'chat',
                    roomId: message.roomId,
                    messageId: chatMessage.id,
                    userId: userId,
                    username: clients.get(ws)?.username,
                    content: message.content,
                    timestamp: chatMessage.sentAt,
                  }));
                }
              });
            }
            break;

          case 'ai_chat':
            if (message.content) {
              const client = clients.get(ws);
              const conversation = client?.aiConversation || [];

              if (conversation.length > 10) {
                conversation.splice(0, conversation.length - 10);
              }

              conversation.push({ role: 'user', content: message.content });

              try {
                const response = await getGhostyResponse(message.content, conversation);
                conversation.push({ role: 'assistant', content: response });

                clients.set(ws, {
                  ...client,
                  aiConversation: conversation
                });

                ws.send(JSON.stringify({
                  type: 'ai_chat',
                  content: response,
                  timestamp: new Date().toISOString()
                }));
              } catch (error) {
                ws.send(JSON.stringify({
                  type: 'ai_chat',
                  content: "Sorry, I encountered an error. Please try again.",
                  error: true,
                  timestamp: new Date().toISOString()
                }));
              }
            }
            break;
        }
      } catch (error) {
        console.error('WebSocket message error:', error);
      }
    });

    ws.on('close', () => {
      clients.delete(ws);
    });

    ws.send(JSON.stringify({
      type: 'connected',
      timestamp: new Date().toISOString()
    }));
  });

  // REST API Routes
  // Users
  app.get('/api/users/:id', async (req, res, next) => {
    try {
      const userId = parseInt(req.params.id);
      const user = await storage.getUser(userId);
      
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      
      res.json(user);
    } catch (error) {
      next(error);
    }
  });
  
  app.post('/api/users', validateBody(insertUserSchema), async (req, res, next) => {
    try {
      const existingUser = await storage.getUserByUsername(req.body.username);
      
      if (existingUser) {
        return res.status(409).json({ error: 'Username already taken' });
      }
      
      const user = await storage.createUser(req.body);
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  });
  
  // Motorcycles
  app.get('/api/motorcycles', async (req, res, next) => {
    try {
      const userId = req.query.userId ? parseInt(req.query.userId as string) : undefined;
      
      if (userId) {
        const motorcycles = await storage.getMotorcyclesByUserId(userId);
        return res.json(motorcycles);
      }
      
      return res.status(400).json({ error: 'Missing userId parameter' });
    } catch (error) {
      next(error);
    }
  });
  
  app.get('/api/motorcycles/:id', async (req, res, next) => {
    try {
      const motorcycleId = parseInt(req.params.id);
      const motorcycle = await storage.getMotorcycle(motorcycleId);
      
      if (!motorcycle) {
        return res.status(404).json({ error: 'Motorcycle not found' });
      }
      
      res.json(motorcycle);
    } catch (error) {
      next(error);
    }
  });
  
  app.post('/api/motorcycles', validateBody(insertMotorcycleSchema), async (req, res, next) => {
    try {
      const motorcycle = await storage.createMotorcycle(req.body);
      res.status(201).json(motorcycle);
    } catch (error) {
      next(error);
    }
  });
  
  // Motorcycle images
  app.get('/api/motorcycles/:id/images', async (req, res, next) => {
    try {
      const motorcycleId = parseInt(req.params.id);
      const images = await storage.getMotorcycleImages(motorcycleId);
      res.json(images);
    } catch (error) {
      next(error);
    }
  });
  
  // Events
  app.get('/api/events', async (req, res, next) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
      const offset = req.query.offset ? parseInt(req.query.offset as string) : 0;
      
      const events = await storage.getEvents(limit, offset);
      res.json(events);
    } catch (error) {
      next(error);
    }
  });
  
  app.get('/api/events/:id', async (req, res, next) => {
    try {
      const eventId = parseInt(req.params.id);
      const event = await storage.getEvent(eventId);
      
      if (!event) {
        return res.status(404).json({ error: 'Event not found' });
      }
      
      res.json(event);
    } catch (error) {
      next(error);
    }
  });
  
  app.post('/api/events', validateBody(insertEventSchema), async (req, res, next) => {
    try {
      const event = await storage.createEvent(req.body);
      res.status(201).json(event);
    } catch (error) {
      next(error);
    }
  });
  
  // Products
  app.get('/api/products', async (req, res, next) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
      const offset = req.query.offset ? parseInt(req.query.offset as string) : 0;
      
      const products = await storage.getProducts(limit, offset);
      res.json(products);
    } catch (error) {
      next(error);
    }
  });
  
  app.get('/api/products/:id', async (req, res, next) => {
    try {
      const productId = parseInt(req.params.id);
      const product = await storage.getProduct(productId);
      
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
      
      res.json(product);
    } catch (error) {
      next(error);
    }
  });
  
  // Routes
  app.get('/api/routes', async (req, res, next) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
      const offset = req.query.offset ? parseInt(req.query.offset as string) : 0;
      
      const routes = await storage.getRoutes(limit, offset);
      res.json(routes);
    } catch (error) {
      next(error);
    }
  });
  
  app.get('/api/routes/:id', async (req, res, next) => {
    try {
      const routeId = parseInt(req.params.id);
      const route = await storage.getRoute(routeId);
      
      if (!route) {
        return res.status(404).json({ error: 'Route not found' });
      }
      
      res.json(route);
    } catch (error) {
      next(error);
    }
  });
  
  app.post('/api/routes', validateBody(insertRouteSchema), async (req, res, next) => {
    try {
      const route = await storage.createRoute(req.body);
      res.status(201).json(route);
    } catch (error) {
      next(error);
    }
  });
  
  // Maintenance records
  app.get('/api/maintenance/:motorcycleId', async (req, res, next) => {
    try {
      const motorcycleId = parseInt(req.params.motorcycleId);
      const records = await storage.getMaintenanceRecords(motorcycleId);
      res.json(records);
    } catch (error) {
      next(error);
    }
  });
  
  app.get('/api/maintenance/record/:id', async (req, res, next) => {
    try {
      const recordId = parseInt(req.params.id);
      const record = await storage.getMaintenanceRecord(recordId);
      
      if (!record) {
        return res.status(404).json({ error: 'Maintenance record not found' });
      }
      
      res.json(record);
    } catch (error) {
      next(error);
    }
  });
  
  app.post('/api/maintenance', validateBody(insertMaintenanceRecordSchema), async (req, res, next) => {
    try {
      const record = await storage.createMaintenanceRecord(req.body);
      res.status(201).json(record);
    } catch (error) {
      next(error);
    }
  });
  
  // Gear reviews
  app.get('/api/gear-reviews', async (req, res, next) => {
    try {
      const productId = req.query.productId ? parseInt(req.query.productId as string) : undefined;
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
      const offset = req.query.offset ? parseInt(req.query.offset as string) : 0;
      
      const reviews = await storage.getGearReviews(productId, limit, offset);
      res.json(reviews);
    } catch (error) {
      next(error);
    }
  });
  
  app.get('/api/gear-reviews/:id', async (req, res, next) => {
    try {
      const reviewId = parseInt(req.params.id);
      const review = await storage.getGearReview(reviewId);
      
      if (!review) {
        return res.status(404).json({ error: 'Gear review not found' });
      }
      
      res.json(review);
    } catch (error) {
      next(error);
    }
  });
  
  app.post('/api/gear-reviews', validateBody(insertGearReviewSchema), async (req, res, next) => {
    try {
      const review = await storage.createGearReview(req.body);
      res.status(201).json(review);
    } catch (error) {
      next(error);
    }
  });
  
  // Chat rooms
  app.get('/api/chat/rooms', async (req, res, next) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
      const offset = req.query.offset ? parseInt(req.query.offset as string) : 0;
      
      const rooms = await storage.getChatRooms(limit, offset);
      res.json(rooms);
    } catch (error) {
      next(error);
    }
  });
  
  app.get('/api/chat/rooms/:id', async (req, res, next) => {
    try {
      const roomId = parseInt(req.params.id);
      const room = await storage.getChatRoom(roomId);
      
      if (!room) {
        return res.status(404).json({ error: 'Chat room not found' });
      }
      
      res.json(room);
    } catch (error) {
      next(error);
    }
  });
  
  app.post('/api/chat/rooms', validateBody(insertChatRoomSchema), async (req, res, next) => {
    try {
      const room = await storage.createChatRoom(req.body);
      res.status(201).json(room);
    } catch (error) {
      next(error);
    }
  });
  
  // Chat messages
  app.get('/api/chat/messages/:roomId', async (req, res, next) => {
    try {
      const roomId = parseInt(req.params.roomId);
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 50;
      const offset = req.query.offset ? parseInt(req.query.offset as string) : 0;
      
      const messages = await storage.getChatMessages(roomId, limit, offset);
      res.json(messages);
    } catch (error) {
      next(error);
    }
  });
  
  // User preferences
  app.get('/api/user-preferences/:userId', async (req, res, next) => {
    try {
      const userId = parseInt(req.params.userId);
      const preferences = await storage.getUserPreferences(userId);
      
      if (!preferences) {
        return res.status(404).json({ error: 'User preferences not found' });
      }
      
      res.json(preferences);
    } catch (error) {
      next(error);
    }
  });
  
  app.post('/api/user-preferences', validateBody(insertUserPreferencesSchema), async (req, res, next) => {
    try {
      const preferences = await storage.setUserPreferences(req.body);
      res.status(201).json(preferences);
    } catch (error) {
      next(error);
    }
  });
  
  // AI Chat endpoint
  app.post('/api/ai-chat', async (req, res, next) => {
    try {
      const { message, conversationHistory = [] } = req.body;
      
      if (!message) {
        return res.status(400).json({ error: 'Message is required' });
      }
      
      // Get AI response
      const response = await getGhostyResponse(message, conversationHistory);
      
      res.json({
        message: response,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      next(error);
    }
  });
  
  // Apply error handler middleware
  app.use('/api', errorHandler);
  
  return httpServer;
}