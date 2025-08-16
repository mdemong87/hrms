// 'use client'

import BackBtn from "@/components/common/BackBtn";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
// import { useState } from "react";
import AttendancePageFilter from "@/components/ecommerce/AttendancePageFilter";
import SingleAttendance from "../../../../../../../components/ecommerce/SingleAttendance";

const singleUserProfile = ({ params }) => {



    //single route unique id
    // const id = params?.id;
    // console.log(id);

    //local state here
    // const [signleemplyee, setsingleemplyee] = useState([]);


    //fetching single emplyee data from the backend server here
    // try {
    //     const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/emplyee/atendance/${id}`);

    //     //check if the respose is ok or not
    //     if (response.ok) {
    //         const res = await response.json();
    //         setsingleemplyee(res);
    //         console.log(singleemplyee);
    //     } else {
    //         console.log("error while fetcing single emplyee data");
    //     }

    // } catch (error) {
    //     console.log(error);
    // }





    return (
        <div>
            <PageBreadcrumb pageTitle={"Single Employee Attendance"}>
                <div className="flex items-center gap-2">
                    <BackBtn />
                    <AttendancePageFilter />
                </div>
            </PageBreadcrumb>
            <div className="space-y-6">
                <SingleAttendance />
            </div>
        </div>
    )
}

export default singleUserProfile;