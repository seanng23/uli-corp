"use server";

import { Resend } from "resend";
import { sanityWriteClient } from "@/sanity/lib/client";

const resend = new Resend(process.env.RESEND_API_KEY);

export type ContactState = {
  status: "idle" | "success" | "error";
  message?: string;
};

export async function submitContact(
  _prev: ContactState,
  formData: FormData
): Promise<ContactState> {
  const title = formData.get("title") as string;
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const contactNumber = formData.get("contactNumber") as string;
  const companyName = formData.get("companyName") as string;
  const companyCategory = formData.get("companyCategory") as string;
  const otherCategory = formData.get("otherCategory") as string;
  const address = formData.get("address") as string;
  const message = formData.get("message") as string;

  if (!name || !email || !message) {
    return { status: "error", message: "Please fill in all required fields." };
  }

  const to = process.env.CONTACT_EMAIL ?? "salescss@uli.com.my";

  try {
    await resend.emails.send({
      from: "U-LI Website <onboarding@resend.dev>",
      to,
      replyTo: email,
      subject: `New Enquiry from ${name}${companyName ? ` — ${companyName}` : ""}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <table cellpadding="8" style="border-collapse:collapse;width:100%">
          <tr><td><strong>Title</strong></td><td>${title || "—"}</td></tr>
          <tr><td><strong>Name</strong></td><td>${name}</td></tr>
          <tr><td><strong>Email</strong></td><td>${email}</td></tr>
          <tr><td><strong>Contact Number</strong></td><td>${contactNumber || "—"}</td></tr>
          <tr><td><strong>Company Name</strong></td><td>${companyName || "—"}</td></tr>
          <tr><td><strong>Company Category</strong></td><td>${companyCategory || "—"}</td></tr>
          <tr><td><strong>Other Category</strong></td><td>${otherCategory || "—"}</td></tr>
          <tr><td><strong>Address</strong></td><td>${address || "—"}</td></tr>
          <tr><td><strong>Message</strong></td><td style="white-space:pre-wrap">${message}</td></tr>
        </table>
      `,
    });

    // Also store in Sanity if write client is configured
    if (sanityWriteClient) {
      try {
        await sanityWriteClient.create({
          _type: "contactSubmission",
          name,
          company: companyName || undefined,
          email,
          phone: contactNumber || undefined,
          subject: companyCategory || "General Enquiry",
          message,
          submittedAt: new Date().toISOString(),
        });
      } catch (sanityErr) {
        // Non-fatal — email already sent, just log the Sanity failure
        console.error("[Sanity] Failed to store contact submission:", sanityErr);
      }
    }

    return { status: "success", message: "Your message has been sent. We'll be in touch shortly." };
  } catch {
    return { status: "error", message: "Something went wrong. Please try again or email us directly." };
  }
}
