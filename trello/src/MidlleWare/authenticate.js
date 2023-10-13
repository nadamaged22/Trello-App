import { UserModel } from "../../DB/model/user.model.js";
import { asyncHandler } from "../utils/ErrorHandling.js";
import Jwt  from "jsonwebtoken";


export const auth=asyncHandler(async(req,res,next)=>{
    const{autherization}=req.headers
    if(!autherization?.startsWith(process.env.TOKEN_BEARER)){
        return next(new Error("AUTHERIZATION REQUIED OR IN-VALID BEARER KEY !",{case:400}))
    }
    const token=autherization.split(process.env.TOKEN_BEARER)[1]
    const decode=Jwt.verify(token,process.env.TOKEN_SIGNATURE)
    if(!token){
        return res.json({message:"TOKEN IS REQUIRED"})
    }
    if(!decode?.id){
        return next (new Error("IN_VALID TOKEN PAYLOAD",{case:400}))
    }
    const user=await UserModel.findById(decode.id)
    if(!user){
        return next (new Error("USER NOT REGISTER!"),{case:401})
    }
    req.user=user
    req.autherization=autherization
    return next()
})
