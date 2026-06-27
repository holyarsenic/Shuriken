import mongoose, {Schema} from "mongoose";

const playlistSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    Posts: [
        {
            type: Schema.Types.ObjectId,
            ref: "Post"
        }
    ],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
}, {timestamps: true})



export const Playlist = mongoose.model("Playlist", playlistSchema)