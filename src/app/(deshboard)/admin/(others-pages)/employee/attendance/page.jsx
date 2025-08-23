'use client'

import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import AttendanceCalendar from "@/components/ecommerce/AttendanceCalendar";
import getCookie from "@/helper/cookie/gettooken";
import { useCallback, useEffect, useState } from "react";
import AttendancePageFilter from "../../../../../../components/ecommerce/AttendancePageFilter";
import generateAllEmployeeAttendanceDataRecord from "../../../../../../helper/pdfGenerator/generateAllEmployeeAttendanceDataRecord";


const SingleEmployeeAttendancesPage = () => {


    const token = getCookie();
    const [allsmployessattendances, setallsmployessattendances] = useState([]);
    const [SelectedYear, setsetSelectedYear] = useState('');
    const [SelectedMonth, setsetSelectedMonth] = useState('');



    /****************** Get All Employee Attendance information Here *******************/
    const getAllEmployeesAttendance = useCallback(async () => {
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/attendances`,
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



    /************* Run once on component mount **************/
    useEffect(() => {
        getAllEmployeesAttendance();
    }, [getAllEmployeesAttendance]);





    /************* Download All Employee Record From Here *************/
    const handledownloadrecord = (e) => {




        // Table genaratable pdf record table Title Assign here
        const headers = [["Sl", "Id", "Name", "Weekend", "Leave", "Half Day", "Absent", "Late", "Late (%)", "Worked", "Total Day", "Working Shift"]];


        // preper the pdf body data here
        const passdata = [];
        allsmployessattendances?.map((i, index) => {
            const subarr = [];
            subarr.push(index + 1);
            subarr.push(i?.employee_eid);
            subarr.push(i?.employee_name);
            subarr.push(i?.summary?.Holiday);
            subarr.push(i?.summary?.Leave);
            subarr.push(i?.summary?.Half);
            subarr.push(i?.summary?.Absent);
            subarr.push(i?.summary?.Late);
            subarr.push(`${i?.late_percentage} %`);
            subarr.push(i?.summary?.Present);
            subarr.push(i?.total_days);
            subarr.push(i?.shift);
            passdata.push(subarr);
        })



        // call to generator of the pdf recoard of ALL Employee information of a month
        generateAllEmployeeAttendanceDataRecord(headers, passdata, allsmployessattendances[0]?.monthYear);

    }


    return (
        <div>
            <PageBreadcrumb pageTitle="Attendance" >
                <AttendancePageFilter SelectedYear={SelectedYear} setsetSelectedYear={setsetSelectedYear} SelectedMonth={SelectedMonth} setsetSelectedMonth={setsetSelectedMonth} hangleDownloadRecord={handledownloadrecord} />
            </PageBreadcrumb>
            <div className="pt-8">
                <AttendanceCalendar AttendanceData={allsmployessattendances} />
            </div>
        </div>
    );
}


export default SingleEmployeeAttendancesPage;