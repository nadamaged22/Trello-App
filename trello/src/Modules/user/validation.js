import joi from 'joi'
export const ChangePassword=joi.object({
    password:joi.string().pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/)).required()
})
export const updateuser =joi.object({
    FirstName:joi.string().min(3).max(20),
    LastName:joi.string().min(3).max(20),
    age:joi.number().positive().integer().min(19).max(90),
}).required()
