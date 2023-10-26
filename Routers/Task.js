const express = require("express");
const { CreateTask,GetTask,CreateList,getusers ,marktask,deletetask} = require("../Controller/TaskHandleer.js");
const { getuser } = require("../auth/auth.js");

const TaskRouter = express.Router();

TaskRouter.get('/getuser',getuser,getusers)
TaskRouter.post('/CreateTask/:i',getuser,CreateTask)
TaskRouter.post('/list',getuser,CreateList)
TaskRouter.get('/getTasks',getuser,GetTask)
TaskRouter.put('/mark',getuser,marktask)
TaskRouter.delete('/deltask/:id',getuser,deletetask)




module.exports=  TaskRouter;