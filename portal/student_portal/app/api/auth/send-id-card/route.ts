import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { email, name, rollNo, pdfBase64 } = data;

    if (!email || !pdfBase64) {
      return NextResponse.json({ success: false, message: "Missing email or PDF data" }, { status: 400 });
    }

    // Use SMTP settings from env or fallback to a mock logger if not provided
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;

    if (!user || !pass) {
      console.log(`[MOCK EMAIL] To: ${email} | Subject: Your Official Student ID Card`);
      console.log(`[MOCK EMAIL] Attachment: ID_Card_${rollNo}.pdf (${pdfBase64.substring(0, 50)}...)`);
      return NextResponse.json({ success: true, message: "ID Card generated. Mock email logged to console (SMTP credentials missing)." });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user, pass },
    });

    const mailOptions = {
      from: user,
      to: email,
      subject: "Welcome to LeGeZt - Your Official Student ID Card",
      text: `Hello ${name},\n\nWelcome to the LeGeZt Autonomous Intranet Portal.\nYour Roll Number is: ${rollNo}\n\nPlease find your official Student ID card attached.\n\nBest regards,\nLords Institute of Engineering and Technology`,
      attachments: [
        {
          filename: `ID_Card_${rollNo}.pdf`,
          content: pdfBase64.split("base64,")[1],
          encoding: "base64",
        },
      ],
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: "ID Card sent successfully to your email." });
  } catch (error) {
    console.error("Email Sending Error:", error);
    return NextResponse.json({ success: false, message: "Failed to send email" }, { status: 500 });
  }
}
