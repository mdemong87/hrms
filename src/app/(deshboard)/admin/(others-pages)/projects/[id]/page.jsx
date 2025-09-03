import BackBtn from "@/components/common/BackBtn";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import ProjectOverviewCard from "@/components/common/ProjectOverviewCard";

async function ProjectOverviewPage({ params }) {

    //single route unique id
    const { id } = await params;


    return (
        <div>
            <div>
                <PageBreadcrumb pageTitle={"Project Details"}>
                    <BackBtn />
                </PageBreadcrumb>
            </div>
            <div>
                <ProjectOverviewCard id={id} />
            </div>

        </div>
    );
}


export default ProjectOverviewPage;