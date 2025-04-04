
# Ghosty's Garage - Motorcycle Community Platform

A full-stack web application built with React, Express, and MongoDB, designed to connect motorcycle enthusiasts and provide valuable resources.

## Features

- Community engagement through Discord integration
- Event management and ride planning
- Resource library with tutorials and documentation
- Interactive garage space booking system
- Photo galleries for motorcycle enthusiasts
- Membership tiers with exclusive benefits

## Tech Stack

- Frontend: React, TypeScript, Tailwind CSS, Shadcn/UI
- Backend: Express.js, Node.js
- Database: MongoDB
- Real-time: WebSocket

## Prerequisites

- Node.js v20+
- MongoDB connection string

## Getting Started

1. Clone this Repl
2. Set up your MongoDB connection string in the Secrets tab (Environment Variables):
   - Add `MONGODB_URI` with your MongoDB connection URL

3. Install dependencies:
```bash
npm install
```

4. Start the development server:
```bash
npm run dev
```

The application will be available at port 5000.

## Project Structure

```
├── client/              # Frontend React application
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── hooks/       # Custom React hooks
│   │   ├── pages/       # Page components
│   │   └── types/       # TypeScript type definitions
├── server/              # Backend Express application
│   ├── routes.ts        # API routes
│   ├── db.ts           # Database configuration
│   └── ai-chat.ts      # AI chat integration
└── shared/             # Shared code between frontend and backend
    └── schema.ts       # Database schema
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run check` - TypeScript type checking
- `npm run db:push` - Push database schema changes

## Environment Variables

Required environment variables:
- `MONGODB_URI`: MongoDB connection string
- `DATABASE_URL`: PostgreSQL connection string (for Drizzle ORM)

Set these up in the Secrets tab of your Repl.

## Deployment

This project is configured for deployment on Replit. The deployment settings are already configured in the `.replit` file.

To deploy:
1. Click the "Deploy" button in your Repl
2. Follow the deployment wizard
3. Your app will be live at your Repl's URL

## Contributing

1. Fork the Repl
2. Create your feature branch
3. Commit your changes
4. Push to your fork
5. Create a new Pull Request

## License

MIT
