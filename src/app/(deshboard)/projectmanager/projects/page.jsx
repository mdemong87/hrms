'use client';
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import ProjectCard from "@/components/common/Projectcard";


const AllProjects = () => {

    return (
        <div>
            <PageBreadcrumb pageTitle={"All Project"} />

            <div className="grid grid-cols-3 gap-6">
                <ProjectCard />
                <ProjectCard />
                <ProjectCard />
                <ProjectCard />
                <ProjectCard />
                <ProjectCard />
            </div>
        </div>
    );
};

export default AllProjects;
