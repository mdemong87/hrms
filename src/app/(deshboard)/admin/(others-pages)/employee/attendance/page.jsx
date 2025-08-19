'use client'

import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import AttendanceCalendar from "@/components/ecommerce/AttendanceCalendar";
import getCookie from "@/helper/cookie/gettooken";
import { useCallback, useEffect, useState } from "react";
import AttendancePageFilter from "../../../../../../components/ecommerce/AttendancePageFilter";


const SingleEmployeeAttendancesPage = () => {


    const token = getCookie();
    const [allsmployessattendances, setallsmployessattendances] = useState([]);

    // Fetch all Employee here
    const getAllEmployeesAttendance = useCallback(async () => {
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/employees/attendance`,
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
                setallsmployessattendances(res);
            } else {
                console.error("Failed to fetch All Employees Attendances");
            }
        } catch (error) {
            console.error("Error fetching All Employees Attendances:", error);
        }
    }, [token]);

    // Run once on component mount
    useEffect(() => {
        getAllEmployeesAttendance();
    }, [getAllEmployeesAttendance]);



    console.log(allsmployessattendances);



    return (
        <div>
            <PageBreadcrumb pageTitle="Attendance" >
                <AttendancePageFilter />
            </PageBreadcrumb>
            <div className="pt-8">

                <AttendanceCalendar />
            </div>
        </div>
    );
}


export default SingleEmployeeAttendancesPage;