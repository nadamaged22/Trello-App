import {v2 as cloudinary} from 'cloudinary';
import * as dotenv from 'dotenv'
dotenv.config()        
cloudinary.config({ 
  cloud_name: process.env.cloud_name, 
  api_key: process.env.api_key, 
  api_secret: process.env.api_secret,
  secure:true 
})
export default cloudinary