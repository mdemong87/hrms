'use client'

import BackBtn from "@/components/common/BackBtn";
import getCookie from "@/helper/cookie/gettooken";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

const SingleObjectionPage = () => {


    const { id } = useParams();




    const token = getCookie();
    const [IsLoading, setIsLoading] = useState(false);
    const [objection, setobjection] = useState([]);



    /**************** Get All objection Here ****************/
    const getObjections = useCallback(async (id) => {

        setIsLoading(true);

        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/objections/${id}`,
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
                setobjection(res);
            } else {
                console.error("Failed to fetch Objections");
            }
        } catch (error) {
            console.error("Error fetching Objecttions:", error);
        }
    }, [token]);



    /************** Run once on component mount ************/
    useEffect(() => {
        getObjections(id);
    }, [getObjections, id]);





    console.log(objection);





    return (
        <div className="bg-white dark:bg-gray-800 rounded-md px-2 py-3 border border-gray-100 dark:border-gray-700 text-gray-800 dark:text-white">
            <BackBtn />
            <div className="w-full flex flex-col gap-2 px-3 py-2 mt-5">
                <h2 className="text-gray-700 text-3xl">{objection?.objection?.subject}</h2>
                <p className="text-gray-500">{objection?.objection?.objection}</p>
            </div>
        </div>
    )
}

export default SingleObjectionPage;
