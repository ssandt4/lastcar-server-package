# Last Car Productions - Server-Side Password Protection

This is a Node.js/Express server that provides secure, server-side password protection for the Brand Partners portal.

## 🔐 How It Works

**Server-Side Security:**
- Password stored on server (NOT in browser code)
- Work samples only sent after successful authentication
- Session-based authentication (stays logged in during session)
- Password and content never exposed in client-side code

## 📁 Project Structure

```
lastcar-productions/
├── server.js           # Express server with authentication
├── package.json        # Node.js dependencies
├── .env.example        # Environment variables template
├── public/
│   └── index.html      # Your website (served to clients)
└── README.md          # This file
```

## 🚀 Setup Instructions

### 1. Install Node.js
Download and install Node.js from https://nodejs.org/ (LTS version recommended)

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env` file (copy from `.env.example`):
```bash
cp .env.example .env
```

Edit `.env` and set your password:
```
PARTNER_PASSWORD=YourSecurePassword123
SESSION_SECRET=random-secret-key-abc123xyz
```

### 4. Run the Server

**Development mode (with auto-restart):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

The server will run on `http://localhost:3000`

## 🔧 Customizing Work Samples

Edit the `workSamples` array in `server.js` (around line 32):

```javascript
const workSamples = [
    {
        id: 1,
        category: 'Documentary',
        title: 'Your Project Title',
        description: 'Project description',
        image: 'https://your-image-url.com/image.jpg',
        caseStudyUrl: '/case-studies/your-project'
    },
    // Add more projects...
];
```

## 🌐 Deployment Options

### Option 1: Heroku (Recommended for beginners)

1. Create Heroku account at https://heroku.com
2. Install Heroku CLI
3. Deploy:
```bash
heroku create lastcar-productions
heroku config:set PARTNER_PASSWORD=YourPassword123
heroku config:set SESSION_SECRET=random-secret-key
git push heroku main
```

### Option 2: DigitalOcean App Platform

1. Create DigitalOcean account
2. Connect your GitHub repository
3. Set environment variables in dashboard
4. Deploy automatically

### Option 3: Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Deploy:
```bash
vercel
```
3. Set environment variables in Vercel dashboard

### Option 4: Your Own Server (VPS)

1. SSH into your server
2. Clone repository
3. Install dependencies: `npm install`
4. Use PM2 to run forever:
```bash
npm install -g pm2
pm2 start server.js
pm2 save
pm2 startup
```

## 🔒 Security Notes

### What's Secure:
✅ Password stored on server (not visible in browser)
✅ Work samples only sent after authentication
✅ Session-based login (stays logged in during session)
✅ HTTPS recommended in production

### What's Not Included (but recommended for production):
- Rate limiting (prevent brute force attacks)
- HTTPS/SSL certificate (encrypt data in transit)
- Password hashing (if storing user accounts)
- CORS configuration (if API used from different domains)

## 📝 API Endpoints

- `POST /api/verify-password` - Authenticate with password
- `GET /api/work-samples` - Get work samples (requires authentication)
- `GET /api/check-auth` - Check if currently authenticated
- `POST /api/logout` - Log out and destroy session

## 🔑 Changing the Password

**Method 1: Environment Variable (Recommended)**
Set `PARTNER_PASSWORD` in your `.env` file or hosting platform

**Method 2: Direct Edit**
Edit `server.js` line 7:
```javascript
const PARTNER_PASSWORD = 'YourNewPassword123';
```

## 🐛 Troubleshooting

**"Cannot find module 'express'"**
→ Run `npm install`

**"Port 3000 already in use"**
→ Change PORT in `.env` or kill the process using that port

**"Error connecting to server"**
→ Make sure server is running (`npm start`)

**Password not working**
→ Check console logs for the current password being used

## 📞 Support

For issues or questions, contact: info@lastcarproductions.com

## 📄 License

© 2024 Last Car Productions. All rights reserved.
