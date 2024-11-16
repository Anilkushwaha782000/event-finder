import { NextResponse } from "next/server";
import EventBooking from "@/app/models/bookingSchema";
import { authOptions } from "../auth/[...nextauth]/route";
import connectToDatabase from "@/app/lib/ConnectToDb";
import { getServerSession } from "next-auth";
export async function GET(request: Request) {
  connectToDatabase()
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const session = await getServerSession(authOptions);
  try {
    if (!session) {
        return NextResponse.json(
          { message: "You are Not authorized to remove the events!" },
          { status: 401 }
        );
      }
    const event=await EventBooking.findByIdAndDelete(id);
    if(event){
        return NextResponse.json(
            { message: "Event deleted successfully!",event},
            { status: 200 }
          );
    }
    else{
        return NextResponse.json(
            { message: "Event no found!"},
            { status: 404 }
          );
    }
  } catch (error) {
    console.error("Error fetching events from Eventbrite API:", error);

    return NextResponse.json(
      { message: "Error fetching events" },
      { status: 500 }
    );
  }
}
