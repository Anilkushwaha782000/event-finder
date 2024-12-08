"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import React, { useEffect } from "react";
import Loader from "../component/Loader";
import Footer from "../component/Footer";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
interface FormData {
  username: string;
  email: string;
  preferences: string;
  notifications: boolean;
}

const ProfilePage = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [formData, setFormData] = useState<FormData>({
    username:"",
    email: "",
    preferences: "",
    notifications: true,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [savedEvents, setsavedEvents] = useState<any[]>([]);
  useEffect(() => {
    if (session) {
      setFormData({
        username: session?.user?.name!,
        email: session?.user?.email!,
        preferences: "",
        notifications: true,
      });
    }
    const fetchSavedEvents = async () => {
      try {
        const res = await fetch("/api/getsavedeventdata");
        const data = await res.json();
        setsavedEvents(data);
        setLoading(false);
      } catch (err: unknown) {
        console.error("Error fetching events:", err);
        if (err instanceof Error) {
          setError(`Failed to load events: ${err.message}`);
        } else {
          setError("Failed to load events.");
        }
        setLoading(false);
      }
    };

    fetchSavedEvents();
  }, [session]);
  if (loading) {
    return <Loader />;
  }
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const target = e.target;
    setFormData({
      ...formData,
      [target.name]:
        target instanceof HTMLInputElement && target.type === "checkbox"
          ? target.checked
          : target.value,
    });
  };
  const handleLogout = () => {
    signOut();
    router.push("/auth");
  };
  const handleSubmit = async(e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/updateprofile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email
        }),
      });
      if(response.ok){
        const result = await response.json();
        if(session){
        console.log(result);
        }
        
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);  
      } else {
        setError("An unknown error occurred at client side.");
      }
    }
  };
  return (
    <div className="bg-pink-100 min-h-screen flex flex-col">
      <header className="bg-pink-600 text-white py-12 text-center rounded-lg shadow-lg mb-8">
        <h1 className="text-4xl font-bold">Profile Management</h1>
        <p className="text-lg">Manage your preferences and account settings</p>
      </header>

      <div className="container mx-auto max-w-4xl bg-white p-8 shadow-lg rounded-lg flex-grow relative">
        {/* Profile Image */}
        <div className="absolute top-4 right-4">
          <img
            src={session?.user?.image ||"https://cdn.pixabay.com/photo/2013/07/13/12/33/man-159847_1280.png"}
            alt="Profile"
            className="w-24 h-24 rounded-full border-2 border-pink-600"
          />
        </div>

        <h2 className="text-3xl font-bold text-pink-600 mb-8">User Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="username"
              className="block font-medium text-gray-700 mb-2"
            >
              Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
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

          {/* Preferences */}
          <div>
            <label
              htmlFor="preferences"
              className="block font-medium text-gray-700 mb-2"
            >
              Preferences
            </label>
            <textarea
              name="preferences"
              value={formData.preferences}
              onChange={handleChange}
              rows={4}
              className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-300"
            />
          </div>

          {/* Notifications */}
          <div className="flex items-center">
            <input
              type="checkbox"
              name="notifications"
              checked={formData.notifications}
              onChange={handleChange}
              className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
            />
            <label
              htmlFor="notifications"
              className="ml-2 block font-medium text-gray-700"
            >
              Receive Notifications
            </label>
          </div>
        </form>
        <button
          onClick={handleLogout}
          className="w-full bg-pink-600 text-white py-3 rounded-md font-semibold hover:bg-pink-700 transition duration-300 mt-4"
        >
          Logout
        </button>
      </div>
      {error &&(
        <p className="text-red-600">{error}</p>
      )}
      {/* Past Activity Section */}
      <section className="container mx-auto mt-16 mb-6 max-w-4xl bg-white p-8 shadow-lg rounded-lg">
        <h2 className="text-3xl font-bold text-pink-600 mb-4">Past Activity</h2>
        <ul className="space-y-4">
          {savedEvents.map((event, index) => (
            <li key={index} className="border-b pb-2">
              <p className="text-gray-800">
                {event.eventName} |  <span className="text-sm text-gray-500 mb-1">Date:{event.date} </span>
              </p>
            </li>
          ))}
        </ul>
      </section>
    <Footer/>
    </div>
  );
};

export default ProfilePage;
