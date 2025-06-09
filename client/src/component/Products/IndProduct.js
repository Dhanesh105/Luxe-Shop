import React, { useState } from 'react'
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {addToCart} from '../../action/cart';
import {deleteCart} from '../../action/cart';

const IndProduct = ({match,cart,user,addToCart,deleteCart,address}) => {
    const [selectedImage, setSelectedImage] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('description');

    let data = match.params.data.split('+')
    let title = data[1];
    let price = data[2];
    let imagename = data[0];

    let exist = cart.filter(item => item.title === title).length > 0;
    let id = exist && cart.filter(item => item.title === title)[0]._id;

    // Generate product details based on title
    const getProductDetails = () => {
        const category = title.toLowerCase().includes('mi') || title.toLowerCase().includes('iphone') || title.toLowerCase().includes('samsung') ? 'Mobile' :
                        title.toLowerCase().includes('laptop') || title.toLowerCase().includes('macbook') ? 'Laptop' : 'Accessories';

        const rating = Math.floor(Math.random() * 2) + 4; // 4-5 stars
        const reviews = Math.floor(Math.random() * 500) + 100;
        const discount = Math.floor(Math.random() * 30) + 10;
        const originalPrice = Math.floor(price * (100 + discount) / 100);

        return {
            category,
            rating,
            reviews,
            discount,
            originalPrice,
            features: getFeatures(category),
            specifications: getSpecifications(category, title)
        };
    };

    const getFeatures = (category) => {
        const features = {
            Mobile: [
                'High-resolution display',
                'Advanced camera system',
                'Fast charging technology',
                'Premium build quality',
                'Latest processor'
            ],
            Laptop: [
                'High-performance processor',
                'Full HD display',
                'Long battery life',
                'Lightweight design',
                'Fast SSD storage'
            ],
            Accessories: [
                'Premium materials',
                'Universal compatibility',
                'Durable construction',
                'Ergonomic design',
                'Easy to use'
            ]
        };
        return features[category] || features.Accessories;
    };

    const getSpecifications = (category, title) => {
        if (category === 'Mobile') {
            return {
                'Display': '6.67" AMOLED',
                'Processor': 'Snapdragon 888',
                'RAM': '6GB/8GB',
                'Storage': '128GB/256GB',
                'Camera': '108MP Triple Camera',
                'Battery': '4500mAh',
                'OS': 'Android 12'
            };
        } else if (category === 'Laptop') {
            return {
                'Processor': 'Intel Core i7',
                'RAM': '16GB DDR4',
                'Storage': '512GB SSD',
                'Display': '15.6" Full HD',
                'Graphics': 'Intel Iris Xe',
                'Battery': 'Up to 10 hours',
                'OS': 'Windows 11'
            };
        } else {
            return {
                'Material': 'Premium Quality',
                'Compatibility': 'Universal',
                'Warranty': '1 Year',
                'Color': 'Multiple Options',
                'Weight': 'Lightweight'
            };
        }
    };

    const productDetails = getProductDetails();

    const handleAddToCart = async () => {
        setIsLoading(true);
        await addToCart({user, title, price, imagename, quantity});
        setIsLoading(false);
    };

    const handleRemoveFromCart = async () => {
        setIsLoading(true);
        await deleteCart(id);
        setIsLoading(false);
    };

    return (
        <div className="product-detail-modern">
            {/* Breadcrumb */}
            <div className="container">
                <nav className="breadcrumb-modern">
                    <Link to="/" className="breadcrumb-link">
                        <i className="fas fa-home"></i> Home
                    </Link>
                    <span className="breadcrumb-separator">
                        <i className="fas fa-chevron-right"></i>
                    </span>
                    <Link to="/dashboard" className="breadcrumb-link">Products</Link>
                    <span className="breadcrumb-separator">
                        <i className="fas fa-chevron-right"></i>
                    </span>
                    <span className="breadcrumb-current">{productDetails.category}</span>
                </nav>
            </div>

            <div className="container product-container">
                <div className="product-layout">
                    {/* Product Images Section */}
                    <div className="product-images-section">
                        <div className="main-image-container">
                            <div className="image-badges">
                                {productDetails.discount > 0 && (
                                    <span className="badge badge-sale">
                                        -{productDetails.discount}%
                                    </span>
                                )}
                                <span className="badge badge-new">New</span>
                            </div>
                            <img
                                className="main-product-image"
                                src={require(`./${imagename}`).default}
                                alt={title}
                            />
                            <div className="image-zoom-hint">
                                <i className="fas fa-search-plus"></i>
                                Click to zoom
                            </div>
                        </div>

                        {/* Thumbnail images (simulated) */}
                        <div className="thumbnail-container">
                            {[0, 1, 2, 3].map((index) => (
                                <div
                                    key={index}
                                    className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                                    onClick={() => setSelectedImage(index)}
                                >
                                    <img
                                        src={require(`./${imagename}`).default}
                                        alt={`${title} view ${index + 1}`}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Product Details Section */}
                    <div className="product-details-section">
                        <div className="product-header">
                            <div className="product-category">
                                <i className="fas fa-tag"></i>
                                {productDetails.category}
                            </div>
                            <h1 className="product-title">{title}</h1>

                            {/* Rating */}
                            <div className="product-rating">
                                <div className="stars">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <i
                                            key={star}
                                            className={`fas fa-star ${star <= productDetails.rating ? 'active' : ''}`}
                                        ></i>
                                    ))}
                                </div>
                                <span className="rating-text">
                                    {productDetails.rating}.0 ({productDetails.reviews} reviews)
                                </span>
                            </div>
                        </div>

                        {/* Pricing */}
                        <div className="product-pricing-section">
                            <div className="price-container">
                                <span className="current-price">₹{parseInt(price).toLocaleString()}</span>
                                {productDetails.discount > 0 && (
                                    <>
                                        <span className="original-price">₹{productDetails.originalPrice.toLocaleString()}</span>
                                        <span className="discount-badge">Save ₹{(productDetails.originalPrice - price).toLocaleString()}</span>
                                    </>
                                )}
                            </div>
                            <div className="price-details">
                                <div className="price-item">
                                    <i className="fas fa-truck"></i>
                                    <span>Free delivery within 7 working days</span>
                                </div>
                                <div className="price-item">
                                    <i className="fas fa-shield-alt"></i>
                                    <span>1 year warranty included</span>
                                </div>
                                <div className="price-item">
                                    <i className="fas fa-undo"></i>
                                    <span>30-day return policy</span>
                                </div>
                            </div>
                        </div>

                        {/* Quantity and Actions */}
                        <div className="product-actions-section">
                            <div className="quantity-selector">
                                <label className="quantity-label">Quantity:</label>
                                <div className="quantity-controls">
                                    <button
                                        className="quantity-btn"
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        disabled={quantity <= 1}
                                    >
                                        <i className="fas fa-minus"></i>
                                    </button>
                                    <span className="quantity-display">{quantity}</span>
                                    <button
                                        className="quantity-btn"
                                        onClick={() => setQuantity(quantity + 1)}
                                    >
                                        <i className="fas fa-plus"></i>
                                    </button>
                                </div>
                            </div>

                            <div className="action-buttons">
                                <Link
                                    to={`/placeorder/${title}+${imagename}+${price}+${address}`}
                                    className="btn-order-now"
                                >
                                    <i className="fas fa-bolt"></i>
                                    Order Now
                                </Link>

                                {exist ? (
                                    <button
                                        className="btn-remove-cart"
                                        onClick={handleRemoveFromCart}
                                        disabled={isLoading}
                                    >
                                        {isLoading ? (
                                            <i className="fas fa-spinner fa-spin"></i>
                                        ) : (
                                            <i className="fas fa-trash"></i>
                                        )}
                                        Remove from Cart
                                    </button>
                                ) : (
                                    <button
                                        className="btn-add-cart"
                                        onClick={handleAddToCart}
                                        disabled={isLoading}
                                    >
                                        {isLoading ? (
                                            <i className="fas fa-spinner fa-spin"></i>
                                        ) : (
                                            <i className="fas fa-shopping-cart"></i>
                                        )}
                                        Add to Cart
                                    </button>
                                )}
                            </div>

                            <div className="secondary-actions">
                                <button className="btn-wishlist">
                                    <i className="far fa-heart"></i>
                                    Add to Wishlist
                                </button>
                                <button className="btn-compare">
                                    <i className="fas fa-balance-scale"></i>
                                    Compare
                                </button>
                                <button className="btn-share">
                                    <i className="fas fa-share-alt"></i>
                                    Share
                                </button>
                            </div>
                        </div>

                        {/* Key Features */}
                        <div className="product-features-section">
                            <h3 className="section-title">Key Features</h3>
                            <ul className="features-list">
                                {productDetails.features.map((feature, index) => (
                                    <li key={index} className="feature-item">
                                        <i className="fas fa-check-circle"></i>
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Detailed Information Tabs */}
                <div className="product-tabs-section">
                    <div className="tabs-container">
                        <div className="tab-headers">
                            <button
                                className={`tab-header ${activeTab === 'description' ? 'active' : ''}`}
                                onClick={() => setActiveTab('description')}
                            >
                                <i className="fas fa-info-circle"></i>
                                Description
                            </button>
                            <button
                                className={`tab-header ${activeTab === 'specifications' ? 'active' : ''}`}
                                onClick={() => setActiveTab('specifications')}
                            >
                                <i className="fas fa-cogs"></i>
                                Specifications
                            </button>
                            <button
                                className={`tab-header ${activeTab === 'reviews' ? 'active' : ''}`}
                                onClick={() => setActiveTab('reviews')}
                            >
                                <i className="fas fa-star"></i>
                                Reviews ({productDetails.reviews})
                            </button>
                            <button
                                className={`tab-header ${activeTab === 'shipping' ? 'active' : ''}`}
                                onClick={() => setActiveTab('shipping')}
                            >
                                <i className="fas fa-shipping-fast"></i>
                                Shipping & Returns
                            </button>
                        </div>

                        <div className="tab-content">
                            {/* Description Tab */}
                            {activeTab === 'description' && (
                            <div className="tab-pane active" id="description">
                                <div className="description-content">
                                    <h4>About this product</h4>
                                    <p className="product-description">
                                        Experience the perfect blend of performance, style, and innovation with the {title}.
                                        This premium {productDetails.category.toLowerCase()} is designed to meet all your needs
                                        with cutting-edge technology and exceptional build quality.
                                    </p>

                                    <div className="description-highlights">
                                        <div className="highlight-item">
                                            <i className="fas fa-award"></i>
                                            <div>
                                                <h5>Premium Quality</h5>
                                                <p>Crafted with the finest materials and attention to detail</p>
                                            </div>
                                        </div>
                                        <div className="highlight-item">
                                            <i className="fas fa-rocket"></i>
                                            <div>
                                                <h5>High Performance</h5>
                                                <p>Optimized for speed, efficiency, and reliability</p>
                                            </div>
                                        </div>
                                        <div className="highlight-item">
                                            <i className="fas fa-shield-alt"></i>
                                            <div>
                                                <h5>Warranty Protection</h5>
                                                <p>Comprehensive warranty coverage for peace of mind</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            )}

                            {/* Specifications Tab */}
                            {activeTab === 'specifications' && (
                            <div className="tab-pane active" id="specifications">
                                <div className="specifications-content">
                                    <h4>Technical Specifications</h4>
                                    <div className="specs-grid">
                                        {Object.entries(productDetails.specifications).map(([key, value]) => (
                                            <div key={key} className="spec-item">
                                                <span className="spec-label">{key}</span>
                                                <span className="spec-value">{value}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            )}

                            {/* Reviews Tab */}
                            {activeTab === 'reviews' && (
                            <div className="tab-pane active" id="reviews">
                                <div className="reviews-content">
                                    <div className="reviews-summary">
                                        <div className="rating-overview">
                                            <div className="rating-score">
                                                <span className="score">{productDetails.rating}.0</span>
                                                <div className="stars">
                                                    {[1, 2, 3, 4, 5].map((star) => (
                                                        <i
                                                            key={star}
                                                            className={`fas fa-star ${star <= productDetails.rating ? 'active' : ''}`}
                                                        ></i>
                                                    ))}
                                                </div>
                                                <span className="total-reviews">{productDetails.reviews} reviews</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="sample-reviews">
                                        <div className="review-item">
                                            <div className="reviewer-info">
                                                <div className="reviewer-avatar">
                                                    <i className="fas fa-user"></i>
                                                </div>
                                                <div className="reviewer-details">
                                                    <h5>Verified Buyer</h5>
                                                    <div className="review-rating">
                                                        {[1, 2, 3, 4, 5].map((star) => (
                                                            <i key={star} className="fas fa-star active"></i>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                            <p className="review-text">
                                                "Excellent product! The quality exceeded my expectations.
                                                Fast delivery and great customer service. Highly recommended!"
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            )}

                            {/* Shipping Tab */}
                            {activeTab === 'shipping' && (
                            <div className="tab-pane active" id="shipping">
                                <div className="shipping-content">
                                    <h4>Shipping & Returns</h4>
                                    <div className="shipping-info">
                                        <div className="shipping-item">
                                            <i className="fas fa-truck"></i>
                                            <div>
                                                <h5>Free Delivery</h5>
                                                <p>Free standard delivery within 7 working days</p>
                                            </div>
                                        </div>
                                        <div className="shipping-item">
                                            <i className="fas fa-clock"></i>
                                            <div>
                                                <h5>Express Delivery</h5>
                                                <p>Next-day delivery available for ₹99</p>
                                            </div>
                                        </div>
                                        <div className="shipping-item">
                                            <i className="fas fa-undo"></i>
                                            <div>
                                                <h5>Easy Returns</h5>
                                                <p>30-day return policy with free pickup</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state =>({
    cart : state.cart,
    user : state.auth.user._id,
    address : state.auth.user.address
})

export default connect(mapStateToProps,{addToCart,deleteCart})(IndProduct);