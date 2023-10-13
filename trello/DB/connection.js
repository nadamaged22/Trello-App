import mongoose from 'mongoose'
export const connectionDB=async()=>{
    return await mongoose.connect(process.env.DB_URL)
    .then((res)=>{
        console.log("DB connection Success")
    }).catch((err)=>{
        console.log("DB connection Failed",err)
    })
    
}