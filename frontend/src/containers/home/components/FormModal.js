import React, { useState, useEffect } from "react";
import { Form } from "antd";
import { Modal} from "antd";
import { useDispatch } from "react-redux";

import "./style.css";
import { createMemberRequest } from "../actions";
import AddMemberForm from "./AddMemberForm";
const FormModal = ({
  showModalVisible,
  handleCancel,
  setModalVisible,
  getData,
}) => {

  const dispatch=useDispatch()
  // const formic =useSelector(state=>state.formReducer.memberForm)

  const onFinish = async (values) => {

    dispatch(createMemberRequest(values))
    getData()
    
    setModalVisible(false);
    
    
    // dispatch(getMemberListRequest())
   

  
  };




 
  return (
    <div>
      <Modal
        title="Add Member"
        visible={showModalVisible}
        okButtonProps={{ className: "ok-button" }}
        onCancel={handleCancel}
      >
        <AddMemberForm onSubmit={onFinish}  />

        
      </Modal>
    </div>
  );
};

export default FormModal;
