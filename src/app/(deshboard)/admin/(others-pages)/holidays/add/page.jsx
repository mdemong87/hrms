'use client'

import getCookie from "@/helper/cookie/gettooken";
import { useCallback, useEffect, useState } from "react";

const AddHoliday = () => {

    const token = getCookie();
    const [hType, setHType] = useState(0);
    const [holidayAndEmployee, setholidayAndEmployee] = useState([]);
    const [holidays, setHolidays] = useState([]);
    const [seletctedEmployee, setseletctedEmployee] = useState([]);

    const [form, setForm] = useState({ name: "", date: "", description: "", assigned: [] });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleEmployeeSelect = (id) => {
        setseletctedEmployee((prev) =>
            prev.includes(id) ? prev.filter((empId) => empId !== id) : [...prev, id]
        );
    };




    console.log(seletctedEmployee);




    /**************** Get Holiday and Employee Here ******************/
    const getHolidayAndEmployee = useCallback(async () => {
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/holiday`,
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
                setholidayAndEmployee(res);
            } else {
                console.error("Failed to fetch Holiday and Employee");
            }
        } catch (error) {
            console.error("Failed to fetch Holiday and Employee:", error);
        }
    }, [token]);





    /************** Run once on component mount ************/
    useEffect(() => {
        getHolidayAndEmployee();
    }, [getHolidayAndEmployee]);






    /********** log here **********/
    console.log(holidayAndEmployee[0]);











    return (


        <div className="mx-auto space-y-6">
            {/* Add Holiday Form */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
                <h2 className="text-2xl font-semibold mb-4 dark:text-gray-100">Add Holiday</h2>
                <div className="space-y-4">

                    <select onChange={(e) => { setHType(e.target.value) }} className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white" name="" id="">
                        <option value='0'>Selete Holiday Type</option>
                        <option value="Public">Public</option>
                        <option value="Individual">Individual</option>
                    </select>

                    <input
                        type="text"
                        name="name"
                        placeholder="Holiday Name"
                        value={form.name}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />

                    {
                        hType === "Individual" ? (

                            <select className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white" name="" id="">
                                <option value='0'>Selete Day Name</option>
                                <option value="Monday">Monday</option>
                                <option value="Tuesday">Tuesday</option>
                                <option value="Wednesday">Wednesday</option>
                                <option value="Thursday">Thursday</option>
                                <option value="Friday">Friday</option>
                                <option value="Saturday">Saturday</option>
                                <option value="Sunday">Sunday</option>
                            </select>

                        ) : (
                            <input
                                type="date"
                                name="date"
                                value={form.date}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                        )
                    }





                    <textarea
                        name="description"
                        placeholder="Description (optional)"
                        value={form.description}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                    {
                        hType != "Public" && <div className="space-y-2">
                            <p className="font-medium text-gray-700 dark:text-gray-200">Assign Employees:</p>
                            <div className="flex flex-wrap gap-2">
                                {holidayAndEmployee[0]?.employees?.map((emp) => (
                                    <button
                                        key={emp.id}
                                        type="button"
                                        onClick={() => handleEmployeeSelect(emp.id)}
                                        className={`px-3 py-1 rounded-full border ${form.assigned.includes(emp.id)
                                            ? "bg-blue-600 text-white border-blue-600"
                                            : "border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200"
                                            }`}
                                    >
                                        {emp.fname}
                                    </button>
                                ))}
                            </div>
                        </div>
                    }
                    <div className="flex justify-end">
                        <button
                            onClick={handleAddHoliday}
                            className="w-fit bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Add Holiday
                        </button>
                    </div>
                </div>
            </div>

            {/* Holiday List */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
                <h2 className="text-2xl font-semibold mb-4 dark:text-gray-100">Holiday List</h2>
                {holidays.length === 0 ? (
                    <p className="text-gray-500 dark:text-gray-400">No holidays added yet.</p>
                ) : (
                    <ul className="space-y-3">
                        {holidays.map((holiday) => (
                            <li
                                key={holiday.id}
                                className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg flex justify-between items-start flex-col md:flex-row"
                            >
                                <div>
                                    <p className="font-medium text-gray-800 dark:text-gray-100">{holiday.name}</p>
                                    <p className="text-gray-500 dark:text-gray-300">{holiday.date}</p>
                                    {holiday.description && (
                                        <p className="text-gray-400 dark:text-gray-400">{holiday.description}</p>
                                    )}
                                    {holiday.assigned.length > 0 && (
                                        <p className="mt-1 text-gray-600 dark:text-gray-300">
                                            Assigned:{" "}
                                            {holiday.assigned
                                                .map((id) => employees.find((e) => e.id === id)?.name)
                                                .join(", ")}
                                        </p>
                                    )}
                                </div>
                                <button
                                    onClick={() => handleDelete(holiday.id)}
                                    className="text-red-600 hover:text-red-800 font-semibold mt-2 md:mt-0"
                                >
                                    Delete
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>








    )
}

export default AddHoliday;