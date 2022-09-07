/*all function will go here*/
import axios from 'axios'
import setAuthToken from '../utils/setAuthToken'
import {USER_LOADED,LOGIN_FAIL,LOGIN_SUCCESS,LOGOUT,AUTH_ERROR,CLEAR_PROFILE, REGISTER_SUCCESS} from './types'


/*loaduser upon opening the page*/
export const loadUser = ()=>async dispatch=>{
    if(localStorage.token){
        setAuthToken(localStorage.token)
    }
    try {
        const res = await axios.get('https://diy-blog-backend.herokuapp.com/auth');
        dispatch({
            type:USER_LOADED,
            payload:res.data
        })
    } catch (error) {
        dispatch({
            type:AUTH_ERROR
        })
    }
}


/*login as admin*/

export const login = (email,password)=>async dispatch=>{
    const config = {
        headers:{
            'Content-Type':'application/json'
        }
    }
    const body = JSON.stringify({email,password});
    try {
        const res = await axios.post("https://diy-blog-backend.herokuapp.com/auth",body,config)
        console.log(res.data);
        dispatch({
            type:LOGIN_SUCCESS,
            payload:res.data
        })
        dispatch(loadUser());
    } catch (err) {
        const errors = err.response.data.errors;
        if(errors){
            console.log(errors);
        }
        dispatch({
            type:LOGIN_FAIL
        });
    }
}

/*logout as admin*/

export const logout = ()=> dispatch =>{
    dispatch({type:CLEAR_PROFILE})
    dispatch ({type:LOGOUT})
    
}
