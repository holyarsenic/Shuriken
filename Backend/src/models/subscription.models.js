
import mongoose, {Schema} from "mongoose"

const subscriptionSchema = new Schema({
    accFollowers: {
        type: Schema.Types.ObjectId, // one who is following
        ref: "User"
    },
    accountTheyAreFollowing: {
        type: Schema.Types.ObjectId, // one to whom 'follower' is following
        ref: "User"
    }
}, {timestamps: true})



export const Subscription = mongoose.model("Subscription", subscriptionSchema)