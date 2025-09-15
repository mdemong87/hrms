import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import LimitedSingleEmployeeInfo from "@/components/ecommerce/LimitedSingleEmployeeInfo";

const MyProfile = async () => {

    return (
        <div>
            <PageBreadcrumb pageTitle={"My Profile"} />
            <LimitedSingleEmployeeInfo />
        </div>
    )
}

export default MyProfile;