"use client";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import { EyeCloseIcon, EyeIcon } from "@/icons";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast, ToastContainer } from 'react-toastify';
import Loading from "../../../../../../components/common/Loading";
import isPasswordValid from "../../../../../../helper/passlength";
import useStore from "../../../../../../store/index";

export default function NewPassword() {

    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [isloading, setisloading] = useState(false);
    const [email, setemail] = useState('');
    const [cpass, setcpass] = useState('');
    const [pass, setpass] = useState('');
    const storeEmail = useStore((state) => state.email);


    //hangle verifyopt function here
    const handleupdatepassword = async (e) => {


        //prevent default dehaviour
        e.preventDefault();

        if (pass === cpass) {

            if (isPasswordValid(cpass)) {
                setisloading(true);

                //console the user input data
                const userdata = {
                    email: storeEmail,
                    password: cpass
                }

                try {
                    setisloading(true);
                    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/resetpassword`, {
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
                        toast.success("Password Updated Successfully");
                        setTimeout(() => {
                            router.push('/signin');
                        }, 1000);

                    } else {
                        setisloading(false);
                        const errorData = await response.json();
                        toast.error('Password Updated failed');
                        console.error("Password Updated failed:", errorData);
                    }

                } catch (error) {
                    setisloading(false);
                    console.error("Error during Password Updated:", error);
                }
            } else {
                toast.warn("Too Small password.");
            }

        } else {
            toast.warn("Password and Confirm Password Does not Match");
        }


    }


    return (
        <div className="flex flex-col flex-1 lg:w-1/2 w-full">
            {isloading && <Loading />}
            <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
                <div>
                    <div className="mb-5 sm:mb-8">
                        <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
                            Update Your Password
                        </h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Update Your New Password Here
                        </p>
                    </div>
                    <div>

                        <form>
                            <div className="space-y-6">
                                <div>
                                    <Label>
                                        New Password <span className="text-error-500">*</span>{" "}
                                    </Label>
                                    <div className="relative">
                                        <Input onChange={(e) => { setpass(e.target.value) }}
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Enter your password"
                                        />
                                        <span
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                                        >
                                            {showPassword ? (
                                                <EyeIcon className="fill-gray-500 dark:fill-gray-400" />
                                            ) : (
                                                <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400" />
                                            )}
                                        </span>
                                    </div>
                                </div>
                                <div>
                                    <Label>
                                        Confirm Password <span className="text-error-500">*</span>{" "}
                                    </Label>
                                    <div className="relative">
                                        <Input onChange={(e) => { setcpass(e.target.value) }}
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Enter your password"
                                        />
                                        <span
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                                        >
                                            {showPassword ? (
                                                <EyeIcon className="fill-gray-500 dark:fill-gray-400" />
                                            ) : (
                                                <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400" />
                                            )}
                                        </span>
                                    </div>
                                </div>
                                <div>
                                    <Button onClick={(e) => { handleupdatepassword(e) }} className="w-full" size="sm">
                                        Update Password
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}
