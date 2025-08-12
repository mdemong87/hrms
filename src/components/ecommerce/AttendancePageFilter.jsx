
const AttendancePageFilter = () => {
    return (
        <div className="flex items-center gap-2">
            <div className="border border-gray-300 dark:border-gray-700 py-1 px-3 rounded-md">
                <select name="" id="">
                    <option value="">Select Year</option>

                    <option value="">2022</option>
                    <option value="january">2023</option>
                    <option value="february">2024</option>
                    <option value="march">2025</option>


                </select>
            </div>


            <div className="border border-gray-300 dark:border-gray-700 py-1 px-3 rounded-md">
                <select name="" id="">
                    <option value="">Select Month</option>

                    <option value="">Select Month</option>
                    <option value="january">January</option>
                    <option value="february">February</option>
                    <option value="march">March</option>
                    <option value="april">April</option>
                    <option value="may">May</option>
                    <option value="june">June</option>
                    <option value="july">July</option>
                    <option value="august">August</option>
                    <option value="september">September</option>
                    <option value="october">October</option>
                    <option value="november">November</option>
                    <option value="december">December</option>

                </select>
            </div>

            <button className="border border-gray-300 dark:border-gray-700 py-1 px-3 cursor-pointer rounded-md bg-blue-700">
                Download Record
            </button>


        </div>
    )
}


export default AttendancePageFilter;