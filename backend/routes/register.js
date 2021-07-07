const express =require('express')
const userService= require('../services')



const router=express.Router()



router.post('/register', async (req,res,next)=>{
    console.log(req.body)

    //destructuring the request body 
    const{firstName,lastName,email,password:plainTextpassword}=req.body



    try{
         await userService.createUser(firstName,lastName,email,plainTextpassword)
   
             res.json({status:'ok'})
    }catch(err){
     console.log(err);
     if(err.code===11000){
        return  res.json({status:'error',error:"user already exist"})
     }
     th
    }


     
});

module.exports=router