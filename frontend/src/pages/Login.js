import React, { useState, useEffect } from "react";
import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import {Link} from 'react-router-dom'
import Swal from 'sweetalert2'


import "./style.css";
import axios from "axios";
import auth from "../auth";
function Login(props) {


  const authHandler=()=>{
    auth.login(()=>{
      props.history.push("/")
    })
  }
  const [form] = Form.useForm();

  // To disable submit button at the beginning.

  const onFinish = async (values) => {
    const headers = {
      "Content-Type": "application/json",
    };
    await axios
      .post("http://localhost:8080/login", JSON.stringify(values), { headers })
      .then((res) => {
        if (res.data.status === "ok") {
          localStorage.setItem("token", res.data.data);
         authHandler()
        }
        if (res.data.error === "Invalid Login") {
          // alert("Inavlid Username/Password");
          Swal.fire('Error', 'Invalid username/password', 'error')

        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container-fluid wrapper ">
     
      
      <div className="form form-wrapper ">
      <div>
        <h2 className="head">Sign in</h2>
      </div>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="email"
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                required: true,
                message: "Please enter your Email!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon form-input" />}
              placeholder="Email"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please enter your Password!",
              }
              
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

            <a className="login-form-forgot form-a" href="">
              Forgot password
            </a>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
            <span>
              Or <Link className="form-a" to="/register">register now!</Link></span>
          </Form.Item>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Login;
