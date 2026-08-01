import { useEffect } from "react";
import Logo from "../assets/Logo.jpeg"
import { FaArrowLeftLong } from "react-icons/fa6";
import { Notification } from "../context/notification";
import { IoMdTrash } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const NotificationPage = ({ cancelButton }) => {
  const {
    notifications,
    fetchNotifications,
    markAsRead,
    markAllAsRead,
    deleteNotification,
  } = Notification();

  const navigate = useNavigate();

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  function handleNotificationClick(notificationPostId) {
    navigate(`/post/${notificationPostId}`);
  }

  function handleNotificationUserClick(notificationUserId) {
    navigate(`/c/${notificationUserId}`);
  }


  return (
    <div className="fixed top-0 right-0 lg:top-20 lg:right-20 h-screen lg:h-120 w-full lg:w-96 overflow-y-auto lg:rounded-xl bg-white dark:bg-[#0B0A10] lg:dark:bg-[#2d2944] px-4 pt-7 pb-20 lg:p-6 lg:shadow-2xl">
      <div className="mb-6 flex items-center justify-between">
        <FaArrowLeftLong
          className="cursor-pointer text-2xl text-gray-600 dark:text-white"
          onClick={() => {
            markAllAsRead();
            cancelButton();
          }}
        />

        <h1 className="text-2xl font-bold text-gray-600 dark:text-white">Notifications</h1>
      </div>

      {notifications.length === 0 ? (
       <div className={`cursor-pointer rounded-lg bg-gray-300 dark:bg-[#4A415C] p-2 transition`}>
          <div className="flex items-start justify-between gap-4">
            <img src={Logo} alt="Sender Avatar" className="h-7 w-7 rounded-full" />
            <div className="flex-1">
              <h3 className="font-semibold text-gray-600 dark:text-white">
                Hey!
              </h3>

              <p className="mt-1 text-sm text-gray-600 dark:text-white">
                Welcome to the Shuriken! This is your first notification. You can manage your notifications here.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          {notifications.map((notification) => (
            <div
              key={notification._id}
              onClick={() => {
                markAsRead(notification._id);
                if(notification.type === "like" || notification.type === "comment") {
                  handleNotificationClick(notification.data.postId);
                } else if(notification.type === "follow") {
                  handleNotificationUserClick(notification.sender.userName);
                }
              }}
              className={`cursor-pointer rounded-lg
               ${notification.isRead ? "bg-white lg:dark:bg-[#2d2944] dark:bg-[#0B0A10]" : " hover:scale-101 bg-gray-200 dark:bg-[#4A415C] dark:hover:scale-101"} p-2 transition`}
            >
              <div className="flex items-start justify-between gap-4">
                <img src={notification.sender.avatar} alt="Sender Avatar" className="h-10 w-10 rounded-full" />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-600 dark:text-white">
                    {notification.title}
                  </h3>

                  <p className="mt-1 text-sm text-gray-600 dark:text-white">
                    {notification.body}
                  </p>

                  <p className="mt-2 block text-xs text-gray-600 dark:text-white">
                   {new Date(notification.createdAt).toLocaleTimeString([], {
                      hour: "numeric",
                      minute: "2-digit",
                    })}
                  </p>
                </div>

                  <IoMdTrash onClick={(e) => {
                    e.stopPropagation();
                    deleteNotification(notification._id);
                    fetchNotifications()
                  }}
                  className="text-2xl font-medium text-gray-600 dark:text-white"/>

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotificationPage;