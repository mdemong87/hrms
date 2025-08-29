'use client'

import formatTime from "@/helper/formateTime";
import Image from "next/image";
import { useState } from "react";
import { toast } from "react-toastify";
import Loading from "../common/Loading";

const EmployeeShiftAssignCard = ({ allshift, employee, token, getHolidayAndEmployee }) => {

    const [editMood, seteditMood] = useState(false);
    const [selected, setSelected] = useState('');
    const [isloading, setisloading] = useState(false);










    /******************* Update Shift Functionality Here ******************/
    async function handleAssign(id) {


        if (!selected) {
            toast.warn("Select Shift!");
            return;
        }

        try {
            setisloading(true);


            //send a post request in the backend
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/shift/assign/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({ updateShift: selected })
            });


            if (response.ok) {
                setisloading(false);
                seteditMood(false)
                const data = await response.json();
                getHolidayAndEmployee();
                toast.success("Shift Update successful");
            } else {
                setisloading(false);
                const errorData = await response.json();
                toast.error('Shift Update failed');
                console.error("Shift Update failed:", errorData);
            }
        } catch (error) {
            setisloading(false);
            console.error(error);
        }

    }



    return (
        <div className="col-span-1 group relative overflow-hidden rounded-2xl bg-gray-50 p-4 shadow-sm ring-1 ring-transparent transition hover:shadow-md dark:bg-gray-800 dark:ring-1 dark:ring-neutral-800">
            {isloading && <Loading />}
            <div className="flex items-start gap-4">
                {/* Avatar */}
                <div className="relative size-14 shrink-0 overflow-hidden rounded-full ring-1 ring-black/5 dark:ring-neutral-800">
                    <Image width={1000}
                        height={1000}
                        src={employee?.avatar}
                        alt={"Employee Profile Photo"}
                        className="size-full object-cover"
                    />
                </div>

                {/* Info */}
                <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                        <h3 className="truncate text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                            {employee.fname + " " + employee?.lname}
                        </h3>
                    </div>
                    <p className="mt-0.5 text-sm text-neutral-500 dark:text-neutral-400">
                        {employee.designation}
                    </p>

                    {/* Shift summary */}
                    <div className="mt-4 rounded-lg py-2 px-1 border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700 dark:border-emerald-900/50 dark:bg-emerald-900/30 dark:text-emerald-300">
                        <div className="grid grid-cols-1 gap-1 sm:grid-cols-2">
                            <div>
                                <span className="font-medium text-lg">{employee?.shift?.shift_name}</span>
                            </div>

                            <div className="col-span-1 sm:col-span-2 text-xs text-neutral-500 dark:text-neutral-400">
                                {
                                    formatTime(employee?.shift?.start_time) + " - " + formatTime(employee?.shift?.end_time)
                                }
                            </div>

                        </div>
                    </div>

                    {/* Controls */}
                    <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center">
                        <label className="sr-only" htmlFor={`shift-select-${employee.id}`}>
                            Select a shift to assign
                        </label>
                        <div className="flex flex-col justify-end w-full gap-3">
                            {
                                editMood && <select
                                    value={selected}
                                    disabled={!editMood}
                                    onChange={(e) => setSelected(e.target.value)}
                                    className="w-full rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-900 outline-none transition focus:ring-2 focus:ring-sky-500 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100"
                                >
                                    <option value='' >
                                        Change shift…
                                    </option>
                                    {allshift?.map((s, idx) => (
                                        <option key={idx} value={s?.id}>
                                            {s.shift_name} || {formatTime(s.start_time)} - {formatTime(s.end_time)}
                                        </option>
                                    ))}
                                </select>
                            }


                            <div className="flex gap-2 justify-end">

                                {editMood && < button
                                    onClick={() => { seteditMood(false) }}
                                    className="inline-flex items-center justify-center rounded-xl px-3 py-2 text-sm font-medium text-white shadow-sm transition disabled:cursor-not-allowed disabled:opacity-50 bg-yellow-600 hover:bg-sky-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
                                >
                                    Cencel
                                </button>}

                                {
                                    !editMood ? < button
                                        onClick={() => { seteditMood(true) }}
                                        className="inline-flex items-center justify-center rounded-xl px-3 py-2 text-sm font-medium text-white shadow-sm transition disabled:cursor-not-allowed disabled:opacity-50 bg-blue-600 hover:bg-sky-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
                                    >
                                        Change Shift
                                    </button> : <button
                                        onClick={() => { handleAssign(employee?.id) }}
                                        className="inline-flex items-center justify-center rounded-xl px-3 py-2 text-sm font-medium text-white shadow-sm transition disabled:cursor-not-allowed disabled:opacity-50 bg-green-600 hover:bg-sky-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
                                    >
                                        Save
                                    </button>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </div >
    );
}



export default EmployeeShiftAssignCard;