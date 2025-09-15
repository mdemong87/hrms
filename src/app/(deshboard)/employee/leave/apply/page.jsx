'use client'

import Loading from "@/components/common/Loading";
import Input from "@/components/form/input/InputField";
import TextArea from "@/components/form/input/TextArea";
import Label from "@/components/form/Label";
import Select from "@/components/form/Select.jsx";
import Button from "@/components/ui/button/Button";
import getId from "@/helper/cookie/getid";
import getRole from "@/helper/cookie/getrole";
import getCookie from "@/helper/cookie/gettooken";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { toast, ToastContainer } from 'react-toastify';


const EmployeeLeaveApply = () => {


    const token = getCookie();
    const accessrole = getRole();
    const myId = getId();
    const router = useRouter();
    const [isError, setIsError] = useState(false)
    const [isloading, setisloading] = useState(false);
    const [leavetype, setleavetype] = useState('');
    const [startdate, setstartdate] = useState('');
    const [enddate, setenddate] = useState('');
    const [reason, setreason] = useState('');





    /*************** Apply for leave here***************/
    async function handlesave(e) {
        e.preventDefault();


        //check user Fill up all required feilds or not
        if (!leavetype || !startdate || !enddate || !reason) {
            setIsError(true);
            return;
        }



        const applydata = {
            employee_id: myId,
            leave_type: leavetype,
            start_date: startdate,
            end_date: enddate,
            reason: reason
        }



        try {
            setisloading(true);

            //send a post request in the backend
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/employeeleave`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify(applydata),
            });

            if (response.ok) {
                setisloading(false);
                const data = await response.json();
                console.log(response);
                toast.success("Apply for Leave successful");

                // role base redirect all employee page after successfully employee added
                setTimeout(() => {
                    switch (accessrole) {
                        case "Project Manager":
                            router.push('/projectmanager/leave/status');
                            break;
                        case "Hr":
                            router.push('/hr/leave/status');
                            break;
                        case "Employee":
                            router.push('/employee/leave/status');
                            break;
                        default:
                            console.error('Unknown role');
                    }
                }, 200);
            } else {
                setisloading(false);
                const errorData = await response.json();
                toast.error('Apply for Leave failed');
                console.error("Apply for Leave failed:", errorData);
            }
        } catch (error) {
            setisloading(false);
            console.error(error);
        }



    }




    return (
        <div>
            <div>
                <div className="no-scrollbar relative w-full w-full rounded-xl bg-white p-4 dark:bg-gray-900 lg:p-6 shadow-sm dark:border dark:border-gray-700 rounded-2xl">
                    {isloading && <Loading />}
                    <div className="flex gap-20 w-full items-end justify-between">
                        <div className="w-full flex flex-col gap-14">
                            <div className="px-2 pr-14 w-full">
                                <h4 className="mb-2 text-4xl font-semibold text-gray-800 dark:text-white/90">
                                    Apply For Leave
                                </h4>
                                <p className="mb-6 text-lg text-gray-500 dark:text-gray-400 lg:mb-7">
                                    Leave is a period of authorized absence from work that allows an employee to take time off for personal, medical, or family reasons. It is an essential part of maintaining a healthy work-life balance, reducing stress, and ensuring productivity when employees return.
                                </p>
                            </div>
                        </div>
                    </div>
                    <form className="flex flex-col">
                        <div className="custom-scrollbar h-fit px-2 pb-3">

                            <div className="mt-7">
                                <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
                                    Leave Information
                                </h5>

                                <div className="mb-6">
                                    <div className="col-span-2 lg:col-span-1">
                                        <Label>Leave Type <span className="text-error-500">*</span></Label>
                                        <Select error={isError ? !leavetype ? true : false : false} options={["Select Leave", "Sick Leave", "Annual Leave", "Maternity Leave", "Paternity Leave", "Unpaid Leave", "Compensatory Off", "Study / Examination Leave", "Bereavement Leave", "Marriage Leave", "Earned Leave"]} onChange={(e) =>
                                            setleavetype(e.target.value)} />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">

                                    <div className="col-span-2 lg:col-span-1">
                                        <Label>Start Date <span className="text-error-500">*</span></Label>
                                        <Input error={isError ? !startdate ? true : false : false} type="date" onChange={(e) => setstartdate(e.target.value)} />
                                    </div>
                                    <div className="col-span-2 lg:col-span-1">
                                        <Label>End Date <span className="text-error-500">*</span></Label>
                                        <Input error={isError ? !enddate ? true : false : false} type="date" onChange={(e) =>
                                            setenddate(e.target.value)
                                        } />
                                    </div>
                                </div>

                                <div className="mt-6">
                                    <div className="col-span-2 lg:col-span-1">
                                        <Label>Reason for Leave <span className="text-error-500">*</span></Label>


                                        <TextArea error={isError ? !reason ? true : false : false} type="text" onChange={(e) =>
                                            setreason(e.target.value)} />
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
                            <Button onClick={(e) => handlesave(e)} size="sm">
                                Apply
                                <IoMdAdd className="text-xl" />
                            </Button>
                        </div>
                    </form>
                </div>
                <ToastContainer position="bottom-right" />
            </div>
        </div>
    )
}

export default EmployeeLeaveApply;


//EmployeeLeaveApply