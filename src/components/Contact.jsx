import { useState } from "react";
import emailjs from "@emailjs/browser";
import { contactLinks } from "../data.js";

const EMAILJS_SERVICE_ID = "service_c9fw4k6";
const EMAILJS_TEMPLATE_ID = "template_120xf7b";
const EMAILJS_PUBLIC_KEY = "6HH-2Mr9AHS3xLy7s";

const ICONS = {
  GITHUB: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.48 0-.24-.01-.87-.01-1.71-2.78.62-3.37-1.36-3.37-1.36-.45-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.31.1-2.73 0 0 .84-.28 2.75 1.05a9.3 9.3 0 0 1 5 0c1.91-1.33 2.75-1.05 2.75-1.05.55 1.42.2 2.47.1 2.73.64.72 1.03 1.63 1.03 2.75 0 3.94-2.35 4.8-4.58 5.06.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.59.69.48A10.26 10.26 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z" />
    </svg>
  ),
  LINKEDIN: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
      <path d="M6.94 5a2 2 0 1 1-4-.02 2 2 0 0 1 4 .02ZM7 8.48H3V21h4V8.48Zm6.32 0H9.34V21h3.94v-6.57c0-3.66 4.77-3.96 4.77 0V21H22v-7.93c0-6.17-7.06-5.94-8.68-2.91V8.48Z" />
    </svg>
  ),
  WHATSAPP: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
      <path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.6.1-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-1.5-.6-2.5-1.4-3.5-3-.3-.4 0-.4.2-.7.2-.2.4-.5.5-.7.2-.2.1-.4 0-.6-.1-.2-.6-1.5-.8-2-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.2-.9.9-.9 2.1s.9 2.4 1 2.6c.1.2 1.6 2.5 4 3.4 2 .8 2.4.6 2.8.6.5-.1 1.6-.6 1.8-1.3.2-.6.2-1.1.1-1.2-.1-.1-.3-.2-.6-.3ZM12 2a10 10 0 0 0-8.5 15.2L2 22l4.9-1.5A10 10 0 1 0 12 2Z" />
    </svg>
  ),
};

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle");

  const textLinks = contactLinks.filter((c) => c.label === "EMAIL" || c.label === "PHONE");
  const iconLinks = contactLinks.filter((c) => c.label !== "EMAIL" && c.label !== "PHONE");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        { name: form.name, email: form.email, message: form.message, time: new Date().toLocaleString() },
        EMAILJS_PUBLIC_KEY
      );
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setStatus("error");
    }
  }

  return (
    <section id="contact" style={{ borderBottom: "none" }}>
      <div className="wrap">
        <div className="contact-grid">
          <div>
            <span className="fig mono">FIG. 06 — CONTACT</span>
            <h2 style={{ marginTop: 10 }}>Let's build something together</h2>
            <p style={{ color: "var(--ink-soft)", marginTop: 16, maxWidth: "44ch" }}>
              Open to contract and freelance frontend work. Reach out directly, or use the form.
            </p>

            <ul className="contact-list">
              {textLinks.map((c) => (
                <li key={c.label}>
                  <span className="k">{c.label}</span>
                  <a href={c.href} target="_blank" rel="noopener noreferrer">
                    {c.value}
                  </a>
                </li>
              ))}
            </ul>

            <div className="contact-icons">
              {iconLinks.map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={c.label}
                  title={c.label}
                  className="contact-icon-btn"
                >
                  {ICONS[c.label]}
                </a>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-field">
              <label htmlFor="name">Name</label>
              <input id="name" name="name" type="text" required value={form.name} onChange={handleChange} />
            </div>
            <div className="form-field">
              <label htmlFor="email">Email</label>
              <input id="email" name="email" type="email" required value={form.email} onChange={handleChange} />
            </div>
            <div className="form-field">
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" required value={form.message} onChange={handleChange} />
            </div>
            <button type="submit" className="btn btn-solid" disabled={status === "sending"}>
              {status === "sending" ? "Sending…" : "Send message"}
            </button>
            {status === "sent" && (
              <p className="success-msg" style={{ marginTop: 12 }}>
                Message sent — thanks for reaching out!
              </p>
            )}
            {status === "error" && (
              <p className="error-msg" style={{ marginTop: 12 }}>
                Something went wrong. Please try again.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
