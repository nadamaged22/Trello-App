export const asyncHandler=(fn)=>{
    return(req,res,next)=>{
        return fn(req,res,next).catch(error=>{
            return next(new Error(error))
        })
    }
}
export const globalErrorHandling= (error,req,res,next)=>{
    return res.status(error.cause||400).json({message:"error",msgError:error.message})
}