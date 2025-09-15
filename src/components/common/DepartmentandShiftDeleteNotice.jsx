import { ImNotification } from "react-icons/im";

const DepartmetnAndShiftDeleteNotice = ({ name }) => {
    return (
        <div className="border border-red-300 dark:border-gray-400 rounded-md p-2 bg-red-100 dark:bg-[#ad8c8c] dark:text-gray-50">
            <p className="flex items-center gap-1">
                <b className="text-lg flex items-center gap-2">
                    <ImNotification className="text-xl" />
                    <span className="text-lg">Important :</span>
                </b>
                <span className="text-md">If you Delete the {name} Then Employee will be deleted at a time who is under that Department!</span>
            </p>
        </div>
    )
}


export default DepartmetnAndShiftDeleteNotice;