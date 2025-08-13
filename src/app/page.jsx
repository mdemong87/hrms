import GridShape from "@/components/common/GridShape";
import Image from "next/image";
import Link from "next/link";
import logo from "../../public/images/logo/logo.png";

const Homepage = () => {

    return (
        <main className="">
            <div className="w-screen h-screen bg-brand-950 dark:bg-white/5 lg:grid items-center hidden">
                <div className="relative items-center justify-center  flex z-1">
                    {/* <!-- ===== Common Grid Shape Start ===== --> */}
                    <GridShape />
                    <div className="flex flex-col items-center max-w-xs">
                        <Link href="/" className="block mb-4">
                            <Image
                                width={231}
                                height={48}
                                src={logo}
                                alt="Logo"
                            />
                        </Link>
                        <h2 className="text-3xl text-center text-gray-400 dark:text-white/60">
                            Welcome To Sardar It HTMS System.
                        </h2>

                        <Link className="border w-fit mt-5 border-gray-700 bg-gray-800 rounded-lg py-3 px-5 text-white" href={'/signin'}>Go to Sign In Page</Link>


                    </div>
                </div>
            </div>
        </main>
    )
}


export default Homepage;