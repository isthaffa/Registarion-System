const mongoose=require('mongoose')

const connectDB=async ()=>{
    //mongodb connection
dbUrl= process.env.DB
 await mongoose.connect(dbUrl,
  {useNewUrlParser:true,
  useUnifiedTopology:true,
  useCreateIndex:true,
useFindAndModify:true})

console.log("connected to db")
}

module.exports=connectDB