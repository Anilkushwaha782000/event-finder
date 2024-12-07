"use client";
import { useState } from "react";
import Link from "next/link";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const profileOpen = () => {
    setIsProfileOpen(!isProfileOpen);
    console.log("Inside profile open >>", isProfileOpen);
  };
  const handleLogout = () => {
    signOut();
    router.push("/auth");
  };
  return (
    <nav className="bg-white shadow-lg relative">
      <div className="container mx-auto flex justify-between items-center p-4">
        <div className="text-2xl font-bold text-pink-600">
          <Link href="/">Eventify</Link>
        </div>
        <div className="hidden md:flex space-x-4 items-center">
          <Link
            href="/event"
            className="text-gray-700 hover:text-pink-600 transition"
          >
            Events
          </Link>
          <Link
            href="/about"
            className="text-gray-700 hover:text-pink-600 transition"
          >
            About
          </Link>
          <Link
            href="/search"
            className="text-gray-700 hover:text-pink-600 transition"
          >
            Search
          </Link>
          {session?.user?.name ? (
            <div
              className="flex items-center space-x-3 cursor-pointer"
              onClick={() => profileOpen()}
            >
              {session?.user?.image && (
                <img
                  src={session.user.image}
                  alt="Profile"
                  className="w-8 h-8 rounded-full"
                />
              )}
              {!session?.user?.image && (
                <span
                  className="bg-pink-600 text-white rounded-full p-2 flex items-center justify-center w-12 h-12 hover:bg-pink-700 transition cursor-pointer"
                  title="Click to logout"
                  onClick={() => profileOpen()}
                >
                  {session.user.name}
                </span>
              )}
            </div>
          ) : (
            <Link href="/auth">
              <button className="bg-pink-700 text-white px-4 py-2 rounded-full hover:bg-pink-800 hover:text-pink-100 transition">
                Login
              </button>
            </Link>
          )}
        </div>
        <div className="md:hidden">
          <div className="flex flex-row gap-2">
            <button
              onClick={toggleMenu}
              className="text-gray-700 focus:outline-none"
            >
              {isOpen ? (
                <AiOutlineClose size={24} />
              ) : (
                <AiOutlineMenu size={24} />
              )}
            </button>
            <span
              className="bg-pink-600 text-white rounded-full p-2 flex items-center justify-center w-12 h-12 hover:bg-pink-700 transition cursor-pointer"
              title="Click to logout"
              onClick={() => profileOpen()}
            >
              {session?.user?.name}
            </span>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="flex flex-col p-4">
            <Link
              href="/"
              className="py-2 text-gray-700 hover:text-pink-600 transition"
            >
              Home
            </Link>
            <Link
              href="/event"
              className="py-2 text-gray-700 hover:text-pink-600 transition"
            >
              Events
            </Link>
            <Link
              href="/about"
              className="py-2 text-gray-700 hover:text-pink-600 transition"
            >
              About
            </Link>
            <Link
              href="/search"
              className="py-2 text-gray-700 hover:text-pink-600 transition"
            >
              Search
            </Link>
          </div>
        </div>
      )}
      {isProfileOpen && (
        <div className="absolute  right-4 top-14 sm:top-10 sm:right-24 z-10 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            <Link
              href="/profile"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Profile
            </Link>
            <Link
              href="/myevent"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              My event
            </Link>
            <button
              onClick={() => handleLogout()}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
