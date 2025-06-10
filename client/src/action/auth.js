import setAuthToken from '../utils/setAuthToken';
import axios from 'axios';
import setAlert from './alert';
import {getCart} from './cart';
import {getOrder} from './order';
import { API_ENDPOINTS } from '../config/api';

// user loading
export const loadUser = () =>async dispatch =>{
    if(localStorage.token){
        setAuthToken(localStorage.token);
    }
    try{
        const res = await axios.get(API_ENDPOINTS.USER_PROFILE);
        dispatch({
            type:"USER_LOADED",
            payload:res.data
        });
    }
    catch(err){
        dispatch({
            type:"AUTH_ERROR"
        })
    }
};

//user register
export const register = formData => async dispatch =>{
    const {name,email,password,address,pincode,state,city,phone} = formData;
    const config = {
        headers:{
            'Content-Type':'application/json'
        }
    }
    const body = JSON.stringify({name,email,password,address,pincode,state,city,phone});
    try{
        const res = await axios.post(API_ENDPOINTS.REGISTER,body,config);
        dispatch({
            type : "REGISTER_SUCCESS",
            payload:res.data
        });
        dispatch(loadUser());
        dispatch(getCart());
        dispatch(getOrder());
    }
    catch(err){
        console.error('Register error:', err);
        const errors = err.response && err.response.data && err.response.data.errors;
        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg,'danger')))
        } else {
            dispatch(setAlert('Registration failed. Please try again.', 'danger'));
        }
        dispatch({
            type:"REGISTER_FAIL"
        })
    }
    

}

//user login

export const login = formData => async dispatch =>{
    const {email,password} = formData;
    const config = {
        headers:{
            'Content-Type':'application/json'
        }
    }
    const body = JSON.stringify({email,password});
    try{
        const res = await axios.post(API_ENDPOINTS.LOGIN,body,config);
        dispatch({
            type : "LOGIN_SUCCESS",
            payload:res.data
        });
        dispatch(loadUser());
        dispatch(getCart());
        dispatch(getOrder());
    }
    catch(err){
        console.error('Login error:', err);
        const errors = err.response && err.response.data && err.response.data.errors;
        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg,'danger')))
        } else {
            dispatch(setAlert('Login failed. Please check your credentials.', 'danger'));
        }
        dispatch({
            type:"LOGIN_FAIL"
        })

    }
    
}

//user logout
export const logout = () => dispatch =>{
    dispatch({
        type:"LOGOUT"
    }) ;
    dispatch({
        type:"CART_ADDING_FAIL"
    })
    dispatch({
        type:"ORDER_ADDING_FAIL"
    })
}