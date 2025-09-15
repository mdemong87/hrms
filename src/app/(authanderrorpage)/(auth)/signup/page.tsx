import SignUpForm from "@/components/auth/SignUpForm";
import { Metadata } from "next";

export const metadata: Metadata = {
title:
    "Sardar IT - HRMS",
  description: "Sardar IT - HRMS",
  // other metadata
};

export default function SignUp() {
  return <SignUpForm />;
}
