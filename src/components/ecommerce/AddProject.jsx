'use client'

import Loading from "@/components/common/Loading";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import MultiSelect from "@/components/form/MultiSelect";
import Select from "@/components/form/Select.jsx";
import Button from "@/components/ui/button/Button";
import getId from "@/helper/cookie/getid";
import getRole from "@/helper/cookie/getrole";
import getCookie from "@/helper/cookie/gettooken";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { toast, ToastContainer } from 'react-toastify';


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
    const [teamName, setteamName] = useState('');
    const [Department, setDepartment] = useState(-1);
    const [assignedEmployee, setassignedEmployee] = useState([]);
    const [teamLeader, setteamLeader] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setendDate] = useState('');
    const [priority, setpriority] = useState("Low");
    const [status, setstatus] = useState("To-Do");
    const [description, setdescription] = useState('');
    const [ammount, setammount] = useState(0);
    const [taken_by, settaken_by] = useState(-1);
    const [AllEmployeeAndDepartment, setAllEmployeeAndDepartment] = useState([]);



    /**************** Get All Employee, Department ****************/
    const getAllEmployeeAndDepartment = useCallback(async () => {
        try {

            setisloading(true);

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/project/attributes`,
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
                setAllEmployeeAndDepartment(res);
            } else {
                console.error("Failed to fetch All Employee, Department");
            }
        } catch (error) {
            console.error("Error fetching All Employee, Department:", error);
        }
    }, [token]);



    /************** Run once on component mount ************/
    useEffect(() => {
        getAllEmployeeAndDepartment();
    }, [getAllEmployeeAndDepartment]);



    /*************** Apply for leave here***************/
    async function handlesave(e) {
        e.preventDefault();


        //check user Fill up all required feilds or not
        if (!projectName || !clientName || !teamName || !startDate || !endDate || !Department > 0 || !assignedEmployee?.length > 0 || !teamLeader?.length > 0 || !taken_by > 0 || !ammount > 0) {
            setIsError(true);
            return;
        }


        //body data prepare here
        const addedabledata = {
            employee_id: myId,
            project_name: projectName,
            client_name: clientName,
            Department: Department,
            team_name: teamName,
            start_date: startDate,
            end_date: endDate,
            status: status,
            priority: priority,
            team_leader: teamLeader,
            taken_by: [taken_by],
            amount: ammount,
            assign_employee: assignedEmployee,
            description: description
        }


        console.log(addedabledata);


        try {
            setisloading(true);

            //send a post request in the backend
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/projects`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify(addedabledata),
            });

            if (response.ok) {
                setisloading(false);
                const data = await response.json();
                toast.success("Added Project successful");

                // role base redirect all employee page after successfully employee added
                setTimeout(() => {
                    switch (accessrole) {
                        case "Project Manager":
                            router.push('/projectmanager/projects');
                            break;
                        case "Admin":
                            router.push('/admin/projects');
                            break;
                        default:
                            console.error('Unknown role');
                    }
                }, 200);
            } else {
                setisloading(false);
                const errorData = await response.json();
                toast.error('Added Project Failed');
                console.error("Added Project Failed:", errorData);
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

                                <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2 mb-6">
                                    <div className="col-span-2 lg:col-span-1">
                                        <Label>Project Name <span className="text-error-500">*</span></Label>
                                        <Input error={isError ? !projectName ? true : false : false} type="text" onChange={(e) => setprojectName(e.target.value)} />
                                    </div>
                                    <div className="col-span-2 lg:col-span-1">
                                        <Label>Client Name <span className="text-error-500">*</span></Label>
                                        <Input error={isError ? !clientName ? true : false : false} type="text" onChange={(e) => setclientName(e.target.value)} />
                                    </div>
                                </div>


                                <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2 mb-6">
                                    <div className="col-span-2 lg:col-span-1">
                                        <Label>{`Project Budget  (In USD)`}<span className="text-error-500">*</span></Label>
                                        <Input error={isError ? !ammount ? true : false : false} type="number" onChange={(e) => setammount(e.target.value)} />
                                    </div>
                                    <div className="col-span-2 lg:col-span-1">
                                        <Label>Sales By <span className="text-error-500">*</span></Label>
                                        <select onChange={(e) =>
                                            settaken_by(Number(e.target.value))} className={`h-11 w-full appearance-none rounded-lg border px-4 py-2.5 pr-11 text-sm shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 ${isError ? (taken_by < 0) ? "text-error-800 border-error-500 focus:ring-3 focus:ring-error-500/10  dark:text-error-400 dark:border-error-500" : "border-gray-300 dark:border-gray-700" : "border-gray-300 dark:border-gray-700"}`}>
                                            <option className="text-gray-700 dark:bg-gray-900 dark:text-gray-400" value={-1}>Select Sales Executive</option>
                                            {
                                                AllEmployeeAndDepartment?.developers?.map((item, index) => {
                                                    return (
                                                        <option key={index} className="text-gray-700 dark:bg-gray-900 dark:text-gray-400" value={item?.id}>{item?.fname + "" + item?.lname}</option>
                                                    )
                                                })
                                            }
                                        </select>


                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2 mt-6">

                                    <div className="col-span-2 lg:col-span-1">
                                        <Label>Department <span className="text-error-500">*</span></Label>
                                        <select onChange={(e) =>
                                            setDepartment(Number(e.target.value))} className={`h-11 w-full appearance-none rounded-lg border px-4 py-2.5 pr-11 text-sm shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 ${isError ? (Department < 0) ? "text-error-800 border-error-500 focus:ring-3 focus:ring-error-500/10  dark:text-error-400 dark:border-error-500" : "border-gray-300 dark:border-gray-700" : "border-gray-300 dark:border-gray-700"}`}>
                                            <option className="text-gray-700 dark:bg-gray-900 dark:text-gray-400" value={-1}>Select Department</option>
                                            {
                                                AllEmployeeAndDepartment?.departments?.map((item, index) => {
                                                    return (
                                                        <option key={index} className="text-gray-700 dark:bg-gray-900 dark:text-gray-400" value={item?.id}>{item?.name}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>

                                    <div className="col-span-2 lg:col-span-1">
                                        <Label>Team Name <span className="text-error-500">*</span></Label>
                                        <Input error={isError ? !teamName ? true : false : false} type="text" onChange={(e) => setteamName(e.target.value)} />
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
                                        <Label>Priority </Label>
                                        <Select error={isError ? !priority ? true : false : false} options={["Low", "Medium", "High"]} onChange={(e) =>
                                            setpriority(e.target.value)} />
                                    </div>
                                    <div className="col-span-2 lg:col-span-1">
                                        <Label>Work Status</Label>
                                        <Select error={isError ? !status ? true : false : false} options={["To-Do", "In Progress", "On Hold", "Under Review", "Completed", "Cancelled", "Delivered"]} onChange={(e) =>
                                            setstatus(e.target.value)} />
                                    </div>
                                </div>


                                <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2 mt-6">
                                    <div className="col-span-2 lg:col-span-1">
                                        <Label>Team Leader <span className="text-error-500">*</span></Label>
                                        <MultiSelect error={isError ? !teamLeader.length > 0 ? true : false : false} options={AllEmployeeAndDepartment?.developers} selectedOptions={teamLeader} setSelectedOptions={setteamLeader} />
                                    </div>

                                    <div className="col-span-2 lg:col-span-1">
                                        <Label>Assign Employee <span className="text-error-500">*</span></Label>
                                        <MultiSelect error={isError ? !assignedEmployee.length > 0 ? true : false : false} options={AllEmployeeAndDepartment?.developers} selectedOptions={assignedEmployee} setSelectedOptions={setassignedEmployee} />
                                    </div>
                                </div>



                                <div className="mt-6">
                                    <div className="col-span-2 lg:col-span-1">
                                        <Label>Project Descriptions</Label>


                                        <Editor content={description} setContent={setdescription} />
                                    </div>
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