import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import UnderDevelopment from "@/components/common/UnderDevelopment";

const ActiveProjects = () => {
    return (
        <div className="text-gray-500">
            <PageBreadcrumb pageTitle={"Active Project"} />

            <UnderDevelopment />
        </div>
    )
}

export default ActiveProjects;