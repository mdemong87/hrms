'use client'

import getCookie from "@/helper/cookie/gettooken";
import salesummary from "@/helper/pdfGenerator/SalesSummaryGenerator";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

const ObjectionPage = () => {



    const token = getCookie();
    const [IsLoading, setIsLoading] = useState(false);
    const [objection, setobjection] = useState([]);



    /**************** Get All objection Here ****************/
    const getObjections = useCallback(async () => {

        setIsLoading(true);

        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/objections`,
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
        getObjections();
    }, [getObjections]);




    function checkfunction() {

        // Table genaratable pdf record table Title Assign here
        const headers = [["Date", "Status", "CheckIn",]];
        salesummary(headers, ['1/1/1', "pensding", "3.6"]);
    }




    return (
        <div className="bg-white dark:bg-gray-800 rounded-md px-2 py-3 border border-gray-100 dark:border-gray-700 text-gray-800 dark:text-white">
            <div className="w-full flex flex-col gap-2 px-3 py-2">

                {
                    objection?.objections?.map((item, index) => {
                        return (
                            <Link key={index} className="text-gray-700 flex items-center-gap-2" href={`/admin/objection/${item?.id}`}>
                                <span>{index + 1}. </span>
                                <span className="underline">{item?.subject}</span>
                            </Link>
                        )
                    })
                }

            </div>
        </div>
    )
}

export default ObjectionPage;
