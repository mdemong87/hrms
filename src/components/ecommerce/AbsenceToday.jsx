"use client";
// import Chart from "react-apexcharts";

import dynamic from "next/dynamic";
// Dynamically import the ReactApexChart component
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
    ssr: false,
});

const AbsenceToday = () => {


    return (
        <div className="rounded-2xl border border-gray-200 bg-gray-100 dark:border-gray-800 dark:bg-white/[0.03] mt-6">
            <div className="px-5 pt-5 bg-white shadow-default rounded-2xl pb-11 dark:bg-gray-900 sm:px-6 sm:pt-6">
                <div className="">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
                            Absence Today
                        </h3>
                        <p className="mt-1 font-normal text-gray-500 text-theme-sm dark:text-gray-400">
                            Absence Today Discription
                        </p>
                    </div>
                    <div className="text-gray-100 mt-5">


                        <div class="relative overflow-x-auto rounded-lg">
                            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" class="px-6 py-3">
                                            SL
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Emplyee Name
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Status
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                                        <td class="px-6 py-4">
                                            1
                                        </td>
                                        <td class="px-6 py-4">
                                            MD Emon Hossen
                                        </td>
                                        <td class="px-6 py-4">
                                            Absence
                                        </td>
                                    </tr>
                                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                                        <td class="px-6 py-4">
                                            2
                                        </td>
                                        <td class="px-6 py-4">
                                            Rana Ahmead
                                        </td>
                                        <td class="px-6 py-4">
                                            Absence
                                        </td>
                                    </tr>
                                    <tr class="bg-white dark:bg-gray-800">
                                        <td class="px-6 py-4">
                                            3
                                        </td>
                                        <td class="px-6 py-4">
                                            Ahsan Ahmead
                                        </td>
                                        <td class="px-6 py-4">
                                            Absence
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>

            </div>


        </div>
    );
}


export default AbsenceToday;