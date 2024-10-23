import React, { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import './UserHome.css'; // Ensure this file contains the relevant styles
import Navbar from './Navbar';

const UserHome = () => {
    const location = useLocation();
    const history = useHistory();
    const userId = location.state?.userId; // Access userId from location state
    const [products, setProducts] = useState([]); // State to hold all products
    const [filteredProducts, setFilteredProducts] = useState([]); // State to hold filtered products
    const [selectedCategory, setSelectedCategory] = useState(''); // State to hold the selected category

    const categories = [
        { name: 'Fashion', icon: '👗' },
        { name: 'Groceries', icon: '🛒' },
        { name: 'Cosmetics', icon: '💄' },
        { name: 'Hygiene', icon: '🧼' },
        { name: 'Daily Use', icon: '🛍️' },
    ];

    // Fetch products from the backend
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/products');
                const data = await response.json();
                setProducts(data);
                setFilteredProducts(data); // Set all products initially
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchProducts();
    }, []);

    // Filter products based on the selected category
    const handleCategoryClick = (categoryName) => {
        setSelectedCategory(categoryName);
        const filtered = products.filter(product => product.category === categoryName);
        setFilteredProducts(filtered);
    };

    const handleProductClick = (product) => {
        history.push('/product-details', { product, userId });
    };

    return (
        <div className="home-container">
            <Navbar userId={userId} /> {/* Pass userId to Navbar */}
            <h2>Welcome User {userId}</h2> {/* Displaying User ID */}
            
            <h2>Shop by Categories</h2>
            <div className="categories">
                {categories.map((category, index) => (
                    <div 
                        key={index} 
                        className={`category-icon ${selectedCategory === category.name ? 'selected' : ''}`}
                        onClick={() => handleCategoryClick(category.name)}
                    >
                        <span>{category.icon}</span>
                        <p>{category.name}</p>
                    </div>
                ))}
            </div>

            <h2>Products {selectedCategory && `in ${selectedCategory}`}</h2>
            <div className="product-grid">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                        <div key={product._id} className="product-card">
                            <img src={product.image} alt={product.name} className="product-image" />
                            <h3 onClick={() => handleProductClick(product)} className="clickable-product-name">
                                {product.name}
                            </h3>
                            <p>{product.description}</p>
                            <p>${product.price}</p>
                        </div>
                    ))
                ) : (
                    <p>No products found in this category.</p>
                )}
            </div>
        </div>
    );
};

export default UserHome;
