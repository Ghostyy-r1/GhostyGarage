import { 
  users, type User, type InsertUser,
  motorcycles, type Motorcycle, type InsertMotorcycle,
  motorcycleImages, type MotorcycleImage, type InsertMotorcycleImage,
  events, type Event, type InsertEvent,
  products, type Product, type InsertProduct,
  routes, type Route, type InsertRoute,
  maintenanceRecords, type MaintenanceRecord, type InsertMaintenanceRecord,
  gearReviews, type GearReview, type InsertGearReview,
  chatRooms, type ChatRoom, type InsertChatRoom,
  chatMessages, type ChatMessage, type InsertChatMessage,
  userPreferences, type UserPreferences, type InsertUserPreferences
} from "@shared/schema";
import { db } from "./db";
import { eq, and, desc, asc, sql } from "drizzle-orm";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Motorcycle methods
  getMotorcycle(id: number): Promise<Motorcycle | undefined>;
  getMotorcyclesByUserId(userId: number): Promise<Motorcycle[]>;
  createMotorcycle(motorcycle: InsertMotorcycle): Promise<Motorcycle>;
  
  // Motorcycle images
  getMotorcycleImages(motorcycleId: number): Promise<MotorcycleImage[]>;
  addMotorcycleImage(image: InsertMotorcycleImage): Promise<MotorcycleImage>;
  
  // Events
  getEvents(limit?: number, offset?: number): Promise<Event[]>;
  getEvent(id: number): Promise<Event | undefined>;
  createEvent(event: InsertEvent): Promise<Event>;
  
  // Products
  getProducts(limit?: number, offset?: number): Promise<Product[]>;
  getProduct(id: number): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;
  
  // Routes
  getRoutes(limit?: number, offset?: number): Promise<Route[]>;
  getRoute(id: number): Promise<Route | undefined>;
  createRoute(route: InsertRoute): Promise<Route>;
  
  // Maintenance records
  getMaintenanceRecords(motorcycleId: number): Promise<MaintenanceRecord[]>;
  getMaintenanceRecord(id: number): Promise<MaintenanceRecord | undefined>;
  createMaintenanceRecord(record: InsertMaintenanceRecord): Promise<MaintenanceRecord>;
  
  // Gear reviews
  getGearReviews(productId?: number, limit?: number, offset?: number): Promise<GearReview[]>;
  getGearReview(id: number): Promise<GearReview | undefined>;
  createGearReview(review: InsertGearReview): Promise<GearReview>;
  
  // Chat rooms
  getChatRooms(limit?: number, offset?: number): Promise<ChatRoom[]>;
  getChatRoom(id: number): Promise<ChatRoom | undefined>;
  createChatRoom(chatRoom: InsertChatRoom): Promise<ChatRoom>;
  
  // Chat messages
  getChatMessages(roomId: number, limit?: number, offset?: number): Promise<ChatMessage[]>;
  createChatMessage(message: InsertChatMessage): Promise<ChatMessage>;
  
  // User preferences
  getUserPreferences(userId: number): Promise<UserPreferences | undefined>;
  setUserPreferences(preferences: InsertUserPreferences): Promise<UserPreferences>;
}

export class DatabaseStorage implements IStorage {
  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }
  
  // Motorcycle methods
  async getMotorcycle(id: number): Promise<Motorcycle | undefined> {
    const [motorcycle] = await db.select().from(motorcycles).where(eq(motorcycles.id, id));
    return motorcycle;
  }
  
  async getMotorcyclesByUserId(userId: number): Promise<Motorcycle[]> {
    return db.select().from(motorcycles).where(eq(motorcycles.userId, userId));
  }
  
  async createMotorcycle(insertMotorcycle: InsertMotorcycle): Promise<Motorcycle> {
    const [motorcycle] = await db.insert(motorcycles).values(insertMotorcycle).returning();
    return motorcycle;
  }
  
  // Motorcycle images
  async getMotorcycleImages(motorcycleId: number): Promise<MotorcycleImage[]> {
    return db.select().from(motorcycleImages).where(eq(motorcycleImages.motorcycleId, motorcycleId));
  }
  
  async addMotorcycleImage(insertImage: InsertMotorcycleImage): Promise<MotorcycleImage> {
    const [image] = await db.insert(motorcycleImages).values(insertImage).returning();
    return image;
  }
  
  // Events
  async getEvents(limit = 10, offset = 0): Promise<Event[]> {
    return db.select().from(events).limit(limit).offset(offset).orderBy(desc(events.dateTime));
  }
  
  async getEvent(id: number): Promise<Event | undefined> {
    const [event] = await db.select().from(events).where(eq(events.id, id));
    return event;
  }
  
  async createEvent(insertEvent: InsertEvent): Promise<Event> {
    const [event] = await db.insert(events).values(insertEvent).returning();
    return event;
  }
  
  // Products
  async getProducts(limit = 10, offset = 0): Promise<Product[]> {
    return db.select().from(products).limit(limit).offset(offset);
  }
  
  async getProduct(id: number): Promise<Product | undefined> {
    const [product] = await db.select().from(products).where(eq(products.id, id));
    return product;
  }
  
  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const [product] = await db.insert(products).values(insertProduct).returning();
    return product;
  }
  
  // Routes
  async getRoutes(limit = 10, offset = 0): Promise<Route[]> {
    return db.select().from(routes).where(eq(routes.isPublic, true)).limit(limit).offset(offset);
  }
  
  async getRoute(id: number): Promise<Route | undefined> {
    const [route] = await db.select().from(routes).where(eq(routes.id, id));
    return route;
  }
  
  async createRoute(insertRoute: InsertRoute): Promise<Route> {
    const [route] = await db.insert(routes).values(insertRoute).returning();
    return route;
  }
  
  // Maintenance records
  async getMaintenanceRecords(motorcycleId: number): Promise<MaintenanceRecord[]> {
    return db.select().from(maintenanceRecords)
      .where(eq(maintenanceRecords.motorcycleId, motorcycleId))
      .orderBy(desc(maintenanceRecords.date));
  }
  
  async getMaintenanceRecord(id: number): Promise<MaintenanceRecord | undefined> {
    const [record] = await db.select().from(maintenanceRecords).where(eq(maintenanceRecords.id, id));
    return record;
  }
  
  async createMaintenanceRecord(insertRecord: InsertMaintenanceRecord): Promise<MaintenanceRecord> {
    const [record] = await db.insert(maintenanceRecords).values(insertRecord).returning();
    return record;
  }
  
  // Gear reviews
  async getGearReviews(productId?: number, limit = 10, offset = 0): Promise<GearReview[]> {
    if (productId) {
      return db.select().from(gearReviews)
        .where(eq(gearReviews.productId, productId))
        .limit(limit)
        .offset(offset)
        .orderBy(desc(gearReviews.createdAt));
    }
    
    return db.select().from(gearReviews)
      .limit(limit)
      .offset(offset)
      .orderBy(desc(gearReviews.createdAt));
  }
  
  async getGearReview(id: number): Promise<GearReview | undefined> {
    const [review] = await db.select().from(gearReviews).where(eq(gearReviews.id, id));
    return review;
  }
  
  async createGearReview(insertReview: InsertGearReview): Promise<GearReview> {
    const [review] = await db.insert(gearReviews).values(insertReview).returning();
    return review;
  }
  
  // Chat rooms
  async getChatRooms(limit = 10, offset = 0): Promise<ChatRoom[]> {
    return db.select().from(chatRooms).limit(limit).offset(offset);
  }
  
  async getChatRoom(id: number): Promise<ChatRoom | undefined> {
    const [room] = await db.select().from(chatRooms).where(eq(chatRooms.id, id));
    return room;
  }
  
  async createChatRoom(insertChatRoom: InsertChatRoom): Promise<ChatRoom> {
    const [room] = await db.insert(chatRooms).values(insertChatRoom).returning();
    return room;
  }
  
  // Chat messages
  async getChatMessages(roomId: number, limit = 50, offset = 0): Promise<ChatMessage[]> {
    return db.select().from(chatMessages)
      .where(eq(chatMessages.roomId, roomId))
      .limit(limit)
      .offset(offset)
      .orderBy(desc(chatMessages.sentAt));
  }
  
  async createChatMessage(insertMessage: InsertChatMessage): Promise<ChatMessage> {
    const [message] = await db.insert(chatMessages).values(insertMessage).returning();
    return message;
  }
  
  // User preferences
  async getUserPreferences(userId: number): Promise<UserPreferences | undefined> {
    const [preferences] = await db.select().from(userPreferences).where(eq(userPreferences.userId, userId));
    return preferences;
  }
  
  async setUserPreferences(insertPreferences: InsertUserPreferences): Promise<UserPreferences> {
    // Upsert operation for user preferences
    const [preferences] = await db
      .insert(userPreferences)
      .values(insertPreferences)
      .onConflictDoUpdate({
        target: userPreferences.userId,
        set: {
          theme: insertPreferences.theme,
          emailNotifications: insertPreferences.emailNotifications,
          pushNotifications: insertPreferences.pushNotifications,
          privacySettings: insertPreferences.privacySettings,
          displaySettings: insertPreferences.displaySettings,
          updatedAt: new Date(),
        },
      })
      .returning();
    
    return preferences;
  }
}

export const storage = new DatabaseStorage();
