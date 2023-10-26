const express = require("express");
const { RegisterUser,login } = require("../Controller/UserHandle");

const Router = express.Router();

Router.post('/Register',RegisterUser)
Router.post('/login',login)




module.exports=  Router;