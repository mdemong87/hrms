import Image from "next/image";
import Demoprofile from "../../../public/images/user/demo.jpeg";

const AssignOnShift = () => {
    return (
        <div className="col-span-3">
            <div className="text-gray-700 dark:text-gray-200 border border-gray-700 dark:border-gray-400 p-4  rounded-lg">
                <h2 className="text-2xl">Shift Name: <span className="font-bold">Day</span> </h2>
                <div className="pt-5 flex gap-3 items-center">
                    <Image className="w-[35px] h-[35px] rounded-full" src={Demoprofile} alt="Employee-Profile-Photo" />
                    <span>Md Emon Hossen</span>
                </div>
                <div className="pt-5 flex gap-3 items-center">
                    <Image className="w-[35px] h-[35px] rounded-full" src={Demoprofile} alt="Employee-Profile-Photo" />
                    <span>Md Emon Hossen</span>
                </div>
                <div className="pt-5 flex gap-3 items-center">
                    <Image className="w-[35px] h-[35px] rounded-full" src={Demoprofile} alt="Employee-Profile-Photo" />
                    <span>Md Emon Hossen</span>
                </div>
                <div className="pt-5 flex gap-3 items-center">
                    <Image className="w-[35px] h-[35px] rounded-full" src={Demoprofile} alt="Employee-Profile-Photo" />
                    <span>Md Emon Hossen</span>
                </div>
                <div className="pt-5 flex gap-3 items-center">
                    <Image className="w-[35px] h-[35px] rounded-full" src={Demoprofile} alt="Employee-Profile-Photo" />
                    <span>Md Emon Hossen</span>
                </div>
            </div>
        </div>
    )
}

export default AssignOnShift;