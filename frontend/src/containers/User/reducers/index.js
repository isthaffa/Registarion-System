// import loginReducer from './loginReducer'
import setAuthorization from '../../../utils/setAuthorization';
import {LOGIN_USER_SUCCESS,LOGIN_USER_FAILED,LOGIN_USER_IN_PROGRESS,LOGIN_USER_REQUEST, USER_LOGGED_OUT, USER_SIGN_UP} from '../constants'




const initialState={
    islogedin:false,
    data:null,
    error:null
};

const userReducer=(state = initialState, action) => {
    switch (action.type) {
    case LOGIN_USER_REQUEST:
        return {...initialState, islogedin: false};
    case LOGIN_USER_IN_PROGRESS:
        return {...initialState, islogedin: false};
    case LOGIN_USER_SUCCESS:
        localStorage.token=action.payload
        setAuthorization(action.payload)
        return {...initialState, islogedin: true,data:action.payload,error:null};

    case LOGIN_USER_FAILED:
        return {...initialState, islogedin: false,error:action.payload,data:null};

    case USER_LOGGED_OUT:
        localStorage.removeItem('token')
        setAuthorization()
        return {}
    case USER_SIGN_UP:
        return {state}
    default:
        return state
    }
}

export default userReducer