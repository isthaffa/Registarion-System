import {GET_MEMBER_LIST_FAILED,GET_MEMBER_LIST_SUCCESS, GET_MEMBER_LIST_IN_PROGRESS, DELETE_MEMBER_SUCCESS, DELETE_MEMBER_FAILED} from "../constatns"
import {
    POST_CREATE_MEMBER_FAILED,
    POST_CREATE_MEMBER_SUCCESS,
  } from "../constatns";
const initialState={
    memberList:[],
    isLoading:false
   
};

const homeReducer=(state = initialState, action) => {
    switch (action.type) {
    case GET_MEMBER_LIST_IN_PROGRESS:
            return {...initialState, islogedin: true};    
    case GET_MEMBER_LIST_SUCCESS:
        return {...initialState, memberList:action.payload, islogedin: false};

    case GET_MEMBER_LIST_FAILED:
        return {...initialState, islogedin: false};
    
    case POST_CREATE_MEMBER_SUCCESS:
        return action.payload
    case POST_CREATE_MEMBER_FAILED:
            return state

    case DELETE_MEMBER_SUCCESS:
        return action.payload
    case DELETE_MEMBER_FAILED:
        return state
    
    default:
        return state
    }
}

export default homeReducer;