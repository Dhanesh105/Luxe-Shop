import React,{ Fragment,useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import {addToOrder} from '../../action/order';

const PlaceOrder = ({ match,user,addToOrder }) => {
    let data = match.params.data.split('+')
    let paramstitle = data && data[0];
    let paramsimagename = data && data[1];
    let paramsprice = data && data[2];
    let paramsaddress = data && data[3];
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
  
    const onSubmit = e =>{
        setFlag(1)
        window.alert("Your Order Placed Successfully")
        e.preventDefault();
        if(toggle){
            address = alter;
            addToOrder({user,title,imagename,price,address});
           setAlter('');
        }
        else{
            addToOrder({user,title,imagename,price,address});
            setAlter('');
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
                                <img src={`/images/${imagename}`} alt={title} />
                            </div>
                            <div className="product-details">
                                <h3 className="product-title">{title}</h3>
                                <div className="product-price">₹{price}</div>
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
                                                <div className="address-text">{address}</div>
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
    user : state.auth.user._id,
  });
  
  export default connect(mapStateToProps, { addToOrder })(PlaceOrder);
  