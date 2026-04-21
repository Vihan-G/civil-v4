"use client";

import { Suspense, type RefObject, useEffect, useMemo, useRef, useState } from "react";
import { Bloom, ChromaticAberration, EffectComposer } from "@react-three/postprocessing";
import { Canvas, useThree } from "@react-three/fiber";
import { Html, Line, OrthographicCamera, Text } from "@react-three/drei";
import { Color, MathUtils, OrthographicCamera as OrthographicCameraImpl, ShaderMaterial, Vector2 } from "three";
import {
  FLOOR_PLAN_COLUMN_POINTS,
  FLOOR_PLAN_CORE,
  FLOOR_PLAN_DIMENSIONS,
  FLOOR_PLAN_FOOTPRINT,
  FLOOR_PLAN_GRID_SEGMENTS,
  FLOOR_PLAN_LABELS,
  FLOOR_PLAN_LOAD_PATHS,
  FLOOR_PLAN_NORTH_ARROW_LABEL,
  FLOOR_PLAN_NORTH_ARROW_SEGMENTS,
  FLOOR_PLAN_OPTIMIZATION_MOVES,
  FLOOR_PLAN_SCALE_BAR_LABELS,
  FLOOR_PLAN_SCALE_BAR_SEGMENTS,
  FLOOR_PLAN_SEGMENTS,
  type FloorPlanPoint
} from "@/data/floor-plan";
import { clampUnit, getHeroSceneState } from "@/lib/hero-story";

const LINE_COLOR = "#CFD8E4";
const WALL_FILL_COLOR = "#8FB8E0";
const WALL_WIRE_COLOR = "#DCE8F4";
const ACCENT_GLOW_COLOR = "#B4DCFF";
const ALERT_COLOR = "#D96B61";
const PLAN_TEXT_FONT = "/fonts/SFNSMono.ttf";
const WALL_HEIGHT = 3.6;
const SLAB_LEVELS = [0.06, 1.84, 3.62] as const;
const PARTICLE_COUNT = 2000;
const CAMERA_TARGET = [0, 1.45, 0] as const;
const FLOOR_PLAN_BOUNDS = getPointBounds(FLOOR_PLAN_FOOTPRINT);
const FLOOR_PLAN_WIDTH = FLOOR_PLAN_BOUNDS.maxX - FLOOR_PLAN_BOUNDS.minX;
const FLOOR_PLAN_DEPTH = FLOOR_PLAN_BOUNDS.maxZ - FLOOR_PLAN_BOUNDS.minZ;
const FLOOR_PLAN_DRAWING_SEGMENTS = [
  ...FLOOR_PLAN_SEGMENTS,
  ...FLOOR_PLAN_GRID_SEGMENTS,
  ...FLOOR_PLAN_NORTH_ARROW_SEGMENTS,
  ...FLOOR_PLAN_SCALE_BAR_SEGMENTS
] as const;

const GRID_VERTEX_SHADER = `
  varying vec2 vUv;
  varying vec2 vWorld;

  void main() {
    vUv = uv;
    vec4 worldPosition = modelMatrix * vec4(position, 1.0);
    vWorld = worldPosition.xz;
    gl_Position = projectionMatrix * viewMatrix * worldPosition;
  }
`;

const GRID_FRAGMENT_SHADER = `
  uniform vec3 uColor;
  uniform float uOpacity;

  varying vec2 vUv;
  varying vec2 vWorld;

  float grid(vec2 coord, float scale) {
    vec2 scaled = coord * scale;
    vec2 line = abs(fract(scaled - 0.5) - 0.5) / fwidth(scaled);
    float distanceToLine = min(line.x, line.y);
    return 1.0 - min(distanceToLine, 1.0);
  }

  void main() {
    float minor = grid(vWorld, 0.55);
    float major = grid(vWorld, 0.12);

    float edge =
      smoothstep(0.02, 0.18, vUv.x) *
      smoothstep(0.02, 0.18, vUv.y) *
      smoothstep(0.02, 0.18, 1.0 - vUv.x) *
      smoothstep(0.02, 0.18, 1.0 - vUv.y);

    float alpha = (minor * 0.08 + major * 0.18) * edge * uOpacity;
    gl_FragColor = vec4(uColor, alpha);
  }
`;

const HALO_VERTEX_SHADER = `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const HALO_FRAGMENT_SHADER = `
  uniform vec3 uColor;
  uniform float uOpacity;

  varying vec2 vUv;

  void main() {
    vec2 centered = vUv - 0.5;
    float radius = length(centered);
    float inner = smoothstep(0.42, 0.12, radius);
    float outer = 1.0 - smoothstep(0.1, 0.52, radius);
    float alpha = inner * outer * uOpacity;
    gl_FragColor = vec4(uColor, alpha);
  }
`;

type CinematicHeroSceneProps = {
  progress: number;
};

type WallPrism = {
  id: string;
  center: FloorPlanPoint;
  length: number;
  rotation: number;
  thickness: number;
};

export function CinematicHeroScene({ progress }: CinematicHeroSceneProps) {
  return (
    <div className="absolute inset-0">
      <Canvas dpr={[1, 1.5]} frameloop="demand" gl={{ alpha: true, antialias: true }}>
        <HeroScene progress={progress} />
      </Canvas>
    </div>
  );
}

function HeroScene({ progress }: { progress: number }) {
  const cameraRef = useRef<OrthographicCameraImpl | null>(null);
  const sceneState = useMemo(() => getHeroSceneState(progress), [progress]);
  const { gl, invalidate, size } = useThree();
  const [composerReady, setComposerReady] = useState(false);
  const drawingZoom = useMemo(
    () => getOrthoFitZoom(size.width, size.height, FLOOR_PLAN_WIDTH, FLOOR_PLAN_DEPTH, 1.05),
    [size.height, size.width]
  );

  useEffect(() => {
    invalidate();
  }, [invalidate, sceneState]);

  useEffect(() => {
    let frameId = 0;

    const ensureContext = () => {
      const context = gl.getContext();
      const attributes = context?.getContextAttributes?.();

      if (attributes) {
        setComposerReady(true);
        invalidate();
        return;
      }

      frameId = window.requestAnimationFrame(ensureContext);
    };

    setComposerReady(false);
    ensureContext();

    return () => {
      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, [gl, invalidate]);

  const visibleSegments = useMemo(() => {
    const revealCursor = sceneState.lineReveal * FLOOR_PLAN_DRAWING_SEGMENTS.length;

    return FLOOR_PLAN_DRAWING_SEGMENTS.map((segment, index) => {
      const localProgress = clampUnit(revealCursor - index);

      return {
        ...segment,
        visiblePoints: getPartialPolyline(segment.points, localProgress)
      };
    });
  }, [sceneState.lineReveal]);

  const wallPrisms = useMemo(() => createWallPrisms(), []);
  const particlePositions = useMemo(() => createParticlePositions(), []);
  const chromaticOffset = useMemo(
    () => new Vector2(sceneState.chromaticAberration, sceneState.chromaticAberration),
    [sceneState.chromaticAberration]
  );

  return (
    <>
      <OrthographicCamera makeDefault position={[0, 32, 0.01]} ref={cameraRef} zoom={drawingZoom} />
      <SceneCameraRig
        cameraRef={cameraRef}
        drawingZoom={drawingZoom}
        pitchDeg={sceneState.cameraPitchDeg}
        radius={sceneState.cameraRadius}
        yawDeg={sceneState.cameraYawDeg}
        zoomFactor={sceneState.cameraZoom}
      />

      <color args={["#0A0A0B"]} attach="background" />
      <ambientLight intensity={0.66} />
      <directionalLight color="#F5F5F5" intensity={0.54} position={[18, 22, 14]} />
      <directionalLight color={ACCENT_GLOW_COLOR} intensity={0.24} position={[-12, 14, -10]} />

      <group rotation={[0, sceneState.modelRotation, 0]}>
        <group position={[0, 0, 0]}>
          <mesh position={[0, -0.24, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[58, 46]} />
            <meshBasicMaterial color="#0E0E10" />
          </mesh>

          <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[40, 26]} />
            <meshBasicMaterial color="#0B0C0E" opacity={0.46} transparent />
          </mesh>

          <FeatheredGridFloor opacity={sceneState.gridOpacity} />
          <StructureHalo opacity={sceneState.haloOpacity} />

          <FloorPlanLines opacity={sceneState.lineOpacity} segments={visibleSegments} />

          <Line
            color={LINE_COLOR}
            lineWidth={1.2}
            opacity={Math.max(sceneState.lineOpacity * 0.5, 0.14)}
            points={FLOOR_PLAN_CORE.map(([x, z]) => [x, 0.03, z])}
            transparent
          />

          <Suspense fallback={null}>
            <RoomLabels lineReveal={sceneState.lineReveal} opacity={sceneState.roomLabelOpacity} />
            <DimensionGuides lineReveal={sceneState.lineReveal} opacity={sceneState.dimensionOpacity} />
            <NorthArrow lineReveal={sceneState.lineReveal} opacity={sceneState.roomLabelOpacity} />
            <ScaleBar lineReveal={sceneState.lineReveal} opacity={sceneState.dimensionOpacity} />
          </Suspense>

          <WallExtrusions
            fillOpacity={sceneState.wallOpacity}
            lift={sceneState.wallLift}
            prisms={wallPrisms}
            wireOpacity={sceneState.wallWireOpacity}
          />
          <SlabStack reveal={sceneState.slabReveal} />
          <ColumnSet
            optimizationProgress={sceneState.optimizationProgress}
            reveal={sceneState.columnReveal}
          />
          <LoadPaths reveal={sceneState.loadPathReveal} />
          <LayerLabels
            columnReveal={sceneState.columnReveal}
            loadPathReveal={sceneState.loadPathReveal}
            slabReveal={sceneState.slabReveal}
          />
          <DustParticles
            drift={sceneState.particleDrift}
            opacity={sceneState.particleOpacity}
            positions={particlePositions}
          />
        </group>
      </group>

      {composerReady && sceneState.hologramGlow > 0.01 ? (
        <EffectComposer multisampling={0}>
          <Bloom intensity={sceneState.bloomIntensity} luminanceThreshold={0.2} mipmapBlur />
          <ChromaticAberration offset={chromaticOffset} />
        </EffectComposer>
      ) : null}
    </>
  );
}

function SceneCameraRig({
  cameraRef,
  drawingZoom,
  pitchDeg,
  radius,
  yawDeg,
  zoomFactor
}: {
  cameraRef: RefObject<OrthographicCameraImpl | null>;
  drawingZoom: number;
  pitchDeg: number;
  radius: number;
  yawDeg: number;
  zoomFactor: number;
}) {
  const { invalidate } = useThree();

  useEffect(() => {
    const orthographicCamera = cameraRef.current;

    if (!orthographicCamera) {
      return;
    }

    const [x, y, z] = getCameraPosition(pitchDeg, yawDeg, radius);

    orthographicCamera.position.set(x, y, z);
    orthographicCamera.zoom = drawingZoom * zoomFactor;
    orthographicCamera.lookAt(...CAMERA_TARGET);
    orthographicCamera.updateProjectionMatrix();
    invalidate();
  }, [cameraRef, drawingZoom, invalidate, pitchDeg, radius, yawDeg, zoomFactor]);

  return null;
}

function FloorPlanLines({
  opacity,
  segments
}: {
  opacity: number;
  segments: Array<{
    id: string;
    visiblePoints: FloorPlanPoint[];
  }>;
}) {
  return (
    <>
      {segments.map((segment) =>
        segment.visiblePoints.length >= 2 ? (
          <Line
            color={segment.id.startsWith("grid-") ? WALL_WIRE_COLOR : LINE_COLOR}
            key={segment.id}
            lineWidth={getDraftLineWidth(segment.id)}
            opacity={getDraftLineOpacity(segment.id, opacity)}
            points={segment.visiblePoints.map(([x, z]) => [x, 0.03, z])}
            transparent
          />
        ) : null
      )}
    </>
  );
}

function RoomLabels({
  lineReveal,
  opacity
}: {
  lineReveal: number;
  opacity: number;
}) {
  return (
    <>
      {FLOOR_PLAN_LABELS.map((label) => (
        <Text
          anchorX="center"
          anchorY="middle"
          color="#8A8A93"
          font={PLAN_TEXT_FONT}
          fontSize={0.56}
          key={label.id}
          position={[label.point[0], 0.08, label.point[1]]}
          rotation={[-Math.PI / 2, 0, 0]}
          visible={getDraftLabelOpacity(lineReveal, opacity) > 0.01}
        >
          {label.text}
          <meshBasicMaterial
            attach="material"
            opacity={getDraftLabelOpacity(lineReveal, opacity)}
            transparent
          />
        </Text>
      ))}
    </>
  );
}

function DimensionGuides({
  lineReveal,
  opacity
}: {
  lineReveal: number;
  opacity: number;
}) {
  return (
    <>
      {FLOOR_PLAN_DIMENSIONS.map((dimension, index) => (
        <DimensionGuide
          axis={dimension.axis}
          from={dimension.from}
          index={index}
          key={dimension.id}
          label={dimension.label}
          lineReveal={lineReveal}
          offset={dimension.offset}
          opacity={opacity}
          to={dimension.to}
        />
      ))}
    </>
  );
}

function DimensionGuide({
  axis,
  from,
  index,
  label,
  lineReveal,
  offset,
  opacity,
  to
}: {
  axis: "horizontal" | "vertical";
  from: FloorPlanPoint;
  index: number;
  label: string;
  lineReveal: number;
  offset: number;
  opacity: number;
  to: FloorPlanPoint;
}) {
  const localReveal = clampUnit(lineReveal * (FLOOR_PLAN_DIMENSIONS.length + 1) - index);

  if (localReveal <= 0) {
    return null;
  }

  const offsetFrom: FloorPlanPoint =
    axis === "horizontal" ? [from[0], from[1] + offset] : [from[0] + offset, from[1]];
  const offsetTo: FloorPlanPoint =
    axis === "horizontal" ? [to[0], to[1] + offset] : [to[0] + offset, to[1]];
  const visibleLine = getPartialPolyline([offsetFrom, offsetTo], localReveal);
  const [tickAStart, tickAEnd] = getDimensionTick(offsetFrom);
  const [tickBStart, tickBEnd] = getDimensionTick(offsetTo);
  const midpoint: FloorPlanPoint = [(offsetFrom[0] + offsetTo[0]) / 2, (offsetFrom[1] + offsetTo[1]) / 2];
  const effectiveOpacity = opacity * localReveal;

  return (
    <group>
      <Line
        color={LINE_COLOR}
        lineWidth={0.55}
        opacity={effectiveOpacity * 0.58}
        points={[
          [from[0], 0.02, from[1]],
          [offsetFrom[0], 0.02, offsetFrom[1]]
        ]}
        transparent
      />
      <Line
        color={LINE_COLOR}
        lineWidth={0.55}
        opacity={effectiveOpacity * 0.58}
        points={[
          [to[0], 0.02, to[1]],
          [offsetTo[0], 0.02, offsetTo[1]]
        ]}
        transparent
      />
      {visibleLine.length >= 2 ? (
        <Line
          color={LINE_COLOR}
          lineWidth={0.55}
          opacity={effectiveOpacity * 0.72}
          points={visibleLine.map(([x, z]) => [x, 0.02, z])}
          transparent
        />
      ) : null}
      <Line
        color={LINE_COLOR}
        lineWidth={0.55}
        opacity={effectiveOpacity * 0.6}
        points={[
          [tickAStart[0], 0.02, tickAStart[1]],
          [tickAEnd[0], 0.02, tickAEnd[1]]
        ]}
        transparent
      />
      <Line
        color={LINE_COLOR}
        lineWidth={0.55}
        opacity={effectiveOpacity * 0.6}
        points={[
          [tickBStart[0], 0.02, tickBStart[1]],
          [tickBEnd[0], 0.02, tickBEnd[1]]
        ]}
        transparent
      />
      {localReveal > 0.75 ? (
        <Text
          anchorX="center"
          anchorY="middle"
          color="#8A8A93"
          font={PLAN_TEXT_FONT}
          fontSize={0.44}
          position={[midpoint[0], 0.08, midpoint[1]]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          {label}
          <meshBasicMaterial attach="material" opacity={effectiveOpacity} transparent />
        </Text>
      ) : null}
    </group>
  );
}

function NorthArrow({
  lineReveal,
  opacity
}: {
  lineReveal: number;
  opacity: number;
}) {
  const labelOpacity = getDraftLabelOpacity(lineReveal, opacity);

  if (labelOpacity <= 0.01) {
    return null;
  }

  return (
    <Text
      anchorX="center"
      anchorY="middle"
      color="#8A8A93"
      font={PLAN_TEXT_FONT}
      fontSize={0.48}
      position={[FLOOR_PLAN_NORTH_ARROW_LABEL.point[0], 0.08, FLOOR_PLAN_NORTH_ARROW_LABEL.point[1]]}
      rotation={[-Math.PI / 2, 0, 0]}
    >
      {FLOOR_PLAN_NORTH_ARROW_LABEL.text}
      <meshBasicMaterial attach="material" opacity={labelOpacity} transparent />
    </Text>
  );
}

function ScaleBar({
  lineReveal,
  opacity
}: {
  lineReveal: number;
  opacity: number;
}) {
  const labelOpacity = getDraftLabelOpacity(lineReveal, opacity);

  return (
    <>
      {labelOpacity > 0.01
        ? FLOOR_PLAN_SCALE_BAR_LABELS.map((label) => (
            <Text
              anchorX="center"
              anchorY="middle"
              color="#8A8A93"
              font={PLAN_TEXT_FONT}
              fontSize={0.4}
              key={label.id}
              position={[label.point[0], 0.08, label.point[1]]}
              rotation={[-Math.PI / 2, 0, 0]}
            >
              {label.text}
              <meshBasicMaterial attach="material" opacity={labelOpacity} transparent />
            </Text>
          ))
        : null}
    </>
  );
}

function FeatheredGridFloor({ opacity }: { opacity: number }) {
  const materialRef = useRef<ShaderMaterial>(null);
  const uniforms = useMemo(
    () => ({
      uColor: { value: new Color(WALL_FILL_COLOR) },
      uOpacity: { value: 0 }
    }),
    []
  );
  const { invalidate } = useThree();

  useEffect(() => {
    if (!materialRef.current) {
      return;
    }

    materialRef.current.uniforms.uOpacity.value = opacity;
    invalidate();
  }, [invalidate, opacity]);

  return (
    <mesh position={[0, -0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[64, 52]} />
      <shaderMaterial
        depthWrite={false}
        fragmentShader={GRID_FRAGMENT_SHADER}
        ref={materialRef}
        transparent
        uniforms={uniforms}
        vertexShader={GRID_VERTEX_SHADER}
      />
    </mesh>
  );
}

function StructureHalo({ opacity }: { opacity: number }) {
  const materialRef = useRef<ShaderMaterial>(null);
  const uniforms = useMemo(
    () => ({
      uColor: { value: new Color(ACCENT_GLOW_COLOR) },
      uOpacity: { value: 0 }
    }),
    []
  );
  const { invalidate } = useThree();

  useEffect(() => {
    if (!materialRef.current) {
      return;
    }

    materialRef.current.uniforms.uOpacity.value = opacity;
    invalidate();
  }, [invalidate, opacity]);

  return (
    <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[38, 38]} />
      <shaderMaterial
        depthWrite={false}
        fragmentShader={HALO_FRAGMENT_SHADER}
        ref={materialRef}
        transparent
        uniforms={uniforms}
        vertexShader={HALO_VERTEX_SHADER}
      />
    </mesh>
  );
}

function WallExtrusions({
  fillOpacity,
  lift,
  prisms,
  wireOpacity
}: {
  fillOpacity: number;
  lift: number;
  prisms: WallPrism[];
  wireOpacity: number;
}) {
  return (
    <>
      {prisms.map((prism) => (
        <group
          key={prism.id}
          position={[prism.center[0], 0, prism.center[1]]}
          rotation={[0, -prism.rotation, 0]}
          scale={[1, lift, 1]}
        >
          <mesh position={[0, WALL_HEIGHT / 2, 0]}>
            <boxGeometry args={[prism.length, WALL_HEIGHT, prism.thickness]} />
            <meshBasicMaterial color={WALL_FILL_COLOR} opacity={fillOpacity} transparent />
          </mesh>
          <mesh position={[0, WALL_HEIGHT / 2, 0]}>
            <boxGeometry args={[prism.length, WALL_HEIGHT, prism.thickness]} />
            <meshBasicMaterial color={WALL_WIRE_COLOR} opacity={wireOpacity} transparent wireframe />
          </mesh>
        </group>
      ))}
    </>
  );
}

function SlabStack({ reveal }: { reveal: number }) {
  return (
    <>
      {SLAB_LEVELS.map((level, index) => {
        const localReveal = clampUnit(reveal * 1.3 - index * 0.22);

        if (localReveal <= 0) {
          return null;
        }

        return (
          <group key={level}>
            <mesh position={[0, level, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <planeGeometry args={[28, 20]} />
              <meshBasicMaterial color={WALL_FILL_COLOR} opacity={0.05 * localReveal} transparent />
            </mesh>
            <Line
              color={WALL_WIRE_COLOR}
              lineWidth={1.1}
              opacity={0.3 * localReveal}
              points={FLOOR_PLAN_FOOTPRINT.map(([x, z]) => [x, level + 0.01, z])}
              transparent
            />
            <Line
              color={WALL_WIRE_COLOR}
              lineWidth={0.9}
              opacity={0.24 * localReveal}
              points={FLOOR_PLAN_CORE.map(([x, z]) => [x, level + 0.02, z])}
              transparent
            />
          </group>
        );
      })}
    </>
  );
}

function ColumnSet({
  optimizationProgress,
  reveal
}: {
  optimizationProgress: number;
  reveal: number;
}) {
  const optimizedColor = useMemo(() => new Color(ALERT_COLOR).lerp(new Color(ACCENT_GLOW_COLOR), optimizationProgress), [optimizationProgress]);

  return (
    <>
      {FLOOR_PLAN_COLUMN_POINTS.map((column, index) => {
        const localReveal = clampUnit(reveal * 1.35 - index * 0.06);

        if (localReveal <= 0) {
          return null;
        }

        return (
          <group key={column.id} position={[column.point[0], 0, column.point[1]]} scale={[1, localReveal, 1]}>
            <mesh position={[0, WALL_HEIGHT / 2, 0]}>
              <cylinderGeometry args={[0.22, 0.22, WALL_HEIGHT, 14]} />
              <meshBasicMaterial color="#F5F5F5" opacity={0.42 * localReveal} transparent />
            </mesh>
            <mesh position={[0, WALL_HEIGHT / 2, 0]}>
              <cylinderGeometry args={[0.22, 0.22, WALL_HEIGHT, 14]} />
              <meshBasicMaterial color={WALL_WIRE_COLOR} opacity={0.52 * localReveal} transparent wireframe />
            </mesh>
          </group>
        );
      })}

      {FLOOR_PLAN_OPTIMIZATION_MOVES.map((move, index) => {
        const localReveal = clampUnit(reveal * 1.15 - index * 0.1);

        if (localReveal <= 0) {
          return null;
        }

        const x = MathUtils.lerp(move.from[0], move.to[0], optimizationProgress);
        const z = MathUtils.lerp(move.from[1], move.to[1], optimizationProgress);

        return (
          <group key={move.id} position={[x, 0, z]} scale={[1, localReveal, 1]}>
            <mesh position={[0, WALL_HEIGHT / 2, 0]}>
              <cylinderGeometry args={[0.28, 0.28, WALL_HEIGHT, 16]} />
              <meshBasicMaterial
                color={`#${optimizedColor.getHexString()}`}
                opacity={0.64 * localReveal}
                transparent
              />
            </mesh>
          </group>
        );
      })}
    </>
  );
}

function LoadPaths({ reveal }: { reveal: number }) {
  return (
    <>
      {FLOOR_PLAN_LOAD_PATHS.map((path, index) => {
        const localReveal = clampUnit(reveal * 1.2 - index * 0.16);

        if (localReveal <= 0) {
          return null;
        }

        return (
          <Line
            color={ACCENT_GLOW_COLOR}
            key={path.id}
            lineWidth={1.4}
            opacity={0.18 + 0.46 * localReveal}
            points={path.points.map(([x, z], pointIndex) => [x, 3.5 + pointIndex * 0.04, z])}
            transparent
          />
        );
      })}
    </>
  );
}

function LayerLabels({
  columnReveal,
  loadPathReveal,
  slabReveal
}: {
  columnReveal: number;
  loadPathReveal: number;
  slabReveal: number;
}) {
  const layers = [
    {
      id: "bays",
      opacity: columnReveal,
      position: [-14.4, 4.4, -0.8],
      text: "BAYS"
    },
    {
      id: "spans",
      opacity: slabReveal,
      position: [1.6, 5.2, -7.8],
      text: "SPANS"
    },
    {
      id: "tributary",
      opacity: loadPathReveal,
      position: [8.8, 4.6, 4.8],
      text: "TRIBUTARY AREAS"
    },
    {
      id: "code",
      opacity: clampUnit(loadPathReveal - 0.2),
      position: [10.4, 2.9, 10.8],
      text: "CODE CHECKS"
    }
  ];

  return (
    <>
      {layers.map((layer) =>
        layer.opacity > 0 ? (
          <Html
            center
            key={layer.id}
            occlude
            position={[layer.position[0], layer.position[1], layer.position[2]]}
            style={{ opacity: layer.opacity }}
            transform
          >
            <div className="pointer-events-none rounded-[var(--radius-sm)] border border-white/10 bg-bg/84 px-3 py-2 font-mono text-[10px] font-medium uppercase tracking-[0.12em] text-fg-muted backdrop-blur">
              {layer.text}
            </div>
          </Html>
        ) : null
      )}
    </>
  );
}

function DustParticles({
  drift,
  opacity,
  positions
}: {
  drift: number;
  opacity: number;
  positions: Float32Array;
}) {
  if (opacity <= 0) {
    return null;
  }

  return (
    <points position={[0, drift * 1.9, 0]}>
      <bufferGeometry>
        <bufferAttribute args={[positions, 3]} attach="attributes-position" count={positions.length / 3} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial color="#F5F5F5" opacity={opacity} size={0.08} sizeAttenuation transparent />
    </points>
  );
}

function createWallPrisms() {
  return FLOOR_PLAN_SEGMENTS.filter(
    (segment) =>
      segment.points.length === 2 &&
      !segment.id.includes("door-arc") &&
      !segment.id.startsWith("door-")
  ).map((segment) => {
    const [start, end] = segment.points;
    const dx = end[0] - start[0];
    const dz = end[1] - start[1];

    return {
      center: [(start[0] + end[0]) / 2, (start[1] + end[1]) / 2] as FloorPlanPoint,
      id: segment.id,
      length: Math.hypot(dx, dz),
      rotation: Math.atan2(dz, dx),
      thickness:
        segment.id.startsWith("north-wall") ||
        segment.id.startsWith("south-wall") ||
        segment.id.startsWith("west-wall") ||
        segment.id.startsWith("east-wall")
          ? 0.28
          : 0.18
    };
  });
}

function createParticlePositions() {
  const positions = new Float32Array(PARTICLE_COUNT * 3);

  for (let index = 0; index < PARTICLE_COUNT; index += 1) {
    const seedA = fract(Math.sin((index + 1) * 91.271) * 43758.5453);
    const seedB = fract(Math.sin((index + 1) * 19.173) * 18264.2887);
    const seedC = fract(Math.sin((index + 1) * 53.919) * 9982.1234);
    const radius = 6 + seedA * 18;
    const angle = seedB * Math.PI * 2;

    positions[index * 3] = Math.cos(angle) * radius;
    positions[index * 3 + 1] = 0.6 + seedC * 7;
    positions[index * 3 + 2] = Math.sin(angle) * (4 + seedB * 14);
  }

  return positions;
}

function getCameraPosition(pitchDeg: number, yawDeg: number, radius: number) {
  const pitch = MathUtils.degToRad(pitchDeg);
  const yaw = MathUtils.degToRad(yawDeg);
  const planarRadius = Math.cos(pitch) * radius;

  return [
    CAMERA_TARGET[0] + Math.sin(yaw) * planarRadius,
    Math.sin(pitch) * radius,
    Math.cos(yaw) * planarRadius + 0.01
  ] as const;
}

function getPointBounds(points: readonly FloorPlanPoint[]) {
  let minX = Number.POSITIVE_INFINITY;
  let maxX = Number.NEGATIVE_INFINITY;
  let minZ = Number.POSITIVE_INFINITY;
  let maxZ = Number.NEGATIVE_INFINITY;

  points.forEach(([x, z]) => {
    minX = Math.min(minX, x);
    maxX = Math.max(maxX, x);
    minZ = Math.min(minZ, z);
    maxZ = Math.max(maxZ, z);
  });

  return { maxX, maxZ, minX, minZ };
}

function getOrthoFitZoom(
  viewportWidth: number,
  viewportHeight: number,
  contentWidth: number,
  contentHeight: number,
  padding: number
) {
  const paddedWidth = contentWidth * padding;
  const paddedHeight = contentHeight * padding;

  return Math.min(viewportWidth / paddedWidth, viewportHeight / paddedHeight);
}

function getPartialPolyline(points: readonly FloorPlanPoint[], progress: number) {
  const clamped = clampUnit(progress);

  if (clamped <= 0) {
    return [];
  }

  if (clamped >= 1 || points.length < 2) {
    return [...points];
  }

  const lengths = [];
  let totalLength = 0;

  for (let index = 1; index < points.length; index += 1) {
    const length = getDistance(points[index - 1], points[index]);
    lengths.push(length);
    totalLength += length;
  }

  const targetLength = totalLength * clamped;
  const result: FloorPlanPoint[] = [points[0]];
  let consumed = 0;

  for (let index = 1; index < points.length; index += 1) {
    const segmentLength = lengths[index - 1];
    const nextTotal = consumed + segmentLength;

    if (targetLength >= nextTotal) {
      result.push(points[index]);
      consumed = nextTotal;
      continue;
    }

    const ratio = segmentLength === 0 ? 0 : (targetLength - consumed) / segmentLength;
    result.push(interpolatePoint(points[index - 1], points[index], ratio));
    break;
  }

  return result;
}

function getDistance([ax, ay]: FloorPlanPoint, [bx, by]: FloorPlanPoint) {
  return Math.hypot(bx - ax, by - ay);
}

function interpolatePoint([ax, ay]: FloorPlanPoint, [bx, by]: FloorPlanPoint, progress: number): FloorPlanPoint {
  return [ax + (bx - ax) * progress, ay + (by - ay) * progress];
}

function getArrowCap(origin: FloorPlanPoint, target: FloorPlanPoint, direction: number) {
  const dx = target[0] - origin[0];
  const dz = target[1] - origin[1];
  const length = Math.hypot(dx, dz) || 1;
  const ux = dx / length;
  const uz = dz / length;
  const px = -uz;
  const pz = ux;
  const baseX = origin[0] + ux * 0.65 * direction;
  const baseZ = origin[1] + uz * 0.65 * direction;

  return [
    [baseX + px * 0.35, baseZ + pz * 0.35] as FloorPlanPoint,
    [baseX - px * 0.35, baseZ - pz * 0.35] as FloorPlanPoint
  ];
}

function getDimensionTick(point: FloorPlanPoint) {
  return [
    [point[0] - 0.24, point[1] - 0.24] as FloorPlanPoint,
    [point[0] + 0.24, point[1] + 0.24] as FloorPlanPoint
  ];
}

function getDraftLineWidth(segmentId: string) {
  if (segmentId.startsWith("grid-")) {
    return 0.7;
  }

  if (
    segmentId.includes("door-arc") ||
    segmentId.startsWith("door-") ||
    segmentId.startsWith("scale-bar") ||
    segmentId.startsWith("north-arrow")
  ) {
    return 1;
  }

  return 1.25;
}

function getDraftLineOpacity(segmentId: string, opacity: number) {
  if (segmentId.startsWith("grid-")) {
    return opacity * 0.18;
  }

  if (segmentId.includes("door-arc") || segmentId.startsWith("door-")) {
    return opacity;
  }

  if (segmentId.startsWith("scale-bar") || segmentId.startsWith("north-arrow")) {
    return opacity * 0.72;
  }

  return opacity * 0.92;
}

function getDraftLabelOpacity(lineReveal: number, opacity: number) {
  return opacity * clampUnit((lineReveal - 0.32) / 0.58);
}

function fract(value: number) {
  return value - Math.floor(value);
}
