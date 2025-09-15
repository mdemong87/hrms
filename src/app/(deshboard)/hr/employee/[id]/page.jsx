import BackBtn from "@/components/common/BackBtn";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import SingleEmployeeInfo from "@/components/ecommerce/SingleEmployeeInfo";

const SingleEmployee = async ({ params }) => {

    const { id } = await params;

    return (
        <div>
            <PageBreadcrumb pageTitle={"Single Employee info"}>
                <BackBtn />
            </PageBreadcrumb>
            <SingleEmployeeInfo id={id} />
        </div>
    )
}


export default SingleEmployee;