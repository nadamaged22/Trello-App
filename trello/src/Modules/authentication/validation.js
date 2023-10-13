import joi from "joi"
export const signup=joi.object({
    FirstName:joi.string().min(3).max(20),
    LastName:joi.string().min(3).max(20),
    userName:joi.string().alphanum().min(3).max(20).required(),
    email:joi.string().email({minDomainSegments:2,maxDomainSegments:4,tlds:{allow:['edu','com','net','eg']}}).required(),
    password:joi.string().pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/)).required(),
    cpassword:joi.string().valid(joi.ref("password")).required(),
    gender:joi.string(),//can i check if the entered is one from the three male,female,not spacified ,before it enter database?
    age:joi.number().positive().integer().min(19).max(90),
    phone:joi.string().max(11), //will i make verify on that only
    flag:joi.boolean().required()
}).required()// what is the difference between that one and the one after username
export const login =joi.object({
    email:joi.string().email({minDomainSegments:2,maxDomainSegments:4,tlds:{allow:['edu','com','net','eg']}}).required(),
    password:joi.string().pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/)).required()
})