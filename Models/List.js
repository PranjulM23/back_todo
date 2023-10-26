const mongoose = require("mongoose")

const schema = mongoose.Schema({
    lists:[{
        sq: {
            type: Number,
        },
        tasks:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Tasks"
        }],
    }],
})

module.exports=mongoose.model("List",schema);