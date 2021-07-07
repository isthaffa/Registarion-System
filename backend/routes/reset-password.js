const express=require('express')
const jwt=require('jsonwebtoken')
const path = require('path');
const User = require('../models/user');
const bcrypt=require('bcryptjs')

const router=express.Router();
const JWT_SECRET='@!@#alattathingadawelathanthu@!@#'
router.get('/reset-password',(req,res,next)=>{
    res.sendFile(path.join(__dirname,'../','views','reset.html'))

})


router.post('/reset-password',async (req,res,next)=>{
    const {token} =req.headers
    const {newpassword:plainTextPassword} =req.body


    try{
    const user=jwt.verify(token,JWT_SECRET)
    const _id=user.id
    const hasedPassword=await bcrypt.hash( plainTextPassword,10)
    await User.updateOne({
        _id
    },{
        $set:{password:hasedPassword}
    }).then(res=>{}).catch(err=>{console.log(err);})

    res.json({status:"ok"})
    }catch(err){
        res.json({status:"error"})
    }

    
})


module.exports=router