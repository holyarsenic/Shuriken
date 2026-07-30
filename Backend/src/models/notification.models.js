import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const NotificationSchema = new Schema(
  {
    receiver: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    sender: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    type: {
      type: String,
      enum: ["follow", "like", "comment"],
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    body: {
      type: String,
      required: true,
    },

    data: {
      type: Object,
      default: {},
    },

    isRead: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

NotificationSchema.plugin(mongooseAggregatePaginate)

export const Notification = mongoose.model("Notification",NotificationSchema);