# Azentrix Mini Trello - Backend API Server (backend)

This is the lightweight, collaborative backend server built to power the **Azentrix mini trello** workspace. It provides secure JWT authentication, user role management, RESTful task APIs, and instant updates via WebSockets (Socket.IO).

---

## 🚀 Key Features

- **Secure Authentication:** REST APIs for registration and login using `bcryptjs` for hashing passwords and `JSON Web Tokens (JWT)` for stateless sessions.
- **Role-Based Access Control (RBAC):** Middleware restrictions ensuring Admin users can fetch and delete users, while Members can query and manage tasks.
- **Collaborative Room Syncing:** Integrates `Socket.IO` rooms (`"board"`) to broadcast real-time events (`taskCreated`, `taskUpdated`, `taskDeleted`) to all active workspace participants.
- **Database Persistence:** Custom Mongo schemas via Mongoose for storing User credentials and task board items with strict validation rules.

---

## 🛠 Prerequisites

Ensure you have the following installed on your machine:

- **Node.js** (v18.x or higher)
- **npm** (v10.x or higher) or **pnpm** / **yarn**
- **MongoDB** (Local instance running on `mongodb://localhost:27017` or a remote MongoDB Atlas connection URI)

---

## ⚙️ Configuration Setup

Create a `.env` file in the root of the `backend` folder and configure the following variables:

```env
MONGO_URI=your-mongo-uri
JWT_SECRET=your-jwt-secret
JWT_EXPIRES_IN=1d
PORT=5000 #change if your backend is running on different port
CORS_ORIGIN=http://localhost:5173 #change if your frontend is running on different port
```

---

## 📦 Installation & Execution

### 1. Install Dependencies

Run the installation command in the `backend` directory:

```bash
npm install
```

_(or `pnpm install` / `yarn install`)_

### 2. Start Database

Make sure your MongoDB server daemon is running:

```bash
# Example for local MongoDB on Windows
mongod
```

### 3. Run Development Server

Run the local dev server with auto-reload:

```bash
npm run dev
```

The server will boot on `http://localhost:5000`, and you should see:

```text
MongoDB connected
Server running on port 5000
```

---

## 🔌 API Documentation Reference

### Authentication

- `POST /api/auth/register` - Create a new user account (Name, Email, Password, Role)
- `POST /api/auth/login` - Authenticate user credentials and return a session token

### Users (Admin Only)

- `GET /api/users` - Fetch a complete list of workspace users (excludes passwords)
- `DELETE /api/users/:id` - Remove a user profile from the database

### Tasks

- `GET /api/tasks` - List all workspace tasks
- `POST /api/tasks` - Create a new board task card (Title, Description, Status, Priority, Assignee, Due Date)
- `PUT /api/tasks/:id` - Edit attributes or transition board status of an existing task
- `DELETE /api/tasks/:id` - Remove a task card permanently

---

## ⚡ WebSocket Actions

- **Room Subscription:** Connect to server namespace and emit `"join:board"` event.
- **Broadcast Events:**
  - `taskCreated` - Emitted to `"board"` room when a new task is posted.
  - `taskUpdated` - Emitted when details or status columns are updated.
  - `taskDeleted` - Emitted when a card is removed.
