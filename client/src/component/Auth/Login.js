import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../action/auth';

const Login = ({ login, isAuthenticated, loading }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [loginAttempted, setLoginAttempted] = useState(false);

    const { email, password } = formData;

    // Validation functions
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validateForm = () => {
        const newErrors = {};

        if (!email.trim()) {
            newErrors.email = 'Email address is required';
        } else if (!validateEmail(email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        if (!password.trim()) {
            newErrors.password = 'Password is required';
        } else if (password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const onChange = e => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        // Clear specific field error when user starts typing
        if (errors[name]) {
            setErrors({ ...errors, [name]: '' });
        }

        // Clear login attempt flag when user modifies form
        if (loginAttempted) {
            setLoginAttempted(false);
        }
    }

    const onSubmit = async e => {
        e.preventDefault();
        setLoginAttempted(true);

        if (!validateForm()) {
            return;
        }

        setIsLoading(true);
        setErrors({}); // Clear any previous errors

        try {
            await login({ email, password });
        } catch (error) {
            // Handle login failure
            setErrors({
                general: 'Invalid email or password. Please check your credentials and try again.'
            });
        } finally {
            setIsLoading(false);
        }
    }

    if (isAuthenticated) {
        return <Redirect to='/dashboard' />
    }

    return (
        <Fragment>
            <div className="auth-container">
                <div className="auth-card">
                    <div className="auth-header">
                        <h1 className="auth-title">Welcome Back</h1>
                        <p className="auth-subtitle">Sign in to your account to continue</p>
                        {errors.general && (
                            <div className="auth-error-message">
                                <i className="fas fa-exclamation-triangle"></i>
                                {errors.general}
                            </div>
                        )}
                    </div>

                    <form className="modern-form" onSubmit={onSubmit} autoComplete="off">
                        <div className="form-group-modern">
                            <label htmlFor="inputEmail">Email Address</label>
                            <input
                                type="email"
                                name='email'
                                value={email}
                                onChange={onChange}
                                className={`form-control-modern ${errors.email ? 'error' : ''}`}
                                id="inputEmail"
                                placeholder="Enter your email address"
                                required
                            />
                            {errors.email && (
                                <div className="field-error-message">
                                    <i className="fas fa-exclamation-circle"></i>
                                    {errors.email}
                                </div>
                            )}
                        </div>

                        <div className="form-group-modern">
                            <label htmlFor="inputPassword">Password</label>
                            <input
                                type="password"
                                name='password'
                                value={password}
                                onChange={onChange}
                                className={`form-control-modern ${errors.password ? 'error' : ''}`}
                                id="inputPassword"
                                placeholder="Enter your password"
                                required
                            />
                            {errors.password && (
                                <div className="field-error-message">
                                    <i className="fas fa-exclamation-circle"></i>
                                    {errors.password}
                                </div>
                            )}
                        </div>

                        <button
                            type="submit"
                            className={`btn-modern ${isLoading ? 'btn-loading' : ''}`}
                            disabled={isLoading}
                        >
                            {isLoading ? '' : 'Sign In'}
                        </button>
                    </form>

                    <div className="auth-footer">
                        <p>
                            Don't have an account? {' '}
                            <Link to="/register" className="auth-link">Create one here</Link>
                        </p>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}


Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
    loading: PropTypes.bool
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    loading: state.auth.loading
});

export default connect(mapStateToProps, { login })(Login);
  