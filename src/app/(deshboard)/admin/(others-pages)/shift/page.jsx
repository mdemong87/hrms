'use client';

import Loading from "@/components/common/Loading";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import Input from "@/components/form/input/InputField";
import getCookie from "@/helper/cookie/gettooken";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { toast, ToastContainer } from "react-toastify";
import ShiftCard from "../../../../../components/ecommerce/ShiftCard";
import Label from "../../../../../components/form/Label";
import Button from "../../../../../components/ui/button/Button";

const Shift = () => {


    const router = useRouter();
    const token = getCookie();
    const [name, setName] = useState('');
    const [endtime, setendtime] = useState('');
    const [starttime, setstarttime] = useState('');
    const [latecount, setlatecount] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [shift, setshift] = useState([]);




    /********************* Get All Shift Here **********************/
    const getshift = useCallback(async () => {
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/shifts`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.ok) {
                const res = await response.json();
                setshift(res);
            } else {
                console.error("Failed to fetch shift");
            }
        } catch (error) {
            console.error("Error fetching shift:", error);
        }
    }, [token]);



    /************************* Run once on component mount ***********************/
    useEffect(() => {
        getshift();
    }, [getshift]);


    /**************** Added  New Shift function here *******************/
    const handleAddshift = async () => {
        if (name == '' || starttime == '' || endtime == '' || latecount == '') {
            toast.warn("Shift name is required");
            return;
        }

        setIsLoading(true);

        const dData = {
            sName: name,
            sStartTime: starttime,
            sEndTime: endtime,
            sLateCount: latecount
        };

        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/shifts`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(dData),
                }
            );


            console.log(response);

            if (response.ok) {
                toast.success("Shift added successfully");
                setName('');
                setendtime('');
                setlatecount('');
                setstarttime('');

                // Refresh department list instantly
                await getshift();
            } else {
                toast.error("Failed to add Shift");
            }
        } catch (error) {
            console.error("Error adding Shift:", error);
            toast.error("Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };



    /****************** Delete Shift function here **********************/
    async function hanldedelete(e, id) {
        e.preventDefault();
        setIsLoading(true);

        const iscomfirm = window.confirm("Are you Sure to Delete This Department?");

        if (iscomfirm) {
            try {


                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/shifts/${id}`,
                    {
                        method: "DELETE",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                setIsLoading(false);

                console.log(response);
                if (response.ok) {
                    const res = await response.json();
                    toast.success("Shift Delete Successfull");
                    getshift();
                } else {
                    toast.error("There was an Error is Server side while Deleteing Shift");
                }

            } catch (error) {
                setIsLoading(false);
                toast.error("There was an Error is Server side");
            }
        } else {
            setIsLoading(false);
        }



    }

    return (
        <div>
            {isLoading && <Loading />}
            <PageBreadcrumb pageTitle={"Working Shift"} />

            {/* Add Department Form */}
            <div>
                <div>
                    <Label>
                        Shift Name <span className="text-error-500">*</span>
                    </Label>
                    <Input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter Shift Name"
                        type="text"
                    />
                </div>

                <div className="mt-4">
                    <Label>Shift Start Time<span className="text-error-500">*</span>
                    </Label>
                    <Input
                        value={starttime}
                        onChange={(e) => setstarttime(e.target.value)}
                        placeholder="Enter Shift End Time"
                        type="time"
                    />
                </div>
                <div className="mt-4">
                    <Label>Shift End Time<span className="text-error-500">*</span>
                    </Label>
                    <Input
                        value={endtime}
                        onChange={(e) => setendtime(e.target.value)}
                        placeholder="Enter Late Count Time"
                        type="time"
                    />
                </div>
                <div className="mt-4">
                    <Label>Shift Late Count Time<span className="text-error-500">*</span>
                    </Label>
                    <Input
                        value={latecount}
                        onChange={(e) => setlatecount(e.target.value)}
                        placeholder="Enter Shift Name"
                        type="number"
                    />
                </div>

                <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
                    <Button onClick={handleAddshift} size="sm">
                        Add Duty Shift
                        <IoMdAdd className="text-xl" />
                    </Button>
                </div>
            </div>

            {/* Departments List */}
            <div className="mt-5 border border-gray-300 dark:border-gray-700 rounded-lg">
                <h3 className="text-gray-700 dark:text-gray-300 text-xl my-1 mx-2">
                    All Duty Shift Here:
                </h3>
                <div className="text-gray-700 dark:text-gray-300 my-1 mx-2">
                    <div className="grid grid-cols-3 gap-4 m-2 py-2">
                        {shift?.data?.length > 0 ? (
                            shift?.data?.map((item, index) => (
                                <ShiftCard key={index} name={item?.shift_name} id={item?.id} onDelete={hanldedelete} lTime={item?.grace_time} sTime={item?.start_time} eTime={item?.end_time} />
                            ))
                        ) : (
                            <p className="col-span-2 text-center text-gray-500">
                                No Duty Shift found.
                            </p>
                        )}
                    </div>
                </div>
            </div>
            <ToastContainer position="bottom-right" />
        </div>
    );
};

export default Shift;
