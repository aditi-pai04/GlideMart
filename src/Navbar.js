import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faSignOutAlt, faShoppingCart, faHeart, faBoxes, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { useHistory, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ userId }) => {
    const history = useHistory();
    const location = useLocation();

    const navigateToCart = () => {
        history.push({
            pathname: '/cart',
            state: { userId }, // Pass userId in location state
        });
    };

    const navigateToWishlist = () => {
        history.push({
            pathname: '/wishlist',
            state: { userId }, // Pass userId in location state
        });
    };


    const navigateToHome = () => {
        history.push({
            pathname: '/dashboard',
            state: { userId }, // Pass userId in location state
        });
    };

    const navigateToProducts = () => {
        history.push({
            pathname: '/products',
            state: { userId }, // Pass userId in location state
        });
    };

    const navigateToSupport = () => {
        history.push({
            pathname: '/support',
            state: { userId }, // Pass userId in location state
        });
    };

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="navbar">
            <div className="nav-icons">
            <button
                    onClick={navigateToHome}
                    className={`nav-button ${isActive('/dashboard') ? 'active' : ''}`}
                    title="Home"
                    style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                    aria-label="Home"
                >
                    <FontAwesomeIcon icon={faHome} size="2x" />
                </button>
                <button href="/logout" className={isActive('/logout') ? 'active' : ''}
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                    <FontAwesomeIcon icon={faSignOutAlt} size="2x" title="Logout" />
                </button>
                <button 
                    onClick={navigateToCart} 
                    className={`nav-button ${isActive('/cart') ? 'active' : ''}`} 
                    title="My Cart" 
                    style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                    aria-label="My Cart"
                >
                    <FontAwesomeIcon icon={faShoppingCart} size="2x" />
                </button>
                <button 
                    onClick={navigateToWishlist} 
                    className={`nav-button ${isActive('/wishlist') ? 'active' : ''}`} 
                    title="Wishlist" 
                    style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                    aria-label="Wishlist"
                >
                    <FontAwesomeIcon icon={faHeart} size="2x" />
                </button>
                <button 
                    onClick={navigateToProducts} 
                    className={`nav-button ${isActive('/products') ? 'active' : ''}`} 
                    title="Products" 
                    style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                    aria-label="Products"
                >
                    <FontAwesomeIcon icon={faBoxes} size="2x" />
                </button>
                <button 
                    onClick={navigateToSupport} 
                    className={`nav-button ${isActive('/support') ? 'active' : ''}`} 
                    title="Support" 
                    style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                    aria-label="Support"
                >
                    <FontAwesomeIcon icon={faQuestionCircle} size="2x" />
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
