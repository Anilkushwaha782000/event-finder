"use client";
import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
const SearchFilterPage = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    category: 'sports',
    location: "",
  });
  const [loading, setLoading] = useState(true);
  const [feedbackMessage, setFeedbackMessage] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/classification?classification=${filters.category}`);
        const data = await res.json();
        const {
          _embedded: { events },
        } = data;
        setEvents(events);
        setFeedbackMessage("Events loaded successfully.");
        setTimeout(()=>{
          setFeedbackMessage('')
        },3000)
      } catch (error: unknown) {
        if (error instanceof Error) {
          setFeedbackMessage(`Error loading events: ${error.message}`);
        } else {
          setFeedbackMessage("Error loading events: An unknown error occurred.");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, [filters.category]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const filteredEvents = events.filter(
      (event) =>
        event.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (filters.location ? event._embedded.venues[0].city.name === filters.location : true)
    );
    setEvents(filteredEvents);
    setFeedbackMessage(`${filteredEvents.length} events found.`);
  };

  const handleResetFilters = () => {
    setSearchTerm("");
    setFilters({
      category: "",
      location: "",
    });
    setFeedbackMessage("Filters reset. All events loaded.");
  };
  const uniqueLocations = Array.from(
    new Set(
      events.map((event) => {
        const {
          _embedded: { venues },
        } = event;
        return venues[0].city.name;
      })
    )
  );

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="container mx-auto px-5 md:px-20">
        <h1 className="text-3xl font-bold text-center text-pink-600 mb-8">
          Event Search & Filter
        </h1>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="flex mb-8">
          <input
            type="text"
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow p-3 border border-pink-300 rounded-l-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-300"
          />
          <button
            type="submit"
            className="bg-pink-500 text-white p-3 rounded-r-md hover:bg-pink-600 transition duration-300 flex items-center"
          >
            <FaSearch className="mr-2" /> Search
          </button>
        </form>

        {/* Filters */}
        <div className="bg-white p-6 rounded-md shadow-lg mb-8">
          <h2 className="text-xl font-bold text-pink-500 mb-4">Filters</h2>

          <div className="flex flex-col space-y-4">
            <select
             value={filters.category}
              onChange={(e) =>
                setFilters({ ...filters, category: e.target.value })
              }
              className="p-3 border border-pink-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-300"
            >
              <option value="">Select Category</option>
              <option value="music">Music</option>
              <option value="art">Art</option>
              <option value="sports">Sports</option>
              <option value="food">Food</option>
              <option value="family">Family</option>
            </select>

            <select
              onChange={(e) =>
                setFilters({ ...filters, location: e.target.value })
              }
              className="p-3 border border-pink-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-300"
            >
              <option value="">Select Location</option>
              {uniqueLocations.map((location, idx) => (
                <option key={idx} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-6">
            <button
              onClick={handleResetFilters}
              className="bg-red-500 text-white p-3 rounded-md hover:bg-red-600 transition duration-300 w-full"
            >
              Reset Filters
            </button>
          </div>
        </div>

        {/* Feedback Message */}
        {feedbackMessage && (
          <div className="text-3xl text-center text-green-600 mb-4">
            {feedbackMessage}
          </div>
        )}
        {loading && (
          <div className="text-center text-gray-500">Loading events...</div>
        )}
      </div>
      <div className="max-w-5xl mx-auto">
      <div className="grid gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {
            events.map((event) => (
              <div
                key={event.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transform transition-all duration-300 ease-in-out"
              >
                <img
                  src={event.images[0].url}
                  alt={event.name}
                  className="w-full h-56 object-cover"
                />

                {/* Event Info */}
                <div className="p-6 flex flex-col justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-pink-700 mb-2">
                      {event.name}
                    </h2>
                    <p className="text-sm text-gray-500 mb-1">
                      <span>Date: </span>
                      {event.dates.start.localDate}
                    </p>
                    <p className="text-sm text-gray-500 mb-4">
                      <span>City- </span>
                      {event._embedded.venues[0].city.name}
                    </p>
                    <p className="text-gray-700 mb-6 line-clamp-3">
                      {event.description}
                    </p>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchFilterPage;
