"use client";


const MeetingSchedule = () => {

    return (
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
                    Meeting Schedule
                </h3>
            </div>

            <div className="my-6 rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 rounded-lg">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th className="px-6 py-3">
                                SL
                            </th>
                            <th className="px-6 py-3">
                                Meeting Title
                            </th>
                            <th className="px-6 py-3">
                                Meeting Date
                            </th>
                            <th className="px-6 py-3">
                                Meeting Time
                            </th>
                        </tr>
                    </thead>
                    <tbody className="overflow-y-scroll rounded-lg">

                        {
                            Array.from({ length: 4 }).map((item, index) => {
                                return (
                                    <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                                        <td className="px-6 py-4">
                                            {index + 1}
                                        </td>
                                        <td className="px-6 py-4">
                                            Project Kickoff
                                        </td>
                                        <td className="px-6 py-4">
                                            June 1  , 2024
                                        </td>
                                        <td className="px-6 py-4">
                                            10:00 AM
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}


export default MeetingSchedule;