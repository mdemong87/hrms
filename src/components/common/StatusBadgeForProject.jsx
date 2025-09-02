"use client";

export default function StatusBadgeForProject({ status }) {

    const statusColors = {
        "To-Do": "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-300",
        "In Progress": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
        "On Hold": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
        "Under Review": "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
        "Completed": "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
        "Delivered": "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300",
        "Cancelled": "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
    };


    return (
        <span
            className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium shadow-sm
      ${statusColors[status] || "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"}`}
        >
            {status}
        </span>
    );
}
