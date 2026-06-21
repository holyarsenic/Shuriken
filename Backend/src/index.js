import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDb from "./db/index.js";
import dns from "dns";
import { app } from "./app.js";

dns.setServers([
  '1.1.1.1',
  '8.8.8.8'
])

dotenv.config({
  path: './env'
})


connectDb()
.then(() => {
  app.listen(process.env.PORT || 8000, ()=>{
    console.log(`Server is Running at Port: ${process.env.PORT}`)
  })
})
.catch((err) =>{
  console.log("MONGDB connection failed !!!", err);
})
