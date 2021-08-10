const {registerUser,login,forgotPassword,reset,editPassword,getUsers,verifyUser,} =require('./userModel')
const {createMember,editMember,deleteMember} =require("./memberModel")

module.exports={
    registerUser:registerUser,
    login:login,
    forgotPassword:forgotPassword,
    resetPassword:reset,
    editPassword:editPassword,
    getUsers:getUsers,
    verifyUser:verifyUser,
    createMember:createMember,
    editMember:editMember,
    deleteMember:deleteMember
    

    
    
}