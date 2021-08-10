import {takeEvery, put, call, takeLatest} from 'redux-saga/effects';
import {
    LOGIN_USER_REQUEST, USER_LOGGED_OUT, USER_SIGN_UP
} from '../constants';
import {
    userLoginSuccess,
    userLoginFailed,
    userLoginInProgress,
    userLoggedout
} from '../actions';
import apiHandler from '../../../middleware/apiHandler';
import { message, Button } from 'antd'


function* userLoginHandler({payload:{values,authHandler}}) {
  try {
      console.log("payload",values)
    const result = yield call(apiHandler.userLogin,values);
    
    yield put(userLoginInProgress());
    if (result.data.status === 'ok') {

      yield put(userLoginSuccess(result.data.data));
     authHandler()
    }else{
      message.error("Invalid user name or password", 3);
      yield put(userLoginFailed("Invalid username or passoword"));
    }
  } catch (error) {
    console.log(error);
    message.error("invalid username or password", 3);


    yield put(userLoginFailed(error));
  }
}
// function* userLogout(){
//   yield put (userLoggedout)

  
// }

function* userSignUpHandler({payload:{values,redirectHandler}}){
  try {
    console.log(values)
    const result = yield call(apiHandler.signup,values);
    console.log("reg",result);

    if (result.data.status === 'ok') {

      message.success("successfully registered ", 3);

     redirectHandler()
    }else{
      if(result.data.error==="user already exist"){
        message.error("Email already in use .", 3);
      }
      message.error("validation error .", 3);
      
      // yield put();
    }
  } catch (error) {
    message.error("Email already in use .", 3);

  }

} 

export default function* userSagas() {
  yield* [
    takeEvery(LOGIN_USER_REQUEST, userLoginHandler),
    takeLatest(USER_SIGN_UP,userSignUpHandler)
  ];
}