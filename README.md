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
- Editable table.
- Includes fields like:
  - Product/Service 
  - In Price 
  - Price
  - Stock 
- Minimum of **20 sample rows** with scroll support.
- Designed to simulate real-time inline editing with backend persistence.
- Used translations, which translates the table headers and menu header.

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


## 📬 Example API Requests

You can test your backend API using the following minimal request examples:

---

### ➕ Add a Product

**Endpoint**:  
`POST http://localhost:4002/api/products`  

**Headers**:  
`Content-Type: application/json`

**Body**:

```json
{
  "articleNo": "A1001",
  "productService": "USB Cable",
  "inPrice": "2",
  "price": "5",
  "unit": "Piece",
  "inStock": "100",
  "description": "1 meter USB Type-C cable"
}
### 📄 Save Terms (Swedish/English)

**Endpoint**  
`POST http://localhost:4002/api/terms/save-terms`

**Headers**  
`Content-Type: application/json`

**Request Body**

```json
{
  "language": "sv",
  "termsContent": "<p>Genom att klicka på Fakturera Nu accepterar du villkoren och informationen du har angett. Du kan prova programmet gratis i 14 dagar. Därefter kostar det 99 kr/mån exkl. moms.</p>"
}
```
## ⚙️ Environment Variables


```env

# Backend
PORT=4000
DB_HOST=your-db-hostname.render.com
DB_PORT=5432    
DB_USER=your_db_user
DB_PASSWORD=your_secure_password
DB_NAME=your_db_name


``` 
---
