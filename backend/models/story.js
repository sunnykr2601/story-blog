const mongoose =
require("mongoose");

const storySchema= new mongoose.Schema({
    title:{
        type: String,
        required:true,
    },
    content:{
        type: String,
        required:true,
    },
    author:{
        type: String,
        required:true,
    },
});
const Story= mongoose.model("story",
storySchema);
module.exports=Story;