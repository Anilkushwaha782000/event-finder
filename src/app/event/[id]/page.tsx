"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaCalendarAlt, FaMapMarkerAlt, FaTicketAlt } from "react-icons/fa";
import { GetServerSideProps } from "next";
import Loader from "@/app/component/Loader";
import Footer from "@/app/component/Footer";
const EventDetails = ({ params }: { params: { id: string } }) => {
  const eventId = params.id;
  const router = useRouter();
  const [events, setEvents] = useState<Record<string, any>[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch(`/api/events/${eventId}`);
        const data = await res.json();
        setEvents([data]);
        setLoading(false);
      } catch (err) {
        setError("Failed to load events.");
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);
  if (events.length === 0) {
    return <Loader />;
  }
  const handleBooking = () => {
    router.push("/booking");
  };
  return (
    <div className="flex flex-col min-h-screen bg-pink-50">
      <div>
        {events.map((item) => {
          const time = item.dates.start.dateTime;
          const dateAndTime = new Date(time).toLocaleString();
          const venue = item._embedded.venues[0];
          const {
            name: venueName = "Unknown Venue",
            address: { line1 = "No address provided" } = {},
            city = "Unknown city",
            state = "Unknown state",
            country = "Unknown country",
            generalInfo: {
              generalRule = "No general rule",
              childRule = "No child rule",
            } = {},
          } = venue || {};

          return (
            <>
              <div className="bg-pink-500 text-white py-10 px-5 md:px-20">
                <h1 className="text-4xl md:text-5xl font-bold text-center">
                  {item.name}
                </h1>
                <p className="text-lg text-center mt-4">{country.name}</p>
              </div>

              {/* Event Info Section */}
              <div className="container mx-auto px-5 md:px-20 py-10">
                <img
                  className="w-full h-80 object-cover"
                  src={item?.images[0]?.url}
                  alt="image not found"
                />
              </div>
              <div className="container mx-auto px-5 md:px-20 py-10 flex-grow grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Date and Time */}

                <div className="bg-white shadow-lg rounded-lg p-6">
                  <div className="flex items-center text-pink-500 mb-4">
                    <FaCalendarAlt className="mr-2" size={24} />
                    <h2 className="text-xl font-semibold">Date & Time</h2>
                  </div>
                  <p className="text-gray-700">{dateAndTime}</p>
                </div>

                {/* Location */}
                <div className="bg-white shadow-lg rounded-lg p-6">
                  <div className="flex items-center text-pink-500 mb-4">
                    <FaMapMarkerAlt className="mr-2" size={24} />
                    <h2 className="text-xl font-semibold">Location</h2>
                  </div>
                  <p className="text-gray-700">{line1}</p>
                </div>

                {/* Tickets */}
                <div className="bg-white shadow-lg rounded-lg p-6">
                  <div className="flex items-center text-pink-500 mb-4">
                    <FaTicketAlt className="mr-2" size={24} />
                    <h2 className="text-xl font-semibold">Tickets</h2>
                  </div>
                  <div className="flex gpa-2 flex-col">
                    <p className="text-gray-700">
                      Price: {item.priceRanges?.[0]?.currency || ""}
                    </p>
                    <span className="text-gray-700">
                      max: ${item.priceRanges?.[0]?.max || ""}
                    </span>
                    <span className="text-gray-700">
                      min: ${item.priceRanges?.[0]?.min || ""}
                    </span>
                    <span className="text-gray-700">
                      {item?.ticketLimit?.info ||
                        "No information available now"}
                    </span>
                  </div>
                  <button
                    className="mt-4 w-full bg-pink-500 text-white py-2 px-4 rounded-lg hover:bg-pink-600 transition duration-300"
                    onClick={() => handleBooking()}
                  >
                    Book Now
                  </button>
                </div>
              </div>

              {/* About the Event Section */}
              <div className="container mx-auto px-5 md:px-20 py-10">
                <h2 className="text-3xl font-bold text-pink-500 mb-6">
                  About the Event
                </h2>
                <p className="text-gray-700 text-lg leading-relaxed">
                  {generalRule}
                </p>
                <p className="text-gray-700 text-lg leading-relaxed mb-2 mt-6">
                  {childRule}
                </p>
              </div>
            </>
          );
        })}
      </div>
     <Footer/>
    </div>
  );
};
export default EventDetails;
