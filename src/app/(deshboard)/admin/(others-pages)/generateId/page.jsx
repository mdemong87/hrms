"use client";
import Image from "next/image";
import { useState } from "react";
import logo from "../../../../../../public/images/logo/logo.png";

export default function EmployeeIdCardGenerator() {
    const [employee] = useState({
        id: "EMP-1023",
        name: "John Doe",
        designation: "Software Engineer",
        department: "IT",
        email: "john.doe@company.com",
        phone: "+880 1789 000000",
        joinDate: "12-03-2023",
        photo: "https://i.pravatar.cc/150?img=3",
    });

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200 dark:bg-gray-900 p-6">
            {/* ID Card */}
            <div className="w-[320px] h-[500px] rounded-2xl border bg-white dark:bg-gray-800 shadow-2xl overflow-hidden relative print:border print:shadow-none">
                {/* Top Banner */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-800 h-20 flex items-center justify-center">
                    <Image
                        src={logo}
                        alt="Company Logo"
                        className="h-12 object-contain"
                    />
                </div>

                {/* Employee Photo */}
                <div className="flex justify-center -mt-12">
                    <img
                        src={employee.photo}
                        alt={employee.name}
                        className="w-24 h-24 rounded-full border-4 border-white shadow-md"
                    />
                </div>

                {/* Info Section */}
                <div className="text-center mt-3 px-4">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                        {employee.name}
                    </h2>
                    <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                        {employee.designation}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                        {employee.department}
                    </p>
                </div>

                {/* Divider */}
                <div className="my-3 mx-6 border-b border-gray-300 dark:border-gray-600"></div>

                {/* Details */}
                <div className="px-6 space-y-2 text-sm text-gray-700 dark:text-gray-300">
                    <p>
                        <span className="font-semibold">ID:</span> {employee.id}
                    </p>
                    <p>
                        <span className="font-semibold">Email:</span> {employee.email}
                    </p>
                    <p>
                        <span className="font-semibold">Phone:</span> {employee.phone}
                    </p>
                    <p>
                        <span className="font-semibold">Joined:</span> {employee.joinDate}
                    </p>
                </div>

                {/* Footer */}
                <div className="absolute bottom-0 w-full bg-gradient-to-r from-blue-600 to-blue-800 h-14 flex items-center justify-center">
                    <p className="text-xs text-white tracking-wider">
                        Company Name • Innovation & Excellence
                    </p>
                </div>
            </div>
        </div>
    );
}
