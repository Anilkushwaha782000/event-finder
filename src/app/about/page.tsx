"use client";
import { useState } from "react";
import { AiOutlineMail, AiOutlineUser, AiOutlineMessage, AiOutlineInstagram, AiOutlineTwitter, AiOutlineFacebook } from "react-icons/ai";
interface FormData {
  name: string;
  email: string;
  message: string;
  subject:string;
}

const AboutContactPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
    subject:""
  });

  const [submitted, setSubmitted] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const testimonials=[{
    name: "John Doe",
    Position: "Senior Vice President",
    image: "https://cdn.pixabay.com/photo/2015/04/13/12/07/business-720429_640.jpg"
  },
  {
    name: "Homiyar",
    Position: "Senior manager",
    image: "https://cdn.pixabay.com/photo/2019/12/16/14/46/black-man-4699506_960_720.jpg"
  },
  {
    name: "Alexa",
    Position: "CEO",
    image: "https://cdn.pixabay.com/photo/2024/04/13/02/53/ai-generated-8693088_640.jpg"
  }
]
const workspace=[{
  image: "https://cdn.pixabay.com/photo/2024/08/19/00/17/uturistic-control-room-8979122_640.jpg"
},
{
  image: "https://cdn.pixabay.com/photo/2024/07/14/13/45/ai-generated-8894579_640.jpg"
},
{
  image: "https://cdn.pixabay.com/photo/2024/07/06/10/04/ai-generated-8876530_640.png"
}
]
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
    
      const result = await response.json();
      alert(result.message);
      setSubmitted(true);
      setError("");
      setFormData({ name: "", email: "", message: "",subject:"" }); // Reset form
    } catch (err) {
      setError("There was an error submitting the form.");
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-pink-600 to-pink-400 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">About Us</h1>
          <p className="text-lg mb-6">Learn more about our mission and team.</p>
        </div>
      </header>

      <div className="mx-auto max-w-7xl p-4">
        {/* About Section */}
        <section className="text-center my-12">
          <div className="rounded-lg">
            <p className="text-gray-700 mb-6 mx-auto max-w-3xl">
              Welcome to [Your Business Name]. We are dedicated to providing the best services to our customers. Our team is passionate about [brief description of your business focus].
            </p>
            <p className="text-gray-700 mb-4 mx-auto max-w-3xl">
              Established in [Year], we have been serving the community with [services/products you offer]. Our mission is to [your mission statement].
            </p>
          </div>
        </section>

        {/* Team Section */}
        <section className="my-12">
          <h2 className="text-3xl font-bold text-pink-500 mb-6 text-center">Meet Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {/* Team Members */}
            {testimonials.map((member, index) => (
              <div key={index} className="bg-white rounded-lg p-5 transition-transform transform hover:scale-105 hover:shadow-xl">
                <img src={member.image} alt={`Team Member ${index + 1}`} className="w-32 h-32 object-cover rounded-full mb-4" />
                <h3 className="text-xl font-semibold text-center">{member.name}</h3>
                <p className="text-gray-600 text-center">{member.Position}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section className="my-16">
          <h2 className="text-3xl font-bold text-pink-500 mb-8 text-center">Contact Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Contact Form */}
            <div className="bg-white shadow-md rounded-md p-8">
              <form onSubmit={handleSubmit}>
                {['name','subject','email', 'message'].map((field, index) => (
                  <div className="mb-4" key={index}>
                    <label className="block mb-2 font-medium text-gray-600" htmlFor={field}>
                      {field === "name" && <AiOutlineUser className="inline-block mr-2" />}
                      {field === "email" && <AiOutlineMail className="inline-block mr-2" />}
                      {field === "message" && <AiOutlineMessage className="inline-block mr-2" />}
                      {field.charAt(0).toUpperCase() + field.slice(1)}
                    </label>
                    {field !== 'message' ? (
                      <input
                        type={field}
                        name={field}
                        value={formData[field as keyof FormData]}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-300"
                        aria-label={`Your ${field.charAt(0).toUpperCase() + field.slice(1)}`}
                      />
                    ) : (
                      <textarea
                        name={field}
                        value={formData[field as keyof FormData]}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-300"
                        aria-label="Your Message"
                      ></textarea>
                    )}
                  </div>
                ))}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-pink-500 to-pink-600 text-white py-2 rounded-md hover:shadow-lg hover:scale-105 transition duration-300"
                >
                  Send Message
                </button>
              </form>

              {submitted && (
                <div className="mt-4 text-green-600 text-center">
                  Your message has been sent successfully!
                </div>
              )}
              {error && (
                <div className="mt-4 text-red-600 text-center">
                  {error}
                </div>
              )}
            </div>

            {/* Contact Information */}
            <div className="bg-gradient-to-r from-gray-100 to-gray-50 p-8 rounded-md shadow-md">
              <h3 className="text-2xl font-bold text-pink-500 mb-6">Our Contact Info</h3>
              <p className="text-gray-700 mb-4"><strong>Phone:</strong> +1 (123) 456-7890</p>
              <p className="text-gray-700 mb-4"><strong>Email:</strong> contact@yourbusiness.com</p>
              <p className="text-gray-700 mb-4"><strong>Location:</strong> 123 Business Rd, City, State, ZIP</p>
              <img src="/images/contact-map.jpg" alt="Map" className="w-full h-48 object-cover rounded-md shadow-md mt-6" />
            </div>
          </div>
        </section>

        {/* Additional Image Section */}
        <section className="my-12 text-center">
          <h2 className="text-3xl font-bold text-pink-500 mb-6">Our Workspace</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {workspace.map((img, index) => (
              <img key={index} src={img.image} alt={`Workspace Image ${index + 1}`} className="w-full h-48 object-cover rounded-md shadow-md" />
            ))}
          </div>
        </section>
      </div>
      <footer className="bg-pink-600 text-white py-8 mt-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Company Info */}
            <div>
              <h3 className="text-xl font-semibold mb-4">[Your Business Name]</h3>
              <p className="text-gray-200 mb-4">
                We are committed to providing the best services and solutions to help you achieve your business goals.
              </p>
              <p className="text-gray-200">© {new Date().getFullYear()} [Your Business Name]. All rights reserved.</p>
            </div>

            {/* Navigation Links */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
              <ul className="text-gray-200 space-y-2">
                <li><a href="#about" className="hover:text-gray-100">About Us</a></li>
                <li><a href="#services" className="hover:text-gray-100">Services</a></li>
                <li><a href="#team" className="hover:text-gray-100">Meet the Team</a></li>
                <li><a href="#contact" className="hover:text-gray-100">Contact</a></li>
              </ul>
            </div>

            {/* Social Media */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
              <div className="flex space-x-4 text-2xl">
                <a href="#" className="hover:text-gray-100"><AiOutlineInstagram /></a>
                <a href="#" className="hover:text-gray-100"><AiOutlineTwitter /></a>
                <a href="#" className="hover:text-gray-100"><AiOutlineFacebook /></a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AboutContactPage;
