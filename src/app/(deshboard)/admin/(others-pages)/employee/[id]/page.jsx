import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import SingleEmployeeInfo from "@/components/ecommerce/SingleEmployeeInfo";

const SingleEmployee = () => {
    return (
        <div>
            <PageBreadcrumb pageTitle={"Single Employee info"} />
            <SingleEmployeeInfo />
        </div>
    )
}


export default SingleEmployee;