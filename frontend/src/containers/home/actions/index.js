import {
  GET_MEMBER_LIST_FAILED,
  GET_MEMBER_LIST_SUCCESS,
  GET_MEMBER_LIST_IN_PROGRESS,
  GET_MEMBER_LIST_REQUEST,
  EDIT_MEMBER_REQUEST,
  EDIT_MEMBER_SUCCESS,
  EDIT_MEMBER_FAILED,
} from "../constatns";
import {
  POST_CREATE_MEMBER_FAILED,
  POST_CREATE_MEMBER_IN_PROGRESS,
  POST_CREATE_MEMBER_SUCCESS,
  POST_CREATE_MEMBER_REQUEST,
} from "../constatns";
import {
  DELETE_MEMBER_IN_PROGRESS,
  DELETE_MEMBER_REQUEST,
  DELETE_MEMBER_SUCCESS,
  DELETE_MEMBER_FAILED,
} from "../constatns";

export const getMemberListRequest = () => {
  return {
    type: GET_MEMBER_LIST_REQUEST,
  };
};
export const getMemberListInProgress = () => {
  return {
    type: GET_MEMBER_LIST_IN_PROGRESS,
  };
};

export const getMemberListSuccess = (payload) => {
  return {
    type: GET_MEMBER_LIST_SUCCESS,
    payload,
  };
};
export const getMemberListFailed = () => {
  return {
    type: GET_MEMBER_LIST_FAILED,
  };
};

export const createMemberRequest = (payload) => {
    console.log(payload);
  return {
    type: POST_CREATE_MEMBER_REQUEST,
    payload
  };
};
export const createMemberInProgress = (payload) => {
  return {
    type: POST_CREATE_MEMBER_IN_PROGRESS,
    payload
  };
};
export const createMemberSuccess = (payload) => {
  return {
    type: POST_CREATE_MEMBER_SUCCESS,
    payload
  };
};
export const createMemberFailed = (payload) => {
  return {
    type: POST_CREATE_MEMBER_FAILED,
    payload
  };
};

export const editMemberRequest = (payload) => {
  return {
    type:EDIT_MEMBER_REQUEST, 
    payload
  }

};
export const editMemberInProgress = (payload) => {};
export const editMemberSuccess = (payload) => {
  return {
    type:EDIT_MEMBER_SUCCESS
  }

};
export const editMemberFailed = (payload) => {
  return {
    type:EDIT_MEMBER_FAILED
  }
};

export const deleteMemberRequest = (payload) => {
  return {type:DELETE_MEMBER_REQUEST,payload}
};
export const deleteMemberInProgress = () => {
  return {
    type:DELETE_MEMBER_IN_PROGRESS
  }
};
export const deleteMemberSuccess = () => {
  return {
    type:DELETE_MEMBER_SUCCESS
  }

};
export const deleteMemberFailed = () => {
  return {
    type:DELETE_MEMBER_FAILED
  }
};
