'use client'

import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import getId from "@/helper/cookie/getid";
import SingleAttendance from "../../../../components/ecommerce/SingleAttendance";

const EmployeeAttendance = () => {

    const id = getId();

    return (
        <div>
            <PageBreadcrumb pageTitle={"My Attendance"}>

            </PageBreadcrumb>
            <div className="space-y-6">
                <SingleAttendance id={id} />
            </div>
        </div>
    )
}


export default EmployeeAttendance;