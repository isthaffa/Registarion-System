import React ,{ useState,useEffect } from 'react'
import { Form, Input, Button, message } from 'antd';
import Swal from 'sweetalert2'
import {Link} from 'react-router-dom'
import axios from 'axios'
import 'antd/lib/form/style/css'
import "../../style.css";
import '../../../App.css'
import { useDispatch} from 'react-redux';
import { userSignup } from '../actions';



function Registration(props) {
  const [emailexist,setEmailexist]=useState(null)

  const [users,setUsers]=useState([])
  const emailstatus=emailexist ? "error":"success"


  const emailVerification=async (value)=>{
   
    const user={email:value}
    console.log(JSON.stringify(user)); 
    try {
      const {data}=await axios.post("http://localhost:8080/verify",user)
    if(data.message==="email available"){
      console.log("available");
      setEmailexist(false)
      return true
      
    }else{
      setEmailexist(true)
      return false
    }
      
    } catch (error) {
      console.log(error);
    }
    // users.map(user=>{
    //   const [email, ...rest]=user
    //   console.log(email);
    //   if(value===email){
        
    //     setEmailexist(true)
    //   }else{
    //     setEmailexist(false)
    //   }
    // })
    
  }

  const dispatch = useDispatch();
  useEffect(()=>{
    if(localStorage.token){
      props.history.push("/")
    } 
  },[props.history])


    const [form] = Form.useForm();

    const redirectHandler=()=>{
      props.history.push("/login")
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
          span: 11,
          offset: 8,
        },
      },
    };

  const onFinish = async (values) => {

    dispatch(userSignup({values,redirectHandler}))

  };

  const emailValidator=(rule,value)=>{
    return new Promise(async (resolve, reject) => {
      
      if (!value) {
          await reject('email must be entered')
      }else{
        await resolve() 
      }
        
      // if(emailVerification(value)){ 
      //   await resolve()  
      //   }else{
      //     await reject('email already exist')

      //   }
       
        
          
      
  })  
  }

    return (
    <div className="container-fluid wrapper">
     
      <div  className="form form-wrapper">
      <div>
        <h2 className="head">Sign up</h2>
      </div>
     <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      scrollToFirstError
    >
         <Form.Item
        
        name="firstName"
        label="Firstname"

        
        rules={[
          {
            required: true,
            message: 'Please input your first name',
          },
        ]}
      ><Input className="form-input1" placeholder="Please enter your first name" /></Form.Item>
          <Form.Item
        
        name="lastName"
        label="Lastname"
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
        label="Email"
        hasFeedback
      
        help={emailexist ? "email already in use":null}
        rules={[
         
          {
            type: 'email',
            message: 'The input is not valid E-mail!'
          },
         {
           validator:emailValidator
         }
          
        ]}
      >
        <Input   id={emailexist?"error2":"success"} className="form-input" placeholder="Please enter your email address"/>
      </Form.Item>

      <Form.Item
        name="password"
        label="password"
        rules={[
          
          {
            required: true,
            message: 'Please input your password!',
          
          },
          {
            min:6,
            message:"password must contain minimum six characters"
          },
        ]}
        hasFeedback
      >
        <Input.Password  className="form-input" placeholder="Please enter your password" />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="confirm password"
        dependencies={['password']}
        hasFeedback
        rules={[
          

          {
            required: true,
            message: 'Please confirm your password!',
            
          },
          {
            min:6,
            message:"password must contain minimum six characters"
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
      <Form.Item {...tailFormItemLayout} >
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item><p>already have an account <span><Link to="/login">Login</Link></span></p>
      </div>
    </Form>
    </div>
        </div>
    )
}

export default Registration
