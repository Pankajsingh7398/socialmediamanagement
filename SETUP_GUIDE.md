# Rudraksha Pvt Ltd - Website Setup Guide

## Project Overview

This is a full-stack MERN website for Rudraksha Pvt Ltd with:
- **Frontend:** React 19 + TypeScript + Tailwind CSS 4 + Vite
- **Backend:** Node.js + Express + tRPC
- **Database:** MySQL with Drizzle ORM (currently configured, can be switched to MongoDB)
- **Features:** Interactive hero with water ripples, service request forms, contact forms, PR marketing requests

## Prerequisites

Before starting, ensure you have installed:
- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **pnpm** (v8 or higher) - Install via: `npm install -g pnpm`
- **MySQL** (v8 or higher) - [Download](https://www.mysql.com/downloads/)

## Installation Steps

### 1. Extract and Navigate to Project

```bash
# Extract the ZIP file
unzip rudraksha_website.zip
cd rudraksha_website
```

### 2. Install Dependencies

```bash
# Install all project dependencies
pnpm install
```

### 3. Setup Environment Variables

Create a `.env` file in the project root with the following:

```env
# Database Configuration
DATABASE_URL=mysql://root:password@localhost:3306/rudraksha_db

# JWT Secret (generate a random string)
JWT_SECRET=your_random_jwt_secret_key_here

# OAuth Configuration (optional for local development)
VITE_APP_ID=your_app_id
OAUTH_SERVER_URL=https://api.manus.im
VITE_OAUTH_PORTAL_URL=https://portal.manus.im

# App Configuration
VITE_APP_TITLE=Rudraksha Pvt Ltd
OWNER_NAME=Your Name
OWNER_OPEN_ID=your_open_id

# Analytics (optional)
VITE_ANALYTICS_ENDPOINT=
VITE_ANALYTICS_WEBSITE_ID=

# Built-in APIs (optional for Manus platform)
BUILT_IN_FORGE_API_URL=
BUILT_IN_FORGE_API_KEY=
VITE_FRONTEND_FORGE_API_URL=
VITE_FRONTEND_FORGE_API_KEY=
```

### 4. Setup Database

#### Option A: Using MySQL (Current Setup)

```bash
# Create the database
mysql -u root -p -e "CREATE DATABASE rudraksha_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"

# Run migrations
pnpm db:push
```

#### Option B: Switch to MongoDB

1. Install MongoDB locally or use MongoDB Atlas (cloud)

2. Update `.env`:
```env
DATABASE_URL=mongodb://localhost:27017/rudraksha_db
# Or for MongoDB Atlas:
# DATABASE_URL=mongodb+srv://username:password@cluster.mongodb.net/rudraksha_db
```

3. Update `drizzle.config.ts`:
```typescript
export default defineConfig({
  schema: "./drizzle/schema.ts",
  driver: "better-sqlite", // Change to "mongodb" if using MongoDB
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
```

4. Install MongoDB driver:
```bash
pnpm add drizzle-orm-mongodb
```

### 5. Start Development Server

```bash
# Start the development server
pnpm dev
```

The application will be available at: `http://localhost:3000`

## Project Structure

```
rudraksha_website/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── lib/           # Utilities and helpers
│   │   ├── App.tsx        # Main app component
│   │   └── index.css      # Global styles
│   └── index.html         # HTML entry point
├── server/                # Node.js/Express backend
│   ├── routers.ts         # tRPC route definitions
│   ├── db.ts              # Database queries
│   ├── _core/             # Core backend utilities
│   └── storage.ts         # S3 storage helpers
├── drizzle/               # Database schema and migrations
│   ├── schema.ts          # Database tables
│   └── migrations/        # SQL migrations
├── shared/                # Shared types and constants
├── .env                   # Environment variables (create this)
├── package.json           # Dependencies
├── vite.config.ts         # Vite configuration
└── tsconfig.json          # TypeScript configuration
```

## Key Features

### 1. Interactive Hero Section
- Water circle background with cursor effects
- Twinkling stars animation
- Responsive on mobile with touch support
- Smooth fade-in animations

### 2. Services Section
- 9 service cards with glassmorphism design
- Click any service to open service-specific request form
- Hover effects with neon accents
- Responsive grid layout

### 3. Service Request Forms
Each service has a dedicated form with fields for:
- Name, Email, Phone
- Company Name
- Budget Range
- Timeline
- Project Description
- Additional Information

### 4. Contact Form
- Minimized 3-field form (Name, Email, Message)
- Backend integration with database storage
- Success/error feedback

### 5. PR Marketing Form
- Comprehensive form with 10+ fields
- Modal popup accessible from header
- Budget and timeline selection
- Target audience and PR objectives

## Available Scripts

```bash
# Development
pnpm dev              # Start dev server

# Build
pnpm build            # Build for production

# Database
pnpm db:push          # Generate and run migrations

# Testing
pnpm test             # Run tests with Vitest

# Code Quality
pnpm check            # TypeScript type checking
pnpm format           # Format code with Prettier
```

## Making Changes

### Adding a New Service

1. Edit `client/src/components/ServicesSection.tsx`:
```typescript
const services = [
  // ... existing services
  {
    id: 'new-service',
    icon: YourIcon,
    title: 'New Service Name',
    description: 'Service description',
    accent: 'cyan', // cyan, magenta, or green
  },
];
```

### Customizing Colors

Edit `client/src/index.css` to change the cyberpunk color scheme:
```css
@theme {
  --color-cyan: #00D9FF;
  --color-magenta: #FF006E;
  --color-green: #39FF14;
  --color-background: #0F1419;
}
```

### Adding New API Endpoints

1. Add procedure to `server/routers.ts`:
```typescript
export const appRouter = router({
  myFeature: router({
    getData: publicProcedure
      .input(z.object({ id: z.string() }))
      .query(async ({ input }) => {
        // Your logic here
      }),
  }),
});
```

2. Use in frontend:
```typescript
const { data } = trpc.myFeature.getData.useQuery({ id: '123' });
```

### Connecting to Database

Add database queries in `server/db.ts`:
```typescript
export async function getMyData() {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return db.select().from(myTable);
}
```

## Deployment

### Option 1: Deploy to Manus Platform
1. Click "Publish" button in Manus UI
2. Follow the deployment wizard

### Option 2: Deploy to External Hosting

#### Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

#### Render
1. Push code to GitHub
2. Connect repository to Render
3. Configure environment variables
4. Deploy

#### Railway
1. Push code to GitHub
2. Connect to Railway
3. Add environment variables
4. Deploy

## Troubleshooting

### Database Connection Error
- Ensure MySQL is running: `mysql -u root -p`
- Check DATABASE_URL in .env
- Run `pnpm db:push` to create tables

### Port Already in Use
```bash
# Kill process on port 3000
# On macOS/Linux:
lsof -ti:3000 | xargs kill -9

# On Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### TypeScript Errors
```bash
# Clear cache and reinstall
rm -rf node_modules pnpm-lock.yaml
pnpm install
pnpm check
```

### Mobile Touch Effects Not Working
- Ensure passive event listeners are enabled
- Check browser DevTools console for errors
- Test on actual mobile device (not just browser emulation)

## Support & Resources

- **Documentation:** Check comments in code files
- **Tailwind CSS:** https://tailwindcss.com
- **React:** https://react.dev
- **tRPC:** https://trpc.io
- **Drizzle ORM:** https://orm.drizzle.team

## Next Steps

1. **Customize Content:** Update company information, services, and branding
2. **Add Email Notifications:** Integrate email service for form submissions
3. **Setup Analytics:** Connect Google Analytics or Manus Analytics
4. **Add Authentication:** Implement user login/signup if needed
5. **Deploy:** Choose hosting platform and deploy

---

**Created:** March 2026
**Version:** 1.0.0
**License:** MIT
