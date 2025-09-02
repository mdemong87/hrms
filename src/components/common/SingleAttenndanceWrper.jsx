'use client'

import SingleAttendance from "@/components/ecommerce/SingleAttendance";
import getId from "@/helper/cookie/getid";

const SingleAttendanceWrper = () => {

    const myId = getId();

    return (
        <div>
            <SingleAttendance id={myId} />
        </div>
    )
}

export default SingleAttendanceWrper;