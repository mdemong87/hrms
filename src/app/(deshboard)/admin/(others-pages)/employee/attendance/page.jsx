'use client'

import Loading from "@/components/common/Loading";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import AttendanceCalendar from "@/components/ecommerce/AttendanceCalendar";
import getCookie from "@/helper/cookie/gettooken";
import { useCallback, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import AttendancePageFilter from "../../../../../../components/ecommerce/AttendancePageFilter";
import generateAllEmployeeAttendanceDataRecord from "../../../../../../helper/pdfGenerator/generateAllEmployeeAttendanceDataRecord";


const SingleEmployeeAttendancesPage = () => {


    const token = getCookie();
    const [allsmployessattendances, setallsmployessattendances] = useState([]);
    const [SelectedYear, setsetSelectedYear] = useState('');
    const [SelectedMonth, setsetSelectedMonth] = useState('');
    const [isSelect, setIsSelect] = useState(false);
    const [isLoading, setisLoading] = useState(false);




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


        /******* Cehck is user select some year or month  *******/
        if (SelectedYear || SelectedMonth) {
            setIsSelect(true);
        } else {
            setIsSelect(false);
        }



    }, [getAllEmployeesAttendance, SelectedYear, SelectedMonth]);





    /************* Download All Employee Current month Record From Here *************/
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
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/attendance/filter`,
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
                const headers = [["Sl", "Id", "Name", "Weekend", "Leave", "Half Day", "Absent", "Late", "Late (%)", "Worked", "Total Day", "Working Shift"]];


                // preper the pdf body data here
                const passdata = [];
                res?.map((i, index) => {
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
                generateAllEmployeeAttendanceDataRecord(headers, passdata, res[0]?.monthYear);


                toast.success("All Employee Attendance Record Download Successful");


            } else {
                setisLoading(false);
                toast.error("There was a Server Side Problem");
            }
        } catch (error) {
            setisLoading(false);
            toast.error("There was a Server Side Problem");
        }


    }




    return (
        <div>
            {isLoading && <Loading />}
            <PageBreadcrumb pageTitle="Attendance" >
                <AttendancePageFilter SelectedYear={SelectedYear} setsetSelectedYear={setsetSelectedYear} SelectedMonth={SelectedMonth} setsetSelectedMonth={setsetSelectedMonth} hangleDownloadRecord={isSelect ? downloadFilterMonthandYearRecoard : handledownloadrecord} />
            </PageBreadcrumb>
            <div className="pt-8">
                <AttendanceCalendar AttendanceData={allsmployessattendances} />
            </div>
            <ToastContainer position="bottom-right" />
        </div>
    );
}


export default SingleEmployeeAttendancesPage;