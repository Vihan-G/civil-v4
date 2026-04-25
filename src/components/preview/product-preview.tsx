import { Wordmark } from "@/components/brand/wordmark";
import { Chip } from "@/components/ui/chip";
import { ConfidenceBar } from "@/components/ui/confidence-bar";
import { Label, Mono } from "@/components/ui/label";
import { MaterialIcon } from "@/components/ui/material-icon";
import { MetricCard } from "@/components/ui/metric-card";
import { WarningBlock } from "@/components/ui/warning-block";
import { cn } from "@/lib/utils";

const navItems = [
  ["Dashboard", "dashboard"],
  ["Input Form", "edit_document"],
  ["File Upload", "cloud_upload"],
  ["Building Graph", "account_tree"],
  ["Structural Zones", "grid_view"],
  ["Support Map", "map"],
  ["Design Summary", "summarize"]
] as const;

const specs = [
  ["Grid System", "Orthogonal 10x10m"],
  ["Total Area", "3,850 m2"],
  ["Active Load Path", "Verified L1-L4"],
  ["Material", "Concrete C30/37"]
] as const;

const previewColors = {
  coral: "#c2615b",
  grid:
    "linear-gradient(to right, rgba(49,52,41,.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(49,52,41,.05) 1px, transparent 1px)",
  success: "#4a7c59",
  warning: "#b8842b"
} as const;

export function ProductPreview() {
  return (
    <div
      className="overflow-hidden rounded-sm bg-paper shadow-[0_28px_32px_-12px_rgba(49,52,41,0.06)]"
      style={{
        ["--accent-rgb" as string]: "95 94 94",
        ["--bg-elev-rgb" as string]: "251 249 242",
        ["--bg-rgb" as string]: "245 244 235",
        ["--border" as string]: "rgba(49,52,41,0.1)",
        ["--fg-muted-rgb" as string]: "94 96 84",
        ["--fg-rgb" as string]: "49 52 41"
      }}
    >
      <div className="flex items-center gap-3 border-b border-[rgba(49,52,41,0.12)] bg-[#efeee3] px-4 py-2.5">
        <div className="flex gap-1.5" aria-hidden="true">
          <span className="size-2.5 rounded-full" style={{ backgroundColor: previewColors.coral, opacity: 0.65 }} />
          <span className="size-2.5 rounded-full" style={{ backgroundColor: previewColors.warning, opacity: 0.65 }} />
          <span className="size-2.5 rounded-full" style={{ backgroundColor: previewColors.success, opacity: 0.65 }} />
        </div>
        <div className="min-w-0 flex-1 text-center font-mono text-[11px] text-muted">
          civilagent.com/project/<span className="text-ink">cornerstone-tower</span>/graph
        </div>
        <Mono className="hidden text-[10px] sm:inline">read-only preview</Mono>
      </div>

      <div className="min-h-[680px] bg-paper lg:min-h-[720px]">
        <div className="flex h-full min-h-[680px] flex-col lg:min-h-[720px]">
          <PreviewTopBar />
          <div className="grid flex-1 min-h-0 lg:grid-cols-[220px_minmax(0,1fr)] xl:grid-cols-[236px_minmax(0,1fr)_320px]">
            <SideNav />
            <GraphCanvas />
            <SpecsPanel />
          </div>
        </div>
      </div>
    </div>
  );
}

function PreviewTopBar() {
  const topItems = ["Projects", "Building Graph", "3D View", "Summary"];

  return (
    <div className="flex min-h-14 items-center justify-between gap-4 border-b border-ink/10 bg-paper px-4 lg:min-h-16 lg:px-6">
      <div className="flex min-w-0 items-center gap-5">
        <Wordmark compact />
        <nav className="hidden items-center gap-4 xl:flex" aria-label="Preview navigation">
          {topItems.map((item) => (
            <a
              className={cn(
                "font-headline text-sm text-[#5f5e5e]/70",
                item === "Building Graph" && "border-b border-ink pb-1 text-ink"
              )}
              href="#preview"
              key={item}
            >
              {item}
            </a>
          ))}
        </nav>
      </div>

      <div className="flex min-w-0 items-center gap-2">
        <div className="hidden min-h-9 items-center bg-surface-low px-3 md:flex">
          <MaterialIcon className="mr-2 text-[#5f5e5e]" name="search" size={17} />
          <span className="w-36 truncate font-body text-sm text-muted">Search projects</span>
        </div>
        {["layers", "settings", "account_circle"].map((icon) => (
          <button
            aria-label={icon.replace("_", " ")}
            className="hidden size-9 items-center justify-center rounded-sm text-[#5f5e5e] transition hover:bg-surface-low sm:inline-flex"
            key={icon}
            type="button"
          >
            <MaterialIcon name={icon} size={21} />
          </button>
        ))}
      </div>
    </div>
  );
}

function SideNav() {
  return (
    <aside className="hidden border-r border-ink/10 bg-surface-low py-5 lg:block">
      <div className="mb-7 px-6">
        <p className="font-body text-sm font-semibold text-ink">Navigation</p>
        <Label className="mt-1 block">Analytical Views</Label>
      </div>
      <nav aria-label="Analytical views">
        {navItems.map(([label, icon]) => {
          const active = label === "Building Graph";
          return (
            <a
              className={cn(
                "flex items-center gap-3 px-6 py-3 font-body text-xs font-medium uppercase text-[#5f5e5e] transition",
                active && "bg-paper font-bold text-ink shadow-[inset_4px_0_0_#313429]",
                !active && "hover:bg-paper/60"
              )}
              href="#preview"
              key={label}
            >
              <MaterialIcon name={icon} size={18} />
              <span>{label}</span>
            </a>
          );
        })}
      </nav>
    </aside>
  );
}

function GraphCanvas() {
  return (
    <main
      className="relative min-h-[620px] overflow-hidden bg-paper bg-[length:40px_40px]"
      style={{ backgroundImage: previewColors.grid }}
    >
      <div className="absolute left-4 right-4 top-4 z-20 flex flex-wrap justify-center gap-1 rounded-lg bg-[rgba(245,244,235,0.8)] p-1 shadow-[0_24px_32px_-12px_rgba(49,52,41,0.06)] backdrop-blur-xl sm:left-1/2 sm:right-auto sm:-translate-x-1/2">
        {["Walls", "Grid", "Rooms", "Columns", "Cores"].map((item) => {
          const active = item === "Walls" || item === "Columns";
          return (
            <button
              className={cn(
                "inline-flex min-h-8 items-center gap-1.5 rounded-sm px-3 font-body text-[11px] font-semibold uppercase transition",
                active ? "bg-ink text-paper" : "text-ink hover:bg-paper"
              )}
              key={item}
              type="button"
            >
              <MaterialIcon
                fill={active}
                name={item === "Grid" ? "grid_on" : item === "Columns" ? "trip_origin" : "check_box"}
                size={14}
              />
              {item}
            </button>
          );
        })}
      </div>

      <div className="flex h-full min-h-[620px] items-center justify-center p-5 pt-24 sm:p-10 sm:pt-24">
        <div className="relative flex aspect-[4/3] w-full max-w-4xl items-center justify-center bg-paper [border:0.5px_solid_rgba(49,52,41,0.1)]">
          <BuildingPlanSvg />
          <Legend />
        </div>
      </div>

      <div className="absolute bottom-5 right-5 flex flex-col gap-2">
        {["add", "remove", "center_focus_weak"].map((icon) => (
          <button
            aria-label={icon.replace("_", " ")}
            className="flex size-9 items-center justify-center bg-paper text-ink [border:0.5px_solid_rgba(49,52,41,0.1)]"
            key={icon}
            type="button"
          >
            <MaterialIcon name={icon} size={18} />
          </button>
        ))}
      </div>
    </main>
  );
}

function SpecsPanel() {
  return (
    <aside className="hidden overflow-y-auto border-l border-ink/10 bg-paper p-6 xl:block">
      <div className="mb-8">
        <Label>Project Specs</Label>
        <p className="mt-1 font-body text-xs text-muted">Layer properties and metrics</p>
      </div>

      <div className="mb-8 bg-surface-low p-4">
        <div className="mb-3 flex items-end justify-between gap-4">
          <Label>Completeness</Label>
          <span className="font-headline text-2xl font-bold text-ink">84.2%</span>
        </div>
        <div className="h-1 bg-[#e3e4d4]">
          <div className="h-full w-[84.2%] bg-[#006a6a]" />
        </div>
        <p className="mt-3 font-body text-xs leading-5 text-muted">
          Validation references ASCE 7-22 seismic lateral force requirements.
        </p>
      </div>

      <div className="mb-7">
        <Label className="mb-3 block text-ink">Structural Metadata</Label>
        {specs.map(([key, value]) => (
          <div className="flex justify-between gap-4 border-b border-ink/5 py-2.5" key={key}>
            <span className="font-body text-xs text-muted">{key}</span>
            <span
              className={cn(
                "text-right font-headline text-xs font-medium",
                key === "Active Load Path" ? "text-[#006a6a]" : "text-ink"
              )}
            >
              {value}
            </span>
          </div>
        ))}
      </div>

      <div className="mb-7">
        <Label className="mb-3 block text-ink">Assumptions</Label>
        {[
          "Internal partitions are non-load bearing unless tagged.",
          "Foundation capacity assumes Class C soil profile."
        ].map((item) => (
          <div className="mb-3 flex items-start gap-2" key={item}>
            <MaterialIcon className="mt-0.5 text-[#5f5e5e]" name="info" size={15} />
            <p className="m-0 font-body text-xs leading-5 text-muted">{item}</p>
          </div>
        ))}
      </div>

      <WarningBlock title="Column spacing">
        Span at Grid C-4 exceeds 12 m limit. Transfer beam required or additional support candidate.
      </WarningBlock>
    </aside>
  );
}

function BuildingPlanSvg() {
  return (
    <svg
      aria-label="Plan view of the active building graph"
      className="h-[90%] w-[90%]"
      role="img"
      viewBox="0 0 800 600"
    >
      <g stroke="rgba(49,52,41,.2)" strokeDasharray="4 4" strokeWidth="0.5">
        {[100, 200, 300, 400, 500].map((y) => (
          <line key={`h-${y}`} x1="0" x2="800" y1={y} y2={y} />
        ))}
        {[100, 200, 300, 400, 500, 600, 700].map((x) => (
          <line key={`v-${x}`} x1={x} x2={x} y1="0" y2="600" />
        ))}
      </g>
      <rect fill="none" height="500" stroke="#313429" strokeWidth="2" width="700" x="50" y="50" />
      <rect
        fill="#006a6a"
        fillOpacity=".05"
        height="200"
        stroke="#006a6a"
        strokeDasharray="2 2"
        strokeWidth="1.5"
        width="200"
        x="300"
        y="200"
      />
      <text
        fill="#006a6a"
        fontFamily="Space Grotesk"
        fontSize="12"
        fontWeight="600"
        textAnchor="middle"
        x="400"
        y="305"
      >
        Primary Core
      </text>
      <g stroke="#5f5e5e" strokeLinecap="square" strokeWidth="8">
        <line x1="50" x2="300" y1="50" y2="50" />
        <line x1="500" x2="750" y1="50" y2="50" />
        <line x1="50" x2="750" y1="550" y2="550" />
        <line x1="50" x2="50" y1="50" y2="550" />
        <line x1="750" x2="750" y1="50" y2="550" />
        <line strokeWidth="4" x1="300" x2="300" y1="200" y2="400" />
        <line strokeWidth="4" x1="500" x2="500" y1="200" y2="400" />
      </g>
      {[
        [100, 100, "#4a7c59"],
        [700, 100, "#4a7c59"],
        [100, 500, "#4a7c59"],
        [700, 500, "#4a7c59"],
        [300, 200, "#b8842b"],
        [500, 200, "#b8842b"],
        [400, 50, "#9f403d"]
      ].map(([x, y, color], index) => (
        <circle
          cx={x}
          cy={y}
          fill={String(color)}
          key={`${x}-${y}-${index}`}
          r="6"
          stroke="#313429"
          strokeWidth="0.5"
        />
      ))}
      <rect fill="#fbf9f2" height="8" width="100" x="350" y="46" />
      <text fill="#5f5e5e" fontFamily="Inter" fontSize="9" textAnchor="middle" x="400" y="40">
        Main Entry Gap
      </text>
    </svg>
  );
}

function Legend() {
  const items = [
    ["#4a7c59", "Verified Column"],
    ["#b8842b", "Constraint Conflict"],
    ["#9f403d", "Transfer Risk"]
  ] as const;

  return (
    <div className="absolute bottom-4 left-4 flex max-w-[calc(100%-4rem)] flex-col gap-1.5 bg-[rgba(251,249,242,0.8)] p-2 backdrop-blur-xl sm:bottom-6 sm:left-6">
      {items.map(([color, label]) => (
        <div className="flex items-center gap-2" key={label}>
          <span className="size-2 rounded-full" style={{ backgroundColor: color }} />
          <span className="font-body text-[10px] font-semibold uppercase text-muted">{label}</span>
        </div>
      ))}
    </div>
  );
}

export function PreviewMetrics() {
  return (
    <div className="grid gap-4 md:grid-cols-4">
      <MetricCard label="Avg. Confidence" value="94.2" unit="%" />
      <MetricCard label="Processing Load" value="12" unit="Nodes" />
      <MetricCard label="Storage Util." value="68" unit="GB" />
      <MetricCard accent="teal" highlight label="System Status" value="Optimal" />
    </div>
  );
}

export function CompactSchemeList() {
  const rows = [
    ["Nexus Spine Central", "IFC Binary", 98, "Complete", "success"],
    ["Cantilever Garden", "DXF Plot", 45, "Processing", "warning"],
    ["Void-Form Core V2", "Image Scan", 82, "Needs Review", "error"]
  ] as const;

  return (
    <div className="overflow-hidden bg-paper">
      {rows.map(([name, source, confidence, status, tone]) => (
        <div className="grid gap-3 border-b border-ink/10 p-4 sm:grid-cols-[1fr_auto_auto]" key={name}>
          <div>
            <p className="font-body text-sm font-bold text-ink">{name}</p>
            <Label>{source}</Label>
          </div>
          <ConfidenceBar tone={tone} value={confidence} />
          <Chip tone={tone}>{status}</Chip>
        </div>
      ))}
    </div>
  );
}
