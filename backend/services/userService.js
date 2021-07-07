const userModel=require('../models')
const bcrypt=require('bcryptjs')
const validator = require("email-validator");


const jwt=require('jsonwebtoken')   

const JWT_SECRET=process.env.JWT_SECRET

const createUser=async (firstName,lastName,email,password)=>{
    //validating the inputs of the user 
    
    if(!firstName || typeof firstName !=='string'){
        return res.json({status:'error',error:'Invalid firstname'})
    }
    if(!lastName || typeof lastName !=='string'){
        return res.json({status:'error',error:'Invalid lastname'})
    }
    if(!email || typeof email !=='string'|| !validator.validate(email)){
        
        return res.json({status:'error',error:'Invalid email'})
    }
    if(!password || typeof password !=='string'){
        return res.json({status:'error',error:'Invalid password'})
    }


    const hasedpassword=await bcrypt.hash( password,10)

          await userModel.registerUser(firstName,lastName,email,hasedpassword)
          
        
    }

    const loginService=async (email ,password)=>{

        
      return  await  userModel.login(email).then(async  res=>{
            const user=res
            console.log(user);
          
                
              if( bcrypt.compareSync(password,user.password)){
                   
                   const token= jwt.sign({id:user._id,email:user.email},JWT_SECRET,{expiresIn:"1d"})
                   // return res.json({status:"ok",data:token})
                   
                   console.log(token);
                   return token
                
               
        }
  

    
      })


    }







module.exports={
    createUser,
    loginService
}