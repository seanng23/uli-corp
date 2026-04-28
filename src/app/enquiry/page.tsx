import EnquiryClient from "@/components/EnquiryClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Enquiry Cart",
  description: "Review your selected products and submit an enquiry to the U-LI sales team.",
  alternates: { canonical: "/enquiry" },
};

export default function EnquiryPage() {
  return <EnquiryClient />;
}
