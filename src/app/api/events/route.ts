import { NextResponse } from 'next/server';
export async function GET() {
  const url = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${process.env.EVENT_API_KEY}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error fetching events: ${response.statusText}`);
    }

    const events = await response.json();
    return NextResponse.json(events);
  } catch (error) {
    console.error("Error fetching events from Eventbrite API:", error);

    return NextResponse.json(
      { message: "Error fetching events" },
      { status: 500 }
    );
  }
}
