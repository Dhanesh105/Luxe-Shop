import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Profile = ({ user, cart, orders }) => {
    const [activeTab, setActiveTab] = useState('overview');
    const [isEditing, setIsEditing] = useState(false);
    const [profileData, setProfileData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        pincode: ''
    });

    useEffect(() => {
        if (user) {
            setProfileData({
                name: user.name || '',
                email: user.email || '',
                phone: user.phone || '',
                address: user.address || '',
                city: user.city || '',
                state: user.state || '',
                pincode: user.pincode || ''
            });
        }
    }, [user]);

    const handleInputChange = (e) => {
        setProfileData({
            ...profileData,
            [e.target.name]: e.target.value
        });
    };

    const handleSaveProfile = () => {
        // Here you would typically dispatch an action to update the user profile
        console.log('Saving profile:', profileData);
        setIsEditing(false);
        // You can add actual API call here
    };

    const getInitials = (name) => {
        return name ? name.split(' ').map(n => n[0]).join('').toUpperCase() : 'U';
    };

    const getAccountStats = () => {
        const totalOrders = orders?.length || 0;
        const totalSpent = orders?.reduce((sum, order) => sum + (order.total || 0), 0) || 0;
        const cartItems = cart?.length || 0;
        const memberSince = user?.createdAt ? new Date(user.createdAt).getFullYear() : new Date().getFullYear();

        return { totalOrders, totalSpent, cartItems, memberSince };
    };

    const stats = getAccountStats();

    if (!user) {
        return (
            <div className="profile-loading">
                <div className="loading-spinner">
                    <i className="fas fa-user"></i>
                </div>
                <p>Loading profile...</p>
            </div>
        );
    }

    return (
        <div className="profile-modern">
            {/* Profile Header */}
            <section className="profile-hero">
                <div className="container">
                    <div className="profile-header">
                        <div className="profile-avatar-section">
                            <div className="profile-avatar">
                                {user.avatar ? (
                                    <img src={user.avatar} alt={user.name} />
                                ) : (
                                    <span className="avatar-initials">
                                        {getInitials(user.name)}
                                    </span>
                                )}
                                <div className="avatar-status">
                                    <i className="fas fa-check-circle"></i>
                                </div>
                            </div>
                            <div className="profile-info">
                                <h1 className="profile-name">{user.name}</h1>
                                <p className="profile-email">{user.email}</p>
                                <div className="profile-badges">
                                    <span className="badge badge-premium">
                                        <i className="fas fa-crown"></i>
                                        Premium Member
                                    </span>
                                    <span className="badge badge-verified">
                                        <i className="fas fa-shield-check"></i>
                                        Verified
                                    </span>
                                </div>
                            </div>
                        </div>
                        
                        <div className="profile-stats">
                            <div className="stat-card">
                                <div className="stat-icon">
                                    <i className="fas fa-shopping-bag"></i>
                                </div>
                                <div className="stat-info">
                                    <span className="stat-number">{stats.totalOrders}</span>
                                    <span className="stat-label">Total Orders</span>
                                </div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-icon">
                                    <i className="fas fa-rupee-sign"></i>
                                </div>
                                <div className="stat-info">
                                    <span className="stat-number">₹{stats.totalSpent.toLocaleString()}</span>
                                    <span className="stat-label">Total Spent</span>
                                </div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-icon">
                                    <i className="fas fa-shopping-cart"></i>
                                </div>
                                <div className="stat-info">
                                    <span className="stat-number">{stats.cartItems}</span>
                                    <span className="stat-label">Cart Items</span>
                                </div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-icon">
                                    <i className="fas fa-calendar"></i>
                                </div>
                                <div className="stat-info">
                                    <span className="stat-number">{stats.memberSince}</span>
                                    <span className="stat-label">Member Since</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Profile Content */}
            <section className="profile-content">
                <div className="container">
                    <div className="profile-layout">
                        {/* Profile Navigation */}
                        <div className="profile-nav">
                            <div className="nav-card">
                                <h3 className="nav-title">
                                    <i className="fas fa-user-cog"></i>
                                    Account Settings
                                </h3>
                                <ul className="nav-menu">
                                    <li>
                                        <button 
                                            className={`nav-item ${activeTab === 'overview' ? 'active' : ''}`}
                                            onClick={() => setActiveTab('overview')}
                                        >
                                            <i className="fas fa-chart-pie"></i>
                                            Overview
                                        </button>
                                    </li>
                                    <li>
                                        <button 
                                            className={`nav-item ${activeTab === 'personal' ? 'active' : ''}`}
                                            onClick={() => setActiveTab('personal')}
                                        >
                                            <i className="fas fa-user-edit"></i>
                                            Personal Info
                                        </button>
                                    </li>
                                    <li>
                                        <button 
                                            className={`nav-item ${activeTab === 'orders' ? 'active' : ''}`}
                                            onClick={() => setActiveTab('orders')}
                                        >
                                            <i className="fas fa-box"></i>
                                            Order History
                                        </button>
                                    </li>
                                    <li>
                                        <button 
                                            className={`nav-item ${activeTab === 'security' ? 'active' : ''}`}
                                            onClick={() => setActiveTab('security')}
                                        >
                                            <i className="fas fa-lock"></i>
                                            Security
                                        </button>
                                    </li>
                                </ul>
                            </div>

                            {/* Quick Actions */}
                            <div className="quick-actions">
                                <h4 className="actions-title">Quick Actions</h4>
                                <div className="action-buttons">
                                    <Link to="/dashboard" className="action-btn">
                                        <i className="fas fa-shopping-bag"></i>
                                        Continue Shopping
                                    </Link>
                                    <Link to="/cart" className="action-btn">
                                        <i className="fas fa-shopping-cart"></i>
                                        View Cart ({stats.cartItems})
                                    </Link>
                                    <Link to="/order" className="action-btn">
                                        <i className="fas fa-history"></i>
                                        Order History
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Profile Main Content */}
                        <div className="profile-main">
                            {/* Overview Tab */}
                            {activeTab === 'overview' && (
                                <div className="tab-content">
                                    <div className="content-header">
                                        <h2 className="content-title">Account Overview</h2>
                                        <p className="content-subtitle">
                                            Welcome back! Here's a summary of your account activity.
                                        </p>
                                    </div>

                                    <div className="overview-grid">
                                        <div className="overview-card">
                                            <div className="card-header">
                                                <h3>Recent Activity</h3>
                                                <i className="fas fa-clock"></i>
                                            </div>
                                            <div className="activity-list">
                                                <div className="activity-item">
                                                    <div className="activity-icon">
                                                        <i className="fas fa-shopping-cart"></i>
                                                    </div>
                                                    <div className="activity-details">
                                                        <p>Added items to cart</p>
                                                        <span>2 hours ago</span>
                                                    </div>
                                                </div>
                                                <div className="activity-item">
                                                    <div className="activity-icon">
                                                        <i className="fas fa-user-edit"></i>
                                                    </div>
                                                    <div className="activity-details">
                                                        <p>Profile updated</p>
                                                        <span>1 day ago</span>
                                                    </div>
                                                </div>
                                                <div className="activity-item">
                                                    <div className="activity-icon">
                                                        <i className="fas fa-box"></i>
                                                    </div>
                                                    <div className="activity-details">
                                                        <p>Order delivered</p>
                                                        <span>3 days ago</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="overview-card">
                                            <div className="card-header">
                                                <h3>Account Status</h3>
                                                <i className="fas fa-shield-check"></i>
                                            </div>
                                            <div className="status-list">
                                                <div className="status-item">
                                                    <span className="status-label">Email Verification</span>
                                                    <span className="status-value verified">
                                                        <i className="fas fa-check"></i> Verified
                                                    </span>
                                                </div>
                                                <div className="status-item">
                                                    <span className="status-label">Phone Verification</span>
                                                    <span className="status-value pending">
                                                        <i className="fas fa-clock"></i> Pending
                                                    </span>
                                                </div>
                                                <div className="status-item">
                                                    <span className="status-label">Two-Factor Auth</span>
                                                    <span className="status-value disabled">
                                                        <i className="fas fa-times"></i> Disabled
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Personal Info Tab */}
                            {activeTab === 'personal' && (
                                <div className="tab-content">
                                    <div className="content-header">
                                        <h2 className="content-title">Personal Information</h2>
                                        <button
                                            className="edit-btn"
                                            onClick={() => setIsEditing(!isEditing)}
                                        >
                                            <i className={`fas ${isEditing ? 'fa-times' : 'fa-edit'}`}></i>
                                            {isEditing ? 'Cancel' : 'Edit'}
                                        </button>
                                    </div>

                                    <div className="personal-info-form">
                                        <div className="form-grid">
                                            <div className="form-group">
                                                <label className="form-label">Full Name</label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={profileData.name}
                                                    onChange={handleInputChange}
                                                    disabled={!isEditing}
                                                    className="form-input"
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label className="form-label">Email Address</label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={profileData.email}
                                                    onChange={handleInputChange}
                                                    disabled={!isEditing}
                                                    className="form-input"
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label className="form-label">Phone Number</label>
                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    value={profileData.phone}
                                                    onChange={handleInputChange}
                                                    disabled={!isEditing}
                                                    className="form-input"
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label className="form-label">Address</label>
                                                <textarea
                                                    name="address"
                                                    value={profileData.address}
                                                    onChange={handleInputChange}
                                                    disabled={!isEditing}
                                                    className="form-textarea"
                                                    rows="3"
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label className="form-label">City</label>
                                                <input
                                                    type="text"
                                                    name="city"
                                                    value={profileData.city}
                                                    onChange={handleInputChange}
                                                    disabled={!isEditing}
                                                    className="form-input"
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label className="form-label">State</label>
                                                <input
                                                    type="text"
                                                    name="state"
                                                    value={profileData.state}
                                                    onChange={handleInputChange}
                                                    disabled={!isEditing}
                                                    className="form-input"
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label className="form-label">PIN Code</label>
                                                <input
                                                    type="text"
                                                    name="pincode"
                                                    value={profileData.pincode}
                                                    onChange={handleInputChange}
                                                    disabled={!isEditing}
                                                    className="form-input"
                                                />
                                            </div>
                                        </div>

                                        {isEditing && (
                                            <div className="form-actions">
                                                <button
                                                    className="btn-save"
                                                    onClick={handleSaveProfile}
                                                >
                                                    <i className="fas fa-save"></i>
                                                    Save Changes
                                                </button>
                                                <button
                                                    className="btn-cancel"
                                                    onClick={() => setIsEditing(false)}
                                                >
                                                    <i className="fas fa-times"></i>
                                                    Cancel
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Orders Tab */}
                            {activeTab === 'orders' && (
                                <div className="tab-content">
                                    <div className="content-header">
                                        <h2 className="content-title">Order History</h2>
                                        <Link to="/order" className="view-all-btn">
                                            View All Orders
                                            <i className="fas fa-arrow-right"></i>
                                        </Link>
                                    </div>

                                    <div className="orders-summary">
                                        <div className="summary-card">
                                            <h3>Recent Orders</h3>
                                            {stats.totalOrders > 0 ? (
                                                <div className="orders-list">
                                                    <div className="order-item">
                                                        <div className="order-info">
                                                            <span className="order-id">#ORD-001</span>
                                                            <span className="order-date">Dec 15, 2023</span>
                                                        </div>
                                                        <div className="order-status">
                                                            <span className="status delivered">Delivered</span>
                                                            <span className="order-amount">₹21,999</span>
                                                        </div>
                                                    </div>
                                                    <div className="order-item">
                                                        <div className="order-info">
                                                            <span className="order-id">#ORD-002</span>
                                                            <span className="order-date">Dec 10, 2023</span>
                                                        </div>
                                                        <div className="order-status">
                                                            <span className="status processing">Processing</span>
                                                            <span className="order-amount">₹45,999</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="no-orders">
                                                    <i className="fas fa-box-open"></i>
                                                    <p>No orders yet</p>
                                                    <Link to="/dashboard" className="shop-now-btn">
                                                        Start Shopping
                                                    </Link>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Security Tab */}
                            {activeTab === 'security' && (
                                <div className="tab-content">
                                    <div className="content-header">
                                        <h2 className="content-title">Security Settings</h2>
                                        <p className="content-subtitle">
                                            Manage your account security and privacy settings.
                                        </p>
                                    </div>

                                    <div className="security-settings">
                                        <div className="security-card">
                                            <div className="security-header">
                                                <h3>Password</h3>
                                                <button className="change-btn">
                                                    <i className="fas fa-key"></i>
                                                    Change Password
                                                </button>
                                            </div>
                                            <p>Last changed 30 days ago</p>
                                        </div>

                                        <div className="security-card">
                                            <div className="security-header">
                                                <h3>Two-Factor Authentication</h3>
                                                <button className="enable-btn">
                                                    <i className="fas fa-shield-alt"></i>
                                                    Enable 2FA
                                                </button>
                                            </div>
                                            <p>Add an extra layer of security to your account</p>
                                        </div>

                                        <div className="security-card">
                                            <div className="security-header">
                                                <h3>Login Sessions</h3>
                                                <button className="view-btn">
                                                    <i className="fas fa-eye"></i>
                                                    View Sessions
                                                </button>
                                            </div>
                                            <p>Manage your active login sessions</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

const mapStateToProps = (state) => ({
    user: state.auth.user,
    cart: state.cart,
    orders: state.orders || []
});

export default connect(mapStateToProps)(Profile);
