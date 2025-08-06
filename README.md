# 🚀 PingMe - Real-time Chat Application

**PingMe** is a modern, real-time chat application built with React.js and Node.js. Connect instantly, chat seamlessly with friends and colleagues in a beautiful, responsive interface.

## ✨ Features

- 🔐 **User Authentication** - Secure signup/login with JWT tokens
- 💬 **Real-time Messaging** - Instant messaging with Socket.io
- 📱 **Responsive Design** - Works perfectly on desktop and mobile
- 🖼️ **Image Sharing** - Send and receive images in chats
- 🟢 **Online Status** - See who's online in real-time
- 🔔 **Unread Messages** - Badge notifications for new messages
- 👤 **User Profiles** - Customizable profiles with bio and avatar
- 🎨 **Modern UI** - Beautiful gradient design with smooth animations
- 📜 **Message History** - Persistent chat history
- 🔍 **User Search** - Find and connect with other users

## 🛠️ Tech Stack

### Frontend
- **React.js** - UI library
- **Tailwind CSS** - Styling framework
- **Socket.io Client** - Real-time communication
- **React Router** - Navigation
- **React Hot Toast** - Notifications
- **Vite** - Build tool

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Socket.io** - Real-time communication
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **Cloudinary** - Image storage
- **bcryptjs** - Password hashing

## 📋 Prerequisites

Before running this project, make sure you have:

- **Node.js** (v16 or higher)
- **MongoDB** (local installation or MongoDB Atlas)
- **Cloudinary Account** (for image uploads)

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/jain-anshika/PingMe.git
cd PingMe
```

### 2. Backend Setup
```bash
cd server
npm install
```

Create a `.env` file in the server directory:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### 3. Frontend Setup
```bash
cd ../client
npm install
```

### 4. Start the Application

**Start Backend Server:**
```bash
cd server
npm run server
```

**Start Frontend Development Server:**
```bash
cd client
npm run dev
```

The application will be available at:
- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:5000

## 📁 Project Structure

```
PingMe/
├── client/                     # Frontend React application
│   ├── src/
│   │   ├── assets/            # Images and icons
│   │   ├── components/        # Reusable React components
│   │   │   ├── ChatContainer.jsx
│   │   │   ├── SideBar.jsx
│   │   │   └── RightSidebar.jsx
│   │   ├── context/           # React Context providers
│   │   │   ├── AuthContext.jsx
│   │   │   └── ChatContext.jsx
│   │   ├── pages/             # Page components
│   │   │   ├── HomePage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   └── ProfilePage.jsx
│   │   ├── lib/               # Utility functions
│   │   └── main.jsx           # Application entry point
│   ├── package.json
│   └── vite.config.js
├── server/                     # Backend Node.js application
│   ├── controllers/           # Route handlers
│   │   ├── messageController.js
│   │   └── userController.js
│   ├── middleware/            # Custom middleware
│   │   └── auth.js
│   ├── models/                # Database models
│   │   ├── Message.js
│   │   └── User.js
│   ├── routes/                # API routes
│   │   ├── messageRoutes.js
│   │   └── userRoutes.js
│   ├── lib/                   # Configuration files
│   │   ├── cloudinary.js
│   │   ├── db.js
│   │   └── utils.js
│   ├── server.js              # Main server file
│   └── package.json
└── README.md
```

## 🔧 Configuration

### MongoDB Setup
1. Create a MongoDB database (local or MongoDB Atlas)
2. Copy the connection string to your `.env` file

### Cloudinary Setup
1. Create a free Cloudinary account
2. Get your cloud name, API key, and API secret
3. Add them to your `.env` file

### JWT Secret
Generate a secure random string for JWT_SECRET:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## 🎯 API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/check` - Check authentication status
- `PUT /api/auth/update-profile` - Update user profile

### Messages
- `GET /api/messages/users` - Get all users for sidebar
- `GET /api/messages/:id` - Get messages with specific user
- `POST /api/messages/send/:id` - Send message to user
- `PUT /api/messages/mark/:id` - Mark message as seen

## 🎨 Features Overview

### Real-time Communication
- Instant message delivery using Socket.io
- Online/offline status indicators
- Typing indicators (can be added)

### User Experience
- Smooth animations and transitions
- Mobile-first responsive design
- Intuitive chat interface
- Search functionality

### Security
- JWT token-based authentication
- Password hashing with bcryptjs
- Protected API routes
- Input validation and sanitization

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👩‍💻 Author

**Anshika Jain**
- GitHub: [@jain-anshika](https://github.com/jain-anshika)

---

⭐ **Star this repository if you found it helpful!**
