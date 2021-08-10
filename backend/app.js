const express=require('express')
require("dotenv").config();
const connectDB=require('./config/db')
const errorHandler=require('./middlewares/errorHandler')

const User=require('./routes')



var cors = require('cors')


const app=express();

app.use(cors())

//mongodb connection
try {
  connectDB()
  
} catch (error) {
  console.log("mongo: ",error);
}






// app.use(express.urlencoded({extended:true}))
app.use(express.json())


app.use(User.userRouter)


app.use(errorHandler)
app.use((req,res,next)=>{
  res.status(404).send('not found')
})

app.listen(8080,()=>{
  console.log('server up at 8080');
})
 