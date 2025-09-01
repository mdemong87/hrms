'use client'
import getRole from "@/helper/cookie/getrole";
import Link from "next/link";
import { FaUsers } from "react-icons/fa";

function ProjectCard() {

    const myRole = getRole();


    const project = {
        title: "React Native Mobile App Development",
        status: "On Going",
        tasks: { open: 8, completed: 12 },
        description:
            "Developing a cross-platform mobile application using React Native for a seamless user experience on both iOS and Android.",
        start: "15 February 2024",
        deadline: "30 June 2024",
        coordinator: { name: "Sarah", img: "https://i.pravatar.cc/50?img=11" },
        leader: { name: "Emma", img: "https://i.pravatar.cc/50?img=12" },
        team: [
            "https://i.pravatar.cc/50?img=20",
            "https://i.pravatar.cc/50?img=21",
            "https://i.pravatar.cc/50?img=22",
            "https://i.pravatar.cc/50?img=23",
        ],
        progress: 45,
    };

    return (
        <Link href={`${myRole === "Admin" ? "/admin/projects/5" : myRole === "Hr" ? "/hr/projects/5" : myRole === "Project Manager" ? "/projectmanager/projects/5" : myRole === "Employee" ? "/employee/projects/5" : "/signin"}`}
            className={`max-w-md w-full rounded-2xl p-5 shadow-md transition bg-white text-slate-900 dark:bg-slate-900 dark:text-white`}
        >
            {/* Title & Status */}
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">{project.title}</h2>
                <span className="text-xs text-green-500">{project.status}</span>
            </div>
            <p className="text-sm mt-1 text-gray-400">
                {project.tasks.open} open tasks, {project.tasks.completed} tasks have
                been completed
            </p>

            {/* Description */}
            <p className="text-sm mt-3">{project.description}</p>

            {/* Dates */}
            <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
                <div>
                    <p className="font-semibold">Start:</p>
                    <p className="text-gray-400">{project.start}</p>
                </div>
                <div>
                    <p className="font-semibold">Deadline:</p>
                    <p className="text-gray-400">{project.deadline}</p>
                </div>
            </div>

            {/* Coordinator & Leader */}
            <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
                <div>
                    <p className="font-semibold">Project Coordinator:</p>
                    <img
                        src={project.coordinator.img}
                        alt={project.coordinator.name}
                        className="w-8 h-8 rounded-full mt-1"
                    />
                </div>
                <div>
                    <p className="font-semibold">Team Leader:</p>
                    <img
                        src={project.leader.img}
                        alt={project.leader.name}
                        className="w-8 h-8 rounded-full mt-1"
                    />
                </div>
            </div>

            {/* Team */}
            <div className="mt-4">
                <p className="font-semibold text-sm">Team:</p>
                <div className="flex items-center mt-2">
                    {project.team.slice(0, 3).map((member, idx) => (
                        <img
                            key={idx}
                            src={member}
                            alt="team"
                            className="w-8 h-8 rounded-full border-2 border-white -ml-2 first:ml-0"
                        />
                    ))}
                    <span className="ml-2 flex items-center text-xs text-gray-400">
                        <FaUsers className="mr-1" /> +15
                    </span>
                </div>
            </div>

            {/* Progress */}
            <div className="mt-5">
                <p className="font-semibold text-sm">Project Progress</p>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2">
                    <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${project.progress}%` }}
                    ></div>
                </div>
                <p className="text-xs mt-1">{project.progress}%</p>
            </div>
        </Link>
    );
}



export default ProjectCard;