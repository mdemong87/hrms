'use client'

import Loading from "@/components/common/Loading";
import LeaveCardDemo from "@/components/ecommerce/LeaveCard";
import getId from "@/helper/cookie/getid";
import getCookie from "@/helper/cookie/gettooken";
import { useCallback, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

const EmployeeLeaveStatus = () => {

    const token = getCookie();
    const myId = getId();
    const [myLeave, setMyLeave] = useState([]);
    const [isloading, setisloading] = useState(false);



    /************* Fetch my leave Application  here **************/
    const getMyLeave = useCallback(async (id) => {
        try {

            setisloading(true);

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/employeeleave/${id}`,
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
                setMyLeave(res);
            }
        } catch (error) {
            console.error("Error fetching My Leave Application:", error);
        }
    }, [token]);


    /******************* Run once on component mount *****************/
    useEffect(() => {
        getMyLeave(myId);
    }, [getMyLeave]);









    /**************** Hanlde Leave Delete function here*****************/
    async function hanldeLeaveDelete(id) {


        const isdeletetrue = confirm("Are you Sure to Delete This Employee");
        if (!isdeletetrue) return;



        try {
            setisloading(true);

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/employeeleave/${id}`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            // Handle response
            if (response.ok) {
                setisloading(false);
                getMyLeave(myId);
                toast.success("Leave Application Delete successful");
            } else {
                setisloading(false);
                const errorData = await response.json();
                toast.error(errorData?.message);
                console.error("Leave Application Delete failed:", errorData);
            }

        } catch (error) {
            setisloading(false);
            console.error(error);
        }

    }









    console.log(myLeave);



    return (
        <div>
            {isloading && <Loading />}

            <LeaveCardDemo myLeave={myLeave} hanldeLeaveDelete={hanldeLeaveDelete} />

            <ToastContainer position="bottom-right" />
        </div>
    )
}


export default EmployeeLeaveStatus;