import mongoose, {Schema} from "mongoose";

const Pictures = new Schema(
  {

    likes:{
      type:Number
    },
    views:{
      type:Number
    },
    

  },{timestamps:true}
);
