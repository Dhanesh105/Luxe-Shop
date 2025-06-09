import React, { Fragment } from 'react';
import Card from './Card';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

const Carousel = ({ isAuthenticated }) => {
    if (isAuthenticated) {
        return <Redirect to='/dashboard' />
    }

    return (
        <Fragment>
            {/* Enhanced Hero Section */}
            <section className="hero-section-modern">
                <div className="hero-background"></div>
                <div className="hero-content">
                    <div className="container">
                        <div className="row align-items-center min-vh-100">
                            <div className="col-lg-6">
                                <div className="hero-text">
                                    <h1 className="hero-title-modern">
                                        <span className="hero-accent">Luxury</span> Redefined
                                    </h1>
                                    <p className="hero-subtitle-modern">
                                        Experience the pinnacle of premium shopping with our curated collection
                                        of exceptional products designed for the discerning individual.
                                    </p>
                                    <div className="hero-buttons">
                                        <button className="btn-hero-primary" onClick={() => window.scrollTo({top: 800, behavior: 'smooth'})}>
                                            <i className="fas fa-shopping-bag"></i> Explore Collection
                                        </button>
                                        <button className="btn-hero-secondary" onClick={() => window.scrollTo({top: 1200, behavior: 'smooth'})}>
                                            <i className="fas fa-play"></i> Watch Story
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="hero-visual">
                                    <div className="floating-card card-1">
                                        <i className="fas fa-mobile-alt"></i>
                                        <span>Premium Phones</span>
                                    </div>
                                    <div className="floating-card card-2">
                                        <i className="fas fa-laptop"></i>
                                        <span>Luxury Laptops</span>
                                    </div>
                                    <div className="floating-card card-3">
                                        <i className="fas fa-headphones"></i>
                                        <span>Elite Audio</span>
                                    </div>
                                    <div className="hero-center-icon">
                                        <i className="fas fa-gem"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Modern Gradient Carousel */}
            <div className="container" style={{ marginTop: '4rem' }}>
                <div className="section-header text-center mb-5">
                    <h2 className="section-title">Featured Collections</h2>
                    <p className="section-subtitle">Handpicked premium products for the modern lifestyle</p>
                </div>

                <div id="luxeCarousel" className="carousel slide carousel-luxury" data-ride="carousel">
                    <ol className="carousel-indicators">
                        <li data-target="#luxeCarousel" data-slide-to="0" className="active"></li>
                        <li data-target="#luxeCarousel" data-slide-to="1"></li>
                        <li data-target="#luxeCarousel" data-slide-to="2"></li>
                    </ol>
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <div className="carousel-slide slide-mobile">
                                <div className="slide-content">
                                    <div className="slide-icon">
                                        <i className="fas fa-mobile-alt"></i>
                                    </div>
                                    <h3>Premium Mobile Collection</h3>
                                    <p>Latest flagship smartphones with cutting-edge technology</p>
                                    <button className="btn-slide" onClick={() => document.querySelector('.mobile-card .btn').click()}>
                                        Explore Phones <i className="fas fa-arrow-right"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <div className="carousel-slide slide-laptop">
                                <div className="slide-content">
                                    <div className="slide-icon">
                                        <i className="fas fa-laptop"></i>
                                    </div>
                                    <h3>Luxury Computing</h3>
                                    <p>High-performance laptops and workstations for professionals</p>
                                    <button className="btn-slide" onClick={() => document.querySelector('.laptop-card .btn').click()}>
                                        View Laptops <i className="fas fa-arrow-right"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <div className="carousel-slide slide-accessories">
                                <div className="slide-content">
                                    <div className="slide-icon">
                                        <i className="fas fa-headphones"></i>
                                    </div>
                                    <h3>Elite Accessories</h3>
                                    <p>Premium gadgets and accessories from top brands</p>
                                    <button className="btn-slide" onClick={() => document.querySelector('.accessories-card .btn').click()}>
                                        Shop Accessories <i className="fas fa-arrow-right"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <a className="carousel-control-prev" href="#luxeCarousel" role="button" data-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="sr-only">Previous</span>
                    </a>
                    <a className="carousel-control-next" href="#luxeCarousel" role="button" data-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="sr-only">Next</span>
                    </a>
                </div>
            </div>

            {/* Product Categories */}
            <div className="container" style={{ marginTop: '3rem' }}>
                <Card />
            </div>
        </Fragment>
    )
}

const mapStateToProps = state => ({
    isAuthenticated : state.auth.isAuthenticated,
})
export default connect(mapStateToProps)(Carousel);