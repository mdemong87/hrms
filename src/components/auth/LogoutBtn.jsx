import { useRouter } from 'next/navigation';
import { IoIosLogOut } from "react-icons/io";
import { toast } from 'react-toastify';
import getCookie from "../../helper/cookie/gettooken";
import SetCookie from "../../helper/cookie/setcookie";

function Logout() {


    //get the router
    const router = useRouter();



    /****************** logout function  ********************/
    async function handlesignout(e) {
        e.preventDefault();

        try {

            // get the token from cookie
            const token = getCookie();



            /************* send the token in the server and signout *************/
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/logout`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json", // Specify JSON request
                    "Authorization": `Bearer ${token}`, // <-- send token here
                },

            });

            // Handle response
            if (response.ok) {
                const data = await response.json();
                SetCookie("token", "", "");
                SetCookie("role", "");
                toast.success("SignOut successful");
                router.push('/signin');
                // You can redirect the user or show a success message here
            } else {
                const errorData = await response.json();
                toast.error('SignOutt failed');
                console.error("SignOut failed:", errorData.message);
            }

        } catch (error) {
            console.error("Error during signOut:", error);
        }
    }


    return (
        <div
            className={`
        mx-auto mb-10 w-full max-w-60 rounded-2xl bg-gray-50 px-4 py-5 text-center dark:bg-white/[0.03]`}
        >
            <button onClick={(e) => { handlesignout(e) }}
                href="/"
                target="_blank"
                rel="nofollow"
                className="w-full flex items-center justify-center p-3 font-medium text-white rounded-lg bg-brand-500 text-theme-sm hover:bg-brand-600 flex items-center gap-2"
            >
                <IoIosLogOut className='text-lg rotate-180' />
                Sign Out
            </button>
        </div>
    )
}

export default Logout;