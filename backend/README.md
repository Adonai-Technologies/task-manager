
# 🧠 Task Manager API with Permit.io Authorization

Welcome to the **Task Manager API**! This project helps you manage tasks while keeping things secure using Permit.io for authorization.

Even if you're new to coding, follow these steps and you'll learn how to build and protect an API.

---

## 📌 What This App Does

- ✅ Users can log in (Admin or Regular User)
- 📝 Admins can create, update, delete, and view tasks
- 👀 Regular users can only view tasks
- 🛡️ All permissions are checked using **Permit.io**, not hardcoded

---

## 🧰 Tech Stack

- **Node.js + Express** (the server)
- **JWT** (for login/auth)
- **Permit.io** (for managing permissions)
- **Render** (for deployment)

---

## 🚀 Live Link

👉 [https://task-manager-t318.onrender.com](https://task-manager-t318.onrender.com)

---

## 🧪 Test It (No setup needed)

Use **Postman** or **curl** to test.  
### 🔐 Login as Admin
```bash
POST /api/auth/login
{
  "username": "admin",
  "password": "2025DEVChallenge"
}
```

### 👤 Login as User
```bash
POST /api/auth/login
{
  "username": "newuser",
  "password": "2025DEVChallenge"
}
```

Each will return a **token**. Use it as a Bearer token in headers.

---

## 🧱 API Routes

### ✅ Get Tasks
```http
GET /api/tenants/tenant-1/tasks
```

### 🆕 Create Task (Admin only)
```http
POST /api/tenants/tenant-1/tasks
{
  "title": "Do Homework"
}
```

### ✏️ Update Task (Admin only)
```http
PUT /api/tenants/tenant-1/tasks/:taskId
```

### ❌ Delete Task (Admin only)
```http
DELETE /api/tenants/tenant-1/tasks/:taskId
```

---

## 🔐 How Authorization Works

### 🛑 Traditional Way (DON'T do this)
```js
if (user.role === 'admin') {
  // Allow access
}
```

Hardcoding roles is bad. It’s hard to manage and not scalable.

---

### ✅ Better Way with Permit.io
We ask Permit.io like this:
```js
const allowed = await permit.check(user, action, resource);
if (!allowed) return res.status(403).json({ error: "Access Denied" });
```

You control permissions from Permit.io's dashboard — not the code!

---

## 🧠 Setup (for Developers)

### 1. Clone this repo
```bash
git clone https://github.com/your-username/task-manager
cd task-manager
```

### 2. Install backend
```bash
cd backend
npm install
```

### 3. Add `.env` file
Create a `.env` file and add:
```env
JWT_SECRET=your_jwt_secret
PERMIT_API_KEY=your_permit_api_key
```

> **NOTE**: Never share these keys publicly.

### 4. Run the server
```bash
node index.js
```

Your API will run on `http://localhost:5000`

---

## 🛠 Permit.io Setup Summary

- Create a **Tenant** (`global`, `tenant-1`)
- Create **Roles** (`admin`, `user`)
- Create a **Resource** called `task` with actions: `read`, `create`, `update`, `delete`
- Assign permissions using **Roles → Actions → Resources → Tenants**

---

## 👨‍💻 Author

Built with ❤️ for the [Permit.io API-First Authorization Challenge](https://permit.io)

---

## 📂 Notes

- `.env` and `node_modules` are excluded in `.gitignore`
- Frontend not needed — all routes can be tested via Postman
