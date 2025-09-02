'use client'
import HtmlRenderer from "@/components/common/HtmlRenderer";
import PriorityBadge from "@/components/common/PriorityBadge";
import StatusBadgeForProject from "@/components/common/StatusBadgeForProject";
import getRole from "@/helper/cookie/getrole";
import Link from "next/link";
import { FaUsers } from "react-icons/fa";

function ProjectCard({ item }) {

    const myRole = getRole();


    return (
        <Link href={`${myRole === "Admin" ? "/admin/projects/5" : myRole === "Hr" ? "/hr/projects/5" : myRole === "Project Manager" ? "/projectmanager/projects/5" : myRole === "Employee" ? "/employee/projects/5" : "/signin"}`}
            className={`max-w-md w-full rounded-2xl p-5 shadow-md transition bg-white text-slate-900 dark:bg-slate-900 dark:text-white`}
        >
            {/* Title & Status */}
            <div className="flex flex-col items-start justify-between">
                <h2 className="text-lg font-semibold">{item?.name}</h2>
            </div>
            {/* Description */}
            <div className="text-sm mt-1 text-gray-400 line-clamp-2">
                <HtmlRenderer htmlContent={item?.description} />
            </div>

            {/* Dates */}
            <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
                <div>
                    <p className="font-semibold">Start:</p>
                    <p className="text-gray-400">{item?.start_date}</p>
                </div>
                <div>
                    <p className="font-semibold">Deadline:</p>
                    <p className="text-gray-400">{item?.end_date}</p>
                </div>
            </div>

            {/* Coordinator & Leader */}
            <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
                <div>
                    <p className="font-semibold">Project Coordinator:</p>
                    {/* <img
                        src={project.coordinator.img}
                        alt={project.coordinator.name}
                        className="w-8 h-8 rounded-full mt-1"
                    /> */}
                </div>
                <div>
                    <p className="font-semibold">Team Leader:</p>
                    <img
                        src={item?.team_leaders[0]?.avatar}
                        alt={"Team Leader Photo"}
                        className="w-8 h-8 rounded-full mt-1"
                    />
                </div>
            </div>

            {/* Team */}
            <div className="mt-4">
                <p className="font-semibold text-sm">Team:</p>
                <div className="flex items-center mt-2">
                    {item?.employees?.slice(0, 3).map((member, idx) => (
                        <img
                            key={idx}
                            src={member?.avatar}
                            alt="team"
                            className="w-8 h-8 rounded-full border-2 border-white -ml-2 first:ml-0"
                        />
                    ))}
                    <div className="flex items-center justify-between w-full">
                        <span className="ml-2 flex items-center text-xs text-gray-400">
                            <FaUsers className="mr-1" /> +{item?.employees?.length}
                        </span>

                        <span className="flex items-center text-xs text-green-500 gap-2">
                            <PriorityBadge priority={item?.priority} />
                            <StatusBadgeForProject status={item?.status} />
                        </span>
                    </div>
                </div>
            </div>

            {/* Progress */}
            <div className="mt-5">
                <p className="font-semibold text-sm">Project Progress</p>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2">
                    <div
                        className={`h-2 rounded-full ${item?.progress > 80 ? "bg-green-500" : item?.progress > 60 ? "bg-purple-500" : item?.progress > 40 ? "bg-purple-500" : "bg-red-500"}`}
                        style={{ width: `${item?.progress}%` }}
                    ></div>
                </div>
                <p className="text-xs mt-1">{item?.progress}%</p>
            </div>
        </Link>
    );
}



export default ProjectCard;