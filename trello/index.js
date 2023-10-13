import express from "express";
import bootstrap from "./src/index.routes.js";
import { connectionDB } from "./DB/connection.js";
import dotenv from 'dotenv'
import { mailsender } from "./src/utils/mail.js";
dotenv.config()
connectionDB()
const app=express()
bootstrap(app,express)
// await mailsender({to:"nadamaged541@gmail.com",subject:"hello",html:`<p>hello nada </p>`})


app.listen(3000,()=>{
    console.log("server is running....")
})
