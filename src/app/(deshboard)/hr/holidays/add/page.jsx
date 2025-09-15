'use client'

import Loading from "@/components/common/Loading";
import getCookie from "@/helper/cookie/gettooken";
import { useCallback, useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { toast, ToastContainer } from "react-toastify";

const AddHoliday = () => {

    const token = getCookie();
    const [hType, setHType] = useState('0');
    const [holidayAndEmployee, setholidayAndEmployee] = useState([]);
    const [holidays, setHolidays] = useState([]);
    const [seletctedEmployee, setseletctedEmployee] = useState([]);
    const [hName, sethName] = useState('');
    const [hDate, sethDate] = useState('');
    const [dis, setdis] = useState('');
    const [day, setDay] = useState('');
    const [isloading, setisloading] = useState(false);
    const [ispublic, setispublic] = useState(true);



    /******** handle Employee Selete ********/
    const handleEmployeeSelect = (id) => {
        setseletctedEmployee((prev) =>
            prev.includes(id) ? prev.filter((empId) => empId !== id) : [...prev, id]
        );
    };



    /**************** Get Holiday and Employee Here ******************/
    const getHolidayAndEmployee = useCallback(async () => {
        try {

            setisloading(true);

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

            setisloading(false);

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




    /******************* Add Holiday Functionality Here ******************/
    async function handleAddHoliday() {



        /********* Data validate *********/
        if (!hName || !hType || hType === "0") {
            toast.warn("Holiday Type and Holiday Name are required!");
            return;
        }

        if (hType === "2" && !hDate) {
            toast.warn("Date is required for Public Holiday!");
            return;
        }

        if (hType === "1" && (!day || seletctedEmployee.length < 1)) {
            toast.warn("Day and at least one Employee are required for Individual Holiday!");
            return;
        }



        /********* Added Holiday ********/
        try {
            setisloading(true);


            //send a post request in the backend
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/holiday`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({
                    hType,
                    hDate,
                    hName,
                    dis,
                    day,
                    seletctedEmployee
                })
            });


            if (response.ok) {
                setisloading(false);
                const data = await response.json();
                setHType('0');
                sethDate('');
                sethName('');
                setdis('');
                setDay('');
                setseletctedEmployee([]);
                getHolidayAndEmployee();
                toast.success("Holiday Added successful");
            } else {
                setisloading(false);
                const errorData = await response.json();
                toast.error('Holiday Added failed');
                console.error("Holiday Added failed:", errorData);
            }
        } catch (error) {
            setisloading(false);
            console.error(error);
        }

    }



    /******************* Delete Holiday Functionality Here ******************/
    async function handleDeleteHoliday(id, type) {



        /********* Delete Holiday ********/
        try {
            setisloading(true);


            //send a post request in the backend
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/holiday/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({ HolidayType: type })
            });


            if (response.ok) {
                setisloading(false);
                const data = await response.json();
                getHolidayAndEmployee();
                toast.success("Holiday Delete successful");
            } else {
                setisloading(false);
                const errorData = await response.json();
                toast.error('Holiday Delete failed');
                console.error("Holiday Delete failed:", errorData);
            }
        } catch (error) {
            setisloading(false);
            console.error(error);
        }

    }



    return (


        <div className="mx-auto space-y-6">
            {isloading && <Loading />}
            {/* Add Holiday Form */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
                <h2 className="text-2xl font-semibold mb-4 dark:text-gray-100">Add Holiday</h2>
                <div className="space-y-4">

                    <select onChange={(e) => { setHType(e.target.value) }} className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white" name="" id="">
                        <option value='0'>Selete Holiday Type</option>
                        <option value="2">Public</option>
                        <option value="1">Individual</option>
                    </select>

                    <input
                        type="text"
                        name="name"
                        placeholder="Holiday Name"
                        value={hName}
                        onChange={(e) => { sethName(e.target.value) }}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />

                    {
                        hType === "1" ? (

                            <select onChange={(e) => { setDay(e.target.value) }} className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white" name="" id="">
                                <option value=''>Selete Day Name</option>
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
                                value={hDate}
                                onChange={(e) => { sethDate(e.target.value) }}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                        )
                    }





                    <textarea
                        name="description"
                        placeholder="Description (optional)"
                        value={dis}
                        onChange={(e) => { setdis(e.target.value) }}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                    {
                        hType == "1" && <div className="space-y-2">
                            <p className="font-medium text-gray-700 dark:text-gray-200">Assign Employees:</p>
                            <div className="flex flex-wrap gap-2">
                                {holidayAndEmployee?.employees?.map((emp) => (
                                    <button
                                        key={emp.id}
                                        type="button"
                                        onClick={() => handleEmployeeSelect(emp.id)}
                                        className={`px-3 py-1 rounded-full border ${seletctedEmployee.includes(emp.id) ? "bg-blue-600 text-white border-blue-600"
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
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-semibold mb-4 dark:text-gray-100">Holiday List</h2>
                    <div className="flex gap-3 items-center">
                        <button onClick={() => { setispublic(true) }} className={`text-white px-2 py-1 outline-none border-0 rounded-md ${ispublic ? "bg-blue-600" : "bg-gray-400"}`}>Public</button>
                        <button onClick={() => { setispublic(false) }} className={`text-white px-2 py-1 outline-none border-0 rounded-md ${ispublic ? "bg-gray-400" : "bg-blue-600"}`}>Individual</button>
                    </div>
                </div>

                {
                    ispublic ? (
                        <div className="relative overflow-x-auto rounded-md shadow-md mt-5">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400 text-center">
                                    <tr>
                                        <th scope="col" className="p-4 border-1 border-gray-200 dark:border-gray-600">
                                            SL
                                        </th>
                                        <th scope="col" className="p-4 text-center border-1 border-gray-200 dark:border-gray-600">
                                            Date
                                        </th>
                                        <th scope="col" className="px-2 py-3 border-1 border-gray-200 dark:border-gray-600">
                                            Holiday Name
                                        </th>
                                        <th scope="col" className="px-2 py-3 border-1 border-gray-200 dark:border-gray-600">
                                            Description
                                        </th>
                                        <th scope="col" className="px-2 py-3 border-1 border-gray-200 dark:border-gray-600">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>



                                    {
                                        holidayAndEmployee?.public?.map((item, index) => {
                                            return (
                                                <tr key={index} className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900 text-center">
                                                    <td className="w-4 p-4 border-1 border-gray-200 dark:border-gray-600">
                                                        {index + 1}
                                                    </td>
                                                    <td className="text-center border-1 border-gray-200 dark:border-gray-600">{item?.date}</td>

                                                    <td className="px-2 py-4 border-1 border-gray-200 dark:border-gray-600">
                                                        {item?.name}
                                                    </td>
                                                    <td className="px-1 py-4 border-1 border-gray-200 dark:border-gray-600">
                                                        {item?.description}
                                                    </td>

                                                    <td className="px-1 py-4 border-1 border-gray-200 dark:border-gray-600">
                                                        <button
                                                            onClick={() => handleDeleteHoliday(item.id, 2)}
                                                            className="text-white p-1 rounded-md bg-red-400 font-semibold mt-2 md:mt-0"
                                                        >
                                                            <MdDelete />
                                                        </button>
                                                    </td>

                                                </tr>
                                            )
                                        })
                                    }

                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <ul className="space-y-3 mt-5">
                            {holidayAndEmployee?.employees?.map((item, index) => {
                                return (
                                    <li
                                        key={index}
                                        className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg flex justify-between items-start flex-col md:flex-row"
                                    >
                                        <div>
                                            <p className="font-medium text-gray-800 dark:text-gray-100 text-xl">{item.fname + " " + item?.lname}</p>
                                            <p className="text-gray-500 dark:text-gray-300">{item?.designation}</p>
                                            <div className="mt-2">
                                                <h3 className="py-1 text-xl dark:text-white">Assign Holidays:</h3>
                                                <div className="flex items-center gap-2">
                                                    {item?.personal_holidays?.map((h, idx) => {
                                                        return (
                                                            <div key={idx} className="py-1 px-2 rounded-md bg-gray-300 text-gray-900">
                                                                <div className="flex items-center gap-1">
                                                                    <span className="font-bold">Holiday Name:</span>
                                                                    <span>{h?.name}</span>
                                                                </div>
                                                                <div className="flex items-center gap-1">
                                                                    <span className="font-bold">Holiday Day:</span>
                                                                    <span>{h?.holidays}</span>
                                                                </div>
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => handleDeleteHoliday(item.id, 1)}
                                            className="text-white p-1 rounded-md bg-red-400 font-semibold mt-2 md:mt-0"
                                        >
                                            <MdDelete />
                                        </button>
                                    </li>
                                )
                            })}
                        </ul>
                    )
                }



            </div>
            <ToastContainer position="bottom-right" />
        </div >

    )
}

export default AddHoliday;