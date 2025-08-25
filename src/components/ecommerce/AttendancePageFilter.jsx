'use client'


const AttendancePageFilter = ({ SelectedYear, setsetSelectedYear, SelectedMonth, setsetSelectedMonth, hangleDownloadRecord }) => {


    return (
        <div className="flex items-center gap-2">
            <div className="border border-gray-300 dark:border-gray-700 py-1 px-3 rounded-md">
                <select value={SelectedYear} onChange={(e) => { setsetSelectedYear(e.target.value) }} className="bg-gray-50 text-gray-900 dark:text-gray-50 dark:bg-gray-900 outline-none px-2" name="" id="">
                    <option value=''>Select Year</option>

                    <option value="2022">2022</option>
                    <option value="2023">2023</option>
                    <option value="2024">2024</option>
                    <option value="2025">2025</option>
                    <option value="2026">2026</option>
                    <option value="2027">2027</option>
                    <option value="2028">2028</option>
                    <option value="2029">2029</option>
                    <option value="2030">2030</option>
                </select>
            </div>


            <div className="border border-gray-300 dark:border-gray-700 py-1 px-3 rounded-md">
                <select value={SelectedMonth} onChange={(e) => { setsetSelectedMonth(e.target.value) }} className="bg-gray-50 text-gray-900 dark:text-gray-50 dark:bg-gray-900 outline-none px-2" name="" id="">
                    <option value=''>Select Month</option>
                    <option value="1">January</option>
                    <option value="2">February</option>
                    <option value="3">March</option>
                    <option value="4">April</option>
                    <option value="5">May</option>
                    <option value="6">June</option>
                    <option value="7">July</option>
                    <option value="8">August</option>
                    <option value="9">September</option>
                    <option value="10">October</option>
                    <option value="11">November</option>
                    <option value="12">December</option>

                </select>
            </div>

            <button onClick={(e) => { hangleDownloadRecord(e) }} className="border border-gray-300 dark:border-gray-700 py-1 px-3 cursor-pointer rounded-md bg-blue-700">
                Download Record
            </button>


        </div>
    )
}


export default AttendancePageFilter;