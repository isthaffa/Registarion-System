const jwt=require('jsonwebtoken')  
const User = require('../models/user')
const ErrorResponse = require('../utils/errorResponse')

const authenticate= (req,res,next)=>{
const header=req.headers.authorization
console.log("dfdf",header);
let token
if(header&& 
    header.startsWith("Bearer")){
    token=header.split(" ")[1]
}


if(token){
    jwt.verify(token,process.env.JWT_SECRET,(err,decoded)=>{
        if(err){
                res
                .status(401)
                .json({errors:{error:"authorization failed"}})
        } else{
            try {
                console.log("id",decoded.id);
                
                req.id=decoded ?.id
                next()
            } catch (error) {
                return next(new ErrorResponse("not auhtorized",401))
            }
          
            
            
        }
    })
}else{
  return  res.status(401).json({  errors:{error:"Not authorized"}})
}
}


module.exports={
    authenticate
}