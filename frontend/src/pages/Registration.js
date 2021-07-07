import React ,{ useState } from 'react'
import { Form, Input, Button } from 'antd';
import Swal from 'sweetalert2'
import {Link} from 'react-router-dom'
import axios from 'axios'
import 'antd/lib/form/style/css'
import "./style.css";
import '../App.css'


function Registration(props) {

    const [form] = Form.useForm();

  const onFinish = async (values) => {
    const headers = {
        'Content-Type': 'application/json'
      }
 
    
       await  axios.post('http://localhost:8080/register',JSON.stringify(values),{headers})
       .then(res=>{
        if(res.data.status==="ok"){
          Swal.fire('success', `successfully registered \n now you will be redirect to the login page use the email and password that you used to register`, 'success')

            props.history.push("/login")
        }
           if(res.data.error==="user already exist"){
              //  alert("This email is  already in use")
              Swal.fire('Error', 'This email is already in use', 'error')

           }
       })
       .catch(err=>{console.log(err)})
  
  };
    return (
    <div className="container-fluid wrapper">
     
      <div  className="form form-wrapper">
      <div>
        <h2 className="head">Sign up</h2>
      </div>
     <Form
      
      form={form}
      name="register"
      onFinish={onFinish}
      scrollToFirstError
    >
         <Form.Item
        
        name="firstName"
        
        
        rules={[
          {
            required: true,
            message: 'Please input your first name',
          },
        ]}
      ><Input className="form-input1" placeholder="Please enter your first name" /></Form.Item>
          <Form.Item
        
        name="lastName"
        
        rules={[
          {
            required: true,
            message: 'Please input your last name',
          },
        ]}
      >
           <Input className="form-input" placeholder="Please enter your last name" />
      </Form.Item>
    
      <Form.Item
        name="email"
        
        rules={[
          {
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
          {
            required: true,
            message: 'Please input your E-mail!',
          },
        ]}
      >
        <Input className="form-input" placeholder="Please enter your email address"/>
      </Form.Item>

      <Form.Item
        name="password"
        
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
        hasFeedback
      >
        <Input.Password  className="form-input" placeholder="Please enter your password" />
      </Form.Item>

      <Form.Item
        name="confirm"
        
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error("password doens't match!"));
            },
          }),
        ]}
      >
        <Input.Password className="form-input" placeholder="Please confirm your password"  />
      </Form.Item>

      <div className="form-footer">
      <Form.Item >
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item><h5>already have an account <span><Link to="/login">Login</Link></span></h5>
      </div>
    </Form>
    </div>
        </div>
    )
}

export default Registration
