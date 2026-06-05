# Azentrix Full-Stack Task 2 - Multi-User Task Management System (mini Trello)

This repository contains the complete implementation for **Task 2: Multi-User Task Management System (mini Trello)** built for the Azentrix Full-Stack Developer Intern task assignment.

The codebase consists of an **Express.js API server** (`backend/`) and a completely fresh, premium **React 19 + Vite + Tailwind CSS client** (`frontend2/`) designed from the ground up to replace the original boilerplate.

---

## 🔗 Live Application Links

- **Backend Live Server URL:** _(Provide Vercel/Render URL here)_
- **Frontend Web Application URL:** _(Provide Vercel/Render URL here)_
- **Loom Video Walkthrough:** _(Provide loom.com video URL here)_

---

## 🚀 System Architecture & Approach

### 1. Separation of Concerns (Business Logic vs. UI)

To avoid standard boilerplate pollution, all API interactions and state changes are decoupled from presentation screens:

- **Axios API Interceptors:** Managed in `services/api.js`. Attaches authorization tokens automatically and intercepts `401 Unauthorized` token expiry errors to log users out cleanly.
- **WebSocket Rooms Context:** Managed in `contexts/SocketContext.jsx`. Establishes connections on login, handles automatic subscription of the user's socket connection to the `"board"` room, and disconnects on log out.
- **Custom React Hooks:** Isolates component states:
  - `useTasks.js`: Manages tasks state array, filters (searches, priorities, dates), drag-and-drop handles, and binds socket event listeners.
  - `useUsers.js`: Controls listing, searching, deleting, and adding accounts.
  - `useActivity.js`: Captures real-time socket events and prints logs in the productivity feed.

### 2. High-Fidelity Responsive Design

Designed using the Azentrix Digital Services colors (`#ef2b2d` branding red, dark `#0a0a0a` background, and light `#ffffff` enterprise SaaS palette):

- Implements responsive containers matching the layout perfectly across all devices (Mobile `320px` to Ultra-wide Desktop `1920px`) with zero horizontal scrolling.
- Incorporates dynamic dark/light theme switching stored in `localStorage` and synchronized via Tailwind's `class` document selectors.

### 3. Near Real-Time Multi-User Collaboration

Using `Socket.IO`, two users logged into the application can collaborate on the board in real time:

- When User A creates, edits, deletes, or drags a task card:
  1. The REST API changes are persisted to MongoDB.
  2. The backend server broadcasts the respective event (`taskCreated`, `taskUpdated`, `taskDeleted`) to the `"board"` room.
  3. User B's websocket event handler instantly intercepts the message and updates their local component state, showing updates near-instantly without page refreshes.

---

## 🛠 Prerequisites

Make sure you have installed:

- **Node.js** (v18 or higher)
- **MongoDB** (Local or MongoDB Atlas)
- **pnpm** or **npm** (v10 or higher)

---

## ⚙️ Running Locally

Follow these quick steps to launch the local fullstack development environment:

### Step 1: Start the Backend Server

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install server modules:
   ```bash
   npm install
   ```
3. Set up the `.env` file (refer to the [Backend README](https://github.com/karthiks-dev/azentrix-fullstack-task2/blob/main/backend/README.md))
4. Launch the developer server:
   ```bash
   npm run dev
   ```

### Step 2: Start the Frontend Client

1. Open a new terminal window and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install packages (using legacy peer dependencies for React 19 lucide compatibility):
   ```bash
   npm install --legacy-peer-deps
   ```
3. Launch the Vite developer server:
   ```bash
   npm run dev
   ```
4. Click the link `http://localhost:5173` to test the application!
