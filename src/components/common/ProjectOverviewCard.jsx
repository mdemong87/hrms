'use client'

import ProjectEdit from "@/components/common/ProjectEdit";
import getCookie from "@/helper/cookie/gettooken";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { GrProjects } from "react-icons/gr";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { toast, ToastContainer } from "react-toastify";
import HtmlRenderer from "./HtmlRenderer";
import Loading from "./Loading";
import PriorityBadge from "./PriorityBadge";
import StatusBadgeForProject from "./StatusBadgeForProject";

const ProjectOverviewCard = ({ id }) => {



    const token = getCookie();
    const router = useRouter();
    const [singleProject, setsingleProject] = useState([]);
    const [isloading, setisloading] = useState(false);
    const [isEdit, setisEdit] = useState(false);




    /****************** Get Single Employee Information Here *******************/
    const getSingleProject = useCallback(async (id) => {

        setisloading(true);

        try {

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/projects/${id}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );


            if (response.ok) {
                const res = await response.json();
                setsingleProject(res);
                setisloading(false);
            } else {
                console.error("Failed to fetch single Project Overview");
                setisloading(false);
            }
        } catch (error) {
            console.error("Error fetching single Project Overview:", error);
            setisloading(false);
        }
    }, [token]);




    /**************** Run once on component mount *****************/
    useEffect(() => {
        getSingleProject(id);
    }, [getSingleProject, id]);




    /**************** Delete Project funcion Here ****************/
    async function DeleteProject(e, id) {
        e.preventDefault();

        const isComfirm = confirm("Are you sure to Delete This Project.?");

        if (isComfirm) {
            try {
                setisloading(true);

                //send a post request in the backend
                const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/projects/${id}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    }
                });


                if (response.ok) {
                    setisloading(false);
                    const data = await response.json();
                    console.log(response);
                    toast.success("Delete Project successful");

                    // role base redirect all employee page after successfully employee added
                    setTimeout(() => {
                        router.push('/admin/projects');
                    }, 200);
                } else {
                    setisloading(false);
                    const errorData = await response.json();
                    toast.error('Delete Project Failed');
                    console.error("Delete Project Failed:", errorData);
                }
            } catch (error) {
                setisloading(false);
                console.error(error);
            }
        }



    }



    return (
        <div
            className={`w-full max-w-6xl grid grid-cols-1 lg:grid-cols-4 gap-6 p-4 transition bg-white text-slate-900 dark:bg-slate-900 dark:text-white rounded-lg relative`}
        >
            {isloading && <Loading />}

            {isEdit && <ProjectEdit isEdit={isEdit} setisEdit={setisEdit} singleProject={singleProject} projectId={id} />}


            {
                !isEdit && (
                    <>
                        <div className="lg:col-span-3 space-y-4">

                            <div className="rounded-xl p-4 shadow-sm bg-white dark:bg-slate-800">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-600">
                                        <GrProjects className="text-2xl" />
                                    </div>
                                    <div className="flex items-center justify-between w-full">
                                        <div>
                                            <h2 className="text-lg font-semibold">{singleProject?.name}</h2>
                                            <p className="text-sm text-gray-400">
                                                {singleProject?.client} • <span className="font-bold">Create Date:</span>{" "}
                                                {singleProject?.start_date} • <span className="font-bold">Deadline:</span>{" "}
                                                {singleProject?.end_date}
                                            </p>
                                        </div>


                                        <div className="flex flex-col gap-0 items-end">
                                            <div className="flex items-center gap-2">
                                                <button onClick={(e) => { setisEdit(true) }} className="bg-green-700 font-medium flex items-center gap-1 px-4 py-2 rounded-md text-white cursor-pointer font-medium">
                                                    <FaEdit className="text-md" />
                                                    <span className="text-sm">Edit</span>
                                                </button>
                                                <button onClick={(e) => { DeleteProject(e, id) }} className="bg-red-700 font-medium flex items-center gap-1 p-2 rounded-md text-white cursor-pointer font-medium">
                                                    <RiDeleteBin5Fill className="text-md" />
                                                    <span className="text-sm">Delete</span>
                                                </button>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <span className="pt-5">
                                                    <PriorityBadge priority={singleProject?.priority} />
                                                </span>
                                                <span className="pt-5">
                                                    <StatusBadgeForProject status={singleProject?.status} />
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div className="rounded-xl p-5 shadow-md bg-white dark:bg-slate-800">
                                <h3 className="font-semibold mb-2">Summary</h3>
                                <div className="text-sm text-gray-900 dark:text-gray-50 whitespace-pre-line">
                                    <HtmlRenderer htmlContent={singleProject?.description} />
                                </div>


                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="rounded-xl p-4 shadow-md bg-white dark:bg-slate-800">
                                <h3 className="font-semibold mb-3">Assigned Team</h3>
                                <div className="space-y-3">
                                    {singleProject?.employees?.map((member, idx) => (
                                        <div key={idx} className="flex items-center gap-3">
                                            <Image width={1000} height={1000} src={member?.avatar} alt={"assign-employee-profile-image"} className="w-10 h-10 rounded-full" />
                                            <div>
                                                <p className="text-sm font-medium">{member.fname + " " + member?.lname}</p>
                                                <p className="text-xs text-gray-400">{member?.designation}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </>
                )
            }

            <ToastContainer />

        </div>
    )
}

export default ProjectOverviewCard;