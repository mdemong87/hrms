'use client'

import { useRouter } from "next/navigation";
import ReloadBtn from "../../components/common/ReloadBtn";
import BackBtn from "./BackBtn";

export default function NoDataFoundCard() {

    const router = useRouter();

    return (
        <div className="flex items-center justify-center min-h-[300px] w-full my-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 w-full text-center border border-gray-200 dark:border-gray-700">
                {/* Icon */}
                <div className="flex items-center justify-center w-16 h-16 mx-auto bg-gray-100 dark:bg-gray-700 rounded-full">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8 text-gray-400 dark:text-gray-300"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 13h6m-3-3v6m9-6a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                </div>

                {/* Title */}
                <h2 className="mt-4 text-lg font-semibold text-gray-700 dark:text-gray-200">
                    No Data Record Found
                </h2>

                {/* Description */}
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    We could not find any records to display. Try adjusting your filters or
                    check back later.
                </p>

                {/* Action Button */}
                <div className="flex justify-center mt-8 items-center gap-2">
                    <BackBtn />
                    <ReloadBtn />
                </div>
            </div>
        </div>
    );
}
