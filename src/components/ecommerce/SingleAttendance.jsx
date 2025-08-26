"use client";

import getCookie from "@/helper/cookie/gettooken";
import { useCallback, useEffect, useState } from "react";
import { FaUserTie } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import NoDataFoundCard from "../../components/common/NoDataFound";
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
    const [isSelect, setIsSelect] = useState(false);
    const [isLoading, setisLoading] = useState(false);


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

        /******* Cehck is user select some year or month  *******/
        if (SelectedYear || SelectedMonth) {
            setIsSelect(true);
        } else {
            setIsSelect(false);
        }

    }, [getSingleEmployeeAttendance, id, SelectedYear, SelectedMonth]);




    /************* Download Single Employee Record From Here *************/
    const handledownloadrecord = (e) => {


        // Table genaratable pdf record table Title Assign here
        const headers = [["Date", "Status", "CheckIn", "CheckOut", "Late", "OverTime", "Production Hours", "Shift"]];


        // preper the pdf body data here
        const passdata = [];
        SingleEmployeeAttendance?.map((i, index) => {
            const subarr = [];
            subarr.push(i?.date);
            subarr.push(i?.status);
            subarr.push(timeformate(i?.in_time));
            subarr.push(timeformate(i?.out_time));
            subarr.push(minutestohoursandminutesconvarter(i?.late));
            subarr.push(minutestohoursandminutesconvarter(i?.overtime));
            subarr.push(minutestohoursandminutesconvarter(i?.production_hours));
            subarr.push(i?.shift);
            passdata.push(subarr);
        })


        // call to generator of the pdf recoard of single employee information of a month
        generateSingleEmployeeAttendanceRecoard(headers, passdata, SingleEmployeeAttendance[0].employee_eid, SingleEmployeeAttendance[0]?.employee_name, SingleEmployeeAttendance[0]?.employee_designation, SingleEmployeeAttendance[0]?.monthYear, SingleEmployeeAttendance[0]?.shift);

    }



    /********** Download All Employee Filter month and year Record From Here **********/
    const downloadFilterMonthandYearRecoard = async () => {

        const currentYear = new Date().getFullYear();

        // validate frist, check user is select month or year or not
        if (!SelectedYear || !SelectedMonth) {
            toast.warn("Select Month And Year Both");
            return;
        } else if (SelectedYear > currentYear) {
            toast.warn("Select a Valid Year! ");
            return;
        }

        //loading enable
        setisLoading(true);


        // get the user seleted data from the server
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/attendance/filter/${id}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({ SelectedYear, SelectedMonth }),
                }
            );

            if (response.ok) {

                const res = await response.json();

                //clear the selected data
                setsetSelectedYear('');
                setsetSelectedMonth('');
                setisLoading(false);


                // generate the pdf file for dowload record
                // Table genaratable pdf record table Title Assign here
                const headers = [["Date", "Status", "CheckIn", "CheckOut", "Late", "OverTime", "Production Hours", "Shift"]];


                // preper the pdf body data here
                const passdata = [];
                res?.map((i, index) => {
                    const subarr = [];
                    subarr.push(i?.date);
                    subarr.push(i?.status);
                    subarr.push(timeformate(i?.in_time));
                    subarr.push(timeformate(i?.out_time));
                    subarr.push(minutestohoursandminutesconvarter(i?.late));
                    subarr.push(minutestohoursandminutesconvarter(i?.overtime));
                    subarr.push(minutestohoursandminutesconvarter(i?.production_minutes));
                    subarr.push(i?.shifts);
                    passdata.push(subarr);
                })


                // call to generator of the pdf recoard of single employee information of a month
                generateSingleEmployeeAttendanceRecoard(headers, passdata, res[0].employee_eid, res[0]?.employee_name, res[0]?.employee_designation, res[0]?.monthYear, res[0]?.shifts);


                toast.success("Single Employee Attendance Record Download Successful");


            }

        } catch (error) {
            setisLoading(false);
            console.log(error);
            toast.error("There was a Server Side Problem");
        }


    }



    /*************** log Here ***************/
    console.log(SingleEmployeeAttendance);


    return (
        <div className={''}>

            {SingleEmployeeAttendance?.length < 1 && <Loading />}
            {isLoading && <Loading />}

            <div className="flex justify-end">
                <div className="text-white p-5 pl-0 flex justify-between items-center gap-2 w-full">
                    <div className="text-left">
                        <div className="text-gray-800 flex items-center gap-2 font-bold text-2xl dark:text-gray-200 bg-gray-200 dark:bg-gray-700 px-3 rounded-md py-1">
                            <FaUserTie />
                            <span className="text-xl">{SingleEmployeeAttendance[0]?.employee_name}</span>
                        </div>
                    </div>
                    <div className="flex gap-2 items-center">
                        <BackBtn />
                        <AttendancePageFilter disabled={SingleEmployeeAttendance.length === 2 && SingleEmployeeAttendance[0] === -1 && true} SelectedYear={SelectedYear} setsetSelectedYear={setsetSelectedYear} SelectedMonth={SelectedMonth} setsetSelectedMonth={setsetSelectedMonth} hangleDownloadRecord={isSelect ? downloadFilterMonthandYearRecoard : handledownloadrecord} />
                    </div>
                </div>
            </div>

            <div className="overflow-x-auto rounded-md">


                {/* no data found checking */}
                {SingleEmployeeAttendance.length === 2 && SingleEmployeeAttendance[0] === -1 ? <NoDataFoundCard /> : (
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
                                <th className="px-4 py-3 text-left text-center">Working Shift</th>
                            </tr>
                        </thead>
                        <tbody>
                            {SingleEmployeeAttendance?.map((row, i) => (
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
                                    <td className="px-4 py-3 text-sm">{row?.status === "Absent" ? "-" : timeformate(row?.out_time)}</td>
                                    <td className="px-4 py-3 text-sm">{minutestohoursandminutesconvarter(row?.late)}</td>
                                    <td className="px-4 py-3 text-sm">{minutestohoursandminutesconvarter(row?.
                                        overtime)}</td>
                                    <td className="px-4 py-3 text-sm">
                                        {minutestohoursandminutesconvarter(row?.production_hours)}
                                    </td>
                                    <td className="px-4 py-3 text-sm">
                                        {row?.shift}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

            </div>
            <ToastContainer position="bottom-right" />
        </div >
    );
};

export default SingleAttendance;
