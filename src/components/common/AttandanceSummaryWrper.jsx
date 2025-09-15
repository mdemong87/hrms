const AttendanceSummary = ({ summarydata }) => {


    // console.log(summarydata);



    return (
        <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {/* Total Leave */}
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 shadow">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Total Leave</h3>
                    <p className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-2">{summarydata?.total_leave}</p>
                </div>

                {/* Total Absent */}
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 shadow">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Total Absent</h3>
                    <p className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-2">{summarydata?.total_absent_today}</p>
                </div>

                {/* Total Late */}
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 shadow">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Total Late for working...</h3>
                    <p className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-2">3</p>
                </div>

                {/* Total Working Days */}
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 shadow">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Total Present Today</h3>
                    <p className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-2">{summarydata?.total_present_today}</p>
                </div>
            </div>


        </div>
    )
}

export default AttendanceSummary;