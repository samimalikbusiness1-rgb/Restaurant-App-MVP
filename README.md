# 🍽️ Bite Club — Restaurant App FULL STACK (Assignment#02)

Bite Club is a restaurant application developed using React Native (Expo), Node.js, Express.js, and MongoDB. The application allows customers to explore food items, manage their cart, place orders, and make table reservations. It also includes a manager role for managing menu items and orders.

## 🚀 Tech Stack

| Layer             | Technology                      |
| ----------------- | ------------------------------- |
| Mobile App        | React Native, Expo              |
| Backend           | Node.js, Express.js             |
| Database          | MongoDB Atlas / MongoDB Compass |
| Authentication    | JWT (JSON Web Token)            |
| Password Security | bcrypt                          |
| API Testing       | Thunder Client                  |
| Development Tools | Visual Studio Code, PowerShell  |

## ✨ Features

### 👤 Customer Features

- Customer registration and login
- JWT-based authentication
- Browse available food items
- Add and remove items from the cart
- Update item quantities
- View subtotal, delivery charges, and total amount
- Place food orders
- Select payment methods: Cash on Delivery, Card, Easypaisa, and JazzCash
- View personal order history
- Cancel pending orders
- Check table availability
- Make and cancel table reservations
- View and update profile information

### 👨‍💼 Manager Features

- Manager login with role-based access
- Add new food items
- Update existing menu items
- Delete menu items
- View all customer orders
- Update order status
- Manage restaurant orders through the manager dashboard

## 🗂️ Project Structure

bite-club/
│
├── src/
│ └── app/
│ └── index.tsx
│
├── server/
│ ├── config/
│ ├── middleware/
│ ├── models/
│ ├── routes/
│ │ ├── auth.js
│ │ ├── menu.js
│ │ ├── orders.js
│ │ └── reservation.js
│ ├── .env
│ ├── package.json
│ └── server.js
│
└── README.md

## ⚙️ Installation & Setup

### 1. Install Frontend Dependencies

npm install

### 2. Install Backend Dependencies

cd server
npm install

### 3. Configure Environment Variables

PORT=5000
MONGODB_URI=mongodb connection string
ADMIN_NAME=Restaurant Manager
ADMIN_EMAIL=manager email
ADMIN_PASSWORD=manager password

### 4. Start the Backend Server

npm run dev

The backend runs at:

http://localhost:5000

Health check endpoint:

http://localhost:5000/api/health

### 5. Start the Expo App

Open second terminal:
npx expo start

Scan the QR code using Expo Go to run the application on your phone.

## 🗄️ Database

The database supports:

- User accounts and authentication
- Food menu items
- Customer orders
- Table reservations
- Restaurant table availability

## 🚪 Login Credentials

| **Role** | **Email**             | **Password** |
| -------- | --------------------- | ------------ |
| Customer | customer@biteclub.com | Password123  |
| Manager  | manager@gmail.com     | Password123  |

## 📡 API Endpoints

Base URL:
http://localhost:5000

### 🔑 Authentication —

| Method | Endpoint           | Description         |
| ------ | ------------------ | ------------------- |
| POST   | `/api/auth/signup` | Register a customer |
| POST   | `/api/auth/login`  | Log in a user       |

### 🍔 Menu —

| Method | Endpoint        | Access  | Description              |
| ------ | --------------- | ------- | ------------------------ |
| GET    | `/api/menu`     | Public  | Get available menu items |
| POST   | `/api/menu`     | Manager | Add a food item          |
| PATCH  | `/api/menu/:id` | Manager | Update a food item       |
| DELETE | `/api/menu/:id` | Manager | Delete a food item       |

### 🛒 Orders —

| Method | Endpoint                 | Access        | Description                      |
| ------ | ------------------------ | ------------- | -------------------------------- |
| POST   | `/api/orders`            | Authenticated | Place a new order                |
| GET    | `/api/orders/my`         | Authenticated | Get the logged-in user's orders  |
| GET    | `/api/orders`            | Manager       | Get all customer orders          |
| PATCH  | `/api/orders/:id/cancel` | Authenticated | Cancel an eligible pending order |
| PATCH  | `/api/orders/:id/status` | Manager       | Update an order's status         |

Available order statuses include `Pending`, `Preparing`, `Ready`, `Served`, and `Cancelled`.

### 📅 Reservations

| Method | Endpoint                                       | Access | Description                                              |
| ------ | ---------------------------------------------- | ------ | -------------------------------------------------------- |
| GET    | `/api/reservations/availability`               | Public | Check available tables for a date, time, and guest count |
| POST   | `/api/reservations`                            | Public | Create a table reservation                               |
| GET    | `/api/reservations/tables/status`              | Public | Get the status of restaurant tables                      |
| PATCH  | `/api/reservations/tables/:tableNumber/status` | Public | Update a table's status                                  |
| POST   | `/api/reservations/cancel`                     | Public | Cancel a reservation                                     |
| GET    | `/api/reservations`                            | Public | Get all reservations                                     |

## 🧪 API Testing

The backend APIs can be tested using Postman or Thunder Client.

1. Start the backend server.
2. Test `GET /api/health`.
3. Register a customer using `POST /api/auth/signup`.
4. Log in using `POST /api/auth/login`.
5. Use the returned JWT token for protected endpoints.
6. Retrieve menu items using `GET /api/menu`.
7. Test order creation and order history.
8. Test reservation availability and table booking.
9. Log in as a manager to test menu management and order status updates.

## 💳 Payment Information

The application provides payment-method selection for Cash on Delivery, Card, Easypaisa, and JazzCash. Selecting a payment method does not itself process an online payment; a payment gateway integration would be required for real transactions.
