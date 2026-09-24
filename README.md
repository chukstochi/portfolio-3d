# Chukwuemeka Tobechukwu — Portfolio (3D)

Same portfolio content, rewritten, with a real 3D centerpiece: a wireframe
"atom" (nucleus + orbiting electrons) built in three.js, plus 3D tilt-on-hover
cards for skills, services, and work — a nod to a physics background applied
to frontend work.

## Run locally
```
npm install
npm run dev
```

## Build for production
```
npm run build
```
Output goes to `dist/` — deploy to Netlify, Vercel, or any static host.

## How the 3D pieces work
- `src/three/AtomScene.js` — vanilla three.js scene (no React wrapper library
  needed). Mounted into the hero via a ref in `src/components/Hero.jsx`.
  Rotates on its own and tilts subtly toward the cursor.
- `src/components/TiltCard.jsx` — a lightweight, pure-CSS 3D tilt effect used
  by skill/service/work cards. No three.js needed for this part — it's just a
  mouse-tracked `transform: perspective(...) rotateX/rotateY`.
- Respects `prefers-reduced-motion` by disabling the tilt-card transition
  (the three.js scene itself is decorative and low-motion by design, but you
  can add a full toggle later if needed).

## Notes
- No CV file or images are included yet. Add your CV as `public/cv.docx`
  (the "Download CV" button points to `/cv.docx`).
- Contact form has no backend — opens the visitor's email client instead.
