const express=require('express')
require("dotenv").config();
const User=require('./routes')
const reset=require('./routes/reset-password')

var cors = require('cors')



const mongoose=require('mongoose')

const app=express();

app.use(cors())

//mongodb connection
dbUrl= process.env.DB
mongoose.connect(dbUrl,
  {useNewUrlParser:true,
  useUnifiedTopology:true,
  useCreateIndex:true})
.then(()=>{
  console.log(" db connected");
})
.catch(err=>console.log(err))


// API_URL=`${process.env.BASE_URL}/users`





// app.use(express.urlencoded({extended:true}))
app.use(express.json())



app.use(User.register)
app.use(User.login)

app.use((req,res,next)=>{
  res.status(404).send('not found')
})

app.listen(8080,()=>{
  console.log('server up at 8080');
})
 