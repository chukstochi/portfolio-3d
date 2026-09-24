import { projects } from "../data.js";
import TiltCard from "./TiltCard.jsx";

export default function Work() {
  return (
    <section id="work">
      <div className="wrap">
        <div className="head">
          <span className="tag">05</span>
          <h2>Selected work</h2>
        </div>
        <div className="work-grid">
          {projects.map((p) => (
            <TiltCard className="work-card" key={p.title}>
              <a href={p.url} target="_blank" rel="noopener noreferrer">
                <h3>{p.title}</h3>
                <p>{p.description}</p>
                <span className="visit">{p.label} ↗</span>
              </a>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
