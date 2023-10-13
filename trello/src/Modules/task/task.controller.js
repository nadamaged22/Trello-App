import { TaskModel } from "../../../DB/model/task.model.js";
import { UserModel } from "../../../DB/model/user.model.js";
import { asyncHandler } from "../../utils/ErrorHandling.js";
import Jwt from "jsonwebtoken";


export const addtask=asyncHandler((async(req,res,next)=>{
    const {autherization}=req.headers
    const token=autherization.split(process.env.TOKEN_BEARER)[1]
    const decode=Jwt.verify(token,process.env.TOKEN_SIGNATURE)
    const{title,description,status,deadline}=req.body
    const task=await TaskModel.create({title,description,status,deadline,UserId:decode.id})

    return res.status(200).json({message:"task added success",task})
}))
export const updatetask=asyncHandler((async(req,res,next)=>{//the same user token must be loged in,make a post first to can make an update
    const{autherization}=req.headers
    const token=autherization.split(process.env.TOKEN_BEARER)[1]
    const decode=Jwt.verify(token,process.env.TOKEN_SIGNATURE)
    const {title,description,status,assignTo}=req.body
    const{_id}=req.params
    const task =await TaskModel.findOneAndUpdate({_id,UserId:decode.id},{title,description,status,assignTo},{new:true})
    const assign=await UserModel.findOne({email:assignTo})
    if(assign && task ){
        return res.status(200).json({message:"UPDATED TASK SUCCESS AND ASSIGNED TO",assignTo,task})
    }
    if(!assign){
        return next(new Error("USER EMAIL IS NOT FOUND!",{cause:404}))
    }
    if(!task){
        return next(new Error("YOU ARE NOT AUTHERIZED!",{cause:404}))
    }
}))
export const deletetask=asyncHandler((async(req,res,next)=>{
    const{autherization}=req.headers
   const token=autherization.split(process.env.TOKEN_BEARER)[1]
    const decode=Jwt.verify(token,process.env.TOKEN_SIGNATURE)
    const{_id}=req.params
    const deletedtask=await TaskModel.findOneAndDelete({_id,UserId:decode.id})
    if(!deletedtask){
        return next(new Error("TASK NOT FOUND!",{cause:404}))
    }
    res.json({message:"TASK DELETED SUCCSSES"})
}))
export const getalltasks=asyncHandler((async(req,res,next)=>{
    const tasks=await TaskModel.find().populate([{
        path:"UserId"
    }])
    res.json({message:"DONE",tasks})
}))
export const getusertasks=asyncHandler((async(req,res,next)=>{//user must be loged in
    const{autherization}=req.headers
    const token=autherization.split(process.env.TOKEN_BEARER)[1]
    const decode=Jwt.verify(token,process.env.TOKEN_SIGNATURE)
    const usertasks=await TaskModel.find({UserId:decode.id}).populate([{
        path:"UserId"
    }])
    res.json({messsage:"DONE",usertasks})
}))
export const getusertaskswithid=asyncHandler((async(req,res,next)=>{//user dont have to be loged in
    const{autherization}=req.headers
    const token=autherization.split(process.env.TOKEN_BEARER)[1]
    const decode=Jwt.verify(token,process.env.TOKEN_SIGNATURE)
    const{_id}=req.params
    const usertasks=await TaskModel.find({UserId:_id}).populate([{
        path:"UserId"
    }])
    res.json({messsage:"DONE",usertasks})
}))
export const tasksnotdone=asyncHandler((async(req,res,next)=>{
    const{autherization}=req.headers
    const token=autherization.split(process.env.TOKEN_BEARER)[1]
    const decode=Jwt.verify(token,process.env.TOKEN_SIGNATURE)
    const date=new Date()
    const task=await TaskModel.find({$or:[{status:'doing'},{status:'to do'}]}&&{deadline:{$lt:date}})
    return res.json({message:"done",task})
}))