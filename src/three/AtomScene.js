import * as THREE from "three";

/**
 * Builds and animates a wireframe "atom" — a nucleus with three tilted
 * elliptical orbit rings, each carrying a glowing electron. Mounts into
 * the given container element and returns a cleanup function.
 */
export function createAtomScene(container) {
  const width = container.clientWidth;
  const height = container.clientHeight;

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
  camera.position.z = 9;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);

  const group = new THREE.Group();
  scene.add(group);

  // Nucleus
  const nucleusGeo = new THREE.IcosahedronGeometry(0.9, 1);
  const nucleusMat = new THREE.MeshBasicMaterial({
    color: 0x7c6cff,
    wireframe: true,
    transparent: true,
    opacity: 0.9,
  });
  const nucleus = new THREE.Mesh(nucleusGeo, nucleusMat);
  group.add(nucleus);

  const nucleusGlowGeo = new THREE.IcosahedronGeometry(0.9, 1);
  const nucleusGlowMat = new THREE.MeshBasicMaterial({
    color: 0x7c6cff,
    transparent: true,
    opacity: 0.06,
  });
  group.add(new THREE.Mesh(nucleusGlowGeo, nucleusGlowMat));

  // Orbits: each is a torus (ring), tilted at a different angle
  const orbitRadii = [2.4, 3.2, 4.0];
  const orbitTilts = [
    { x: 0.4, y: 0, z: 0.1 },
    { x: -0.5, y: 1.0, z: 0.3 },
    { x: 0.9, y: -0.6, z: -0.2 },
  ];

  const orbitGroups = [];
  const electrons = [];

  orbitRadii.forEach((radius, i) => {
    const orbitGeo = new THREE.TorusGeometry(radius, 0.008, 8, 100);
    const orbitMat = new THREE.MeshBasicMaterial({
      color: 0x4cd9e0,
      transparent: true,
      opacity: 0.35,
    });
    const orbitMesh = new THREE.Mesh(orbitGeo, orbitMat);

    const orbitGroup = new THREE.Group();
    orbitGroup.rotation.set(orbitTilts[i].x, orbitTilts[i].y, orbitTilts[i].z);
    orbitGroup.add(orbitMesh);

    const electronGeo = new THREE.SphereGeometry(0.14, 16, 16);
    const electronMat = new THREE.MeshBasicMaterial({ color: 0x4cd9e0 });
    const electron = new THREE.Mesh(electronGeo, electronMat);
    electron.position.set(radius, 0, 0);
    orbitGroup.add(electron);

    group.add(orbitGroup);
    orbitGroups.push(orbitGroup);
    electrons.push({ mesh: electron, radius, speed: 0.6 + i * 0.35, angle: i * 2 });
  });

  // Mouse parallax (subtle tilt of the whole group, no drag/controls needed)
  let targetRotX = 0;
  let targetRotY = 0;
  function handlePointerMove(e) {
    const rect = container.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    targetRotY = nx * 0.35;
    targetRotX = ny * 0.25;
  }
  window.addEventListener("pointermove", handlePointerMove);

  let frameId;
  const clock = new THREE.Clock();

  function animate() {
    const dt = clock.getDelta();
    const t = clock.getElapsedTime();

    nucleus.rotation.x += dt * 0.2;
    nucleus.rotation.y += dt * 0.3;

    electrons.forEach((e) => {
      e.angle += dt * e.speed;
      e.mesh.position.x = Math.cos(e.angle) * e.radius;
      e.mesh.position.z = Math.sin(e.angle) * e.radius;
    });

    group.rotation.y += (targetRotY - group.rotation.y) * 0.03;
    group.rotation.x += (targetRotX - group.rotation.x) * 0.03;
    group.rotation.z = Math.sin(t * 0.15) * 0.05;

    renderer.render(scene, camera);
    frameId = requestAnimationFrame(animate);
  }
  animate();

  function handleResize() {
    const w = container.clientWidth;
    const h = container.clientHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  }
  window.addEventListener("resize", handleResize);

  return function cleanup() {
    cancelAnimationFrame(frameId);
    window.removeEventListener("resize", handleResize);
    window.removeEventListener("pointermove", handlePointerMove);
    renderer.dispose();
    if (renderer.domElement.parentNode) {
      renderer.domElement.parentNode.removeChild(renderer.domElement);
    }
  };
}
