# Trunk Sewer Maintenance Optimizer Pro

A professional web application for optimizing trunk sewer maintenance schedules using constraint-based optimization and risk assessment.

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Google Maps API
```bash
# Copy the template
cp .env.template .env

# Edit .env and add your Google Maps API key
# GOOGLE_MAPS_API_KEY=your_actual_api_key_here
```

### 3. Get Google Maps API Key
1. Go to [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
2. Create a new project or select existing
3. Enable **Maps JavaScript API** and **Geometry Library**
4. Create credentials → API Key
5. Copy your API key to `.env` file

### 4. Run the Server
```bash
# Development mode (auto-restart on changes)
npm run dev

# Production mode
npm start
```

### 5. Open Application
Visit [http://localhost:3000](http://localhost:3000) in your browser

## 🔒 Security Features

- **API key protection** - Never exposed in client-side code
- **Environment variables** - Secure configuration management
- **Security headers** - XSS protection, clickjacking prevention
- **Error handling** - Graceful failure without exposing internals

## 📊 Features

- **Risk-based prioritization** using single Risk Rating (1-25)
- **Constraint optimization** with resource and physical limitations
- **Proximity coordination** using Google Maps API for 500m radius detection
- **Diameter categorization** (Small: <600mm, Large: ≥600mm)
- **Multi-year planning** with budget and capacity constraints
- **CSV import/export** with comprehensive data validation
- **Professional Apple-style UI** with responsive design

## 🗺️ Proximity Algorithm

The system uses Google Maps Geometry Library to:
1. Calculate precise distances between assets using coordinates
2. Identify assets within 500m radius
3. Match same diameter categories (Small/Large)
4. Coordinate scheduling within 12-month windows
5. Apply cost savings for coordinated maintenance

## 📋 CSV Data Format

```csv
ID,Length_m,Diameter_mm,Risk_Rating_1to25,Access_Score_1to10,Bypass_Required_YN,Mobilization_Complexity_1to5,X_Coord,Y_Coord
TM-001,450,600,12,6,Y,2,-37.8136,144.9631
```

## 🔧 Technical Notes

- **Mathematical Model**: Multi-Objective Integer Programming
- **Optimization Algorithm**: Constraint-based greedy with proximity benefits
- **Fallback Mode**: Works without Google Maps API (reduced accuracy)
- **Browser Support**: Modern browsers with JavaScript enabled

## 🌐 Deployment

### Local Development
Already configured! Just run `npm run dev`

### Production Deployment
1. Set `NODE_ENV=production` in `.env`
2. Configure your domain restrictions in Google Cloud Console
3. Deploy to your preferred hosting platform
4. Ensure `.env` file is secure and not publicly accessible

## ⚠️ Important Notes

- Never commit your `.env` file to version control
- Restrict your Google Maps API key to your domain in production
- For critical infrastructure decisions, consult qualified engineers
- This tool is designed for planning and educational purposes

## 🆘 Troubleshooting

**API Key Issues:**
- Check `.env` file exists and contains your key
- Verify Google Maps JavaScript API is enabled
- Check browser console for API errors

**Server Won't Start:**
- Ensure Node.js is installed (v14+)
- Run `npm install` to install dependencies
- Check if port 3000 is available

**Proximity Not Working:**
- Verify Google Maps API key is valid
- Check browser console for API errors
- Fallback mode will still provide basic optimization