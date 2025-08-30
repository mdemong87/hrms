'use client'

import Loading from "@/components/common/Loading";
import LeaveCardForHrAndAdmin from "@/components/ecommerce/LeaveCardForHrAndAdmin";
import getId from "@/helper/cookie/getid";
import getCookie from "@/helper/cookie/gettooken";
import { useCallback, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";

const AdminLeaveRequest = () => {

    const token = getCookie();
    const myId = getId();
    const [filter, setfilter] = useState("All");
    const [allLeave, setallLeave] = useState([]);
    const [isloading, setisloading] = useState(false);



    /************* Fetch my leave Application  here **************/
    const getAllLeave = useCallback(async () => {
        try {

            setisloading(true);

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/leaves`,
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
                setallLeave(res);
            }
        } catch (error) {
            console.error("Error fetching My Leave Application:", error);
        }
    }, [token]);


    /******************* Run once on component mount *****************/
    useEffect(() => {
        getAllLeave();
    }, [getAllLeave]);





    console.log(allLeave);


    return (
        <div className="mx-auto  p-6 rounded-xl shadow-sm space-y-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-600">
            {isloading && <Loading />}

            <div className=" flex items-center justify-between">
                <h2 className="text-2xl font-semibold mb-1 dark:text-gray-100">All Leave Requested</h2>
                <select value={filter} onChange={(e) => { setfilter(e.target.value) }} className="w-[250px] border border-gray-300 dark:border-gray-700 p-1 rounded-md outline-none cursor-pointer dark:text-gray-100 bg-white dark:bg-gray-900">
                    <option value="All">All</option>
                    <option value="Pending">Pending</option>
                    <option value="In Review">In Review</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                </select>
            </div>

            {
                allLeave?.status == 403 ? (
                    < NoDataFoundCard />
                ) : (
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                        {filter === "Pending" ? (
                            allLeave?.pending?.map((item, index) => (
                                <LeaveCardForHrAndAdmin key={index} item={item} getAllLeave={getAllLeave} />
                            ))
                        ) : filter === "In Review" ? (
                            allLeave?.in_review?.map((item, index) => (
                                <LeaveCardForHrAndAdmin key={index} item={item} getAllLeave={getAllLeave} />
                            ))
                        ) : filter === "Approved" ? (
                            allLeave?.approved?.map((item, index) => (
                                <LeaveCardForHrAndAdmin key={index} item={item} getAllLeave={getAllLeave} />
                            ))
                        ) : filter === "Rejected" ? (
                            allLeave?.rejected?.map((item, index) => (
                                <LeaveCardForHrAndAdmin key={index} item={item} getAllLeave={getAllLeave} />
                            ))
                        ) : (
                            allLeave?.all_leave?.map((item, index) => (
                                <LeaveCardForHrAndAdmin key={index} item={item} getAllLeave={getAllLeave} />
                            ))
                        )}

                    </div>
                )
            }

            <ToastContainer position="bottom-right" />
        </div>
    )
}


export default AdminLeaveRequest;