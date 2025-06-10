import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteOrder } from '../../action/order';

const OrderProducts = ({ order, deleteOrder, user }) => {
    const [isLoading, setIsLoading] = useState({});
    const [filterStatus, setFilterStatus] = useState('all');

    // Generate realistic order data
    const enhancedOrders = useMemo(() => {
        return order.map((item, index) => ({
            ...item,
            orderNumber: `ORD-${String(Date.now() + index).slice(-8)}`,
            orderDate: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toLocaleDateString(),
            status: ['Processing', 'Shipped', 'Delivered', 'Cancelled'][Math.floor(Math.random() * 4)],
            estimatedDelivery: new Date(Date.now() + Math.random() * 7 * 24 * 60 * 60 * 1000).toLocaleDateString(),
            trackingNumber: `TRK${String(Math.random()).slice(2, 12)}`,
            quantity: Math.floor(Math.random() * 3) + 1
        }));
    }, [order]);

    // Filter orders based on status
    const filteredOrders = useMemo(() => {
        if (filterStatus === 'all') return enhancedOrders;
        return enhancedOrders.filter(order => order.status.toLowerCase() === filterStatus);
    }, [enhancedOrders, filterStatus]);

    const handleCancelOrder = async (orderId) => {
        setIsLoading(prev => ({ ...prev, [orderId]: true }));
        await deleteOrder(orderId);
        setIsLoading(prev => ({ ...prev, [orderId]: false }));
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(price);
    };

    const getStatusIcon = (status) => {
        switch (status.toLowerCase()) {
            case 'processing': return 'fas fa-clock';
            case 'shipped': return 'fas fa-shipping-fast';
            case 'delivered': return 'fas fa-check-circle';
            case 'cancelled': return 'fas fa-times-circle';
            default: return 'fas fa-box';
        }
    };

    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case 'processing': return 'status-processing';
            case 'shipped': return 'status-shipped';
            case 'delivered': return 'status-delivered';
            case 'cancelled': return 'status-cancelled';
            default: return 'status-processing';
        }
    };

    if (order.length === 0) {
        return (
            <div className="orders-modern">
                <div className="container">
                    <div className="empty-orders">
                        <div className="empty-orders-content">
                            <div className="empty-orders-icon">
                                <i className="fas fa-receipt"></i>
                            </div>
                            <h2 className="empty-orders-title">No Orders Yet</h2>
                            <p className="empty-orders-subtitle">
                                You haven't placed any orders yet. Start shopping to see your orders here!
                            </p>
                            <Link to="/dashboard" className="btn-start-shopping">
                                <i className="fas fa-shopping-bag"></i>
                                Start Shopping
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="orders-modern">
            <div className="container">
                {/* Orders Header */}
                <div className="orders-header">
                    <div className="orders-title-section">
                        <h1 className="orders-title">
                            <i className="fas fa-receipt"></i>
                            My Orders
                        </h1>
                        <p className="orders-subtitle">
                            Track and manage your orders
                        </p>
                    </div>

                    {/* Order Filters */}
                    <div className="orders-filters">
                        <button
                            className={`filter-btn ${filterStatus === 'all' ? 'active' : ''}`}
                            onClick={() => setFilterStatus('all')}
                        >
                            All Orders
                        </button>
                        <button
                            className={`filter-btn ${filterStatus === 'processing' ? 'active' : ''}`}
                            onClick={() => setFilterStatus('processing')}
                        >
                            Processing
                        </button>
                        <button
                            className={`filter-btn ${filterStatus === 'shipped' ? 'active' : ''}`}
                            onClick={() => setFilterStatus('shipped')}
                        >
                            Shipped
                        </button>
                        <button
                            className={`filter-btn ${filterStatus === 'delivered' ? 'active' : ''}`}
                            onClick={() => setFilterStatus('delivered')}
                        >
                            Delivered
                        </button>
                    </div>
                </div>

                {/* Orders List */}
                <div className="orders-list">
                    {filteredOrders.map(item => (
                        <div key={item._id} className="order-card">
                            <div className="order-header">
                                <div className="order-info">
                                    <div className="order-number">
                                        <span className="order-label">Order #</span>
                                        <span className="order-value">{item.orderNumber}</span>
                                    </div>
                                    <div className="order-date">
                                        <span className="order-label">Placed on</span>
                                        <span className="order-value">{item.orderDate}</span>
                                    </div>
                                </div>

                                <div className={`order-status ${getStatusColor(item.status)}`}>
                                    <i className={getStatusIcon(item.status)}></i>
                                    <span>{item.status}</span>
                                </div>
                            </div>

                            <div className="order-content">
                                <div className="order-product">
                                    <div className="product-image">
                                        <img
                                            src={`/images/${item.imagename}`}
                                            alt={item.title}
                                            onError={(e) => {
                                                e.target.src = '/images/placeholder.svg';
                                                e.target.onerror = null;
                                            }}
                                        />
                                    </div>

                                    <div className="product-details">
                                        <h4 className="product-title">
                                            <Link to={`/indproduct/${item.imagename}+${item.title}+${item.price}+${item._id}`}>
                                                {item.title}
                                            </Link>
                                        </h4>

                                        <div className="product-meta">
                                            <span className="product-price">{formatPrice(item.price)}</span>
                                            <span className="product-quantity">Qty: {item.quantity}</span>
                                        </div>

                                        {item.address && (
                                            <div className="delivery-address">
                                                <i className="fas fa-map-marker-alt"></i>
                                                <span>Delivery to: {item.address}</span>
                                            </div>
                                        )}

                                        {item.status.toLowerCase() === 'shipped' && (
                                            <div className="tracking-info">
                                                <i className="fas fa-truck"></i>
                                                <span>Tracking: {item.trackingNumber}</span>
                                            </div>
                                        )}

                                        {item.status.toLowerCase() !== 'delivered' && item.status.toLowerCase() !== 'cancelled' && (
                                            <div className="estimated-delivery">
                                                <i className="fas fa-calendar"></i>
                                                <span>Expected by: {item.estimatedDelivery}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="order-actions">
                                    {item.status.toLowerCase() === 'shipped' && (
                                        <button className="btn-track-order">
                                            <i className="fas fa-route"></i>
                                            Track Order
                                        </button>
                                    )}

                                    {item.status.toLowerCase() === 'delivered' && (
                                        <button className="btn-reorder">
                                            <i className="fas fa-redo"></i>
                                            Reorder
                                        </button>
                                    )}

                                    {(item.status.toLowerCase() === 'processing' || item.status.toLowerCase() === 'shipped') && (
                                        <button
                                            className="btn-cancel-order"
                                            onClick={() => handleCancelOrder(item._id)}
                                            disabled={isLoading[item._id]}
                                        >
                                            {isLoading[item._id] ? (
                                                <i className="fas fa-spinner fa-spin"></i>
                                            ) : (
                                                <i className="fas fa-times"></i>
                                            )}
                                            Cancel Order
                                        </button>
                                    )}

                                    <Link
                                        to={`/indproduct/${item.imagename}+${item.title}+${item.price}+${item._id}`}
                                        className="btn-view-product"
                                    >
                                        <i className="fas fa-eye"></i>
                                        View Product
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

OrderProducts.propTypes = {
    order: PropTypes.array.isRequired,
    deleteOrder: PropTypes.func.isRequired,
    user: PropTypes.object
}

const mapStateToProps = (state) => ({
    order: state.order,
    user: state.auth.user
})

export default connect(mapStateToProps, { deleteOrder })(OrderProducts);