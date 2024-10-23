import React from 'react';
import { useLocation } from 'react-router-dom';
import './ProductDetails.css';
import Navbar from './Navbar';

const ProductDetails = () => {
    const location = useLocation();
    const product = location.state?.product;
    const userId = location.state?.userId; // Get userId from location state
    console.log(userId);

    if (!product) {
        return <div>No product found</div>;
    }

    // Function to handle adding product to wishlist
    const addToWishlist = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/wishlist/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId, productId: product._id }),
            });

            const data = await response.json();
            if (response.ok) {
                alert('Product added to wishlist');
            } else {
                alert(data.message || 'Failed to add product to wishlist');
            }
        } catch (err) {
            console.error('Error adding product to wishlist:', err);
            alert('An error occurred. Please try again.');
        }
    };

    // Function to handle adding product to cart
    const addToCart = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/cart/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId, productId: product._id, quantity: 1 }),
            });
    
            // Check if the response contains JSON data
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                const data = await response.json();
                if (response.ok) {
                    alert('Product added to cart');
                } else {
                    alert(data.message || 'Failed to add product to cart');
                }
            } else {
                alert('Unexpected response from server. Please try again.');
            }
        } catch (err) {
            console.error('Error adding product to cart:', err);
            alert('An error occurred. Please try again.');
        }
    };
    

    return (
        <>
            <Navbar />
            <div className="product-details-container">
                <div className="product-details-image">
                    <img src={product.image} alt={product.name} />
                </div>
                <div className="product-details-info">
                    <h2>{product.name}</h2>
                    <p className="product-price">Price: ${product.price}</p>
                    <p className="product-description">{product.description}</p>

                    <div className="product-additional-info">
                        <h4>Product Specifications</h4>
                        <ul>
                            <li>Brand: XYZ</li>
                            <li>Material: High-quality material</li>
                            <li>Color: Red</li>
                            <li>Available Sizes: S, M, L, XL</li>
                        </ul>

                        <h4>Customer Reviews</h4>
                        <p>⭐⭐⭐⭐☆ (4.5/5 based on 200 reviews)</p>
                    </div>

                    <div className="product-actions">
                        <button className="wishlist-button" onClick={addToWishlist}>
                            💖 Add to Wishlist
                        </button>
                        <button className="cart-button" onClick={addToCart}>
                            🛒 Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductDetails;
