## RESTAURANT APP MVP

## 1. IntroductioN
Bite Club is a mobile restaurant application designed to provide customers with a simple and modern digital restaurant
experience. The MVP is developed using React Native and Expo and focuses on the main customer ordering,
reservation, profile, and manager workflows.
## Purpose
This Software Requirements Specification defines the functional and non-functional requirements of the Bite Club
Restaurant App MVP. It serves as a reference for development, testing, demonstration, and evaluation.
## Scope
• Customer login and signup.
• Home screen and restaurant menu browsing.
• Food search and category filtering.
• Favorites management.
• Shopping cart and checkout.
• Order placement and order tracking.
• Table reservation.
• Customer profile and theme settings.
• Manager dashboard and order management.

## 2. Overall Description
The application provides two main user roles: Customer and Manager. Customers can browse food, manage their cart,
place orders, track orders, reserve tables, and manage their profile. Managers can view restaurant information, orders,
reservations, menu information, sales information, and update order status.

## User Classes
Role
Capabilities
Customer
Login/signup, browse menu, search, favorites, cart, checkout, orders, tracking, reservations, profile.
Manager
Dashboard, order overview, status updates, menu overview, sales overview, reservation overview.

## 3. Functional Requirements
ID
Requirement

The system shall provide Login and Signup screens with basic field validation.
The system shall display restaurant food items and categories.
The system shall allow users to search for food items.
The system shall allow users to add and remove food items from Favorites.
The system shall allow users to add items to the cart and change quantities.
The system shall calculate cart subtotal, discount, charges, and final total where applicable.

The system shall allow customers to place an order and view order details.
The system shall provide order tracking with different order-status stages.
The system shall allow customers to reserve a table using date, time, guests, and table selection.
The system shall provide profile editing, theme switching, and logout.
The system shall provide a Manager Dashboard.
ID
FR-12
Requirement
The manager shall be able to view orders and update order status.

## 4. Detailed Modules
## Authentication
• Login and Signup screens shall be available.
• Required fields shall be validated.
• The application shall support customer and manager role behavior.

## Home and Menu
• The home screen shall provide access to the restaurant menu.
• Food items shall be displayed with relevant information such as name, price, category, and availability.
• Users shall be able to browse categories and search for items.

## Favorites
• Users shall be able to mark food items as favorites.
• Users shall be able to remove items from favorites.

## Cart and Checkout
• Users shall be able to add food items to the cart.
• Users shall be able to increase or decrease item quantities.
• Users shall be able to remove items.
• The checkout screen shall display order summary and total amount.
• Promotional discount handling may be supported.

## Orders and Tracking
• A customer shall be able to place an order.
• The application shall display order details.
• The customer shall be able to track the order status.
• The manager shall be able to update order status.
## Table Reservation
• Customers shall select a reservation date.
• Customers shall select a time.
• Customers shall select number of guests.
• Customers shall select an available table.
• Confirmed reservation information shall be shown to the customer.
## Profile
• Users shall be able to view and edit profile information.
• Users shall be able to switch between light and dark themes.
• Users shall be able to log out.

## Manager Dashboard
• Dashboard shall show Total Orders.
• Dashboard shall show Total Sales.
• Dashboard shall show Menu Items.
• Dashboard shall show Reservations.
• Dashboard shall provide order management and status controls.

## 
The application should run through the Expo development environment.
The MVP shall not expose real credentials or sensitive production information.
Text, buttons, and controls should remain readable and understandable.

## Application Navigation
• Welcome / Authentication
• Home
• Menu / Food Categories
• Favorites
• Cart
• Checkout
• Order Confirmation
• Order Tracking
• Reservation
• Profile
• Edit Profile
• Manager Dashboard

## Data Requirements
For the frontend MVP, application data may be maintained locally or in application state. The main logical entities are
User, MenuItem, Favorite, CartItem, Order, OrderItem, Reservation, Table, Promotion, and Manager. A backend
database can be integrated in a future version for persistent multi-device data.

## Constraints and Assumptions
• This document describes the frontend MVP.
• Real payment processing is outside the current scope.
• Real restaurant inventory synchronization is outside the current scope.
• Real-time multi-device synchronization requires a backend.
• The application is intended for academic demonstration and evaluation.

## Acceptance Criteria
• The application launches successfully in Expo.
• A customer can navigate through the main screens.
• A customer can browse, search, favorite, and add food items to the cart.
• Cart quantities and totals update correctly.
• A customer can place an order and view its tracking status.
• A customer can create and view a table reservation.
• A customer can edit profile information and switch themes.
• A manager can open the Manager Dashboard.
• A manager can view orders and update their status.

## Future Enhancements
• Backend API and database integration.
• Real authentication and authorization.
• Online payment gateway.
• Real-time order synchronization.
• Push notifications.
• Restaurant inventory management.
• Sales analytics and reporting.
