'use client';

import Loading from "@/components/common/Loading";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import Input from "@/components/form/input/InputField";
import TextArea from "@/components/form/input/TextArea";
import getCookie from "@/helper/cookie/gettooken";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";

import { toast, ToastContainer } from "react-toastify";
import DepartmentCard from "../../../../../components/ecommerce/DepartmentCard";
import Label from "../../../../../components/form/Label";
import Button from "../../../../../components/ui/button/Button";

const Department = () => {
    const [name, setName] = useState("");
    const [des, setDes] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [departments, setDepartments] = useState([]);

    const router = useRouter();
    const token = getCookie();

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

    //handle add function here
    const handleAddDepartment = async () => {
        if (name == '') {
            toast.warn("Department name is required");
            return;
        }

        setIsLoading(true);

        const dData = { name, description: des };

        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/departments`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(dData),
                }
            );

            if (response.ok) {
                toast.success("Department added successfully");
                setName("");
                setDes("");

                // Refresh department list instantly
                await getDepartments();
            } else {
                toast.error("Failed to add department");
            }
        } catch (error) {
            console.error("Error adding department:", error);
            toast.error("Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    //handle delete function here
    async function hanldedelete(e, id) {
        e.preventDefault();
        setIsLoading(true);

        window.confirm("Are you Sure to Delete This Department?");

        try {


            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/departments/${id}`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setIsLoading(false);

            if (response.ok) {
                const res = await response.json();
                toast.success("Department Delete Successfull");
                getDepartments();
            } else {
                toast.error("There was an Error is Server side while Deleteing Department");
            }

        } catch (error) {
            setIsLoading(false);
            toast.error("There was an Error is Server side");
        }

    }



    return (
        <div>
            {isLoading && <Loading />}
            <PageBreadcrumb pageTitle={"Departments"} />

            {/* Add Department Form */}
            <div>
                <div>
                    <Label>
                        Name <span className="text-error-500">*</span>
                    </Label>
                    <Input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter Department Name"
                        type="text"
                        value={name}
                    />
                </div>

                <div className="mt-4">
                    <Label>Descriptions</Label>
                    <TextArea value={des} seter={(e) => setDes(e.target.value)} />
                </div>

                <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
                    <Button onClick={handleAddDepartment} size="sm">
                        Add Department
                        <IoMdAdd className="text-xl" />
                    </Button>
                </div>
            </div>

            {/* Departments List */}
            <div className="mt-5 border border-gray-300 dark:border-gray-700 rounded-lg">
                <h3 className="text-gray-700 dark:text-gray-300 text-xl my-1 mx-2">
                    All Departments Here:
                </h3>
                <div className="text-gray-700 dark:text-gray-300 my-1 mx-2">
                    <div className="grid grid-cols-3 gap-4 m-2 py-2">
                        {departments.length > 0 ? (
                            departments.map((item, index) => (
                                <DepartmentCard
                                    key={index}
                                    name={item?.name}
                                    description={item?.description}
                                    id={item?.id}
                                    onDelete={hanldedelete}
                                />
                            ))
                        ) : (
                            <p className="col-span-2 text-center text-gray-500">
                                No departments found.
                            </p>
                        )}
                    </div>
                </div>
            </div>
            <ToastContainer position="bottom-right" />
        </div>
    );
};

export default Department;
