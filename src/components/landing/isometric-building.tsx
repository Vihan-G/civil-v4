import { cn } from "@/lib/utils";
import { Mono } from "@/components/ui/label";

export type StructuralMaterial = "RC" | "Steel";

type IsometricBuildingProps = {
  material: StructuralMaterial;
  className?: string;
};

export function IsometricBuilding({ material, className }: IsometricBuildingProps) {
  const accent = material === "Steel" ? "#c2615b" : "#006a6a";
  const accentSoft = material === "Steel" ? "rgba(194,97,91,.1)" : "rgba(0,106,106,.1)";
  const materialId = material.toLowerCase();
  const levels = 7;

  return (
    <div className={cn("relative h-full min-h-[380px] w-full", className)}>
      <svg
        aria-hidden="true"
        className="h-full w-full overflow-hidden"
        viewBox="-240 -260 480 520"
      >
        <defs>
          <pattern
            id={`plate-hatch-${materialId}`}
            patternUnits="userSpaceOnUse"
            width="6"
            height="6"
            patternTransform="rotate(45)"
          >
            <line
              x1="0"
              y1="0"
              x2="0"
              y2="6"
              stroke={accent}
              strokeWidth="0.4"
              opacity="0.35"
            />
          </pattern>
          <linearGradient id={`slab-face-${materialId}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f5f4eb" />
            <stop offset="100%" stopColor="#e9e9dc" />
          </linearGradient>
        </defs>

        {(() => {
          const unit = 28;
          const floorHeight = 18;
          const bayX = 5;
          const bayY = 3;
          const iso = (x: number, y: number, z: number): [number, number] => [
            (x - y) * unit,
            (x + y) * unit * 0.5 - z * floorHeight
          ];

          const floors = [];
          for (let level = 0; level < levels; level += 1) {
            const z = level * floorHeight;
            const corners = [iso(0, 0, z), iso(bayX, 0, z), iso(bayX, bayY, z), iso(0, bayY, z)];
            const zBottom = z - 3;
            const front = [
              iso(0, bayY, z),
              iso(bayX, bayY, z),
              iso(bayX, bayY, zBottom),
              iso(0, bayY, zBottom)
            ];
            const right = [
              iso(bayX, 0, z),
              iso(bayX, bayY, z),
              iso(bayX, bayY, zBottom),
              iso(bayX, 0, zBottom)
            ];

            floors.push(
              <g key={`floor-${level}`}>
                <polygon
                  fill={`url(#slab-face-${materialId})`}
                  opacity="0.92"
                  points={corners.map((point) => point.join(",")).join(" ")}
                  stroke="#313429"
                  strokeWidth="0.6"
                />
                {Array.from({ length: bayX + 1 }, (_, index) => {
                  const [x1, y1] = iso(index, 0, z);
                  const [x2, y2] = iso(index, bayY, z);
                  return (
                    <line
                      key={`grid-x-${level}-${index}`}
                      opacity="0.25"
                      stroke="#313429"
                      strokeWidth="0.3"
                      x1={x1}
                      x2={x2}
                      y1={y1}
                      y2={y2}
                    />
                  );
                })}
                {Array.from({ length: bayY + 1 }, (_, index) => {
                  const [x1, y1] = iso(0, index, z);
                  const [x2, y2] = iso(bayX, index, z);
                  return (
                    <line
                      key={`grid-y-${level}-${index}`}
                      opacity="0.25"
                      stroke="#313429"
                      strokeWidth="0.3"
                      x1={x1}
                      x2={x2}
                      y1={y1}
                      y2={y2}
                    />
                  );
                })}
                <polygon
                  fill="#e3e4d4"
                  points={front.map((point) => point.join(",")).join(" ")}
                  stroke="#313429"
                  strokeWidth="0.5"
                />
                <polygon
                  fill="#d6d4c6"
                  points={right.map((point) => point.join(",")).join(" ")}
                  stroke="#313429"
                  strokeWidth="0.5"
                />
              </g>
            );
          }

          const columns = [];
          for (let i = 0; i <= bayX; i += 1) {
            for (let j = 0; j <= bayY; j += 1) {
              if (i === 2 && j === 1) continue;
              const [xt, yt] = iso(i, j, levels * floorHeight);
              const [xb, yb] = iso(i, j, 0);
              columns.push(
                <line
                  key={`column-${i}-${j}`}
                  opacity="0.55"
                  stroke="#313429"
                  strokeWidth="0.7"
                  x1={xt}
                  x2={xb}
                  y1={yt}
                  y2={yb}
                />
              );
            }
          }

          const coreCorners = [
            iso(2, 1, levels * floorHeight),
            iso(3, 1, levels * floorHeight),
            iso(3, 2, levels * floorHeight),
            iso(2, 2, levels * floorHeight)
          ];
          const coreBase = [iso(2, 1, 0), iso(3, 1, 0), iso(3, 2, 0), iso(2, 2, 0)];
          const voidLevel = 3;
          const voidZ = voidLevel * floorHeight;
          const voidCorners = [
            iso(3.5, 0.3, voidZ),
            iso(4.7, 0.3, voidZ),
            iso(4.7, 1.4, voidZ),
            iso(3.5, 1.4, voidZ)
          ];
          const transferZ = floorHeight;
          const [tx1, ty1] = iso(0, 1.5, transferZ);
          const [tx2, ty2] = iso(bayX, 1.5, transferZ);

          return (
            <g>
              {floors}
              {columns}
              <polygon
                fill={accentSoft}
                opacity="0.6"
                points={[...coreCorners, ...coreBase.slice().reverse()]
                  .map((point) => point.join(","))
                  .join(" ")}
              />
              <polygon
                fill={accent}
                opacity="0.22"
                points={coreCorners.map((point) => point.join(",")).join(" ")}
              />
              <polygon
                fill="none"
                points={coreCorners.map((point) => point.join(",")).join(" ")}
                stroke={accent}
                strokeWidth="1"
              />
              <line
                stroke={accent}
                strokeWidth="0.6"
                x1={coreCorners[1][0]}
                x2={coreCorners[1][0] + 80}
                y1={coreCorners[1][1]}
                y2={coreCorners[1][1] - 50}
              />
              <circle cx={coreCorners[1][0] + 80} cy={coreCorners[1][1] - 50} fill={accent} r="2" />
              <polygon
                fill="rgba(106,76,147,.18)"
                points={voidCorners.map((point) => point.join(",")).join(" ")}
                stroke="#6a4c93"
                strokeDasharray="3 2"
                strokeWidth="0.8"
              />
              <line
                opacity="0.85"
                stroke="#c2615b"
                strokeWidth="2.5"
                x1={tx1}
                x2={tx2}
                y1={ty1}
                y2={ty2}
              />
            </g>
          );
        })()}
      </svg>

      <DataAnnotation
        color={accent}
        label={material === "Steel" ? "Steel core" : "RC core"}
        meta="2 bay x 7 floor / shear wall"
        className="right-0 top-[14%]"
      />
      <DataAnnotation
        color="#c2615b"
        label="Transfer beam"
        meta="L1 / span 14.4 m"
        className="left-0 top-[42%]"
      />
      <DataAnnotation
        color="#6a4c93"
        label="Open plate"
        meta="L4 / double height"
        className="left-[14%] top-[10%]"
      />
    </div>
  );
}

function DataAnnotation({
  color,
  label,
  meta,
  className
}: {
  color: string;
  label: string;
  meta: string;
  className: string;
}) {
  return (
    <div className={cn("absolute hidden flex-col gap-1 sm:flex", className)}>
      <div className="flex items-center gap-2">
        <span className="size-1.5 shrink-0" style={{ backgroundColor: color }} />
        <span
          className="font-body text-[10px] font-semibold uppercase leading-tight"
          style={{ color }}
        >
          {label}
        </span>
      </div>
      <Mono className="text-[10px]">{meta}</Mono>
    </div>
  );
}
