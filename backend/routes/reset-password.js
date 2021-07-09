const express=require('express')
const userService= require('../services')

const router=express.Router();
const JWT_SECRET=process.env.JWT_SECRET



router.post('/reset-password',async (req,res,next)=>{
    const {token} =req.headers
    const {newpassword:plainTextPassword} =req.body


    try{
    await userService.resetService(token,plainTextPassword)

    res.json({status:"ok"})
    }catch(err){
        res.json({status:"error"})
    }

    
})


module.exports=router