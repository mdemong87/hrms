'use client'

import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import AttendanceTable from "@/components/ecommerce/AttendanceCalendar";
import { useState } from "react";
import AttendancePageFilter from "../../../../../../components/ecommerce/AttendancePageFilter";


export default async function page() {



    //local state here
    const [allemplyee, setallemplyee] = useState([]);


    //fetching all emplyee data from the backend server here
    // try {
    //     const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/emplyee/atendance`);

    //     //check is the responsie is ok or not
    //     if (response.ok) {
    //         const empolyee = await response.json();
    //         setallemplyee(empolyee);
    //         console.log(empolyee);
    //     } else {
    //         console.log("Error while  fetching all Empplyee Data");
    //     }

    // } catch (error) {
    //     console.log(error);
    // }




    return (
        <div>
            <PageBreadcrumb pageTitle="Attendance" >
                <AttendancePageFilter />
            </PageBreadcrumb>
            <div className="pt-8">

                <AttendanceTable />
            </div>
        </div>
    );
}


