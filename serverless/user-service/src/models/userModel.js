import AWS from "../../lib/models/AWS"
import bcrypt from 'bcryptjs'
const uuid=require('uuid')
import { response } from "../utils/util"
import { generateToken } from "../utils/auth"

const dynamodb=AWS.documentClient
const tableName=process.env.DYNAMODB_TABLE_NAME

 const register=async (firstName,lastName,email,password)=>{
    const userId=uuid.v1()
        
      try {
        const dynamoUser=await getUser(email.toLowerCase())
        if(dynamoUser && dynamoUser.email){
            const body={error:"user already exist"}
         return response(400,body)
        }

           bcrypt.hash(password.trim(),10,async (err,hash)=>{
                if(err){
                    return response(400,{error:"registration failed"})
                }
                const user={
                    userId:userId,
                    firstName:firstName,
                    lastName:lastName,
                    email:email.toLowerCase(),
                    password:hash
                }
                
                   await saveUser(user)
                    
               
                
                
            })
            const body={message:"successfully registered"}
            return response(200,body)
      } catch (error) {
        console.log("register",error);
                    
        const   body={error:"registration failed"}
          return response(400,body)
    
      }
        
        

      
       
        
        

       



    }

 const getUser= async (email)=>{
        const params={
            TableName:tableName,
            Key:{email:email}
    }
    const result=await dynamodb.get(params).promise()
    console.log(result);
    if (!result || !result.Item) return null;
    return result.Item
}
 const saveUser= async (user)=>{
    const params={
        TableName:tableName,
        Item:user
}
 return await dynamodb.put(params).promise()

}

const login =async (email,password)=>{
    
 const dynamoUser=await getUser(email.toLowerCase())
    if(dynamoUser && dynamoUser.email){
        if(bcrypt.compareSync(password.trim(),dynamoUser.password)){
            const user={
                id:dynamoUser.userId,
                email:dynamoUser.email
            }
            const token =generateToken(user)
            if(!token ){
                return response(400,{error:"invalid login"})
            }else{
                return response(200,{message:"succefullly logedin",token:token,user:user})
            }       

         
        }else{
            return response(400,{error:"incorrect password"})
        }
    

     
    }else{
        return response(400,{error:"user not found"})
    }
    
}

const resetPassword=async (email,currentPassword,newPassword)=>{
    const hashedPassowrd=bcrypt.hashSync(newPassword.trim(),10)
    console.log(email,currentPassword,newPassword);
   try {
    const user=await getUser(email.toLowerCase().trim())
    if (user ){
        if(bcrypt.compareSync(currentPassword.trim(),user.password)){
            console.log("reset");
            const params={
                TableName:tableName,
                Key:{email:email},
                UpdateExpression:'set #password = :newPassword',
                ExpressionAttributeNames:{'#password':'password'},
                ExpressionAttributeValues:{
                    ':newPassword':hashedPassowrd
                }

            }

            try {
                const res=await dynamodb.update(params).promise()
                console.log("update",res);
                if(res){
                    return response(200,{message:"successfully updated"})
                }else{
                    console.log("else");
                }
                
            } catch (error) {
                return response(400,{error:"update failed"})
            }

        }else{
            return response(400,{error:"incorrect password"})
        }

    }
   } catch (error) {
       return response(400,{error:"user not found"})
   }



}


export{register,login,resetPassword}
    


