'use client'

import getRole from "@/helper/cookie/getrole";
import getCookie from "@/helper/cookie/gettooken";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { toast, ToastContainer } from 'react-toastify';
import demoprofile from "../../../public/images/user/demo.jpeg";
import handleFileChange from "../../helper/handlefilechange";
import Loading from "../common/Loading";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import Select from "../form/Select";
import Button from "../ui/button/Button";


const AddAmployeeWper = () => {


    const token = getCookie();
    const accessrole = getRole();
    const router = useRouter();
    const [Departments, setDepartments] = useState([]);
    const [isloading, setisloading] = useState(false);
    const [imagepreview, setimagepreview] = useState('');
    const [imageFile, setimageFile] = useState(null);
    const [formdata, setformdata] = useState({
        fname: '',
        lname: '',
        dob: 0,
        gender: '',
        meritalstatus: '',
        email: '',
        phone: '',
        emergencycontactname: '',
        emergencycontactphone: '',
        address: '',
        department_id: -1,
        designation: '',
        emplyeetype: '',
        joindate: 0,
        probitionprioed: '',
        reportingmanager: '',
        workshift: '',
        nationalid: '',
        role: '',
        password: '',
        level: '',
    });






    async function handlesave(e) {
        e.preventDefault();

        if (
            formdata.fname.trim() !== '' &&
            formdata.lname.trim() !== '' &&
            formdata.dob !== 0 &&
            formdata.gender.trim() !== '' &&
            formdata.meritalstatus.trim() !== '' &&
            formdata.email.trim() !== '' &&
            formdata.phone.trim() !== '' &&
            formdata.emergencycontactname.trim() !== '' &&
            formdata.emergencycontactphone.trim() !== '' &&
            formdata.address.trim() !== '' &&
            formdata.department_id > -1 &&
            formdata.designation.trim() !== '' &&
            formdata.emplyeetype.trim() !== '' &&
            formdata.joindate !== 0 &&
            formdata.probitionprioed.trim() !== '' &&
            formdata.reportingmanager.trim() !== '' &&
            formdata.workshift.trim() !== '' &&
            formdata.nationalid.trim() !== '' &&
            formdata.role.trim() !== '' &&
            formdata.password.trim() !== '' &&
            formdata.level.trim() !== ''
        ) {
            try {
                setisloading(true);

                // Use FormData instead of JSON.stringify
                const fd = new FormData();

                // Append all formdata values
                Object.keys(formdata).forEach((key) => {
                    fd.append(key, formdata[key]);
                });

                // Append image file if exists
                if (imageFile) {
                    fd.append("image", imageFile);
                }

                const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/employees`, {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    },
                    body: fd,
                });

                if (response.ok) {
                    setisloading(false);
                    const data = await response.json();
                    console.log(response);
                    toast.success("Employee Added successful");
                    setTimeout(() => {
                        switch (accessrole) {
                            case "Admin":
                                router.push('/admin/employee');
                                break;
                            case "Hr":
                                router.push('/hr/employee');
                                break;
                            default:
                                console.error('Unknown role');
                        }
                    }, 200);
                } else {
                    setisloading(false);
                    const errorData = await response.json();
                    toast.error('Employee Added failed');
                    console.error("Employee Added failed:", errorData);
                }
            } catch (error) {
                setisloading(false);
                console.error(error);
            }
        } else {
            toast.warn('Full Up All Required Fileds');
        }
    }





    // Fetch all departments
    const getDepartments = useCallback(async () => {
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/departments`,
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
                setDepartments(res);
            } else {
                console.error("Failed to fetch departments");
            }
        } catch (error) {
            console.error("Error fetching departments:", error);
        }
    }, [token]);

    // Run once on component mount
    useEffect(() => {
        getDepartments();
    }, [getDepartments]);



    // console.log(newobj?.department_id);
    // console.log(typeof newobj?.department_id);

    return (
        <div>
            <div>
                <div className="no-scrollbar relative w-full w-full rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
                    {isloading && <Loading />}
                    <div className="flex gap-20 w-full items-end justify-between">
                        <div className="w-full flex flex-col gap-14">
                            <div className="px-2 pr-14 w-full">
                                <h4 className="mb-2 text-4xl font-semibold text-gray-800 dark:text-white/90">
                                    Add Emplyee
                                </h4>
                                <p className="mb-6 text-lg text-gray-500 dark:text-gray-400 lg:mb-7">
                                    Add Employee section lets you create a new employee profile by entering personal, contact, and job details. The information will be used across attendance, payroll, and leave management modules.
                                </p>
                            </div>
                            <div className="w-full">
                                <Label>Employee ID</Label>
                                <Input disabled type="text" onChange={(e) =>
                                    setformdata((prev) => ({
                                        ...prev,
                                        fname: e.target.value
                                    }))
                                } />
                            </div>
                        </div>
                        <div className="flex flex-col gap-1 items-center justify-center">
                            <div className="text-gray-200 w-[155px] h-[182px] border border-gray-500 bg-gray-200 dark:bg-gray-800 rounded-lg overflow-hidden">
                                <Image src={imagepreview ? imagepreview : demoprofile} alt="profile-image" width={1000} height={1000} className="rounded-lg w-full h-full object-cover" />
                            </div>
                            <div className="col-span-2 lg:col-span-1 w-[200px] pt-4">
                                <Input type="file" accept=".jpg,.jpeg,.png" onChange={(e) => { handleFileChange(e, setimageFile, setimagepreview) }} />
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
                                        <Label>First Name <span className="text-error-500">*</span></Label>
                                        <Input type="text" onChange={(e) =>
                                            setformdata((prev) => ({
                                                ...prev,
                                                fname: e.target.value
                                            }))
                                        } />
                                    </div>

                                    <div className="col-span-2 lg:col-span-1">
                                        <Label>Last Name</Label>
                                        <Input type="text" onChange={(e) =>
                                            setformdata((prev) => ({
                                                ...prev,
                                                lname: e.target.value
                                            }))
                                        } />
                                    </div>

                                    <div className="col-span-2 lg:col-span-1">
                                        <Label>Date of Birth <span className="text-error-500">*</span></Label>
                                        <Input type="date" onChange={(e) =>
                                            setformdata((prev) => ({
                                                ...prev,
                                                dob: e.target.value
                                            }))
                                        } />
                                    </div>

                                    <div className="col-span-2 lg:col-span-1">
                                        <Label>Gender <span className="text-error-500">*</span></Label>
                                        <Select options={["Select Gender", "Male", "Female"]} onChange={(e) =>
                                            setformdata((prev) => ({
                                                ...prev,
                                                gender: e.target.value
                                            }))} />
                                    </div>

                                    <div className="col-span-2 lg:col-span-1">
                                        <Label>Marital Status</Label>
                                        <Select options={["Select Marital Status", "Married", "Unmarried", "Engaged"]} onChange={(e) =>
                                            setformdata((prev) => ({
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
                                        <Label>Email Address <span className="text-error-500">*</span></Label>
                                        <Input type="email" onChange={(e) =>
                                            setformdata((prev) => ({
                                                ...prev,
                                                email: e.target.value
                                            }))
                                        } />
                                    </div>

                                    <div className="col-span-2 lg:col-span-1">
                                        <Label>Phone <span className="text-error-500">*</span></Label>
                                        <Input type="phone" onChange={(e) =>
                                            setformdata((prev) => ({
                                                ...prev,
                                                phone: e.target.value
                                            }))
                                        } />
                                    </div>


                                    <div className="col-span-2 lg:col-span-1">
                                        <Label>Emergency Contact Name <span className="text-error-500">*</span></Label>
                                        <Input type="text" onChange={(e) =>
                                            setformdata((prev) => ({
                                                ...prev,
                                                emergencycontactname: e.target.value
                                            }))
                                        } />
                                    </div>

                                    <div className="col-span-2 lg:col-span-1">
                                        <Label>Emergency Contact Phone <span className="text-error-500">*</span></Label>
                                        <Input type="phone" onChange={(e) =>
                                            setformdata((prev) => ({
                                                ...prev,
                                                emergencycontactphone: e.target.value
                                            }))
                                        } />
                                    </div>

                                    <div className="col-span-2 lg:col-span-1">
                                        <Label>Address <span className="text-error-500">*</span></Label>
                                        <Input type="text" onChange={(e) =>
                                            setformdata((prev) => ({
                                                ...prev,
                                                address: e.target.value
                                            }))
                                        } />
                                    </div>



                                    <div className="col-span-2 lg:col-span-1">
                                        <Label>National ID <span className="text-error-500">*</span></Label>
                                        <Input type="number" onChange={(e) =>
                                            setformdata((prev) => ({
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
                                        <Label>Department <span className="text-error-500">*</span></Label>
                                        <select onChange={(e) =>
                                            setformdata((prev) => ({
                                                ...prev,
                                                department_id: Number(e.target.value)
                                            }))} className="h-11 w-full appearance-none rounded-lg border border-gray-300 px-4 py-2.5 pr-11 text-sm shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800">
                                            <option className="text-gray-700 dark:bg-gray-900 dark:text-gray-400" value={''}>Select Department</option>
                                            {
                                                Departments?.map((item, index) => {
                                                    return (
                                                        <option key={index} className="text-gray-700 dark:bg-gray-900 dark:text-gray-400" value={item?.id}>{item?.name}</option>
                                                    )
                                                })
                                            }
                                        </select>

                                    </div>


                                    <div className="col-span-2 lg:col-span-1">
                                        <Label>Designation / Job Title <span className="text-error-500">*</span></Label>
                                        <Input type="text" onChange={(e) =>
                                            setformdata((prev) => ({
                                                ...prev,
                                                designation: e.target.value
                                            }))
                                        } />
                                    </div>

                                    <div className="col-span-2 lg:col-span-1">
                                        <Label>Employment Type <span className="text-error-500">*</span></Label>
                                        <Select options={["Select Employment Type", "Full Time", "Remote", "Hybride"]} onChange={(e) =>
                                            setformdata((prev) => ({
                                                ...prev,
                                                emplyeetype: e.target.value
                                            }))} />

                                    </div>

                                    <div className="col-span-2 lg:col-span-1">
                                        <Label>Joining Date <span className="text-error-500">*</span></Label>
                                        <Input type="date" onChange={(e) =>
                                            setformdata((prev) => ({
                                                ...prev,
                                                joindate: e.target.value
                                            }))
                                        } />
                                    </div>
                                    <div className="col-span-2 lg:col-span-1">
                                        <Label>Probation Period <span className="text-error-500">*</span></Label>
                                        <Select options={["Select Probation Period", "0 Day", "15 Days", "1 Month", "2 Months", "3 Manths"]} onChange={(e) =>
                                            setformdata((prev) => ({
                                                ...prev,
                                                probitionprioed: e.target.value
                                            }))} />
                                    </div>


                                    <div className="col-span-2 lg:col-span-1">
                                        <Label>Reporting Manager <span className="text-error-500">*</span></Label>
                                        <Input type="text" onChange={(e) =>
                                            setformdata((prev) => ({
                                                ...prev,
                                                reportingmanager: e.target.value
                                            }))
                                        } />
                                    </div>

                                    <div className="col-span-2 lg:col-span-1">
                                        <Label>Work Shift <span className="text-error-500">*</span></Label>
                                        <Select options={["Select Working Shift", "Day", "Night", "Roster"]} onChange={(e) =>
                                            setformdata((prev) => ({
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
                                        <Label>Role / Access Level <span className="text-error-500">*</span></Label>
                                        <Select options={["Select Role", "Admin", "Hr", "Employee", "Project Manager"]} onChange={(e) =>
                                            setformdata((prev) => ({
                                                ...prev,
                                                role: e.target.value
                                            }))} />
                                    </div>

                                    <div className="col-span-2 lg:col-span-1">
                                        <Label>Level / Grade <span className="text-error-500">*</span></Label>
                                        <Select options={[
                                            "Select Lavel/grade",
                                            "Unpaid-Intern-G0",
                                            "Paid Intern-G0",
                                            "Entry-Level-G1",
                                            "Mid-Level-G2",
                                            "Senior-Level-G3",
                                            "Manager-G4",
                                            "Director-G5",
                                            "Executive/CXO-G6"
                                        ]} onChange={(e) =>
                                            setformdata((prev) => ({
                                                ...prev,
                                                level: e.target.value
                                            }))} />
                                    </div>

                                    <div className="col-span-2 lg:col-span-1">
                                        <Label>Password / Temporary Password <span className="text-error-500">*</span></Label>
                                        <Input type="text" onChange={(e) =>
                                            setformdata((prev) => ({
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