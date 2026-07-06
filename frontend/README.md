# KB Task Board - React Frontend (frontend)

This is the redesigned React frontend dashboard application built for the **KB Task Board** workspace. It uses a KB logo treatment, modern glassmorphism panels, and custom React hooks for business logic separation.

---

## 🚀 Key Features

- **Interface Design:** Dynamic animations, glowing network node loops, custom dark/light theme systems, and responsive viewport sizing.
- **Separation of Concerns:** Zero business logic in presentation components. State management, REST APIs, and socket synchronization are entirely managed via React Contexts and hooks (`useTasks`, `useUsers`, `useActivity`).
- **Interactive Kanban Board:** Draggable task cards, column highlights, inline actions, search query filters, priority badges, assignee tags, and due date countdown indicators.
- **Immersive Authorization layouts:** Split-layout login and register views featuring glowing grid lines and glassmorphic card overlays.
- **Admin Controls workspace:** Responsive tables for administrative audits, search queries, role adjustments, and team member delete locks.
- **Productivity Feed Sidebar:** Right side panel tracking real-time activity socket feeds, closest upcoming deadlines, and quick tasks shortcuts.

---

## 🛠 Prerequisites

Ensure you have the following installed:

- **Node.js** (v18.x or higher)
- **npm** (v10.x or higher) or **pnpm**
- A running instance of the **Task Management Backend** at `http://localhost:5000`

---

## ⚙️ Development Proxy Setup

Vite is pre-configured in [vite.config.js](mini-Trello/frontend/vite.config.js) to proxy `/api` and `/socket.io` traffic to the backend server.
Ensure your backend is running on port `5000`. If running elsewhere, update the target in `vite.config.js`:

```javascript
proxy: {
  '/api': {
    target: 'http://localhost:5000', //change if your backend is running on different port
    changeOrigin: true
  },
  '/socket.io': {
    target: 'http://localhost:5000', //change if your backend is running on different port
    ws: true,
    changeOrigin: true
  }
}
```

---

## 📦 Installation & Execution

### 1. Install Dependencies

Run the installation in the `frontend` directory (using `--legacy-peer-deps` to bypass React 19 peer dependencies check for lucide-react):

```bash
npm install --legacy-peer-deps
```

### 2. Run in Development Mode

Start the Vite local dev server:

```bash
npm run dev
```

Open your browser and navigate to `http://localhost:5173`.

### 3. Build for Production

Verify bundle packaging compilation output is free of warnings and compiles cleanly:

```bash
npm run build
```

The compiled assets will be created in the `dist` directory.

---

## 🎨 Styling Guide & Colors

- **Primary Red Accent:** `#ef2b2d`
- **Dark Mode Bg:** `#0a0a0a` | **Dark Mode Cards:** `#111827` / `#1f2937`
- **Light Mode Bg:** `#ffffff` | **Light Mode Cards:** `#f8fafc`
- **Success Tag:** `#22c55e` | **Warning Tag:** `#f59e0b` | **Error Tag:** `#ef4444`
- **Typography:** Linked Outfit & Inter from Google Fonts.
