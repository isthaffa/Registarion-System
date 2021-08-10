const userModel=require('../models')
import { response } from "../utils/util"
import { verifyToken } from "../utils/auth"

const userHandler={


    userRegister:async event =>{
       
        const body = JSON.parse(event.body)
        const {firstName,lastName,email,password}=body

        if(!firstName ){
            const body={error:"firstname required"}
            return response(400,body)
        }
        if(!lastName ){
            
            const body={error:"lastname required"}
            return response(400,body)
        }
        if(!email ){
           
            const body={error:"email required"}
            return response(400,body)
        }
        if(!password ){
            
            const body={error:"password required"}
            return response(400,body)
        }

  
        
         return   await userModel.register(firstName,lastName,email,password)
          
       
        
        
        


    },

    userLogin:async (event)=>{
        const body = JSON.parse(event.body)
        const {email,password}=body
        if(!email ){
           
            const body={error:"email required"}
            return response(400,body)
        }
        if(!password ){
            
            const body={error:"password required"}
            return response(400,body)
        }

        return await userModel.login(email,password)


    },
    userVerify:async(event)=>{
        const body = JSON.parse(event.body)

        const {email,token }=body

        if( !email || !token){
            return response(400,{error:"incorrect request body "})
        }

        try {   
            const res=verifyToken(email,token)
            const user={
                email:email,
                id:res.id
            }
            console.log(res);
            if (res.verified){
                console.log("dd");
                return response(200,{message:res.message ,token:token,user:user})
            }else{
                return response(400,{error:"invalid token "})
            }
        } catch (error) {
            return response(400,{error:"invalid token "})
        }
        
    },

    resetPassword:async(event)=>{
        const body = JSON.parse(event.body)

        const {email,currentPassword,newPassword }=body
        if( !email ){
            return response(400,{error:"email required "})
        }
        if( !currentPassword ){
            return response(400,{error:"current password required "})
        }
        if( !newPassword ){
            return response(400,{error:"new password required "})
        }

     return await userModel.resetPassword(email,currentPassword,newPassword)
        

    }


}


export default userHandler