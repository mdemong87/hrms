'use client'

import BackBtn from "@/components/common/BackBtn";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";

export default function ProjectOverviewCard() {

    const project = {
        title: "Laravel Education App Development",
        company: "Bdevs Limited",
        createDate: "May 16, 2024",
        deadline: "Aug 15, 2025",
        priority: "High",
        status: "Inprogress",
        description: `This project involves the development of an education application using the Laravel framework. The app aims to provide comprehensive features for students and educators, including course management, student assessments, and real-time communication.

The application will leverage Laravel's robust MVC architecture to ensure a scalable and maintainable codebase. Key features will include user authentication, course content management, interactive forums, and analytics for tracking student progress.

The development process will follow agile methodologies to ensure regular updates and feature enhancements based on user feedback. A dedicated team will work on front-end and back-end development to deliver a seamless user experience....`,
        features: [
            "Course management system with content upload capabilities.",
            "Real-time communication tools for students and teachers.",
            "Secure user authentication and role-based access control.",
            "Interactive forums for peer-to-peer learning.",
            "Detailed analytics and reporting features.",
        ],
        team: [
            { name: "Melanie S.", role: "Project Manager", img: "https://i.pravatar.cc/50?img=5" },
            { name: "Melanie S.", role: "Project Manager", img: "https://i.pravatar.cc/50?img=6" },
            { name: "Melanie S.", role: "Project Manager", img: "https://i.pravatar.cc/50?img=7" },
            { name: "Melanie S.", role: "Project Manager", img: "https://i.pravatar.cc/50?img=8" },
            { name: "Melanie S.", role: "Project Manager", img: "https://i.pravatar.cc/50?img=9" },
            { name: "Melanie S.", role: "Project Manager", img: "https://i.pravatar.cc/50?img=5" },
            { name: "Melanie S.", role: "Project Manager", img: "https://i.pravatar.cc/50?img=6" },
            { name: "Melanie S.", role: "Project Manager", img: "https://i.pravatar.cc/50?img=7" },
            { name: "Melanie S.", role: "Project Manager", img: "https://i.pravatar.cc/50?img=8" },
            { name: "Melanie S.", role: "Project Manager", img: "https://i.pravatar.cc/50?img=9" },
        ],
        progress: [
            { name: "Project Planning", percent: 100, color: "bg-purple-500" },
            { name: "Requirement Analysis", percent: 90, color: "bg-cyan-400" },
            { name: "Design & Prototyping", percent: 80, color: "bg-green-500" },
            { name: "Development", percent: 80, color: "bg-blue-500" },
            { name: "Testing", percent: 60, color: "bg-sky-400" },
        ],
    };

    return (
        <div>
            <div>
                <PageBreadcrumb pageTitle={"Project Details"}>
                    <BackBtn />
                </PageBreadcrumb>
            </div>
            <div
                className={`w-full max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-6 p-4 transition bg-white text-slate-900 dark:bg-slate-900 dark:text-white rounded-lg`}
            >
                {/* Left Section */}
                <div className="lg:col-span-2 space-y-4">
                    {/* Header */}
                    <div className="rounded-xl p-4 shadow-sm bg-white dark:bg-slate-800">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-red-100">
                                <span className="text-red-500 text-2xl">L</span>
                            </div>
                            <div>
                                <h2 className="text-lg font-semibold">{project.title}</h2>
                                <p className="text-xs text-gray-400">
                                    {project.company} • <span className="font-medium">Create Date:</span>{" "}
                                    {project.createDate} • <span className="font-medium">Deadline:</span>{" "}
                                    {project.deadline}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Summary */}
                    <div className="rounded-xl p-5 shadow-md bg-white dark:bg-slate-800">
                        <h3 className="font-semibold mb-2">Summary</h3>
                        <p className="text-sm text-gray-400 dark:text-gray-300 whitespace-pre-line">{project.description}</p>

                        {/* Features */}
                        <ul className="list-disc pl-5 mt-3 text-sm text-gray-400 dark:text-gray-300 space-y-1">
                            {project.features.map((f, idx) => (
                                <li key={idx}>{f}</li>
                            ))}
                        </ul>

                        {/* Dates / Status */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-5 text-sm">
                            <div>
                                <p className="font-semibold">Create Date:</p>
                                <p>{project.createDate}</p>
                            </div>
                            <div>
                                <p className="font-semibold">Deadline:</p>
                                <p>{project.deadline}</p>
                            </div>
                            <div>
                                <p className="font-semibold">Priority:</p>
                                <span className="px-2 py-1 rounded-md text-xs text-white bg-green-500">{project.priority}</span>
                            </div>
                            <div>
                                <p className="font-semibold">Status:</p>
                                <span className="px-2 py-1 rounded-md text-xs bg-yellow-500 text-slate-900">
                                    {project.status}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Section */}
                <div className="space-y-4">
                    {/* Team */}
                    <div className="rounded-xl p-4 shadow-md bg-white dark:bg-slate-800">
                        <h3 className="font-semibold mb-3">Assigned Team</h3>
                        <div className="space-y-3">
                            {project.team.map((member, idx) => (
                                <div key={idx} className="flex items-center gap-3">
                                    <img src={member.img} alt={member.name} className="w-10 h-10 rounded-full" />
                                    <div>
                                        <p className="text-sm font-medium">{member.name}</p>
                                        <p className="text-xs text-gray-400">{member.role}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Work Progress */}
                    {/* <div className="rounded-xl p-4 shadow-md bg-white-800 dark:bg-slate-800">
                        <h3 className="font-semibold mb-3">Work Progress</h3>
                        <div className="space-y-3">
                            {project.progress.map((step, idx) => (
                                <div key={idx}>
                                    <div className="flex justify-between text-xs mb-1">
                                        <span>{step.name}</span>
                                        <span>{step.percent}%</span>
                                    </div>
                                    <div className="w-full bg-gray-700 rounded-full h-2">
                                        <div
                                            className={`${step.color} h-2 rounded-full`}
                                            style={{ width: `${step.percent}%` }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
    );
}
