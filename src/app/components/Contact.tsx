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
        EMAILJS_CONFIG.PUBLIC_KEY,
      );

      if (result.status === 200) {
        setSubmitStatus("success");
        setStatusMessage(
          "Thank you for your message. I will get back to you soon.",
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
      setStatusMessage(`Email sending failed: ${message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="portfolio-section contact-section">
      <div className="section-shell contact-layout">
        <div className="contact-copy">
          <span className="section-kicker">Contact</span>
          <h2>Hire a Full Stack Developer in Morocco</h2>
          <p>
            Looking for a Laravel Developer, React Developer, Next.js Developer,
            Full Stack Developer, Shopify Developer, WordPress Developer, or AI
            Automation Engineer? Let's discuss your custom web application, SaaS
            product, e-commerce platform, mobile app, n8n workflow, or AI
            automation system. I collaborate with startups, agencies, and
            businesses worldwide to build scalable digital products, streamline
            operations, and create high-performance software solutions.
          </p>
          <div className="contact-links">
            <a href="mailto:bouhouchhamza075@gmail.com">
              bouhouchhamza075@gmail.com
            </a>
            <span>Serving clients across the worldwide</span>
            <span>Available for projects</span>
          </div>
        </div>

        <div className="contact-form-container glass-panel">
          <form onSubmit={handleSubmit} className="contact-form">
            <div>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
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
                placeholder="Tell me what you want to build..."
                required
              />
            </div>

            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Sending..." : "Get in Touch"}
            </button>

            {submitStatus !== "idle" && (
              <div className={`form-status ${submitStatus}`}>
                {statusMessage}
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
