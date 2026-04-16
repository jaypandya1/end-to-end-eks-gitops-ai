# 📦 FitNest – Full Stack Fitness App

FitNest is a comprehensive full-stack fitness application built with **React**, **TypeScript**, **Node.js (Express)**, and **PostgreSQL**. This intelligent fitness platform leverages **AI and machine learning** to provide personalized workout recommendations, progress tracking, and predictive analytics to help users achieve their fitness goals.

---

## ✨ Key Features

### 🤖 AI-Powered Intelligence
- **Smart Workout Recommendations**: Utilizes OpenAI API to generate personalized workout plans based on user goals, fitness level, and preferences
- **Predictive Analytics**: ML models predict future progress and suggest optimal training adjustments
- **Natural Language Processing**: Conversational AI assistant helps users plan meals, answer fitness questions, and provide motivation

### 📊 Progress Tracking & Analytics
- **Comprehensive Dashboards**: Visual representations of workout history, strength gains, and body composition changes
- **Performance Metrics**: Track sets, reps, weight progression, and workout volume over time
- **Goal Setting & Monitoring**: Set custom fitness goals and monitor progress with intelligent milestone tracking

### 💪 Workout Management
- **Custom Workout Builder**: Create and save personalized workout routines
- **Exercise Library**: Extensive database of exercises with instructions and muscle group targeting
- **Workout Logging**: Quick and intuitive interface for logging completed exercises
- **Rest Timer & Notifications**: Built-in timers to optimize rest periods between sets

### 🔐 User Authentication & Security
- **JWT-based Authentication**: Secure token-based authentication system
- **Protected Routes**: Backend and frontend route protection ensuring data privacy
- **Password Encryption**: Bcrypt hashing for secure password storage

### 📱 Modern User Experience
- **Responsive Design**: Fully responsive interface works seamlessly on desktop, tablet, and mobile
- **Real-time Updates**: Live data synchronization for immediate feedback
- **Intuitive UI/UX**: Clean, modern interface built with React and TypeScript

---

## 🛠️ Tech Stack

**Frontend**
- React 18 + TypeScript
- Vite (fast build tool)
- React Router for navigation
- Recharts for data visualization
- Tailwind CSS for styling

**Backend**
- Node.js + Express.js
- TypeScript for type safety
- RESTful API architecture
- JWT for authentication
- Bcrypt for password hashing

**Database**
- PostgreSQL for reliable data storage
- Complex relational schema for users, workouts, exercises, and progress tracking

**AI/ML Integration**
- OpenAI API for natural language processing
- Custom prediction models for progress forecasting
- Intelligent recommendation engine

**DevOps**
- Docker & Docker Compose for containerization
- Multi-container orchestration
- Environment-based configuration

---

## 🏗️ Architecture

FitNest follows a modern three-tier architecture:

1. **Presentation Layer**: React frontend with TypeScript for type safety
2. **Application Layer**: Express.js REST API handling business logic
3. **Data Layer**: PostgreSQL database with normalized schema

The application uses Docker containers for each service, ensuring consistent environments across development and production.

---

## 🚀 Getting Started

These instructions will get the app running on your local machine using **Docker**.

---

### 📁 Project Structure

```
.
├── backend/              # Express API
│   ├── .env              # Backend environment variables
│   ├── .env.example      # Sample env file
│   ├── Dockerfile
│   ├── init.sql          # DB init script
│   ├── src/
│   │   ├── routes/       # API endpoints
│   │   ├── controllers/  # Business logic
│   │   ├── models/       # Database models
│   │   └── middleware/   # Auth & validation
│   └── ...
├── frontend/             # React frontend (Vite)
│   ├── Dockerfile
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── pages/        # Page components
│   │   ├── hooks/        # Custom React hooks
│   │   └── utils/        # Helper functions
│   └── ...
├── screenshots/          # App screenshots
│   └── README.md         # Visual documentation
├── docker-compose.yml    # Orchestrates all containers
└── README.md
```

---

## 🔐 Setup

### 1. Install Docker

If you haven't already, install Docker:  
[https://docs.docker.com/get-docker/](https://docs.docker.com/get-docker/)

### 2. Configure Environment Variables

Create a `.env` file for the backend:

```bash
cp backend/.env.example backend/.env
```

Then open `backend/.env` and fill in the required values:

> **NOTE**: Check `backend/.env.example` for all available configuration options!

```env
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=FitNest
DB_HOST=db
PORT=3001
JWT_SECRET=your_jwt_secret
OPENAI_API_KEY=your_openai_key
```

### 3. Run the Application

```bash
# Build and start all containers
docker-compose up --build
```

Wait for the containers to start up, then initialize the database:

**On Windows PowerShell:**
```powershell
Get-Content ./backend/init.sql | docker exec -i fitnest-db psql -U postgres -d FitNest
```

**On macOS / Linux / Unix shells:**
```bash
cat ./backend/init.sql | docker exec -i fitnest-db psql -U postgres -d FitNest
```

### 4. Access the Application

Navigate to: **http://localhost:5173/**

> The exact port can be verified in Docker Desktop or by running `docker-compose ps`

---

## ✅ Services

Once running, the following services will be available:

| Service | URL | Description |
|---------|-----|-------------|
| **Frontend** | http://localhost:5173 | React application |
| **Backend API** | http://localhost:3001 | Express REST API |
| **PostgreSQL** | localhost:5432 | Database server |

---

## 📸 Screenshots

### Dashboard & Analytics
![Dashboard View](screenshots/image.png)
*Real-time workout tracking and performance analytics*

### Workout Interface
![Workout Logging](screenshots/image2.png)
*Intuitive workout logging with exercise library*

### Progress Tracking
![Progress Charts](screenshots/image3.png)
*Visual progress tracking with detailed metrics*

### AI Assistant
![AI Features](screenshots/image4.png)
*AI-powered recommendations and personalized guidance*

---

## 🧠 Technical Implementation Notes

### Database Schema
- **Users Table**: Stores user profiles, authentication data, and preferences
- **Workouts Table**: Records of completed workouts with timestamps
- **Exercises Table**: Exercise library with descriptions and muscle groups
- **Progress Table**: Historical data for analytics and ML predictions

### ML Prediction System
The prediction engine analyzes historical workout data to:
- Forecast strength gains based on training volume and consistency
- Identify plateau risks and suggest deload periods
- Recommend optimal progression rates for each exercise

---

## 🧼 Stopping & Cleaning Up

**To stop the application:**
```bash
docker-compose down
```

**To stop and remove all volumes (including database data):**
```bash
docker-compose down -v
```

> ⚠️ Warning: Using `-v` will delete all workout data and user information!

---

## 📌 Troubleshooting

**Common Issues:**

1. **Port Already in Use**
   - Ensure ports 5173, 3001, and 5432 are not occupied by other services
   - On Windows: `netstat -ano | findstr :[PORT]`
   - On Mac/Linux: `lsof -i :[PORT]`

2. **Database Connection Errors**
   - Verify `.env` values match `docker-compose.yml` configuration
   - Ensure database container is fully started before running init script

3. **Container Build Failures**
   - Clear Docker cache: `docker-compose build --no-cache`
   - Remove old containers: `docker-compose down -v`

4. **OpenAI API Issues**
   - Verify your `OPENAI_API_KEY` is valid and has sufficient credits
   - Check API rate limits if experiencing delays

