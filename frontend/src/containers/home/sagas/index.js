import {takeEvery, put, call, takeLatest} from 'redux-saga/effects';

import {getMemberListSuccess,getMemberListFailed,getMemberListInProgress,createMemberSuccess,createMemberFailed, getMemberListRequest, deleteMemberFailed, deleteMemberSuccess} from "../actions"
import apiHandler from '../../../middleware/apiHandler';
import { message} from 'antd'
import { DELETE_MEMBER_REQUEST, EDIT_MEMBER_REQUEST, GET_MEMBER_LIST_REQUEST,POST_CREATE_MEMBER_REQUEST } from '../constatns';






function* getMemberList(){
  try {
    yield put(getMemberListInProgress());
    const result = yield call(apiHandler.getMemberList);
    console.log("reg",result);

    if (result.data.status === 'ok') {

        yield put(getMemberListSuccess(result.data.data));

    }else{
      if(result.data.status==="error"){
        message.error(" error ", 3);
        yield put(getMemberListFailed());
        
      }
     
      
      // yield put();
    }
  } catch (error) {
    yield put(getMemberListFailed());
    

  }

} 

function* createMember(payload){
        
    try {
        console.log("d",payload.payload);
        const result = yield call(apiHandler.createMember,payload.payload);
        if (result.data.status === 'ok') {
            // message.success("success")
            yield put (getMemberListRequest())
            yield put(createMemberSuccess(result.data.data));
            
        }else{
         
          if (result.data.status === "error") {
            if (result.data.error === "email already exist") {
              message.error("member already exist", 2);
              yield put(createMemberFailed())
            } else {
              message.error("failed", 2);
            }
          }
          
          
          // yield put();
        }
    } catch (error) {
        yield put(createMemberFailed())
    }
}

function* editMember(action){
  console.log(action);
    try {
      const result=yield call(apiHandler.editMember,action.payload.id,action.payload.values)
      console.log(result);
      if (result.data.status === "ok") {
        message.success("successfully updated", 2);
         action.payload.history.push("/");
      }
      if (result.data.status === "error") {
        if (result.data.error === "email already exist") {
          message.error("member already exist", 2);
        } else {
          message.error("failed", 2);
        }
      }
    } catch (error) {
      console.log(error);
      // message.error("failed", 2);

    }
}
function* deleteMember(payload){
  console.log(payload);
    try {
      const result=yield call(apiHandler.deleteMember,payload.payload)
      console.log(result);
      if (result.data.status === "ok") {
        yield put (getMemberListRequest())

        message.success("successfully deleted", 1);

        yield put (deleteMemberSuccess())
        
      } else {
        

        message.error("failed", 1);
        yield put (deleteMemberFailed())
      }
    } catch (error) {
      console.log(error);
      // message.error("failed", 2);
      yield put (deleteMemberFailed())

    }
}

export default function* homeSagas() {
  yield* [
    takeEvery(GET_MEMBER_LIST_REQUEST, getMemberList),
    takeLatest(POST_CREATE_MEMBER_REQUEST,createMember),
    takeLatest(DELETE_MEMBER_REQUEST,deleteMember),
    takeLatest(EDIT_MEMBER_REQUEST,editMember)


  ];
}