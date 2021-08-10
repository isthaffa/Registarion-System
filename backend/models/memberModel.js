const  Member = require("./member");
const User = require("./user");


const createMember=async (firstName,lastName,email)=>{
    return  await Member.create({
         firstName,
         lastName,
         email
 
     })




 }

 const editMember=async (id)=>{
    return  await Member.findById({_id:id})




 }
 const deleteMember=async (id)=>{
    return  await Member.findByIdAndDelete(id)




 }


 module.exports={
     createMember,editMember,deleteMember
 }