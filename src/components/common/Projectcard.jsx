'use client'
import PriorityBadge from "@/components/common/PriorityBadge";
import StatusBadgeForProject from "@/components/common/StatusBadgeForProject";
import getRole from "@/helper/cookie/getrole";
import Image from "next/image";
import Link from "next/link";
import { FaUsers } from "react-icons/fa";

function ProjectCard({ link, item }) {

    const myRole = getRole();


    return (
        <Link href={link}
            className={`max-w-md w-full rounded-2xl p-5 shadow-md transition bg-white text-slate-900 dark:bg-slate-800 dark:text-white`}
        >
            {/* Title & Status */}
            <div className="flex flex-col items-start justify-between">
                <h2 className="text-lg font-semibold">{item?.name}</h2>
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
                    <p className="font-semibold">Project Manager:</p>
                    <div>
                        <Image
                            width={1000} height={1000}
                            src={item?.project_manager?.avatar}
                            alt={"Project Manager Image"}
                            className="w-8 h-8 rounded-full mt-1"
                        />
                        <span className="text-gray-400">{item?.project_manager?.fname}</span>
                    </div>
                </div>
                <div>
                    <p className="font-semibold">Team Leader:</p>
                    <div className="flex items-center mt-2">
                        {item?.team_leaders?.map((i, index) => {
                            return (
                                <Image key={index}
                                    width={1000} height={1000}
                                    src={i?.avatar}
                                    alt={"Team Leader Photo"}
                                    className="w-8 h-8 rounded-full border-2 border-white -ml-2 first:ml-0"
                                />
                            )
                        })}

                    </div>
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
                        className={`h-2 rounded-full ${item?.status == "To-Do" ? "bg-gray-300" : item?.status == "In Progress" ? "bg-blue-300" : item?.status == "Under Review" ? "bg-purple-300" : item?.status == "Completed" ? "bg-green-300" : item?.status == "Delivered" ? "bg-indigo-300" : "bg-gray-300"}`}
                        style={{ width: `${item?.progress}%` }}
                    ></div>
                </div>
                <p className="text-xs mt-1">{item?.progress}%</p>
            </div>

            <div className="flex items-center justify-between gap-2 mt-3">
                <div className="border rounded-md border-gary-800 dark:border-gray-800 font-bold px-2 py-0.05 bg-gray-200 dark:bg-gray-600">
                    {`$${item?.amount}`}
                </div>
                <div>
                    <span className="font-semibold">Sales By:</span>{" "} <span className="font-normal">{item?.taken_by}</span>
                </div>

            </div>
        </Link>
    );
}



export default ProjectCard;