# SIMPLE SHOPPING CART

## Introduction
This project is a basic shopping cart system for an E-commerce platform.
The goal is to demonstrate how to build a simple front end and back end that allow users to browse products, add them to a cart, and calculate totals.

The app includes:
- A front end built with React + Redux.
- A simple back end (Node.js + Express) that serves product data.
- Fallback mock data, so the app still works if the server is not running.


## Compulsory Features
The shopping cart system supports the following features:
- **View Products:** Users can see a list of available products with their name and price.
- **Add to Cart:** Users can add any product to the cart.
- **View Cart Contents:** The cart shows all selected products, their quantities, and individual line totals.
- **Multiple Quantities:** The same product can be added multiple times, and its quantity is updated accordingly.
- **Calculate Total Price:** The cart automatically calculates and displays the total price based on item quantities and prices.


## Getting Started:
1. Clone the repository.
2. For the Front-End, in the terminal:
- Navigate to the shopping-cart-system folder: `cd shopping-cart-system`
- Install dependencies: `npm install`
- Run the development: `npm run dev`
- Open the app in your browser: Eg. In this case, it can be `http://localhost:5173/`

3. For the Back-End, open another terminal:
- Navigate to the server folder: `cd server`
- Install dependencies: `npm install`
- Run the server: `npm run dev`


## NOTE:
- The app comes with mock product data.
- If the server is unavailable or fails to respond, the app will display the mock data so you can still use the shopping cart features.

---
![alt text](<Screenshot of Simple Shopping Cart.png>)