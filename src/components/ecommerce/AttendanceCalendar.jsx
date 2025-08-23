"use client";

import getRole from "@/helper/cookie/getrole";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import demoprofil from "../../../public/images/user/demo.jpeg";
import FilterSearch from "../common/FilterSearch";


const AttendanceCalendar = ({ AttendanceData }) => {


    const role = getRole();
    const [searchvalue, setsearchvalue] = useState('');


    // Utility function to get the appropriate class for late percentage
    const getLateClass = (latePercentage) => {
        // Check if the percentage is a number and above a certain threshold for the red background
        const numericPercentage = parseInt(latePercentage, 10);
        if (!isNaN(numericPercentage) && numericPercentage > 10) {
            return 'bg-red-200 dark:bg-red-800 dark:text-red-100';
        }
        return '';
    };



    // Hardcoded data to populate the table.
    const tableData = [
        {
            date: '5',
            name: 'Ziaul',
            totalDay: '5',
            weekend: '0',
            leave: '0',
            halfDay: '0',
            absent: '0',
            late: '0',
            latePercentage: '8%',
            worked: '25',
        },
        {
            date: '4',
            name: 'Shahin',
            totalDay: '5',
            weekend: '0',
            leave: '0',
            halfDay: '0',
            absent: '0',
            late: '0',
            latePercentage: 'No late',
            worked: '26',
        },
        {
            date: '4',
            name: 'Showrov',
            totalDay: '5',
            weekend: '0',
            leave: '0',
            halfDay: '0',
            absent: '0',
            late: '0',
            latePercentage: 'No late',
            worked: '27',
        },
        {
            date: '5',
            name: 'Sakib',
            totalDay: '5',
            weekend: '2',
            leave: '1',
            halfDay: '0',
            absent: '0',
            late: '0',
            latePercentage: 'No late',
            worked: '24',
        },
        {
            date: '2',
            name: 'Saidul',
            totalDay: '4',
            weekend: '4',
            leave: '2',
            halfDay: '0',
            absent: '0',
            late: '0',
            latePercentage: '25%',
            worked: '25.5',
        },
        {
            date: '2',
            name: 'Ashik',
            totalDay: '5',
            weekend: '0',
            leave: '0',
            halfDay: '1',
            absent: '0',
            late: '0',
            latePercentage: 'No late',
            worked: '24%',
            worked: '25.5',
        },
        {
            date: '3',
            name: 'Hossain',
            totalDay: '5',
            weekend: '0',
            leave: '0',
            halfDay: '0',
            absent: '0',
            late: '0',
            latePercentage: 'No late',
            worked: '25',
        },
        {
            date: '1',
            name: 'Reyhan',
            totalDay: '5',
            weekend: '0',
            leave: '0',
            halfDay: '1',
            absent: '0',
            late: '0',
            latePercentage: 'No late',
            worked: '24.5',
        },
        {
            date: '1',
            name: 'Shamsul',
            totalDay: '5',
            weekend: '0',
            leave: '0',
            halfDay: '1',
            absent: '0',
            late: '0',
            latePercentage: 'No late',
            worked: '24.5',
        },
        {
            date: '2',
            name: 'Abir',
            totalDay: '5',
            weekend: '0',
            leave: '0',
            halfDay: '2',
            absent: '0',
            late: '14',
            latePercentage: '50%',
            worked: '25.5',
        },
        {
            date: '2',
            name: 'Noyem',
            totalDay: '5',
            weekend: '0',
            leave: '0',
            halfDay: '0',
            absent: '0',
            late: '0',
            latePercentage: 'No late',
            worked: '23.5',
        },
        {
            date: '3',
            name: 'Ashiqur',
            totalDay: '5',
            weekend: '0',
            leave: '0',
            halfDay: '0',
            absent: '0',
            late: '0',
            latePercentage: 'No late',
            worked: '24.5',
        },
        {
            date: '3',
            name: 'Hasan',
            totalDay: '5',
            weekend: '0',
            leave: '0',
            halfDay: '0',
            absent: '0',
            late: '0',
            latePercentage: 'No late',
            worked: '24.5',
        },
        {
            date: '3',
            name: 'Mahabub',
            totalDay: '5',
            weekend: '0',
            leave: '0',
            halfDay: '0',
            absent: '0',
            late: '0',
            latePercentage: 'No late',
            worked: '24.5',
        },
        {
            date: '2',
            name: 'Sagor',
            totalDay: '4',
            weekend: '4',
            leave: '0',
            halfDay: '0',
            absent: '0',
            late: '0',
            latePercentage: 'No late',
            worked: '25.5',
        },
        {
            date: '2',
            name: 'Saiful',
            totalDay: '4',
            weekend: '4',
            leave: '0',
            halfDay: '0',
            absent: '0',
            late: '0',
            latePercentage: 'No late',
            worked: '25.5',
        },
        {
            date: '2',
            name: 'Amena',
            totalDay: '4',
            weekend: '4',
            leave: '0',
            halfDay: '0',
            absent: '0',
            late: '0',
            latePercentage: 'No late',
            worked: '25.5',
        },
        {
            date: '2',
            name: 'Tareq',
            totalDay: '4',
            weekend: '1',
            leave: '1',
            halfDay: '0',
            absent: '0',
            late: '2',
            latePercentage: '10%',
            worked: '26',
        },
        {
            date: '4',
            name: 'Hasib',
            totalDay: '4',
            weekend: '4',
            leave: '1',
            halfDay: '1',
            absent: '0',
            late: '4',
            latePercentage: '18%',
            worked: '26.5',
        },
        {
            date: '4',
            name: 'Hooib',
            totalDay: '5',
            weekend: '5',
            leave: '0',
            halfDay: '0',
            absent: '0',
            late: '4',
            latePercentage: '4%',
            worked: '27',
        },
        {
            date: '5',
            name: 'Istiyak',
            totalDay: '5',
            weekend: '5',
            leave: '0',
            halfDay: '0',
            absent: '0',
            late: '4',
            latePercentage: '4%',
            worked: '27',
        },
        {
            date: '5',
            name: 'Mitu',
            totalDay: '2',
            weekend: '0',
            leave: '0',
            halfDay: '0',
            absent: '0',
            late: '1',
            latePercentage: 'No late',
            worked: '28',
        },
        {
            date: '2',
            name: 'Abdullah',
            totalDay: '0',
            weekend: '2',
            leave: '0',
            halfDay: '0',
            absent: '0',
            late: '2',
            latePercentage: '28',
            worked: '25',
        },
    ];



    // add search filter functionalaty here
    const filter = AttendanceData?.filter(emp => emp?.employee_name?.toUpperCase().includes(searchvalue?.toUpperCase()));


    console.log(AttendanceData);


    return (
        <div className={`bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-50 transition-colors duration-300 min-h-screen`}>
            <div className="flex items-center justify-between">
                <h1 className="pt-1 pb-5 text-gray-600 dark:text-gray-200 text-xl font-bold">Report of the Month and Year: <span className="text-gray-400 font-semibold text-2xl">{AttendanceData[0]?.monthYear}</span> </h1>
                <div className="w-[300px] pb-5">
                    <FilterSearch seter={setsearchvalue} />
                </div>
            </div>
            <div className="overflow-x-auto rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-100 dark:bg-gray-800">

                        <tr>
                            {/* Main table headers */}
                            <th scope="col" className="px-3 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider text-center border-r border-gray-200 dark:border-gray-700">
                                Sl
                            </th>
                            <th scope="col" className="px-3 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider text-left border-r border-gray-200 dark:border-gray-700">
                                ID
                            </th>
                            <th scope="col" className="px-3 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider text-left border-r border-gray-200 dark:border-gray-700">
                                Name/Image/View
                            </th>
                            <th scope="col" className="px-3 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider text-center border-r border-gray-200 dark:border-gray-700">
                                Weekend
                            </th>
                            <th scope="col" className="px-3 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider text-center border-r border-gray-200 dark:border-gray-700">
                                Leave
                            </th>
                            <th scope="col" className="px-3 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider text-center border-r border-gray-200 dark:border-gray-700">
                                Half Day
                            </th>
                            <th scope="col" className="px-3 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider text-center border-r border-gray-200 dark:border-gray-700">
                                Absent
                            </th>
                            <th scope="col" className="px-3 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider text-center border-r border-gray-200 dark:border-gray-700">
                                Late
                            </th>
                            <th scope="col" className="px-3 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider text-center border-r border-gray-200 dark:border-gray-700">
                                Late (%)
                            </th>
                            <th scope="col" className="px-3 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider text-center border-r border-gray-200 dark:border-gray-700">
                                Worked
                            </th>
                            <th scope="col" className="px-3 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider text-center border-r border-gray-200 dark:border-gray-700">
                                Total Day
                            </th>
                            <th scope="col" className="px-3 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider text-center">
                                Shift
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                        {/* Map through the data to render table rows */}
                        {filter?.map((row, index) => (
                            <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                                <td className="px-1 py-4 whitespace-nowrap text-sm text-gray-500 text-center border-r border-gray-200 dark:border-gray-700">
                                    {index + 1}
                                </td>
                                <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500 text-center border-r border-gray-200 dark:border-gray-700">
                                    {row?.employee_eid}
                                </td>
                                <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-400 font-medium border-r border-gray-200 dark:border-gray-700">
                                    <Link className="flex items-center gap-2" href={`${role === "Admin" ? `/admin/employee/attendance/${row?.employee_id}` : role === "Hr" ? `/hr/allattendance/${row?.employee_id}` : `/signin`}`}>
                                        <Image width={1000} height={1000} src={row?.avatar || demoprofil} className="rounded-full w-[30px] border border-gray-500 h-[30px]" alt="employee-profile" />
                                        <span className="underline decoration-solid">{row?.employee_name}</span>
                                    </Link>
                                </td>
                                <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500 text-center border-r border-gray-200 dark:border-gray-700">
                                    {row?.summary?.Holiday}
                                </td>
                                <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500 text-center border-r border-gray-200 dark:border-gray-700">
                                    {row?.summary?.Leave}
                                </td>
                                <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500 text-center border-r border-gray-200 dark:border-gray-700">
                                    {row?.summary?.Half}
                                </td>
                                <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500 text-center border-r border-gray-200 dark:border-gray-700">
                                    {row?.summary?.Absent}
                                </td>
                                <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500 text-center border-r border-gray-200 dark:border-gray-700">
                                    {row?.summary?.Late}
                                </td>
                                <td className={`px-3 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-400 text-center ${getLateClass(row?.late_percentage)} font-semibold border-r border-gray-200 dark:border-gray-700`}>
                                    {row?.late_percentage}%
                                </td>
                                <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500 text-center border-r border-gray-200 dark:border-gray-700">
                                    {row?.summary?.Present}
                                </td>
                                <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500 text-center border-r border-gray-200 dark:border-gray-700">
                                    {row?.total_days}
                                </td>
                                <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                                    {row?.shift}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div >
    );
};

export default AttendanceCalendar;
