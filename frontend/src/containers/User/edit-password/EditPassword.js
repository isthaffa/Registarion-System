import React,{useState,useEffect} from 'react'
import { Form, Input,Button} from 'antd';
import './style.css'
import axios from 'axios';
import { message} from 'antd';
import NavBar from '../../../components/navBar';


const EditPassword = ({history,match}) => {

    useEffect(() => {
        if(!localStorage.token){
            history.push("/login")
        }
      

        
    }, [history])

  const [error,setError]=useState("")
  const [success,setSuccess]=useState("")
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
  const onFinish = async (values) => {
      const token=localStorage.getItem("token")
    const config={
      headers:{
        "Content-Type":"application/json",
         Authorization:  `Bearer ${localStorage.getItem("token")}`,
         token:token
      }
    }


    
try {
  const {data}=await axios.post(`http://localhost:8080/edit-password`,values,config)
  console.log(data);
    if(data.status==="ok"){setSuccess(data)
      message.success('password updated successfully', 2)}
      form.resetFields()

    if(data.error==="wrong current password"){
      message.error('invalid current password ',1)
    }
      
    
} catch (error) {
  console.log(error.message);
  message.error('password reset failed',1)
  setError(error)
  setTimeout(() => {
    setError("")
  }, 3000);
  
}

  };

    return (
        <div >
            <NavBar title="change password"/>

            <div className="container-fluid wrapper ">
     
      
      <div className="form form-wrapper ">
      <div>
          <br/>
        <h4 className="head">Change you password here</h4>
      </div>
      <p></p>
      <div className="reset-form">
                  <Form
      {...formItemLayout}
      form={form}
      name="reset"
      onFinish={onFinish}
      scrollToFirstError
    >
      
      <Form.Item
        name="currentPassword"
        label="current Password"
        rules={[
         
          {
            required: true,
            message: 'enter your current password',
            

          },
         
        ]}
        
      >
        <Input.Password />
      </Form.Item>
      
        <Form.Item
        name="password"
        label="New Password"
        rules={[
         
          {
            required: true,
            message: 'enter an password',
            

          },
          {
            min:6,
            message:"password must contain minimum six characters"
          }
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Confirm Password"
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
              return Promise.reject(new Error('The two passwords that you entered does\'t  match!'));
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item {...tailFormItemLayout } >
        <Button type="primary" htmlType="submit">
          save
        </Button>
      </Form.Item>
    </Form>
    </div>  
        
      </div>
    </div>


            
    
    </div>
         
      
    )
}

export default EditPassword
