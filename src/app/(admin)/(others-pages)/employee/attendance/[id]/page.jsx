'use client'

import UserAddressCard from "@/components/user-profile/UserAddressCard";
import UserInfoCard from "@/components/user-profile/UserInfoCard";
import UserMetaCard from "@/components/user-profile/UserMetaCard";
import { useState } from "react";

const singleUserProfile = ({ params }) => {



    //single route unique id
    const id = params?.id;
    console.log(id);

    //local state here
    const [signleemplyee, setsingleemplyee] = useState([]);


    //fetching single emplyee data from the backend server here
    // try {
    //     const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/emplyee/atendance/${id}`);

    //     //check if the respose is ok or not
    //     if (response.ok) {
    //         const res = await response.json();
    //         setsingleemplyee(res);
    //         console.log(singleemplyee);
    //     } else {
    //         console.log("error while fetcing single emplyee data");
    //     }

    // } catch (error) {
    //     console.log(error);
    // }





    return (
        <div>
            <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
                <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
                    Profile
                </h3>
                <div className="space-y-6">
                    <UserMetaCard />
                    <UserInfoCard />
                    <UserAddressCard />
                </div>
            </div>
        </div>
    )
}

export default singleUserProfile;