import React, { Fragment } from 'react'
import { Link } from 'react-router-dom';

const Card = () => {
    const handleCategoryClick = (category) => {
        // Store the selected category in localStorage for the dashboard to use
        localStorage.setItem('selectedCategory', category);
        // Scroll to top for better UX
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <Fragment>
            <div className="row">
                <div className="col-lg-4 col-md-6 mb-4">
                    <div className="card card-modern h-100 mobile-card">
                        <div className="card-body d-flex flex-column">
                            <div className="text-center mb-3">
                                <div className="card-icon-wrapper">
                                    <i className="fas fa-mobile-alt"></i>
                                </div>
                            </div>
                            <h5 className="card-title text-center">Premium Mobile Phones</h5>
                            <p className="card-text flex-grow-1">
                                Discover the latest flagship Android and iOS devices with cutting-edge technology
                                and premium build quality from top manufacturers.
                            </p>
                            <div className="card-stats">
                                <div className="stat">
                                    <span className="stat-number">50+</span>
                                    <span className="stat-label">Models</span>
                                </div>
                                <div className="stat">
                                    <span className="stat-number">5★</span>
                                    <span className="stat-label">Rated</span>
                                </div>
                            </div>
                            <div className="text-center mt-auto">
                                <Link
                                    to="/register"
                                    className="btn"
                                    onClick={() => handleCategoryClick('mobile')}
                                >
                                    <i className="fas fa-arrow-right"></i> Explore Collection
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-lg-4 col-md-6 mb-4">
                    <div className="card card-modern h-100 laptop-card">
                        <div className="card-body d-flex flex-column">
                            <div className="text-center mb-3">
                                <div className="card-icon-wrapper">
                                    <i className="fas fa-laptop"></i>
                                </div>
                            </div>
                            <h5 className="card-title text-center">Luxury Laptops & PCs</h5>
                            <p className="card-text flex-grow-1">
                                High-performance laptops and desktop computers engineered for professionals,
                                gamers, and creative enthusiasts who demand excellence.
                            </p>
                            <div className="card-stats">
                                <div className="stat">
                                    <span className="stat-number">30+</span>
                                    <span className="stat-label">Models</span>
                                </div>
                                <div className="stat">
                                    <span className="stat-number">Pro</span>
                                    <span className="stat-label">Grade</span>
                                </div>
                            </div>
                            <div className="text-center mt-auto">
                                <Link
                                    to="/register"
                                    className="btn"
                                    onClick={() => handleCategoryClick('laptop')}
                                >
                                    <i className="fas fa-arrow-right"></i> View Products
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-lg-4 col-md-6 mb-4">
                    <div className="card card-modern h-100 accessories-card">
                        <div className="card-body d-flex flex-column">
                            <div className="text-center mb-3">
                                <div className="card-icon-wrapper">
                                    <i className="fas fa-headphones"></i>
                                </div>
                            </div>
                            <h5 className="card-title text-center">Elite Accessories</h5>
                            <p className="card-text flex-grow-1">
                                Premium accessories and gadgets from world-renowned brands to complement
                                your lifestyle and elevate your everyday experience.
                            </p>
                            <div className="card-stats">
                                <div className="stat">
                                    <span className="stat-number">100+</span>
                                    <span className="stat-label">Items</span>
                                </div>
                                <div className="stat">
                                    <span className="stat-number">New</span>
                                    <span className="stat-label">Arrivals</span>
                                </div>
                            </div>
                            <div className="text-center mt-auto">
                                <Link
                                    to="/register"
                                    className="btn"
                                    onClick={() => handleCategoryClick('accessories')}
                                >
                                    <i className="fas fa-arrow-right"></i> Shop Now
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Card;