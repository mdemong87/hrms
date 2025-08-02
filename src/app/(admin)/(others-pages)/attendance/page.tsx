import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Metadata } from "next";
import Image from "next/image";
import profileimg from '../../../../../public/images/user/owner.jpg';

export const metadata: Metadata = {
    title:
        "Sardar IT - HRMS",
    description: "Sardar IT - HRMS",
    // other metadata
};


export default function page() {
    return (
        <div>
            <PageBreadcrumb pageTitle="Attendance" />
            <div>


                <div className="relative overflow-x-auto rounded-md">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="p-4">
                                    SL
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Position
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Status
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td className="w-4 p-4">
                                    1
                                </td>
                                <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                    <Image className="w-10 h-10 rounded-full" src={profileimg} alt="Jese image" />
                                    <div className="ps-3">
                                        <div className="text-base font-semibold">Neil Sims</div>
                                        <div className="font-normal text-gray-500">neil.sims@flowbite.com</div>
                                    </div>
                                </th>
                                <td className="px-6 py-4">
                                    React Developer
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center">
                                        <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div> Online
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <a href="/attendance/1" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit user</a>
                                </td>
                            </tr>
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td className="w-4 p-4">
                                    2
                                </td>
                                <th scope="row" className="flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    <Image className="w-10 h-10 rounded-full" src={profileimg} alt="Jese image" />
                                    <div className="ps-3">
                                        <div className="text-base font-semibold">Bonnie Green</div>
                                        <div className="font-normal text-gray-500">bonnie@flowbite.com</div>
                                    </div>
                                </th>
                                <td className="px-6 py-4">
                                    Designer
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center">
                                        <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div> Online
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <a href="/attendance/2" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit user</a>
                                </td>
                            </tr>
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td className="w-4 p-4">
                                    3
                                </td>
                                <th scope="row" className="flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    <Image className="w-10 h-10 rounded-full" src={profileimg} alt="Jese image" />
                                    <div className="ps-3">
                                        <div className="text-base font-semibold">Jese Leos</div>
                                        <div className="font-normal text-gray-500">jese@flowbite.com</div>
                                    </div>
                                </th>
                                <td className="px-6 py-4">
                                    Vue JS Developer
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center">
                                        <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div> Online
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <a href="/attendance/3" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit user</a>
                                </td>
                            </tr>
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td className="w-4 p-4">
                                    4
                                </td>
                                <th scope="row" className="flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    <Image className="w-10 h-10 rounded-full" src={profileimg} alt="Jese image" />
                                    <div className="ps-3">
                                        <div className="text-base font-semibold">Thomas Lean</div>
                                        <div className="font-normal text-gray-500">thomes@flowbite.com</div>
                                    </div>
                                </th>
                                <td className="px-6 py-4">
                                    UI/UX Engineer
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center">
                                        <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div> Online
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <a href="/attendance/4" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit user</a>
                                </td>
                            </tr>
                            <tr className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td className="w-4 p-4">
                                    5
                                </td>
                                <th scope="row" className="flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    <Image className="w-10 h-10 rounded-full" src={profileimg} alt="Jese image" />
                                    <div className="ps-3">
                                        <div className="text-base font-semibold">Leslie Livingston</div>
                                        <div className="font-normal text-gray-500">leslie@flowbite.com</div>
                                    </div>
                                </th>
                                <td className="px-6 py-4">
                                    SEO Specialist
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center">
                                        <div className="h-2.5 w-2.5 rounded-full bg-red-500 me-2"></div> Offline
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <a href="/attendance/5" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit user</a>
                                </td>
                            </tr>
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td className="w-4 p-4">
                                    3
                                </td>
                                <th scope="row" className="flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    <Image className="w-10 h-10 rounded-full" src={profileimg} alt="Jese image" />
                                    <div className="ps-3">
                                        <div className="text-base font-semibold">Jese Leos</div>
                                        <div className="font-normal text-gray-500">jese@flowbite.com</div>
                                    </div>
                                </th>
                                <td className="px-6 py-4">
                                    Vue JS Developer
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center">
                                        <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div> Online
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <a href="/attendance/3" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit user</a>
                                </td>
                            </tr>
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td className="w-4 p-4">
                                    4
                                </td>
                                <th scope="row" className="flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    <Image className="w-10 h-10 rounded-full" src={profileimg} alt="Jese image" />
                                    <div className="ps-3">
                                        <div className="text-base font-semibold">Thomas Lean</div>
                                        <div className="font-normal text-gray-500">thomes@flowbite.com</div>
                                    </div>
                                </th>
                                <td className="px-6 py-4">
                                    UI/UX Engineer
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center">
                                        <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div> Online
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <a href="/attendance/4" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit user</a>
                                </td>
                            </tr>
                            <tr className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td className="w-4 p-4">
                                    5
                                </td>
                                <th scope="row" className="flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    <Image className="w-10 h-10 rounded-full" src={profileimg} alt="Jese image" />
                                    <div className="ps-3">
                                        <div className="text-base font-semibold">Leslie Livingston</div>
                                        <div className="font-normal text-gray-500">leslie@flowbite.com</div>
                                    </div>
                                </th>
                                <td className="px-6 py-4">
                                    SEO Specialist
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center">
                                        <div className="h-2.5 w-2.5 rounded-full bg-red-500 me-2"></div> Offline
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <a href="/attendance/5" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit user</a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    );
}


