"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

/**
 * The SYNC cube, built as four interlocking pieces that match the regions of
 * the logo mark when seen from the logo's isometric angle:
 *
 *   navy   top-left strip + upper half of the left face
 *   blue   rest of the top + right half of the right face
 *   gray   the "J": inner strip of the right face + lower right of the left
 *   gray   lower-left block
 *
 * Coordinates are on a 2x2x2 cube (y up). The 0.22 channels between pieces
 * are the white gaps in the mark.
 */

type Box = [x0: number, x1: number, y0: number, y1: number, z0: number, z1: number];

type PieceDef = {
  name: string;
  color: string;
  boxes: Box[];
  /** Where the piece sits before it assembles, relative to its home */
  from: [number, number, number];
  /** Its tumble before it assembles (Euler radians) */
  spin: [number, number, number];
  /** Slice of scroll progress over which it travels home */
  window: [number, number];
};

const PIECES: PieceDef[] = [
  {
    name: "navy",
    color: "#07306f",
    boxes: [
      [0, 0.79, 1.21, 2, 0, 2],
      [0.79, 1.59, 1.21, 2, 1.71, 2],
      [1.59, 2, 1.81, 2, 1.71, 2],
    ],
    from: [-2.6, 1.9, 1.3],
    spin: [0.7, -0.9, 0.35],
    window: [0.04, 0.58],
  },
  {
    name: "blue",
    color: "#0070d6",
    boxes: [
      [1.01, 2, 1.81, 2, 0, 1.49],
      [1.01, 2, 0, 1.81, 0, 0.89],
      [1.01, 1.59, 1.21, 1.81, 0.89, 1.49],
    ],
    from: [2.8, 1.5, -1.9],
    spin: [-0.55, 1.0, -0.45],
    window: [0.14, 0.7],
  },
  {
    name: "gray-j",
    color: "#8497aa",
    boxes: [
      [1.81, 2, 0, 1.59, 1.11, 2],
      [1.01, 1.81, 0, 0.99, 1.11, 2],
    ],
    from: [1.7, -2.2, 2.4],
    spin: [0.45, 0.8, 0.65],
    window: [0.28, 0.84],
  },
  {
    name: "gray-block",
    color: "#8497aa",
    boxes: [[0, 0.79, 0, 0.99, 0, 2]],
    from: [-2.4, -1.9, 1.2],
    spin: [-0.75, -0.55, 0.5],
    window: [0.4, 0.96],
  },
];

const easeInOut = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
const clamp01 = (t: number) => Math.min(1, Math.max(0, t));

function Piece({
  def,
  progress,
}: {
  def: PieceDef;
  progress: React.RefObject<number>;
}) {
  const group = useRef<THREE.Group>(null);

  // Pivot each piece about its own centre so it tumbles in place.
  const { home, boxes } = useMemo(() => {
    const min = new THREE.Vector3(Infinity, Infinity, Infinity);
    const max = new THREE.Vector3(-Infinity, -Infinity, -Infinity);
    for (const [x0, x1, y0, y1, z0, z1] of def.boxes) {
      min.min(new THREE.Vector3(x0, y0, z0));
      max.max(new THREE.Vector3(x1, y1, z1));
    }
    const centre = min.clone().add(max).multiplyScalar(0.5);
    return {
      // -1 recentres the 0..2 cube on the origin
      home: centre.clone().subScalar(1),
      boxes: def.boxes.map(([x0, x1, y0, y1, z0, z1]) => ({
        size: [x1 - x0, y1 - y0, z1 - z0] as [number, number, number],
        position: [
          (x0 + x1) / 2 - centre.x,
          (y0 + y1) / 2 - centre.y,
          (z0 + z1) / 2 - centre.z,
        ] as [number, number, number],
      })),
    };
  }, [def]);

  useFrame(({ clock }) => {
    const g = group.current;
    if (!g) return;
    const [a, b] = def.window;
    const t = easeInOut(clamp01((progress.current - a) / (b - a)));
    const away = 1 - t;
    // A slow drift while apart, fading to nothing as the piece seats.
    const drift = Math.sin(clock.elapsedTime * 0.8 + home.x * 3) * 0.08 * away;
    g.position.set(
      home.x + def.from[0] * away,
      home.y + def.from[1] * away + drift,
      home.z + def.from[2] * away,
    );
    g.rotation.set(def.spin[0] * away, def.spin[1] * away, def.spin[2] * away);
  });

  return (
    <group ref={group}>
      {boxes.map((b, i) => (
        <mesh key={i} position={b.position}>
          <boxGeometry args={b.size} />
          <meshStandardMaterial
            color={def.color}
            roughness={0.5}
            metalness={0.12}
          />
        </mesh>
      ))}
    </group>
  );
}

function Rig({ progress }: { progress: React.RefObject<number> }) {
  const group = useRef<THREE.Group>(null);

  useFrame(({ camera, size }) => {
    // Turn the whole assembly into the logo's exact angle as it completes.
    const away = 1 - easeInOut(clamp01(progress.current / 0.96));

    // Pull back while the pieces are apart, then close in on the finished
    // cube. The canvas is 1.5x its layout box (see CubeSection), so 6.9 here
    // makes the cube fill ~75% of the box it visually sits in.
    const zoom = (Math.min(size.width, size.height) / 6.9) * (1 - 0.4 * away);
    if (Math.abs(camera.zoom - zoom) > 0.01) {
      camera.zoom = zoom;
      camera.updateProjectionMatrix();
    }

    const g = group.current;
    if (!g) return;
    g.rotation.set(0.35 * away, -1.5 * away, 0);
  });

  return (
    <group ref={group}>
      {PIECES.map((p) => (
        <Piece key={p.name} def={p} progress={progress} />
      ))}
    </group>
  );
}

export default function CubeScene({
  progress,
  active,
}: {
  /** 0 = apart, 1 = assembled. Read every frame; never triggers a re-render. */
  progress: React.RefObject<number>;
  /** Pause rendering while the section is off screen */
  active: boolean;
}) {
  return (
    <Canvas
      orthographic
      dpr={[1, 2]}
      frameloop={active ? "always" : "never"}
      // (1,1,1) is the logo's isometric view: +x face right, +z face left.
      camera={{ position: [10, 10, 10], near: 0.1, far: 100 }}
      onCreated={({ camera }) => camera.lookAt(0, 0, 0)}
      gl={{ antialias: true, alpha: true }}
      aria-hidden="true"
    >
      <ambientLight intensity={1.5} />
      {/* Key from above so the top face reads lightest, as in the mark */}
      <directionalLight position={[2, 9, 4]} intensity={1.6} />
      <directionalLight position={[8, 2, 1]} intensity={0.7} />
      <directionalLight position={[-2, 1, 8]} intensity={0.25} />
      <Rig progress={progress} />
    </Canvas>
  );
}
