import { useState } from "react";
import emailjs from "@emailjs/browser";
import { contactLinks } from "../data.js";

const EMAILJS_SERVICE_ID = "service_c9fw4k6";
const EMAILJS_TEMPLATE_ID = "template_120xf7b";
const EMAILJS_PUBLIC_KEY = "6HH-2Mr9AHS3xLy7s";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

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
        {
          name: form.name,
          email: form.email,
          message: form.message,
          time: new Date().toLocaleString(),
        },
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
              Open to contract and freelance Full Stack Developer. Reach out directly, or use the form.
            </p>
            <ul className="contact-list">
              {contactLinks.map((c) => (
                <li key={c.label}>
                  <span className="k">{c.label}</span>
                  <a href={c.href} target="_blank" rel="noopener noreferrer">{c.value}</a>
                </li>
              ))}
            </ul>
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
            {status === "sent" && <p className="success-msg" style={{ marginTop: 12 }}>Message sent — thanks for reaching out!</p>}
            {status === "error" && <p className="error-msg" style={{ marginTop: 12 }}>Something went wrong. Please try again.</p>}
          </form>
        </div>
      </div>
    </section>
  );
}