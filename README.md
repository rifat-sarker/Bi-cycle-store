# 🚴Bicycle Order Management System

A full-stack application designed to manage orders and inventory for bicycles. The system allows users to create orders, update bicycle stock automatically, and calculate total revenue efficiently using MongoDB aggregation pipelines

## 🌟 Features
- Order Creation:
 - Validates order data using Zod.
 - Checks product availability and stock before order creation.
 - Automatically updates bicycle stock after order placement.

- Revenue Calculation:
 - Aggregates total revenue from all orders using MongoDB pipelines.
 - Provides a clean API response with the total revenue.

- Validation & Error Handling:
 - Ensures robust data validation and handles common errors gracefully.
 
- RESTful API Endpoints:
/api/orders/create-order for order creation.
/api/orders/revenue for revenue calculation.

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
