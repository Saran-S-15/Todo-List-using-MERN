import mongoose from "mongoose";

const Schema = new mongoose.Schema({
    Todo:{
        type:String,
        required:true
    }
}, {timestamps:true});

const Todo_Model = mongoose.model("Todo List", Schema);

export default Todo_Model;