"use client";

import EcommerceMetricesCard from "./EcommerceMetricesCard";

export const EcommerceMetrics = ({ deshboardData }) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-4 md:gap-3">

      <EcommerceMetricesCard title="Employees" value={deshboardData?.allemployees} rate="100%" status={"up"} head={'1'} />
      <EcommerceMetricesCard title="Deparments" value={deshboardData?.department} rate="20%" status={"down"} head={'2'} />
      <EcommerceMetricesCard title="Shifts" value={deshboardData?.shifts} rate="100%" status={"up"} head={'3'} />
      <EcommerceMetricesCard title="On Leave" value={deshboardData?.absentToday} rate="20%" status={"down"} head={'4'} />
      <EcommerceMetricesCard title="Current Orders" value="11" rate="11%" status={"up"} head={'5'} />
      <EcommerceMetricesCard title="Cencel Orders" value="1" rate="1%" status={"down"} head={'6'} />
      <EcommerceMetricesCard title="Currently Working" value="6" rate="6%" status={"up"} head={'7'} />
      <EcommerceMetricesCard title="Total Profit" value="$2343" rate="100%" status={"up"} head={'8'} />
      <EcommerceMetricesCard title="Cencel Orders" value="1" rate="1%" status={"down"} head={'6'} />
      <EcommerceMetricesCard title="Currently Working" value="6" rate="6%" status={"up"} head={'7'} />
      <EcommerceMetricesCard title="Total Profit" value="$2343" rate="100%" status={"up"} head={'8'} />
      <EcommerceMetricesCard title="Total Profit" value="$2343" rate="100%" status={"up"} head={'8'} />

    </div >
  );
};
