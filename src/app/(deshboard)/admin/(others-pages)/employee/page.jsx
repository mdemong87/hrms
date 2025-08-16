import FilterSearch from "@/components/common/FilterSearch";
import Image from "next/image";
import Link from "next/link";
import { GrView } from "react-icons/gr";
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
                                    Email
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Department
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Employee Type
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Date of Birth
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Position
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Level / Grade
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    View Full
                                </th>
                            </tr>
                        </thead>
                        <tbody>



                            {
                                Array.from({ length: 12 }).map((item, index) => {
                                    return (
                                        <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-600 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                                            <td className="w-4 p-4">
                                                {index + 1}
                                            </td>
                                            <td>1000{index}</td>
                                            <th scope="row" className="flex items-center px-6 py-4 text-gray-700 whitespace-nowrap dark:text-gray-300">
                                                <Image className="w-10 h-10 rounded-full" src={profileimg} alt="Jese image" />
                                                <div className="ps-3">
                                                    <div className="text-base font-semibold">Neil Sims</div>
                                                </div>
                                            </th>
                                            <td className="px-6 py-4">
                                                emonhossen@Sardarit.com
                                            </td>
                                            <td className="px-6 py-4">
                                                Custom Code
                                            </td>
                                            <td className="px-6 py-4">
                                                Full Time
                                            </td>
                                            <td className="px-6 py-4">
                                                20-04-2008
                                            </td>
                                            <td className="px-6 py-4">
                                                Full Stack Developer
                                            </td>
                                            <td className="px-6 py-4">
                                                Mid Level-G2
                                            </td>
                                            <td className="px-6 py-4">
                                                <Link className="underline flex gap-1 items-center flex-col text-gray-700 dark:text-gray-300" href={`/admin/employee/1`}>
                                                    <GrView className="" />
                                                    <span>view</span>
                                                </Link>
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