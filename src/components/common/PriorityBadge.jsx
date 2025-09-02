"use client";

export default function PriorityBadge({ priority }) {
    const priorityColors = {
        Low: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
        Medium: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
        High: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
    };

    return (
        <span
            className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium shadow-sm
      ${priorityColors[priority] || "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"}`}
        >
            {priority}
        </span>
    );
}
