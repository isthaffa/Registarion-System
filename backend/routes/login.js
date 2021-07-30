const express=require('express')
const userService= require('../services')




const router=express.Router();
 router.post('/login',async (req,res,next)=>{

    const {email,password:plainText}=req.body

  

   try {

    await userService.loginService(email,plainText).then(response=>{
        if(response){
        return res.json({status:"ok",data:response})
        }else{
            return res.json({status:"error",error:"Invalid Login"})
        }
    })
    
    

   } catch (error) {
       console.log(error);
    return res.json({status:"error",error:"Invalid Login"})
   }
    // .then(response=>{
            
       
        
    //     console.log("lo",response);
    //     
    // }
    // ).catch(err=>{
    //     console.log(err);
    //     return res.json({status:"error",error:"Invalid Login"})
    // })





    // if(!user){
    //     return res.json({status:"error",error:"Invalid Login"})
    // }
    
    // await bcrypt.compare(plainText,user.password,(err,response)=>{
    //     if(response===true){
    //         const token= jwt.sign({id:user._id,email:user.email},JWT_SECRET)
    //         return res.json({status:"ok",data:token})
    //     }else{
    //         return res.json({status:"error",error:"Invalid Login"})
    //     }
    // })

       

    
        
        
 })



module.exports=router;