import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import type { CartItem } from "@/lib/cart-store";

const resend = new Resend(process.env.RESEND_API_KEY);

// Dimension specs are in millimetres — show the unit in the label.
const MM_FIELDS = new Set(["Height", "Width", "Length", "Thickness"]);
const specLabel = (key: string) => (MM_FIELDS.has(key) ? `${key} (mm)` : key);

function generateRef(): string {
  const date = new Date();
  const stamp = `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, "0")}${String(date.getDate()).padStart(2, "0")}`;
  const rand = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `ULI-${stamp}-${rand}`;
}

function buildEmailHtml(form: Record<string, string>, items: CartItem[], ref: string): string {
  const specsRows = items
    .map((item, i) => {
      const specsStr = Object.entries(item.specs)
        .map(([k, v]) => `<span style="display:inline-block;margin-right:12px;"><strong>${specLabel(k)}:</strong> ${v}</span>`)
        .join("");
      return `
        <tr style="background:${i % 2 === 0 ? "#fdf8ee" : "#f5edd6"};">
          <td style="padding:10px 14px;font-family:'Courier New',monospace;font-size:14px;color:#1A0F00;border-bottom:1px solid #d4c9a8;">${item.productName}</td>
          <td style="padding:10px 14px;font-family:Arial,sans-serif;font-size:12px;color:#5C4A30;border-bottom:1px solid #d4c9a8;">${item.category}</td>
          <td style="padding:10px 14px;font-family:Arial,sans-serif;font-size:12px;color:#1A0F00;border-bottom:1px solid #d4c9a8;">${specsStr}</td>
          <td style="padding:10px 14px;font-family:'Courier New',monospace;font-size:14px;color:#1A0F00;border-bottom:1px solid #d4c9a8;text-align:center;">${item.quantity}</td>
        </tr>
      `;
    })
    .join("");

  return `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#f0e8d0;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0e8d0;padding:40px 20px;">
    <tr><td>
      <table width="640" cellpadding="0" cellspacing="0" style="max-width:640px;margin:0 auto;background:#f5edd6;border:1px solid #c9b990;">

        <!-- Header -->
        <tr>
          <td style="background:#1A0F00;padding:28px 32px;">
            <p style="margin:0;font-family:'Courier New',monospace;font-size:22px;color:#F5EDD6;letter-spacing:-0.5px;">United U-LI Corporation Berhad</p>
            <p style="margin:6px 0 0;font-family:Arial,sans-serif;font-size:12px;color:#ff8905;letter-spacing:2px;text-transform:uppercase;">New Product Enquiry</p>
          </td>
        </tr>

        <!-- Ref + date -->
        <tr>
          <td style="padding:20px 32px;border-bottom:2px solid #1A0F00;background:#f5edd6;">
            <table width="100%">
              <tr>
                <td><p style="margin:0;font-family:Arial,sans-serif;font-size:11px;color:#5C4A30;letter-spacing:1.5px;text-transform:uppercase;">Enquiry Reference</p>
                    <p style="margin:4px 0 0;font-family:'Courier New',monospace;font-size:18px;color:#ff8905;font-weight:bold;">${ref}</p></td>
                <td style="text-align:right;"><p style="margin:0;font-family:Arial,sans-serif;font-size:11px;color:#5C4A30;letter-spacing:1.5px;text-transform:uppercase;">Date Submitted</p>
                    <p style="margin:4px 0 0;font-family:Arial,sans-serif;font-size:13px;color:#1A0F00;">${new Date().toLocaleDateString("en-MY", { year: "numeric", month: "long", day: "numeric" })}</p></td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Customer details -->
        <tr>
          <td style="padding:24px 32px;">
            <p style="margin:0 0 16px;font-family:Arial,sans-serif;font-size:11px;font-weight:bold;color:#1A0F00;letter-spacing:2px;text-transform:uppercase;">Customer Details</p>
            <table width="100%" cellpadding="0" cellspacing="0">
              ${[
                ["Full Name", form.name],
                ["Company", form.company],
                ["Email", form.email],
                ["Phone", form.phone],
                ["Country", form.country],
                form.projectName ? ["Project Name", form.projectName] : null,
                form.deliveryRegion ? ["Delivery Region", form.deliveryRegion] : null,
              ]
                .filter(Boolean)
                .map(
                  (row) => `
                <tr>
                  <td style="padding:5px 0;font-family:Arial,sans-serif;font-size:11px;color:#5C4A30;width:140px;vertical-align:top;">${row![0]}</td>
                  <td style="padding:5px 0;font-family:Arial,sans-serif;font-size:13px;color:#1A0F00;font-weight:600;">${row![1]}</td>
                </tr>`
                )
                .join("")}
            </table>
          </td>
        </tr>

        <!-- Products table -->
        <tr>
          <td style="padding:0 32px 24px;">
            <p style="margin:0 0 14px;font-family:Arial,sans-serif;font-size:11px;font-weight:bold;color:#1A0F00;letter-spacing:2px;text-transform:uppercase;">Enquired Products</p>
            <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #c9b990;border-collapse:collapse;">
              <thead>
                <tr style="background:#1A0F00;">
                  <th style="padding:10px 14px;font-family:Arial,sans-serif;font-size:11px;color:#F5EDD6;text-align:left;letter-spacing:1px;text-transform:uppercase;width:30%;">Product</th>
                  <th style="padding:10px 14px;font-family:Arial,sans-serif;font-size:11px;color:#F5EDD6;text-align:left;letter-spacing:1px;text-transform:uppercase;width:18%;">Category</th>
                  <th style="padding:10px 14px;font-family:Arial,sans-serif;font-size:11px;color:#F5EDD6;text-align:left;letter-spacing:1px;text-transform:uppercase;">Specifications</th>
                  <th style="padding:10px 14px;font-family:Arial,sans-serif;font-size:11px;color:#F5EDD6;text-align:center;letter-spacing:1px;text-transform:uppercase;width:60px;">Qty</th>
                </tr>
              </thead>
              <tbody>${specsRows}</tbody>
            </table>
          </td>
        </tr>

        ${form.notes ? `
        <!-- Notes -->
        <tr>
          <td style="padding:0 32px 24px;">
            <p style="margin:0 0 10px;font-family:Arial,sans-serif;font-size:11px;font-weight:bold;color:#1A0F00;letter-spacing:2px;text-transform:uppercase;">Additional Notes</p>
            <p style="margin:0;font-family:Arial,sans-serif;font-size:13px;color:#1A0F00;line-height:1.6;padding:14px;background:#fdf8ee;border-left:3px solid #ff8905;">${form.notes.replace(/\n/g, "<br>")}</p>
          </td>
        </tr>` : ""}

        <!-- Footer -->
        <tr>
          <td style="padding:20px 32px;background:#1A0F00;">
            <p style="margin:0;font-family:Arial,sans-serif;font-size:11px;color:#a09070;">This enquiry was submitted via the U-LI product catalogue. Please respond to: <a href="mailto:${form.email}" style="color:#ff8905;">${form.email}</a></p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

export async function POST(req: NextRequest) {
  try {
    const { form, items } = await req.json();

    if (!form?.email || !form?.name || !items?.length) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const ref = generateRef();
    const html = buildEmailHtml(form, items, ref);

    await resend.emails.send({
      from: "U-LI Enquiries <enquiries@resend.dev>",
      to: ["info@uli.com.my"],
      replyTo: form.email,
      subject: `[${ref}] New Product Enquiry — ${form.company || form.name}`,
      html,
    });

    return NextResponse.json({ success: true, ref });
  } catch (err) {
    console.error("Enquiry email error:", err);
    return NextResponse.json({ error: "Failed to send enquiry" }, { status: 500 });
  }
}
