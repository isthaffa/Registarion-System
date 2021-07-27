const mongoose=require('mongoose');

const memberSchema = new mongoose.Schema(
    {
        firstName:{
            type:String,
            required:[true, "please provide a firstname"]
        },
        lastName:{
            type:String,
            required:[true,"please provide a lastname"]
        },
        email:{
            type:String,
            required:[true,"please provide a email "],
            unique:true,
           
            lowercae:true,
        },
    },{timestamps:true}
)


const Member=mongoose.model('Member',memberSchema)

module.exports=Member
