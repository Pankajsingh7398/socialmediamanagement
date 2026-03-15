# MongoDB Setup Guide for Rudraksha Website

## What Changed

This project has been updated to use **MongoDB** instead of MySQL for better flexibility and scalability.

## Prerequisites

- **MongoDB** (local or cloud)
- **Mongoose** (already installed via `pnpm install`)

## Option 1: Local MongoDB Setup

### Install MongoDB

**On macOS (using Homebrew):**
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

**On Windows:**
- Download from: https://www.mongodb.com/try/download/community
- Run the installer and follow the setup wizard
- MongoDB will start automatically

**On Linux (Ubuntu):**
```bash
curl -fsSL https://www.mongodb.org/static/pgp/server-7.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org
sudo systemctl start mongod
```

### Verify MongoDB is Running

```bash
# Open MongoDB shell
mongosh

# You should see a connection message
# Type 'exit' to quit
```

## Option 2: MongoDB Atlas (Cloud)

1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a new cluster
4. Get your connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/database`)

## Configure Environment Variables

Create or update `.env` file in project root:

```env
# For Local MongoDB
DATABASE_URL=mongodb://localhost:27017/rudraksha_db

# OR for MongoDB Atlas (Cloud)
DATABASE_URL=mongodb+srv://username:password@cluster.mongodb.net/rudraksha_db?retryWrites=true&w=majority
```

## Start the Development Server

```bash
# Install dependencies
pnpm install

# Start dev server
pnpm dev
```

The application will automatically create the MongoDB collections when you submit your first form.

## Database Collections

The project automatically creates these collections:

### 1. **contacts** - Contact Form Submissions
```javascript
{
  name: String,
  email: String,
  message: String,
  serviceType: String,
  createdAt: Date,
  updatedAt: Date
}
```

### 2. **servicerequests** - Service Request Forms
```javascript
{
  name: String,
  email: String,
  phone: String,
  companyName: String,
  serviceType: String,  // web-app-dev, digital-marketing, etc.
  clientType: String,   // 'brand' or 'customer'
  projectDescription: String,
  budget: String,
  timeline: String,
  additionalInfo: String,
  // Service-specific fields
  websiteType: String,
  appPlatform: String,
  marketingGoal: String,
  socialPlatforms: [String],
  targetKeywords: [String],
  influencerNiche: String,
  prObjective: String,
  memeStyle: String,
  createdAt: Date,
  updatedAt: Date
}
```

## Viewing Data

### Using MongoDB Compass (GUI)
1. Download: https://www.mongodb.com/products/compass
2. Connect to `mongodb://localhost:27017`
3. Browse collections and data visually

### Using MongoDB Shell
```bash
# Connect to MongoDB
mongosh

# List databases
show dbs

# Use your database
use rudraksha_db

# List collections
show collections

# View all contacts
db.contacts.find()

# View all service requests
db.servicerequests.find()

# Count documents
db.contacts.countDocuments()
```

## Troubleshooting

### "Cannot connect to MongoDB"
- Ensure MongoDB is running: `brew services list` (macOS) or check Services (Windows)
- Check DATABASE_URL in .env file
- Verify MongoDB is listening on port 27017

### "Connection timeout"
- If using MongoDB Atlas, ensure your IP is whitelisted
- Check internet connection
- Verify connection string is correct

### "Database doesn't exist"
- MongoDB automatically creates databases on first use
- Just submit a form to create the database

## Backing Up Data

### Local MongoDB
```bash
# Backup
mongodump --db rudraksha_db --out ./backup

# Restore
mongorestore --db rudraksha_db ./backup/rudraksha_db
```

### MongoDB Atlas
- Automatic backups are enabled by default
- Access via Atlas dashboard → Backup → Restore

## Next Steps

1. Start the dev server: `pnpm dev`
2. Visit http://localhost:3000
3. Test the service request forms
4. Check MongoDB for submitted data

---

**Need Help?**
- MongoDB Docs: https://docs.mongodb.com/
- Mongoose Docs: https://mongoosejs.com/
- MongoDB Atlas Support: https://support.mongodb.com/
