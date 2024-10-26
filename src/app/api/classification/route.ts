import { NextResponse, NextRequest } from "next/server";
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const classification = searchParams.get("classification");
  const url = `https://app.ticketmaster.com/discovery/v2/events.json?classificationName=${classification}&dmaId=324&apikey=${process.env.EVENT_API_KEY}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error fetching events: ${response.statusText}`);
    }
    const events = await response.json();
    if (events) {
      return NextResponse.json(events);
    } else {
      return NextResponse.json({ error: "No events found" });
    }
  } catch (error) {
    console.error("Error fetching events from Eventbrite API:", error);

    return NextResponse.json(
      { message: "Error fetching events" },
      { status: 500 }
    );
  }
}
