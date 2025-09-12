import AbsenceToday from "@/components/ecommerce/AbsenceToday";
import { EcommerceMetrics } from "@/components/ecommerce/EcommerceMetrics";
import MeetingSchedule from '@/components/ecommerce/MeetingSchedule';
import MonthlySalesChart from "@/components/ecommerce/MonthlySalesChart";
import MonthlyTarget from "@/components/ecommerce/MonthlyTarget";
import StatisticsChart from "@/components/ecommerce/StatisticsChart";
import { cookies } from "next/headers";
// import Announcement from "../../../components/c";

export const metadata = {
  title:
    "Sardar IT - HRMS",
  description: "Sardar IT - HRMS",
};

export default async function AdminDeshBoard() {

  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value; // name must match your cookie


  /************** Deshboard Page Data Fetching Here **************/


  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/admin/dashboard`, {
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    console.error("Fetch failed:", res.status, res.statusText);
    return <div>Error loading dashboard data</div>;
  }

  const deshboardData = await res.json();

  console.log(deshboardData);


  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      <div className="col-span-12 space-y-6 xl:col-span-7">
        <EcommerceMetrics deshboardData={deshboardData} />

        <MonthlySalesChart deshboardData={deshboardData?.monthly_sales} />
        <MeetingSchedule deshboardData={deshboardData} />
      </div>

      <div className="col-span-12 xl:col-span-5">
        <MonthlyTarget deshboardData={deshboardData} />
        <AbsenceToday deshboardData={deshboardData?.absent_last_day} />
      </div>

      <div className="col-span-12 xl:col-span-7">
        {/* <Announcement deshboardData={deshboardData} /> */}
      </div>

      <div className="col-span-12">
        <StatisticsChart deshboardData={deshboardData?.monthly_statistics} />
      </div>

    </div>
  );
}
