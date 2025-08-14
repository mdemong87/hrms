'use client'
import { useRouter } from 'next/navigation';

const UnderDevelopment = () => {


    const router = useRouter();

    return (
        <div className="w-full  min-h-[700px] h-full flex items-center justify-center">
            <div className="w-fit h-fit text-center bg-gray-100 dark:bg-gray-800 border border-gray-500 rounded-xl p-8 ">
                <h2 className="text-2xl text-gray-500">This page is Under Development</h2>
                <p className="text-xl pt-3 text-gray-500">Page will be added soon</p>

                <button onClick={() => router.back()} className="bg-blue-600 text-white text-sm py-2 rounded-md px-5 mt-5">Go Back</button>
            </div>
        </div>
    )
}

export default UnderDevelopment;