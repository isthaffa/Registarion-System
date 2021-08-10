const express=require('express')
const validator = require("email-validator");
const ErrorResponse = require('../utils/errorResponse');
const {authenticate}= require('../middlewares/authenticate');
const crypto=require("crypto")
const userService= require('../services')
const jwt=require('jsonwebtoken')


const router=express.Router()
//register

router.post('/register', async (req,res,next)=>{
    console.log(req.body)
         //destructuring the request body 
    const{firstName,lastName,email,password:plainTextpassword}=req.body
    if(!firstName || typeof firstName !=='string'){
        next(new ErrorResponse("invalid firstname",400))
    }
    if(!lastName || typeof lastName !=='string'){
        next(new ErrorResponse("invalid lastname",400))
    }
    if(!email || typeof email !=='string'|| !validator.validate(email)){
        
        next(new ErrorResponse("invalid email",400))
    }
    if(!plainTextpassword || typeof plainTextpassword !=='string'){
        // return res.json({status:'error',error:'Invalid password'})
        next(new ErrorResponse("invalid password",400))
    }

   



    try{
        const user= await userService.createUser(firstName,lastName,email,plainTextpassword)
   console.log(user);
             res.json({status:'ok',tokenser:user})
    }catch(err){
     console.log(err);
     if(err.code===11000){
        return  res.status(500).json({status:'error',error:"user already exist"})
     }else{
         res.status(500).json({status:'error',error:err.message})
     }
     
    }


     
});

//login
router.post('/login',async (req,res,next)=>{

    const {email,password:plainText}=req.body

    if(!email || !plainText){
        res.status(400).json({status:"error",error:"please provide email and password"})
    }

   try { 

   const response= await userService.loginService(email,plainText)
   console.log(response);
        
        return res.json({status:"ok",data:response})
    

   } catch (error) {
       console.log(error);
    // return res.json({status:"error",error:error.message})
    next(error)
   }
   

       

    
        
        
 })

 //edit password

 router.post("/edit-password",async(req,res,next)=>{
    const {password:plainTextPassword,currentPassword} =req.body
    const {token} = req.headers
    console.log(currentPassword);
    if(!token){
        return res.status(400).send({error:"Invalid token"})
    }else{
      jwt.verify(token,process.env.JWT_SECRET,async (err,decoded)=>{
          
        if(!err){
            console.log(decoded.id);
            try {

                
                await userService.editPassword(decoded.id,plainTextPassword,currentPassword)
                
                return res.json({status:"ok",data:"password updated successfully"})
            } catch (error) {
                if(error==="current password don't match")
                return  res.json({status:"error",error:"wrong current password"})
            }
        }else{
            return res.status(400).send({error:"invalid token"})
        }
      })
    }
   

   
    

 })

 //forgot password

 router.post("/forgot",async(req,res,next)=>{
    const  {email} = req.body
    console.log(email);
 
    try {
         await userService.forgotPasswordService(email)
         return res.json({status:"ok",data:"email sent"})
          
    } catch (error) {
            return res.status(401).json({error:error})
 
            
    }
       
 
 
 
 
 })

 //reset password
 router.post('/reset-password/:resetToken',async (req,res,next)=>{

    const resetPasswordToken=crypto.createHash("sha256").update(req.params.resetToken.trim()).digest("hex")
    const {token} =req.headers

    const {password:plainTextPassword} =req.body

    try {
        await userService.resetService(resetPasswordToken,plainTextPassword)

        return res.json({status:"ok",data:"password updated successfully"})
    } catch (error) {
        return next(error)
    }
    
})

router.get("/users",async(req,res,next)=>{
    try {
        const users=await userService.getUsers()
        const userDetails=users.map(user=>[user.email,user.firstName,user.lastName,user._id])
        console.log(userDetails);
        return res.json({statud:"ok",userDetails})
    } catch (error) {
        return res.status(400).json({status :"error",error})
    }
})

router.post("/verify",async (req,res,next)=>{
    const {email}=req.body
    console.log(email);
try {
    const user=await userService.verifyUser(email)
    if(!user){
        return res.json({message:"email available"})
    }else{
        return res.json({message:"email not available "})
    }
} catch (error) {

    return res.json({status:"error",message:"email available "})
}
})


router.post('/user/member',authenticate,async (req,res,next)=>{
    const {firstName,lastName,email}=req.body
    console.log(firstName,lastName,email);
     try {
        await userService.createMember(req.id,firstName,lastName,email) 
        res.json({status:"ok"})
     } catch (error) {
        if(error==="member already exist"){
            return res.json({status:"error",error:"email already exist"})
            }else{
                return res.json({status:"error",error:error})
            }
        }
})

router.get('/user/member',authenticate,async (req,res,next)=>{
    
     try {
      const members=  await userService.readMembers(req.id) 
        res.json({status:"ok",data:members.members})
     } catch (error) {
        return res.json({status:"error",error:error})
     }
})

router.post('/user/member/:memberid',authenticate,async (req,res,next)=>{
    const {firstName,lastName,email}=req.body
    const editid=req.params.memberid

    try {
     const members=  await userService.editMember(req.id,editid,firstName,lastName,email) 
      return  res.json({status:"ok",data:members})
    } catch (error) {
        if(error==="email already exist"){
        return res.json({status:"error",error:"email already exist"})
        }else{
            return res.json({status:"error",error:error})
        }
    }
})

router.delete('/user/member/:memberid',authenticate,async (req,res,next)=>{
  
    const deleteid=req.params.memberid

    try {
     const members=  await userService.deleteMember(req.id,deleteid) 
       res.json({status:"ok",message:"deleted successfully"})
    } catch (error) {
        return res.json({status:"error",error:error})
    }
})


module.exports=router