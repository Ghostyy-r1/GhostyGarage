import { 
  pgTable, 
  text, 
  serial, 
  integer, 
  boolean,
  varchar,
  timestamp,
  primaryKey,
  numeric,
  date,
  jsonb,
  real
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  displayName: text("display_name"),
  bio: text("bio"),
  avatarUrl: text("avatar_url"),
  isAdmin: boolean("is_admin").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

// Motorcycles table (for profiles)
export const motorcycles = pgTable("motorcycles", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id, { onDelete: 'cascade' }),
  make: text("make").notNull(),
  model: text("model").notNull(),
  year: integer("year"),
  description: text("description"),
  imageUrl: text("image_url"),
  color: text("color"),
  engineSize: text("engine_size"),
  bikeType: text("bike_type"), // cruiser, sport, touring, etc.
  mileage: integer("mileage"),
  modifications: text("modifications"),
  isPublic: boolean("is_public").default(true),
  isForSale: boolean("is_for_sale").default(false),
  askingPrice: integer("asking_price"), // If for sale
  isShowcaseFeature: boolean("is_showcase_feature").default(false), // For featured bikes
  voteCount: integer("vote_count").default(0), // For Bike of the Month
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Motorcycle images (multiple images per motorcycle)
export const motorcycleImages = pgTable("motorcycle_images", {
  id: serial("id").primaryKey(),
  motorcycleId: integer("motorcycle_id").notNull().references(() => motorcycles.id, { onDelete: 'cascade' }),
  imageUrl: text("image_url").notNull(),
  caption: text("caption"),
  isPrimary: boolean("is_primary").default(false),
  uploadedAt: timestamp("uploaded_at").defaultNow(),
});

// Motorcycle votes (for Bike of the Month)
export const motorcycleVotes = pgTable("motorcycle_votes", {
  userId: integer("user_id").notNull().references(() => users.id, { onDelete: 'cascade' }),
  motorcycleId: integer("motorcycle_id").notNull().references(() => motorcycles.id, { onDelete: 'cascade' }),
  votedAt: timestamp("voted_at").defaultNow(),
}, (t) => ({
  pk: primaryKey({ columns: [t.userId, t.motorcycleId] }),
}));

// Events table
export const events = pgTable("events", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  location: text("location").notNull(),
  dateTime: timestamp("date_time").notNull(),
  imageUrl: text("image_url"),
  createdBy: integer("created_by").references(() => users.id, { onDelete: 'set null' }),
  createdAt: timestamp("created_at").defaultNow(),
});

// Event registrations (users attending events)
export const eventRegistrations = pgTable("event_registrations", {
  userId: integer("user_id").notNull().references(() => users.id, { onDelete: 'cascade' }),
  eventId: integer("event_id").notNull().references(() => events.id, { onDelete: 'cascade' }),
  createdAt: timestamp("created_at").defaultNow(),
}, (t) => ({
  pk: primaryKey({ columns: [t.userId, t.eventId] }),
}));

// Blog posts
export const blogPosts = pgTable("blog_posts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  imageUrl: text("image_url"),
  authorId: integer("author_id").references(() => users.id, { onDelete: 'set null' }),
  publishedAt: timestamp("published_at").defaultNow(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Comments on blog posts
export const comments = pgTable("comments", {
  id: serial("id").primaryKey(),
  content: text("content").notNull(),
  userId: integer("user_id").references(() => users.id, { onDelete: 'cascade' }),
  postId: integer("post_id").references(() => blogPosts.id, { onDelete: 'cascade' }),
  createdAt: timestamp("created_at").defaultNow(),
});

// Merchandise products
export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: integer("price").notNull(), // Stored in cents
  imageUrl: text("image_url"),
  inventory: integer("inventory").default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

// Galleries to showcase community photos
export const galleries = pgTable("galleries", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  createdBy: integer("created_by").references(() => users.id, { onDelete: 'set null' }),
  createdAt: timestamp("created_at").defaultNow(),
});

// Gallery photos
export const galleryPhotos = pgTable("gallery_photos", {
  id: serial("id").primaryKey(),
  galleryId: integer("gallery_id").notNull().references(() => galleries.id, { onDelete: 'cascade' }),
  imageUrl: text("image_url").notNull(),
  caption: text("caption"),
  uploadedBy: integer("uploaded_by").references(() => users.id, { onDelete: 'set null' }),
  uploadedAt: timestamp("uploaded_at").defaultNow(),
});

// Routes for ride planning
export const routes = pgTable("routes", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  distance: numeric("distance"), // in miles/km
  duration: integer("duration"), // in minutes
  difficulty: text("difficulty"), // easy, moderate, challenging
  createdBy: integer("created_by").references(() => users.id, { onDelete: 'set null' }),
  startLocation: text("start_location").notNull(),
  endLocation: text("end_location").notNull(),
  mapData: jsonb("map_data"), // store the route polyline/waypoints
  imageUrl: text("image_url"),
  isPublic: boolean("is_public").default(true),
  ratingAvg: real("rating_avg").default(0),
  ratingCount: integer("rating_count").default(0),
  viewCount: integer("view_count").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Route points of interest
export const routeWaypoints = pgTable("route_waypoints", {
  id: serial("id").primaryKey(),
  routeId: integer("route_id").notNull().references(() => routes.id, { onDelete: 'cascade' }),
  name: text("name").notNull(),
  description: text("description"),
  latitude: real("latitude").notNull(),
  longitude: real("longitude").notNull(),
  waypointType: text("waypoint_type"), // scenic, food, gas, rest, etc.
  imageUrl: text("image_url"),
  stopOrder: integer("stop_order"), // sequence in the route
});

// Route reviews
export const routeReviews = pgTable("route_reviews", {
  id: serial("id").primaryKey(),
  routeId: integer("route_id").notNull().references(() => routes.id, { onDelete: 'cascade' }),
  userId: integer("user_id").notNull().references(() => users.id, { onDelete: 'cascade' }),
  rating: integer("rating").notNull(), // 1-5 stars
  comment: text("comment"),
  rideDate: date("ride_date"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Maintenance records
export const maintenanceRecords = pgTable("maintenance_records", {
  id: serial("id").primaryKey(),
  motorcycleId: integer("motorcycle_id").notNull().references(() => motorcycles.id, { onDelete: 'cascade' }),
  title: text("title").notNull(), // e.g., "Oil Change", "Chain Maintenance"
  description: text("description"),
  date: date("date").notNull(),
  mileage: integer("mileage"),
  cost: integer("cost"), // in cents
  serviceProvider: text("service_provider"), // DIY or shop name
  documents: text("documents").array(), // array of document URLs
  nextDueDate: date("next_due_date"),
  nextDueMileage: integer("next_due_mileage"),
  isRecurring: boolean("is_recurring").default(false),
  recurringInterval: integer("recurring_interval"), // in days or miles
  recurringIntervalType: text("recurring_interval_type"), // "days" or "miles"
  createdAt: timestamp("created_at").defaultNow(),
});

// Gear reviews
export const gearReviews = pgTable("gear_reviews", {
  id: serial("id").primaryKey(), 
  userId: integer("user_id").notNull().references(() => users.id, { onDelete: 'cascade' }),
  productId: integer("product_id").references(() => products.id, { onDelete: 'set null' }),
  title: text("title").notNull(),
  content: text("content").notNull(),
  overallRating: integer("overall_rating").notNull(), // 1-5 stars
  comfortRating: integer("comfort_rating"), // 1-5 stars
  durabilityRating: integer("durability_rating"), // 1-5 stars
  valueRating: integer("value_rating"), // 1-5 stars
  images: text("images").array(),
  pros: text("pros"),
  cons: text("cons"),
  verifiedPurchase: boolean("verified_purchase").default(false),
  helpfulVotes: integer("helpful_votes").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// User achievements/badges
export const userAchievements = pgTable("user_achievements", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id, { onDelete: 'cascade' }),
  achievementType: text("achievement_type").notNull(), // e.g., "event_attendance", "route_creator"
  achievementLevel: integer("achievement_level").default(1),
  unlockedAt: timestamp("unlocked_at").defaultNow(),
  progress: integer("progress").default(0),
  progressTarget: integer("progress_target").default(1),
});

// Chat rooms
export const chatRooms = pgTable("chat_rooms", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  isPrivate: boolean("is_private").default(false),
  createdBy: integer("created_by").references(() => users.id, { onDelete: 'set null' }),
  topic: text("topic"), // e.g., "cruisers", "sport_bikes", "tech_help"
  imageUrl: text("image_url"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Chat messages
export const chatMessages = pgTable("chat_messages", {
  id: serial("id").primaryKey(),
  roomId: integer("room_id").notNull().references(() => chatRooms.id, { onDelete: 'cascade' }),
  userId: integer("user_id").notNull().references(() => users.id, { onDelete: 'cascade' }),
  message: text("message").notNull(),
  sentAt: timestamp("sent_at").defaultNow(),
  isEdited: boolean("is_edited").default(false),
  attachments: jsonb("attachments"), // For images, links, etc.
});

// User room memberships
export const chatRoomMembers = pgTable("chat_room_members", {
  roomId: integer("room_id").notNull().references(() => chatRooms.id, { onDelete: 'cascade' }),
  userId: integer("user_id").notNull().references(() => users.id, { onDelete: 'cascade' }),
  joinedAt: timestamp("joined_at").defaultNow(),
  isAdmin: boolean("is_admin").default(false),
  isMuted: boolean("is_muted").default(false),
}, (t) => ({
  pk: primaryKey({ columns: [t.roomId, t.userId] }),
}));

// User preferences
export const userPreferences = pgTable("user_preferences", {
  userId: integer("user_id").notNull().references(() => users.id, { onDelete: 'cascade' }).primaryKey(),
  theme: text("theme").default("dark"), // dark, light, system
  emailNotifications: boolean("email_notifications").default(true),
  pushNotifications: boolean("push_notifications").default(true),
  privacySettings: jsonb("privacy_settings"), // JSON object with privacy settings
  displaySettings: jsonb("display_settings"), // JSON object with display settings
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Weather forecast cache for ride planning
export const weatherForecasts = pgTable("weather_forecasts", {
  id: serial("id").primaryKey(),
  location: text("location").notNull(),
  forecastDate: date("forecast_date").notNull(),
  forecastData: jsonb("forecast_data").notNull(),
  fetchedAt: timestamp("fetched_at").defaultNow(),
  expiresAt: timestamp("expires_at").notNull(),
});

// API integrations
export const apiIntegrations = pgTable("api_integrations", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id, { onDelete: 'cascade' }),
  provider: text("provider").notNull(), // e.g., "google_maps", "weather_api"
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  tokenExpiry: timestamp("token_expiry"),
  scope: text("scope"),
  isEnabled: boolean("is_enabled").default(true),
  lastUsed: timestamp("last_used"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Create insert schemas
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
  isAdmin: true,
});

export const insertMotorcycleSchema = createInsertSchema(motorcycles).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  voteCount: true,
});

export const insertMotorcycleImageSchema = createInsertSchema(motorcycleImages).omit({
  id: true,
  uploadedAt: true,
});

export const insertEventSchema = createInsertSchema(events).omit({
  id: true,
  createdAt: true,
});

export const insertBlogPostSchema = createInsertSchema(blogPosts).omit({
  id: true,
  createdAt: true,
});

export const insertProductSchema = createInsertSchema(products).omit({
  id: true,
  createdAt: true,
});

export const insertRouteSchema = createInsertSchema(routes).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  ratingAvg: true,
  ratingCount: true,
  viewCount: true,
});

export const insertMaintenanceRecordSchema = createInsertSchema(maintenanceRecords).omit({
  id: true,
  createdAt: true,
});

export const insertGearReviewSchema = createInsertSchema(gearReviews).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  helpfulVotes: true,
});

export const insertChatRoomSchema = createInsertSchema(chatRooms).omit({
  id: true,
  createdAt: true,
});

export const insertChatMessageSchema = createInsertSchema(chatMessages).omit({
  id: true,
  sentAt: true,
  isEdited: true,
});

export const insertUserPreferencesSchema = createInsertSchema(userPreferences).omit({
  updatedAt: true,
});

// Export types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertMotorcycle = z.infer<typeof insertMotorcycleSchema>;
export type Motorcycle = typeof motorcycles.$inferSelect;

export type InsertMotorcycleImage = z.infer<typeof insertMotorcycleImageSchema>;
export type MotorcycleImage = typeof motorcycleImages.$inferSelect;

export type InsertEvent = z.infer<typeof insertEventSchema>;
export type Event = typeof events.$inferSelect;

export type InsertBlogPost = z.infer<typeof insertBlogPostSchema>;
export type BlogPost = typeof blogPosts.$inferSelect;

export type InsertProduct = z.infer<typeof insertProductSchema>;
export type Product = typeof products.$inferSelect;

export type InsertRoute = z.infer<typeof insertRouteSchema>;
export type Route = typeof routes.$inferSelect;

export type InsertMaintenanceRecord = z.infer<typeof insertMaintenanceRecordSchema>;
export type MaintenanceRecord = typeof maintenanceRecords.$inferSelect;

export type InsertGearReview = z.infer<typeof insertGearReviewSchema>;
export type GearReview = typeof gearReviews.$inferSelect;

export type InsertChatRoom = z.infer<typeof insertChatRoomSchema>;
export type ChatRoom = typeof chatRooms.$inferSelect;

export type InsertChatMessage = z.infer<typeof insertChatMessageSchema>;
export type ChatMessage = typeof chatMessages.$inferSelect;

export type InsertUserPreferences = z.infer<typeof insertUserPreferencesSchema>;
export type UserPreferences = typeof userPreferences.$inferSelect;
