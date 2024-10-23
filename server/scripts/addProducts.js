require('dotenv').config(); // Load environment variables from .env
const mongoose = require('mongoose');
const Product = require('../models/Product');

// Use the MongoDB URI from the .env file
const dbURI = "mongodb+srv://aditinpaics21:Aditi$04@clustgmer0.1jxbq.mongodb.net/?retryWrites=true&w=majority&appName=Clustgmer0"

// Connect to the MongoDB database
mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((error) => console.error('MongoDB connection error:', error));

const products = [
    // Fashion
    {
        name: 'Casual Shirt',
        category: 'Fashion',
        price: 29.99,
        image: 'https://images.unsplash.com/photo-1518673255901-94e1687cddf2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDF8fGNhc3VhbCUyMHNoaXJ0fGVufDB8fHx8MTYyMjgxMzA5OQ&ixlib=rb-1.2.1&q=80&w=400',
        description: 'A stylish casual shirt for everyday wear.',
    },
    {
        name: 'Jeans',
        category: 'Fashion',
        price: 49.99,
        image: 'https://images.unsplash.com/photo-1558222214-799f20ff9bf0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDF8fGplYW5zfGVufDB8fHx8MTYyMjgxMzE0NA&ixlib=rb-1.2.1&q=80&w=400',
        description: 'Comfortable and durable jeans.',
    },
    {
        name: 'Sneakers',
        category: 'Fashion',
        price: 69.99,
        image: 'https://images.unsplash.com/photo-1516478177764-9fe9c43097d1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDF8fHNuZWFrZXJzfGVufDB8fHx8MTYyMjgxMzA5OQ&ixlib=rb-1.2.1&q=80&w=400',
        description: 'Comfortable sneakers for everyday wear.',
    },
    {
        name: 'Jacket',
        category: 'Fashion',
        price: 89.99,
        image: 'https://images.unsplash.com/photo-1556905055-8f358a9a6670?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGphY2tldHxlbnwwfHx8fDE2MjI4MTMxNDA&ixlib=rb-1.2.1&q=80&w=400',
        description: 'Warm and stylish jacket for colder days.',
    },
    {
        name: 'Dress',
        category: 'Fashion',
        price: 59.99,
        image: 'https://images.unsplash.com/photo-1503341455253-b2e723bb3db2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDF8fGRyZXNzfGVufDB8fHx8MTYyMjgxMzA5OQ&ixlib=rb-1.2.1&q=80&w=400',
        description: 'Elegant dress for special occasions.',
    },

    // Groceries
    {
        name: 'Apple',
        category: 'Groceries',
        price: 0.99,
        image: 'https://images.unsplash.com/photo-1574226516831-e1dff420486d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDF8fGFwcGxlfGVufDB8fHx8MTYyMjgxMzEyOQ&ixlib=rb-1.2.1&q=80&w=400',
        description: 'Fresh and juicy apples.',
    },
    {
        name: 'Bananas',
        category: 'Groceries',
        price: 1.99,
        image: 'https://images.unsplash.com/photo-1574226516841-2f8e745da71c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGJhbmFuYXN8ZW58MHx8fHwxNjIyODEzMzc0&ixlib=rb-1.2.1&q=80&w=400',
        description: 'A bunch of fresh bananas.',
    },
    {
        name: 'Orange Juice',
        category: 'Groceries',
        price: 3.49,
        image: 'https://images.unsplash.com/photo-1605246015075-1f57c35603c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fG9yYW5nZSUyMGp1aWNlfGVufDB8fHx8MTYyMjgxMzE3Mw&ixlib=rb-1.2.1&q=80&w=400',
        description: 'Freshly squeezed orange juice.',
    },
    {
        name: 'Bread',
        category: 'Groceries',
        price: 2.49,
        image: 'https://images.unsplash.com/photo-1544791614-0cffe1e9a97f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDF8fGJyZWFkfGVufDB8fHx8MTYyMjgxMzEyNw&ixlib=rb-1.2.1&q=80&w=400',
        description: 'Freshly baked bread loaf.',
    },
    {
        name: 'Eggs',
        category: 'Groceries',
        price: 2.99,
        image: 'https://images.unsplash.com/photo-1586696470927-9cdbe799aeb2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDF8fGVnZ3N8ZW58MHx8fHwxNjIyODEzMTk3&ixlib=rb-1.2.1&q=80&w=400',
        description: 'A dozen organic eggs.',
    },

    // Cosmetics
    {
        name: 'Face Cream',
        category: 'Cosmetics',
        price: 14.99,
        image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDF8fGZhY2UlMjBjcmVhbXxlbnwwfHx8fDE2MjI4MTMxMzI&ixlib=rb-1.2.1&q=80&w=400',
        description: 'Moisturizing face cream for glowing skin.',
    },
    {
        name: 'Lipstick',
        category: 'Cosmetics',
        price: 9.99,
        image: 'https://images.unsplash.com/photo-1564244325265-3b52480b7b89?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDF8fGxpcHN0aWNrfGVufDB8fHx8MTYyMjgxMzIyMg&ixlib=rb-1.2.1&q=80&w=400',
        description: 'Long-lasting matte lipstick.',
    },
    {
        name: 'Foundation',
        category: 'Cosmetics',
        price: 19.99,
        image: 'https://images.unsplash.com/photo-1565677614844-e3d1aa2d30a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDF8fGZvdW5kYXRpb258ZW58MHx8fHwxNjIyODEzMjQ2&ixlib=rb-1.2.1&q=80&w=400',
        description: 'Silky smooth foundation for all skin types.',
    },
    {
        name: 'Perfume',
        category: 'Cosmetics',
        price: 39.99,
        image: 'https://images.unsplash.com/photo-1510923451425-b7978c4c6349?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDF8fHBlcmZ1bWV8ZW58MHx8fHwxNjIyODEzMjYw&ixlib=rb-1.2.1&q=80&w=400',
        description: 'Aromatic perfume with a refreshing fragrance.',
    },
    {
        name: 'Mascara',
        category: 'Cosmetics',
        price: 11.99,
        image: 'https://images.unsplash.com/photo-1517424202020-51cb3b9069ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fG1hc2NhcmF8ZW58MHx8fHwxNjIyODEzMjY0&ixlib=rb-1.2.1&q=80&w=400',
        description: 'Waterproof mascara for bold lashes.',
    },

    // Hygiene
    {
        name: 'Shampoo',
        category: 'Hygiene',
        price: 7.99,
        image: 'https://images.unsplash.com/photo-1580541936901-44b9f07a3f95?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDF8fHNoYW1wb298ZW58MHx8fHwxNjIyODEzMjcy&ixlib=rb-1.2.1&q=80&w=400',
        description: 'Nourishing shampoo for healthy hair.',
    },
    {
        name: 'Toothpaste',
        category: 'Hygiene',
        price: 2.99,
        image: 'https://images.unsplash.com/photo-1591681467036-3ae6c4eb17bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDF8fHRvb3RocGFzdGV8ZW58MHx8fHwxNjIyODEzMjU2&ixlib=rb-1.2.1&q=80&w=400',
        description: 'Fluoride toothpaste for healthy gums and teeth.',
    },
    {
        name: 'Body Wash',
        category: 'Hygiene',
        price: 5.49,
        image: 'https://images.unsplash.com/photo-1514986888952-8cd320577b65?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDF8fGJvZHklMjB3YXNofGVufDB8fHx8MTYyMjgxMzI1Mg&ixlib=rb-1.2.1&q=80&w=400',
        description: 'Refreshing body wash for a clean and fresh feel.',
    },
    {
        name: 'Hand Sanitizer',
        category: 'Hygiene',
        price: 3.99,
        image: 'https://images.unsplash.com/photo-1583947582886-b82da4a42a1a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDF8fGhhbmQlMjBzYW5pdGl6ZXJ8ZW58MHx8fHwxNjIyODEzMjU0&ixlib=rb-1.2.1&q=80&w=400',
        description: 'Portable hand sanitizer for on-the-go hygiene.',
    },
    {
        name: 'Deodorant',
        category: 'Hygiene',
        price: 4.99,
        image: 'https://images.unsplash.com/photo-1580913746360-5aef4c05ae8e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDF8fGRlb2RvcmFudHxlbnwwfHx8fDE2MjI4MTMzMjY&ixlib=rb-1.2.1&q=80&w=400',
        description: 'Long-lasting deodorant for all-day freshness.',
    },

    // Daily Use
    {
        name: 'Notebook',
        category: 'Daily Use',
        price: 3.99,
        image: 'https://images.unsplash.com/photo-1514384063871-c0d4e32da382?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fG5vdGVib29rfGVufDB8fHx8MTYyMjgxMzM1MQ&ixlib=rb-1.2.1&q=80&w=400',
        description: 'A plain notebook for all your notes and ideas.',
    },
    {
        name: 'Pen',
        category: 'Daily Use',
        price: 1.49,
        image: 'https://images.unsplash.com/photo-1581092323996-d1dc13dffb94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fHBlbnN8ZW58MHx8fHwxNjIyODEzMzQw&ixlib=rb-1.2.1&q=80&w=400',
        description: 'A smooth-writing ballpoint pen.',
    },
    {
        name: 'Water Bottle',
        category: 'Daily Use',
        price: 12.99,
        image: 'https://images.unsplash.com/photo-1546422405-1120d280b2df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDF8fHdhdGVyJTIwYm90dGxlfGVufDB8fHx8MTYyMjgxMzM0Ng&ixlib=rb-1.2.1&q=80&w=400',
        description: 'A durable stainless steel water bottle.',
    },
    {
        name: 'Umbrella',
        category: 'Daily Use',
        price: 8.99,
        image: 'https://images.unsplash.com/photo-1549144511-f099e773c147?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fHBlbmNpbCUyMHVtYnJlbGxhfGVufDB8fHx8MTYyMjgxMzM1Mg&ixlib=rb-1.2.1&q=80&w=400',
        description: 'Compact umbrella for rainy days.',
    },
    {
        name: 'Backpack',
        category: 'Daily Use',
        price: 24.99,
        image: 'https://images.unsplash.com/photo-1590019966541-3d5e91182d6c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDF8fGJhY2twYWNrfGVufDB8fHx8MTYyMjgxMzQxMA&ixlib=rb-1.2.1&q=80&w=400',
        description: 'A spacious and durable backpack for daily use.',
    },
];

// Seed the products into the database
Product.insertMany(products)
    .then(() => {
        console.log('Products added successfully');
        mongoose.connection.close();
    })
    .catch((error) => {
        console.error('Error adding products:', error);
        mongoose.connection.close();
    });
