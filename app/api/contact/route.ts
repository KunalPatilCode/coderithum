import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body;

    // Backend validations
    if (!name || typeof name !== "string" || name.trim() === "") {
      return NextResponse.json({ error: "First Name is required." }, { status: 400 });
    }
    if (!email || typeof email !== "string" || email.trim() === "") {
      return NextResponse.json({ error: "Email Address is required." }, { status: 400 });
    }
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }
    if (!subject || typeof subject !== "string" || subject.trim() === "") {
      return NextResponse.json({ error: "Topic / Subject is required." }, { status: 400 });
    }
    if (!message || typeof message !== "string" || message.trim() === "") {
      return NextResponse.json({ error: "Message Body is required." }, { status: 400 });
    }

    const emailUser = process.env.EMAIL_USER;
    const emailPassword = process.env.EMAIL_PASSWORD;
    const contactEmail = process.env.CONTACT_EMAIL || "coderithum1@gmail.com";

    // Fail gracefully with a helpful message if credentials are not configured yet
    if (
      !emailUser ||
      !emailPassword ||
      emailUser === "your_email@gmail.com" ||
      emailPassword === "your_gmail_app_password" ||
      emailPassword === "your_google_app_password" ||
      emailUser.trim() === "" ||
      emailPassword.trim() === ""
    ) {
      return NextResponse.json(
        {
          error: "SMTP credentials are not configured. Please define EMAIL_USER and EMAIL_PASSWORD with your credentials in your .env file to enable email submission.",
        },
        { status: 500 }
      );
    }

    // Create SMTP Transporter using Gmail service
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: emailUser,
        pass: emailPassword,
      },
    });

    // Compose Email matching the user requirements
    const mailOptions = {
      from: `"${name}" <${emailUser}>`,
      to: contactEmail,
      replyTo: email,
      subject: `New Contact Form Inquiry: ${subject}`,
      text: `New Contact Form Inquiry\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`,
    };

    // Send Email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: "Your message has been sent successfully!" });
  } catch (error: any) {
    console.error("Error in contact API:", error);
    return NextResponse.json(
      { error: `Mail delivery failed: ${error.message || error}` },
      { status: 500 }
    );
  }
}
