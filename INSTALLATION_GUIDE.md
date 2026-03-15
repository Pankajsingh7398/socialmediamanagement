# Rudraksha Website - Complete Installation Guide

## System Requirements

- **Node.js**: v18.0.0 or higher
- **npm** or **pnpm**: v8.0.0 or higher (pnpm recommended)
- **MongoDB**: v5.0 or higher (local or Atlas cloud)
- **Git**: For version control

## Step 1: Extract Project

```bash
unzip rudraksha_website_updated.zip
cd rudraksha_website
```

## Step 2: Install All Dependencies

### Required Packages

The project includes all necessary packages in `package.json`. Install them with:

```bash
pnpm install
```

**OR if using npm:**
```bash
npm install
```

### Key Packages Included

| Package | Version | Purpose |
|---------|---------|---------|
| **React** | 19.2.1 | UI Framework |
| **Vite** | 7.1.7 | Build tool & dev server |
| **Tailwind CSS** | 4.1.14 | Styling framework |
| **Express** | 4.21.2 | Backend server |
| **tRPC** | 11.6.0 | Type-safe API |
| **Mongoose** | 9.2.4 | MongoDB ODM |
| **Zod** | 4.1.12 | Schema validation |
| **Framer Motion** | 12.23.22 | Animations |
| **Lucide React** | 0.453.0 | Icons |
| **TypeScript** | 5.9.3 | Type safety |

## Step 3: Setup MongoDB

### Option A: Local MongoDB

**macOS (Homebrew):**
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

**Windows:**
1. Download from: https://www.mongodb.com/try/download/community
2. Run installer and follow setup wizard
3. MongoDB starts automatically

**Linux (Ubuntu):**
```bash
curl -fsSL https://www.mongodb.org/static/pgp/server-7.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org
sudo systemctl start mongod
```

### Option B: MongoDB Atlas (Cloud - Recommended)

1. Go to: https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create new cluster
4. Get connection string (format: `mongodb+srv://username:password@cluster.mongodb.net/database`)

## Step 4: Configure Environment Variables

Create `.env` file in project root:

```env
# MongoDB Connection String
DATABASE_URL=mongodb://localhost:27017/rudraksha_db

# OR for MongoDB Atlas:
# DATABASE_URL=mongodb+srv://username:password@cluster.mongodb.net/rudraksha_db?retryWrites=true&w=majority

# OAuth (if using authentication)
VITE_APP_TITLE=Rudraksha Pvt Ltd
VITE_APP_ID=your_app_id
OAUTH_SERVER_URL=https://api.manus.im
VITE_OAUTH_PORTAL_URL=https://portal.manus.im
JWT_SECRET=your_random_secret_key_123
OWNER_NAME=Your Name
OWNER_OPEN_ID=your_open_id
```

## Step 5: Verify MongoDB Connection

```bash
# Test local MongoDB
mongosh

# You should see: Current Mongosh version: X.X.X
# Type 'exit' to quit
```

## Step 6: Start Development Server

```bash
pnpm dev
```

**Output should show:**
```
  ➜  Local:   http://localhost:3000
  ➜  press h to show help
```

Visit: **http://localhost:3000**

## Step 7: Verify All Features

### Test Contact Form
1. Navigate to Contact section
2. Fill form and submit
3. Check MongoDB for saved data

### Test Service Request
1. Click on any service card
2. Select Brand or Customer
3. Fill service-specific form
4. Submit and verify in MongoDB

### Test Feature Request (Brands)
1. Open burger menu on mobile
2. Select "Brand"
3. Click "Add Custom Feature"
4. Submit and verify

## Viewing MongoDB Data

### Using MongoDB Compass (GUI)
1. Download: https://www.mongodb.com/products/compass
2. Connect to `mongodb://localhost:27017`
3. Browse collections

### Using MongoDB Shell
```bash
# Connect
mongosh

# View databases
show dbs

# Use database
use rudraksha_db

# View collections
show collections

# View all contacts
db.contacts.find()

# View all service requests
db.servicerequests.find()

# View all feature requests
db.featurerequests.find()

# Count documents
db.contacts.countDocuments()
```

## Production Build

```bash
# Build for production
pnpm build

# Start production server
pnpm start
```

## Troubleshooting

### MongoDB Connection Error
```
Error: Invalid scheme, expected connection string to start with "mongodb://" or "mongodb+srv://"
```
**Solution:** Check DATABASE_URL in .env file - must start with `mongodb://` or `mongodb+srv://`

### Port 3000 Already in Use
```bash
# Find process using port 3000
lsof -ti:3000 | xargs kill -9

# OR specify different port
PORT=3001 pnpm dev
```

### MongoDB Not Running
```bash
# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongod

# Windows: Check Services app or restart MongoDB service
```

### Dependencies Not Installing
```bash
# Clear cache and reinstall
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

## Database Collections

### contacts
Stores general contact form submissions
```javascript
{
  name: String,
  email: String,
  message: String,
  createdAt: Date,
  updatedAt: Date
}
```

### servicerequests
Stores service-specific requests
```javascript
{
  name: String,
  email: String,
  phone: String,
  companyName: String,
  serviceType: String,
  clientType: 'brand' | 'customer',
  projectDescription: String,
  budget: String,
  timeline: String,
  // Service-specific fields...
  createdAt: Date,
  updatedAt: Date
}
```

### featurerequests
Stores custom feature requests from brands
```javascript
{
  name: String,
  email: String,
  phone: String,
  companyName: String,
  featureTitle: String,
  featureDescription: String,
  priority: 'low' | 'medium' | 'high',
  timeline: String,
  budget: String,
  createdAt: Date,
  updatedAt: Date
}
```

## Project Structure

```
rudraksha_website/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── pages/         # Page components
│   │   ├── lib/           # Utilities
│   │   └── index.css      # Global styles
│   ├── public/            # Static assets
│   └── index.html         # HTML entry point
├── server/                # Express backend
│   ├── models/            # MongoDB models
│   ├── routers.ts         # tRPC routes
│   ├── db.ts              # Database queries
│   └── mongodb.ts         # MongoDB connection
├── drizzle/               # Database migrations (legacy)
├── .env                   # Environment variables
├── package.json           # Dependencies
└── tsconfig.json          # TypeScript config
```

## Available Commands

```bash
# Development
pnpm dev              # Start dev server

# Building
pnpm build            # Build for production
pnpm start            # Start production server

# Code Quality
pnpm check            # Check TypeScript errors
pnpm format           # Format code with Prettier
pnpm test             # Run tests

# Database
pnpm db:push          # Push database schema (legacy)
```

## Deployment

### Option 1: Manus (Built-in Hosting)
1. Click "Publish" button in Management UI
2. Configure custom domain
3. Deploy automatically

### Option 2: External Hosting
- **Vercel**: For frontend
- **Railway**: For full-stack
- **Render**: For backend
- **Heroku**: For backend

## Support & Resources

- **MongoDB Docs**: https://docs.mongodb.com/
- **Mongoose Docs**: https://mongoosejs.com/
- **tRPC Docs**: https://trpc.io/
- **React Docs**: https://react.dev/
- **Tailwind Docs**: https://tailwindcss.com/

## Next Steps

1. ✅ Install dependencies
2. ✅ Setup MongoDB
3. ✅ Configure .env
4. ✅ Start dev server
5. Test all forms
6. Deploy to production

---

**Questions?** Check MONGODB_SETUP.md for detailed MongoDB configuration.
