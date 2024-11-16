import sendEmail from "../mailer";
import { NextResponse } from "next/server";
export async function POST(req) {
  const {email, message,subject } = await req.json();
    try {
      await sendEmail(email, subject, message);
      return  NextResponse.json({ message: 'Email sent successfully!' });
    } catch (error) {
      return NextResponse.json({ message: 'Failed to send email '+error.message }, { status: 500 });
    }
  }