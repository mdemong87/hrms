'use client'

import GridShape from "@/components/common/GridShape";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import logo from "../../public/images/logo/logo.png";

const Homepage = () => {

    const router = useRouter();


    useEffect(() => {
        setTimeout(() => {
            router.push('/signin');
        }, 550);
    }, [])


    return (
        <main className="">
            <div className="w-screen h-screen bg-brand-950 dark:bg-white/5 lg:grid items-center hidden">
                <div className="relative items-center justify-center  flex z-1">
                    {/* <!-- ===== Common Grid Shape Start ===== --> */}
                    <GridShape />
                    <div className="flex flex-col items-center max-w-xs">
                        <Link href="/" className="block mb-4">
                            <Image
                                className="w-[500px] h-auto"
                                width={1000}
                                height={1000}
                                src={logo}
                                alt="Logo"
                            />
                        </Link>
                        <h2 className="text-5xl text-center pt-5 w-screen text-gray-400 dark:text-white/60 welcomeAnimation">
                            Welcome To Sardar IT HRMS System.
                        </h2>
                    </div>
                </div>
            </div>
        </main>
    )
}


export default Homepage;