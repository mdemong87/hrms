"use client";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast, ToastContainer } from 'react-toastify';
import Loading from "../../components/common/Loading";
import useStore from "../../store/index";

export default function ResetPass() {



    const setStoreEmail = useStore((state) => state.setemail);
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [isloading, setisloading] = useState(false);
    const [email, setemail] = useState('');
    const [otp, setotp] = useState('');
    const [isoptSend, setisoptSend] = useState(false);



    //hangle resetpass function here
    const handleresetpass = async (e) => {


        //prevent default dehaviour
        e.preventDefault();

        setisloading(true);

        //console the user input data
        const userdata = {
            email
        }

        try {
            setisloading(true);
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/forgotpassword`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json", // Specify JSON request
                },
                body: JSON.stringify(userdata) // Convert JS object to JSON string
            });

            // Handle response
            if (response.ok) {
                setisloading(false);
                setisoptSend(true);
                const data = await response.json();
                toast.success("OPT Send successful");
                console.log("OPT successful:", data);
                // You can redirect the user or show a success message here
            } else {
                setisloading(false);
                const errorData = await response.json();
                toast.error(errorData.error);
            }

        } catch (error) {
            setisloading(false);
            console.log("Error during OTP:", error);
        }


    }



    //hangle verifyopt function here
    const handleverifyopt = async (e) => {


        //prevent default dehaviour
        e.preventDefault();

        setisloading(true);

        //console the user input data
        const userdata = {
            email,
            otp
        }

        try {
            setisloading(true);
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/optvalidation`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json", // Specify JSON request
                },
                body: JSON.stringify(userdata) // Convert JS object to JSON string
            });

            // Handle response
            if (response.ok) {
                setisloading(false);
                const data = await response.json();
                toast.success("OPT Verify successful");
                setStoreEmail(email);
                router.push("/signin/resetpass/newpassword");
                console.log("OPT Verify successful:", data);
                // You can redirect the user or show a success message here
            } else {
                setisloading(false);
                const errorData = await response.json();
                toast.error('OTP Verify failed');
                console.error("OTP verify failed:", errorData);
            }

        } catch (error) {
            setisloading(false);
            console.error("Error during OTP Verify:", error);
        }


    }


    return (
        <div className="flex flex-col flex-1 lg:w-1/2 w-full">
            {isloading && <Loading />}
            <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
                <div>
                    <div className="mb-5 sm:mb-8">
                        <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
                            Reset Your Password
                        </h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Enter your email Here! We Will send a OPT in Your Email shortly.
                        </p>
                    </div>
                    <div>

                        <form>
                            <div className="space-y-6">
                                {!isoptSend && <div>
                                    <Label>
                                        Email <span className="text-error-500">*</span>{" "}
                                    </Label>
                                    <Input onChange={(e) => { setemail(e.target.value) }} placeholder="info@gmail.com" type="email" />
                                </div>}
                                {isoptSend && <div>
                                    <Label>
                                        OPT <span className="text-error-500">*</span>{" "}
                                    </Label>
                                    <div className="relative">
                                        <Input onChange={(e) => { setotp(e.target.value) }}
                                            type="number"
                                            placeholder="Enter your OPT Number"
                                        />
                                    </div>
                                </div>}
                                <div>
                                    <Button onClick={(e) => { isoptSend ? handleverifyopt(e) : handleresetpass(e) }} className="w-full" size="sm">
                                        {isoptSend ? "Verify OPT" : "Send OPT"}
                                    </Button>
                                </div>
                            </div>
                        </form>

                        <div className="mt-5">
                            <p className="text-sm font-normal text-center text-gray-700 flex justify-center items-center dark:text-gray-400 sm:text-start">
                                <Link
                                    href="/signin"
                                    className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
                                >
                                    Sign In
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}
