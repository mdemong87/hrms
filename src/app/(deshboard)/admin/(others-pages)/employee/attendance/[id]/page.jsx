import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import SingleAttendance from "../../../../../../../components/ecommerce/SingleAttendance";

const singleUserProfile = async ({ params }) => {



    /********* single route unique id get from the params *******/
    const { id } = await params;



    return (
        <div>
            <PageBreadcrumb pageTitle={"Single Employee Attendance"}>

            </PageBreadcrumb>
            <div className="space-y-6">
                <SingleAttendance id={id} />
            </div>
        </div>
    )
}

export default singleUserProfile;