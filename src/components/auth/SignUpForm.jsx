"use client";
import Checkbox from "@/components/form/input/Checkbox";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import { EyeCloseIcon, EyeIcon } from "@/icons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SiBasicattentiontoken } from "react-icons/si";
import { toast, ToastContainer } from 'react-toastify';
import Loading from "../common/Loading";

export default function SignUpForm() {

  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [fristName, setfristName] = useState('');
  const [lastName, setlastName] = useState('');
  const [email, setemail] = useState('');
  const [pass, setpass] = useState('');
  const [isloading, setisloading] = useState(false);;
  const [isError, setisError] = useState(false);
  const [issignupsuccess, setissignupsuccess] = useState(false);
  const [isverifySuccess, setisverifySuccess] = useState(false);
  const [otp, setotp] = useState('');



  /*************** User Sign Up Function is Here *****************/
  const handleSignUp = async (e) => {
    // Prevent the default form submission behavior
    e.preventDefault();


    if (!fristName || !lastName || !email || !pass) {
      setisError(true);
      return;
    } else if (!isChecked) {
      toast.warn("You must accept the Terms & Conditions before proceeding.");
      return;
    } else {
      // Example user input values (you can modify these as needed)
      const userData = {
        fname: fristName,
        lname: lastName,
        email: email,
        password: pass,
        isAggree: isChecked
      };


      console.log(userData);

      try {
        setisloading(true);
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // Specify JSON request
          },
          body: JSON.stringify(userData) // Convert JS object to JSON string
        });

        // Handle response
        if (response.ok) {
          setisloading(false);
          const data = await response.json();
          toast.success("Signup successful");
          setissignupsuccess(true);
          console.log("Signup successful:", data);
          // You can redirect the user or show a success message here
        } else {
          setisloading(false);
          const errorData = await response.json();
          toast.error('Signup failed');
          console.error("Signup failed:", errorData.message || "Unknown error");
        }

      } catch (error) {
        setisloading(false);
        console.error("Error during signup:", error.message);
      }


    }
  };



  /***************** Email Verification Function is Here *******************/
  async function handleEmailVerification(e) {

    // Prevent the default form submission behavior
    e.preventDefault();

    if (!otp) {
      setisError(true);
      return;
    } else {
      try {
        setisloading(true);
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/emailverification`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // Specify JSON request
          },
          body: JSON.stringify({ email, otp }) // Convert JS object to JSON string
        });

        // Handle response
        if (response.ok) {
          setisloading(false);
          const data = await response.json();
          toast.success("Account Verification successful");
          setisverifySuccess(true);
          console.log("Account Verification:", data);
          // You can redirect the user or show a success message here
        } else {
          setisloading(false);
          const errorData = await response.json();
          toast.error('Account Verification failed');
          console.error("Account Verification failed:", errorData.message || "Unknown error");
        }

      } catch (error) {
        setisloading(false);
        console.error("Error during Account Verification:", error.message);
      }


    }


  }


  return (
    <div className="flex flex-col flex-1 lg:w-1/2 w-full overflow-y-auto no-scrollbar">
      {isloading && <Loading />}
      <div className="w-full max-w-md sm:pt-10 mx-auto mb-5">
      </div>
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        {
          issignupsuccess ? (
            isverifySuccess ? (
              <div>
                <div className="border border-red-300 bg-red-100 dark:border-gray-500 dark:bg-gray-700 rounded-lg px-4 py-3 dark:text-white">
                  <div className="flex items-center justify-center flex-col">
                    <SiBasicattentiontoken className="text-5xl" />
                    <h2 className="font-semibold text-2xl">Attention</h2>
                  </div>
                  <div className="text-center pt-5 text-lg text-gray-700 dark:text-gray-300">
                    <h5>Your Account is Under Review. We Will Notify  you Shortly Via Email</h5>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <div className="mb-5 sm:mb-8">
                  <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
                    Email Verification
                  </h1>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    We Have Send a OTP in Your Email Account. Please Verify Your Account Via that OTP
                  </p>
                </div>
                <div>
                  <form>
                    <div className="space-y-5">
                      <div className="grid grid-cols-1 gap-5">
                        {/* <!-- First Name --> */}
                        <div className="col-span-1">
                          <Label>
                            OPT Code<span className="text-error-500">*</span>
                          </Label>
                          <Input
                            error={isError ? !otp ? true : false : false}
                            onChange={(e) => { setotp(e.target.value) }}
                            type="number"
                            id="otp"
                            name="otp"
                            placeholder="Enter OTP Code"
                          />
                        </div>
                        <div>
                          <button onClick={(e) => { handleEmailVerification(e) }} className="flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white transition rounded-lg bg-brand-500 shadow-theme-xs hover:bg-brand-600">
                            Verify
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>

                  <div className="mt-5">
                    <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
                      Already have an account?
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
            )


          ) : (
            <div>
              <div className="mb-5 sm:mb-8">
                <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
                  Sign Up
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Enter your email and password to sign up!
                </p>
              </div>
              <div>
                <form>
                  <div className="space-y-5">
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      {/* <!-- First Name --> */}
                      <div className="sm:col-span-1">
                        <Label>
                          First Name<span className="text-error-500">*</span>
                        </Label>
                        <Input
                          error={isError ? !fristName ? true : false : false}
                          onChange={(e) => { setfristName(e.target.value) }}
                          type="text"
                          id="fname"
                          name="fname"
                          placeholder="Enter your first name"
                        />
                      </div>
                      {/* <!-- Last Name --> */}
                      <div className="sm:col-span-1">
                        <Label>
                          Last Name<span className="text-error-500">*</span>
                        </Label>
                        <Input
                          error={isError ? !lastName ? true : false : false}
                          onChange={(e) => { setlastName(e.target.value) }}
                          type="text"
                          id="lname"
                          name="lname"
                          placeholder="Enter your last name"
                        />
                      </div>
                    </div>
                    {/* <!-- Email --> */}
                    <div>
                      <Label>
                        Email<span className="text-error-500">*</span>
                      </Label>
                      <Input
                        error={isError ? !email ? true : false : false}
                        onChange={(e) => { setemail(e.target.value) }}
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Enter your email"
                      />
                    </div>
                    {/* <!-- Password --> */}
                    <div>
                      <Label>
                        Password<span className="text-error-500">*</span>
                      </Label>
                      <div className="relative">
                        <Input
                          error={isError ? !pass ? true : false : false}
                          onChange={(e) => { setpass(e.target.value) }}
                          placeholder="Enter your password"
                          type={showPassword ? "text" : "password"}
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
                    {/* <!-- Checkbox --> */}
                    <div className="flex items-center gap-3">
                      <Checkbox
                        className="w-5 h-5"
                        checked={isChecked}
                        onChange={setIsChecked}
                      />
                      <p className="inline-block font-normal text-gray-500 dark:text-gray-400">
                        By creating an account means you agree to the{" "}
                        <span className="text-gray-800 dark:text-white/90">
                          Terms and Conditions,
                        </span>{" "}
                        and our{" "}
                        <span className="text-gray-800 dark:text-white">
                          Privacy Policy
                        </span>
                      </p>
                    </div>
                    {/* <!-- Button --> */}
                    <div>
                      <button onClick={(e) => { handleSignUp(e) }} className="flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white transition rounded-lg bg-brand-500 shadow-theme-xs hover:bg-brand-600">
                        Sign Up
                      </button>
                    </div>
                  </div>
                </form>

                <div className="mt-5">
                  <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
                    Already have an account?
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
          )
        }
      </div>
      <ToastContainer />
    </div>
  );
}
