'use client'

import Loading from "@/components/common/Loading";
import getCookie from "@/helper/cookie/gettooken";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import EmployeeShiftAssignCard from "../../../../../components/ecommerce/EmployeeShiftAssignCard";

const AssignShift = () => {

    const token = getCookie();
    const [holidayAndEmployee, setholidayAndEmployee] = useState([]);
    const [isloading, setisloading] = useState(false);



    /**************** Get Employee Assign on Shift and Employee Here ******************/
    const getHolidayAndEmployee = useCallback(async () => {
        try {
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




    /******************* Assign Employee on a Shift Functionality Here ******************/
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



    /******************* Delete Assign Employee on a Shift Functionality Here ******************/
    async function handleDeleteHoliday(id) {



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









    /****** log here ******/
    console.log(holidayAndEmployee);



    return (


        <div className="mx-auto  p-6 rounded-xl shadow-sm space-y-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-600">
            {isloading && <Loading />}
            {/* Add Holiday Form */}
            <div className=" flex items-center justify-between">
                <h2 className="text-2xl font-semibold mb-1 dark:text-gray-100">Employee Assign on Shift</h2>
                <select className="w-[250px] border border-gray-300 dark:border-gray-700 p-1 rounded-md">
                    <option value="">Selete Shift</option>
                    {holidayAndEmployee?.shifts?.map((item, index) => {
                        return (
                            <option value="">{item?.shift_name}</option>
                        )
                    })}
                </select>
            </div>

            <div className="grid grid-cols-3 items-center gap-6">

                {
                    holidayAndEmployee?.data?.map((item, index) => {
                        return (
                            <EmployeeShiftAssignCard allshift={holidayAndEmployee?.shifts} key={index} employee={item} />
                        )
                    })
                }
            </div>

        </div>
    )
}

export default AssignShift;