import FilterSearch from "@/components/common/FilterSearch";
import Image from "next/image";
import Link from "next/link";
import profileimg from "../../../../../../public/images/user/user-06.jpg";
import PageBreadcrumb from "../../../../../components/common/PageBreadCrumb";

const AllEmployee = () => {
    return (
        <div>
            <div>
                <PageBreadcrumb pageTitle={"All Employee"}>
                    <FilterSearch />
                </PageBreadcrumb>
                <div className="relative overflow-x-auto rounded-md">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="p-4">
                                    SL
                                </th>
                                <th scope="col" className="p-4">
                                    ID
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Position
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Check In
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Check Out
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Date
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>



                            {
                                Array.from({ length: 12 }).map((item, index) => {
                                    return (
                                        <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                                            <td className="w-4 p-4">
                                                {index + 1}
                                            </td>
                                            <td>1000{index}</td>
                                            <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                                <Image className="w-10 h-10 rounded-full" src={profileimg} alt="Jese image" />
                                                <div className="ps-3">
                                                    <div className="text-base font-semibold">Neil Sims</div>
                                                    <div className="font-normal text-gray-500">emonhossen@Sardarit.com</div>
                                                </div>
                                            </th>
                                            <td className="px-6 py-4">
                                                React Developer
                                            </td>
                                            <td className="px-6 py-4">
                                                Sep 20, 2024 - 08:45 AM
                                            </td>
                                            <td className="px-6 py-4">
                                                Sep 20, 2024 - 05:45 PM
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center">
                                                    <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div> Online
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <Link href="/admin/employee/attendance/1" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit user</Link>
                                            </td>
                                        </tr>
                                    )
                                })
                            }

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default AllEmployee;