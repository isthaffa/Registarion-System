import React from "react";
import { useEffect, useState } from "react";
import "./style.css";
import { Layout,  Breadcrumb } from 'antd';
import { Menu, Button } from 'antd';
import {
  Form,
  Input,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  AutoComplete,
} from "antd";
import axios from "axios";
import { message } from "antd";

const ForgotPassword = (props) => {
  const [error, setError] = useState("");
  const [success, setsuccess] = useState("");
  const { Header} = Layout;

  const [form] = Form.useForm();

  useEffect(() => {
    if (localStorage.token) {
      props.history.push("/");
    }
  }, [props.history]);

  const onFinish = async (values) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const { data } = await axios.post("http://localhost:8080/forgot", values);
      const date=new Date()
      const time =date.getTime()
      localStorage.resetTokenExpire=time
      message.success("reset password link has been sent your Email ", 3);
      
      setsuccess(data);

    } catch (error) {
      console.log(error);
      message.error("Email could not be sent try again", 3);
      setError(error.response.data);
      setTimeout(() => {
        setError("");
      }, 4000);
    }
  };

  return (
    <div>
         <Layout>
    <Header style={{ position: 'fixed', zIndex: 1, width: '80%' }}>
      <div className="logo" >Forgot Password</div>
      <Menu theme="dark" className="nav-bar" mode="horizontal" defaultSelectedKeys={['2']}>
      <Menu.Item onClick={()=>props.history.push("/login")}>Login</Menu.Item>
      </Menu>
      </Header>
      </Layout>
    <div className="container-fluid wrapper">
    

      <div className="form form-wrapper ">
        <br/>
        <br/>

        <p style={{color:"red"}}>
          Please enter your email address below and we will send you information
          to change your password.
        </p>

        <Form
          form={form}
          name="register"
          onFinish={onFinish}
          scrollToFirstError
        >
          <div className="form-flex">
            <Form.Item
            
              name="email"
              label="E-mail"
              rules={[
                {
                  type: "email",
                  message: "The input is not valid E-mail!",
                },
                {
                  required: true,
                  message: "Please input your E-mail!",
                },
              ]}
            >
              <Input style={{width:'190%'}} />
            </Form.Item>
            <span>
              <Form.Item>
                <Button
                  className="form-button"
                  type="primary"
                  htmlType="submit"
                >
                  send
                </Button>
              </Form.Item>
            </span>
          </div>
        </Form>
      </div>
    </div>
    </div>
  );
};

export default ForgotPassword;
