import Jwt from "jsonwebtoken"


export const generateToken=(user)=>{
    if(!user){
        return null
    }

    return Jwt.sign(user,process.env.JWT_SECRET,{expiresIn:"1h"})

}

export const verifyToken=(email,token)=>{
     return Jwt.verify(token,process.env.JWT_SECRET,(error,response)=>{
         if(!error){

            if(response.email===email.toLowerCase().trim()){
                console.log("in");
                return {verified:true,message :"successfully verified",id:response.id}
            }else{
                return {verified:false,error:"invalid token"}
            }
            
         }else{
             throw new Error("invalid token")
         }
     })

}