import formatTime from "@/helper/formateTime";
import Image from "next/image";

function EmployeeShiftAssignCard({ allshift, employee, shifts, assignedShiftId = null, onAssign, onUnassign, selected, setSelected, handleAssign
}) {


    console.log(employee);



    return (
        <div className="col-span-1 group relative overflow-hidden rounded-2xl bg-gray-50 p-4 shadow-sm ring-1 ring-transparent transition hover:shadow-md dark:bg-gray-800 dark:ring-1 dark:ring-neutral-800">
            <div className="flex items-start gap-4">
                {/* Avatar */}
                <div className="relative size-14 shrink-0 overflow-hidden rounded-2xl ring-1 ring-black/5 dark:ring-neutral-800">
                    {employee?.avatar ? (
                        <Image width={1000}
                            height={1000}
                            src={employee?.avatar}
                            alt={employee.name}
                            className="size-full object-cover"
                        />
                    ) : (
                        <div className="flex size-full items-center justify-center bg-gradient-to-br from-sky-100 to-indigo-100 text-lg font-semibold text-sky-700 dark:from-neutral-800 dark:to-neutral-700 dark:text-neutral-200">
                            {employee?.name?.[0]?.toUpperCase() || "?"}
                        </div>
                    )}
                </div>

                {/* Info */}
                <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                        <h3 className="truncate text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                            {employee.fname + " " + employee?.lname}
                        </h3>
                        {employee?.shift ? (
                            <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700 dark:border-emerald-900/50 dark:bg-emerald-900/30 dark:text-emerald-300">
                                Assigned
                            </span>
                        ) : (
                            <span className="rounded-full border border-amber-200 bg-amber-50 px-2.5 py-0.5 text-xs font-medium text-amber-700 dark:border-amber-900/50 dark:bg-amber-900/30 dark:text-amber-300">
                                Unassigned
                            </span>
                        )}
                    </div>
                    <p className="mt-0.5 text-sm text-neutral-500 dark:text-neutral-400">
                        {employee.designation}
                    </p>

                    {/* Shift summary */}
                    <div className="mt-3 rounded-xl bg-neutral-50 p-3 text-sm text-neutral-700 ring-1 ring-neutral-100 dark:bg-neutral-800/60 dark:text-neutral-300 dark:ring-neutral-700">
                        {employee?.shift ? (
                            <div className="grid grid-cols-1 gap-1 sm:grid-cols-2">
                                <div>
                                    <span className="font-medium">{employee?.shift?.shift_name}</span>
                                </div>
                                <div className="sm:text-right">
                                    {/* {assignedShift.start} – {assignedShift.end} 
                                    */}
                                    fdsfsd
                                </div>
                                {true && (
                                    <div className="col-span-1 sm:col-span-2 text-xs text-neutral-500 dark:text-neutral-400">
                                        Location: {"localtion"}
                                    </div>
                                )}
                            </div>
                        ) : (
                            <span className="text-neutral-500 dark:text-neutral-400">
                                No shift assigned yet.
                            </span>
                        )}
                    </div>

                    {/* Controls */}
                    <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center">
                        <label className="sr-only" htmlFor={`shift-select-${employee.id}`}>
                            Select a shift to assign
                        </label>
                        <div className="flex flex-col gap-3">
                            <select
                                id={`shift-select-${employee.id}`}
                                value={selected}
                                onChange={(e) => setSelected(e.target.value)}
                                className="w-full rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-900 outline-none transition focus:ring-2 focus:ring-sky-500 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100"
                            >
                                <option value="" disabled>
                                    {true ? "Change shift…" : "Choose a shift…"}
                                </option>
                                {allshift?.map((s, idx) => (
                                    <option key={idx} value={s?.id}>
                                        {s.shift_name} || ({formatTime(s.start_time)}–{formatTime(s.end_time)})
                                    </option>
                                ))}
                            </select>

                            <div className="flex gap-2 justify-end">
                                <button
                                    type="button"
                                    onClick={handleAssign}
                                    disabled={!selected}
                                    className="inline-flex items-center justify-center rounded-xl px-3 py-2 text-sm font-medium text-white shadow-sm transition disabled:cursor-not-allowed disabled:opacity-50 bg-sky-600 hover:bg-sky-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
                                >
                                    Assign
                                </button>
                                <button
                                    type="button"
                                    className="inline-flex items-center justify-center rounded-xl px-3 py-2 text-sm font-medium text-neutral-700 ring-1 ring-neutral-300 transition hover:bg-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 disabled:cursor-not-allowed disabled:opacity-50 dark:text-neutral-200 dark:ring-neutral-700 dark:hover:bg-neutral-800"
                                >
                                    Unassign
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Decorative gradient */}
            <div className="pointer-events-none absolute -right-8 -top-8 size-24 rounded-full bg-gradient-to-br from-sky-400/10 to-indigo-500/10 blur-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </div>
    );
}



export default EmployeeShiftAssignCard;