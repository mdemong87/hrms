'use client'

import getCookie from "@/helper/cookie/gettooken";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import profile_Image from "../../../../../../../public/images/user/demo.jpeg";

const Unassignemployee = () => {


    const token = getCookie();
    const [unassign, setunassign] = useState([]);
    const [IsLoading, setIsLoading] = useState(false);


    /**************** Get All Task Unassign Employee Here ****************/
    const getUnassign = useCallback(async () => {
        try {

            setIsLoading(true);

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/project/person/unassigned`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setIsLoading(false);

            if (response.ok) {
                const res = await response.json();
                setunassign(res);
            } else {
                console.error("Failed to fetch Unassign Employee");
            }
        } catch (error) {
            console.error("Error fetching Unassign Employee:", error);
        }
    }, [token]);



    /************** Run once on component mount ************/
    useEffect(() => {
        getUnassign();
    }, [getUnassign]);





    /*********** Log Here ***********/
    console.log(unassign?.unassigned_employees);




    return (
        <div className="bg-white dark:bg-gray-800 p-5 rounded-lg">
            <h2 className="text-xl font-semibold text-gray-600 dark:text-gray-200">Project Unassigned Employee:</h2>

            {
                unassign?.unassigned_employees?.length > 1 ? (

                    <div className="mt-8 grid grid-cols-4 gap-5">
                        {
                            unassign?.unassigned_employees?.map((item, index) => {
                                return (
                                    <div key={index} className="col-span-1 bg-gray-200 dark:bg-gray-700 rounded-md p-3">
                                        <div className="w-full flex items-center justify-center">
                                            <Image className="h-[70px] rounded-full w-[70px]" src={profile_Image} alt="Profile-Image" />
                                        </div>
                                        <div className="text-center">
                                            <h3 className="text-xl pt-2 text-gray-600 dark:text-gray-200">{item?.fname + " " + item?.lname}</h3>
                                            <p className="text-sm text-gray-500 dark:text-gray-300">{item?.designation}</p>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>

                ) : (
                    <div className="flex items-center justify-center w-full mb-10 mt-10">
                        <div className="mt-12 text-center items-center bg-gray-200 rounded-md py-2 px-4 text-gray-500 text-xl">
                            No Task Unassign Employee Found!
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default Unassignemployee;
