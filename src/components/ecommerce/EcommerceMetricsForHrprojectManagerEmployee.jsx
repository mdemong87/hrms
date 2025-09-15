"use client";

import EcommerceMetricesCard from "./EcommerceMetricesCard";

const EcommerceMetricsForHrprojectManagerEmployee = ({ deshboardData }) => {
    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-4 md:gap-3">

            <EcommerceMetricesCard title="Employees" value={deshboardData?.allemployees} rate="100%" status={"up"} head={'1'} />
            <EcommerceMetricesCard title="Deparments" value={deshboardData?.department} rate="20%" status={"down"} head={'2'} />
            <EcommerceMetricesCard title="Shifts" value={deshboardData?.shifts} rate="100%" status={"up"} head={'3'} />
            <EcommerceMetricesCard title="On Leave" value={deshboardData?.absentToday} rate="20%" status={"down"} head={'4'} />
        </div >
    );
};


export default EcommerceMetricsForHrprojectManagerEmployee;