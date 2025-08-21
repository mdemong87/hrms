'use client'

import FilterSearch from "@/components/common/FilterSearch";
import getRole from "@/helper/cookie/getrole";
import getCookie from "@/helper/cookie/gettooken";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { GrView } from "react-icons/gr";
import { IoMdAdd } from "react-icons/io";
import demoprofile from "../../../../../public/images/user/demo.jpeg";
import PageBreadcrumb from "../../../../components/common/PageBreadCrumb";
import Loading from "../../../../components/common/Loading";

const AllEmployee = () => {

    const token = getCookie();
    const accessRole = getRole()
    const [idorname, setidorname] = useState('');
    const [allemployees, setallemployees] = useState([]);



    // Fetch all Employee here
    const getAllEmployees = useCallback(async () => {
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/employees`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.ok) {
                const res = await response.json();
                setallemployees(res);
            } else {
                console.error("Failed to fetch All Employees");
            }
        } catch (error) {
            console.error("Error fetching All Employees:", error);
        }
    }, [token]);

    // Run once on component mount
    useEffect(() => {
        getAllEmployees();
    }, [getAllEmployees]);




    // add search filter functionalaty here
    const filter = allemployees?.employees?.filter(emp => emp?.fname?.toUpperCase().includes(idorname?.toUpperCase()));


    console.log(filter);




    return (
        <div>
            {{ allemployees.length === 0 && <Loading /> }}
            <div>
                <PageBreadcrumb pageTitle={"All Employee"}>
                    <div className="flex gap-3 items-center">
                        <Link className="flex items-center bg-blue-700 px-3 rounded-lg py-2 gap-1" href={`${accessRole === 'Admin' ? "/admin/employee/add" : accessRole === 'Hr' ? "/hr/employee/add" : '/signin'}`} size="sm">
                            <span>
                                Add
                            </span>
                            <IoMdAdd className="text-xl" />
                        </Link>
                        <FilterSearch seter={setidorname} />
                    </div>
                </PageBreadcrumb>
                <div className="relative overflow-x-auto rounded-md">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="p-4">
                                    SL
                                </th>
                                <th scope="col" className="p-4 text-center">
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
                                filter?.map((item, index) => {
                                    return (
                                        <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-600 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                                            <td className="w-4 p-4">
                                                {index + 1}
                                            </td>
                                            <td className="text-center">{item?.eid}</td>
                                            <th scope="row" className="flex items-center px-6 py-4 text-gray-700 whitespace-nowrap dark:text-gray-300">
                                                <Image className="w-10 h-10 rounded-full" src={item?.avatar || demoprofile} width={1000} height={1000} alt="Jese image" />
                                                <div className="ps-3">
                                                    <div className="text-base font-semibold">{item?.fname + " " + item?.lname}</div>
                                                </div>
                                            </th>
                                            <td className="px-6 py-4">
                                                {item?.email}
                                            </td>
                                            <td className="px-6 py-4">
                                                {item?.department?.name}
                                            </td>
                                            <td className="px-6 py-4">
                                                {item?.emplyeetype}
                                            </td>
                                            <td className="px-6 py-4">
                                                {item?.dob}
                                            </td>
                                            <td className="px-6 py-4">
                                                {item?.designation}
                                            </td>
                                            <td className="px-6 py-4">
                                                {item?.level}
                                            </td>
                                            <td className="px-6 py-4">
                                                <Link className="underline flex gap-1 items-center flex-col text-gray-700 dark:text-gray-300" href={`/hr/employee/${item?.id}`}>
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