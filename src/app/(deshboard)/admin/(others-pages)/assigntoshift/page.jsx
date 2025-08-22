"use client";

import { useState } from "react";
import AssignOnShift from "../../../../../components/ecommerce/AssignOnShift";

export default function AssignShift() {
    const [selectedShift, setSelectedShift] = useState("");
    const [selectedEmployees, setSelectedEmployees] = useState([]);
    const [assignments, setAssignments] = useState([]);
    const [darkMode, setDarkMode] = useState(false);

    const shifts = [
        { id: "1", name: "Morning (9:00 AM - 5:00 PM)" },
        { id: "2", name: "Evening (1:00 PM - 9:00 PM)" },
        { id: "3", name: "Night (9:00 PM - 6:00 AM)" },
    ];

    const employees = [
        { id: "1", name: "Emon Hossen" },
        { id: "2", name: "John Smith" },
        { id: "3", name: "Sarah Ali" },
        { id: "4", name: "David Khan" },
        { id: "5", name: "Maria Noor" },
    ];

    const handleEmployeeToggle = (id) => {
        setSelectedEmployees((prev) =>
            prev.includes(id) ? prev.filter((empId) => empId !== id) : [...prev, id]
        );
    };

    const handleAssign = () => {
        if (!selectedShift || selectedEmployees.length === 0) return;

        const shift = shifts.find((s) => s.id === selectedShift);
        const assigned = selectedEmployees.map((id) => ({
            shift,
            emp: employees.find((e) => e.id === id),
        }));

        setAssignments((prev) => [...prev, ...assigned]);

        // reset
        setSelectedShift("");
        setSelectedEmployees([]);
    };

    return (
        <div
            className={`min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors p-6`}
        >

            {/* Form */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 mb-6 space-y-4">
                {/* Select Shift */}
                <div>
                    <label className="block mb-2 text-gray-700 dark:text-gray-200">
                        Select Shift
                    </label>
                    <select
                        value={selectedShift}
                        onChange={(e) => setSelectedShift(e.target.value)}
                        className="w-full p-2 rounded-lg border border-gray-500 bg-gray-50 dark:bg-gray-700 dark:text-gray-100 focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">-- Choose a Shift --</option>
                        {shifts.map((shift) => (
                            <option key={shift.id} value={shift.id}>
                                {shift.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Select Multiple Employees */}
                <div>
                    <label className="block mb-2 text-gray-700 dark:text-gray-200">
                        Select Employees
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                        {employees.map((emp) => (
                            <label
                                key={emp.id}
                                className="flex items-center gap-2 p-2 rounded-lg border cursor-pointer bg-gray-50 dark:bg-gray-700 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600"
                            >
                                <input
                                    type="checkbox"
                                    checked={selectedEmployees.includes(emp.id)}
                                    onChange={() => handleEmployeeToggle(emp.id)}
                                    className="accent-blue-600"
                                />
                                <span className="text-gray-800 dark:text-gray-100">{emp.name}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Assign Button */}
                <button
                    onClick={handleAssign}
                    className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                    Assign Shift
                </button>
            </div>

            {/* Preview Section */}

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6">
                <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">
                    Assigned Employees on Shift
                </h2>


                <div className="grid grid-cols-9 gap-5">
                    <AssignOnShift />
                    <AssignOnShift />
                    <AssignOnShift />
                    <AssignOnShift />
                </div>


            </div>

        </div>
    );
}
