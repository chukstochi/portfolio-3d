export default function About() {
  return (
    <section id="about">
      <div className="wrap">
        <div className="head">
          <span className="tag">01</span>
          <h2>About</h2>
        </div>
        <div className="about-grid">
          <div>
            <p>
              I started in physics, not code — and that turned out to matter
              more than I expected. Breaking a problem down to its actual
              mechanics before reaching for a fix is a habit that carries
              directly into development work: fewer guesses, more diagnosis.
            </p>
            <p>
              Since 2020 I've worked across contract roles and freelance
              projects — including building Univista News Hub end-to-end,
              from the React frontend through a Python/Flask backend, MySQL
              database, and production deployment — with a consistent focus
              on shipping things that actually work in the real world.
            </p>
          </div>
          <ul className="facts">
            <li><span>Location</span><span>Lagos, Nigeria</span></li>
            <li><span>Education</span><span>B.Sc. Physics, AAU (2018)</span></li>
            <li> <span>FOCUS</span><span>Full Stack Development</span></li>
            <li><span>Availability</span><span>Contract &amp; freelance</span></li>
            <li><span>Building since</span><span>2020</span></li>
          </ul>
        </div>
      </div>
    </section>
  );
}
