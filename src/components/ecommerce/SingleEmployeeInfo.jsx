'use client'

import BackBtn from "@/components/common/BackBtn";
import getRole from "@/helper/cookie/getrole";
import getCookie from "@/helper/cookie/gettooken";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { FaEdit, FaSave } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { toast, ToastContainer } from 'react-toastify';
import demoprofile from "../../../public/images/user/demo.jpeg";
import handleFileChange from "../../helper/handlefilechange";
import Loading from "../common/Loading";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import Select from "../form/Select";


const SingleEmployeeInfo = ({ id }) => {


    const token = getCookie();
    const accessrole = getRole();
    const router = useRouter();
    const [isdisable, setisdisable] = useState(true);
    const [Departments, setDepartments] = useState([]);
    const [SingleEmployee, setSingleEmployee] = useState([]);
    const [isloading, setisloading] = useState(false);
    const [imagepreview, setimagepreview] = useState('');
    const [imageFile, setimageFile] = useState(null);
    const [formdata, setformdata] = useState({
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
        department_id: '',
        designation: '',
        emplyeetype: '',
        joindate: '',
        probitionprioed: '',
        reportingmanager: '',
        workshift: '',
        nationalid: '',
        role: '',
        password: '',
        level: '',
    });


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

            if (response.ok) {
                const res = await response.json();
                setSingleEmployee(res?.employee);
                setformdata((prev) => ({
                    ...prev,
                    eid: res?.employee?.eid || '',
                    fname: res?.employee?.fname || '',
                    lname: res?.employee?.lname || '',
                    dob: res?.employee?.dob || '',
                    gender: res?.employee?.gender || '',
                    meritalstatus: res?.employee?.meritalstatus || '',
                    email: res?.employee?.email || '',
                    phone: res?.employee?.phone || '',
                    emergencycontactname: res?.employee?.emergencycontactname || '',
                    emergencycontactphone: res?.employee?.emergencycontactphone || '',
                    address: res?.employee?.address || '',
                    department_id: res?.employee?.department_id || '',
                    designation: res?.employee?.designation || '',
                    emplyeetype: res?.employee?.emplyeetype || '',
                    joindate: res?.employee?.joindate || '',
                    probitionprioed: res?.employee?.probitionprioed || '',
                    reportingmanager: res?.employee?.reportingmanager || '',
                    workshift: res?.employee?.workshift || '',
                    nationalid: res?.employee?.nationalid || '',
                    role: res?.employee?.user?.role || '',
                    password: res?.employee?.password || '',
                    level: res?.employee?.level || '',

                }));
                setimagepreview(res?.employee?.avatar);

            } else {
                console.error("Failed to fetch departments");
            }
        } catch (error) {
            console.error("Error fetching departments:", error);
        }
    }, [token]);


    // Fetch all departments here
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
        getSingleEmployee(id);
    }, [getDepartments, getSingleEmployee, id]);



    //hanlde employee delete function here
    async function handledelect(e, id) {
        e.preventDefault();
        const isdeletetrue = confirm("Are you Sure to Delete This Employee");
        if (!isdeletetrue) return;


        try {
            setisloading(true);

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/employees/${id}`,
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
                const data = await response.json();
                toast.success("Employee Delete successful");
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
                toast.error('Employee Delete failed');
                console.error("Employee Delete failed:", errorData);
            }

        } catch (error) {
            setisloading(false);
            console.error(error);
        }






    }






    async function handlesave(e, id) {
        e.preventDefault();

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


            // Laravel doesn’t like PUT with FormData, so fake it:
            fd.append("_method", "PUT");

            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/employees/${id}`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                body: fd
            });

            if (response.ok) {
                setisloading(false);
                const data = await response.json();
                toast.success("Employee Edit successful");
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
                toast.error('Employee Edit failed');
                console.error("Employee Edit failed:", errorData);
            }

        } catch (error) {
            setisloading(false);
            console.error(error);
        }
    }










    return (
        <div>
            <div>
                <div className="no-scrollbar relative w-full w-full rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
                    {isloading && <Loading />}
                    <div className="flex gap-20 w-full items-end justify-between">
                        <div className="flex flex-col gap-1 items-center justify-center">
                            <div className="text-gray-200 w-[155px] h-[182px] border border-gray-500 bg-gray-200 dark:bg-gray-800 rounded-lg overflow-hidden">
                                <Image src={imagepreview ? imagepreview : demoprofile} alt="profile-image" width={1000} height={1000} className="rounded-lg w-full h-full object-cover" />
                            </div>
                            <div className="col-span-2 lg:col-span-1 w-[200px] pt-4">
                                <Input disabled={isdisable} type="file" accept=".jpg,.jpeg,.png" onChange={(e) => { handleFileChange(e, setimageFile, setimagepreview) }} />
                            </div>
                        </div>
                        <div className="">
                            <div className="flex items-center gap-4">
                                <BackBtn />
                                {
                                    isdisable && <button onClick={(e) => { setisdisable(false) }} className="bg-green-700 font-medium flex items-center gap-1 px-4 py-2 rounded-md text-white cursor-pointer font-medium">
                                        <FaEdit className="text-md" />
                                        <span className="text-sm">Edit</span>
                                    </button>
                                }
                                <button onClick={(e) => { handledelect(e, id) }} className="bg-red-700 font-medium flex items-center gap-1 p-2 rounded-md text-white cursor-pointer font-medium">
                                    <RiDeleteBin5Fill className="text-md" />
                                    <span className="text-sm">Delete</span>
                                </button>
                                {

                                    !isdisable && (
                                        <>
                                            <button onClick={(e) => { setisdisable(true) }} className="bg-yellow-700 font-medium flex items-center gap-1 px-4 py-2 rounded-md text-white cursor-pointer font-medium">
                                                <MdCancel className="text-md" />
                                                <span className="text-sm">Cencel</span>
                                            </button>
                                            <button onClick={(e) => handlesave(e, id)} className="bg-blue-700 w-full justify-center font-medium flex items-center gap-1 px-3 py-2 rounded-md text-white cursor-pointer font-medium">
                                                <FaSave className="text-md" />
                                                <span className="text-sm">Save</span>
                                            </button>
                                        </>
                                    )
                                }
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
                                        <Input disabled value={formdata?.eid} type="text" onChange={(e) =>
                                            setformdata((prev) => ({
                                                ...prev,
                                                eid: e.target.value
                                            }))
                                        } />
                                    </div>

                                    <div className="col-span-2 lg:col-span-1">
                                        <Label>First Name</Label>
                                        <Input disabled={isdisable} value={formdata?.fname} type="text" onChange={(e) =>
                                            setformdata((prev) => ({
                                                ...prev,
                                                fname: e.target.value
                                            }))
                                        } />
                                    </div>

                                    <div className="col-span-2 lg:col-span-1">
                                        <Label>Last Name</Label>
                                        <Input disabled={isdisable} value={formdata?.lname} type="text" onChange={(e) =>
                                            setformdata((prev) => ({
                                                ...prev,
                                                lname: e.target.value
                                            }))
                                        } />
                                    </div>

                                    <div className="col-span-2 lg:col-span-1">
                                        <Label>Date of Birth</Label>
                                        <Input disabled={isdisable} value={formdata?.dob} type="date" onChange={(e) =>
                                            setformdata((prev) => ({
                                                ...prev,
                                                dob: e.target.value
                                            }))
                                        } />
                                    </div>

                                    <div className="col-span-2 lg:col-span-1">
                                        <Label>Gender</Label>
                                        <Select disabled={isdisable} selectedValue={formdata?.gender} options={["Select Gender", "Male", "Female"]} onChange={(e) =>
                                            setformdata((prev) => ({
                                                ...prev,
                                                gender: e.target.value
                                            }))} />
                                    </div>

                                    <div className="col-span-2 lg:col-span-1">
                                        <Label>Marital Status</Label>
                                        <Select disabled={isdisable} selectedValue={formdata?.meritalstatus} options={["Select Marital Status", "Married", "Unmarried", "Engaged"]} onChange={(e) =>
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
                                        <Label>Email Address</Label>
                                        <Input value={formdata?.email} disabled={isdisable} type="email" onChange={(e) =>
                                            setformdata((prev) => ({
                                                ...prev,
                                                email: e.target.value
                                            }))
                                        } />
                                    </div>

                                    <div className="col-span-2 lg:col-span-1">
                                        <Label>Phone</Label>
                                        <Input value={formdata?.phone} disabled={isdisable} type="phone" onChange={(e) =>
                                            setformdata((prev) => ({
                                                ...prev,
                                                phone: e.target.value
                                            }))
                                        } />
                                    </div>


                                    <div className="col-span-2 lg:col-span-1">
                                        <Label>Emergency Contact Name</Label>
                                        <Input value={formdata?.emergencycontactname} disabled={isdisable} type="text" onChange={(e) =>
                                            setformdata((prev) => ({
                                                ...prev,
                                                emergencycontactname: e.target.value
                                            }))
                                        } />
                                    </div>

                                    <div className="col-span-2 lg:col-span-1">
                                        <Label>Emergency Contact Phone</Label>
                                        <Input value={formdata?.emergencycontactphone} disabled={isdisable} type="phone" onChange={(e) =>
                                            setformdata((prev) => ({
                                                ...prev,
                                                emergencycontactphone: e.target.value
                                            }))
                                        } />
                                    </div>

                                    <div className="col-span-2 lg:col-span-1">
                                        <Label>Address</Label>
                                        <Input value={formdata?.address} disabled={isdisable} type="text" onChange={(e) =>
                                            setformdata((prev) => ({
                                                ...prev,
                                                address: e.target.value
                                            }))
                                        } />
                                    </div>



                                    <div className="col-span-2 lg:col-span-1">
                                        <Label>National ID</Label>
                                        <Input value={formdata?.nationalid} disabled={isdisable} type="number" onChange={(e) =>
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
                                        <Label>Department</Label>
                                        <select disabled={isdisable} value={formdata?.department_id} onChange={(e) =>
                                            setformdata((prev) => ({
                                                ...prev,
                                                department_id: e.target.value
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
                                        <Label>Designation / Job Title</Label>
                                        <Input disabled={isdisable} value={formdata?.designation} type="text" onChange={(e) =>
                                            setformdata((prev) => ({
                                                ...prev,
                                                designation: e.target.value
                                            }))
                                        } />
                                    </div>

                                    <div className="col-span-2 lg:col-span-1">
                                        <Label>Employment Type</Label>
                                        <Select disabled={isdisable} selectedValue={formdata?.emplyeetype} options={["Select Employment Type", "Full Time", "Remote", "Hybride"]} onChange={(e) =>
                                            setformdata((prev) => ({
                                                ...prev,
                                                emplyeetype: e.target.value
                                            }))} />

                                    </div>

                                    <div className="col-span-2 lg:col-span-1">
                                        <Label>Joining Date</Label>
                                        <Input disabled={isdisable} value={formdata?.joindate} type="date" onChange={(e) =>
                                            setformdata((prev) => ({
                                                ...prev,
                                                joindate: e.target.value
                                            }))
                                        } />
                                    </div>
                                    <div className="col-span-2 lg:col-span-1">
                                        <Label>Probation Period</Label>
                                        <Select disabled={isdisable} selectedValue={formdata?.probitionprioed} options={["Select Probation Period", "0 Day", "15 Days", "1 Month", "2 Months", "3 Manths"]} onChange={(e) =>
                                            setformdata((prev) => ({
                                                ...prev,
                                                probitionprioed: e.target.value
                                            }))} />
                                    </div>


                                    <div className="col-span-2 lg:col-span-1">
                                        <Label>Reporting Manager</Label>
                                        <Input disabled={isdisable} value={formdata?.reportingmanager} type="text" onChange={(e) =>
                                            setformdata((prev) => ({
                                                ...prev,
                                                reportingmanager: e.target.value
                                            }))
                                        } />
                                    </div>

                                    <div className="col-span-2 lg:col-span-1">
                                        <Label>Work Shift</Label>
                                        <Select disabled={isdisable} selectedValue={formdata?.workshift} value={formdata?.workshift} options={["Select Working Shift", "Day", "Night", "Roster"]} onChange={(e) =>
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
                                        <Label>Role / Access Level</Label>
                                        <Select disabled={isdisable} selectedValue={formdata?.role} options={["Select Role", "Admin", "Hr", "Employee", "Project Manager"]} onChange={(e) =>
                                            setformdata((prev) => ({
                                                ...prev,
                                                role: e.target.value
                                            }))} />
                                    </div>

                                    <div className="col-span-2 lg:col-span-1">
                                        <Label>Level / Grade</Label>
                                        <Select disabled={isdisable} selectedValue={formdata?.level} options={[
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
                                        <Label>Password / Temporary Password</Label>
                                        <Input disabled={isdisable} value={formdata?.password} type="text" onChange={(e) =>
                                            setformdata((prev) => ({
                                                ...prev,
                                                password: e.target.value
                                            }))
                                        } />
                                    </div>


                                </div>
                            </div>


                        </div>
                    </form>
                </div>
                <ToastContainer position="bottom-right" />
            </div>
        </div>
    )
}

export default SingleEmployeeInfo;