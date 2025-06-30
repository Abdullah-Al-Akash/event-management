import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  RocketIcon,
  CalendarIcon,
  UsersIcon,
  ShieldCheckIcon,
  MessageSquareIcon,
  StarIcon,
} from "lucide-react";
import Footer from "../components/Footer";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const Section = ({ children }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {children}
    </motion.div>
  );
};

export default function Home() {
  return (
    <div className="bg-white text-gray-800">
      {/* Hero Section */}
      <Section>
        <div
          className="relative w-full min-h-[70vh] flex items-center justify-center text-center px-6 md:px-12"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1470&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-black opacity-50"></div>

          <motion.div
            className="relative max-w-4xl text-white z-10"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-3xl md:text-5xl font-extrabold mb-6 leading-tight">
              Discover & Join Natural Events Around You
            </h1>
            <p className="text-base md:text-lg mb-8 max-w-3xl mx-auto">
              Simplify your event management. Organize, share, and grow your community — all in one place.
            </p>
            <a
              href="/events"
              className="inline-block bg-brandGreen text-white px-6 py-3 rounded-md font-semibold shadow-lg hover:bg-emerald-700 transition"
            >
              Explore Events
            </a>
          </motion.div>
        </div>
      </Section>

      {/* Features Section */}
      <Section>
        <div className="bg-gray-50 py-16 px-6 md:px-12">
          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              {
                icon: <RocketIcon className="h-10 w-10 text-brandGreen mx-auto mb-4" />,
                title: "Fast Setup",
                desc: "Create and publish events in just a few clicks.",
              },
              {
                icon: <CalendarIcon className="h-10 w-10 text-brandGreen mx-auto mb-4" />,
                title: "Smart Calendar",
                desc: "Filter events by day, week, or month effortlessly.",
              },
              {
                icon: <UsersIcon className="h-10 w-10 text-brandGreen mx-auto mb-4" />,
                title: "Join & Manage",
                desc: "One-click join and track your participation.",
              },
              {
                icon: <ShieldCheckIcon className="h-10 w-10 text-brandGreen mx-auto mb-4" />,
                title: "Secure Access",
                desc: "Custom authentication with full control of your data.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition cursor-pointer"
                whileHover={{ y: -6 }}
              >
                {feature.icon}
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Testimonials Section */}
      <Section>
        <div className="py-16 px-6 md:px-12 max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-brandGreen mb-10">What People Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2].map((_, i) => (
              <motion.div
                key={i}
                className="p-6 border rounded-lg bg-gray-50"
                whileHover={{ scale: 1.03 }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <MessageSquareIcon className="text-brandGreen w-6 h-6" />
                  <h4 className="text-md font-semibold text-gray-800">
                    This app made our event planning stress-free!
                  </h4>
                </div>
                <p className="text-sm text-gray-600">
                  Highly recommend it to anyone planning community or personal events. Very intuitive
                  and responsive.
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Stats Section */}
      <Section>
        <div className="bg-gray-100 py-16 px-6 md:px-12">
          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 text-center gap-10">
            {[
              { label: "Events Created", value: "1.2K+" },
              { label: "Users Joined", value: "5K+" },
              { label: "Cities Covered", value: "30+" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                className="bg-white p-6 rounded-xl shadow-md"
                whileHover={{ scale: 1.05 }}
              >
                <StarIcon className="w-8 h-8 mx-auto text-brandGreen mb-3" />
                <h3 className="text-3xl font-bold text-brandGreen">{stat.value}</h3>
                <p className="text-gray-600 text-sm mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Call to Action Section */}
      <Section>
        <div className="py-16 px-6 md:px-12 bg-brandGreen text-white text-center rounded-lg max-w-4xl mx-auto my-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Manage Your Event?</h2>
          <p className="text-md md:text-lg max-w-xl mx-auto mb-8">
            Whether you're organizing a meetup, seminar, or celebration — Natural Event has you covered.
          </p>
          <a
            href="/add-event"
            className="inline-block bg-white text-brandGreen px-6 py-3 rounded-md font-medium hover:bg-gray-100 transition"
          >
            Add Your Event
          </a>
        </div>
      </Section>
    </div>
  );
}
