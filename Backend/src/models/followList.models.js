
import mongoose, {Schema} from "mongoose"

const followListSchema = new Schema({
    accFollower: {
        type: Schema.Types.ObjectId, // one who is following
        ref: "User"
    },
    accountTheyAreFollowing: {
        type: Schema.Types.ObjectId, // one to whom 'follower' is following
        ref: "User"
    }
}, {timestamps: true})



export const Follow = mongoose.model("Follow", followListSchema)