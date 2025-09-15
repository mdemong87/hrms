"use client";
import hasImageExtension from "@/helper/hasImageExtension";
// import Chart from "react-apexcharts";
import dynamic from "next/dynamic";
import Image from "next/image";
import demoprofile from "../../../public/images/user/demo.jpeg";
// Dynamically import the ReactApexChart component
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
    ssr: false,
});

const AbsenceToday = ({ deshboardData }) => {


    return (
        <div className="rounded-2xl border border-gray-200 bg-gray-100 dark:border-gray-800 dark:bg-white/[0.03] mt-6">
            <div className="px-5 pt-5 bg-white shadow-default rounded-2xl pb-11 dark:bg-gray-900 sm:px-6 sm:pt-6">
                <div className="">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
                            Absence Last Day
                        </h3>
                        <p className="mt-1 font-normal text-gray-500 text-theme-sm dark:text-gray-400">
                            Absence last Day Discription
                        </p>
                    </div>
                    <div className="text-gray-100 mt-5 min-h-[350px] max-h-[350px] overflow-y-scroll">


                        <div className="relative overflow-x-auto rounded-lg">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th className="px-6 py-3">
                                            SL
                                        </th>
                                        <th className="px-6 py-3">
                                            Image/Name
                                        </th>
                                        <th className="px-6 py-3">
                                            Status
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>


                                    {
                                        deshboardData?.map((item, index) => {
                                            return (
                                                <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                                                    <td className="px-6 py-4">
                                                        {index + 1}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-2">
                                                            <Image src={hasImageExtension(item?.image) ? item?.image : demoprofile} alt="Profile_Image" className="w-[30px] h-[30px] rounded-full" width={1000} height={1000} />
                                                            {item?.employee_name}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {item?.status}
                                                    </td>
                                                </tr>

                                            )
                                        })
                                    }





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