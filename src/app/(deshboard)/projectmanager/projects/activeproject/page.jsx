import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import UnderDevelopment from "@/components/common/UnderDevelopment";

export const metadata = {
    title:
        "Sardar IT - HRMS",
    description: "Sardar IT - HRMS",
};

export default function Profile() {
    return (
        <div>
            <PageBreadcrumb pageTitle={"Active Project"} />
            <UnderDevelopment />
        </div>
    );
}
