const Taskmodel = require("../Models/Task.js")
const User = require("../Models/usermodel.js")
const List = require('../Models/List.js');
const CreateTask = async(req,res)=>{
    const task = await Taskmodel.create({
        userId:req.user._id,
        desc:req.body.desc
    });
    if (task) {
        const user = await User.findOneAndUpdate({_id:req.user._id},{
            $push: { [`lists.${req.params.i}.tasks`]: task } 
        })
    }
    res.status(200).json({
        message:"Success",
        task
    })
}
const GetTask = async(req,res)=>{
    try {
        const data = await User.findById(req.user._id).select("-password").populate("lists.tasks").exec();
        res.status(200).json({message:"Success",data})
    } catch (error) {
        res.status(400).json({message:"Failure",error})
    }
}
const CreateList = async(req,res)=>{
    try {
        const user = await User.findById(req.user._id);
        let ma = user.lists?.length || 0;
        const newList = {
            sq:Number(ma),
            tasks: [], 
          };
        user.lists.push(newList)
        await user.save();
        res.status(200).json({message:"Success",user})
    } catch (error) {
        res.status(400).json({message:"Failure",error})
    }
}
const getusers = async(req,res)=>{
    try {
        const user = await User.findById(req.user._id);

        res.status(200).json({message:"Success",user})
    } catch (error) {
        res.status(400).json({message:"Failure",error})
    }
}
const marktask = async(req,res)=>{
    try {
        const task = await Taskmodel.findOneAndUpdate({
            _id:req.body.todo_id,
            userid:req.user._id
        },[
            {
                $set:{
                    isCompleted:{
                        $eq:[false,"$isCompleted"]
                    }
                }
            }
        ])    
        if (task) {
            res.status(200).json({message:"Success",task})
        } else {
            res.status(200).json({message:"No such task"})
        }
    } catch (error) {
        res.status(400).json({message:"Failure",error})
    }
}
const deletetask = async(req,res)=>{
    try {
        const task = await Taskmodel.findOneAndDelete({
            _id:req.params.id,
            userid:req.userid
        })   
        if (task) {
            res.status(200).json({message:"Success",task})
        } else {
            res.status(200).json({message:"No such task"})
        }
    } catch (error) {
        res.status(400).json({message:"Failure",error})
    }
}
module.exports = {CreateTask,GetTask,CreateList,getusers,marktask,deletetask}