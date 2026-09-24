import { services } from "../data.js";
import TiltCard from "./TiltCard.jsx";

export default function Services() {
  return (
    <section id="services">
      <div className="wrap">
        <div className="head">
          <span className="tag">04</span>
          <h2>Services</h2>
        </div>
        <div className="services">
          {services.map((s) => (
            <TiltCard className="service" key={s.title}>
              <h3>{s.title}</h3>
              <p>{s.description}</p>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
