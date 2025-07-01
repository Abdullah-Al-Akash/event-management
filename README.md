# 🌿 Natural Event – Event Management Web Application

**Natural Event** is a fully functional, modern Event Management Web Application built with the **MERN stack** (MongoDB, Express.js, React.js, Node.js). It includes a fully custom authentication system, dynamic event operations, intuitive search and filtering, and a responsive user interface designed for ease of use and performance.

---

## 🚀 Features

### 🔐 Authentication (Custom Built)
- **Register/Login** using email and password (no third-party libraries).
- Clear and user-friendly error handling.
- Authentication state persists until logout.
- User profile stored with `name`, `email`, and `photoURL`.

---

### 🧭 Navbar
- Responsive Navbar with:
  - **Logo + Website Name**
  - Links to: Home, Events, Add Event, My Event
  - **Sign In** button (when not logged in)
  - **Profile dropdown** (when logged in) with:
    - User Name
    - Logout option

---

### 🏠 Homepage
- Modern, animated landing page designed with Tailwind CSS, Framer Motion, and DaisyUI.
- Highlights app purpose and navigation entry points.

---

### 📅 Events Page (Private Route)
- Displays **all available events** from the database.
- Sorted in descending order (by date and time).
- Each Event Card Includes:
  - Event Title
  - Posted By (Name)
  - Date & Time
  - Location
  - Description
  - Attendee Count
  - **Join Event** button
- User can **join an event once only**; attendee count auto-increments.
- **Search and Filter System**:
  - Search by title
  - Filter by:
    - Today’s Date
    - Current Week
    - Last Week
    - Current Month
    - Last Month

---

### ➕ Add Event Page (Private Route)
- Event submission form:
  - Event Title
  - Name
  - Date & Time
  - Location
  - Description
  - Attendee Count (default: 0)
- On submit, event is saved to the database.

---

### 👤 My Events Page (Private Route)
- Displays events **posted by the logged-in user**.
- Each card includes:
  - Event Title
  - Name
  - Date & Time
  - Location
  - Description
  - Attendee Count
  - **Update** button (shows modal or new route form)
  - **Delete** button (with confirmation prompt)

---

## 🛠️ Tech Stack

| Frontend   | Backend      | Database |
|------------|--------------|----------|
| React.js   | Node.js      | MongoDB  |
| TailwindCSS | Express.js   | Mongoose |
| DaisyUI + Framer Motion | Axios | JWT-based Auth |

---
