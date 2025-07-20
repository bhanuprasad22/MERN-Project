import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';
import User from './models/User.js';

dotenv.config();

const sampleProducts = [
  {
    name: 'Wireless Bluetooth Headphones',
    description: 'High-quality wireless headphones with noise cancellation and 30-hour battery life.',
    price: 199.99,
    category: 'electronics',
    image: 'https://images.pexels.com/photos/205926/pexels-photo-205926.jpeg',
    stock: 50,
    rating: 4.5,
    numReviews: 125,
    featured: true
  },
  {
    name: 'Smart Watch Pro',
    description: 'Advanced smartwatch with health monitoring, GPS, and 7-day battery life.',
    price: 299.99,
    category: 'electronics',
    image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg',
    stock: 30,
    rating: 4.7,
    numReviews: 89,
    featured: true
  },
  {
    name: 'Premium Cotton T-Shirt',
    description: 'Soft, comfortable cotton t-shirt available in multiple colors and sizes.',
    price: 29.99,
    category: 'clothing',
    image: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg',
    stock: 100,
    rating: 4.3,
    numReviews: 67,
    featured: false
  },
  {
    name: 'JavaScript: The Complete Guide',
    description: 'Comprehensive guide to modern JavaScript programming with practical examples.',
    price: 39.99,
    category: 'books',
    image: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg',
    stock: 25,
    rating: 4.8,
    numReviews: 156,
    featured: true
  },
  {
    name: 'Ergonomic Office Chair',
    description: 'Comfortable office chair with lumbar support and adjustable height.',
    price: 249.99,
    category: 'home',
    image: 'https://images.pexels.com/photos/586095/pexels-photo-586095.jpeg',
    stock: 15,
    rating: 4.4,
    numReviews: 43,
    featured: false
  },
  {
    name: 'Yoga Mat Premium',
    description: 'Non-slip yoga mat made from eco-friendly materials, perfect for all exercises.',
    price: 49.99,
    category: 'sports',
    image: 'https://images.pexels.com/photos/4056723/pexels-photo-4056723.jpeg',
    stock: 60,
    rating: 4.6,
    numReviews: 78,
    featured: true
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/mern-ecommerce');
    
    console.log('Connected to MongoDB');
    
    // Clear existing data
    await Product.deleteMany({});
    await User.deleteMany({});
    
    // Create admin user
    const adminUser = await User.create({
      username: 'admin',
      name: 'Admin User',
      email: 'admin@ecommerce.com',
      password: 'admin123',
      isAdmin: true
    });
    
    // Create sample user
    const sampleUser = await User.create({
      username: 'john_doe',
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123'
    });
    
    // Insert products
    await Product.insertMany(sampleProducts);
    
    console.log('✅ Database seeded successfully!');
    console.log('🔑 Admin credentials: admin@ecommerce.com / admin123');
    console.log('🔑 User credentials: john@example.com / password123');
    
    process.exit();
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
