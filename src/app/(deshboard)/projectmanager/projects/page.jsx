import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import ProjectCard from "@/components/common/Projectcard";
import { cookies } from "next/headers";

const AllProjects = async () => {


    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value; // name must match your cookie


    /************** Deshboard Page Data Fetching Here **************/


    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/projects`, {
        cache: "no-store",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

    if (!res.ok) {
        console.error("Fetch failed:", res.status, res.statusText);
        return <div>Error While Loading All Project</div>;
    }

    const AllProject = await res.json();
    console.log(AllProject);


    return (
        <div>
            <PageBreadcrumb pageTitle={"All Project"} />

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">

                {
                    AllProject?.map((item, index) => {
                        return (
                            <ProjectCard key={index} link={`/projectmanager/projects/${item?.id}`} item={item} />
                        )
                    })
                }
            </div>
        </div>
    );
};

export default AllProjects;
