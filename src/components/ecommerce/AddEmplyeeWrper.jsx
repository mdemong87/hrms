'use client'

import Image from "next/image";
import { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { toast, ToastContainer } from 'react-toastify';
import profile from "../../../public/images/user/user-06.jpg";
import Loading from "../common/Loading";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import Select from "../form/Select";
import Button from "../ui/button/Button";

const AddAmployeeWper = () => {


    const [isloading, setisloading] = useState(false);
    const [formdata, setformdate] = useState({
        eid: '',
        fname: '',
        lname: '',
        dob: '',
        gender: '',
        meritalstatus: '',
        email: '',
        phone: '',
        emergencycontactname: '',
        emergencycontactphone: '',
        address: '',
        department: '',
        jobtitle: '',
        emplyeetype: '',
        joindate: '',
        probitionprioed: '',
        reportingmanager: '',
        workshift: '',
        nationalid: '',
        role: '',
        password: '',
        image: '',
        level: '',
        target: ''
    });



    async function handlesave(e) {

        e.preventDefault();
        console.log(formdata);


        try {
            setisloading(true);
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/emplyee/add`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json", // Specify JSON request
                },
                body: JSON.stringify(formdata) // Convert JS object to JSON string
            });

            // Handle response
            if (response.ok) {
                setisloading(false);
                const data = await response.json();
                toast.success("SignIn successful");
                setTimeout(() => {
                    router.push('/employee');
                }, 1000);
            } else {
                setisloading(false);
                const errorData = await response.json();
                toast.error('SignIn failed');
                console.error("SignIn failed:", errorData.message || "Unknown error");
            }

        } catch (error) {
            setisloading(false);
            console.error("Error during signIn:", error);
        }




    }


    return (
        <div>
            <div>
                <div className="no-scrollbar relative w-full w-full rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
                    {isloading && <Loading />}
                    <div className="flex w-full items-end justify-between">
                        <div className="px-2 pr-14">
                            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
                                Add Emplyee
                            </h4>
                            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
                                Add Emplyee in the System
                            </p>
                        </div>
                        <div className="flex flex-col gap-1 items-center justify-center">
                            <div className="text-gray-200 w-[150px] h-[150px] border border-gray-300 rounded-full">
                                <Image src={profile} alt="profile-image" className="rounded-full w-full h-full" />
                            </div>
                            <div className="col-span-2 lg:col-span-1">
                                <Label>Profile Photo</Label>
                                <Input type="file" onChange={(e) =>
                                    setformdate((prev) => ({
                                        ...prev,
                                        image: e.target.value
                                    }))
                                } />
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
                                        <Input disabled type="number" onChange={(e) =>
                                            setformdate((prev) => ({
                                                ...prev,
                                                eid: e.target.value
                                            }))
                                        } />
                                    </div>

                                    <div className="col-span-2 lg:col-span-1">
                                        <Label>First Name</Label>
                                        <Input type="text" onChange={(e) =>
                                            setformdate((prev) => ({
                                                ...prev,
                                                fname: e.target.value
                                            }))
                                        } />
                                    </div>

                                    <div className="col-span-2 lg:col-span-1">
                                        <Label>Last Name</Label>
                                        <Input type="text" onChange={(e) =>
                                            setformdate((prev) => ({
                                                ...prev,
                                                lname: e.target.value
                                            }))
                                        } />
                                    </div>

                                    <div className="col-span-2 lg:col-span-1">
                                        <Label>Date of Birth</Label>
                                        <Input type="date" onChange={(e) =>
                                            setformdate((prev) => ({
                                                ...prev,
                                                dob: e.target.value
                                            }))
                                        } />
                                    </div>

                                    <div className="col-span-2 lg:col-span-1">
                                        <Label>Gender</Label>
                                        <Select options={["Male", "Female"]} onChange={(e) =>
                                            setformdate((prev) => ({
                                                ...prev,
                                                gender: e.target.value
                                            }))} />
                                    </div>

                                    <div className="col-span-2 lg:col-span-1">
                                        <Label>Marital Status</Label>
                                        <Select options={["Married", "Unmarried", "Engaged"]} onChange={(e) =>
                                            setformdate((prev) => ({
                                                ...prev,
                                                meritalstatus: e.target.value
                                            }))} />
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
                                        <Input type="email" onChange={(e) =>
                                            setformdate((prev) => ({
                                                ...prev,
                                                email: e.target.value
                                            }))
                                        } />
                                    </div>

                                    <div className="col-span-2 lg:col-span-1">
                                        <Label>Phone</Label>
                                        <Input type="phone" onChange={(e) =>
                                            setformdate((prev) => ({
                                                ...prev,
                                                phone: e.target.value
                                            }))
                                        } />
                                    </div>


                                    <div className="col-span-2 lg:col-span-1">
                                        <Label>Emergency Contact Name</Label>
                                        <Input type="text" onChange={(e) =>
                                            setformdate((prev) => ({
                                                ...prev,
                                                emergencycontactname: e.target.value
                                            }))
                                        } />
                                    </div>

                                    <div className="col-span-2 lg:col-span-1">
                                        <Label>Emergency Contact Phone</Label>
                                        <Input type="phone" onChange={(e) =>
                                            setformdate((prev) => ({
                                                ...prev,
                                                emergencycontactphone: e.target.value
                                            }))
                                        } />
                                    </div>

                                    <div className="col-span-2 lg:col-span-1">
                                        <Label>Address</Label>
                                        <Input type="text" onChange={(e) =>
                                            setformdate((prev) => ({
                                                ...prev,
                                                address: e.target.value
                                            }))
                                        } />
                                    </div>



                                    <div className="col-span-2 lg:col-span-1">
                                        <Label>National ID</Label>
                                        <Input type="number" onChange={(e) =>
                                            setformdate((prev) => ({
                                                ...prev,
                                                nationalid: e.target.value
                                            }))
                                        } />
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
                                        <Select options={["Management", "Custom Code", "Business Development", "Wordpress", "Sales"]} onChange={(e) =>
                                            setformdate((prev) => ({
                                                ...prev,
                                                department: e.target.value
                                            }))} />
                                    </div>


                                    <div className="col-span-2 lg:col-span-1">
                                        <Label>Designation / Job Title</Label>
                                        <Input type="text" onChange={(e) =>
                                            setformdate((prev) => ({
                                                ...prev,
                                                jobtitle: e.target.value
                                            }))
                                        } />
                                    </div>

                                    <div className="col-span-2 lg:col-span-1">
                                        <Label>Employment Type</Label>
                                        <Select options={["Full Time", "Remote", "Hybride"]} onChange={(e) =>
                                            setformdate((prev) => ({
                                                ...prev,
                                                emplyeetype: e.target.value
                                            }))} />

                                    </div>

                                    <div className="col-span-2 lg:col-span-1">
                                        <Label>Joining Date</Label>
                                        <Input type="date" onChange={(e) =>
                                            setformdate((prev) => ({
                                                ...prev,
                                                joindate: e.target.value
                                            }))
                                        } />
                                    </div>
                                    <div className="col-span-2 lg:col-span-1">
                                        <Label>Probation Period</Label>
                                        <Select options={["15 Days", "1 Month", "2 Months", "3 Manths"]} onChange={(e) =>
                                            setformdate((prev) => ({
                                                ...prev,
                                                probitionprioed: e.target.value
                                            }))} />
                                    </div>


                                    <div className="col-span-2 lg:col-span-1">
                                        <Label>Reporting Manager</Label>
                                        <Input type="text" onChange={(e) =>
                                            setformdate((prev) => ({
                                                ...prev,
                                                reportingmanager: e.target.value
                                            }))
                                        } />
                                    </div>

                                    <div className="col-span-2 lg:col-span-1">
                                        <Label>Work Shift</Label>
                                        <Select options={["Day", "Night", "Roster"]} onChange={(e) =>
                                            setformdate((prev) => ({
                                                ...prev,
                                                workshift: e.target.value
                                            }))} />
                                    </div>

                                </div>
                            </div>


                            <div className="mt-7">
                                <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
                                    Company Options
                                </h5>

                                <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">


                                    <div className="col-span-2 lg:col-span-1">
                                        <Label>Target</Label>
                                        <Input type="number" onChange={(e) =>
                                            setformdate((prev) => ({
                                                ...prev,
                                                target: e.target.value
                                            }))
                                        } />
                                    </div>


                                    <div className="col-span-2 lg:col-span-1">
                                        <Label>Role / Access Level</Label>
                                        <Select options={["Admin", "HR", "Employee", "Project Manager"]} onChange={(e) =>
                                            setformdate((prev) => ({
                                                ...prev,
                                                role: e.target.value
                                            }))} />
                                    </div>

                                    <div className="col-span-2 lg:col-span-1">
                                        <Label>Level / Grade</Label>
                                        <Select options={[
                                            "Unpaid-Intern-G0",
                                            "Paid Intern-G0",
                                            "Entry-Level-G1",
                                            "Mid-Level-G2",
                                            "Senior-Level-G3",
                                            "Manager-G4",
                                            "Director-G5",
                                            "Executive/CXO-G6"
                                        ]} onChange={(e) =>
                                            setformdate((prev) => ({
                                                ...prev,
                                                level: e.target.value
                                            }))} />
                                    </div>

                                    <div className="col-span-2 lg:col-span-1">
                                        <Label>Password / Temporary Password</Label>
                                        <Input type="text" onChange={(e) =>
                                            setformdate((prev) => ({
                                                ...prev,
                                                password: e.target.value
                                            }))
                                        } />
                                    </div>


                                </div>
                            </div>


                        </div>
                        <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
                            <Button onClick={(e) => handlesave(e)} size="sm">
                                Add Employee
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

export default AddAmployeeWper;