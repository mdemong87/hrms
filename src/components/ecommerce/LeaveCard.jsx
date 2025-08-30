'use client'

import { CalendarDays, CheckCircle2, Clock3, User2, XCircle } from "lucide-react";
import NoDataFoundCard from "../common/NoDataFound";
import PageBreadcrumb from "../common/PageBreadCrumb";



function StatusBadge({ status }) {
    const map = {
        approved: {
            icon: <CheckCircle2 className="h-4 w-4" aria-hidden />,
            classes:
                "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-300 dark:ring-emerald-700/50",
            label: "Approved",
        },
        pending: {
            icon: <Clock3 className="h-4 w-4" aria-hidden />,
            classes:
                "bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-200 dark:bg-amber-500/10 dark:text-amber-300 dark:ring-amber-700/50",
            label: "Pending",
        },
        rejected: {
            icon: <XCircle className="h-4 w-4" aria-hidden />,
            classes:
                "bg-rose-50 text-rose-700 ring-1 ring-inset ring-rose-200 dark:bg-rose-500/10 dark:text-rose-300 dark:ring-rose-700/50",
            label: "Rejected",
        },
    };
    const s = map[status] ?? map.pending;
    return (
        <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${s.classes}`}>
            {s.icon}
            {s.label}
        </span>
    );
}

function LeaveCard({ item, hanldeLeaveDelete }) {
    return (
        <div
            className="group relative overflow-hidden rounded-2xl border border-transparent bg-white p-5 shadow-sm ring-1 ring-gray-200/60 hover:shadow-md dark:bg-neutral-900 dark:ring-neutral-800"
            role="region"
            aria-label={`Leave card for ${name}`}
        >

            <header className="flex items-start justify-end gap-4">
                {/* <div className="flex items-center gap-3">
                    <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-indigo-50 to-indigo-100 ring-1 ring-indigo-100/60 dark:from-indigo-400/10 dark:to-indigo-400/10 dark:ring-indigo-400/20">
                        <Briefcase className="h-5 w-5 text-indigo-600 dark:text-indigo-300" aria-hidden />
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">{name}</h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{role}</p>
                    </div>
                </div> */}
                <StatusBadge status={item?.status} />
            </header>

            <div className="mt-4 grid gap-3 text-sm">
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                    <CalendarDays className="h-4 w-4" aria-hidden />
                    <span>
                        <span className="font-medium">{item?.start_date}</span> - <span className="font-medium">{item?.end_date
                        }</span>
                        <span className="ml-2 text-gray-400 dark:text-gray-500">({item?.days} {item?.days === 1 ? "day" : "days"})</span>
                    </span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                    <User2 className="h-4 w-4" aria-hidden />
                    <p className="truncate text-wrap">
                        <span className="text-gray-500 dark:text-gray-400">
                            Reason:
                        </span>
                        {item?.reason}
                    </p>
                </div>
            </div>

            <footer className="mt-5 flex items-center gap-2">
                {/* <button
                    className="inline-flex items-center justify-center rounded-xl px-3.5 py-2 text-sm font-medium shadow-sm ring-1 ring-inset ring-gray-300 transition hover:bg-gray-50 active:scale-[0.99] dark:text-gray-100 dark:ring-neutral-700 dark:hover:bg-neutral-800"
                    type="button"
                >
                    View Details
                </button>
                <button
                    className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-3.5 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-500 active:scale-[0.99] dark:bg-indigo-500 dark:hover:bg-indigo-400"
                    type="button"
                >
                    Approve
                </button> */}

                <button onClick={() => { hanldeLeaveDelete(item?.id) }}
                    className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-3.5 py-2 text-sm font-medium text-gray-100 shadow-sm transition hover:bg-blue-500 active:scale-[0.99] dark:bg-blue-600 dark:text-gray-100 dark:hover:bg-blue-500"
                >
                    Delete
                </button>
            </footer>
        </div>
    );
}

export default function LeaveCardDemo({ myLeave, hanldeLeaveDelete }) {

    console.log(myLeave?.leaves);

    return (
        <div>
            <div className="min-h-screen bg-gray-50 p-6 dark:bg-neutral-950">
                <div className="mx-auto max-w-5xl">
                    <div className="mb-6 flex items-center justify-between">
                        <PageBreadcrumb pageTitle={"My Leave"} />
                    </div>


                    {
                        myLeave?.status == 403 ? (
                            < NoDataFoundCard />
                        ) : (
                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                                {
                                    myLeave?.leaves?.map((item, index) => {
                                        return (
                                            <LeaveCard key={index} item={item} hanldeLeaveDelete={hanldeLeaveDelete} />
                                        )
                                    })
                                }

                            </div>
                        )
                    }


                </div>
            </div>
        </div>
    );
}
