import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import './MyWishlist.css'; // Ensure this file contains relevant styles

const MyWishlist = () => {
    const location = useLocation();
    const userId = location.state?.userId; // Access userId from location state
    const [wishlistItems, setWishlistItems] = useState([]);
    console.log(userId);

    useEffect(() => {
        const fetchWishlistItems = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/wishlist/${userId}`);
                
                // Check if response is ok (status in the range 200-299)
                if (!response.ok) {
                    throw new Error(`Error: ${response.status} ${response.statusText}`);
                }

                const data = await response.json();
                console.log('Fetched wishlist items:', data);
                setWishlistItems(data.wishlist || []); // Use 'wishlist' instead of 'items'
            } catch (err) {
                console.error('Error fetching wishlist items:', err);
            }
        };
        
        if (userId) {
            fetchWishlistItems();
        }
    }, [userId]);
    
    const removeItemFromWishlist = async (productId) => {
        try {
            const response = await fetch(`http://localhost:5000/api/wishlist/remove`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId, productId }), // Send userId and productId in body
            });

            if (!response.ok) {
                throw new Error('Error removing item from wishlist');
            }

            setWishlistItems(wishlistItems.filter(item => item._id !== productId)); // Update wishlist items
        } catch (err) {
            console.error('Error removing item from wishlist:', err);
        }
    };

    console.log(wishlistItems);

    return (
        <div className="wishlist-container">
            <Navbar userId={userId} />
            <h2 className="wishlist-title">My Wishlist</h2>
            {wishlistItems.length === 0 ? (
                <div className="empty-wishlist">
                    <p>Your wishlist is empty!</p>
                </div>
            ) : (
                <div>
                    <div className="wishlist-items">
                        {wishlistItems.map(item => (
                            <div key={item._id} className="wishlist-item">
                                <img src={item.image} alt={item.name} className="wishlist-item-image" />
                                <div className="wishlist-item-info">
                                    <h3>{item.name}</h3>
                                    <p>Category: {item.category}</p>
                                    <p>{item.description}</p>
                                    <p>Price: ${item.price.toFixed(2)}</p>
                                </div>
                                <button 
                                    className="remove-button" 
                                    onClick={() => removeItemFromWishlist(item._id)}
                                >
                                    🗑️ Remove
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyWishlist;
