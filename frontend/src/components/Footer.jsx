import { Facebook, Twitter, Instagram, Github } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 border-t border-gray-200 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo & About */}
        <div>
          <Link to="/">
            <div className="flex items-center space-x-2 cursor-pointer py-4">
              <span className="text-3xl" role="img" aria-label="leaf">
                🍃
              </span>
              <h1 className="text-xl font-extrabold text-brandGreen select-none">
                Natural Event
              </h1>
            </div>
          </Link>
          <p className="text-sm text-gray-600 mt-2">
            Plan, manage, and join natural events with ease. We bring people
            together through shared moments.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-sm font-semibold text-gray-800 uppercase tracking-wide">
            Quick Links
          </h3>
          <ul className="mt-3 space-y-2 text-sm text-gray-600">
            <li>
              <Link to="/" className="hover:text-brandGreen transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/events" className="hover:text-brandGreen transition">
                All Events
              </Link>
            </li>
            <li>
              <Link to="/add-event" className="hover:text-brandGreen transition">
                Add Event
              </Link>
            </li>
            <li>
              <Link to="/my-events" className="hover:text-brandGreen transition">
                My Events
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-sm font-semibold text-gray-800 uppercase tracking-wide">
            Contact
          </h3>
          <ul className="mt-3 text-sm text-gray-600 space-y-1">
            <li>Email: support@naturalevent.com</li>
            <li>Phone: +880 1234 567890</li>
            <li>Address: Dhaka, Bangladesh</li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-sm font-semibold text-gray-800 uppercase tracking-wide">
            Follow Us
          </h3>
          <div className="flex space-x-4 mt-3 text-brandGreen text-[20px]">
            <a
              href="#"
              aria-label="Facebook"
              className="hover:text-emerald-600 transition"
            >
              <Facebook size={20} />
            </a>
            <a
              href="#"
              aria-label="Twitter"
              className="hover:text-emerald-600 transition"
            >
              <Twitter size={20} />
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="hover:text-emerald-600 transition"
            >
              <Instagram size={20} />
            </a>
            <a
              href="#"
              aria-label="Github"
              className="hover:text-emerald-600 transition"
            >
              <Github size={20} />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 text-center text-sm text-gray-500 py-4">
        <span>&copy; {year} Natural Event. All rights reserved.</span> <br />
        <span>Developed by <a target="_blank" href="https://abdullah-al-akash.netlify.app"><span className="text-brandGreen hover:cursor-pointer underline">Abdullah Al Akash</span></a> </span>
      </div>
    </footer>
  );
}
