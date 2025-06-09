import React, { Fragment } from 'react'

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <Fragment>
            <footer className="footer-modern">
                <div className="footer-content">
                    <div className="footer-brand">
                        <i className="fas fa-gem"></i> LuxeShop
                    </div>
                    <p className="footer-text">
                        &copy; {currentYear} LuxeShop. Crafted with elegance and precision. All rights reserved.
                    </p>
                    <div style={{ marginTop: '1rem' }}>
                        <i className="fab fa-facebook" style={{ margin: '0 10px', fontSize: '1.2rem', opacity: 0.7 }}></i>
                        <i className="fab fa-twitter" style={{ margin: '0 10px', fontSize: '1.2rem', opacity: 0.7 }}></i>
                        <i className="fab fa-instagram" style={{ margin: '0 10px', fontSize: '1.2rem', opacity: 0.7 }}></i>
                        <i className="fab fa-linkedin" style={{ margin: '0 10px', fontSize: '1.2rem', opacity: 0.7 }}></i>
                    </div>
                </div>
            </footer>
        </Fragment>
    )
}

export default Footer;