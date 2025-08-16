'use client'

import FilterSearch from "@/components/common/FilterSearch";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { GrView } from "react-icons/gr";
import profileimg from "../../../../../../public/images/user/user-06.jpg";
import PageBreadcrumb from "../../../../../components/common/PageBreadCrumb";

const AllEmployee = () => {

    const employees = [
        {
            sl: 1,
            id: 10000,
            name: "Neil Sims",
            email: "neil.sims@example.com",
            department: "Custom Code",
            employeeType: "Full Time",
            dateOfBirth: "20-04-1990",
            position: "Full Stack Developer",
            levelGrade: "Mid Level - G2",
        },
        {
            sl: 2,
            id: 10001,
            name: "Emma Johnson",
            email: "emma.johnson@example.com",
            department: "Design",
            employeeType: "Part Time",
            dateOfBirth: "15-07-1992",
            position: "UI/UX Designer",
            levelGrade: "Entry Level - G1",
        },
        {
            sl: 3,
            id: 10002,
            name: "Liam Brown",
            email: "liam.brown@example.com",
            department: "Marketing",
            employeeType: "Full Time",
            dateOfBirth: "05-03-1988",
            position: "Marketing Specialist",
            levelGrade: "Mid Level - G2",
        },
        {
            sl: 4,
            id: 10003,
            name: "Olivia Wilson",
            email: "olivia.wilson@example.com",
            department: "HR",
            employeeType: "Full Time",
            dateOfBirth: "12-12-1995",
            position: "HR Manager",
            levelGrade: "Senior Level - G3",
        },
        {
            sl: 5,
            id: 10004,
            name: "Noah Davis",
            email: "noah.davis@example.com",
            department: "Finance",
            employeeType: "Full Time",
            dateOfBirth: "28-09-1985",
            position: "Accountant",
            levelGrade: "Mid Level - G2",
        },
        {
            sl: 6,
            id: 10005,
            name: "Ava Martinez",
            email: "ava.martinez@example.com",
            department: "Support",
            employeeType: "Part Time",
            dateOfBirth: "03-06-1993",
            position: "Customer Support",
            levelGrade: "Entry Level - G1",
        },
        {
            sl: 7,
            id: 10006,
            name: "William Anderson",
            email: "william.anderson@example.com",
            department: "Development",
            employeeType: "Full Time",
            dateOfBirth: "17-11-1987",
            position: "Backend Developer",
            levelGrade: "Senior Level - G3",
        },
        {
            sl: 8,
            id: 10007,
            name: "Sophia Thomas",
            email: "sophia.thomas@example.com",
            department: "Sales",
            employeeType: "Full Time",
            dateOfBirth: "22-08-1991",
            position: "Sales Executive",
            levelGrade: "Mid Level - G2",
        }
    ];




    const [idorname, setidorname] = useState('');

    const filter = employees.filter(emp => emp?.name?.toUpperCase().includes(idorname?.toUpperCase()));


    console.log(filter);


    return (
        <div>
            <div>
                <PageBreadcrumb pageTitle={"All Employee"}>
                    <FilterSearch seter={setidorname} />
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
                                filter?.map((item, index) => {
                                    return (
                                        <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-600 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                                            <td className="w-4 p-4">
                                                {item?.sl}
                                            </td>
                                            <td>{item?.id}</td>
                                            <th scope="row" className="flex items-center px-6 py-4 text-gray-700 whitespace-nowrap dark:text-gray-300">
                                                <Image className="w-10 h-10 rounded-full" src={profileimg} alt="Jese image" />
                                                <div className="ps-3">
                                                    <div className="text-base font-semibold">{item?.name}</div>
                                                </div>
                                            </th>
                                            <td className="px-6 py-4">
                                                {item?.email}
                                            </td>
                                            <td className="px-6 py-4">
                                                {item?.department}
                                            </td>
                                            <td className="px-6 py-4">
                                                {item?.employeeType}
                                            </td>
                                            <td className="px-6 py-4">
                                                {item?.dateOfBirth}
                                            </td>
                                            <td className="px-6 py-4">
                                                {item?.position}
                                            </td>
                                            <td className="px-6 py-4">
                                                {item?.levelGrade}
                                            </td>
                                            <td className="px-6 py-4">
                                                <Link className="underline flex gap-1 items-center flex-col text-gray-700 dark:text-gray-300" href={`/admin/employee/${item?.id}`}>
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