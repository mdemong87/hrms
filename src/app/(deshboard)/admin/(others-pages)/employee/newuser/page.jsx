'use client'

import FilterSearch from "@/components/common/FilterSearch";
import Loading from "@/components/common/Loading";
import NoDataFound from "@/components/common/NoDataFound";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import getRole from "@/helper/cookie/getrole";
import getCookie from "@/helper/cookie/gettooken";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { toast } from "react-toastify";

const NewUser = () => {

    const token = getCookie();
    const accessRole = getRole()
    const [idorname, setidorname] = useState('');
    const [allemployees, setallemployees] = useState([]);
    const [isloading, setisloading] = useState(false);



    /******************** Get all Employee Here *********************/
    const getnewUser = useCallback(async () => {
        try {
            setisloading(true);
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/newusers`,
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
                setallemployees(res);
                setisloading(false);
            } else {
                console.error("Failed to fetch All Employees");
                setisloading(false);
            }
        } catch (error) {
            console.error("Error fetching All Employees:", error);
            setisloading(false);
        }
    }, [token]);



    /****************** Run once on component mount *******************/
    useEffect(() => {
        getnewUser();
    }, [getnewUser]);




    /********************* Single Employee Search by name **********************/
    const filter = allemployees?.filter(emp => emp?.name?.toUpperCase().includes(idorname?.toUpperCase()));




    /************ New User userModify via condition of value ***********/
    const userModify = async (id, value) => {
        try {
            setisloading(true);
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/newusers/active`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        id: id,
                        isActive: value
                    })
                }
            );

            if (response.ok) {
                const res = await response.json();
                toast.success("User Approved Success");
                getnewUser();
                setisloading(false);
            } else {
                toast.error("User Approved Failed");
                console.error("Failed to fetch All Employees");
                setisloading(false);
            }
        } catch (error) {
            toast.error("User Approved Failed");
            console.error("Error fetching All Employees:", error);
            setisloading(false);
        }
    }



    console.log(allemployees);



    return (
        <div>
            {isloading && <Loading />}
            <div>
                <PageBreadcrumb pageTitle={"New User"}>
                    <div className="flex gap-3 items-center">
                        <Link className="flex items-center bg-blue-700 px-3 rounded-lg py-2 gap-1" href={`${accessRole === 'Admin' ? "/admin/employee/add" : accessRole === 'Hr' ? "/hr/employee/add" : '/signin'}`} size="sm">
                            <span>
                                Add
                            </span>
                            <IoMdAdd className="text-xl" />
                        </Link>
                        <FilterSearch seter={setidorname} />
                    </div>
                </PageBreadcrumb>

                {allemployees?.length === 0 ? (
                    <NoDataFound />
                ) : (
                    <div className="relative overflow-x-auto rounded-md shadow-md">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-600">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                                <tr className="text-center">
                                    <th scope="col" className="p-4 border-r-1 border-gray-200 dark:border-gray-600">
                                        SL
                                    </th>
                                    <th scope="col" className="px-2 py-3 border-r-1 border-gray-200 dark:border-gray-600">
                                        Name
                                    </th>
                                    <th scope="col" className="px-2 py-3 border-r-1 border-gray-200 dark:border-gray-600">
                                        Email Address
                                    </th>
                                    <th scope="col" className="px-2 py-3 border-r-1 border-gray-200 dark:border-gray-600">
                                        Status
                                    </th>

                                    <th scope="col" className="px-2 py-3">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>



                                {
                                    filter?.map((item, index) => {
                                        return (
                                            <tr key={index} className="bg-white text-center dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900 border-r-1 border-gray-200 dark:border-gray-600">
                                                <td className="w-4 p-4 border-1 border-gray-200 dark:border-gray-600">
                                                    {index + 1}
                                                </td>
                                                <td className="px-2 py-4 text-gray-700 whitespace-nowrap dark:text-gray-300 border-1 border-gray-200 dark:border-gray-600">
                                                    <div className="ps-3 pl-0">
                                                        <div className="text-base font-semibold">{item?.name}</div>
                                                    </div>
                                                </td>
                                                <td className="px-2 py-4 border-1 border-gray-200 dark:border-gray-600">
                                                    {item?.email}
                                                </td>
                                                <td className="w-4 p-4 border-1 border-gray-200 dark:border-gray-600">
                                                    <span className="bg-red-100 rounded-md w-fit h-fit p-1">
                                                        Pending
                                                    </span>
                                                </td>

                                                <td className="px-2 py-4 border-1 border-gray-200 dark:border-gray-600 flex justify-center">
                                                    <div className="flex items-center gap-2">
                                                        <div onClick={() => { confirm("Are you sure you want to Approved this user?") && userModify(item?.id, 1) }} className="w-fit h-fit rounded-lg bg-green-300 p-1 flex items-center justify-center cursor-pointer dark:bg-green-400 dark:text-white">
                                                            Approved
                                                        </div>
                                                        <div onClick={() => { confirm("Are you sure you want to Disapprove this user?") && userModify(item?.id, 0) }} className="w-fit h-fit rounded-lg bg-red-300 p-1 flex items-center justify-center cursor-pointer dark:bg-red-400 dark:text-white">
                                                            Disapproved
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }

                            </tbody>
                        </table>
                    </div>
                )}


            </div>
        </div>
    )
}

export default NewUser;