'use client'

import { useRouter } from "next/navigation";
import { IoMdArrowRoundBack } from "react-icons/io";


const BackBtn = () => {

    const router = useRouter();

    return (
        <button onClick={() => { router.back() }} className="border w-fit border-gray-300 dark:border-gray-700 bg-gray-200 dark:bg-gray-700 rounded-lg py-2 px-3 text-gray-900 dark:text-white flex items-center gap-2 font-medium">
            <IoMdArrowRoundBack className="text-md" />
            <span className="text-sm">Back</span>
        </button>
    )
}

export default BackBtn;