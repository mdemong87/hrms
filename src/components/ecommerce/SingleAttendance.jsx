"use client";

import getCookie from "@/helper/cookie/gettooken";
import { useCallback, useEffect, useState } from "react";
import minutestohoursandminutesconvarter from "../../helper/minutestohoursandminutesconvarter";
import generateSingleEmployeeAttendanceRecoard from "../../helper/pdfGenerator/generateSingleEmployeeAttendanceRecoard";
import timeformate from "../../helper/timeformate";
import BackBtn from "../common/BackBtn";
import Loading from "../common/Loading";
import AttendancePageFilter from "./AttendancePageFilter";


const SingleAttendance = ({ id }) => {


    const token = getCookie();
    const [SingleEmployeeAttendance, setSingleEmployeeAttendance] = useState([]);
    const [SelectedYear, setsetSelectedYear] = useState('');
    const [SelectedMonth, setsetSelectedMonth] = useState('');


    /****************** Get Single Employee Information Here *******************/
    const getSingleEmployeeAttendance = useCallback(async (id) => {
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/employee/attendance/${id}`,
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
                setSingleEmployeeAttendance(res);
            } else {
                console.error("Failed to fetch single employee attendance");
            }
        } catch (error) {
            console.error("Error fetching single employee attendance:", error);
        }
    }, [token]);




    /**************** Run once on component mount *****************/
    useEffect(() => {
        getSingleEmployeeAttendance(id);
    }, [getSingleEmployeeAttendance, id]);




    /************* Download Single Employee Record From Here *************/
    const handledownloadrecord = (e) => {


        // Table genaratable pdf record table Title Assign here
        const headers = [["Date", "Status", "CheckIn", "CheckOut", "Late", "OverTime", "Production Hours"]];


        // preper the pdf body data here
        const passdata = [];
        SingleEmployeeAttendance?.map((i, index) => {
            const subarr = [];
            subarr.push(i?.date);
            subarr.push(i?.in_time);
            subarr.push(i?.status);
            subarr.push(i?.out_time);
            subarr.push(i?.late);
            subarr.push(i?.overtime);
            subarr.push(i?.production_hours);
            passdata.push(subarr);
        })


        // call to generator of the pdf recoard of single employee information of a month
        generateSingleEmployeeAttendanceRecoard(headers, passdata, SingleEmployeeAttendance[0].employee_eid, SingleEmployeeAttendance[0]?.employee_name, SingleEmployeeAttendance[0]?.employee_designation, SingleEmployeeAttendance[0]?.monthYear, SingleEmployeeAttendance[0]?.shifts);

    }



    return (
        <div className={''}>

            {SingleEmployeeAttendance?.length < 1 && <Loading />}

            <div className="flex justify-end">
                <div className="flex text-white p-5 items-center gap-2">
                    <BackBtn />
                    <AttendancePageFilter SelectedYear={SelectedYear} setsetSelectedYear={setsetSelectedYear} SelectedMonth={SelectedMonth} setsetSelectedMonth={setsetSelectedMonth} hangleDownloadRecord={handledownloadrecord} />
                </div>
            </div>

            <div className="overflow-x-auto rounded-md">
                <table className="min-w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
                            <th className="px-4 py-3 text-left text-center">Date</th>
                            <th className="px-4 py-3 text-left text-center">Check In</th>
                            <th className="px-4 py-3 text-left text-center">Status</th>
                            <th className="px-4 py-3 text-left text-center">Check Out</th>
                            <th className="px-4 py-3 text-left text-center">Late</th>
                            <th className="px-4 py-3 text-left text-center">Overtime</th>
                            <th className="px-4 py-3 text-left text-center">Production Hours</th>
                        </tr>
                    </thead>
                    <tbody>
                        {SingleEmployeeAttendance.map((row, i) => (
                            <tr
                                key={i}
                                className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200 transition"
                            >
                                <td className="px-4 py-3 text-sm">{row?.date}</td>
                                <td className="px-4 py-3 text-sm">{timeformate(row?.in_time)}</td>
                                <td className="px-4 py-3 text-sm">
                                    <span
                                        className={`px-2 py-1 rounded-full text-xs font-semibold ${row?.status === "Present"
                                            ? "bg-green-100 text-green-700 dark:bg-green-700 dark:text-green-100"
                                            : row?.status === "Half" ? "bg-yellow-400 text-red-700 dark:bg-yellow-700 dark:text-red-100" : row?.status === "Holiday" ? "bg-blue-400 text-gray-100 dark:bg-blue-700 dark:text-red-100" : row?.status === "Late" ? "bg-violet-400 text-gray-100 dark:bg-violet-700 dark:text-red-100" : "bg-red-100 text-red-700 dark:bg-red-700 dark:text-red-100"
                                            }`}
                                    >
                                        {row.status}
                                    </span>
                                </td>
                                <td className="px-4 py-3 text-sm">{timeformate(row?.out_time)}</td>
                                <td className="px-4 py-3 text-sm">{minutestohoursandminutesconvarter(row?.late)}</td>
                                <td className="px-4 py-3 text-sm">{minutestohoursandminutesconvarter(row?.
                                    overtime)}</td>
                                <td className="px-4 py-3 text-sm">
                                    {minutestohoursandminutesconvarter(row?.production_hours)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SingleAttendance;
