# E-Waste Exchange Platform

A full-stack application for trading and recycling electronic waste, promoting sustainability and the circular economy.

## Project Structure

The project is divided into two main parts:

- **Frontend**: React application built with Vite, TypeScript, and Tailwind CSS
- **Backend**: Node.js/Express API with MongoDB database

## Getting Started

### Prerequisites

- Node.js (v14+)
- MongoDB (local or Atlas)

### Backend Setup

1. Navigate to the backend folder:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file based on `.env.example` and configure your environment variables:
   ```
   cp .env.example .env
   ```

4. Start the development server:
   ```
   npm run dev
   ```

The backend server will run on port 5000 by default.

### Frontend Setup

1. In a new terminal, navigate to the project root and install dependencies:
   ```
   npm install
   ```

2. Start the development server:
   ```
   npm run dev
   ```

The frontend development server will run on port 8080 and proxy API requests to the backend.

## Features

- User authentication (register, login, profile management)
- Marketplace for listing and purchasing used electronics
- Recycling request system for responsible disposal
- Detailed product pages with quality grading system
- Search and filter functionality
- Responsive design for all devices

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login a user
- `GET /api/auth/me` - Get current user profile

### Products
- `GET /api/products` - Get all products (with filter options)
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create a new product listing (auth required)
- `PUT /api/products/:id` - Update a product (auth required)
- `DELETE /api/products/:id` - Delete a product (auth required)

### Recycling
- `GET /api/recycling` - Get all recycling requests
- `POST /api/recycling` - Create a new recycling request (auth required)
- `GET /api/recycling/my-requests` - Get user's recycling requests (auth required)
- `PATCH /api/recycling/:id/status` - Update recycling request status (auth required)

## Technologies Used

### Frontend
- React
- TypeScript
- Tailwind CSS
- React Router
- React Query
- Shadcn UI
- Lucide Icons

### Backend
- Node.js
- Express
- MongoDB
- Mongoose
- JWT Authentication
- Bcrypt

## License
# GDG-Main-Project
