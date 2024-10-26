"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Loader from '@/app/component/Loader';
import Image from 'next/image';

function Page({ params }: { params: { classification: string } }) {
  const router = useRouter();
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const classification = params.classification;

  useEffect(() => {
    if (classification) {
      fetchEventsByClassification(classification);
    }
  }, [classification]);

  const fetchEventsByClassification = async (classification: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/classification?classification=${classification}`);
      const data = await response.json();
      const {_embedded:{events}}=data
      console.log("dataa>>",data)
      console.log("events>>",events)
      if (response.ok) {
        setEvents(events);
      } else {
        setError(data.error || 'Something went wrong');
      }
    } catch (error) {
      console.error('Error fetching events:', error);
      setError('Failed to fetch events');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen p-4 bg-pink-50">
      <header className="bg-pink-600 text-white py-12 text-center rounded-lg shadow-lg mb-4">
        <h1 className="text-4xl font-bold mb-4">{classification}</h1>
        <p className="text-lg">
          Join us for the most exciting {classification.toLowerCase()} events in your area!
        </p>
      </header>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events
              .map((item,index) => (
                <div
                  key={index}
                  className="bg-white shadow-lg rounded-lg overflow-hidden"
                >
                  <img
                    src={item.images[0].url}
                    alt={`Event ${index + 1}`}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-xl font-semibold mb-2">
                      {item.name}
                    </h3>
                    <p className="text-gray-700 mb-4">{new Date(item.dates.start.dateTime).toLocaleDateString()}</p>
                    <a href={`/event/${item.id}`} className="text-pink-600 font-medium hover:underline">
                      View Details
                    </a>
                  </div>
                </div>
              ))}
          </div>
    </div>
  );
}

export default Page;
