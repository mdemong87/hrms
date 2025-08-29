'use client'

import Loading from "@/components/common/Loading";
import getCookie from "@/helper/cookie/gettooken";
import dynamic from "next/dynamic";
import { useCallback, useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { toast, ToastContainer } from "react-toastify";
//import Editor from "../../../../../components/common/Editor";
import HtmlRenderer from "@/components/common/HtmlRenderer";


const Editor = dynamic(
    () => import("@/components/common/Editor"),
    { ssr: false }
);

const Announcement = () => {

    const token = getCookie();
    const [announcement, setannouncement] = useState([]);
    const [aName, setaName] = useState('');
    const [dis, setdis] = useState('');
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




    /******************* Add Holiday Functionality Here ******************/
    async function handleAddHoliday() {


        /********* Added Announcement ********/
        try {
            setisloading(true);


            //send a post request in the backend
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/notice`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({
                    aName,
                    dis,
                })
            });


            console.log({ aName, dis });

            if (response.ok) {
                setisloading(false);
                const data = await response.json();
                setaName('');
                setdis('');
                getAnnouncement();
                toast.success("Announcement Added successful");
            } else {
                setisloading(false);
                const errorData = await response.json();
                toast.error('Announment Added failed');
                console.error("Announcement Added failed:", errorData);
            }
        } catch (error) {
            setisloading(false);
            console.error(error);
        }

    }



    /******************* Delete Holiday Functionality Here ******************/
    async function handleDeleteHoliday(id) {



        /********* Delete Holiday ********/
        try {
            setisloading(true);


            //send a post request in the backend
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/notice/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                }
            });


            if (response.ok) {
                setisloading(false);
                const data = await response.json();
                getAnnouncement();
                toast.success("Announcement Delete successful");
            } else {
                setisloading(false);
                const errorData = await response.json();
                toast.error('Announcement Delete failed');
                console.error("Announcement Delete failed:", errorData);
            }
        } catch (error) {
            setisloading(false);
            console.error(error);
        }

    }





    return (


        <div className="mx-auto space-y-6">
            {isloading && <Loading />}
            {/* Add Holiday Form */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
                <h2 className="text-2xl font-semibold mb-4 dark:text-gray-100">Add Announcement</h2>
                <div className="space-y-4">

                    <input
                        type="text"
                        name="name"
                        placeholder="Announcement Name"
                        value={aName}
                        onChange={(e) => { setaName(e.target.value) }}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />


                    <Editor content={dis} setContent={setdis} />


                    <div className="flex justify-end">
                        <button
                            onClick={handleAddHoliday}
                            className="w-fit bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Add Announcement
                        </button>
                    </div>
                </div>
            </div>

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
                                <th scope="col" className="px-2 py-3 border border-r">
                                    Action
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

                                            <td className="px-1 py-4 border border-r">
                                                <button
                                                    onClick={() => handleDeleteHoliday(item.id)}
                                                    className="text-white p-1 rounded-md bg-red-400 font-semibold mt-2 md:mt-0"
                                                >
                                                    <MdDelete />
                                                </button>
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