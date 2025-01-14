# Leave Application and Approval System

A modern web-based leave management system built with React, Vite, and Tailwind CSS that enables organizations to efficiently manage employee leave requests. The system provides seamless submission, review, and approval of leave requests with role-based access control.

## 🌟 Features

- **User Authentication**
  - Secure login system for employees and managers
  - Role-based access control (Employee/Manager)
  - Protected routes and authenticated API requests

- **Leave Management**
  - Submit leave applications with type specification (annual leave, sick leave)
  - Specify leave duration and reason
  - Real-time status tracking of leave applications
  - Manager dashboard for leave approval/rejection

- **Leave Reporting**
  - Comprehensive leave history for employees
  - Total leaves report showing different leave types
  - Status indicators for pending, approved, and rejected leaves
  - Leave balance tracking

- **Responsive Design**
  - Mobile-friendly interface
  - Cross-browser compatibility
  - Accessible across devices

## 🚀 Technologies Used

- **Frontend**
  - React.js with Vite
  - Tailwind CSS for styling
  - React Router for navigation
  - Axios for API requests
  
- **Backend**
  - Django Rest Framework
  - PostgreSQL Database
  - JWT Authentication

## 💻 Installation

1. Clone the repository:
```bash
git clone https://github.com/shinas07/leave-app-frontend
cd leave-app
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
VITE_APP_API_URL=https://leave-app-backend-25r7.onrender.com
VITE_APP_TOKEN_SECRET=your_token_secret
```

4. Start the development server:
```bash
npm run dev
```

## 📁 Project Structure

```
leave-app/
├── src/
│   ├── components/        # Reusable UI components
│   ├── pages/            # Page components
│   ├── context/          # React context providers
│   ├── services/         # API services
│   ├── utils/            # Helper functions
│   └── App.jsx          # Root component
├── public/              # Static assets
├── index.html          # HTML template
├── tailwind.config.js  # Tailwind configuration
├── vite.config.js      # Vite configuration
└── package.json        # Project dependencies
```

## 🔧 Usage

1. **Authentication**
   - Access the application at `http://localhost:5173`
   - Log in with your credentials
   - System will automatically detect your role (Employee/Manager)

2. **Applying for Leave (Employees)**
   - Navigate to "Apply Leave" section
   - Fill in required details (leave type, duration, reason)
   - Submit application
   - Track status in "My Leaves" section

3. **Managing Leaves (Managers)**
   - Access manager dashboard
   - View pending leave requests
   - Approve/Reject requests with comments
   - View team leave history

## 🌐 Deployment

The application is deployed using the following services:

- Frontend: Vercel
  - Auto-deploys from main branch
  - Production URL: https://leave-app-frontend.vercel.app/

- Backend: Render
  - Hosted API URL(public): https://leave-app-backend-25r7.onrender.com
  - Database: PostgreSQL on Render

### Deployment Steps

1. **Frontend (Vercel)**
   - Connect your GitHub repository to Vercel
   - Configure build settings:
     ```
     Build Command: npm run build
     Output Directory: dist
     ```
   - Add environment variables in Vercel dashboard

2. **Backend (Render)**
   - Already deployed at https://leave-app-backend-25r7.onrender.com
   - Ensure environment variables are configured in Render dashboard

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
