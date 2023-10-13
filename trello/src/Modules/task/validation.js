import joi from "joi"
export const addtask=joi.object({
    title:joi.string().max(20).min(4),
    description:joi.string().max(100).min(5),
    status:joi.string(),
    deadline:joi.date()
}).required()
export const updatetask=joi.object({
    title:joi.string().max(20).min(4),
    description:joi.string().max(100).min(5),
    status:joi.string(),
    assignTo:joi.string().email({minDomainSegments:2,maxDomainSegments:4,tlds:{allow:['edu','com','net','eg']}}).required()
})