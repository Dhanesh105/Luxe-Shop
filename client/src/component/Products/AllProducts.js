import React, { Fragment, useState, useMemo } from 'react'
import jsonData from './Data.json';
import { Link } from 'react-router-dom';

const AllProducts = ({ searchTerm = '', selectedCategory = 'all', sortBy = 'name', viewMode = 'grid' }) => {
    const [favorites, setFavorites] = useState(new Set());

    // Enhanced product data with categories
    const enhancedProducts = useMemo(() => {
        return jsonData.map(item => ({
            ...item,
            category: item.title.toLowerCase().includes('iphone') || item.title.toLowerCase().includes('redmi') || item.title.toLowerCase().includes('mi') ? 'mobile' :
                     item.title.toLowerCase().includes('macbook') || item.title.toLowerCase().includes('laptop') ? 'laptop' : 'accessories',
            rating: Math.floor(Math.random() * 2) + 4, // Random rating between 4-5
            reviews: Math.floor(Math.random() * 500) + 50, // Random reviews
            discount: Math.floor(Math.random() * 30) + 5, // Random discount 5-35%
            originalPrice: Math.floor(parseInt(item.price) * 1.2), // Calculate original price
            isNew: Math.random() > 0.7, // 30% chance of being new
            inStock: Math.random() > 0.1 // 90% chance of being in stock
        }));
    }, []);

    // Filter and sort products
    const filteredProducts = useMemo(() => {
        let filtered = enhancedProducts;

        // Filter by search term
        if (searchTerm) {
            filtered = filtered.filter(item =>
                item.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Filter by category
        if (selectedCategory !== 'all') {
            filtered = filtered.filter(item => item.category === selectedCategory);
        }

        // Sort products
        switch (sortBy) {
            case 'price-low':
                filtered.sort((a, b) => parseInt(a.price) - parseInt(b.price));
                break;
            case 'price-high':
                filtered.sort((a, b) => parseInt(b.price) - parseInt(a.price));
                break;
            case 'newest':
                filtered.sort((a, b) => b.isNew - a.isNew);
                break;
            default:
                filtered.sort((a, b) => a.title.localeCompare(b.title));
        }

        return filtered;
    }, [enhancedProducts, searchTerm, selectedCategory, sortBy]);

    const toggleFavorite = (title) => {
        const newFavorites = new Set(favorites);
        if (newFavorites.has(title)) {
            newFavorites.delete(title);
        } else {
            newFavorites.add(title);
        }
        setFavorites(newFavorites);
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(price);
    };

    const getCategoryIcon = (category) => {
        switch (category) {
            case 'mobile': return 'fas fa-mobile-alt';
            case 'laptop': return 'fas fa-laptop';
            default: return 'fas fa-headphones';
        }
    };

    if (filteredProducts.length === 0) {
        return (
            <div className="no-products">
                <div className="no-products-content">
                    <i className="fas fa-search"></i>
                    <h3>No Products Found</h3>
                    <p>Try adjusting your search or filter criteria</p>
                </div>
            </div>
        );
    }

    return (
        <Fragment>
            <div className="products-header">
                <div className="products-count">
                    <span className="count-number">{filteredProducts.length}</span>
                    <span className="count-text">Premium Products</span>
                </div>
            </div>

            <div className={`products-grid ${viewMode === 'list' ? 'list-view' : 'grid-view'}`}>
                {filteredProducts.map((item, index) => (
                    <div key={item.title} className={`product-card ${viewMode === 'list' ? 'list-card' : ''}`}>
                        <div className="card-badges">
                            <span className="badge badge-category">
                                <i className={getCategoryIcon(item.category)}></i>
                            </span>
                            {item.isNew && <span className="badge badge-new">New</span>}
                            {item.discount > 20 && <span className="badge badge-sale">Sale</span>}
                            {!item.inStock && <span className="badge badge-out">Out of Stock</span>}
                        </div>

                        <div className="card-image">
                            <img
                                src={require(`./${item.imagename}`).default}
                                alt={item.title}
                                className="product-image"
                            />
                            <div className="image-overlay">
                                <button
                                    className={`favorite-btn ${favorites.has(item.title) ? 'active' : ''}`}
                                    onClick={() => toggleFavorite(item.title)}
                                >
                                    <i className={favorites.has(item.title) ? 'fas fa-heart' : 'far fa-heart'}></i>
                                </button>
                                <Link
                                    to={`/indproduct/${item.imagename}+${item.title}+${item.price}`}
                                    className="quick-view-btn"
                                >
                                    <i className="fas fa-eye"></i>
                                </Link>
                            </div>
                        </div>

                        <div className="card-content">
                            <div className="product-info">
                                <h3 className="product-title">
                                    <Link to={`/indproduct/${item.imagename}+${item.title}+${item.price}`}>
                                        {item.title}
                                    </Link>
                                </h3>

                                <div className="product-rating">
                                    {[...Array(5)].map((_, i) => (
                                        <i
                                            key={i}
                                            className={`fas fa-star ${i < item.rating ? 'active' : ''}`}
                                        ></i>
                                    ))}
                                    <span className="rating-text">({item.reviews})</span>
                                </div>
                            </div>

                            <div className="product-pricing">
                                <span className="current-price">{formatPrice(item.price)}</span>
                                {item.discount > 0 && (
                                    <>
                                        <span className="original-price">{formatPrice(item.originalPrice)}</span>
                                        <span className="discount-badge">{item.discount}% OFF</span>
                                    </>
                                )}
                            </div>

                            <div className="card-actions">
                                <Link
                                    to={`/indproduct/${item.imagename}+${item.title}+${item.price}`}
                                    className="btn-product-primary"
                                    disabled={!item.inStock}
                                >
                                    <i className="fas fa-shopping-bag"></i>
                                    {item.inStock ? 'View Details' : 'Out of Stock'}
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </Fragment>
    )
}

export default AllProducts;