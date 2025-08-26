'use client';
import { FaShekelSign } from "react-icons/fa";
import formatTime from "../../helper/formateTime";

const ShiftCard = ({ name, description, id, onDelete, lTime, sTime, eTime }) => {

    return (
        <div className="relative max-w-sm rounded-2xl shadow-md p-5 bg-white dark:bg-gray-800 transition-colors duration-300 col-span-1">
            {/* Delete Button */}
            <button
                onClick={(e) => { onDelete(e, id) }}
                className="absolute top-3 right-3 p-1.5 rounded-full bg-red-100 hover:bg-red-200 dark:bg-red-900 dark:hover:bg-red-800 transition-colors"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-red-600 dark:text-red-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>

            {/* Content */}
            <div className="flex items-center gap-4">
                {/* Icon */}
                <div className="p-3 rounded-full bg-gray-100 dark:bg-gray-700">
                    <FaShekelSign />
                </div>

                {/* Department Info */}
                <div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                        Shift Name: {name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        {description}
                    </p>
                    <div className="flex flex-col">
                        <div className="flex items-center gap-3">
                            <span>
                                Grace Time:
                            </span>
                            <span>{lTime}</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <span>
                                Shift Start Time:
                            </span>
                            <span>{formatTime(sTime)}</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <span>
                                Shift End Time:
                            </span>
                            <span>{formatTime(eTime)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ShiftCard;