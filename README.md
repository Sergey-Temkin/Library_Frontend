# Library Frontend Project

## Overview
The **Library Frontend** is a React-based web application that serves as the user interface for an online book rental system. It is designed to interact with a Django backend (`library-backend`) and provides functionalities such as user authentication, book searching, loaning books, and an admin dashboard for managing users, books, and loans.

## Features

### User Features
- **Book Browsing**: Users can explore available books in different categories such as Fantasy, Non-fiction, Sci-Fi, Mystery, Action, and Romance.
- **Search & Filter**: Books can be searched by name and filtered by category.
- **User Authentication**:
  - Sign In
  - Login (using JWT authentication)
  - Auto-login using stored tokens
- **Book Loaning**:
  - Logged-in users can add books to the cart.
  - Users can select the loan duration (10 days, 5 days, or 2 days).
  - Users can view their active loans and return books when done.
- **Shopping Cart**:
  - Users can add and remove books from the cart.
  - Only registered users can loan books.
- **Admin Dashboard**:
  - View the total number of users, books, and loans.
  - Add new books to the system.
  - Delete books.
  - Manage loans (approve, mark as returned, or delete them).

## Tech Stack
- **Frontend**: React.js (React 19)
- **Styling**: Bootstrap 5, CSS
- **State Management**:
  - `useContext` for managing cart and login state
  - `useState` and `useEffect` for handling component data
- **Routing**: `react-router-dom`
- **Authentication**: JWT-based authentication with login state stored in `localStorage`
- **API Requests**: `axios` for API communication with the Django backend

## Folder Structure
```
/public
  - Black.jpg
  - index.html
  - placeholder.png
  - Stars.jpg
/src
  /components
    /AboutUs
      - AboutUs.js
      - AboutUs.css
    /Admin
      - Admin.js
    /BookList
      - BookList.js
      - BookList.css
    /Cart
      - Cart.js
      - Cart.css
    /Footer
      - Footer.js
      - Footer.css
    /Jumbotron
      - Jumbotron.js
      - Jumbotron.css
    /Login
      - Login.js
      - Login.css
    /Nav
      - Nav.js
      - Nav.css
    /SignIn
      - SignIn.js
      - SignIn.css
  - api.js
  - App.js
  - CartContext.js
  - index.js
  - LoginContext.js
```

## Detailed Component Breakdown

### `index.html`
The root HTML file that loads the React application. It includes a dark-themed design to match the project's aesthetic.

### `App.js`
- Handles the main application structure.
- Includes routing for different pages (`/`, `/about`, `/login`, `/signup`, `/admin`, `/cart`).
- Uses `useContext` to manage user login and cart state.

### `CartContext.js`
- Manages the cart state globally using React Context.

### `LoginContext.js`
- Handles user authentication, login, and logout state.
- Automatically decodes JWT tokens and verifies admin status.

### `api.js`
- Configures Axios to communicate with the Django backend API.
- Base URL: `http://127.0.0.1:8000/api/library/`

### Components
- **AboutUs.js**: Displays information about the online bookstore.
- **Admin.js**: The admin panel for managing books and loans.
- **BookList.js**: Displays available books, allowing users to search and filter them.
- **Cart.js**: Manages the shopping cart and book loans.
- **Footer.js**: A simple footer component.
- **Jumbotron.js**: Displays a welcome banner.
- **Login.js**: Handles user login.
- **Nav.js**: The navigation bar, including links, search, and user authentication actions.
- **SignIn.js**: Handles user registration.

## User Experience
- Dark-themed UI for a modern and sleek appearance.
- Fully responsive design using Bootstrap.
- Clear navigation with easy access to books and account settings.
- Admin privileges allow for full control over book inventory and loan management.

## Future Enhancements
- Implement user reviews and ratings for books.
- Introduce email notifications for loan reminders.
- Add support for book recommendations based on user preferences.

## Installation & Setup
1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the React app:
   ```bash
   npm start
   ```
4. Ensure the backend is running on `http://127.0.0.1:8000/api/library/`.

## Conclusion
The Library Frontend provides a seamless user experience for browsing, loaning, and managing books. With an intuitive UI, secure authentication, and an admin panel, it offers a complete solution for an online book rental system.

