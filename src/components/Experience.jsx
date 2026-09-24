import { experience } from "../data.js";

export default function Experience() {
  return (
    <section id="experience">
      <div className="wrap">
        <div className="head">
          <span className="tag">03</span>
          <h2>Experience</h2>
        </div>
        <div className="timeline">
          {experience.map((item) => (
            <div className="t-item" key={item.n}>
              <div className="date">{item.date}</div>
              <div>
                <h3>{item.role}</h3>
                <div className="org">{item.org}</div>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
