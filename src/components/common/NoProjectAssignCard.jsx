'use client'

import { useRouter } from "next/navigation";
import BackBtn from "./BackBtn";

export default function NoProjectAssignCard() {

    const router = useRouter();

    return (
        <div className="flex items-center justify-center h-64">
            <div className="max-w-sm w-full bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 text-center transition duration-300">
                <div className="flex justify-center mb-4">
                    {/* Icon */}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-12 w-12 text-gray-400 dark:text-gray-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.5}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 6v6h4.5m4.5 6.75A2.25 2.25 0 0118.75 21H5.25A2.25 2.25 0 013 18.75V5.25A2.25 2.25 0 015.25 3h7.5L21 11.25v7.5z"
                        />
                    </svg>
                </div>
                {/* Title */}
                <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">
                    No Project Assigned
                </h2>
                {/* Description */}
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
                    You currently have no assigned project. Please wait for the manager to assign one.
                </p>
                {/* Action Button */}
                <div className="flex items-center justify-center mt-3 gap-3">
                    <BackBtn />
                    <button onClick={() => { router.refresh() }} className="px-4 py-2 bg-blue-600 text-white text-sm rounded-xl hover:bg-blue-700 transition">
                        Refresh
                    </button>
                </div>
            </div>
        </div>
    );
}
