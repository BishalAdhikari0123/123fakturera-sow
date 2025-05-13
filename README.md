# 📄 123fakturera Clone

This project is a responsive clone of the [123fakturera](https://online.123fakturera.se/terms/) website's **Terms and Conditions** and **Price List** pages, built using **React.js (with Vite)** for the frontend and **Node.js (with Express)** for the backend. PostgreSQL is used as the primary database.

> Initially styled with Tailwind CSS, the project now uses plain CSS for flexibility and custom responsiveness.

---

## ✨ Features

### ✅ Terms and Conditions Page
- Fully responsive replica of the original site’s `/terms` page.
- Supports both **English** and **Swedish** languages.
- Content is **dynamically loaded** from a PostgreSQL database.
- Loading spinner added for data-fetching states.

### 💰 Price List Page
- Editable table of **Products and Services**.
- Includes fields like:
  - Product/Service 
  - In Price 
  - Price
  - Stock 
- Minimum of **20 sample rows** with scroll support.
- Designed to simulate real-time inline editing with backend persistence.

### 📱 Responsive Design
- Optimized for:
  - 📳 Mobile Portrait and Landscape
  - 📱 Tablet
  - 🖥 Desktop
- Hamburger menu support for smaller screens.

### ⚙️ Backend (Express)
- REST API built with **Node.js** and **Express**.
- Connects to a **PostgreSQL** database.
- Provides routes to fetch:
  - Terms and Conditions
  - Price List items

---

## 🔧 Technologies Used

- **Frontend**: React.js + Vite, CSS
- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL
- **Hosting**: Render.com

---


---

## ⚙️ Environment Variables


```env

# Backend
PORT=4000
DB_HOST=your-db-hostname.render.com
DB_PORT=5432    
DB_USER=your_db_user
DB_PASSWORD=your_secure_password
DB_NAME=your_db_name

