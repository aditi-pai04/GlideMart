import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import './MyCart.css';

const MyCart = () => {
    const location = useLocation();
    const userId = location.state?.userId || localStorage.getItem('userId');
    const [cartItems, setCartItems] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);

    useEffect(() => {
        if (userId) {
            localStorage.setItem('userId', userId);
        }
        const fetchCartItems = async () => {
            if (userId) {
                try {
                    const response = await fetch(`http://localhost:5000/api/cart/${userId}`);
                    const data = await response.json();
                    console.log('Fetched cart items:', data); // Check fetched data
                    setCartItems(data.items || []);
                    calculateTotalAmount(data.items);
                } catch (err) {
                    console.error('Error fetching cart items:', err);
                }
            }
        };

        fetchCartItems();
    }, [userId]);

    const calculateTotalAmount = (items) => {
        if (!items) return 0; // Handle case where items might be undefined
        console.log()
        const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
        setTotalAmount(total);
    };

    return (
        <div className="my-cart-container">
            <Navbar userId={userId} />
            <h2 className="cart-title">My Cart</h2>
            {cartItems.length === 0 ? (
                <div className="empty-cart">
                    <p>Your cart is empty!</p>
                </div>
            ) : (
                <div>
                    <div className="cart-items">
                        {cartItems.map(item => (
                            <div key={item._id} className="cart-item">
                                <img src={item.image} alt={item.name} className="cart-item-image" />
                                <div className="cart-item-info">
                                    <h3>{item.name}</h3>
                                    <p>Price: ${item.price.toFixed(2)}</p>
                                    <p>Quantity: {item.quantity}</p>
                                </div>
                                <button 
                                    className="remove-button" >
                                    {/* onClick={() => removeItemFromCart(item._id)} */}
                                    🗑️ Remove
                                </button>
                            </div>
                        ))}
                    </div>
                    <div className="cart-total">
                        <h3>Total Amount: ${totalAmount.toFixed(2)}</h3>
                        <button className="checkout-button" >
                        {/* onClick={handleCheckout} */}
                            🛒 Proceed to Checkout
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyCart;
