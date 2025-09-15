'use client'

import { User2 } from "lucide-react";
import NoDataFoundCard from "../common/NoDataFound";
import PageBreadcrumb from "../common/PageBreadCrumb";
import StatusBadge from "../common/StatusBadge";



function LeaveCard({ item, hanldeLeaveDelete }) {


    console.log(item);

    return (
        <div
            className="group relative overflow-hidden rounded-2xl border border-transparent bg-white p-5 shadow-sm ring-1 ring-gray-200/60 hover:shadow-md dark:bg-gray-800 dark:ring-neutral-800"
            role="region"
            aria-label={`Leave card for ${name}`}
        >


            <div className="mt-4 grid gap-3 text-sm">
                <div className="flex flex-col items-start gap-2 text-gray-600 dark:text-gray-300">
                    <div className="flex items-center justify-between w-full">
                        <span>Leave Type: {item?.leave_type}</span>

                        <header className="flex items-start justify-end gap-4">
                            <StatusBadge status={item?.status} />
                        </header>
                    </div>
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

                {
                    item?.status == "pending" && (
                        <button onClick={() => { hanldeLeaveDelete(item?.id) }}
                            className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-3.5 py-2 text-sm font-medium text-gray-100 shadow-sm transition hover:bg-blue-500 active:scale-[0.99] dark:bg-blue-600 dark:text-gray-100 dark:hover:bg-blue-500"
                        >
                            Delete
                        </button>
                    )
                }


            </footer>
        </div>
    );
}

export default function LeaveCardDemo({ myLeave, hanldeLeaveDelete }) {

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
