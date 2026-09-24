import { useEffect, useRef } from "react";
import { createAtomScene } from "../three/AtomScene.js";

export default function Hero() {
  const canvasHostRef = useRef(null);

  useEffect(() => {
    if (!canvasHostRef.current) return;
    const cleanup = createAtomScene(canvasHostRef.current);
    return cleanup;
  }, []);

  return (
    <section className="hero">
      <div className="wrap hero-inner">
        <div className="hero-text">
          <span className="eyebrow">Full Stack Developer · Lagos, Nigeria</span>
          <h1>
            From physics to production — I build complete web
            applications, end to end.
          </h1>
          <p className="lede">
            Chukwuemeka Tobechukwu, i builds full stack web applications with
            React, Python/Flask, and MySQL — most recently Univista News
            Hub, a complete news platform i designed, built, and deployed
            to production, bringing the same structured thinking from a
            physics degree into every layer of the stack.
          </p>
          <div className="hero-actions">
            <a href="#work" className="btn btn-solid">See the work</a>
            <a href="/cv.docx" download className="btn btn-ghost">
              Download CV
            </a>
          </div>
          <div className="hero-photo">
            <img src="/headshot.jpg" alt="Chukwuemeka Tobechukwu" />
          </div>
        </div>
        <div className="hero-scene" ref={canvasHostRef} aria-hidden="true" />
      </div>
    </section>
  );
}
