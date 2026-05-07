"use client";

import { useState } from "react";
import emailjs from "@emailjs/browser";

const EMAILJS_CONFIG = {
  SERVICE_ID: "service_b2dq42j",
  TEMPLATE_ID: "template_5instcm",
  PUBLIC_KEY: "sc4c-b77Le4pb00RS",
};

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">(
    "idle"
  );
  const [statusMessage, setStatusMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsSubmitting(true);
    setSubmitStatus("idle");
    setStatusMessage("");

    try {
      const templateParams = {
        title: "New Portfolio Contact Message",
        name: formData.name,
        email: formData.email,
        message: formData.message,
        time: new Date().toLocaleString(),
      };

      const result = await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        templateParams,
        EMAILJS_CONFIG.PUBLIC_KEY
      );

      if (result.status === 200) {
        setSubmitStatus("success");
        setStatusMessage("Thank you for your message! I'll get back to you soon.");
        setFormData({
          name: "",
          email: "",
          message: "",
        });
      } else {
        throw new Error(`Failed to send message. Status: ${result.status}`);
      }
    } catch (error: any) {
      console.error("EmailJS full error:", error);
      console.error("Status:", error?.status);
      console.error("Text:", error?.text);

      setSubmitStatus("error");
      setStatusMessage(
        `Email sending failed: ${error?.text || error?.message || "Unknown error"}`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="contact-section py-20 px-4 sm:px-6 lg:px-8 relative z-20"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-16">
          Get In Touch
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-semibold text-white mb-6">
              Contact Information
            </h3>

            <div className="space-y-4">
              <div className="flex items-center">
                <span className="text-purple-400 mr-4">📧</span>
                <span className="text-gray-200">
                  bouhouchhamza075@gmail.com
                </span>
              </div>

              <div className="flex items-center">
                <span className="text-purple-400 mr-4">📍</span>
                <span className="text-gray-200">Morocco</span>
              </div>

              <div className="flex items-center">
                <span className="text-purple-400 mr-4">💼</span>
                <span className="text-gray-200">Available for Projects</span>
              </div>
            </div>
          </div>

          <div className="contact-form-container p-8 rounded-2xl border border-purple-500/30 shadow-2xl shadow-purple-500/20">
            <form onSubmit={handleSubmit} className="contact-form space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-white mb-2 font-medium"
                >
                  Name
                </label>

                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-900/50 border border-purple-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all"
                  placeholder="Your name"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-white mb-2 font-medium"
                >
                  Email
                </label>

                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-900/50 border border-purple-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all"
                  placeholder="your.email@example.com"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-white mb-2 font-medium"
                >
                  Message
                </label>

                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 bg-gray-900/50 border border-purple-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all resize-none"
                  placeholder="Your message..."
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-3 rounded-full font-medium hover:from-purple-600 hover:to-blue-600 transition-all glow shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>

              {submitStatus !== "idle" && (
                <div
                  className={`p-4 rounded-lg text-center font-medium ${
                    submitStatus === "success"
                      ? "bg-green-500/20 border border-green-500/50 text-green-300"
                      : "bg-red-500/20 border border-red-500/50 text-red-300"
                  }`}
                >
                  {statusMessage}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}