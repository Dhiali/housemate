# <img src="frontend/public/housemate-logo.png" alt="Housemate Logo" width="40" height="40" style="vertical-align: middle;"> Housemate - Smart Household Management System

**A Full-Stack Web Application | Developed by Dhiali Chetty**

Housemate is a full-stack web application built to solve coordination challenges in shared living spaces. The project enables roommates to efficiently manage household tasks, split bills automatically, schedule events and maintain transparent communication through role-based access control.

Built using React.js frontend with Node.js/Express backend and MySQL database, the application delivers a complete household management solution with real-time updates and secure authentication. Key features include automated bill splitting, task assignment tracking, event scheduling and comprehensive household statistics.

The project was successfully deployed on Google Cloud Run (backend) and Azure Static Web Apps (frontend) with a custom domain. However, due to financial constraints, the live deployment was discontinued and the application now runs locally for demonstration purposes. This showcases the complete development lifecycle from local development through cloud deployment.

**Digital Solution Type:** Progressive Web Application (PWA) - Responsive web application optimized for both desktop and tablet devices with offline capabilities.

![Housemate Application Mockup](HM%20mockup.png)

## 📑 Table of Contents

<details>
<summary>Click to expand</summary>

- [🛠️ Built With](#️-built-with)
- [🎯 Project Features](#-project-features)
- [🏃‍♂️ How to Run Locally](#️-how-to-run-locally)
  - [Prerequisites](#prerequisites)
  - [How to Install](#how-to-install)
- [🌍 Environment Variables Guide](#-environment-variables-guide)
- [🚀 Deployment](#-deployment)
- [📋 Project Documentation](#-project-documentation)
- [🗄️ Database Design](#️-database-design)
- [🚀 Live Demo](#-live-demo)
- [🎯 Conclusion](#-conclusion)
- [📄 License](#-license)
- [📞 Contact Information](#-contact-information)
- [🙏 Acknowledgments](#-acknowledgments)
- [👥 Contributing](#-contributing)

</details>

## 🛠️ Built With

### Frontend
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)

### Backend
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)

### Infrastructure & Deployment
![Google Cloud](https://img.shields.io/badge/Google_Cloud-4285F4?style=for-the-badge&logo=google-cloud&logoColor=white)
![Microsoft Azure](https://img.shields.io/badge/Microsoft_Azure-0089D0?style=for-the-badge&logo=microsoft-azure&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)

### Tools & Libraries
- **React Router** - Client-side routing
- **Axios** - HTTP client for API requests  
- **Radix UI** - Accessible UI components
- **Lucide React** - Icon library
- **Framer Motion** - Animation library
- **bcryptjs** - Password hashing
- **Helmet** - Security middleware
- **Multer & Sharp** - Image processing


## How to Run Locally

### Prerequisites

Before running this project, ensure you have the following software installed:

#### Required Software
- **Node.js** (v18.0.0 or higher) - [Download here](https://nodejs.org/)
- **npm** (v9.0.0 or higher) - Comes with Node.js
- **MySQL** (v8.0 or higher) - [Download here](https://dev.mysql.com/downloads/mysql/) or use XAMPP
- **Git** - [Download here](https://git-scm.com/downloads)

#### Alternative Database Options
- **XAMPP** (recommended for local development) - [Download here](https://www.apachefriends.org/download.html)
- **MySQL Workbench** (optional, for database management) - [Download here](https://dev.mysql.com/downloads/workbench/)

#### Verify Prerequisites
Run these commands to verify your installations:
```bash
node --version    # Should show v18.0.0 or higher
npm --version     # Should show v9.0.0 or higher  
mysql --version   # Should show MySQL v8.0 or higher
git --version     # Should show Git version
```

### How to Install

Follow these step-by-step instructions to set up the project locally:

#### 1. Clone the Repository
```bash
git clone https://github.com/Dhiali/Housemate.git
cd Housemate
```

#### 2. Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install all backend dependencies
npm install

# Create environment configuration file
cp .env.example .env
```

**Configure Backend Environment Variables:**
Edit the `.env` file with your local configuration:
```env
# Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=housemate_db
DB_PORT=3306

# JWT Authentication
JWT_SECRET=your_super_secure_jwt_secret_key_here

# Server Configuration
PORT=5000
NODE_ENV=development

# CORS Origins (for frontend)
CORS_ORIGIN=http://localhost:5173
```

#### 3. Database Setup
**Create MySQL Database:**
```sql
-- Connect to MySQL and create database
CREATE DATABASE housemate_db;
USE housemate_db;

-- Tables will be created automatically when backend starts
```

**For XAMPP Users:**
1. Start XAMPP Control Panel
2. Start Apache and MySQL services
3. Open phpMyAdmin (http://localhost/phpmyadmin)
4. Create new database named `housemate_db`

#### 4. Start Backend Server
```bash
# From backend directory
npm start
```
✅ Backend will be available at: `http://localhost:5000`

#### 5. Frontend Setup (New Terminal)
```bash
# Navigate to frontend directory from project root
cd frontend

# Install all frontend dependencies
npm install

# Create frontend environment file (optional)
echo "VITE_API_BASE_URL=http://localhost:5000" > .env
```

#### 6. Start Frontend Development Server
```bash
# From frontend directory
npm run dev
```
✅ Frontend will be available at: `http://localhost:5173`

### Quick Start Commands
```bash
# Terminal 1 - Backend
cd backend && npm install && npm start

# Terminal 2 - Frontend  
cd frontend && npm install && npm run dev
```

**Important Notes:**
- The backend repository contains the API server and database logic
- The frontend repository contains the React.js user interface
- Both must be running simultaneously for the application to work
- Database tables are created automatically on first backend startup
- Default admin user may be created automatically (check console logs)

### 6. Build for Production

```bash
# Backend (no build step required)
cd backend
npm start

# Frontend
cd frontend
npm run build
npm run preview
```

## 🌍 Environment Variables Guide

### Backend Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `MYSQL_HOST` | MySQL server hostname | Yes | `localhost` |
| `MYSQL_USER` | MySQL username | Yes | `root` |
| `MYSQL_PASSWORD` | MySQL password | Yes | - |
| `MYSQL_DATABASE` | MySQL database name | Yes | `housemate_db` |
| `MYSQL_PORT` | MySQL port | No | `3306` |
| `JWT_SECRET` | Secret key for JWT tokens | Yes | - |
| `PORT` | Server port | No | `5000` |
| `NODE_ENV` | Environment mode | No | `development` |
| `DATABASE_URL` | Complete database URL | No | - |

### Frontend Environment Variables

The frontend uses Vite's environment variable system. Create a `.env` file in the frontend directory:

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:5000

# Google Analytics (optional)
VITE_GA_TRACKING_ID=your_ga_id

# Other optional configurations
VITE_APP_NAME=Housemate
VITE_APP_VERSION=1.0.0
```

## 🚀 Deployment

### Backend Deployment (Google Cloud Run)

1. **Build and deploy using Google Cloud CLI:**
```bash
cd backend
gcloud run deploy housemate-backend \
  --source . \
  --platform managed \
  --region africa-south1 \
  --allow-unauthenticated
```

2. **Set environment variables in Cloud Run console:**
   - Add all required environment variables listed above
   - Configure Cloud SQL connection if using Google Cloud SQL

### Frontend Deployment (Azure Static Web Apps)

1. **Build the application:**
```bash
cd frontend
npm run build
```

2. **Deploy using Azure CLI or GitHub Actions:**
   - The project includes GitHub Actions for automatic deployment
   - Build output directory: `dist`
   - API location: Not applicable (external API)

### Database Deployment (Google Cloud SQL)

1. **Create MySQL instance:**
```bash
gcloud sql instances create housemate-db \
  --database-version=MYSQL_8_0 \
  --tier=db-f1-micro \
  --region=africa-south1
```

2. **Create database and user:**
```bash
gcloud sql databases create housemate_db --instance=housemate-db
gcloud sql users create housemate-user --instance=housemate-db --password=secure_password
```

## 🎯 Project Features

### Main Features & Functionality

#### 🏠 House Management
- **House Creation & Setup** - Create and customize household spaces with unique identifiers
- **Member Invitation System** - Invite roommates via email with secure registration links
- **Role-Based Access Control** - Admin and standard user roles with appropriate permissions
- **House Statistics Dashboard** - Real-time overview of household activity and contributions

#### 👥 User Management
- **Secure Authentication** - JWT-based login system with password hashing
- **User Profiles** - Customizable profiles with avatar upload and personal information
- **Member Directory** - View all housemates with contact information and roles
- **Account Management** - Update personal details, change passwords, and manage preferences

#### 💰 Bill Management
- **Bill Creation & Tracking** - Add bills with details, amounts, and due dates
- **Automatic Bill Splitting** - Smart distribution of costs among selected housemates
- **Payment Tracking** - Mark payments as complete and track outstanding balances
- **Payment History** - Comprehensive record of all bill payments and transactions
- **Bill Categories** - Organize expenses by type (utilities, rent, groceries, etc.)

#### 📋 Task Management
- **Task Assignment** - Create and assign household tasks to specific members
- **Task Scheduling** - Set due dates and priorities for efficient task management
- **Progress Tracking** - Monitor task completion status and overdue items
- **Task History** - Maintain records of completed tasks and member contributions
- **Recurring Tasks** - Set up repeating tasks for regular household maintenance

#### 📅 Event Scheduling
- **Event Creation** - Schedule house meetings, social events, and maintenance activities
- **Calendar Integration** - Visual calendar view of all scheduled events
- **Attendance Tracking** - Manage event participants and track attendance
- **Event Types** - Categorize events (meetings, social, maintenance, recurring)
- **Notification System** - Alert members about upcoming events and changes

#### 📊 Analytics & Reporting
- **Personal Statistics** - Individual task completion and bill contribution metrics
- **House Analytics** - Overall household performance and activity insights
- **Financial Reports** - Expense tracking and payment analysis
- **Activity Monitoring** - Track member engagement and participation levels

#### 🔐 Security & Performance
- **Data Protection** - Secure data handling with input validation and sanitization
- **Rate Limiting** - API protection against abuse and excessive requests
- **Responsive Design** - Optimized experience across desktop, tablet, and mobile devices
- **Offline Capabilities** - Progressive Web App features for offline functionality
- **Performance Monitoring** - Real-time performance tracking and optimization

#### 🎨 User Experience
- **Intuitive Interface** - Clean, modern design with easy navigation
- **Dark/Light Mode** - Theme switching for user preference
- **Interactive Components** - Smooth animations and responsive interactions
- **Accessibility** - WCAG compliant design for inclusive user experience
- **Search & Filtering** - Quick access to specific bills, tasks, and events

## � Project Documentation

### 📋 **Project Proposal & Design**
- **[Design Document & Proposal](https://docs.google.com/presentation/d/1sEDTh27cn-yEqHB2aYB3yHqXs97zfoTednUUVy9m1Ts/edit?usp=sharing)** - Complete project planning, user stories, wireframes, and technical specifications

## 🗄️ Database Design

### Entity Relationship Diagram (ERD)

```
┌─────────────┐       ┌─────────────┐       ┌─────────────┐
│    HOUSES   │       │    USERS    │       │    TASKS    │
├─────────────┤       ├─────────────┤       ├─────────────┤
│ id (PK)     │◄──────┤ house_id    │       │ id (PK)     │
│ name        │       │ id (PK)     │──────►│ assigned_to │
│ address     │       │ name        │       │ created_by  │
│ house_rules │       │ surname     │       │ house_id    │
│ avatar      │       │ email       │       │ title       │
│ created_by  │       │ password    │       │ description │
│ created_at  │       │ bio         │       │ status      │
│ updated_at  │       │ phone       │       │ priority    │
└─────────────┘       │ avatar      │       │ due_date    │
                      │ role        │       │ category    │
                      │ status      │       │ created_at  │
                      │ created_at  │       │ updated_at  │
                      └─────────────┘       └─────────────┘
                              │
                              │
                      ┌─────────────┐       ┌─────────────┐
                      │    BILLS    │       │ BILL_SHARE  │
                      ├─────────────┤       ├─────────────┤
                      │ id (PK)     │──────►│ bill_id     │
                      │ title       │       │ user_id     │
                      │ description │       │ amount      │
                      │ amount      │       │ amount_paid │
                      │ category    │       │ status      │
                      │ house_id    │       │ paid_by     │
                      │ created_by  │       │ paid_at     │
                      │ due_date    │       │ payment_method │
                      │ status      │       │ created_at  │
                      │ created_at  │       └─────────────┘
                      │ updated_at  │
                      └─────────────┘
                              │
                              │
                      ┌─────────────┐       ┌─────────────┐
                      │BILL_HISTORY │       │  SCHEDULE   │
                      ├─────────────┤       ├─────────────┤
                      │ id (PK)     │       │ id (PK)     │
                      │ bill_id     │       │ house_id    │
                      │ user_id     │       │ title       │
                      │ action      │       │ description │
                      │ amount      │       │ scheduled_date │
                      │ notes       │       │ scheduled_time │
                      │ created_at  │       │ type        │
                      └─────────────┘       │ attendees   │
                                            │ recurrence  │
                                            │ created_by  │
                                            │ created_at  │
                                            │ updated_at  │
                                            └─────────────┘
```

### Key Relationships
- **Houses → Users**: One-to-many (One house can have multiple users)
- **Users → Tasks**: One-to-many (Users can be assigned multiple tasks)
- **Users → Bills**: One-to-many (Users can create multiple bills)
- **Bills → Bill_Share**: One-to-many (Each bill can be split among multiple users)
- **Bills → Bill_History**: One-to-many (Each bill maintains payment history)
- **Houses → Schedule**: One-to-many (Each house can have multiple scheduled events)

## 🚀 Live Demo

- **Frontend (Custom Domain)**: [https://www.housemate.website](https://www.housemate.website)
- **Frontend (Azure Static Web Apps)**: [https://white-water-0fbd05910.3.azurestaticapps.net](https://white-water-0fbd05910.3.azurestaticapps.net)
- **Backend API (Google Cloud Run)**: [https://housemate-backend-234825552341.africa-south1.run.app](https://housemate-backend-234825552341.africa-south1.run.app)
- **Demo Video**: [🎥 Walkthrough Video](https://drive.google.com/file/d/1nfEjGqwr8m8vn9OnU4X9X3suUY5qn9lB/view?usp=sharing)



### 🚀 **Live Resources**
- **Production Frontend**: [www.housemate.website](https://www.housemate.website)
- **API Documentation**: Available through backend health endpoint
- **Source Code**: Complete codebase available in this GitHub repository

## 🎯 Conclusion

The Housemate application successfully delivers a comprehensive household management solution using modern full-stack technologies (React.js, Node.js, MySQL) with cloud deployment experience on Google Cloud and Azure platforms.

### Key Development Challenges Solved
- **Complex Database Design** - Implemented normalized schema with proper relationships for users, bills, tasks, and payments
- **Advanced Bill Splitting Logic** - Developed algorithms for automatic cost distribution and real-time payment tracking
- **Secure Authentication System** - Built JWT-based authentication with role-based access control
- **Cross-Platform Compatibility** - Achieved responsive design with PWA capabilities across all devices
- **Cloud Deployment & DevOps** - Established CI/CD pipelines with containerized deployment strategies

### Future Enhancements
**Short-term**: Mobile applications, push notifications, receipt scanning, payment integration, and advanced analytics
**Long-term**: Multi-house management, smart home integration, AI-powered features, and microservices architecture

### Learning Outcomes
This project demonstrates complete software development lifecycle expertise including full-stack development, cloud architecture, database optimization, UX design, and modern DevOps practices - showcasing technical proficiency essential for professional web development.

## 📄 License

MIT License

Copyright (c) 2025 Dhiali Chetty

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## 📞 Contact Information

**Developer:** Dhiali Chetty  
**Email:** info@dhialidigitaldesigns.co.za  

## 🙏 Acknowledgments

This project was made possible through the following resources, documentation, and tools:

### Documentation & Official Resources
- **React.js Documentation** - [https://react.dev/](https://react.dev/) - Component architecture and hooks implementation
- **Node.js Documentation** - [https://nodejs.org/docs/](https://nodejs.org/docs/) - Backend server development
- **Express.js Guide** - [https://expressjs.com/](https://expressjs.com/) - Web framework implementation
- **MySQL Documentation** - [https://dev.mysql.com/doc/](https://dev.mysql.com/doc/) - Database design and optimization
- **Tailwind CSS Docs** - [https://tailwindcss.com/docs](https://tailwindcss.com/docs) - Styling and responsive design
- **Vite Documentation** - [https://vitejs.dev/](https://vitejs.dev/) - Build tool configuration

### Cloud Platform Resources
- **Google Cloud Documentation** - [https://cloud.google.com/docs](https://cloud.google.com/docs) - Cloud Run deployment and Cloud SQL setup
- **Microsoft Azure Documentation** - [https://docs.microsoft.com/azure/](https://docs.microsoft.com/azure/) - Static Web Apps deployment
- **GitHub Actions Documentation** - [https://docs.github.com/actions](https://docs.github.com/actions) - CI/CD pipeline implementation

### Development Tools & Libraries
- **JWT.io** - [https://jwt.io/](https://jwt.io/) - JSON Web Token implementation guide
- **bcrypt Documentation** - Password hashing and security best practices
- **Axios Documentation** - [https://axios-http.com/](https://axios-http.com/) - HTTP client implementation
- **Radix UI Documentation** - [https://www.radix-ui.com/](https://www.radix-ui.com/) - Accessible component library
- **Lucide React** - [https://lucide.dev/](https://lucide.dev/) - Icon library and implementation

### Learning Resources & Tutorials
- **MDN Web Docs** - [https://developer.mozilla.org/](https://developer.mozilla.org/) - JavaScript, HTML, and CSS references
- **Stack Overflow** - [https://stackoverflow.com/](https://stackoverflow.com/) - Community support and problem-solving
- **YouTube Tutorials** - Various creators for React, Node.js, and deployment tutorials

### AI Assistants & Development Support
- **ChatGPT (OpenAI)** - Documentation writing and debugging support

### Design & UI/UX Resources
- **Figma Community** - UI component inspiration and design patterns


## 👥 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

