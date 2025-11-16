# <img src="frontend/public/housemate-logo.png" alt="Housemate Logo" width="40" height="40" style="vertical-align: middle;"> Housemate - Smart Household Management System

**A Full-Stack Web Application | Developed by Dhiali Chetty**

## Short Project Description:

Housemate is a full-stack web application built to solve coordination challenges in shared living spaces. The project enables roommates to efficiently manage household tasks, split bills automatically, schedule events and maintain transparent communication through role-based access control.

Built using React.js frontend with Node.js/Express backend and MySQL database, the application delivers a complete household management solution with real-time updates and secure authentication. Key features include automated bill splitting, task assignment tracking, event scheduling and comprehensive household statistics.

The project was successfully deployed on Google Cloud Run (backend) and Azure Static Web Apps (frontend) with a custom domain. However, due to financial constraints, the live deployment was discontinued and the application now runs locally for demonstration purposes. This showcases the complete development lifecycle from local development through cloud deployment.

**Digital Solution Type:** Progressive Web Application (PWA) - Responsive web application optimized for both desktop and tablet devices with offline capabilities.

## 🎯 What the App Does

Housemate is a complete household management solution that enables roommates to:

- **👥 Manage Household Members** - Create houses, invite housemates, and manage user roles
- **💰 Track Bills & Expenses** - Split bills automatically, track payments, and manage shared expenses
- **📋 Coordinate Tasks** - Assign household tasks, track completion, and maintain accountability
- **📅 Schedule Events** - Plan house meetings, social events, and maintenance activities
- **📊 Monitor Activity** - View household statistics and track contributions
- **🔐 Secure Authentication** - Role-based access control with admin and standard user permissions

## 🚀 Live Demo

- **Frontend (Custom Domain)**: [https://www.housemate.website](https://www.housemate.website)
- **Frontend (Azure Static Web Apps)**: [https://white-water-0fbd05910.3.azurestaticapps.net](https://white-water-0fbd05910.3.azurestaticapps.net)
- **Backend API (Google Cloud Run)**: [https://housemate-backend-234825552341.africa-south1.run.app](https://housemate-backend-234825552341.africa-south1.run.app)
- **Demo Video**: [🎥 Walkthrough Video](https://drive.google.com/file/d/1nfEjGqwr8m8vn9OnU4X9X3suUY5qn9lB/view?usp=sharing)
- **Project Proposal**: [📋 Design Document](https://docs.google.com/presentation/d/1sEDTh27cn-yEqHB2aYB3yHqXs97zfoTednUUVy9m1Ts/edit?usp=sharing)
- **GitHub Repository**: [https://github.com/Dhiali/Housemate](https://github.com/Dhiali/Housemate)

## 🛠️ Tech Stack

### Frontend
- **React 19.1.1** - Modern React with latest features
- **Vite** - Fast build tool and development server
- **React Router** - Client-side routing
- **Axios** - HTTP client for API requests
- **Radix UI** - Accessible UI components
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library
- **Framer Motion** - Animation library

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MySQL** - Relational database
- **JWT** - JSON Web Token authentication
- **bcryptjs** - Password hashing
- **Helmet** - Security middleware
- **CORS** - Cross-origin resource sharing
- **Express Rate Limit** - API rate limiting
- **Multer & Sharp** - Image upload and processing

### Infrastructure & Deployment
- **Google Cloud SQL** - Managed MySQL database
- **Google Cloud Run** - Containerized backend deployment
- **Azure Static Web Apps** - Frontend hosting
- **GitHub Actions** - CI/CD pipeline

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

## ✨ Feature List

### 🔐 Authentication & User Management
- [x] User registration and login
- [x] JWT-based authentication
- [x] Role-based access control (Admin, Standard, Read-only)
- [x] Profile management with avatars
- [x] House creation and invitation system
- [ ] Email verification for new accounts
- [ ] Forgot password functionality

### 🏠 House Management
- [x] Create and manage houses
- [x] House avatar upload
- [x] House rules and address management
- [x] Invite and manage housemates
- [x] View housemate profiles and contact information

### 💰 Bill Management
- [x] Create bills with categories and due dates
- [x] Automatic bill splitting among housemates
- [x] Track individual payments and contributions
- [x] Payment history and status tracking
- [x] Bill status management (Active, Paid, Overdue)
- [ ] Custom bill splitting (unequal amounts per person)
- [ ] Admin approval required for bill creation
- [ ] Filter bills by logged-in user
- [ ] Payment status accuracy improvements

### 📋 Task Management
- [x] Create and assign tasks to housemates
- [x] Task categories and priority levels
- [x] Due date tracking and status updates
- [x] Task completion tracking
- [ ] Functional filter and dropdown options
- [ ] Delete permissions for standard users

### 📅 Schedule & Events
- [x] Create house events and meetings
- [x] Event scheduling with date and time
- [x] Event types (Meeting, Social, Maintenance, Recurring)
- [ ] Event visibility controls and invitations
- [ ] Click-to-open functionality for upcoming items

### 📊 Dashboard & Analytics
- [x] Household statistics and activity overview
- [x] Quick action buttons for common tasks
- [x] Activity feed showing recent changes
- [x] Upcoming tasks and bill reminders
- [ ] Improved styling with sticky headers
- [ ] 3-day upcoming task filter

### 💬 Communication
- [x] View housemate contact information
- [ ] Send message functionality (Email/SMS/WhatsApp)
- [ ] Email notifications for housemate invitations

### ⚙️ Settings & Configuration
- [x] Basic settings structure
- [ ] Functional settings tabs
- [ ] Theme customization
- [ ] Notification preferences

## 🏃‍♂️ How to Run Locally

### Prerequisites
- Node.js 18+ installed
- MySQL database server
- Git

### 1. Clone the Repository
```bash
git clone https://github.com/Dhiali/Housemate.git
cd Housemate
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env
```

Edit the `.env` file with your configuration:

```env
# Database Configuration
MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PASSWORD=your_password
MYSQL_DATABASE=housemate_db
MYSQL_PORT=3306

# JWT Secret
JWT_SECRET=your_super_secret_jwt_key_here

# Server Configuration
PORT=5000
NODE_ENV=development

# Optional: Database URL (alternative to individual MySQL vars)
DATABASE_URL=mysql://user:password@host:port/database
```

### 3. Database Setup

Create a MySQL database:
```sql
CREATE DATABASE housemate_db;
```

The application will automatically create all required tables on startup.

### 4. Start Backend Server

```bash
# Development mode (with auto-restart)
npm run dev

# Production mode
npm start
```

Backend will be available at: `http://localhost:5000`

### 5. Frontend Setup

```bash
# Navigate to frontend directory (from project root)
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend will be available at: `http://localhost:5173`

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

## 🎥 Demo Video

**🎬 [Watch the Complete Walkthrough Video](https://drive.google.com/file/d/1nfEjGqwr8m8vn9OnU4X9X3suUY5qn9lB/view?usp=sharing)**

The demo video showcases:
- User registration and house creation
- Housemate invitation and management
- Bill creation and payment tracking
- Task assignment and completion
- Event scheduling
- Dashboard overview and navigation
- Authentication system and role-based access control
- Complete CRUD operations across all features
- Live deployment and technical architecture

## 🔮 Future Improvements

### High Priority
- **Custom Bill Splitting**: Allow custom amounts per person instead of equal division
- **Forgot Password**: Implement password reset functionality
- **Bill Creation Authorization**: Require admin approval for bill creation by standard users
- **Event Visibility Controls**: Filter who sees events and manage invitations
- **Payment Status Accuracy**: Fix frontend connection to show correct payment amounts owed
- **Email Verification**: Verify email addresses during house creation and user invitations

### Medium Priority
- **Improved Navigation**: Make upcoming items clickable to open actual items
- **Enhanced Styling**: Implement sticky headers and improved visual design
- **Smart Task Filtering**: Show only next 3 days of upcoming tasks
- **Functional Filters**: Make all dropdown and filter buttons fully functional
- **Message Integration**: Enable email/SMS/WhatsApp messaging from contact cards
- **User Permissions**: Give standard users delete permissions where appropriate

### Low Priority
- **Profile Picture Integration**: Fix frontend connection to display user avatars consistently
- **Settings Functionality**: Complete implementation of all settings tabs
- **Notification System**: Add real-time notifications for important events
- **Mobile Optimization**: Improve mobile responsiveness and touch interactions
- **Recurring Task Templates**: Create templates for common recurring household tasks
- **Expense Analytics**: Add detailed spending analytics and budget tracking

### Technical Improvements
- **Database Optimization**: Add indexes and optimize queries for better performance
- **Error Handling**: Improve error messages and user feedback
- **Testing**: Add comprehensive unit and integration tests
- **Documentation**: Expand API documentation and user guides
- **Security**: Implement additional security measures and audit logs
- **Accessibility**: Improve accessibility compliance and screen reader support

## � Project Documentation

### 📋 **Project Proposal & Design**
- **[Design Document & Proposal](https://docs.google.com/presentation/d/1sEDTh27cn-yEqHB2aYB3yHqXs97zfoTednUUVy9m1Ts/edit?usp=sharing)** - Complete project planning, user stories, wireframes, and technical specifications

### 🎥 **Demo & Walkthrough**
- **[Complete Walkthrough Video](https://drive.google.com/file/d/1nfEjGqwr8m8vn9OnU4X9X3suUY5qn9lB/view?usp=sharing)** - Full application demonstration including authentication, CRUD operations, and deployment

### 🗄️ **Database Resources**
- **Database Export**: Available in project repository (`housemate_backup_2025-11-05_13-37.sql`)
- **ERD Documentation**: Included in this README with complete relationship mapping

### 🚀 **Live Resources**
- **Production Frontend**: [www.housemate.website](https://www.housemate.website)
- **API Documentation**: Available through backend health endpoint
- **Source Code**: Complete codebase available in this GitHub repository

## �📄 License

This project is licensed under the UNLICENSED License - see the package.json files for details.

## 👥 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📞 Support

For support and questions:
- Create an issue in the GitHub repository
- Contact the development team

## 🏆 Acknowledgments

- React team for the amazing framework
- Radix UI for accessible component primitives
- Google Cloud Platform for reliable hosting
- Azure Static Web Apps for frontend deployment
- All contributors and testers who helped improve this application

---

**Built with ❤️ for better household management**