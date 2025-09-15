'use client'

import { useRouter } from "next/navigation";
import { TbReload } from "react-icons/tb";

const ReloadBtn = () => {

    const router = useRouter();

    return (
        <button onClick={() => { router.refresh() }} className="border w-fit border-gray-300 dark:border-gray-700 bg-blue-600 dark:bg-gray-700 rounded-lg py-2 px-3 text-white dark:text-white flex items-center gap-2 font-medium">
            <span className="text-sm">Reload</span>
            <TbReload className="text-md" />
        </button>
    )
}

export default ReloadBtn;