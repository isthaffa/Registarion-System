import React from 'react'
import { withRouter } from 'react-router-dom'
import auth from '../auth'
import { Button } from 'antd'

function Home  (props)  {
    
   
    const authHandler=()=>{
        if(auth.isAuthenticated())
        auth.logout(()=>{
            localStorage.removeItem('token')
            props.history.push("/login")

        })
    }
    return (
        <div>
            <h1>Home</h1>
            <Button type="primary" onClick={authHandler}>logout</Button>
        </div>
    )
}

export default  Home
