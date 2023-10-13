import mongoose,{Schema,model} from "mongoose";
const taskSchema=new Schema({
    title:{
        type:String,
        required:true,
        tirm:true,

    },
    description:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:['to do','done','doing','Not specified'],
        default:'Not specified'
    },
    UserId:{
        type:Schema.Types.ObjectId,
        ref:'User',
    },
    assignTo:{
        type:String
    },
    deadline:{
        type:Date
    }

},{timestamps:true})
export const TaskModel=mongoose.model('Task',taskSchema)