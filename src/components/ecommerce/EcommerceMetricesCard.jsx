"use client";
import { ArrowDownIcon, ArrowUpIcon, BoxIconLine, GroupIcon } from "@/icons";
import {
    ListIcon,
    PageIcon,
    TableIcon
} from "@/icons/index";
import { TbCurrentLocation } from "react-icons/tb";
import Badge from "../ui/badge/Badge";


const EcommerceMetricesCard = ({ title, value, rate, status, head }) => {
    return (
        /* <!-- Metric Item Start --> */
        < div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-2" >
            <div className="flex justify-between items-center">
                <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
                    {/* <BoxIconLine className="text-gray-800 dark:text-white/90" /> */}
                    {
                        head == 1 ? <BoxIconLine className="text-gray-800 dark:text-white/90" /> : head == 2 ? <GroupIcon className="text-gray-800 dark:text-white/90" /> : head == 3 ? <TbCurrentLocation className="text-gray-800 dark:text-white/90 text-2xl" /> : head == 4 ? <ListIcon className="text-gray-800 dark:text-white/90" /> : head == 5 ? <PageIcon className="text-gray-800 dark:text-white/90" /> : <TableIcon className="text-gray-800 dark:text-white/90" />
                    }
                </div>
                <Badge color={status === "up" ? "success" : "error"}>
                    {
                        status === "up" ? <ArrowUpIcon /> : <ArrowDownIcon />
                    }
                    {rate}
                </Badge>
            </div>

            <div className="flex items-end justify-between mt-5">
                <div>
                    <span className="text-md text-gray-500 dark:text-gray-500">
                        {title}
                    </span>
                    <h4 className="mt-2 font-bold text-gray-800 text-2xl dark:text-white/90">
                        {value}
                    </h4>
                </div>
            </div>
        </div >
        /* <!-- Metric Item End --> */
    )
}


export default EcommerceMetricesCard;