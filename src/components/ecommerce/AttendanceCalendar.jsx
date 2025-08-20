"use client";

import FilterSearch from "@/components/common/FilterSearch";
import getRole from "@/helper/cookie/getrole";
import { CalendarDays, CheckCircle, Clock, Plane, Star, XCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import demoimage from "../../../public/images/user/demo.jpeg";
import AttendanceSummary from "../..//components/common/AttandanceSummaryWrper";

const AttendanceCalendar = ({ AttendanceData }) => {


    const role = getRole();

    const renderIcon = (status) => {
        switch (status) {
            case "Present":
                return <CheckCircle className="w-5 h-5 text-green-500" />;
            case "Absent":
                return <XCircle className="w-5 h-5 text-red-500" />;
            case "Late":
                return <Clock className="w-5 h-5 text-yellow-500" />;
            case "Half":
                return <Star className="w-5 h-5 text-orange-500" />;
            case "Leave":
                return <Plane className="w-5 h-5 text-purple-500" />;
            case "Holiday":
                return <CalendarDays className="w-5 h-5 text-blue-500" />;
            default:
                return null;
        }
    };
    const [idorname, setidorname] = useState('');
    const filter = AttendanceData?.employees?.filter((emp) => {

        return emp?.employee?.employee?.user?.name?.toUpperCase().includes(idorname?.toUpperCase())
    });


    // console.log(AttendanceData?.employees);


    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth(); // 0 = Jan, 1 = Feb, ...

    // get total days in this month
    const daysInMonth = new Date(year, month + 1, 0).getDate();






    return (
        <div className={`w-full`}>

            <AttendanceSummary summarydata={AttendanceData?.counters} />

            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">Attendance Calendar</h2>
                <div className="w-[300px]">
                    <FilterSearch seter={setidorname} />
                </div>
            </div>

            {/* Legend */}
            <div className="flex flex-wrap gap-4 text-sm mb-6">
                <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                    <CheckCircle className="w-4 h-4 text-green-500" /> Present
                </div>
                <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                    <XCircle className="w-4 h-4 text-red-500" /> Absent
                </div>
                <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                    <Clock className="w-4 h-4 text-yellow-500" /> Late
                </div>
                <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                    <Star className="w-4 h-4 text-orange-500" /> Half Day
                </div>
                <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                    <Plane className="w-4 h-4 text-purple-500" /> On Leave
                </div>
                <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                    <CalendarDays className="w-4 h-4 text-blue-500" /> Holiday
                </div>
            </div>

            {/* Table */}
            <div className="rounded-lg shadow-lg border dark:border-gray-700 overflow-x-scroll lg:w-[78vw]">
                <table className="w-full border-collapse overflow-x-scroll">
                    <thead className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 text-sm ">
                        <tr>
                            <th className="p-3 text-left font-semibold">Sl</th>
                            <th className="p-3 text-left font-semibold">ID </th>
                            <th className="p-3 text-left font-semibold">Employee</th>
                            <th className="p-3 text-left font-semibold">View Full</th>
                            {Array.from({ length: daysInMonth }, (_, i) => (
                                <th key={i} className="p-3 text-center font-semibold">{i + 1}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 text-sm">
                        {filter?.map((item, index) => {
                            return (
                                <tr key={index} className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                                    <td className="p-3 text-center text-gray-700 dark:text-gray-300 font-medium">
                                        {index + 1}
                                    </td>
                                    <td className="p-3 text-center text-gray-700 dark:text-gray-300 font-medium">
                                        {item?.employee?.employee?.eid}
                                    </td>

                                    <td className="flex w-[150px] items-center gap-3 p-3">
                                        <Image width={1000} height={1000} src={item?.image ? item?.image : demoimage} alt={item?.employee?.employee?.fname + " " + item?.employee?.employee?.lname} className="w-8 h-8 rounded-full border dark:border-gray-600" />
                                        <span className="text-gray-700 dark:text-gray-300 font-medium">{item?.employee?.employee?.fname + " " + item?.employee?.employee?.lname}</span>
                                    </td>
                                    <td className="p-3 text-center text-blue-700 dark:text-blue-300 font-medium">
                                        <Link
                                            href={
                                                role === "Admin"
                                                    ? `/admin/employee/attendance/${item?.employee?.employee?.id}`
                                                    : `/hr/employee/attendance/${item?.employee?.employee?.id}`
                                            }
                                        >
                                            View
                                        </Link>
                                    </td>
                                    {
                                        item?.attendance?.map((aItem, index) => (
                                            <td key={index} className="p-3 text-center text-white">
                                                {renderIcon(aItem?.status)}
                                            </td>
                                        ))
                                    }
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div >
        </div >
    );
};

export default AttendanceCalendar;
