import { skillGroups } from "../data.js";
import TiltCard from "./TiltCard.jsx";

export default function Skills() {
  return (
    <section id="skills">
      <div className="wrap">
        <div className="head">
          <span className="tag">02</span>
          <h2>Skills</h2>
        </div>
        <div className="skill-groups">
          {skillGroups.map((group) => (
            <TiltCard className="skill-card" key={group.title}>
              <h3>{group.title}</h3>
              <ul>
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
