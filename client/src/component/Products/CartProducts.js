import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteCart } from '../../action/cart';

const CartProducts = ({ cart, deleteCart, user }) => {
    const [quantities, setQuantities] = useState({});
    const [isLoading, setIsLoading] = useState({});

    // Calculate cart totals
    const cartSummary = useMemo(() => {
        const subtotal = cart.reduce((sum, item) => {
            const qty = quantities[item._id] || 1;
            return sum + (parseInt(item.price) * qty);
        }, 0);

        const shipping = subtotal > 50000 ? 0 : 500; // Free shipping over ₹50,000
        const tax = Math.floor(subtotal * 0.18); // 18% GST
        const total = subtotal + shipping + tax;

        return { subtotal, shipping, tax, total, itemCount: cart.length };
    }, [cart, quantities]);

    const updateQuantity = (itemId, newQty) => {
        if (newQty >= 1) {
            setQuantities(prev => ({
                ...prev,
                [itemId]: newQty
            }));
        }
    };

    const handleRemoveItem = async (itemId) => {
        setIsLoading(prev => ({ ...prev, [itemId]: true }));
        await deleteCart(itemId);
        setIsLoading(prev => ({ ...prev, [itemId]: false }));
        // Remove from quantities state
        setQuantities(prev => {
            const newQuantities = { ...prev };
            delete newQuantities[itemId];
            return newQuantities;
        });
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(price);
    };

    if (cart.length === 0) {
        return (
            <div className="cart-modern">
                <div className="container">
                    <div className="empty-cart">
                        <div className="empty-cart-content">
                            <div className="empty-cart-icon">
                                <i className="fas fa-shopping-cart"></i>
                            </div>
                            <h2 className="empty-cart-title">Your Cart is Empty</h2>
                            <p className="empty-cart-subtitle">
                                Looks like you haven't added any items to your cart yet.
                                Start shopping to fill it up!
                            </p>
                            <Link to="/dashboard" className="btn-continue-shopping">
                                <i className="fas fa-arrow-left"></i>
                                Continue Shopping
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="cart-modern">
            <div className="container">
                {/* Cart Header */}
                <div className="cart-header">
                    <div className="cart-title-section">
                        <h1 className="cart-title">
                            <i className="fas fa-shopping-cart"></i>
                            Shopping Cart
                        </h1>
                        <p className="cart-subtitle">
                            {cartSummary.itemCount} {cartSummary.itemCount === 1 ? 'item' : 'items'} in your cart
                        </p>
                    </div>
                    <Link to="/dashboard" className="btn-continue-shopping-small">
                        <i className="fas fa-plus"></i>
                        Add More Items
                    </Link>
                </div>

                <div className="cart-layout">
                    {/* Cart Items */}
                    <div className="cart-items-section">
                        <div className="cart-items-header">
                            <h3>Items in Your Cart</h3>
                        </div>

                        <div className="cart-items-list">
                            {cart.map(item => {
                                const quantity = quantities[item._id] || 1;
                                const itemTotal = parseInt(item.price) * quantity;

                                return (
                                    <div key={item._id} className="cart-item">
                                        <div className="cart-item-image">
                                            <img
                                                src={require(`./${item.imagename}`).default}
                                                alt={item.title}
                                            />
                                        </div>

                                        <div className="cart-item-details">
                                            <div className="cart-item-info">
                                                <h4 className="cart-item-title">
                                                    <Link to={`/indproduct/${item.imagename}+${item.title}+${item.price}+${item._id}`}>
                                                        {item.title}
                                                    </Link>
                                                </h4>
                                                <p className="cart-item-price">
                                                    {formatPrice(item.price)} each
                                                </p>
                                            </div>

                                            <div className="cart-item-controls">
                                                <div className="quantity-controls">
                                                    <button
                                                        className="quantity-btn"
                                                        onClick={() => updateQuantity(item._id, quantity - 1)}
                                                        disabled={quantity <= 1}
                                                    >
                                                        <i className="fas fa-minus"></i>
                                                    </button>
                                                    <span className="quantity-display">{quantity}</span>
                                                    <button
                                                        className="quantity-btn"
                                                        onClick={() => updateQuantity(item._id, quantity + 1)}
                                                    >
                                                        <i className="fas fa-plus"></i>
                                                    </button>
                                                </div>

                                                <div className="cart-item-total">
                                                    {formatPrice(itemTotal)}
                                                </div>

                                                <button
                                                    className="btn-remove-item"
                                                    onClick={() => handleRemoveItem(item._id)}
                                                    disabled={isLoading[item._id]}
                                                >
                                                    {isLoading[item._id] ? (
                                                        <i className="fas fa-spinner fa-spin"></i>
                                                    ) : (
                                                        <i className="fas fa-trash"></i>
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Cart Summary */}
                    <div className="cart-summary-section">
                        <div className="cart-summary">
                            <h3 className="summary-title">Order Summary</h3>

                            <div className="summary-details">
                                <div className="summary-row">
                                    <span className="summary-label">Subtotal ({cartSummary.itemCount} items)</span>
                                    <span className="summary-value">{formatPrice(cartSummary.subtotal)}</span>
                                </div>

                                <div className="summary-row">
                                    <span className="summary-label">Shipping</span>
                                    <span className="summary-value">
                                        {cartSummary.shipping === 0 ? (
                                            <span className="free-shipping">FREE</span>
                                        ) : (
                                            formatPrice(cartSummary.shipping)
                                        )}
                                    </span>
                                </div>

                                <div className="summary-row">
                                    <span className="summary-label">Tax (GST 18%)</span>
                                    <span className="summary-value">{formatPrice(cartSummary.tax)}</span>
                                </div>

                                <div className="summary-divider"></div>

                                <div className="summary-row summary-total">
                                    <span className="summary-label">Total</span>
                                    <span className="summary-value">{formatPrice(cartSummary.total)}</span>
                                </div>
                            </div>

                            <div className="checkout-section">
                                <button className="btn-checkout">
                                    <i className="fas fa-lock"></i>
                                    Proceed to Checkout
                                </button>

                                <div className="payment-methods">
                                    <p className="payment-text">We accept:</p>
                                    <div className="payment-icons">
                                        <i className="fab fa-cc-visa"></i>
                                        <i className="fab fa-cc-mastercard"></i>
                                        <i className="fab fa-cc-paypal"></i>
                                        <i className="fas fa-university"></i>
                                    </div>
                                </div>

                                <div className="security-badge">
                                    <i className="fas fa-shield-alt"></i>
                                    <span>Secure Checkout</span>
                                </div>
                            </div>
                        </div>

                        {/* Promo Code Section */}
                        <div className="promo-section">
                            <h4 className="promo-title">Have a Promo Code?</h4>
                            <div className="promo-input-group">
                                <input
                                    type="text"
                                    className="promo-input"
                                    placeholder="Enter promo code"
                                />
                                <button className="btn-apply-promo">Apply</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

CartProducts.propTypes = {
    cart: PropTypes.array.isRequired,
    deleteCart: PropTypes.func.isRequired,
    user: PropTypes.object
}

const mapStateToProps = (state) => ({
    cart: state.cart,
    user: state.auth.user
})

export default connect(mapStateToProps, { deleteCart })(CartProducts);