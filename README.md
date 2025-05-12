# Ecommerce Admin Panel

This project is a full-stack Ecommerce Admin Panel built with **React** for the frontend, **Node.js** and **Express** for the backend, and **MongoDB** for the database. The app provides an interface to manage products and orders with quick stats, easy navigation, and a responsive UI.

## Features

### Dashboard Home
- Quick stats displaying the number of products and number of orders.

### Product Pages
- **Add Product Form**: A form to add new products.
- **Product Table/Grid**: A table/grid to view, edit, and delete products.

### Orders Page
- **View Orders**: View all orders in a table.

### Routing
- **React Router**: Used for client-side routing in the React app.

### UI/UX
- **Material UI / Bootstrap**: Utilized for a modern and responsive UI.
- **Toast Notifications**: Success and error notifications are shown using **react-toastify**.

---

## Backend (Node.js + Express)

### API Routes

| Method | Route             | Description            |
|--------|-------------------|------------------------|
| POST   | /api/products     | Add a new product      |
| GET    | /api/products     | List all products      |
| GET    | /api/products/:id | Get a single product   |
| PUT    | /api/products/:id | Update a product       |
| DELETE | /api/products/:id | Delete a product       |
| GET    | /api/orders       | List all orders        |

### Authentication Routes

| Method | Route            | Description                |
|--------|------------------|----------------------------|
| POST   | /api/auth/login  | Login as admin (returns JWT) |

---

## Database Schema

The database schema can be implemented with **MongoDB** using **Mongoose**. Here’s a basic idea of the schema:

### Product Schema
```js
const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  category: String,
  stock: Number,
  imageUrl: String
});
