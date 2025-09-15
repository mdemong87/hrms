'use client'

import getCookie from "@/helper/cookie/gettooken";
import hasImageExtension from "@/helper/hasImageExtension";
import Image from "next/image";
import { useState } from "react";
import { toast } from "react-toastify";
import demoprofile from "../../../public/images/user/demo.jpeg";
import Loading from "../common/Loading";
import StatusBadge from "../common/StatusBadge";


function LeaveCardForHrAndAdmin({ item, hanldeLeaveDelete, getAllLeave }) {

    const token = getCookie();
    const [isChange, setisChange] = useState(false);
    const [StateUpdate, setStateUpdate] = useState('');
    const [isloading, setisloading] = useState(false);






    /**************** Hanlde Leave Delete function here*****************/
    async function hanldeStatusChange(id) {


        if (!StateUpdate) {
            toast.warn("Selete Status");
            return;
        }



        try {
            setisloading(true);

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/leaves/${id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({ status: StateUpdate })
                }
            );
            // Handle response
            if (response.ok) {
                setisloading(false);
                setisChange(false);
                getAllLeave();
                toast.success("Status Change successful");
            } else {
                setisloading(false);
                setisChange(false);
                const errorData = await response.json();
                toast.error(errorData?.message);
                console.error("Status Change failed:", errorData);
            }

        } catch (error) {
            setisloading(false);
            setisChange(false);
            console.error(error);
        }

    }




    return (
        <div
            className="group relative overflow-hidden rounded-2xl border border-transparent bg-white p-5 shadow-sm ring-1 ring-gray-200/60 hover:shadow-md dark:bg-gray-800 dark:ring-neutral-800"
            role="region"
            aria-label={`Leave card for ${item?.employee?.fname}`}
        >

            {isloading && <Loading />}

            <header className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-indigo-50 to-indigo-100 ring-1 ring-indigo-100/60 dark:from-indigo-400/10 dark:to-indigo-400/10 dark:ring-indigo-400/20">
                        <Image className="w-full h-full rounded-md" src={hasImageExtension(item?.employee?.image) ? item?.employee?.image : demoprofile} height={1000} width={1000} alt="Profile-photo" />
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">{item?.employee?.fname + " " + item?.employee?.fname}</h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{item?.employee?.designation}</p>
                    </div>
                </div>
                <StatusBadge status={item?.status} />
            </header>

            <div className="mt-4 grid gap-3 text-sm">
                <div className="flex flex-col items-start gap-2 text-gray-600 dark:text-gray-300">
                    <div className="pt-4">
                        Leave Type: {item?.leave_type}
                    </div>
                    <span>
                        <span className="font-medium">{item?.start_date}</span> - <span className="font-medium">{item?.end_date
                        }</span>
                        <span className="ml-2 text-gray-400 dark:text-gray-500">({item?.days} {item?.days === 1 ? "day" : "days"})</span>
                    </span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                    {/* <User2 className="h-4 w-4" aria-hidden /> */}
                    <p className="truncate text-wrap">
                        <span className="text-gray-500 dark:text-gray-400">
                            Reason:
                        </span>
                        {item?.reason}
                    </p>
                </div>
            </div>

            <footer className={`mt-5 flex items-center gap-2 ${isChange ? "justify-between" : "justify-end"}`}>


                {
                    isChange && (
                        <select value={StateUpdate} onChange={(e) => { setStateUpdate(e.target.value) }} className="w-[250px] border border-gray-300 dark:border-gray-700 p-1 rounded-md outline-none cursor-pointer dark:text-gray-100 bg-white dark:bg-gray-900">
                            <option value="">Change Status</option>
                            <option value="pending">Pending</option>
                            <option value="in_review">In Review</option>
                            <option value="approved">Approved</option>
                            <option value="rejected">Rejected</option>
                        </select>
                    )
                }


                {
                    !isChange ? (
                        item?.status != "approved" && item?.status != "rejected" && (
                            < button
                                onClick={() => { setisChange(true) }}
                                className="inline-flex items-center justify-center rounded-xl px-3 py-2 text-sm font-medium text-white shadow-sm transition disabled:cursor-not-allowed disabled:opacity-50 bg-blue-600 hover:bg-sky-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
                            >
                                Change Status
                            </button>
                        )
                    ) : (
                        <div className="flex items-center gap-2">
                            < button
                                onClick={() => { setisChange(false) }}
                                className="inline-flex items-center justify-center rounded-xl px-3 py-2 text-sm font-medium text-white shadow-sm transition disabled:cursor-not-allowed disabled:opacity-50 bg-yellow-600 hover:bg-sky-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
                            >
                                Cencel
                            </button>
                            <button
                                onClick={() => { hanldeStatusChange(item?.id) }}
                                className="inline-flex items-center justify-center rounded-xl px-3 py-2 text-sm font-medium text-white shadow-sm transition disabled:cursor-not-allowed disabled:opacity-50 bg-green-600 hover:bg-sky-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
                            >
                                Save
                            </button>
                        </div>

                    )
                }
            </footer>
        </div>
    );
}


export default LeaveCardForHrAndAdmin;