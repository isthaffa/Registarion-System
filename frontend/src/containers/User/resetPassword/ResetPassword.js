import React, { useState,useEffect } from "react";
import {
  Form,
  Input,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete,
} from "antd";
import "./style.css";
import axios from "axios";
import { message } from "antd";
import { Link } from "react-router-dom";
import { Layout, Breadcrumb } from "antd";
import { Menu } from "antd";

const ResetPassword = ({ history, match }) => {
  const { Header, Content, Footer } = Layout;
  const [expire, setExpire] = useState(false);
  
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [form] = Form.useForm();
  const formItemLayout = {
    labelCol: {
      xs: {
        span: 20,
      },
      sm: {
        span:6,
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
        span: 10,
        offset: 8,
      },
    },
  };

  useEffect(() => {
    const time=localStorage.resetTokenExpire/ 60 / 1000
    const currentTime=new Date().getTime()/ 60 / 1000
    console.log(currentTime-time>5);
    if(currentTime-time>5){
      setExpire(true)
    }else{
      setExpire(false)
    }
    
  }, [])
 
  const onFinish = async (values) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        `http://localhost:8080/reset-password/${match.params.resetToken}`,
        values
      );
      setError("");
      message.success("password updated successfully", 2);
      localStorage.removeItem("resetTokenExpire")
      setSuccess(data);
      history.push("/login");
    } catch (error) {
      message.error("password reset failed or token expired", 2);
      console.log(error);
      setSuccess("");
      setError(error);
    }
  };

  return (
    <div>
      <Layout>
        <Header style={{ position: "fixed", zIndex: 1, width: "80%" }}>
          <div className="logo">Reset Password</div>
          <Menu
            theme="dark"
            className="nav-bar"
            mode="horizontal"
            defaultSelectedKeys={["2"]}
          >
            <Menu.Item onClick={() => history.push("/login")}>Login</Menu.Item>
          </Menu>
        </Header>
      </Layout>
      <div className="container-fluid wrapper ">
        
        <div className="form form-wrapper ">
          <div>
            <br/>
            <h4 className="head">Reset your  password here</h4>
          </div>
          <p>
          {expire ? <h3 style={{color:"darkred"}}>Token expired</h3>:null}
          </p>
          <div className="reset-form">
            <Form
              {...formItemLayout}
              form={form}
              name="reset"
              onFinish={onFinish}
              scrollToFirstError
            >
              <Form.Item
                name="password"
                label="New Password"
                rules={[
                  {
                    required: true,
                    message: "enter an password",
                  },
                  {
                    min: 6,
                    message: "password must contain minimum six characters",
                  },
                ]}
                hasFeedback
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                name="confirm"
                label="Confirm Password"
                dependencies={["password"]}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Please confirm your password!",
                  },
                  {
                    min: 6,
                    message: "password must contain minimum six characters",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error(
                          "The two passwords that you entered does't  match!"
                        )
                      );
                    },
                  }),
                ]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">
                  save
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
