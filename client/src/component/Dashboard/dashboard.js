import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import AllProducts from '../Products/AllProducts';

const Dashboard = ({ user }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [sortBy, setSortBy] = useState('name');
    const [viewMode, setViewMode] = useState('grid');
    const [isLoading, setIsLoading] = useState(true);
    const [navbarVisible, setNavbarVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

    useEffect(() => {
        // Check if user came from category selection on home page
        const storedCategory = localStorage.getItem('selectedCategory');
        if (storedCategory) {
            setSelectedCategory(storedCategory);
            localStorage.removeItem('selectedCategory'); // Clear after use
        }

        // Simulate loading
        setTimeout(() => setIsLoading(false), 800);

        // Navbar scroll behavior
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY < 10) {
                // Always show navbar at top
                setNavbarVisible(true);
            } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
                // Scrolling down - hide navbar
                setNavbarVisible(false);
            } else if (currentScrollY < lastScrollY) {
                // Scrolling up - show navbar
                setNavbarVisible(true);
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [lastScrollY]);

    // Add navbar visibility class to body for global navbar control
    useEffect(() => {
        document.body.classList.toggle('navbar-hidden', !navbarVisible);
        return () => {
            document.body.classList.remove('navbar-hidden');
        };
    }, [navbarVisible]);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
    };

    const handleSortChange = (sort) => {
        setSortBy(sort);
    };

    const toggleViewMode = () => {
        setViewMode(viewMode === 'grid' ? 'list' : 'grid');
    };

    const toggleMobileFilters = () => {
        setIsMobileFiltersOpen(!isMobileFiltersOpen);
    };

    // Prevent body scroll when mobile filter is open
    useEffect(() => {
        if (isMobileFiltersOpen) {
            document.body.classList.add('mobile-filter-open');
        } else {
            document.body.classList.remove('mobile-filter-open');
        }

        // Cleanup on unmount
        return () => {
            document.body.classList.remove('mobile-filter-open');
        };
    }, [isMobileFiltersOpen]);

    if (isLoading) {
        return (
            <div className="dashboard-loading">
                <div className="loading-spinner">
                    <i className="fas fa-gem"></i>
                </div>
                <p>Loading your premium collection...</p>
            </div>
        );
    }

    return (
        <div className="dashboard-modern">
            {/* Dashboard Hero Section */}
            <section className="dashboard-hero">
                <div className="container">
                    <div className="hero-content">
                        <h1 className="dashboard-title">
                            <i className="fas fa-gem"></i> Premium Collection
                        </h1>
                        <p className="dashboard-subtitle">
                            Welcome back, {user?.name || 'Valued Customer'}! Discover our curated selection of luxury products.
                        </p>
                    </div>
                </div>
            </section>

            {/* Desktop Dashboard Controls */}
            <section className="dashboard-controls desktop-controls">
                <div className="container">
                    <div className="controls-wrapper">
                        {/* Search Bar */}
                        <div className="search-section">
                            <div className="search-wrapper">
                                <i className="fas fa-search search-icon"></i>
                                <input
                                    type="text"
                                    placeholder="Search premium products..."
                                    value={searchTerm}
                                    onChange={handleSearch}
                                    className="search-input"
                                />
                            </div>
                        </div>

                        {/* Filter Controls */}
                        <div className="filter-section">
                            <div className="filter-group">
                                <label className="filter-label">Category</label>
                                <select
                                    value={selectedCategory}
                                    onChange={(e) => handleCategoryChange(e.target.value)}
                                    className="filter-select"
                                >
                                    <option value="all">All Products</option>
                                    <option value="mobile">Mobile Phones</option>
                                    <option value="laptop">Laptops</option>
                                    <option value="accessories">Accessories</option>
                                </select>
                            </div>

                            <div className="filter-group">
                                <label className="filter-label">Sort By</label>
                                <select
                                    value={sortBy}
                                    onChange={(e) => handleSortChange(e.target.value)}
                                    className="filter-select"
                                >
                                    <option value="name">Name</option>
                                    <option value="price-low">Price: Low to High</option>
                                    <option value="price-high">Price: High to Low</option>
                                    <option value="newest">Newest First</option>
                                </select>
                            </div>

                            <div className="view-toggle">
                                <button
                                    onClick={toggleViewMode}
                                    className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                                    title="Grid View"
                                >
                                    <i className="fas fa-th"></i>
                                </button>
                                <button
                                    onClick={toggleViewMode}
                                    className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                                    title="List View"
                                >
                                    <i className="fas fa-list"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mobile Floating Burger Menu */}
            <div className="mobile-filter-burger">
                <button
                    className="burger-btn"
                    onClick={toggleMobileFilters}
                    aria-label="Toggle Filters"
                >
                    <i className="fas fa-sliders-h"></i>
                </button>
            </div>

            {/* Mobile Filter Overlay */}
            <div
                className={`mobile-filter-overlay ${isMobileFiltersOpen ? 'active' : ''}`}
                onClick={toggleMobileFilters}
            >
                <div
                    className="mobile-filter-content"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="mobile-filter-header">
                        <h3>Filters & Search</h3>
                        <button
                            className="close-btn"
                            onClick={toggleMobileFilters}
                            aria-label="Close Filters"
                        >
                            <i className="fas fa-times"></i>
                        </button>
                    </div>

                    <div className="mobile-filter-body">
                        {/* Mobile Search */}
                        <div className="mobile-search-section">
                            <div className="search-wrapper">
                                <i className="fas fa-search search-icon"></i>
                                <input
                                    type="text"
                                    placeholder="Search premium products..."
                                    value={searchTerm}
                                    onChange={handleSearch}
                                    className="search-input"
                                />
                            </div>
                        </div>

                        {/* Mobile Filters */}
                        <div className="mobile-filter-groups">
                            <div className="mobile-filter-group">
                                <label className="filter-label">Category</label>
                                <select
                                    value={selectedCategory}
                                    onChange={(e) => handleCategoryChange(e.target.value)}
                                    className="filter-select"
                                >
                                    <option value="all">All Products</option>
                                    <option value="mobile">Mobile Phones</option>
                                    <option value="laptop">Laptops</option>
                                    <option value="accessories">Accessories</option>
                                </select>
                            </div>

                            <div className="mobile-filter-group">
                                <label className="filter-label">Sort By</label>
                                <select
                                    value={sortBy}
                                    onChange={(e) => handleSortChange(e.target.value)}
                                    className="filter-select"
                                >
                                    <option value="name">Name</option>
                                    <option value="price-low">Price: Low to High</option>
                                    <option value="price-high">Price: High to Low</option>
                                    <option value="newest">Newest First</option>
                                </select>
                            </div>

                            <div className="mobile-view-toggle">
                                <label className="filter-label">View Mode</label>
                                <div className="view-toggle">
                                    <button
                                        onClick={toggleViewMode}
                                        className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                                        title="Grid View"
                                    >
                                        <i className="fas fa-th"></i>
                                        <span>Grid</span>
                                    </button>
                                    <button
                                        onClick={toggleViewMode}
                                        className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                                        title="List View"
                                    >
                                        <i className="fas fa-list"></i>
                                        <span>List</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Apply Button */}
                        <div className="mobile-filter-actions">
                            <button
                                className="apply-filters-btn"
                                onClick={toggleMobileFilters}
                            >
                                <i className="fas fa-check"></i>
                                Apply Filters
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Products Section */}
            <section className="dashboard-products">
                <div className="container">
                    <AllProducts
                        searchTerm={searchTerm}
                        selectedCategory={selectedCategory}
                        sortBy={sortBy}
                        viewMode={viewMode}
                    />
                </div>
            </section>
        </div>
    )
}

const mapStateToProps = (state) => ({
    user: state.auth.user
});

export default connect(mapStateToProps)(Dashboard);