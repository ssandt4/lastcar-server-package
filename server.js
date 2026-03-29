const express = require('express');
const path = require('path');
const session = require('express-session');
const app = express();

// Enable CORS for lastcarproductions.com
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'https://lastcarproductions.com');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

// Configuration
const PORT = process.env.PORT || 3000;
const PARTNER_PASSWORD = process.env.PARTNER_PASSWORD || 'LastCar2024'; // Set via environment variable in production

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public')); // Serve static files from 'public' folder

// Session configuration
app.use(session({
    secret: process.env.SESSION_SECRET || 'lastcar-secret-key-change-in-production',
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
        httpOnly: true,
        secure: false, // Use secure cookies in production
	sameSite: 'lax'
    }
}));

// Protected work samples data (stored on server, never sent to client until authenticated)
const workSamples = [
    {
        id: 1,
        category: 'Documentary',
        title: 'The Journey Home',
        description: 'An intimate portrait of resilience and hope',
        image: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?w=1600&q=80',
        caseStudyUrl: '/case-studies/journey-home'
    },
    {
        id: 2,
        category: 'Branded Content',
        title: 'Urban Stories',
        description: 'Capturing the pulse of the city',
        image: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800&q=80',
        caseStudyUrl: '/case-studies/urban-stories'
    },
    {
        id: 3,
        category: 'Film',
        title: 'Midnight Dreams',
        description: 'A visual exploration of memory',
        image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&q=80',
        caseStudyUrl: '/case-studies/midnight-dreams'
    },
    {
        id: 4,
        category: 'Creative Consulting',
        title: 'Brand Evolution',
        description: 'Strategic storytelling reimagined',
        image: 'https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?w=800&q=80',
        caseStudyUrl: '/case-studies/brand-evolution'
    }
];

// Routes

// Serve the main HTML page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API endpoint to verify password
app.post('/api/verify-password', (req, res) => {
    const { password } = req.body;
    
    if (!password) {
        return res.status(400).json({ 
            success: false, 
            message: 'Password is required' 
        });
    }
    
    if (password === PARTNER_PASSWORD) {
        // Set session to remember authentication
        req.session.authenticated = true;
        
        return res.json({ 
            success: true, 
            message: 'Authentication successful' 
        });
    } else {
        return res.status(401).json({ 
            success: false, 
            message: 'Incorrect password' 
        });
    }
});

// API endpoint to get work samples (only if authenticated)
app.get('/api/work-samples', (req, res) => {
    if (!req.session.authenticated) {
        return res.status(401).json({ 
            success: false, 
            message: 'Unauthorized. Please authenticate first.' 
        });
    }
    
    res.json({ 
        success: true, 
        data: workSamples 
    });
});

// Check authentication status
app.get('/api/check-auth', (req, res) => {
    res.json({ 
        authenticated: req.session.authenticated === true 
    });
});

// Logout endpoint
app.post('/api/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ 
                success: false, 
                message: 'Logout failed' 
            });
        }
        res.json({ 
            success: true, 
            message: 'Logged out successfully' 
        });
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Partner password: ${PARTNER_PASSWORD}`);
});
