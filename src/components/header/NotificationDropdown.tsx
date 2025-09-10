"use client";
import getRole from "@/helper/cookie/getrole";
import getCookie from "@/helper/cookie/gettooken";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import timeAgo from "../../helper/timeAgo";
import { Dropdown } from "../ui/dropdown/Dropdown";

interface NotificationItem {
  id: number;
  employee_id: number;
  type: string;
  notification: {
    action: string;
    created_at: string;
  };
}

interface NotificationsResponse {
  unread: number;
  notifications: NotificationItem[];
}

export default function NotificationDropdown() {
  const router = useRouter();
  const token = getCookie();
  const accessRole = getRole();

  const [isOpen, setIsOpen] = useState(false);
  // const [notifying, setNotifying] = useState(true);
  const [notifications, setNotifications] = useState<NotificationsResponse | null>(null);


  /********************* Toggle dropdown *********************/
  const toggleDropdown = () => setIsOpen(prev => !prev);
  const closeDropdown = () => setIsOpen(false);

  const handleClick = () => {
    toggleDropdown();
  };


  /****************** Fetch notifications ***************/
  const getNotification = useCallback(async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/notifications`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data: NotificationsResponse = await response.json();
        setNotifications(data);
      } else {
        console.error("Failed to fetch notifications");
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  }, [token]);

  /**************** Load notifications on mount ********************/
  useEffect(() => {
    getNotification();
  }, [getNotification]);



  /************************* Mark as read *********************/
  const markAsRead = async (item: NotificationItem) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/notification/${item.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ employee_id: item.employee_id }),
        }
      );

      if (response.ok) {
        closeDropdown();

        switch (true) {

          /********* admin ********/
          case accessRole === "Admin" && item.type === "leave":
            router.push("/admin/leave/request");
            break;
          case accessRole === "Admin" && item.type === "notice":
            router.push("/admin/leave/request");
            break;
          case accessRole === "Admin" && item.type === "objection":
            router.push("/admin/objection");
            break;
          case accessRole === "Admin" && item.type === "project":
            router.push("/admin/projects");
            break;
          case accessRole === "Admin" && item.type === "register":
            router.push("/admin/employee/newuser");
            break;
          /*********** employee ************/
          case accessRole === "Employee" && item.type === "leave":
            router.push("/employee/leave/status");
            break;
          case accessRole === "Employee" && item.type === "notice":
            router.push("/employee/announcement");
            break;
          case accessRole === "Employee" && item.type === "project":
            router.push("/employee/projects/myproject");
            break;

          /*********** hr ************/
          case accessRole === "Hr" && item.type === "leave":
            router.push("/hr/leave/request");
            break;
          case accessRole === "Hr" && item.type === "notice":
            router.push("/hr/announcement");
            break;
          case accessRole === "Hr" && item.type === "register":
            router.push("/hr/employee/newuser");
            break;

          /************ project manager ***********/
          case accessRole === "Project Manager" && item.type === "leave":
            router.push("/projectmanager/leave/status");
            break;
          case accessRole === "Project Manager" && item.type === "notice":
            router.push("/projectmanager/announcement");
            break;
          case accessRole === "Project Manager" && item.type === "project":
            router.push("/projectmanager/announcement");
            break;
          case accessRole === "Project Manager" && item.type === "notice":
            router.push("/projectmanager/projects/myproject");
            break;
          default:
            router.push("/signin");
            break;
        }

        // Refresh notifications after marking as read
        getNotification();
      } else {
        console.error("Failed to update notification status");
      }
    } catch (error) {
      console.error("Error updating notification status:", error);
    }
  };



  return (
    <div className="relative">
      <button
        onClick={handleClick}
        className="relative flex items-center justify-center w-11 h-11 text-gray-500 transition-colors bg-white border border-gray-200 rounded-full hover:text-gray-700 hover:bg-gray-100 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
      >
        <span
          className={`absolute right-0 -top-1 z-10 px-1 text-xs text-white rounded-full bg-red-600 translate-x-[40%] ${notifications?.unread ? "flex" : "hidden"
            }`}
        >
          {notifications?.unread}
        </span>
        <svg
          className="fill-current"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M10.75 2.29248C10.75 1.87827 10.4143 1.54248 10 1.54248C9.58583 1.54248 9.25004 1.87827 9.25004 2.29248V2.83613C6.08266 3.20733 3.62504 5.9004 3.62504 9.16748V14.4591H3.33337C2.91916 14.4591 2.58337 14.7949 2.58337 15.2091C2.58337 15.6234 2.91916 15.9591 3.33337 15.9591H4.37504H15.625H16.6667C17.0809 15.9591 17.4167 15.6234 17.4167 15.2091C17.4167 14.7949 17.0809 14.4591 16.6667 14.4591H16.375V9.16748C16.375 5.9004 13.9174 3.20733 10.75 2.83613V2.29248ZM14.875 14.4591V9.16748C14.875 6.47509 12.6924 4.29248 10 4.29248C7.30765 4.29248 5.12504 6.47509 5.12504 9.16748V14.4591H14.875ZM8.00004 17.7085C8.00004 18.1228 8.33583 18.4585 8.75004 18.4585H11.25C11.6643 18.4585 12 18.1228 12 17.7085C12 17.2943 11.6643 16.9585 11.25 16.9585H8.75004C8.33583 16.9585 8.00004 17.2943 8.00004 17.7085Z"
            fill="currentColor"
          />
        </svg>
      </button>

      <Dropdown
        isOpen={isOpen}
        onClose={closeDropdown}
        className="absolute -right-[240px] mt-[17px] flex h-[480px] w-[350px] flex-col rounded-2xl border border-gray-200 bg-white p-3 shadow-theme-lg dark:border-gray-800 dark:bg-gray-dark sm:w-[361px] lg:right-0"
      >
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-gray-100 dark:border-gray-700">
          <h5 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Notification</h5>
          <button
            onClick={toggleDropdown}
            className="text-gray-500 transition hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <svg
              className="fill-current"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6.21967 7.28131C5.92678 6.98841 5.92678 6.51354 6.21967 6.22065C6.51256 5.92775 6.98744 5.92775 7.28033 6.22065L11.999 10.9393L16.7176 6.22078C17.0105 5.92789 17.4854 5.92788 17.7782 6.22078C18.0711 6.51367 18.0711 6.98855 17.7782 7.28144L13.0597 12L17.7782 16.7186C18.0711 17.0115 18.0711 17.4863 17.7782 17.7792C17.4854 18.0721 17.0105 18.0721 16.7176 17.7792L11.999 13.0607L7.28033 17.7794C6.98744 18.0722 6.51256 18.0722 6.21967 17.7794C5.92678 17.4865 5.92678 17.0116 6.21967 16.7187L10.9384 12L6.21967 7.28131Z"
                fill="currentColor"
              />
            </svg>
          </button>
        </div>

        <ul className="flex flex-col h-auto overflow-y-auto custom-scrollbar">
          {notifications?.notifications?.length ? (
            notifications.notifications.map((item) => (
              <li
                key={item.id}
                onClick={() => markAsRead(item)}
                className="flex gap-3 items-center rounded-lg border-b border-gray-100 p-3 hover:bg-gray-100 dark:border-gray-800 dark:hover:bg-white/5 cursor-pointer"
              >
                <span className="relative block w-10 h-10 rounded-full bg-gray-400"></span>
                <div className="flex flex-col">
                  <span className="font-medium text-gray-800 dark:text-white/90">
                    {item.notification.action}
                  </span>
                  <span className="flex items-center gap-2 text-gray-500 text-theme-xs dark:text-gray-400">
                    <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                    <span>{timeAgo(item.notification.created_at)}</span>
                  </span>
                </div>
                {
                  item?.is_open
                    ? <span></span>
                    : <span className="bg-red-600 w-[10px] ml-8 h-[10px] rounded-full"></span>
                }
              </li>
            ))
          ) : (
            <li className="text-center text-gray-500 p-3">No notifications</li>
          )}
        </ul>

        <div
          className="block px-4 py-2 mt-3 text-sm font-medium text-center text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
        >
          View All Notifications
        </div>
      </Dropdown>
    </div >
  );
}
