const express = require('express');
const User = require('../models/User'); // Assuming the User model is here
const Product = require('../models/Product'); // Assuming you have a Product model
const router = express.Router();

// Get the cart items for a user
router.get('/:userId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId).populate('cart.productId');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ items: user.cart }); // Ensure this is correct
    } catch (error) {
        console.error('Error fetching cart:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Add an item to the cart
router.post('/add', async (req, res) => {
    const { userId, productId, quantity } = req.body;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the item already exists in the user's cart
        const existingItem = user.cart.find(item => item.productId.toString() === productId);

        if (existingItem) {
            // If item exists, update the quantity
            existingItem.quantity += quantity;
        } else {
            // If item doesn't exist, add it to the cart
            user.cart.push({ productId, quantity });
        }

        await user.save();
        res.status(201).json(user);
    } catch (error) {
        console.error('Error adding item to cart:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Remove an item from the cart
router.delete('/remove/:productId', async (req, res) => {
    const { userId } = req.body; // Make sure to pass userId in the body
    const { productId } = req.params;

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Remove the item from the cart
        user.cart = user.cart.filter(item => item.productId.toString() !== productId);
        await user.save();

        res.json({ message: 'Item removed from cart', items: user.cart });
    } catch (error) {
        console.error('Error removing item from cart:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;