'use client'

import Image from "next/image";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import logo from "../../../../public/images/logo/logo.png";

const ObjecttionPage = () => {

    const [title, settitle] = useState('');
    const [messages, setmessages] = useState('');
    const [isloading, setisloading] = useState(false);


    /*************** Handle Submiteing Function Here ***************/
    const handleSubmite = async () => {
        if (!title || !messages) {
            toast.warn("Please enter all required fields.");
            return;
        }


        try {

            setisloading(true);
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/objections`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        subject: title,
                        objection: messages
                    })
                }
            );

            if (response.ok) {
                setisloading(false);
                settitle('');
                setmessages('');
                const res = await response.json();
                toast.success("Objection Submited Successfully");
                console.log(res);
            }

        } catch (error) {
            setisloading(false);
            toast.error("There was a Server Side Problem");
        }

    }




    return (
        <div className="flex py-20 justify-center w-screen h-fit min-h-[800px]">
            <div className="bg-white shadow-md rounded-lg min-w-[650px] w-fit">
                <div className="bg-blue-600 text-white rounded-t-lg px-5 py-3">
                    <Image src={logo} alt="logo" height={1000} width={1000} />
                </div>
                <div className="px-6 py-4">
                    <h2 className="text-4xl text-gray-600 text-center w-full font-semibold py-3 underline">Objection Box</h2>

                    <div className="mt-8">
                        <input value={title} onChange={(e) => { settitle(e.target.value) }} required placeholder="Objection Title" className="border border-gray-200 w-full rounded-md p-2 focus:outline-blue-200" type="text" />
                        <textarea value={messages} onChange={(e) => { setmessages(e.target.value) }} required placeholder="Objection Messages" className="border border-gray-200 w-full rounded-md p-2 mt-8 h-[270px] focus:outline-blue-200"></textarea>
                        <div className="mt-4 flex items-center justify-center lg:justify-end">
                            <button disabled={isloading} onClick={() => { handleSubmite() }} className="text-white bg-blue-600 px-3 py-1 text-lg rounded-md flex items-center gap-2 border-none outline-none">
                                {isloading && <div className="w-[18px] h-[18px] rounded-full border-t-2 border-r-2 border-gray-50 animate-spin"></div>}
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer position="bottom-right" />
        </div >
    )
}

export default ObjecttionPage;