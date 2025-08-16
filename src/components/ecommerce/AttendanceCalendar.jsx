"use client";
import FilterSearch from "@/components/common/FilterSearch";
import {
    CalendarDays,
    CheckCircle,
    Clock,
    Plane,
    Star,
    XCircle
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import demoimage from "../../../public/images/user/demo.jpeg";

const AttendanceTable = () => {

    const employees = [
        { name: "John Doe", image: "/user1.jpg", attendance: ["present", "half", "present", "leave", "late", "present", "half", "holiday", "present", "present", "present", "half", "present", "leave", "late", "present", "half", "holiday", "present", "present", "present", "half", "present", "leave", "late", "present", "half", "holiday", "present", "present"] },
        { name: "Jane Smith", image: "/user2.jpg", attendance: ["present", "leave", "half", "half", "holiday", "late", "present", "absent", "leave", "half", "present", "half", "present", "leave", "late", "present", "half", "holiday", "present", "present", "present", "half", "present", "leave", "late", "present", "half", "holiday", "present", "present"] },
        { name: "Robert Johnson", image: "/user3.jpg", attendance: ["leave", "present", "present", "half", "half", "present", "holiday", "late", "present", "absent", "present", "half", "present", "leave", "late", "present", "half", "holiday", "present", "present", "present", "half", "present", "leave", "late", "present", "half", "holiday", "present", "present"] },
        { name: "John Doe", image: "/user1.jpg", attendance: ["present", "half", "present", "leave", "late", "present", "half", "holiday", "present", "present", "present", "half", "present", "leave", "late", "present", "half", "holiday", "present", "present", "present", "half", "present", "leave", "late", "present", "half", "holiday", "present", "present"] },
        { name: "Jane Smith", image: "/user2.jpg", attendance: ["present", "leave", "half", "half", "holiday", "late", "present", "absent", "leave", "half", "present", "half", "present", "leave", "late", "present", "half", "holiday", "present", "present", "present", "half", "present", "leave", "late", "present", "half", "holiday", "present", "present"] },
        { name: "Robert Johnson", image: "/user3.jpg", attendance: ["leave", "present", "present", "half", "half", "present", "holiday", "late", "present", "absent", "present", "half", "present", "leave", "late", "present", "half", "holiday", "present", "present", "present", "half", "present", "leave", "late", "present", "half", "holiday", "present", "present"] },
        { name: "John Doe", image: "/user1.jpg", attendance: ["present", "half", "present", "leave", "late", "present", "half", "holiday", "present", "present", "present", "half", "present", "leave", "late", "present", "half", "holiday", "present", "present", "present", "half", "present", "leave", "late", "present", "half", "holiday", "present", "present"] },
        { name: "Jane Smith", image: "/user2.jpg", attendance: ["present", "leave", "half", "half", "holiday", "late", "present", "absent", "leave", "half", "present", "half", "present", "leave", "late", "present", "half", "holiday", "present", "present", "present", "half", "present", "leave", "late", "present", "half", "holiday", "present", "present"] },
        { name: "Robert Johnson", image: "/user3.jpg", attendance: ["leave", "present", "present", "half", "half", "present", "holiday", "late", "present", "absent", "present", "half", "present", "leave", "late", "present", "half", "holiday", "present", "present", "present", "half", "present", "leave", "late", "present", "half", "holiday", "present", "present"] },
        { name: "John Doe", image: "/user1.jpg", attendance: ["present", "half", "present", "leave", "late", "present", "half", "holiday", "present", "present", "present", "half", "present", "leave", "late", "present", "half", "holiday", "present", "present", "present", "half", "present", "leave", "late", "present", "half", "holiday", "present", "present"] },
        { name: "Jane Smith", image: "/user2.jpg", attendance: ["present", "leave", "half", "half", "holiday", "late", "present", "absent", "leave", "half", "present", "half", "present", "leave", "late", "present", "half", "holiday", "present", "present", "present", "half", "present", "leave", "late", "present", "half", "holiday", "present", "present"] },
        { name: "Robert Johnson", image: "/user3.jpg", attendance: ["leave", "present", "present", "half", "half", "present", "holiday", "late", "present", "absent", "present", "half", "present", "leave", "late", "present", "half", "holiday", "present", "present", "present", "half", "present", "leave", "late", "present", "half", "holiday", "present", "present"] },
    ];

    const renderIcon = (status) => {
        switch (status) {
            case "present":
                return <CheckCircle className="w-5 h-5 text-green-500" />;
            case "absent":
                return <XCircle className="w-5 h-5 text-red-500" />;
            case "late":
                return <Clock className="w-5 h-5 text-yellow-500" />;
            case "half":
                return <Star className="w-5 h-5 text-orange-500" />;
            case "leave":
                return <Plane className="w-5 h-5 text-purple-500" />;
            case "holiday":
                return <CalendarDays className="w-5 h-5 text-blue-500" />;
            default:
                return null;
        }
    };

    return (
        <div className={`w-full`}>
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">Attendance Calendar</h2>
                <div className="w-[300px]">
                    <FilterSearch />
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
            <div className="rounded-lg shadow-lg border dark:border-gray-700 overflow-x-scroll lg:w-[75vw]">
                <table className="w-full border-collapse overflow-x-scroll">
                    <thead className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 text-sm ">
                        <tr>
                            <th className="p-3 text-left font-semibold">Sl</th>
                            <th className="p-3 text-left font-semibold">ID </th>
                            <th className="p-3 text-left font-semibold">Employee</th>
                            <th className="p-3 text-left font-semibold">View Full</th>
                            {Array.from({ length: 30 }, (_, i) => (
                                <th key={i} className="p-3 text-center font-semibold">{i + 1}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 text-sm">
                        {employees.map((emp, idx) => (
                            <tr key={idx} className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                                <td className="p-3 text-center text-gray-700 dark:text-gray-300 font-medium">
                                    {idx + 1}
                                </td>
                                <td className="p-3 text-center text-gray-700 dark:text-gray-300 font-medium">
                                    {1000 + 1}
                                </td>

                                <td className="flex w-[150px] items-center gap-3 p-3">
                                    <Image src={demoimage} alt={emp.name} className="w-8 h-8 rounded-full border dark:border-gray-600" />
                                    <span className="text-gray-700 dark:text-gray-300 font-medium">{emp.name}</span>
                                </td>
                                <td className="p-3 text-center text-blue-700 dark:text-blue-300 font-medium">
                                    <Link href={`/admin/employee/attendance/${1000 + 1}`}>View</Link>
                                </td>
                                {emp.attendance.map((day, i) => (
                                    <td key={i} className="p-3 text-center">
                                        {renderIcon(day)}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AttendanceTable;
