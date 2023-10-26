const mongoose = require('mongoose');
    const schema = mongoose.Schema({
        name:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true
        },
        lists:[{
            sq: {
                type: Number,
            },
            tasks:[{
                type:mongoose.Schema.Types.ObjectId,
                ref:"Tasks"
            }]
        }],
        password:{
            type:String,
            required:true
        }
    })

module.exports = mongoose.model("User",schema);