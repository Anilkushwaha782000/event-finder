import connectToDatabase from "@/app/lib/ConnectToDb";
import EventBooking from "@/app/models/bookingSchema";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
connectToDatabase();
export async function GET() {
  await connectToDatabase();
  const session = await getServerSession(authOptions);
  try {
    if (!session) {
      return NextResponse.json(
        { message: "Not authenticated" },
        { status: 401 }
      );
    }
    const user = session.user.email;
    const userEvents = await EventBooking.find({ user });
    return NextResponse.json(userEvents, { status: 200 });
  } catch (error) {
    console.error("Error fetching events from Eventbrite API:", error);
    return NextResponse.json(
      { message: "Error fetching events" },
      { status: 500 }
    );
  }
}
