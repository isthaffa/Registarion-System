import React, { useState, useEffect } from "react";
import { Form, Input, Layout, message } from "antd";
import { Modal, Button } from "antd";
import axios from "axios";
import { useLocation } from "react-router";
import NavBar from "../../../components/navBar";
import "./style.css";
import { useDispatch } from "react-redux";
import { editMemberRequest } from "../actions";

const EditForm = ({ getData, history }) => {
  const location = useLocation();
  const { member } = location.state;
  const [memberData, setMemberData] = useState(member);
  const [form] = Form.useForm();
  const dispatch =useDispatch()

  useEffect(() => {
    console.log(memberData);
  }, []);

  const onFinish = async (values) => {
    console.log(memberData);
    const id = memberData?._id;
    dispatch(editMemberRequest({id,values,history}))
    
  };

  const formItemLayout = {
    labelCol: {
      xs: {
        span: 18,
      },
      sm: {
        span: 3,
      },
    },
    wrapperCol: {
      xs: {
        span: 20,
      },
      sm: {
        span: 20,
      },
    },
  };
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 8,
        offset: 12,
      },
    },
  };
  return (
    <div>
      <NavBar title="Edit Members" />
      <div className="edit-form">
      <Form
        {...formItemLayout}
        form={form}
        name="member"
        onFinish={onFinish}
        scrollToFirstError
      >
        <Form.Item
        initialValue={memberData?.firstName}
          name="firstName"
          label="Firstname"
          rules={[
            {
              required: true,
              message: "Please input your first name",
            },
          ]}
        >
          <Input
            className="form-input1"
            placeholder="Please enter your first name"
          />
        </Form.Item>
        <Form.Item
        initialValue={memberData?.lastName}
          name="lastName"
          label="Lastname"
          rules={[
            {
              required: true,
              message: "Please input your last name",
            },
          ]}
        >
          <Input
            className="form-input"
            placeholder="Please enter your last name"
          />
        </Form.Item>

        <Form.Item
        initialValue={memberData?.email}
          name="email"
          label="Email"
          hasFeedback
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
            {
              required: true,
              message: "enter the email",
            },
          ]}
        >
          <Input
            className="form-input"
            placeholder="Please enter your email address"
          />
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            save
          </Button><span className="cancel "><Button onClick={()=>{history.push("/")}}
          >
            cancel
          </Button></span>
        </Form.Item>
      </Form>
      </div>
    </div>
  );
};

export default EditForm;
