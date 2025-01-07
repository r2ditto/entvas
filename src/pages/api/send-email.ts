import { NextApiRequest, NextApiResponse } from "next";
import sendgrid from "@sendgrid/mail";

sendgrid.setApiKey(process.env.SENDGRID_API_KEY || "");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { recipientEmail, quoteId } = req.body;

  if (!recipientEmail || !quoteId) {
    return res.status(400).json({ error: "Missing recipientEmail or quoteId" });
  }

  const quoteLink = `${process.env.NEXT_PUBLIC_BASE_URL}/quote/${quoteId}`;

  try {
    await sendgrid.send({
      to: recipientEmail,
      from: process.env.SENDER_EMAIL || "",
      subject: "Your Quote Confirmation",
      html: `
        <p>You have a new quote! Click the link below to view it:</p>
        <a href="${quoteLink}">View Quote</a>
      `,
    });

    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Failed to send email" });
  }
}
