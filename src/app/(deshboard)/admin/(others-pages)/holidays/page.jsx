

const Holidays = () => {


    const holidays = [
        {
            date: '2025-01-01',
            day: 'Wednesday',
            name: "New Year's Day",
            type: 'Public',
            country: 'Bangladesh',
        },
        {
            date: '2025-07-04',
            day: 'Friday',
            name: 'Independence Day',
            type: 'Public',
            country: 'Bangladesh',
        },
        {
            date: '2025-11-27',
            day: 'Thursday',
            name: 'Thanksgiving Day',
            type: 'Public',
            country: 'Bangladesh',
        },
        {
            date: '2025-12-25',
            day: 'Thursday',
            name: 'Christmas Day',
            type: 'Public',
            country: 'Bangladesh',
        },
        {
            date: '2025-01-01',
            day: 'Wednesday',
            name: "New Year's Day",
            type: 'Public',
            country: 'Bangladesh',
        },
        {
            date: '2025-07-04',
            day: 'Friday',
            name: 'Independence Day',
            type: 'Public',
            country: 'Bangladesh',
        },
        {
            date: '2025-11-27',
            day: 'Thursday',
            name: 'Thanksgiving Day',
            type: 'Public',
            country: 'Bangladesh',
        },
        {
            date: '2025-12-25',
            day: 'Thursday',
            name: 'Christmas Day',
            type: 'Public',
            country: 'Bangladesh',
        },
        {
            date: '2025-01-01',
            day: 'Wednesday',
            name: "New Year's Day",
            type: 'Public',
            country: 'Bangladesh',
        },
        {
            date: '2025-07-04',
            day: 'Friday',
            name: 'Independence Day',
            type: 'Public',
            country: 'Bangladesh',
        },
        {
            date: '2025-11-27',
            day: 'Thursday',
            name: 'Thanksgiving Day',
            type: 'Public',
            country: 'Bangladesh',
        },
        {
            date: '2025-12-25',
            day: 'Thursday',
            name: 'Christmas Day',
            type: 'Public',
            country: 'Bangladesh',
        },
        {
            date: '2025-01-01',
            day: 'Wednesday',
            name: "New Year's Day",
            type: 'Public',
            country: 'Bangladesh',
        },
        {
            date: '2025-07-04',
            day: 'Friday',
            name: 'Independence Day',
            type: 'Public',
            country: 'Bangladesh',
        },
        {
            date: '2025-11-27',
            day: 'Thursday',
            name: 'Thanksgiving Day',
            type: 'Public',
            country: 'Bangladesh',
        },
        {
            date: '2025-12-25',
            day: 'Thursday',
            name: 'Christmas Day',
            type: 'Public',
            country: 'Bangladesh',
        },
    ];



    return (
        <div>
            <div className="overflow-x-auto mt-8 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
                <table className="min-w-full text-sm text-left">
                    <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200">
                        <tr>
                            <th className="px-6 py-3">Date</th>
                            <th className="px-6 py-3">Day</th>
                            <th className="px-6 py-3">Holiday Name</th>
                            <th className="px-6 py-3">Type</th>
                            <th className="px-6 py-3">Country</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-900">
                        {holidays.map((holiday, index) => (
                            <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                                <td className="px-6 py-4 text-gray-900 dark:text-gray-100">{holiday.date}</td>
                                <td className="px-6 py-4 text-gray-700 dark:text-gray-300">{holiday.day}</td>
                                <td className="px-6 py-4 font-medium text-gray-900 dark:text-gray-100">
                                    {holiday.name}
                                </td>
                                <td className="px-6 py-4 text-gray-600 dark:text-gray-300">{holiday.type}</td>
                                <td className="px-6 py-4 text-gray-600 dark:text-gray-300">{holiday.country}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Holidays;