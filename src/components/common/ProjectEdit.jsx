'use client'

import DistributedBalanceInputer from "@/components/common/DistributedBalanceInputer";
import Loading from "@/components/common/Loading";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import MultiSelect from "@/components/form/MultiSelect";
import Select from "@/components/form/Select.jsx";
import Button from "@/components/ui/button/Button";
import getRole from "@/helper/cookie/getrole";
import getCookie from "@/helper/cookie/gettooken";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { IoSaveSharp } from "react-icons/io5";
import { MdCancelPresentation } from "react-icons/md";
import { toast, ToastContainer } from 'react-toastify';

const Editor = dynamic(
    () => import("@/components/common/Editor"),
    { ssr: false }
);



const ProjectEdit = ({ isEdit, setisEdit, singleProject, projectId }) => {


    const token = getCookie();
    const accessrole = getRole();
    const router = useRouter();
    const [isError, setIsError] = useState(false)
    const [isloading, setisloading] = useState(false);
    const [projectName, setprojectName] = useState(singleProject?.name);
    const [clientName, setclientName] = useState(singleProject?.client);
    const [teamName, setteamName] = useState(singleProject?.team_name);
    const [Department, setDepartment] = useState(singleProject?.Department);
    const [assignedEmployee, setassignedEmployee] = useState(singleProject?.employees);
    const [teamLeader, setteamLeader] = useState(singleProject?.team_leaders);
    const [startDate, setStartDate] = useState(singleProject?.start_date);
    const [endDate, setendDate] = useState(singleProject?.end_date);
    const [priority, setpriority] = useState(singleProject?.priority);
    const [status, setstatus] = useState(singleProject?.status);
    const [description, setdescription] = useState(singleProject?.description);
    const [ammount, setammount] = useState(singleProject?.amount);
    const [taken_by, settaken_by] = useState(singleProject?.taken_by);
    const [AllEmployeeAndDepartment, setAllEmployeeAndDepartment] = useState([]);


    const [teamLeaderId, setteamLeaderId] = useState(getidfromallinfo(teamLeader));
    const [assignedEmployeeId, setassignedEmployeeId] = useState(getidfromallinfo(assignedEmployee));



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



    /*************** Update Project Function Here ***************/
    async function updateProject(e, id) {
        e.preventDefault();



        //body data prepare here
        const addedabledata = {
            project_name: projectName,
            client_name: clientName,
            Department: Department,
            team_name: teamName,
            start_date: startDate,
            end_date: endDate,
            status: status,
            priority: priority,
            taken_by: [taken_by],
            amount: ammount,
            team_leader: teamLeaderId,
            assign_employee: assignedEmployeeId,
            description: description
        }



        console.log(addedabledata);


        try {
            setisloading(true);

            //send a post request in the backend
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/projects/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify(addedabledata),
            });

            if (response.ok) {
                setisloading(false);
                const data = await response.json();
                toast.success("Update Project successful");

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
                toast.error('Update Project Failed');
                console.error("Update Project Failed:", errorData);
            }
        } catch (error) {
            setisloading(false);
            console.error(error);
        }



    }





    return (
        <div className="absolute left-0 top-0 w-full">
            <div>
                <div className="no-scrollbar relative w-full w-full rounded-xl bg-white p-4 dark:bg-gray-900 lg:p-6 shadow-sm dark:border dark:border-gray-700 rounded-2xl">
                    {isloading && <Loading />}
                    <div className="flex gap-20 w-full items-end justify-between">
                        <div className="w-full flex gap-14">
                            <div className="px-2 pr-14 w-full">
                                <h4 className="mb-2 text-4xl font-semibold text-gray-800 dark:text-white/90">
                                    Update project
                                </h4>
                                <p className="mb-6 text-lg text-gray-500 dark:text-gray-400 lg:mb-7">
                                    Use this section to Update an Existing Projects.
                                </p>
                            </div>

                            <div className="flex items-center gap-2">
                                <button onClick={(e) => { setisEdit(false) }} className="bg-yellow-700 font-medium flex items-center gap-1 px-4 py-2 rounded-md text-white cursor-pointer font-medium">
                                    <MdCancelPresentation className="text-md" />
                                    <span className="text-sm">Cencel</span>
                                </button>
                                <button onClick={(e) => { updateProject(e, projectId) }} className="bg-blue-700 font-medium flex items-center gap-1 p-2 rounded-md text-white cursor-pointer font-medium">
                                    <IoSaveSharp className="text-md" />
                                    <span className="text-sm">Update</span>
                                </button>
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
                                        <Input value={projectName} error={isError ? !projectName ? true : false : false} type="text" onChange={(e) => setprojectName(e.target.value)} />
                                    </div>
                                    <div className="col-span-2 lg:col-span-1">
                                        <Label>Client Name <span className="text-error-500">*</span></Label>
                                        <Input value={clientName} error={isError ? !clientName ? true : false : false} type="text" onChange={(e) => setclientName(e.target.value)} />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2 mb-6">
                                    <div className="col-span-2 lg:col-span-1">
                                        <Label>{`Project Budget  (In USD)`}<span className="text-error-500">*</span></Label>
                                        <Input value={ammount} error={isError ? !ammount ? true : false : false} type="number" onChange={(e) => setammount(e.target.value)} />
                                    </div>
                                    <div className="col-span-2 lg:col-span-1">
                                        <Label>Sales By <span className="text-error-500">*</span></Label>
                                        <select value={taken_by[0] && taken_by[0]?.id} onChange={(e) =>
                                            settaken_by(Number(e.target.value))} className={`h-11 w-full appearance-none rounded-lg border px-4 py-2.5 pr-11 text-sm shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 ${isError ? (taken_by?.length < 0) ? "text-error-800 border-error-500 focus:ring-3 focus:ring-error-500/10  dark:text-error-400 dark:border-error-500" : "border-gray-300 dark:border-gray-700" : "border-gray-300 dark:border-gray-700"}`}>
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
                                        <select value={Department} onChange={(e) =>
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
                                        <Input value={teamName} error={isError ? !teamName ? true : false : false} type="text" onChange={(e) => setteamName(e.target.value)} />
                                    </div>
                                </div>






                                <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2 mt-6">

                                    <div className="col-span-2 lg:col-span-1">
                                        <Label>Start Date <span className="text-error-500">*</span></Label>
                                        <Input value={startDate} error={isError ? !startDate ? true : false : false} type="date" onChange={(e) => setStartDate(e.target.value)} />
                                    </div>
                                    <div className="col-span-2 lg:col-span-1">
                                        <Label>Deadline Date <span className="text-error-500">*</span></Label>
                                        <Input value={endDate} error={isError ? !endDate ? true : false : false} type="date" onChange={(e) =>
                                            setendDate(e.target.value)
                                        } />
                                    </div>
                                </div>


                                <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2 mt-6">

                                    <div className="col-span-2 lg:col-span-1">
                                        <Label>Priority </Label>
                                        <Select selectedValue={priority} error={isError ? !priority ? true : false : false} options={["Low", "Medium", "High"]} onChange={(e) =>
                                            setpriority(e.target.value)} />
                                    </div>
                                    <div className="col-span-2 lg:col-span-1">
                                        <Label>Work Status</Label>
                                        <Select selectedValue={status} error={isError ? !status ? true : false : false} options={["To-Do", "In Progress", "On Hold", "Under Review", "Completed", "Cancelled", "Delivered"]} onChange={(e) =>
                                            setstatus(e.target.value)} />
                                    </div>
                                </div>


                                <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2 mt-6">
                                    <div className="col-span-2 lg:col-span-1">
                                        <Label>Team Leader <span className="text-error-500">*</span></Label>
                                        <MultiSelect error={isError ? !teamLeader.length > 0 ? true : false : false} options={AllEmployeeAndDepartment?.developers} selectedOptions={teamLeaderId} setSelectedOptions={setteamLeaderId} />
                                    </div>

                                    <div className="col-span-2 lg:col-span-1">
                                        <Label>Assign Employee <span className="text-error-500">*</span></Label>
                                        <MultiSelect error={isError ? !assignedEmployee.length > 0 ? true : false : false} options={AllEmployeeAndDepartment?.developers} selectedOptions={assignedEmployeeId} setSelectedOptions={setassignedEmployeeId} />
                                    </div>
                                </div>

                                <div className="mt-6">
                                    <DistributedBalanceInputer assignedEmployee={assignedEmployee} totalBudget={ammount} />
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
                            <Button onClick={(e) => updateProject(e, projectId)} size="sm">
                                Update Project
                                <IoSaveSharp className="text-md" />
                            </Button>
                        </div>
                    </form>
                </div>
                <ToastContainer position="bottom-right" />
            </div>
        </div>
    )
}

export default ProjectEdit;




function getidfromallinfo(arr) {

    const returnarr = [];

    arr.map((i) => {
        returnarr.push(i?.id);
    });

    return returnarr;

}