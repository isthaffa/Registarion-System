import React, { useState, useEffect } from "react";
import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import {Link} from 'react-router-dom'
import { useSelector } from "react-redux";
import { useDispatch} from 'react-redux';
import "../../style.css";
import auth from "../../../auth/auth";
import { userLoginRequest } from "../actions";



function Login(props) {

  const dispatch = useDispatch();
  const obj=useSelector(state=>state.userReducer)

  useEffect(()=>{
    if(localStorage.token){
      props.history.push("/")
    } 
  },[props.history])
 
  const authHandler=()=>{
   
    auth.login(()=>{
      props.history.push("/")
    })
  }

  const formItemLayout = {
    labelCol: {
      xs: {
        span: 20,
      },
      sm: {
        span: 5,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 24,
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
        offset: 8,
      },
    },
  };
  // To disable submit button at the beginning.

  const onFinish = async (values) => {
   dispatch(userLoginRequest({values,authHandler}))

  }

  return (
    <div className="container-fluid wrapper ">
     
      
      <div className="form form-wrapper ">
      <div>
        <h2 className="head">Sign in</h2>
      </div>
        <Form
        {...formItemLayout}
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item
             label="Email"
            name="email"
            rules={[
             
              {
                required: true,
                message: "Please enter your Email!",
              },
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon form-input" />}
              placeholder="Email"
            />
          </Form.Item>
          <Form.Item
           label="Password"
            name="password"
            rules={[
            
              {
                required: true,
                message: "Please enter your Password!",
                min:6
              },
              {
                min:6,
                message:"password must contain minimum six characters"
              },
            
              
            ]}
            
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon form-input" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <div className="form-footer">
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Link className="login-form-forgot form-a" to="/forgot-password">
              Forgot password
            </Link>
          </Form.Item>

          <Form.Item  {...tailFormItemLayout}>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
            
          </Form.Item>
          <p>don't have an account <span><Link to="/register">Signup</Link></span></p>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Login;
