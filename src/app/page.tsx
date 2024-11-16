"use client"
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AiOutlineSearch } from "react-icons/ai";
import Link from "next/link";
import Footer from "./component/Footer";
export default function Home() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router=useRouter()
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("/api/events");
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
  }, []);
  const handleCategory=(category:string)=>{
    router.push(`/classification/${category}`);
  }
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <header className="bg-pink-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">
            Discover Local Events Around You
          </h1>
          <p className="text-lg mb-6">
            Find personalized events and things to do in your area.
          </p>

          {/* Search Bar */}
          <div className="flex justify-center">
            <div className="relative w-2/3 md:w-1/2">
            <span className="font-bold text-lg text-white">Join the Fun—Discover Vibrant Local Events!</span>
            </div>
          </div>
        </div>
      </header>

      {/* Event Categories */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-semibold mb-6">
            Explore Popular Categories
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {[
              "Music",
              "Sports",
              "Arts",
              "Food",
              "Family",
            ].map((category) => (
              <div
                key={category}
                className="bg-blue-100 p-4 rounded-lg text-center hover:bg-blue-200"
              >
                <button className="text-lg font-medium w-full" onClick={()=>handleCategory(category)}>{category}</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Personalized Recommendations */}
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-semibold mb-6">
            Events Recommended For You
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Example Events */}
            {events.slice(0,4)
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
                      Event Title {item.name}
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
      </section>
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-semibold mb-6">Featured Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.slice(4,10)
              .map((item,index) => (
                <div
                  key={index}
                  className="bg-white shadow-lg rounded-lg overflow-hidden"
                >
                  <img
                    src={item.images[0].url}
                    alt={`Featured Event ${index + 1}`}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-xl font-semibold mb-2">
                      Featured Event {item.name}
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
      </section>
      <section className="bg-green-100 text-pink-600 py-8">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-semibold mb-4">
            Sign up for personalized event recommendations!
          </h3>
          <Link href={'/auth'} className="bg-pink-600 text-white font-semibold py-4 px-8 rounded-lg hover:bg-pink-700">
            Create an Account
          </Link>
        </div>
      </section>

      <Footer/>
    </div>
  );
}
