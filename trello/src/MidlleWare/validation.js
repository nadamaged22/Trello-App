export const validation =(schema)=>{
    return(req,res,next)=>{
        const dataMethods={...req.body,...req.query}
        const validationResult=schema.validate(dataMethods,{abortEarly:false})
        if(validationResult.error){
            return res.json({message:"VALIDATION ERROR",validationERR:validationResult.error})
        }
        return next()
    }
}
