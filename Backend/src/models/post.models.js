import mongoose, {Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const postSchema = new Schema(
  {

    postFile:{
      type: String, //cld
      required: true,
    },
    title:{
      type: String,
      required: true
    },
    description:{
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

postSchema.plugin(mongooseAggregatePaginate);

export const Post = mongoose.model("Post", postSchema);