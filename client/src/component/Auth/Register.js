import React, { Fragment, useState } from 'react'
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import setAlert from '../../action/alert';
import { register } from '../../action/auth';
import PropTypes from 'prop-types';

const Register = ({ setAlert, register, isAuthenticated, loading }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: '',
        phone: '',
        address: '',
        state: '',
        city: '',
        pincode: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);
    const [errors, setErrors] = useState({});
    const [registrationAttempted, setRegistrationAttempted] = useState(false);

    const { name, email, password, password2, phone, address, state, city, pincode } = formData;

    const statesArr = [
        "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
        "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
        "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
        "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
        "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
    ];

    const states = statesArr.map((state, index) => (
        <option key={index} value={state}>{state}</option>
    ));

    // Validation functions
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePhone = (phone) => {
        const phoneRegex = /^[0-9]{10}$/;
        return phoneRegex.test(phone.replace(/\D/g, ''));
    };

    const validatePincode = (pincode) => {
        const pincodeRegex = /^[0-9]{6}$/;
        return pincodeRegex.test(pincode);
    };

    const validateStep1Fields = () => {
        const newErrors = {};

        if (!name.trim()) {
            newErrors.name = 'Full name is required';
        } else if (name.trim().length < 2) {
            newErrors.name = 'Name must be at least 2 characters';
        }

        if (!phone.trim()) {
            newErrors.phone = 'Phone number is required';
        } else if (!validatePhone(phone)) {
            newErrors.phone = 'Please enter a valid 10-digit phone number';
        }

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

        if (!password2.trim()) {
            newErrors.password2 = 'Please confirm your password';
        } else if (password !== password2) {
            newErrors.password2 = 'Passwords do not match';
        }

        return newErrors;
    };

    const validateStep2Fields = () => {
        const newErrors = {};

        if (!address.trim()) {
            newErrors.address = 'Address is required';
        } else if (address.trim().length < 10) {
            newErrors.address = 'Please enter a complete address';
        }

        if (!state.trim()) {
            newErrors.state = 'State is required';
        }

        if (!city.trim()) {
            newErrors.city = 'City is required';
        }

        if (!pincode.trim()) {
            newErrors.pincode = 'Pincode is required';
        } else if (!validatePincode(pincode)) {
            newErrors.pincode = 'Please enter a valid 6-digit pincode';
        }

        return newErrors;
    };

    const onChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        // Clear specific field error when user starts typing
        if (errors[name]) {
            setErrors({ ...errors, [name]: '' });
        }

        // Clear registration attempt flag when user modifies form
        if (registrationAttempted) {
            setRegistrationAttempted(false);
        }
    };

    const validateStep = (step) => {
        switch (step) {
            case 1:
                return name && phone && email && password && password2;
            case 2:
                return address && state && city && pincode;
            default:
                return false;
        }
    };

    const nextStep = () => {
        const stepErrors = validateStep1Fields();

        if (Object.keys(stepErrors).length === 0) {
            setCurrentStep(currentStep + 1);
            setErrors({}); // Clear errors when moving to next step
        } else {
            setErrors(stepErrors);
        }
    };

    const prevStep = () => {
        setCurrentStep(currentStep - 1);
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setRegistrationAttempted(true);

        const stepErrors = validateStep2Fields();

        if (Object.keys(stepErrors).length === 0) {
            setIsLoading(true);
            setErrors({}); // Clear any previous errors

            try {
                await register({ name, email, password, phone, address, state, city, pincode });
            } catch (error) {
                // Handle registration failure
                setErrors({
                    general: 'Registration failed. Please check your information and try again.'
                });
            } finally {
                setIsLoading(false);
            }
        } else {
            setErrors(stepErrors);
        }
    };

    if (isAuthenticated) {
        return <Redirect to="/dashboard" />;
    }
    const renderStep2 = () => (
        <Fragment>
            <div className="form-group-modern">
                <label htmlFor="inputAddress">
                    Full Address <span className="required-indicator">*</span>
                </label>
                <input
                    type="text"
                    name='address'
                    value={address}
                    onChange={onChange}
                    className={`form-control-modern ${errors.address ? 'error' : ''}`}
                    id="inputAddress"
                    placeholder="Enter your complete address"
                    required
                />
                {errors.address && (
                    <div className="field-error-message">
                        <i className="fas fa-exclamation-circle"></i>
                        {errors.address}
                    </div>
                )}
            </div>

            <div className="form-row-modern">
                <div className="form-group-modern">
                    <label htmlFor="inputState">
                        State <span className="required-indicator">*</span>
                    </label>
                    <select
                        id="inputState"
                        className={`select-modern ${errors.state ? 'error' : ''}`}
                        name='state'
                        value={state}
                        onChange={onChange}
                        required
                    >
                        <option value="">Choose State...</option>
                        {states}
                    </select>
                    {errors.state && (
                        <div className="field-error-message">
                            <i className="fas fa-exclamation-circle"></i>
                            {errors.state}
                        </div>
                    )}
                </div>
                <div className="form-group-modern">
                    <label htmlFor="inputCity">
                        City <span className="required-indicator">*</span>
                    </label>
                    <input
                        type="text"
                        className={`form-control-modern ${errors.city ? 'error' : ''}`}
                        id="inputCity"
                        name='city'
                        value={city}
                        onChange={onChange}
                        placeholder="Enter your city"
                        required
                    />
                    {errors.city && (
                        <div className="field-error-message">
                            <i className="fas fa-exclamation-circle"></i>
                            {errors.city}
                        </div>
                    )}
                </div>
            </div>

            <div className="form-group-modern">
                <label htmlFor="inputZip">
                    Pincode <span className="required-indicator">*</span>
                </label>
                <input
                    type="text"
                    className={`form-control-modern ${errors.pincode ? 'error' : ''}`}
                    id="inputZip"
                    name='pincode'
                    value={pincode}
                    onChange={onChange}
                    placeholder="Enter your pincode"
                    required
                />
                {errors.pincode && (
                    <div className="field-error-message">
                        <i className="fas fa-exclamation-circle"></i>
                        {errors.pincode}
                    </div>
                )}
            </div>

            <div className="form-row-modern button-row">
                <button
                    type="button"
                    onClick={prevStep}
                    className="btn-modern"
                    style={{ background: 'var(--secondary-gradient)' }}
                >
                    Back
                </button>
                <button
                    type="submit"
                    className={`btn-modern ${isLoading ? 'btn-loading' : ''}`}
                    disabled={isLoading}
                >
                    {isLoading ? '' : 'Create Account'}
                </button>
            </div>
        </Fragment>
    );

    const renderStep1 = () => (
        <Fragment>
            <div className="form-row-modern">
                <div className="form-group-modern">
                    <label htmlFor="inputname">
                        Full Name <span className="required-indicator">*</span>
                    </label>
                    <input
                        type="text"
                        name='name'
                        value={name}
                        onChange={onChange}
                        className={`form-control-modern ${errors.name ? 'error' : ''}`}
                        id="inputname"
                        placeholder="Enter your full name"
                        required
                    />
                    {errors.name && (
                        <div className="field-error-message">
                            <i className="fas fa-exclamation-circle"></i>
                            {errors.name}
                        </div>
                    )}
                </div>
                <div className="form-group-modern">
                    <label htmlFor="inputphone">
                        Phone Number <span className="required-indicator">*</span>
                    </label>
                    <input
                        type="tel"
                        name='phone'
                        value={phone}
                        onChange={onChange}
                        className={`form-control-modern ${errors.phone ? 'error' : ''}`}
                        id="inputphone"
                        placeholder="Enter your phone number"
                        required
                    />
                    {errors.phone && (
                        <div className="field-error-message">
                            <i className="fas fa-exclamation-circle"></i>
                            {errors.phone}
                        </div>
                    )}
                </div>
            </div>

            <div className="form-group-modern">
                <label htmlFor="inputEmail">
                    Email Address <span className="required-indicator">*</span>
                </label>
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

            <div className="form-row-modern">
                <div className="form-group-modern">
                    <label htmlFor="inputPassword">
                        Password <span className="required-indicator">*</span>
                    </label>
                    <input
                        type="password"
                        name='password'
                        value={password}
                        onChange={onChange}
                        className={`form-control-modern ${errors.password ? 'error' : ''}`}
                        id="inputPassword"
                        placeholder="Create a password"
                        required
                    />
                    {errors.password && (
                        <div className="field-error-message">
                            <i className="fas fa-exclamation-circle"></i>
                            {errors.password}
                        </div>
                    )}
                </div>
                <div className="form-group-modern">
                    <label htmlFor="inputPassword2">
                        Confirm Password <span className="required-indicator">*</span>
                    </label>
                    <input
                        type="password"
                        name='password2'
                        value={password2}
                        onChange={onChange}
                        className={`form-control-modern ${errors.password2 ? 'error' : ''}`}
                        id="inputPassword2"
                        placeholder="Confirm your password"
                        required
                    />
                    {errors.password2 && (
                        <div className="field-error-message">
                            <i className="fas fa-exclamation-circle"></i>
                            {errors.password2}
                        </div>
                    )}
                </div>
            </div>

            <button
                type="button"
                onClick={nextStep}
                className="btn-modern"
            >
                <i className="fas fa-arrow-right"></i> Continue to Address
            </button>
        </Fragment>
    );

    return (
        <Fragment>
            <div className="auth-container">
                <div className="auth-card">
                    <div className="auth-header">
                        <h1 className="auth-title">Create Account</h1>
                        <p className="auth-subtitle">
                            Step {currentStep} of 2 - {currentStep === 1 ? 'Personal Information' : 'Address Details'}
                        </p>
                        {errors.general && (
                            <div className="auth-error-message">
                                <i className="fas fa-exclamation-triangle"></i>
                                {errors.general}
                            </div>
                        )}

                        <div className="progress-indicator">
                            <div className={`progress-step ${currentStep >= 1 ? 'active' : ''}`}>
                                1
                            </div>
                            <div className={`progress-step ${currentStep >= 2 ? 'active' : ''}`}>
                                2
                            </div>
                        </div>
                    </div>

                    <form className="modern-form" onSubmit={onSubmit} autoComplete="off">
                        {currentStep === 1 && renderStep1()}
                        {currentStep === 2 && renderStep2()}
                    </form>

                    <div className="auth-footer">
                        <p>
                            Already have an account? {' '}
                            <Link to="/login" className="auth-link">Sign in here</Link>
                        </p>
                    </div>
                </div>
            </div>
            
        </Fragment>
    )
}


Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
    loading: PropTypes.bool
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    loading: state.auth.loading
});

export default connect(mapStateToProps, { setAlert, register })(Register);
  