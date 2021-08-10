const {createUser,loginService,resetService, forgotPassword,editPassword,getUsers,verifyUser,createMember,readMembers,editMember,deleteMember}=require('./userService')

module.exports={
    createUser:createUser,
    loginService:loginService,
    resetService:resetService,
    forgotPasswordService:forgotPassword,

    editPassword:editPassword,
    getUsers:getUsers,
    verifyUser:verifyUser,
    createMember:createMember,
    readMembers:readMembers,
    editMember:editMember,
    deleteMember:deleteMember
}