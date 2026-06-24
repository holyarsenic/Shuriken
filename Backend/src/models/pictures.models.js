import mongoose, {Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const picturesSchema = new Schema(
  {

    pictureFile:{
      type: String, //cld
      required: true,
    },
    title:{
      type: String,
      required: true
    },
    discription:{
      type: String,
      required: true
    },
    likes:{
      type:Number,
      default:0
    },
    views:{
      type:Number,
      default:0
    },
    isPublished:{
      type:Boolean,
      default:true
    },
    owner:{
      type: Schema.Types.ObjectId,
      ref: "User"
    }

  },{timestamps:true}
);

picturesSchema.plugin(mongooseAggregatePaginate);

export const Pictures = mongoose.model("Pictures", picturesSchema);