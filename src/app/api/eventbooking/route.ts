import connectToDatabase from "@/app/lib/ConnectToDb";
import EventBooking from "@/app/models/bookingSchema";
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/authOption";
connectToDatabase()
interface EventData {
    event: string;
    name: string;
    date: string;  
    email: string;
    tickets:string;
    eventId:string;
    imageUrl:string;
  }
export async function POST(request: NextRequest) {
    try {
      await connectToDatabase();
      const session = await getServerSession(authOptions);
      if (!session) {
        return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
      }
      const userId = session.user.email;
      const data:EventData = await request.json();
      const newEvent = new EventBooking({
        imageUrl: data.imageUrl,
        eventName: data.event,  
        email: data.email,
        date: data.date,
        ticket: data.tickets,       
        eventId: data.eventId,
        userName: data.name,
        user: userId,
      });
  
     const event= await newEvent.save();
     if(event){
        return NextResponse.json({ message: 'Event saved successfully' }, { status: 201 });
     }
     else{
        return NextResponse.json({ message: 'There is an error while saving event' }, { status: 403 });
     }
    } catch (error: unknown) {
      if (error instanceof Error) {
        return NextResponse.json({ message: 'Failed to save event ' + error.message }, { status: 500 });
      } else {
        return NextResponse.json({ message: 'An unknown error occurred' }, { status: 500 });
      }
    }
  }