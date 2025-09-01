'use client'

import Loading from "@/components/common/Loading";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Select from "@/components/form/Select.jsx";
import Button from "@/components/ui/button/Button";
import getId from "@/helper/cookie/getid";
import getRole from "@/helper/cookie/getrole";
import getCookie from "@/helper/cookie/gettooken";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { toast, ToastContainer } from 'react-toastify';
import MultiSelect from "../../../../../components/form/MultiSelect";


const Editor = dynamic(
    () => import("@/components/common/Editor"),
    { ssr: false }
);



const AddProject = () => {



    const token = getCookie();
    const accessrole = getRole();
    const myId = getId();
    const router = useRouter();
    const [isError, setIsError] = useState(false)
    const [isloading, setisloading] = useState(false);
    const [projectName, setprojectName] = useState('');
    const [clientName, setclientName] = useState('');
    const [Department, setDepartment] = useState('');
    const [assignedEmployee, setassignedEmployee] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setendDate] = useState('');
    const [priority, setpriority] = useState('');
    const [status, setstatus] = useState('');
    const [description, setdescription] = useState('');



    /*************** Apply for leave here***************/
    async function handlesave(e) {
        e.preventDefault();


        //check user Fill up all required feilds or not
        if (!projectName || !clientName || !Department || !startDate || !endDate || !priority || !status || !description || !assignedEmployee.length > 0) {
            setIsError(true);
            console.log(assignedEmployee);
            return;
        }


        console.log(assignedEmployee);

        const applydata = {
            // employee_id: myId,
            // leave_type: leavetype,
            // start_date: startdate,
            // end_date: enddate,
            // reason: reason
        }



        try {
            setisloading(true);

            //send a post request in the backend
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/project/add`, {
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
                        <div className="w-full flex gap-14">
                            <div className="px-2 pr-14 w-full">
                                <h4 className="mb-2 text-4xl font-semibold text-gray-800 dark:text-white/90">
                                    Add project
                                </h4>
                                <p className="mb-6 text-lg text-gray-500 dark:text-gray-400 lg:mb-7">
                                    Use this section to create and manage new projects. Provide the project name, description, start and end dates, assign employees, and set project status.
                                </p>
                            </div>
                        </div>
                    </div>
                    <form className="flex flex-col">
                        <div className="custom-scrollbar h-fit px-2 pb-3">

                            <div className="mt-7">
                                <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
                                    Project Information
                                </h5>

                                <div className="mb-6">
                                    <div className="col-span-2 lg:col-span-1">
                                        <Label>Project Name <span className="text-error-500">*</span></Label>
                                        <Input error={isError ? !projectName ? true : false : false} type="text" onChange={(e) => setprojectName(e.target.value)} />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2 mt-6">

                                    <div className="col-span-2 lg:col-span-1">
                                        <Label>Client <span className="text-error-500">*</span></Label>
                                        <Input error={isError ? !clientName ? true : false : false} type="text" onChange={(e) => setclientName(e.target.value)} />
                                    </div>
                                    <div className="col-span-2 lg:col-span-1">
                                        <Label>Department <span className="text-error-500">*</span></Label>
                                        <Select error={isError ? !Department ? true : false : false} options={["Sick Leave", "Annual Leave", "Maternity Leave", "Paternity Leave", "Unpaid Leave", "Compensatory Off", "Study / Examination Leave", "Bereavement Leave", "Marriage Leave", "Earned Leave"]} onChange={(e) =>
                                            setDepartment(e.target.value)} />
                                    </div>
                                </div>



                                <div className="mt-6">
                                    <div className="col-span-2 lg:col-span-1">
                                        <Label>Assign Employee <span className="text-error-500">*</span></Label>
                                        <MultiSelect error={isError ? !assignedEmployee.length > 0 ? true : false : false} options={["Sick Leave", "Annual Leave", "Maternity Leave", "Paternity Leave", "Unpaid Leave", "Compensatory Off", "Study / Examination Leave", "Bereavement Leave", "Marriage Leave", "Earned Leave"]} selectedOptions={assignedEmployee} setSelectedOptions={setassignedEmployee} />
                                    </div>
                                </div>


                                <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2 mt-6">

                                    <div className="col-span-2 lg:col-span-1">
                                        <Label>Start Date <span className="text-error-500">*</span></Label>
                                        <Input error={isError ? !startDate ? true : false : false} type="date" onChange={(e) => setStartDate(e.target.value)} />
                                    </div>
                                    <div className="col-span-2 lg:col-span-1">
                                        <Label>Deadline Date <span className="text-error-500">*</span></Label>
                                        <Input error={isError ? !endDate ? true : false : false} type="date" onChange={(e) =>
                                            setendDate(e.target.value)
                                        } />
                                    </div>
                                </div>


                                <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2 mt-6">

                                    <div className="col-span-2 lg:col-span-1">
                                        <Label>Priority <span className="text-error-500">*</span></Label>
                                        <Select error={isError ? !priority ? true : false : false} options={["Select Leave", "Sick Leave", "Annual Leave", "Maternity Leave", "Paternity Leave", "Unpaid Leave", "Compensatory Off", "Study / Examination Leave", "Bereavement Leave", "Marriage Leave", "Earned Leave"]} onChange={(e) =>
                                            setpriority(e.target.value)} />
                                    </div>
                                    <div className="col-span-2 lg:col-span-1">
                                        <Label>Work Status <span className="text-error-500">*</span></Label>
                                        <Select error={isError ? !status ? true : false : false} options={["Select Leave", "Sick Leave", "Annual Leave", "Maternity Leave", "Paternity Leave", "Unpaid Leave", "Compensatory Off", "Study / Examination Leave", "Bereavement Leave", "Marriage Leave", "Earned Leave"]} onChange={(e) =>
                                            setstatus(e.target.value)} />
                                    </div>
                                </div>


                                <div className="mt-6">
                                    <div className="col-span-2 lg:col-span-1">
                                        <Label>Project Descriptions</Label>


                                        <Editor content={description} setContent={setdescription} />
                                    </div>
                                </div>



                                <div className="col-span-2 lg:col-span-1 w-full mt-6">
                                    <Label>Project File</Label>
                                    <Input error={isError ? false : false} type="file" accept=".jpg,.jpeg,.png" onChange={(e) => { handleFileChange(e, setimageFile, setimagepreview) }} />
                                </div>

                            </div>

                        </div>
                        <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
                            <Button onClick={(e) => handlesave(e)} size="sm">
                                Add Project
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

export default AddProject;