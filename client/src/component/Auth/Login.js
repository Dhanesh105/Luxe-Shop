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

    const { email, password } = formData;

    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const onSubmit = async e => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await login({ email, password });
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
                    </div>

                    <form className="modern-form" onSubmit={onSubmit} autoComplete="off">
                        <div className="form-group-modern">
                            <label htmlFor="inputEmail">Email Address</label>
                            <input
                                type="email"
                                name='email'
                                value={email}
                                onChange={onChange}
                                className="form-control-modern"
                                id="inputEmail"
                                placeholder="Enter your email address"
                                required
                            />
                        </div>

                        <div className="form-group-modern">
                            <label htmlFor="inputPassword">Password</label>
                            <input
                                type="password"
                                name='password'
                                value={password}
                                onChange={onChange}
                                className="form-control-modern"
                                id="inputPassword"
                                placeholder="Enter your password"
                                required
                            />
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
  