import React from 'react'
import { Layout} from 'antd';
import auth from '../auth/auth'
import { useDispatch } from 'react-redux'
import { userLoggedout } from '../containers/User/actions'
import { Menu, Button } from 'antd';
import { useHistory } from 'react-router';
import './style.css'


const { SubMenu } = Menu;
const { Header } = Layout;
const NavBar = ({title}) => {

  const dispatch=useDispatch()
  const history=useHistory()
  const authHandler=()=>{
    
     
    if(auth.isAuthenticated())
   
    auth.logout(()=>{
        // localStorage.removeItem('token')
        dispatch(userLoggedout())
        history.push("/login")

    })
}

const edithandler=()=>{
  history.push("/edit-password")
}

    return (
        <div>
          <Layout className="layout">
    <Header>
      <div className="logo" >{title}</div>
      <Menu theme="dark" className="nav-bar" mode="horizontal" defaultSelectedKeys={['2']}>
      <Menu.Item onClick={()=>history.push("/")}>Home</Menu.Item>
      
      <SubMenu title="profile">
    <Menu.Item onClick={authHandler}>Logout</Menu.Item>
    <Menu.Item onClick={edithandler}>change password</Menu.Item>
  
  </SubMenu>

      </Menu>
    </Header>
    
  
  </Layout>,


        </div>
          
     
 
  

        
    )
}

export default NavBar
