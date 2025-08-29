'use client'

import Loading from "@/components/common/Loading";
import getCookie from "@/helper/cookie/gettooken";
import dynamic from "next/dynamic";
import { useCallback, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
//import Editor from "../../../../../components/common/Editor";
import HtmlRenderer from "@/components/common/HtmlRenderer";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";


const Editor = dynamic(
    () => import("@/components/common/Editor"),
    { ssr: false }
);

const Announcement = () => {

    const token = getCookie();
    const [announcement, setannouncement] = useState([]);
    const [isloading, setisloading] = useState(false);



    /**************** Get Announcement Here ******************/
    const getAnnouncement = useCallback(async () => {
        try {

            setisloading(true);

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/notice`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setisloading(false);

            if (response.ok) {
                const res = await response.json();
                setannouncement(res);
            } else {
                console.error("Failed to fetch Announcement");
            }
        } catch (error) {
            console.error("Failed to fetch Announcement:", error);
        }
    }, [token]);





    /************** Run once on component mount ************/
    useEffect(() => {
        getAnnouncement();
    }, [getAnnouncement]);






    return (


        <div className="mx-auto space-y-6">
            {isloading && <Loading />}

            <PageBreadcrumb pageTitle={"Announcement"} />

            {/* Holiday List */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
                <div className="relative overflow-x-auto rounded-md shadow-md mt-5">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 border">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400 text-center">
                            <tr>
                                <th scope="col" className="p-4 border border-r">
                                    SL
                                </th>
                                <th scope="col" className="p-4 text-center border border-r">
                                    Date
                                </th>
                                <th scope="col" className="px-2 py-3 border border-r">
                                    Announcement Title
                                </th>
                                <th scope="col" className="px-2 py-3 border border-r">
                                    Description
                                </th>
                            </tr>
                        </thead>
                        <tbody>



                            {
                                announcement?.map((item, index) => {
                                    return (
                                        <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-600 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 text-center">
                                            <td className="w-4 p-4 border border-r">
                                                {index + 1}
                                            </td>
                                            <td className="text-center border border-r">{item?.created_at}</td>

                                            <td className="px-2 py-4 border border-r">
                                                {item?.title}
                                            </td>
                                            <td className="px-1 py-4 border border-r">
                                                <HtmlRenderer htmlContent={item?.description} />
                                            </td>
                                        </tr>
                                    )
                                })
                            }

                        </tbody>
                    </table>
                </div>

            </div>
            <ToastContainer position="bottom-right" />
        </div >

    )
}

export default Announcement;