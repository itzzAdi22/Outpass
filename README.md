# Digital Out-Pass System

A full-stack web application for managing out-pass requests with authentication and role-based access control.

## Features

- **Authentication**: JWT-based login/registration system
- **Role-based Access**: Student and Admin roles with different permissions
- **Out-Pass Management**: Create, view, and manage out-pass requests
- **Real-time Status Updates**: Students can see the status of their requests
- **Admin Dashboard**: View all requests and approve/reject them
- **Responsive Design**: Clean UI using Tailwind CSS

## Tech Stack

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **bcryptjs** for password hashing
- **CORS** for cross-origin requests

### Frontend
- **React.js** with React Router
- **Tailwind CSS** for styling
- **Axios** for API calls
- **Context API** for state management

## Project Structure

```
digital-outpass-system/
├── backend/
│   ├── config/
│   │   └── database.js          # MongoDB connection
│   ├── middleware/
│   │   └── auth.js              # Authentication middleware
│   ├── models/
│   │   ├── User.js              # User model
│   │   └── OutPass.js           # OutPass model
│   ├── routes/
│   │   ├── auth.js              # Authentication routes
│   │   └── outpass.js           # OutPass routes
│   ├── .env                     # Environment variables
│   ├── package.json
│   └── server.js                # Express server
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   └── PrivateRoute.js   # Route protection
│   │   ├── context/
│   │   │   └── AuthContext.js    # Authentication context
│   │   ├── pages/
│   │   │   ├── Login.js          # Login page
│   │   │   ├── Register.js       # Registration page
│   │   │   ├── StudentDashboard.js # Student dashboard
│   │   │   └── AdminDashboard.js # Admin dashboard
│   │   ├── services/
│   │   │   └── api.js            # API service with Axios
│   │   ├── App.js                # Main App component
│   │   ├── index.js              # Entry point
│   │   └── index.css             # Tailwind CSS
│   ├── package.json
│   ├── tailwind.config.js
│   └── postcss.config.js
└── README.md
```

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (installed and running)
- npm or yarn

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the backend directory with:
   ```
   MONGODB_URI=mongodb://localhost:27017/digital-outpass
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   PORT=5000
   ```

4. **Start the backend server**
   ```bash
   npm run dev
   ```
   The server will run on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the frontend development server**
   ```bash
   npm start
   ```
   The app will run on `http://localhost:3000`

## API Endpoints

### Authentication Routes
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user info

### Out-Pass Routes
- `POST /api/pass/create` - Create new out-pass request (Student)
- `GET /api/pass/my` - Get user's out-pass requests (Student)
- `GET /api/pass/all` - Get all out-pass requests (Admin)
- `PUT /api/pass/:id` - Update out-pass status (Admin)

## Usage

### For Students
1. Register as a student or login
2. Create out-pass requests with date, time, and reason
3. View the status of your requests (Pending/Approved/Rejected)

### For Admins
1. Register as an admin or login
2. View all out-pass requests from students
3. Approve or reject pending requests
4. View statistics dashboard

## Default Roles
- **Student**: Can create and view their own out-pass requests
- **Admin**: Can view all requests and approve/reject them

## Environment Variables

### Backend (.env)
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT token generation
- `PORT`: Server port (default: 5000)

### Frontend (optional)
- `REACT_APP_API_URL`: Backend API URL (default: http://localhost:5000/api)

## Security Notes
- Passwords are hashed using bcryptjs
- JWT tokens are used for authentication
- Admin routes are protected with role-based middleware
- CORS is configured for cross-origin requests

## Development

### Running in Development Mode
1. Start MongoDB server
2. Start backend server: `npm run dev` (in backend directory)
3. Start frontend server: `npm start` (in frontend directory)

### Building for Production
1. Frontend: `npm run build` (in frontend directory)
2. Backend: `npm start` (in backend directory)

## Deploying

### Render

This repository includes a [`render.yaml`](./render.yaml) blueprint for deploying the full app as a single Node web service.

The deployment uses demo mode by default so it can run without MongoDB:

- `USE_DEMO_DATA=true`
- `JWT_SECRET` is generated by Render
- health check: `/api/health`

Steps:

1. Push the repo to GitHub
2. In Render, create a new Blueprint or Web Service from the repo
3. Let Render run:
   - Build command: `npm run install:all && npm run build`
   - Start command: `npm run start`
4. Open the generated Render URL

If you want a real database-backed deployment later, set:

- `USE_DEMO_DATA=false`
- `MONGODB_URI=<your mongodb connection string>`
- keep `JWT_SECRET` set

### Vercel

This repository also includes a [`vercel.json`](./vercel.json) and [`api/index.js`](./api/index.js) so Vercel can detect the project as an Express deployment.

If you deploy on Vercel, set:

- `USE_DEMO_DATA=true`
- `JWT_SECRET=<any long random string>`

Then redeploy the repo from the project root, not the `frontend` subfolder. The root build script also copies the React build into a top-level `public` folder for Vercel compatibility.

## Troubleshooting

### Common Issues
1. **MongoDB Connection Error**: Make sure MongoDB is running
2. **CORS Error**: Check that frontend and backend URLs are correctly configured
3. **JWT Token Error**: Clear browser localStorage and login again
4. **Permission Denied**: Check user role in database

### Port Conflicts
- Backend default port: 5000
- Frontend default port: 3000
- Change ports in `.env` file (backend) or environment variables (frontend)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
