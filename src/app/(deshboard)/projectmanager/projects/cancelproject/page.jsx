import NoDataFoundCard from "@/components/common/NoDataFound";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import ProjectCard from "@/components/common/Projectcard";
import { cookies } from "next/headers";
import Link from "next/link";

const CancledProjects = async () => {


    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value; // name must match your cookie


    /************** Deshboard Page Data Fetching Here **************/


    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/project/groups`, {
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

    const Projects = await res.json();



    return (
        <div>
            <PageBreadcrumb pageTitle={"Cancelled Projects"}>
                <Link href={'/admin/projects/addproject'} className="text-white bg-blue-600 rounded-md px-4 py-2">Add Project</Link>
            </PageBreadcrumb>

            <div className="grid grid-cols-3 gap-6">

                {

                    Projects?.Cancelled?.length < 1 ? (

                        <NoDataFoundCard />

                    ) : (
                        Projects?.Cancelled?.map((item, index) => {
                            return (
                                <ProjectCard key={index} link={`/projectmanager/projects/cancelproject/${item?.id}`} item={item} />
                            )
                        })
                    )
                }
            </div>
        </div>
    );
};

export default CancledProjects;
