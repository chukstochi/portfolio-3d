import { useEffect, useState } from "react";
import { navLinks } from "../data.js";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("about");

  useEffect(() => {
    const sections = navLinks.map((l) => document.getElementById(l.id)).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="site-header">
      <div className="nav-inner">
        <div className="nav-mark">
          Tobechukwu<span className="dot">.</span>
        </div>
        <button className="nav-toggle" aria-label="Toggle menu" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
          <span></span><span></span><span></span>
        </button>
        <ul className={`nav-links${open ? " open" : ""}`}>
          {navLinks.map((l) => (
            <li key={l.id}>
              <a href={`#${l.id}`} className={active === l.id ? "active" : ""} onClick={() => setOpen(false)}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
