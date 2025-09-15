'use client'

import getId from "@/helper/cookie/getid";
import getCookie from "@/helper/cookie/gettooken";
import { useCallback, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";

const Holidays = () => {

    const token = getCookie();
    const userId = getId();
    const [holidayAndEmployee, setholidayAndEmployee] = useState([]);
    const [isloading, setisloading] = useState(false);
    const [ispublic, setispublic] = useState(true);




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



    /************** Find My Holiday **************/
    const myholiday = holidayAndEmployee?.employees?.filter((item) => {
        return item?.id == userId;
    });




    return (



        <div>


            {/* Holiday List */}
            < div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm" >
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-semibold mb-4 dark:text-gray-100">Holiday List</h2>
                    <div className="flex gap-3 items-center">
                        <button onClick={() => { setispublic(true) }} className={`text-white px-2 py-1 outline-none border-0 rounded-md ${ispublic ? "bg-blue-600" : "bg-gray-400"}`}>Public</button>
                        <button onClick={() => { setispublic(false) }} className={`text-white px-2 py-1 outline-none border-0 rounded-md ${ispublic ? "bg-gray-400" : "bg-blue-600"}`}>My Holiday</button>
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
                                                </tr>
                                            )
                                        })
                                    }

                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <ul className="space-y-3 mt-5">
                            {myholiday?.map((item, index) => {
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
                                    </li>
                                )
                            })}
                        </ul>
                    )
                }



            </div >
            <ToastContainer position="bottom-right" />
        </div >

    )
}

export default Holidays;