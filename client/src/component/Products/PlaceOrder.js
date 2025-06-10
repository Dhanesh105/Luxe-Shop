import React,{ Fragment,useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import {addToOrder} from '../../action/order';

const PlaceOrder = ({ match, user, addToOrder, auth, loading }) => {
    // Show loading state
    if (loading) {
        return (
            <div className="place-order-container">
                <div className="place-order-card">
                    <div className="text-center">
                        <i className="fas fa-spinner fa-spin fa-3x text-muted mb-3"></i>
                        <p>Loading order details...</p>
                    </div>
                </div>
            </div>
        );
    }

    // Check if user is authenticated
    if (!auth.isAuthenticated || !auth.user) {
        return <Redirect to='/login' />;
    }

    // Safely parse URL parameters
    let data;
    try {
        data = match.params.data ? match.params.data.split('+') : [];
    } catch (error) {
        console.error('Error parsing URL parameters:', error);
        return <Redirect to='/dashboard' />;
    }

    // Validate that we have the required data
    if (!data || data.length < 3) {
        console.error('Invalid product data in URL');
        return <Redirect to='/dashboard' />;
    }

    let paramstitle = data[0] ? decodeURIComponent(data[0]) : '';
    let paramsimagename = data[1] ? decodeURIComponent(data[1]) : '';
    let paramsprice = data[2] ? decodeURIComponent(data[2]) : '';
    let paramsaddress = data[3] ? decodeURIComponent(data[3]) : (auth.user.address || '');
    const [flag,setFlag] = useState(0);
    const [formData,setFormData] = useState({
        title:paramstitle,
        imagename:paramsimagename,
        price : paramsprice,
        address : paramsaddress
    });
    let {title,imagename,price,address} = formData;
    const onChange = e =>{
        setFormData({...formData,[e.target.name]:e.target.value});
    }
    const [toggle,setToggle] = useState(false);
    const [alter,setAlter] = useState('');
    const alterChange = e =>{
        setAlter(e.target.value);
    }
  
    const onSubmit = async (e) => {
        e.preventDefault();

        // Validate required fields
        if (!user) {
            window.alert("User not authenticated. Please login again.");
            return;
        }

        if (!title || !imagename || !price) {
            window.alert("Product information is missing. Please try again.");
            return;
        }

        let finalAddress = address;
        if (toggle) {
            if (!alter.trim()) {
                window.alert("Please enter a delivery address.");
                return;
            }
            finalAddress = alter.trim();
        }

        if (!finalAddress) {
            window.alert("Please provide a delivery address.");
            return;
        }

        try {
            await addToOrder({
                user,
                title,
                imagename,
                price,
                address: finalAddress
            });

            window.alert("Your Order Placed Successfully!");
            setFlag(1);
            setAlter('');
        } catch (error) {
            console.error('Error placing order:', error);
            window.alert("Failed to place order. Please try again.");
        }
    }
    console.log("flag",flag);
    if(flag === 1){
        return <Redirect to='/order' />
    }
   
    return (
        <Fragment>
            <div className="place-order-container">
                <div className="place-order-card">
                    <div className="place-order-header">
                        <div className="header-icon">
                            <i className="fas fa-shipping-fast"></i>
                        </div>
                        <h2 className="header-title">Place Your Order</h2>
                        <p className="header-subtitle">Review and confirm your delivery details</p>
                    </div>

                    <div className="order-summary">
                        <div className="product-preview">
                            <div className="product-image">
                                <img
                                    src={`/images/${imagename}`}
                                    alt={title}
                                    onError={(e) => {
                                        e.target.src = '/images/placeholder.jpg';
                                    }}
                                />
                            </div>
                            <div className="product-details">
                                <h3 className="product-title">{title || 'Product'}</h3>
                                <div className="product-price">₹{price || '0'}</div>
                            </div>
                        </div>
                    </div>

                    <form onSubmit={onSubmit} className="place-order-form">
                        <div className="delivery-section">
                            <h3 className="section-title">
                                <i className="fas fa-map-marker-alt"></i>
                                Delivery Address
                            </h3>

                            {!toggle && (
                                <div className="address-option">
                                    <div className="custom-checkbox">
                                        <input
                                            type="checkbox"
                                            name='address'
                                            value={address}
                                            onChange={onChange}
                                            className="checkbox-input"
                                            id="defaultAddress"
                                            defaultChecked
                                        />
                                        <label className="checkbox-label" htmlFor="defaultAddress">
                                            <span className="checkbox-custom"></span>
                                            <div className="address-content">
                                                <div className="address-text">{address || 'No address provided'}</div>
                                                <small className="address-note">Registered address as delivery address</small>
                                            </div>
                                        </label>
                                    </div>
                                </div>
                            )}

                            <div className="address-change-note">
                                <i className="fas fa-info-circle"></i>
                                <span>Need to change delivery address? </span>
                                <button
                                    type="button"
                                    className="change-address-btn"
                                    onClick={() => setToggle(!toggle)}
                                >
                                    {toggle ? 'Use registered address' : 'Change address'}
                                </button>
                            </div>

                            {toggle && (
                                <div className="new-address-section">
                                    <div className="input-group">
                                        <label htmlFor="newAddress" className="input-label">
                                            <i className="fas fa-home"></i>
                                            New Delivery Address
                                        </label>
                                        <input
                                            type="text"
                                            name='alter'
                                            value={alter}
                                            onChange={alterChange}
                                            className="address-input"
                                            id="newAddress"
                                            placeholder="Enter complete delivery address with pincode"
                                            required
                                        />
                                        <small className="input-help">
                                            Please provide a complete and valid delivery address
                                        </small>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="order-actions">
                            <Link to="/cart" className="btn-secondary">
                                <i className="fas fa-arrow-left"></i>
                                Back to Cart
                            </Link>
                            <button type="submit" className="btn-primary">
                                <i className="fas fa-check-circle"></i>
                                Confirm Order
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Fragment>
    )
}


  
  const mapStateToProps = state => ({
    user: state.auth.user ? state.auth.user._id : null,
    auth: state.auth,
    loading: state.auth.loading,
  });
  
  export default connect(mapStateToProps, { addToOrder })(PlaceOrder);
  