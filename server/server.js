const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const productRoutes = require('./routes/products'); 
const wishlistRoutes = require('./routes/wishlist');
const cartRoutes = require('./routes/cart');
const supportRoutes=require('./routes/support')
// Initialize app
const app = express();
const router = express.Router();

app.use(cors({
    origin: '*', // Adjust this to your frontend port
    credentials: true,
}));
app.use(express.json()); // For parsing JSON bodies

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));

// User routes
app.use('/api/users', require('./routes/users'));
app.use('/api/products', productRoutes);
app.use('/api/wishlist', wishlistRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/support', supportRoutes);

// Server listening
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
