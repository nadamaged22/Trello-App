
import userRouter from './Modules/user/user.routes.js'
import authRouter from './Modules/authentication/auth.routes.js'
import taskRouter from './Modules/task/task.routes.js'
import { globalErrorHandling } from './utils/ErrorHandling.js'
import { fileURLToPath } from "url" 
import path from 'path'
const __dirname=path.dirname(fileURLToPath(import.meta.url)) 


const bootstrap=(app,express)=>{
    app.use(express.json())
    app.use('/user',userRouter)
    app.use('/task',taskRouter)
    app.use('/auth',authRouter)
    app.use("*",(req,res,next)=>{
        return res.json({message:"inavalid-Routing"})

    })
    app.use(globalErrorHandling)
    app.use("/uploads",express.static(path.join(__dirname,'../uploads')))

}
export default bootstrap