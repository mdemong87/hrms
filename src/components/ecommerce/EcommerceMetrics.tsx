"use client";

import EcommerceMetricesCard from "../../components/ecommerce/EcommerceMetricesCard";

export const EcommerceMetrics = () => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:gap-5">

      <EcommerceMetricesCard title="Employees" value="77" rate="100%" status={"up"} head={'1'} />
      <EcommerceMetricesCard title="On Leave Employee" value="5" rate="20%" status={"down"} head={'2'} />
      <EcommerceMetricesCard title="Current Orders" value="11" rate="11%" status={"up"} head={'3'} />
      <EcommerceMetricesCard title="Cencel Orders" value="1" rate="1%" status={"down"} head={'4'} />
      <EcommerceMetricesCard title="Currently Working" value="6" rate="6%" status={"up"} head={'5'} />
      <EcommerceMetricesCard title="Total Profit" value="$2343" rate="100%" status={"up"} head={'6'} />

    </div >
  );
};
