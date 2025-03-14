import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User';
import Listing from './models/Listing';
import RecyclingCenter from './models/RecyclingCenter';
import bcrypt from 'bcryptjs';

// Load environment variables
dotenv.config({ path: './.env' });

// Connect to MongoDB
const mongoUri = process.env.MONGO_URI;
if (!mongoUri) {
  console.error('MongoDB connection error: MONGO_URI is not defined in .env file');
  process.exit(1);
}

mongoose.connect(mongoUri)
  .then(() => console.log('MongoDB connected for seeding'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// Sample data
const sampleUsers = [
  {
    firstName: 'John',
    lastName: 'Doe',
    email: 'seller@example.com',
    password: bcrypt.hashSync('password123', 10),
    userType: 'seller',
  },
  {
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'buyer@example.com',
    password: bcrypt.hashSync('password123', 10),
    userType: 'buyer',
  },
];

// Function to seed data
const seedData = async () => {
  try {
    await User.deleteMany();
    await Listing.deleteMany();
    await RecyclingCenter.deleteMany();

    await User.insertMany(sampleUsers);

    console.log('Data seeded successfully');
    process.exit();
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

// Run the seed function
seedData();