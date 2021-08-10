import {LOGIN_USER_REQUEST,LOGIN_USER_FAILED,LOGIN_USER_SUCCESS,LOGIN_USER_IN_PROGRESS,USER_LOGGED_OUT} from '../constants'
import {USER_SIGN_UP} from '../constants'

export  const userLoginRequest =(payload)=>{
    return {
        type:LOGIN_USER_REQUEST,
        payload
    }
}

export const userLoginSuccess =(payload)=>{
    return {
        type:LOGIN_USER_SUCCESS,
        payload
    }
} 
export const userLoginInProgress =(payload)=>{
    return {
        type:LOGIN_USER_IN_PROGRESS,
        payload
    }
}
export const userLoginFailed =(payload)=>{
    return {
        type:LOGIN_USER_FAILED,
        payload
    }




} 
export const userLoggedout=()=>{
    return {
        type:USER_LOGGED_OUT,
        
        
    }

}

export const userSignup=(payload)=>{
    return{
        type:USER_SIGN_UP,
        payload

    }
}
