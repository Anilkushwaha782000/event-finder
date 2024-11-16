"use client";
import React,{useEffect, useState}  from "react";
import Loader from "../component/Loader";
import Link from "next/link";
 const EventPage = () => {
 const [event, setEvents] = useState<any[]>([]);
 const [loading, setLoading] = useState(true); 
 const [error, setError] = useState("");
 const [currentPage, setCurrentPage] = useState(1);
 const eventsPerPage = 5;
 const speakers=[{
  name:"John Smith",
  img:"https://cdn.pixabay.com/photo/2016/05/20/18/52/man-1405712_640.jpg"
 },
{
    name:"John Doe",
  img:"https://cdn.pixabay.com/photo/2019/11/08/06/26/speaker-4610564_640.jpg"
},
{
    name:"Alena",
  img:"https://cdn.pixabay.com/photo/2024/04/05/05/17/woman-8676532_640.jpg"
}]
 useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch('/api/events');
        const data = await res.json();
        const { _embedded: { events } } = data;
        setEvents(events); 
        setLoading(false);
      } catch (err) {
        console.error("Error fetching events:", err);
        setError("Failed to load events.");
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);
  const totalPages = Math.ceil(event.length / eventsPerPage);
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = event.slice(indexOfFirstEvent, indexOfLastEvent);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };
  if (loading) {
    return <Loader/>
  } 

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Banner Section */}
      <header className="bg-pink-600 text-white py-20">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4">Upcoming Event: Tech Innovators 2024</h1>
          <p className="text-lg mb-6">Join us for an unforgettable experience with industry leaders.</p>
          <Link href="/booking" className="bg-white text-pink-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition">
            Register Now
          </Link>
        </div>
      </header>

      {/* Event Details Section */}
      <section className="py-12">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-pink-600 mb-6">Event Details</h2>
          <p className="text-gray-700 max-w-2xl mx-auto mb-4">
            The Tech Innovators 2024 event will be held at the City Convention Center on June 25th, 2024. Get ready to hear from top
            industry leaders, innovators, and thinkers who are shaping the future of technology.
          </p>
          <p className="text-gray-700">Date: June 25th, 2024</p>
          <p className="text-gray-700">Location: City Convention Center, Main Hall</p>
        </div>
      </section>

      {/* Speakers Section */}
      <section className="bg-pink-100 py-12">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-pink-600 mb-6">Keynote Speakers</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {speakers.map((speaker, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
                <img
                  src={speaker.img}
                  alt={speaker.img}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <h3 className="text-xl font-semibold text-pink-600">{speaker.name}</h3>
                <p className="text-gray-600">CEO, Tech Company</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Schedule Section */}
      <section className="py-12">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-pink-600 mb-6">Event Schedule</h2>
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold text-pink-600 mb-2">Morning Session</h3>
              <p className="text-gray-700">9:00 AM - 12:00 PM</p>
              <p className="text-gray-700">Keynote speeches and panel discussions with industry experts.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold text-pink-600 mb-2">Afternoon Workshop</h3>
              <p className="text-gray-700">1:00 PM - 5:00 PM</p>
              <p className="text-gray-700">Hands-on sessions and networking opportunities.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Events List Section */}
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-pink-600 mb-6">Upcoming Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {currentEvents.map(event => {
              const venue = event._embedded.venues[0];
              const { name: venueName, address, city, state, country } = venue;

              return (
                <div key={event.id} className="bg-white p-6 rounded-lg shadow-lg">
                  <h3 className="text-2xl font-semibold text-pink-600 mb-2">{event.name}</h3>
                  <p className="text-gray-700 mb-1">Date: {event.dates.start.localDate}</p>
                  <p className="text-gray-700 mb-1">Location: {`${address.line1}, ${city.name}, ${state.name}, ${country.name}`}</p>
                  <p className="text-gray-600 mb-4">{event.ticketLimit.info}</p>
                  <a
                    href={`/event/${event.id}`}
                    className="bg-pink-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-pink-700 transition"
                  >
                    Learn More
                  </a>
                </div>
              );
            })}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center mt-8">
            <button
              onClick={handlePrevPage}
              className="bg-pink-600 text-white px-4 py-2 rounded-l-lg font-semibold hover:bg-pink-700 transition disabled:opacity-50"
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span className="mx-2 self-center text-lg">{currentPage} / {totalPages}</span>
            <button
              onClick={handleNextPage}
              className="bg-pink-600 text-white px-4 py-2 rounded-r-lg font-semibold hover:bg-pink-700 transition disabled:opacity-50"
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </section>


      {/* Call to Action Section */}
      <section id="register" className="bg-pink-600 text-white py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Join Us?</h2>
          <p className="text-lg mb-8">
            Don't miss out on the opportunity to be a part of this groundbreaking event. Register today!
          </p>
          <a href="/auth" className="bg-white text-pink-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition">
            Register Now
          </a>
        </div>
      </section>
    </div>
  );
};

export default EventPage;
