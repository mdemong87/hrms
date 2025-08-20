'use client'

import BackBtn from "@/components/common/BackBtn";
import getId from "@/helper/cookie/getid";
import getRole from "@/helper/cookie/getrole";
import getCookie from "@/helper/cookie/gettooken";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import demoprofile from "../../../public/images/user/demo.jpeg";
import Loading from "../common/Loading";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import Select from "../form/Select";


const LimitedSingleEmployeeInfo = () => {


    const token = getCookie();
    const accessrole = getRole();
    const id = getId();
    const router = useRouter();
    const [isdisable, setisdisable] = useState(true);
    const [SingleEmployee, setSingleEmployee] = useState([]);
    const [isloading, setisloading] = useState(false);


    // Fetch single employee information here
    const getSingleEmployee = useCallback(async (id) => {
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/employees/${id}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            console.log(response);

            if (response.ok) {
                const res = await response.json();
                setSingleEmployee(res?.employee);
            } else {
                console.error("Failed to fetch single Employee");
            }
        } catch (error) {
            console.error("Error fetching single employee:", error);
        }
    }, [token]);

    // Run once on component mount
    useEffect(() => {
        getSingleEmployee(id);
    }, [getSingleEmployee, id]);


    console.log(SingleEmployee);

    return (
        <div>
            <div>
                <div className="no-scrollbar relative w-full w-full rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
                    {isloading && <Loading />}
                    <div className="flex gap-20 w-full items-end justify-between">
                        <div className="flex flex-col gap-1 items-center justify-center">
                            <div className="text-gray-200 w-[155px] h-[182px] border border-gray-500 bg-gray-200 dark:bg-gray-800 rounded-lg overflow-hidden">
                                <Image src={SingleEmployee?.avatar ? SingleEmployee?.avatar : demoprofile} alt="profile-image" width={1000} height={1000} className="rounded-lg w-full h-full object-cover" />
                            </div>
                            <div className="col-span-2 lg:col-span-1 w-[200px] pt-4">
                                <Input disabled={isdisable} type="file" accept=".jpg,.jpeg,.png" />
                            </div>
                        </div>
                        <div className="">
                            <div className="flex items-center gap-4">
                                <BackBtn />
                            </div>
                        </div>
                    </div>
                    <form className="flex flex-col">
                        <div className="custom-scrollbar h-fit px-2 pb-3">

                            <div className="mt-7">
                                <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
                                    Basic Information
                                </h5>

                                <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                                    <div className="col-span-2 lg:col-span-1">
                                        <Label>Employee ID</Label>
                                        <Input disabled value={SingleEmployee?.eid} type="text"
                                        />
                                    </div>

                                    <div className="col-span-2 lg:col-span-1">
                                        <Label>First Name</Label>
                                        <Input disabled={isdisable} value={SingleEmployee?.fname} type="text"
                                        />
                                    </div>

                                    <div className="col-span-2 lg:col-span-1">
                                        <Label>Last Name</Label>
                                        <Input disabled={isdisable} value={SingleEmployee?.lname} type="text" />
                                    </div>

                                    <div className="col-span-2 lg:col-span-1">
                                        <Label>Date of Birth</Label>
                                        <Input disabled={isdisable} value={SingleEmployee?.dob} type="date" />
                                    </div>

                                    <div className="col-span-2 lg:col-span-1">
                                        <Label>Gender</Label>
                                        <Select disabled={isdisable} selectedValue={SingleEmployee?.gender} options={["Select Gender", "Male", "Female"]} />
                                    </div>

                                    <div className="col-span-2 lg:col-span-1">
                                        <Label>Marital Status</Label>
                                        <Select disabled={isdisable} selectedValue={SingleEmployee?.meritalstatus} options={["Select Marital Status", "Married", "Unmarried", "Engaged"]} />
                                    </div>

                                </div>
                            </div>

                            <div className="mt-7">
                                <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
                                    Contact Information
                                </h5>

                                <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">


                                    <div className="col-span-2 lg:col-span-1">
                                        <Label>Email Address</Label>
                                        <Input value={SingleEmployee?.email} disabled={isdisable} type="email" />
                                    </div>

                                    <div className="col-span-2 lg:col-span-1">
                                        <Label>Phone</Label>
                                        <Input value={SingleEmployee?.phone} disabled={isdisable} type="phone" />
                                    </div>


                                    <div className="col-span-2 lg:col-span-1">
                                        <Label>Emergency Contact Name</Label>
                                        <Input value={SingleEmployee?.emergencycontactname} disabled={isdisable} type="text" />
                                    </div>

                                    <div className="col-span-2 lg:col-span-1">
                                        <Label>Emergency Contact Phone</Label>
                                        <Input value={SingleEmployee?.emergencycontactphone} disabled={isdisable} type="phone" />
                                    </div>

                                    <div className="col-span-2 lg:col-span-1">
                                        <Label>Address</Label>
                                        <Input value={SingleEmployee?.address} disabled={isdisable} type="text" />
                                    </div>



                                    <div className="col-span-2 lg:col-span-1">
                                        <Label>National ID</Label>
                                        <Input value={SingleEmployee?.nationalid} disabled={isdisable} type="number" />
                                    </div>



                                </div>
                            </div>

                            <div className="mt-7">
                                <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
                                    Job Details
                                </h5>

                                <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                                    <div className="col-span-2 lg:col-span-1">
                                        <Label>Department</Label>
                                        <Select disabled={isdisable} selectedValue={SingleEmployee?.department} options={["Select Employment Type", "Full Time", "Remote", "Hybride"]} />

                                    </div>


                                    <div className="col-span-2 lg:col-span-1">
                                        <Label>Designation / Job Title</Label>
                                        <Input disabled={isdisable} value={SingleEmployee?.designation} type="text" />
                                    </div>

                                    <div className="col-span-2 lg:col-span-1">
                                        <Label>Employment Type</Label>
                                        <Select disabled={isdisable} selectedValue={SingleEmployee?.emplyeetype} options={["Select Employment Type", "Full Time", "Remote", "Hybride"]} />

                                    </div>

                                    <div className="col-span-2 lg:col-span-1">
                                        <Label>Joining Date</Label>
                                        <Input disabled={isdisable} value={SingleEmployee?.joindate} type="date" />
                                    </div>
                                    <div className="col-span-2 lg:col-span-1">
                                        <Label>Probation Period</Label>
                                        <Select disabled={isdisable} selectedValue={SingleEmployee?.probitionprioed} options={["Select Probation Period", "0 Day", "15 Days", "1 Month", "2 Months", "3 Manths"]} />
                                    </div>


                                    <div className="col-span-2 lg:col-span-1">
                                        <Label>Reporting Manager</Label>
                                        <Input disabled={isdisable} value={SingleEmployee?.reportingmanager} type="text" />
                                    </div>

                                    <div className="col-span-2 lg:col-span-1">
                                        <Label>Work Shift</Label>
                                        <Select disabled={isdisable} selectedValue={''} value={''} options={["Select Working Shift", "Day", "Night", "Roster"]} />
                                    </div>

                                </div>
                            </div>


                            <div className="mt-7">
                                <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
                                    Company Options
                                </h5>

                                <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">

                                    <div className="col-span-2 lg:col-span-1">
                                        <Label>Role / Access Level</Label>
                                        <Select disabled={isdisable} selectedValue={SingleEmployee?.user?.role} options={["Select Role", "Admin", "Hr", "Employee", "Project Manager"]} />
                                    </div>

                                    <div className="col-span-2 lg:col-span-1">
                                        <Label>Level / Grade</Label>
                                        <Select disabled={isdisable} selectedValue={SingleEmployee?.level} options={[
                                            "Select Lavel/grade",
                                            "Unpaid-Intern-G0",
                                            "Paid Intern-G0",
                                            "Entry-Level-G1",
                                            "Mid-Level-G2",
                                            "Senior-Level-G3",
                                            "Manager-G4",
                                            "Director-G5",
                                            "Executive/CXO-G6"
                                        ]} />
                                    </div>

                                    <div className="col-span-2 lg:col-span-1">
                                        <Label>Salary</Label>
                                        <Input disabled={isdisable} value={SingleEmployee?.salary} type="text" />
                                    </div>

                                    <div className="col-span-2 lg:col-span-1">
                                        <Label>Status</Label>
                                        <Input disabled={isdisable} value={SingleEmployee?.status} type="text" />
                                    </div>


                                </div>
                            </div>


                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LimitedSingleEmployeeInfo;