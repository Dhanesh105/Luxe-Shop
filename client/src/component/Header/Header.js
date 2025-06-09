import React, { Fragment } from 'react'
import { Link, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../action/auth';

const Navbar = ({ auth: { isAuthenticated }, cart, logout }) => {
    const location = useLocation();

    const isActive = (path) => location.pathname === path;
    const authLinks = (
        <Fragment>
            <Link to='/dashboard'>
                <button className={`nav-btn-modern ${isActive('/dashboard') ? 'active' : ''}`} type="button">
                    <i className="fas fa-store"></i> Products
                </button>
            </Link>
            <Link to='/cart'>
                <button className={`nav-btn-modern cart-btn ${isActive('/cart') ? 'active' : ''}`} type="button">
                    <i className="fas fa-shopping-cart"></i> Cart
                    {cart && cart.length > 0 && (
                        <span className="cart-badge">{cart.length}</span>
                    )}
                </button>
            </Link>
            <Link to='/order'>
                <button className={`nav-btn-modern ${isActive('/order') ? 'active' : ''}`} type="button">
                    <i className="fas fa-receipt"></i> Orders
                </button>
            </Link>
            <Link to='/profile'>
                <button className={`nav-btn-modern ${isActive('/profile') ? 'active' : ''}`} type="button">
                    <i className="fas fa-user-circle"></i> Profile
                </button>
            </Link>
            <button onClick={logout} className="nav-btn-modern" type="button">
                <i className="fas fa-sign-out-alt"></i> Logout
            </button>
        </Fragment>
    )

    const guestLinks = (
        <Fragment>
            <Link to='/login'>
                <button className="nav-btn-modern" type="button">
                    <i className="fas fa-sign-in-alt"></i> Login
                </button>
            </Link>
            <Link to='/register'>
                <button className="nav-btn-modern" type="button">
                    <i className="fas fa-user-plus"></i> Register
                </button>
            </Link>
        </Fragment>
    )
    return (
        <Fragment>
            <nav className="navbar navbar-expand-lg navbar-modern">
                <div className="container">
                    <Link className="navbar-brand navbar-brand-modern" to='/'>
                        <i className="fas fa-gem"></i> LuxeShop
                    </Link>

                    <button
                        className="navbar-toggler navbar-toggler-modern"
                        type="button"
                        data-toggle="collapse"
                        data-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarNav">
                        <div className="navbar-nav ml-auto">
                            {isAuthenticated ? authLinks : guestLinks}
                        </div>
                    </div>
                </div>
            </nav>
        </Fragment>
    )
}

Navbar.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    cart: PropTypes.array
  };
  
  const mapStateToProps = (state) => ({
    auth: state.auth,
    cart: state.cart || []
  });
  
  export default connect(mapStateToProps, { logout })(Navbar);
  