"use client";


const SingleAttendance = () => {

    const data = [
        {
            date: "14 Jan 2024",
            checkIn: "09:00 AM",
            status: "Present",
            checkOut: "06:45 PM",
            break: "30 Min",
            late: "32 Min",
            overtime: "20 Min",
            production: "8.55 Hrs",
            productionColor: "bg-green-500",
        },
        {
            date: "21 Jan 2024",
            checkIn: "09:00 AM",
            status: "Present",
            checkOut: "06:12 PM",
            break: "20 Min",
            late: "-",
            overtime: "45 Min",
            production: "7.54 Hrs",
            productionColor: "bg-red-500",
        },
        {
            date: "20 Feb 2024",
            checkIn: "09:00 AM",
            status: "Present",
            checkOut: "06:13 PM",
            break: "50 Min",
            late: "-",
            overtime: "33 Min",
            production: "8.45 Hrs",
            productionColor: "bg-green-500",
        },
        {
            date: "15 Mar 2024",
            checkIn: "09:00 AM",
            status: "Absent",
            checkOut: "06:23 PM",
            break: "41 Min",
            late: "-",
            overtime: "50 Min",
            production: "8.35 Hrs",
            productionColor: "bg-green-500",
        },
        {
            date: "12 Apr 2024",
            checkIn: "09:00 AM",
            status: "Present",
            checkOut: "06:43 PM",
            break: "23 Min",
            late: "-",
            overtime: "10 Min",
            production: "8.22 Hrs",
            productionColor: "bg-green-500",
        },
        {
            date: "20 May 2024",
            checkIn: "09:00 AM",
            status: "Present",
            checkOut: "07:15 PM",
            break: "03 Min",
            late: "-",
            overtime: "-",
            production: "8.32 Hrs",
            productionColor: "bg-green-500",
        },
        {
            date: "06 Jul 2024",
            checkIn: "09:00 AM",
            status: "Present",
            checkOut: "07:13 PM",
            break: "32 Min",
            late: "-",
            overtime: "-",
            production: "9.15 Hrs",
            productionColor: "bg-blue-500",
        },
        {
            date: "02 Sep 2024",
            checkIn: "09:00 AM",
            status: "Present",
            checkOut: "09:17 PM",
            break: "14 Min",
            late: "12 Min",
            overtime: "-",
            production: "8.35 Hrs",
            productionColor: "bg-green-500",
        },
        {
            date: "10 Dec 2024",
            checkIn: "09:00 AM",
            status: "Present",
            checkOut: "09:23 PM",
            break: "10 Min",
            late: "-",
            overtime: "45 Min",
            production: "9.25 Hrs",
            productionColor: "bg-blue-500",
        },
        {
            date: "15 Nov 2024",
            checkIn: "09:00 AM",
            status: "Present",
            checkOut: "08:15 PM",
            break: "12 Min",
            late: "-",
            overtime: "-",
            production: "8.35 Hrs",
            productionColor: "bg-green-500",
        },
    ];

    return (
        <div className={''}>

            <div className="overflow-x-auto rounded-md">
                <table className="min-w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
                            <th className="px-4 py-3 text-left">Date</th>
                            <th className="px-4 py-3 text-left">Check In</th>
                            <th className="px-4 py-3 text-left">Status</th>
                            <th className="px-4 py-3 text-left">Check Out</th>
                            <th className="px-4 py-3 text-left">Break</th>
                            <th className="px-4 py-3 text-left">Late</th>
                            <th className="px-4 py-3 text-left">Overtime</th>
                            <th className="px-4 py-3 text-left">Production Hours</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row, i) => (
                            <tr
                                key={i}
                                className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200 transition"
                            >
                                <td className="px-4 py-3 text-sm">{row.date}</td>
                                <td className="px-4 py-3 text-sm">{row.checkIn}</td>
                                <td className="px-4 py-3 text-sm">
                                    <span
                                        className={`px-2 py-1 rounded-full text-xs font-semibold ${row.status === "Present"
                                            ? "bg-green-100 text-green-700 dark:bg-green-700 dark:text-green-100"
                                            : "bg-red-100 text-red-700 dark:bg-red-700 dark:text-red-100"
                                            }`}
                                    >
                                        {row.status}
                                    </span>
                                </td>
                                <td className="px-4 py-3 text-sm">{row.checkOut}</td>
                                <td className="px-4 py-3 text-sm">{row.break}</td>
                                <td className="px-4 py-3 text-sm">{row.late}</td>
                                <td className="px-4 py-3 text-sm">{row.overtime}</td>
                                <td className="px-4 py-3 text-sm">
                                    <span
                                        className={`px-3 py-1 rounded-lg text-white text-xs font-medium ${row.productionColor}`}
                                    >
                                        {row.production}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SingleAttendance;
