const express = require('express');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files (for any CSS, JS, or image files you might add later)
app.use('/static', express.static(path.join(__dirname, 'static')));

// Security headers
app.use((req, res, next) => {
    // Prevent clickjacking
    res.setHeader('X-Frame-Options', 'DENY');
    
    // Prevent MIME type sniffing
    res.setHeader('X-Content-Type-Options', 'nosniff');
    
    // Enable XSS protection
    res.setHeader('X-XSS-Protection', '1; mode=block');
    
    // Only allow HTTPS in production
    if (process.env.NODE_ENV === 'production') {
        res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
    }
    
    next();
});

// Main route - serve the HTML with API key injected
app.get('/', (req, res) => {
    try {
        // Read the HTML file
        const htmlPath = path.join(__dirname, 'sewer_maintenance_optimizer_pro.html');
        
        if (!fs.existsSync(htmlPath)) {
            return res.status(404).send('HTML file not found. Please ensure sewer_maintenance_optimizer_pro.html exists.');
        }
        
        let html = fs.readFileSync(htmlPath, 'utf8');
        
        // Check if API key is provided
        const apiKey = process.env.GOOGLE_MAPS_API_KEY;
        if (!apiKey) {
            console.warn('Warning: GOOGLE_MAPS_API_KEY not found in environment variables');
            console.warn('Proximity optimization will use fallback calculations');
        }
        
        // Replace the placeholder with the actual API key
        html = html.replace('YOUR_API_KEY', apiKey || 'MISSING_API_KEY');
        
        // Set content type and send
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.send(html);
        
    } catch (error) {
        console.error('Error serving HTML:', error);
        res.status(500).send('Internal server error');
    }
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        apiKeyConfigured: !!process.env.GOOGLE_MAPS_API_KEY
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).send('Page not found');
});

// Error handler
app.use((err, req, res, next) => {
    console.error('Server error:', err);
    res.status(500).send('Something went wrong!');
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Sewer Maintenance Optimizer Pro server running on http://localhost:${PORT}`);
    console.log(`📊 Health check available at http://localhost:${PORT}/health`);
    
    if (!process.env.GOOGLE_MAPS_API_KEY) {
        console.log('⚠️  Warning: GOOGLE_MAPS_API_KEY not configured');
        console.log('   Set your API key in the .env file for full functionality');
    } else {
        console.log('✅ Google Maps API key configured');
    }
    
    console.log('\n📝 Next steps:');
    console.log('   1. Set your Google Maps API key in .env file');
    console.log('   2. Open http://localhost:3000 in your browser');
    console.log('   3. Upload your CSV data or generate sample data');
    console.log('   4. Run optimization with proximity benefits');
});