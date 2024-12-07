"use client"
import React from 'react'
import {
    AiOutlineInstagram,
    AiOutlineTwitter,
    AiOutlineFacebook,
  } from "react-icons/ai";
function Footer() {
  return (
    <footer className="bg-pink-600 text-white py-8">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-xl font-semibold mb-4">Eventify</h3>
          <p className="text-gray-200 mb-4">
            We are committed to providing the best services and solutions to
            help you achieve your business goals.
          </p>
          <p className="text-gray-200">
            © {new Date().getFullYear()} Eventify. All rights
            reserved.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul className="text-gray-200 space-y-2">
            <li>
              <a href="#about" className="hover:text-gray-100">
                About Us
              </a>
            </li>
            <li>
              <a href="#services" className="hover:text-gray-100">
                Services
              </a>
            </li>
            <li>
              <a href="#team" className="hover:text-gray-100">
                Meet the Team
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:text-gray-100">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
          <div className="flex space-x-4 text-2xl">
            <a href="#" className="hover:text-gray-100">
              <AiOutlineInstagram />
            </a>
            <a href="#" className="hover:text-gray-100">
              <AiOutlineTwitter />
            </a>
            <a href="#" className="hover:text-gray-100">
              <AiOutlineFacebook />
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
  )
}

export default Footer