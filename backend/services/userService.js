const userModel=require('../models')
const bcrypt=require('bcryptjs')
const sendEmail = require('../utils/sendEmail')
const ErrorResponse = require('../utils/errorResponse')
const jwt=require('jsonwebtoken')
const User=require("../models/user")
const mongoose=require('mongoose');


const JWT_SECRET=process.env.JWT_SECRET

const createUser=async (firstName,lastName,email,password)=>{
    //validating the inputs of the user 

       const user= await userModel.registerUser(firstName,lastName,email,password)
        const token =jwt.sign({id:user._id,email:user.email},process.env.JWT_SECRET,{expiresIn:"2d"})
        return token 
    }

    const loginService=async (email ,password)=>{

        console.log(email,password)
        try {
        const user=   await  userModel.login(email)
        if(!user){
          throw ("Invalid Credential")
        }
        console.log(user);
          
                
               if( bcrypt.compareSync(password,user.password)){
                const token =jwt.sign({id:user._id,email:user.email},process.env.JWT_SECRET,{expiresIn:"1d"})
                console.log(token);
                return token 
                   
                
                
               
         }else{
           throw ("Incorrect password")
         }
        } catch (error) {
          throw new Error (error)
        }
     


    }
    

const resetService=async(resetPasswordToken,password)=>{

  console.log("ef",resetPasswordToken);   
try {
  const user=  await userModel.resetPassword(resetPasswordToken)
 
  console.log(user);
  if(!user){
    throw new ErrorResponse("invalid reset Token",400)
  }
  console.log(user.resetTokenHasExpired());
  if(!user.resetTokenHasExpired()){
    console.log(password);
    user.password=password
    user.resetPasswordToken=undefined
    user.resetPasswordExpire=undefined
    await user.save()



  }else{
    throw new ErrorResponse("Token expired",400)
  }
  // user.password=password
  // user.resetPasswordToken=undefined
  // user.resetPasswordExpire=undefined
 
} catch (error) {
  console.log(error);
  throw new ErrorResponse(error,400)
  }
}




    

const forgotPassword=async (email)=>{

      try {
       const user= await userModel.forgotPassword(email)
       const [resetToken,resetPasswordToken,resetPasswordTokenExpire]=user.getResetPasswordToken()

       user.resetPasswordToken=resetPasswordToken
       user.resetPasswordExpire=resetPasswordTokenExpire

       console.log(resetToken);
       console.log(resetPasswordToken);
       console.log(resetPasswordTokenExpire);

      

       await user.save();
       

      
       const resetUrl=`${process.env.CLIENT_URL}/reset-password/${resetToken}`
       const message=`<h1>you have requested pssword reset</h1>
                        <p>please go to this link to reset your password</p>
                        <a href="${resetUrl}" clicktracking=off>${resetUrl}</a>`

           try {
            await sendEmail({
              to:user.email,
              subject:"pssword reset request",
              text:message
            })

 
           } catch (error) {
             user.resetPasswordToken=undefined
             user.resetPasswordExpire=undefined
             await user.save()
             throw ("Email could not be sent")
           }
      } catch (error) {
        console.log(error);
        throw ("request failed")
      }

    }

  const editPassword=async (id,password,currentPassword)=>{

    

      try {
        const user=await userModel.editPassword(id)
        console.log(user);

        if( bcrypt.compareSync(currentPassword,user.password)){
          user.password=password
          user.save()
        }else{
          throw ("current password don't match")
        }
        
      } catch (error) {
        throw("current password don't match")
      }

    }

const getUsers=async ()=>{
  try {
    return await userModel.getUsers()

  } catch (error) {
    throw ("couldn't get the users details")
  }
}
const verifyUser=async (email)=>{
  try {
    return await userModel.verifyUser(email)

  } catch (error) {
    throw ("couldn't find user")
  }
}


const createMember=async (userId,firstName,lastName,email)=>{

  try {
    const member=await userModel.createMember(firstName,lastName,email)

    const result= await User.findByIdAndUpdate(
      userId,{
          $push:{
              members:member._id
          }
      },{new:true,useFindAndModify:false}
  )
  console.log(result);
  } catch (error) {
    if(error.code===11000){
      throw ("member already exist");
    }
   throw("failed")

  }
  
}

const readMembers=async (id)=>{

  try {
   return  await User.findById(id).populate("members")
 
    
  } catch (error) {
    throw("couldn't find members")
  }
}

const editMember=async (userId,editid,firstName,lastName,email)=>{
  const memberid = mongoose.Types.ObjectId(editid)
  console.log(memberid);

  try {
    const member=await userModel.editMember(memberid)
    console.log(member);
    member.firstName=firstName
    member.lastName=lastName
    member.email=email
    
    await member.save()
  } catch (error) {
    if(error.code===11000){
      throw("email already exist")
    }else{
      throw("update member failed")
    }
  }


}

const deleteMember=async (userId,deleteId)=>{
  const memberid = mongoose.Types.ObjectId(deleteId)
  try {
    
    await userModel.deleteMember(memberid)
    await User.updateOne({_id:userId},{$pull: {members: memberid }})
  } catch (error) {
    console.log(error);
  }
  
}






module.exports={
    createUser,
    loginService,
    forgotPassword,
    resetService,
    editPassword,
    getUsers,
    verifyUser,
    createMember,
    readMembers,
    editMember,
    deleteMember
}