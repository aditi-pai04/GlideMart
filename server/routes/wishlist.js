const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Product=require('../models/Product')

// Add product to wishlist
router.post('/add', async (req, res) => {
    const { userId, productId } = req.body;

    if (!userId || !productId) {
        return res.status(400).json({ message: 'User ID and Product ID are required' });
    }

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the product is already in the wishlist
        if (user.wishlist.includes(productId)) {
            return res.status(400).json({ message: 'Product is already in the wishlist' });
        }

        // Add the product to the wishlist
        user.wishlist.push(productId);
        await user.save();

        return res.status(200).json({ message: 'Product added to wishlist' });
    } catch (err) {
        console.error('Error adding to wishlist:', err);
        return res.status(500).json({ message: 'Server error' });
    }
});

// Get wishlist items
router.get('/:userId', async (req, res) => {
    try {
        // Find the user and retrieve their cart
        const user = await User.findById(req.params.userId);
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Get product IDs from the cart
        const productIds = user.wishlist.map(item => item);
        console.log(productIds)

        // Fetch products from the Product collection that match these IDs
        const products = await Product.find({ _id: { $in: productIds } });

        // Include quantity with each product from the user's cart
        const cartItems = user.wishlist.map(cartItem => {
            const product = products.find(p => p._id.equals(cartItem));
            return product
                ? product
                : null;
        }).filter(item => item); // Filter out any null products

        res.json({ items: cartItems });
    } catch (error) {
        console.error('Error fetching cart:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Remove product from wishlist
router.delete('/remove', async (req, res) => {
    const { userId, productId } = req.body;

    if (!userId || !productId) {
        return res.status(400).json({ message: 'User ID and Product ID are required' });
    }

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the product exists in the wishlist
        if (!user.wishlist.includes(productId)) {
            return res.status(400).json({ message: 'Product is not in the wishlist' });
        }

        // Remove the product from the wishlist
        user.wishlist = user.wishlist.filter(id => id.toString() !== productId);
        await user.save();

        return res.status(200).json({ message: 'Product removed from wishlist' });
    } catch (err) {
        console.error('Error removing from wishlist:', err);
        return res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
