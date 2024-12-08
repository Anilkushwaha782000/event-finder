"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Loader from "../component/Loader";
import Footer from "../component/Footer";
const SavedEvents = () => {
  const [savedEvents, setsavedEvents] = useState<Record<string, any>[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    const fetchSavedEvents = async () => {
      try {
        const res = await fetch("/api/getsavedeventdata");
        const data = await res.json();
        setsavedEvents(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching events:", err);
        setError("Failed to load events.");
        setLoading(false);
      }
    };

    fetchSavedEvents();
  }, []);
  const handleRemove = async (id: string) => {
    try {
      const response = await fetch(`/api/eventRmove/?id=${id}`);
      const data = await response.json();
      const filterId = data.event._id;
      const filteredEvents = savedEvents.filter(
        (event) => event._id !== filterId
      );
      setsavedEvents(filteredEvents);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError("Failed to set events: " + err.message);
      } else {
        setError("Failed to set events: An unknown error occurred in client side.");
      }
      setLoading(false);
    }
  };
  if (loading) {
    return <Loader />;
  }
  return (
    <div className="min-h-screen flex flex-col bg-pink-50">
      <header className="bg-pink-600 text-white py-12 text-center rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold mb-4">My Events</h1>
        <p className="text-lg">
          Easily manage and access all your saved events right here!
        </p>
      </header>
      <div className="max-w-7xl flex-grow py-10 px-4 mx-6 justify-items-center">
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {error && <p className="text-red-600 mt-4 mb-4">{error}</p>}
          {savedEvents.length > 0 ? (
            savedEvents.map((event) => (
              <div
                key={event.id}
                className="bg-white rounded-lg w-[96] shadow-md overflow-hidden hover:shadow-lg transform transition-all duration-300 ease-in-out"
              >
                <img
                  src={event.imageUrl}
                  alt={event.eventName}
                  className="w-full h-56 object-cover"
                />

                {/* Event Info */}
                <div className="p-6 flex flex-col justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-pink-700 mb-2">
                      {event.eventName}
                    </h2>
                    <p className="text-sm text-gray-500 mb-1">
                      <span>Date: </span>
                      {event.date}
                    </p>
                    <p className="text-sm text-gray-500 mb-1">
                      <span>Total Ticket: </span>
                      {event.ticket}
                    </p>
                    <p className="text-sm text-gray-500 mb-4">
                      <span>Email- </span>
                      {event.email}
                    </p>
                    <p className="text-sm text-gray-500 mb-4">
                      <span>User Name- </span>
                      {event.userName}
                    </p>
                    <p className="text-gray-700 mb-6 line-clamp-3">
                      {event.description}
                    </p>
                  </div>
                  <div className="flex justify-between items-center mt-auto">
                    <button
                      onClick={() => handleRemove(event._id)}
                      className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700 transition-all duration-200 ease-in-out"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <>
             <h1 className="text-4xl font-bold mb-4 text-center text-pink-600">
                No Events Found
              </h1>
             <div className="flex flex-col gap-4">
             <p className="text-lg text-gray-500">
                It seems you don&apos;t have any saved events at the moment. Please
                check back later or start adding some!
              </p>
              <Link
                href={'/booking'}
                className="text-pink-700 underline transition-all duration-200 ease-in-out"
              >
                Add Events
              </Link>
             </div>
            </>
          )}
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default SavedEvents;
