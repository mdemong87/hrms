import Label from "@/components/form/Label";
import hasImageExtension from "@/helper/hasImageExtension";
import Image from "next/image";
import demoprofile from "../../../public/images/user/demo.jpeg";

const DistributedBalanceInputer = ({ assignedEmployee, totalBudget }) => {

    console.log(assignedEmployee);

    return (
        <div>
            <Label>
                Assigned Employee Distribution Balance
                <span className="ml-1 text-lg font-semibold bg-green-200 border-green-700 px-1 rounded-md">${totalBudget}</span>
            </Label>
            <div className="border border-gray-200 dark:border-gray-600 px-3 py-3 rounded-lg w-full flex flex-wrap items-center gap-2">

                {
                    assignedEmployee?.map((item, index) => {
                        return (
                            <div key={index} className="bg-gray-300 dark:bg-gray-600 rounded-md w-fit px-2 py-2 flex items-center gap-2">
                                <div>
                                    <Image className="w-[32px] h-[32px] rounded-full" width={1000} height={1000} src={hasImageExtension(item?.avatar) ? item?.avatar : demoprofile} alt="Profile-Image" />
                                </div>
                                <h2>{item?.fname + " " + item.lname}</h2>
                                <input onChange={(e) => setdistribution(e.target.value)} value={item?.destribution} type="number" className="p-1  outline-none w-[60px] h-[25px] rounded-sm bg-white border border-2 border-gray-400" />
                            </div>
                        )
                    })
                }

            </div>
        </div>
    )
}

export default DistributedBalanceInputer;