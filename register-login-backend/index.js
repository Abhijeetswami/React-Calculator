import express from "express"
import cors from "cors"
import mongoose from "mongoose"
const app =express()
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())
mongoose.connect("mongodb://localhost:27017/myLoginRegistrationDB",{
    userNewUrlParser:true,
    useUnifiedTopology:true,
},()=>{
console.log("DB connected");
})
app.post("/login",(req,res)=>{
    const {email,password}=req.body
    User.findOne({email:email},(err,user)=>{
        if(user){
            if (password===user.password){
                res.send({message:"login successfully"})
            }
        else{
            res.send({message:"password not matched"})
        }
    
    }else{
        res.send({message:"user not registered"})
    }
}
    )
})
app.post("/register",(req,res)=>{
    const {name,email,password}=req.body
    User.findOne({email:email},(err,user)=>{
        if(user){
            res.send({message:"user already registered"})
        }
    else{
    const user =new user({
        name,
        email,
        password
    })
    user.save(err=>{
        if(err){
            res.send(err)
        }else{
            res.send({message:"successfully registered"})
        }
    })
}
})
app.listen(9002,()=>{
    console.log('Server running on port 9002')
})
const userSchema= new mongoose.Schema({
    name:String,
    email:String,
    password:String
})
const User = new mongoose.model("User",userSchema)