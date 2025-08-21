import BackBtn from "@/components/common/BackBtn";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import AttendancePageFilter from "@/components/ecommerce/AttendancePageFilter";
import SingleAttendance from "../../../../../../../components/ecommerce/SingleAttendance";

const singleUserProfile = async ({ params }) => {



    //single route unique id
    const { id } = await params;



    return (
        <div>
            <PageBreadcrumb pageTitle={"Single Employee Attendance"}>
                <div className="flex items-center gap-2">
                    <BackBtn />
                    <AttendancePageFilter />
                </div>
            </PageBreadcrumb>
            <div className="space-y-6">
                <SingleAttendance id={id} />
            </div>
        </div>
    )
}

export default singleUserProfile;