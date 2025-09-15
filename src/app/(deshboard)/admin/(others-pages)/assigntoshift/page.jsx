'use client'

import Loading from "@/components/common/Loading";
import getCookie from "@/helper/cookie/gettooken";
import { useCallback, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import EmployeeShiftAssignCard from "../../../../../components/ecommerce/EmployeeShiftAssignCard";

const AssignShift = () => {

    const token = getCookie();
    const [holidayAndEmployee, setholidayAndEmployee] = useState([]);
    const [isloading, setisloading] = useState(false);
    const [searchShift, setsearchShift] = useState('All');






    /**************** Get Employee Assign on Shift and Employee Here ******************/
    const getHolidayAndEmployee = useCallback(async () => {
        try {

            setisloading(true);

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/shift/assign`,
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






    /********************* Single Employee Search by name **********************/
    const filter = holidayAndEmployee?.data?.filter((i) => {
        if (searchShift == "All") {
            return i;
        } else {
            return i?.shift?.id == searchShift;
        }
    });



    return (


        <div className="mx-auto  p-6 rounded-xl shadow-sm space-y-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-600">
            {isloading && <Loading />}
            {/* Add Holiday Form */}
            <div className=" flex items-center justify-between">
                <h2 className="text-2xl font-semibold mb-1 dark:text-gray-100">Employee Assign on Shift</h2>
                <select onChange={(e) => { setsearchShift(e.target.value) }} className="w-[250px] border border-gray-300 dark:border-gray-700 p-1 rounded-md outline-none cursor-pointer">
                    <option value="All">All</option>
                    {holidayAndEmployee?.shifts?.map((item, index) => {
                        return (
                            <option key={index} value={item?.id}>{item?.shift_name}</option>
                        )
                    })}
                </select>
            </div>

            <div className="grid grid-cols-3 items-center gap-6">

                {
                    filter?.map((item, index) => {
                        return (
                            <EmployeeShiftAssignCard allshift={holidayAndEmployee?.shifts} key={index} employee={item} token={token} getHolidayAndEmployee={getHolidayAndEmployee} />
                        )
                    })
                }
            </div>

            <ToastContainer position="bottom-right" />
        </div>
    )
}

export default AssignShift;