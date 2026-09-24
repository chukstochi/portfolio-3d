import { useRef } from "react";

/**
 * Wraps any content in a card that tilts in 3D toward the cursor on hover.
 * Pure CSS transform, no three.js needed for this lightweight effect.
 */
export default function TiltCard({ children, className = "" }) {
  const ref = useRef(null);

  function handleMouseMove(e) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(700px) rotateX(${-y * 8}deg) rotateY(${x * 10}deg) translateZ(4px)`;
  }

  function handleMouseLeave() {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "perspective(700px) rotateX(0deg) rotateY(0deg) translateZ(0px)";
  }

  return (
    <div
      ref={ref}
      className={`tilt-card ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
}
