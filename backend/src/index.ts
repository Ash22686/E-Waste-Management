import express from 'express';
import cors from 'cors';
import connectDB from './config/db';
import authRoutes from './routes/authRoutes';
import listingRoutes from './routes/listingRoutes';
import recyclingRoutes from './routes/recyclingRoutes'; // Import recyclingRoutes
import { notFound, errorHandler } from './middleware/errorMiddleware';
import dotenv from 'dotenv';
import sellerRoutes from './routes/sellerRoutes';
import productRoutes from './routes/productRoutes';
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/listings', listingRoutes);
app.use('/api/recycling', recyclingRoutes); // Use recyclingRoutes
app.use('/api/sellers', sellerRoutes);
app.use('/api/products', productRoutes);

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});