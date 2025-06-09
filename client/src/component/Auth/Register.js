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

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
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
        // Check password match first for step 1
        if (currentStep === 1 && password !== password2) {
            setAlert('Passwords do not match', 'danger');
            return;
        }

        // Validate current step
        if (validateStep(currentStep)) {
            setCurrentStep(currentStep + 1);
        } else {
            // Provide specific error messages based on current step
            if (currentStep === 1) {
                if (!name) {
                    setAlert('Please enter your full name', 'danger');
                } else if (!phone) {
                    setAlert('Please enter your phone number', 'danger');
                } else if (!email) {
                    setAlert('Please enter your email address', 'danger');
                } else if (!password) {
                    setAlert('Please create a password', 'danger');
                } else if (!password2) {
                    setAlert('Please confirm your password', 'danger');
                } else {
                    setAlert('Please fill in all required fields', 'danger');
                }
            } else if (currentStep === 2) {
                if (!address) {
                    setAlert('Please enter your address', 'danger');
                } else if (!state) {
                    setAlert('Please select your state', 'danger');
                } else if (!city) {
                    setAlert('Please enter your city', 'danger');
                } else if (!pincode) {
                    setAlert('Please enter your pincode', 'danger');
                } else {
                    setAlert('Please fill in all required fields', 'danger');
                }
            }
        }
    };

    const prevStep = () => {
        setCurrentStep(currentStep - 1);
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        if (password !== password2) {
            setAlert('Passwords do not match', 'danger');
            return;
        }
        if (!validateStep(2)) {
            setAlert('Please fill in all required fields', 'danger');
            return;
        }

        setIsLoading(true);
        try {
            await register({ name, email, password, phone, address, state, city, pincode });
        } finally {
            setIsLoading(false);
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
                    className="form-control-modern"
                    id="inputAddress"
                    placeholder="Enter your complete address"
                    required
                />
            </div>

            <div className="form-row-modern">
                <div className="form-group-modern">
                    <label htmlFor="inputState">
                        State <span className="required-indicator">*</span>
                    </label>
                    <select
                        id="inputState"
                        className="select-modern"
                        name='state'
                        value={state}
                        onChange={onChange}
                        required
                    >
                        <option value="">Choose State...</option>
                        {states}
                    </select>
                </div>
                <div className="form-group-modern">
                    <label htmlFor="inputCity">
                        City <span className="required-indicator">*</span>
                    </label>
                    <input
                        type="text"
                        className="form-control-modern"
                        id="inputCity"
                        name='city'
                        value={city}
                        onChange={onChange}
                        placeholder="Enter your city"
                        required
                    />
                </div>
            </div>

            <div className="form-group-modern">
                <label htmlFor="inputZip">
                    Pincode <span className="required-indicator">*</span>
                </label>
                <input
                    type="text"
                    className="form-control-modern"
                    id="inputZip"
                    name='pincode'
                    value={pincode}
                    onChange={onChange}
                    placeholder="Enter your pincode"
                    required
                />
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
                        className="form-control-modern"
                        id="inputname"
                        placeholder="Enter your full name"
                        required
                    />
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
                        className="form-control-modern"
                        id="inputphone"
                        placeholder="Enter your phone number"
                        required
                    />
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
                    className="form-control-modern"
                    id="inputEmail"
                    placeholder="Enter your email address"
                    required
                />
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
                        className="form-control-modern"
                        id="inputPassword"
                        placeholder="Create a password"
                        required
                    />
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
                        className="form-control-modern"
                        id="inputPassword2"
                        placeholder="Confirm your password"
                        required
                    />
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
  