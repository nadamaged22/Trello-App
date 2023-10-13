import { UserModel } from "../../../DB/model/user.model.js";
import { asyncHandler } from "../../utils/ErrorHandling.js";
import bcrypt from 'bcryptjs'
import cloudinary from "../../utils/cloudinary.js"

export const ChangePassword=asyncHandler(async(req,res,next)=>{
    const{password}=req.body
    const{_id}=req.user
    const hashedpassword=bcrypt.hashSync(password,8)
    const user=await UserModel.findOneAndUpdate({_id},{password:hashedpassword})
    const match=bcrypt.compareSync(password,user.password)
    if(match){
        return next(new Error("PLEASE ENTER NEWER PASSWORD!",{cause:404}))
    }
     res.json({message:"UPDATED SUCCESSFULLY!",user:req.user})
})
export const updateuser=asyncHandler((async(req,res,next)=>{//in postman press two click to see the update
    const{_id}=req.user
    const{FirstName,LastName,age}=req.body
    const user =await UserModel.findByIdAndUpdate({_id},{LastName,FirstName,age},{new:true}) 
    res.json({message:"UPDATED SUCCESS!",user})
}))
export const deleteuser=asyncHandler((async(req,res,next)=>{
    const{_id}=req.params
    const usercheck=await UserModel.findById({_id})
    const deleteduser=await UserModel.findByIdAndDelete({_id})
    if(!usercheck){
        return res.json({message:"USER NOT EXIST!"})
    }
    res.json({message:"USER DELETED SUCCESS!",deleteduser})
}))
export const logout=asyncHandler((async(req,res,next)=>{//check again
    // const{autherization}=req.headers
    req.user.tokens=req.user.tokens.filter(autherization=>autherization!== req.autherization)
    // const token=await UserModel.create({autherization})
    res.json({message:"LOGED OUT",user:req.user})
}))
export const UpdateProfilePic=asyncHandler(async(req,res,next)=>{
    const{secure_url,public_id}=await cloudinary.uploader.upload(req.file.path,{folder:`TrelloUser/${req.user._id}/profilePIC`})
    const user=await UserModel.findByIdAndUpdate(req.user._id,
        {profilephoto:{secure_url,public_id}},{new:false})
        await cloudinary.uploader.destroy(user.profilephoto.public_id)
        return res.json({message:"DONE",user,file:req.file})
})
export const UpdateCoverPhoto=asyncHandler(async(req,res,next)=>{
    const coverphoto=[]
    for(const file of req.files){
        const{secure_url,public_id}=await cloudinary.uploader.upload(file.path,{folder:`TrelloUser/${req.user._id}/coverPIC`})
        coverphoto.push({secure_url,public_id})

    }
    const user=await UserModel.findByIdAndUpdate(req.user._id,
        {coverphoto},{new:true})
        return res.json({message:'DONE',file:req.file,user})
})