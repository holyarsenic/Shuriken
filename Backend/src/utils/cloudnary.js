import { v2 as cloudinary } from 'cloudinary';
import fs from "fs";

    cloudinary.config({ 
        cloud_name: process.env.CLOUDNARY_CLOUD_NAME, 
        api_key: process.env.CLOUDNARY_API_KEY, 
        api_secret: process.env.CLOUDNARY_API_SECRET 
    });

    const uploadOnCloudnary = async (localFilePath) => {
      try {
        if (!localFilePath) return null;
        //upload file on cd
        const response = await cloudinary.uploader.upload(localFilePath, {
          resource_type:"auto"
        })
        //upload success
        fs.unlinkSync(localFilePath)
        return response;
      } catch (error) {
        fs.unlinkSync(localFilePath) //remove file if uploadation failed
        return null;
      }
    }


    export {uploadOnCloudnary} 