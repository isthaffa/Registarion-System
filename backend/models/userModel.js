const User = require('./user');

const registerUser=async (firstName,lastName,email,password)=>{
    await User.create({
        firstName,
        lastName,
        email,
        password

    })
}

const login=async (email)=>{
console.log(email);
    const user =await User.findOne({email}).lean()
   
    return user
   

  
}

const reset=async (_id,password)=>{
    await User.updateOne({
        _id
    },{
        $set:{password:password}
    })
}


module.exports={registerUser,
login,reset}