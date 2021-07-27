const mongoose=require('mongoose');
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')   
const crypto=require("crypto")


const Schema=mongoose.Schema;

const userSchema=new Schema({
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
    password:{
        type:String,
        required:true,
        minlength:6,
    },
    members:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Member"
    }],
    resetPasswordToken:{type:String},
    resetPasswordExpire:{type:Date}

},{timestamps:true})

userSchema.methods.getToken=()=>{

    console.log("id",this._id);
    return jwt.sign({id:this._id,email:this.email},process.env.JWT_SECRET,{expiresIn:"2d"})
}

userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        next()
    }
    this.password=await bcrypt.hash( this.password,10)
    next()

})

userSchema.methods.getResetPasswordToken=()=>{
     const resetToken=crypto.randomBytes(20).toString("hex")

     this.resetPasswordToken=crypto.createHash("sha256").update(resetToken)
     .digest("hex");
    const currentdate=new Date()
     this.resetPasswordExpire=Date.now()+5 * (60*1000)
     console.log(this.resetPasswordExpire);

     return [resetToken,this.resetPasswordToken,this.resetPasswordExpire]
}

userSchema.methods.resetTokenHasExpired= function(){
    var now = Date.now();
    return (Date.now()>this.resetPasswordExpire); 
};


const User=mongoose.model('User',userSchema)

module.exports=User;