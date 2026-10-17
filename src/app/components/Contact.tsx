"use client";

import { useState } from "react";
import emailjs from "@emailjs/browser";

const EMAILJS_CONFIG = {
  SERVICE_ID: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "service_b2dq42j",
  TEMPLATE_ID: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "template_5instcm",
  PUBLIC_KEY: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "sc4c-b77Le4pb00RS",
};

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Client-side email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setSubmitStatus("error");
      setStatusMessage("Please provide a valid email address.");
      return;
    }

    if (formData.name.trim().length < 2) {
      setSubmitStatus("error");
      setStatusMessage("Please enter your name.");
      return;
    }

    if (formData.message.trim().length < 5) {
      setSubmitStatus("error");
      setStatusMessage("Please enter a message with at least 5 characters.");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");
    setStatusMessage("");

    try {
      const templateParams = {
        title: "New Portfolio Contact Message",
        name: formData.name.trim(),
        email: formData.email.trim(),
        message: formData.message.trim(),
        time: new Date().toLocaleString(),
      };

      const result = await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        templateParams,
        EMAILJS_CONFIG.PUBLIC_KEY,
      );

      if (result.status === 200) {
        setSubmitStatus("success");
        setStatusMessage(
          "Thank you for reaching out. I have received your message and will respond promptly.",
        );
        setFormData({ name: "", email: "", message: "" });
      } else {
        throw new Error(`Failed to send message. Status: ${result.status}`);
      }
    } catch (error: unknown) {
      console.error("EmailJS full error:", error);
      const message =
        error instanceof Error
          ? error.message
          : typeof error === "object" && error !== null && "text" in error
            ? String((error as { text?: unknown }).text)
            : "Unknown error";

      setSubmitStatus("error");
      setStatusMessage(`Message sending failed: ${message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="portfolio-section contact-section" aria-labelledby="contact-heading">
      <div className="section-shell contact-layout">
        <div className="contact-copy">
          <span className="section-kicker">Get In Touch</span>
          <h2 id="contact-heading">Let&apos;s Build Reliable Software Together</h2>
          <p>
            Whether you need a Full-Stack Developer to build a Laravel or Node.js
            backend, engineer a RESTful API, build a responsive web interface, or
            automate data workflows with n8n, I am open for select engineering
            opportunities and project collaborations.
          </p>
          <div className="contact-links">
            <a href="mailto:bouhouchhamza075@gmail.com" aria-label="Send email to Hamza Bouhouch">
              bouhouchhamza075@gmail.com
            </a>
            <span>Location: Morocco · Open for Remote Collaborations</span>
            <span>Response Time: Typically within 24 hours</span>
          </div>
        </div>

        <div className="contact-form-container glass-panel">
          <form onSubmit={handleSubmit} className="contact-form" noValidate>
            <div>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                autoComplete="name"
                required
              />
            </div>

            <div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                autoComplete="email"
                required
              />
            </div>

            <div>
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                placeholder="Describe your project, timeline, or engineering inquiry..."
                required
              />
            </div>

            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>

            {submitStatus !== "idle" && (
              <div
                className={`form-status ${submitStatus}`}
                role="status"
                aria-live="polite"
              >
                {statusMessage}
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
