import SignInForm from "@/components/auth/SignInForm";
import { Metadata } from "next";

export const metadata: Metadata = {
 title:
    "Sardar IT - HRMS",
  description: "Sardar IT - HRMS",
};

export default function SignIn() {
  return <SignInForm />;
}
