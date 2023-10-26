const bcrypt = require("bcrypt")
const User = require("../Models/usermodel.js")
const { setuser } = require("../auth/auth.js");

const RegisterUser = async(req,res)=>{
    
    const {name,email,password} = req.body;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password,salt);
    const u =await User.findOne({email:email})
    if(u){
       return res.status(201).json({message:"Email exists"})
    }

        try {
            const user = await User.create({name:name,email:email,password:hash});
            const  token = setuser(user);
            res.cookie("Cookie",token);
            res.status(200).json({
                message:"Success",
                user,
                token
            })
        } catch (error) {
            res.status(400).json({error})
        }
    
}
const login = async(req,res)=>{
    const{email,password} = req.body;
    const user =await User.findOne({email:email})
    if(!user){
        return res.status(400).json({
            message:"Not Exists"
        })
    }
    const pass = await bcrypt.compare(password, user.password);
    if (!pass) {
        return res.status(400).json({ message: "Password is wrong" });
    }

    const token = setuser(user);
    res.cookie("Cookie",token);
    res.status(200).json({message:"Logged in Successsfully"})
}
module.exports = {RegisterUser , login}