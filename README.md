# 🚴Bicycle Order Management Backend

A backend application built with Node.js, Express, TypeScript, and MongoDB to manage bicycles and orders. The system provides CRUD operations for bicycles and supports creating orders and calculating total revenue using MongoDB aggregation pipelines.

## 🌟 Features
## Bicycle Management:
 - Create a new bicycle with all necessary details.
 - Update existing bicycle details, including stock and specifications.
 - Retrieve bicycle data
 - Delete a bicycle entry from the database.

## Order Creation:
 - Validates order data using Zod.
 - Checks product availability and stock before order creation.
 - Automatically updates bicycle stock after order placement.

## Revenue Calculation:
 - Aggregates total revenue from all orders using MongoDB pipelines.
 - Provides a clean API response with the total revenue.

- Validation & Error Handling:
 - Ensures robust data validation using Zod schemas.
 - Handles common errors gracefully to provide a reliable API experience.
 
## RESTful API Endpoints:
- /api/products/create-bicycle – Create a new bicycle.
- /api/products/:productId – Update bicycle details.
- /api/products – Fetch all bicycles.
- /api/products/:productId – Delete a bicycle.
  
## Order Endpoints
- /api/orders/create-order – Place a new order.
- /api/orders/revenue – Get total revenue from all orders.


## 🚀 Getting Started
Follow these instructions to set up the project locally.

Prerequisites
Ensure you have the following installed:

Node.js: >=16.0.0
MongoDB: Local instance or connection string for a cloud database (e.g., MongoDB Atlas).

## Installation
1. Clone the repository:
```bash
git clone https://github.com/rifat-sarker/Bi-cycle-store.git
```

2. Install dependencies:
```bash
npm install
```

## 🛠️ Built With
1. Node.js: Backend runtime environment.
2. Express.js: Web framework for creating APIs.
3. TypeScript: Type-safe JavaScript.
4. MongoDB: NoSQL database for storing orders and bicycle data.
5. Zod: Schema validation library.

## 📧 Contact
If you have any questions or feedback, feel free to reach out:

[Email:](rifatswd@gmail.com)
[GitHub:](https://github.com/rifat-sarker)
