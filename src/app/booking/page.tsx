"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Loader from "../component/Loader";
import Footer from "../component/Footer";
const EventBooking = () => {
  const [events, setEvents] = useState<any[]>([]);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const[category,setCategory]=useState('food');
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    category: "food",
    event: "",
    tickets: 1,
    date: "",
    eventId: "",
    imageUrl:""
  });
  const [disabled, setDisabled] = useState(false);
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch(`/api/classification?classification=${category}`);
        const data = await res.json();
        const {
          _embedded: { events },
        } = data;
        setEvents(events);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching events:", err);
        setError("Failed to load events.");
        setLoading(false);
      }
    };

    fetchEvents();
  }, [category]);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if(name=='category'){
      setCategory(value);
    }
    setFormData({
      ...formData,
      [name]: value,
    });
    if (name == "event") {
      const selectedEvent = events.find((event) => event.name === value);
      if (selectedEvent) {
        setFormData({
          ...formData,
          event: selectedEvent.name,
          eventId: selectedEvent.id,
          imageUrl:selectedEvent.images[0].url
        });
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setDisabled(true);
    e.preventDefault();
    console.log("formdata>>",formData)
    try {
      const response = await fetch("/api/eventbooking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("booking result",result);
        setFormData({
          name: "",
          email: "",
          event: "",
          tickets: 1,
          date: "",
          eventId: "",
          category: "",
          imageUrl: "",
        });
        setDisabled(false);
        router.push("/myevent");
      } else {
        console.error("Error submitting booking:", response.statusText);
      }
    } catch (error) {
      console.error("Error submitting booking:", error);
    }
  };
  const handleBooking = (id: string) => {
    const selectedEvent = events.find((event) => event.id === id);
    const {
      dates: {
        start: { localDate },
      },
    } = selectedEvent;
    if (localDate) {
      const formattedDate = localDate.split("-").reverse().join("-");
      if (selectedEvent) {
        setFormData({
          ...formData,
          event: selectedEvent.name,
          date: formattedDate,
          eventId: selectedEvent.id,
          imageUrl:selectedEvent.images[0].url
        });
      }
    }
  };
  if (loading) {
    return <Loader />;
  }
  return (
    <div className="flex flex-col min-h-screen bg-pink-100">
      {/* Hero Section */}
      <header className="bg-pink-600 text-white py-12 text-center rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold mb-4">Book Your Event</h1>
        <p className="text-lg">
          Join us for the most exciting events in your area!
        </p>
      </header>

      {/* Booking Form Section */}
      {error && (
        <p className="text-red mb-4 mt-4">{error}</p>
      )}
      <div className="container mx-auto mt-10 max-w-4xl bg-white p-8 shadow-lg rounded-lg flex-grow">
        <h2 className="text-3xl font-bold text-pink-600 mb-8 text-center">
          Event Booking Form
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="block font-medium text-gray-700 mb-2"
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-300"
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block font-medium text-gray-700 mb-2"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-300"
            />
          </div>

          <div>
            <label
              htmlFor="category"
              className="block font-medium text-gray-700 mb-2"
            >
              Select Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-300"
            >
              <option value="" disabled>
                Select
              </option>
              <option value={"sports"}>{"sports"}</option>
              <option value={"arts"}>{"arts"}</option>
              <option value={"food"}>{"food"}</option>
              <option value={"family"}>{"family"}</option>
              <option value={"music"}>{"music"}</option>
            </select>
          </div>
          {/* Select Event */}
          {formData.category && (
                 <div>
                 <label
                   htmlFor="event"
                   className="block font-medium text-gray-700 mb-2"
                 >
                   Select Event
                 </label>
                 <select
                   name="event"
                   value={formData.event}
                   onChange={handleChange}
                   className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-300"
                 >
                   <option value="" disabled>
                     Select
                   </option>
                   {events.map((event, index) => (
                     <option key={index} value={event.name}>
                       {event.name}
                     </option>
                   ))}
                 </select>
               </div>
          )}
          {/* Number of Tickets */}
          <div>
            <label
              htmlFor="tickets"
              className="block font-medium text-gray-700 mb-2"
            >
              Number of Tickets
            </label>
            <input
              type="number"
              name="tickets"
              value={formData.tickets}
              min="1"
              onChange={handleChange}
              required
              className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-300"
            />
          </div>
          <div>
            <label
              htmlFor="dates"
              className="block font-medium text-gray-700 mb-2"
            >
              Date
            </label>
            <input
              type="text"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-300"
            />
          </div>
          <button
            type="submit"
            disabled={disabled}
            className="w-full bg-pink-600 text-white py-3 rounded-md font-semibold hover:bg-pink-700 transition duration-300"
          >
            {disabled ? "booking.." : "Book Now"}
          </button>
        </form>
      </div>

      {/* Event Information */}
      <section className="container mx-auto mt-16 max-w-4xl mb-4">
        <h2 className="text-3xl font-bold text-pink-600 mb-4 text-center">
          Featured Events
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {events.slice(0, 3).map((event, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300"
            >
              <img
                src={event.images[0].url}
                alt={`Event ${event.name} not found`}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-800">
                {event.name}
              </h3>
              <p className="text-gray-600">
                Join us for a great experience in {event.name}.
              </p>
              <button
                className="mt-4 bg-pink-600 text-white py-2 px-4 rounded-md hover:bg-pink-700 transition duration-300"
                onClick={() => handleBooking(event.id)}
              >
                Book Now
              </button>
            </div>
          ))}
        </div>
      </section>
<Footer/>
    </div>
  );
};

export default EventBooking;
