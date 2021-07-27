const User = require('./user');



const registerUser=async (firstName,lastName,email,password)=>{
   return await User.create({
        firstName,
        lastName,
        email,
        password

    })
}

const login=async (email)=>{
console.log(email);
    return await User.findOne({email})
   

}
const editPassword=async (id)=>{
    return await User.findById({_id:id})
}

const forgotPassword=async (email)=>{
    return await User.findOne({email})
}

const reset=async (resetPasswordToken)=>{
    console.log("user",resetPasswordToken)
    const currentdate=new Date()
  return   await User.findOne({
        resetPasswordToken
       
    })
 


}

const getUsers=async ()=>{
    return await User.find()
}
const verifyUser=async (email)=>{
    return await User.findOne({email:email})
}

module.exports={registerUser,
login,forgotPassword,reset,editPassword,getUsers,verifyUser}