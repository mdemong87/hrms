import NoProjectAssignCard from "@/components/common/NoProjectAssignCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import ProjectCard from "@/components/common/Projectcard";
import { cookies } from "next/headers";

const MyProjects = async () => {


    const cookieStore = await cookies();
    const token = cookieStore?.get("token")?.value; // name must match your cookie


    /************** Deshboard Page Data Fetching Here **************/


    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/employeeproject`, {
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

    if (AllProject?.length < 1) {
        return (
            <div className="w-full h-[80vh] flex items-center justify-center">
                <NoProjectAssignCard />
            </div>
        )
    }


    console.log(AllProject);


    return (
        <div>
            <PageBreadcrumb pageTitle={"My Project"} />

            <div className="grid grid-cols-3 gap-6">

                {
                    AllProject?.map((item, index) => {
                        return (
                            <ProjectCard key={index} link={`/employee/projects/myproject/${item?.id}`} item={item} />
                        )
                    })
                }
            </div>
        </div>
    );
};

export default MyProjects;
