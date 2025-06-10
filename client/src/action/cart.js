import setAuthToken from '../utils/setAuthToken';
import axios from 'axios';
import setAlert from './alert';
import { API_ENDPOINTS } from '../config/api';


//add to cart
export const addToCart = formData => async dispatch =>{
    const {user,title,imagename,price} = formData;
    const config = {
        headers:{
            'Content-Type':'application/json'
        }
    }
    const body = JSON.stringify({user,title,imagename,price});
    try{
        const res = await axios.post(API_ENDPOINTS.CART,body,config);
        dispatch({
            type : "CART_ADDING_SUCCESS",
            payload:res.data
        });
        dispatch(setAlert('Item Added to Cart', 'success'));
    }
    catch(err){
        console.error('Add to cart error:', err);
        const errors = err.response && err.response.data && err.response.data.errors;
        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg,'danger')))
        } else {
            dispatch(setAlert('Failed to add item to cart. Please try again.', 'danger'));
        }
        dispatch({
            type:"CART_ADDING_FAIL"
        })
    }
    
}


//get cart
export const getCart = () => async dispatch =>{
    if(localStorage.token){
        setAuthToken(localStorage.token);
    }
    try{
        const res = await axios.get(API_ENDPOINTS.CART);
        dispatch({
            type : "CART_GETTING_SUCCESS",
            payload:res.data
        });
        console.log("getcart",res.data)
    }
    catch(err){
        console.error('Get cart error:', err);
        const errors = err.response && err.response.data && err.response.data.errors;
        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg,'danger')))
        } else {
            dispatch(setAlert('Failed to load cart. Please refresh the page.', 'danger'));
        }
        dispatch({
            type:"CART_GETTING_FAIL"
        })
    }
    
}



// remove from cart
export const deleteCart = id => async dispatch =>{
    if(localStorage.token){
        setAuthToken(localStorage.token);
    }
    try{
        await axios.delete(API_ENDPOINTS.CART_ITEM(id));
        dispatch({
            type:"CART_REMOVE_SUCCESS",
            payload:id
        })
        dispatch(setAlert('Item Removed', 'success'));
    }
    catch(err){
        dispatch({
            type: "CART_REMOVE_FAIL",
          });
    }
}
