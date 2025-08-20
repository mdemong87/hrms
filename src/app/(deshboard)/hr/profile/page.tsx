import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import LimitedSingleEmployeeInfo from "@/components/ecommerce/LimitedSingleEmployeeInfo";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Sardar IT - HRMS",
  description: "Sardar IT - HRMS",
};

export default function Profile() {
  return (
    <div>
      <PageBreadcrumb pageTitle={"My Profile"} />
      <LimitedSingleEmployeeInfo />
    </div>
  );
}
