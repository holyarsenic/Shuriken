import mongoose, {Schema} from "mongoose";


const likeSchema = new Schema({
    post: {
        type: Schema.Types.ObjectId,
        ref: "Post"
    },
    comment: {
        type: Schema.Types.ObjectId,
        ref: "Comment"
    },
    likedBy: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    isLiked: {
        type: Boolean,
        default: false
    }

}, {timestamps: true})

likeSchema.index({ post: 1, likedBy: 1 }, { unique: true });

export const Like = mongoose.model("Like", likeSchema)