import { isValidObjectId } from "mongoose";
import { Notification } from "../models/notification.models.js";
import { User } from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asynchandler.js";


const saveFcmToken = asyncHandler(async (req, res) => {

    const { token } = req.body;

    if (!token) {
        throw new ApiError(400, "FCM token is required");
    }

    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                fcmToken: token
            }
        }
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            {},
            "FCM token saved successfully"
        )
    );

});


const getAllNotification = asyncHandler(async (req, res) => {

    const { page = 1, limit = 30 } = req.query;

    const notifications = await Notification.aggregate([

        {
            $match: {
                receiver: req.user._id
            }
        },

        {
            $lookup: {
                from: "users",
                localField: "sender",
                foreignField: "_id",
                as: "sender",

                pipeline: [
                    {
                        $project: {
                            userName: 1,
                            avatar: 1,
                            fullName: 1
                        }
                    }
                ]
            }
        },

        {
            $addFields: {
                sender: {
                    $first: "$sender"
                }
            }
        },

        {
            $project: {
                title: 1,
                body: 1,
                type: 1,
                data: 1,
                isRead: 1,
                createdAt: 1,
                sender: 1
            }
        },

        {
            $sort: {
                createdAt: -1
            }
        },

        {
            $skip: (Number(page) - 1) * Number(limit)
        },

        {
            $limit: Number(limit)
        }

    ]);

    return res.status(200).json(
        new ApiResponse(
            200,
            notifications,
            "Notifications fetched successfully"
        )
    );

});

const markNotificationAsRead = asyncHandler(async(req, res) => {
  const { notificationId } = req.params;

  if(!isValidObjectId( notificationId )){
    throw new ApiError(400, "Invalid notification id");
  }

  const notification = await Notification.findOneAndUpdate(
    {
      _id: notificationId,
      receiver: req.user._id
    },

    {
      $set:{
        isRead: true
      }
    },
    
    {
        new: true
    }
  )


  if (!notification) {
      throw new ApiError(404, "Notification not found");
  }

    return res.status(200).json(
        new ApiResponse(
            200,
            notification,
            "Notification marked as read successfully"
        )
    );

})

const markAllNotificationsAsRead = asyncHandler(async (req, res) => {

    await Notification.updateMany(
        {
            receiver: req.user._id,
            isRead: false
        },
        {
            $set: {
                isRead: true
            }
        }
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            {},
            "All notifications marked as read"
        )
    );

});

const deleteNotification = asyncHandler(async (req, res) => {

    const { notificationId } = req.params;

    if (!isValidObjectId(notificationId)) {
        throw new ApiError(400, "Invalid notification id");
    }

    const notification = await Notification.findOneAndDelete({
        _id: notificationId,
        receiver: req.user._id
    });

    if (!notification) {
        throw new ApiError(404, "Notification not found");
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            {},
            "Notification deleted successfully"
        )
    );

});

export {
  saveFcmToken,
    getAllNotification,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    deleteNotification
};