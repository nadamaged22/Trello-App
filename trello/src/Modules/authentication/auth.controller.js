import { UserModel } from "../../../DB/model/user.model.js"
import bcrypt from 'bcryptjs'
import { asyncHandler } from "../../utils/ErrorHandling.js"
import Jwt  from "jsonwebtoken"
import { mailsender } from "../../utils/mail.js"


export const signup=asyncHandler(async(req,res,next)=>{
    const{FirstName,LastName,userName,email,password,age,gender,phone}=req.body
    const userCheck= await UserModel.findOne({email})
    if(userCheck){
        return next(new Error("Email Exist!",{cause:409}))
    }
    const hashedpassword=bcrypt.hashSync(password,parseInt(process.env.SALT_ROUND))
    const user=await UserModel.create({FirstName,LastName,userName,email,password:hashedpassword,age,gender,phone})
    const token=Jwt.sign({id:user._id,email:user.email},process.env.EMAIL_SIGNATURE,{expiresIn:60*5})
    const newRequestToken=Jwt.sign({id:user._id,email:user.email},process.env.EMAIL_SIGNATURE,{expiresIn:60*60*24*30})
    const link =`${req.protocol}://${req.headers.host}/auth/confirmEmail/${token}`
    const confirmLink=`${req.protocol}://${req.headers.host}/auth/newConfirmEmail/${newRequestToken}`
    const html=`<a href="${link}">Confirm Email</a>           
    <br>
    <br>
    <a href="${confirmLink}">Request New Confirm Email </a>`

    await mailsender({to:email,subject:"Confirmation Mail",html})
    return res.status(201).json({message:"SIGNUP SUCCESS!",user})
})
export const confirmEmail=asyncHandler(async(req,res,next)=>{
    const {token}=req.params
    const decode=Jwt.verify(token,process.env.EMAIL_SIGNATURE)
    const user=await UserModel.findByIdAndUpdate(decode.id,{confirmEmail:true})
    return user ? res.json({message:"DONE"})
     :next(new Error ("NOT REGISTER ACCOUNT!"),{cause:404}) //this message appear if you delete your account or something and then enter the confirm email 
})
export const newConfirmEmail=asyncHandler(async(req,res,next)=>{
    const {token}=req.params
    const decode=Jwt.verify(token,process.env.EMAIL_SIGNATURE)
    const user=await UserModel.findById(decode.id)
    if(!user){
        return next(new Error ("NOT REGISTER ACCOUNT!"),{cause:404})
    }
    if(user.confirmEmail){
        return res.json({message:"ALRAEDY EXIST! PLEASE LOGIN"})
    }
    const newToken=Jwt.sign({id:user._id,email:user.email},process.env.EMAIL_SIGNATURE,{expiresIn:60*2})
        const link =`${req.protocol}://${req.headers.host}/auth/confirmEmail/${newToken}` //(confirm email written at the last is the message appear in the mail)
        const html=`<a href="${link}">Confirm Email</a>`
        await mailsender({to:user.email,subject:"confirmation Email ",html})
        return res.json({message:"check your inbox"})
   
})
export const Login=asyncHandler(async(req,res,next)=>{
    const{email,password}=req.body
    const user= await UserModel.findOne({email})
    if(!user){
        return next(new Error("Email not Exist!",{cause:404}))
    }
    const match=bcrypt.compareSync(password,user.password)
   if(!match){
    return next (new Error("Invalid-Data",{cause:404}))
   }
   if(user.confirmEmail){
    const token =Jwt.sign({
        userName:user.userName,id:user._id},process.env.TOKEN_SIGNATURE,
        {expiresIn:'1d'}//the duration the token will expire in
    )
    
        return res.status(200).json({message:"LOGIN SUCCESS!",token})
   }
   return next(new Error ("PLESAE CONFIRM YOUR EMIAL FIRST!"))
})