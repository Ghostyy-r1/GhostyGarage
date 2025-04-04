
<div align="center">
  
# 🏍️ Ghosty's Garage

[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![License](https://img.shields.io/badge/license-MIT-blue.svg)]()
[![Made with Love](https://img.shields.io/badge/Made%20with-❤️-red.svg)]()

**Connect · Ride · Thrive**

*A premium motorcycle community platform built with modern technology*

[📘 Documentation](#documentation) · [🚀 Getting Started](#getting-started) · [🛠️ Tech Stack](#tech-stack) · [📊 Features](#features)

---

</div>

## ✨ Features

<div align="center">
  
| Community | Events | Resources | Garage |
|:-:|:-:|:-:|:-:|
| Discord Integration | Ride Planning | Tutorial Library | Space Booking |
| Photo Galleries | Calendar Sync | Documentation | Equipment Access |
| Member Profiles | Route Sharing | Tech Support | Maintenance Tips |

</div>

## 🚀 Getting Started

### Prerequisites

- Node.js v20+
- MongoDB connection
- Replit account

### Quick Start

1️⃣ Clone this Repl

2️⃣ Set up environment variables in Secrets:
```env
MONGODB_URI=your_mongodb_connection_string
DATABASE_URL=your_postgresql_connection_string
```

3️⃣ Install dependencies:
```bash
npm install
```

4️⃣ Start development server:
```bash
npm run dev
```

## 🛠️ Tech Stack

<div align="center">

| Frontend | Backend | Database | Tools |
|:--------:|:-------:|:--------:|:-----:|
| React | Express | MongoDB | WebSocket |
| TypeScript | Node.js | PostgreSQL | Tailwind |
| Shadcn/UI | Drizzle ORM | - | Framer Motion |

</div>

## 📁 Project Structure

```
├── client/              # Frontend React application
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── hooks/      # Custom React hooks
│   │   ├── pages/      # Page components
│   │   └── types/      # TypeScript definitions
├── server/             # Backend Express application
│   ├── routes.ts      # API routes
│   ├── db.ts         # Database configuration
│   └── ai-chat.ts    # AI chat integration
└── shared/           # Shared code
    └── schema.ts    # Database schema
```

## 🔧 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run check` | TypeScript checking |
| `npm run db:push` | Push database changes |

## 🌟 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `MONGODB_URI` | MongoDB connection string | ✅ |
| `DATABASE_URL` | PostgreSQL connection string | ✅ |

## 🚀 Deployment

Deployment is streamlined through Replit:

1. Click the "Deploy" button
2. Follow the deployment wizard
3. Your app will be live instantly

## 🤝 Contributing

1. Fork the Repl
2. Create feature branch
3. Commit changes
4. Push to fork
5. Create Pull Request

## 📄 License

MIT © Ghosty's Garage

---

<div align="center">

**Built with 💜 on [Replit](https://replit.com)**

[⬆ Back to Top](#ghostys-garage)

</div>
