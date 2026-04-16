# 🚀 SaaS Dashboard - Warehouse Management System

## 📌 Overview

A modern **SaaS Dashboard** built with React, designed to manage warehouse data such as products and orders.
The project demonstrates real-world frontend architecture, scalable structure, and production-ready features.

---

## ✨ Features

- 🔐 Authentication (Login / Logout)
- 📊 Dashboard Overview (statistics)
- 📦 Product Management (CRUD)
- 🔍 Search & Server-side Pagination
- ⚡ Data fetching with React Query
- 🧾 Form validation with React Hook Form + Yup
- 🎨 UI with Material UI + TailwindCSS + SCSS
- 🔔 Toast notifications (UX enhancement)

---

## 🛠 Tech Stack

### Frontend

- React + TypeScript
- React Router
- React Query
- Axios

### UI & Styling

- Material UI (MUI)
- TailwindCSS
- SCSS (Sass)

### Form & Validation

- React Hook Form
- Yup

### Mock Backend

- json-server

---

## 📁 Project Structure

```
src/
 ├── app/
 ├── components/
 ├── features/
 ├── hooks/
 ├── layouts/
 ├── pages/
 ├── routes/
 ├── services/
 └── styles/
```

---

## 🚀 Getting Started

### 1. Clone project

```bash
git clone https://github.com/your-username/saas-dashboard.git
cd saas-dashboard
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run frontend

```bash
npm run dev
```

### 4. Run mock API

```bash
npx json-server --watch db.json --port 3000
```

---

## 📊 API Example (json-server)

```json
{
  "products": [
    { "id": 1, "name": "Product A" },
    { "id": 2, "name": "Product B" }
  ]
}
```

---

## 🧠 Key Learnings

- Implemented **server-side pagination & search**
- Managed server state with **React Query**
- Built reusable components & clean architecture
- Improved UX with loading states & notifications

---

## 🔥 Future Improvements

- Role-based authorization (Admin/User)
- Dark mode
- Micro Frontend architecture
- Real backend integration

---

## 🌐 Demo

👉 (Add your deployed link here)

---

## 👨‍💻 Author

- Name: Your Name
- Role: Frontend Developer
- Tech: React, TypeScript

---
