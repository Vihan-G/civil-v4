export type FloorPlanPoint = [number, number];

export type FloorPlanSegment = {
  id: string;
  points: FloorPlanPoint[];
};

export type FloorPlanLabel = {
  id: string;
  text: string;
  point: FloorPlanPoint;
};

export type FloorPlanDimension = {
  id: string;
  from: FloorPlanPoint;
  to: FloorPlanPoint;
  label: string;
  axis: "horizontal" | "vertical";
  offset: number;
};

export type FloorPlanColumnPoint = {
  id: string;
  point: FloorPlanPoint;
};

export type FloorPlanScaleLabel = FloorPlanLabel;

export type FloorPlanOptimizationMove = {
  id: string;
  from: FloorPlanPoint;
  to: FloorPlanPoint;
};

export const FLOOR_PLAN_SEGMENTS: FloorPlanSegment[] = [
  { id: "north-wall", points: [[-14, -10], [14, -10]] },
  { id: "east-wall-upper", points: [[14, -10], [14, 9]] },
  { id: "south-wall", points: [[14, 10], [-14, 10]] },
  { id: "west-wall", points: [[-14, 10], [-14, -10]] },
  { id: "living-divider", points: [[-6, -10], [-6, 4]] },
  { id: "service-divider", points: [[2, -10], [2, 10]] },
  { id: "kitchen-divider", points: [[8, -10], [8, -1]] },
  { id: "bed-divider", points: [[8, -1], [14, -1]] },
  { id: "bath-divider", points: [[-6, 4], [2, 4]] },
  { id: "stairs-divider", points: [[-14, -2], [-6, -2]] },
  { id: "bedroom-1-south", points: [[2, 2], [14, 2]] },
  { id: "foyer-divider", points: [[-14, 4], [-6, 4]] },
  { id: "inner-corridor", points: [[-6, 4], [-6, 10]] },
  { id: "door-living", points: [[-6, -4], [-6, -2.4]] },
  { id: "door-bath", points: [[-2.2, 4], [-0.8, 4]] },
  { id: "door-kitchen", points: [[8, -6], [8, -4.4]] },
  { id: "door-bedroom-1", points: [[5.2, 2], [6.8, 2]] },
  { id: "door-bedroom-2", points: [[10.2, -1], [11.8, -1]] },
  {
    id: "door-arc-living",
    points: [
      [-6, -2.4],
      [-5.75, -2.1],
      [-5.38, -1.8],
      [-4.94, -1.58],
      [-4.45, -1.45]
    ]
  },
  {
    id: "door-arc-bath",
    points: [
      [-0.8, 4],
      [-0.56, 4.26],
      [-0.18, 4.46],
      [0.24, 4.58],
      [0.68, 4.62]
    ]
  },
  {
    id: "door-arc-kitchen",
    points: [
      [8, -4.4],
      [8.24, -4.12],
      [8.6, -3.86],
      [9.04, -3.64],
      [9.5, -3.52]
    ]
  },
  {
    id: "door-arc-bedroom-1",
    points: [
      [6.8, 2],
      [6.95, 2.34],
      [7.18, 2.62],
      [7.48, 2.86],
      [7.84, 3.04]
    ]
  },
  {
    id: "door-arc-bedroom-2",
    points: [
      [11.8, -1],
      [12.02, -0.64],
      [12.32, -0.32],
      [12.72, -0.06],
      [13.12, 0.08]
    ]
  }
] as const;

export const FLOOR_PLAN_LABELS: FloorPlanLabel[] = [
  { id: "foyer", text: "FOYER", point: [-10.4, 7.1] },
  { id: "living", text: "LIVING", point: [-10.2, -6.2] },
  { id: "kitchen", text: "KITCHEN", point: [5.2, -6.4] },
  { id: "bedroom-1", text: "BED 1", point: [5.6, 5.8] },
  { id: "bedroom-2", text: "BED 2", point: [11, 5.8] },
  { id: "bath", text: "BATH", point: [-2.2, 7.2] },
  { id: "stairs", text: "STAIR", point: [-10.2, 0.6] }
] as const;

export const FLOOR_PLAN_DIMENSIONS: FloorPlanDimension[] = [
  { id: "width-total", from: [-14, -10], to: [14, -10], label: "24'-0\"", axis: "horizontal", offset: -2.8 },
  { id: "depth-total", from: [14, -10], to: [14, 10], label: "18'-0\"", axis: "vertical", offset: 2.8 },
  { id: "living-width", from: [-14, -10], to: [-6, -10], label: "12'-6\"", axis: "horizontal", offset: -1.9 },
  { id: "service-bay", from: [-6, -10], to: [2, -10], label: "10'-0\"", axis: "horizontal", offset: -1.9 },
  { id: "bed-zone", from: [2, -10], to: [14, -10], label: "12'-0\"", axis: "horizontal", offset: -1.9 },
  { id: "north-room-depth", from: [-14, 4], to: [-14, 10], label: "8'-0\"", axis: "vertical", offset: -2.4 }
] as const;

export const FLOOR_PLAN_GRID_SEGMENTS: FloorPlanSegment[] = [
  { id: "grid-x-west", points: [[-10, -10], [-10, 10]] },
  { id: "grid-x-mid-west", points: [[-6, -10], [-6, 10]] },
  { id: "grid-x-core-west", points: [[-2, -10], [-2, 10]] },
  { id: "grid-x-core-east", points: [[2, -10], [2, 10]] },
  { id: "grid-x-mid-east", points: [[6, -10], [6, 10]] },
  { id: "grid-x-east", points: [[10, -10], [10, 10]] },
  { id: "grid-z-north", points: [[-14, -6], [14, -6]] },
  { id: "grid-z-upper-mid", points: [[-14, -2], [14, -2]] },
  { id: "grid-z-mid", points: [[-14, 2], [14, 2]] },
  { id: "grid-z-lower-mid", points: [[-14, 6], [14, 6]] }
] as const;

export const FLOOR_PLAN_NORTH_ARROW_SEGMENTS: FloorPlanSegment[] = [
  { id: "north-arrow-stem", points: [[12.2, -8.8], [12.2, -10.8]] },
  { id: "north-arrow-left", points: [[12.2, -10.8], [11.82, -10.18]] },
  { id: "north-arrow-right", points: [[12.2, -10.8], [12.58, -10.18]] }
] as const;

export const FLOOR_PLAN_NORTH_ARROW_LABEL: FloorPlanLabel = {
  id: "north-arrow-label",
  point: [12.2, -8.05],
  text: "N"
} as const;

export const FLOOR_PLAN_SCALE_BAR_SEGMENTS: FloorPlanSegment[] = [
  { id: "scale-bar-main", points: [[-13.2, 9.2], [-8.2, 9.2]] },
  { id: "scale-bar-tick-0", points: [[-13.2, 8.95], [-13.2, 9.45]] },
  { id: "scale-bar-tick-5", points: [[-11.95, 8.95], [-11.95, 9.45]] },
  { id: "scale-bar-tick-10", points: [[-10.7, 8.95], [-10.7, 9.45]] },
  { id: "scale-bar-tick-20", points: [[-8.2, 8.95], [-8.2, 9.45]] }
] as const;

export const FLOOR_PLAN_SCALE_BAR_LABELS: FloorPlanScaleLabel[] = [
  { id: "scale-0", point: [-13.2, 9.95], text: "0" },
  { id: "scale-5", point: [-11.95, 9.95], text: "5'" },
  { id: "scale-10", point: [-10.7, 9.95], text: "10'" },
  { id: "scale-20", point: [-8.2, 9.95], text: "20'" }
] as const;

export const FLOOR_PLAN_FOOTPRINT = [
  [-14, -10],
  [14, -10],
  [14, 10],
  [-14, 10],
  [-14, -10]
] as const satisfies FloorPlanPoint[];

export const FLOOR_PLAN_CORE = [
  [-2.6, -3.2],
  [2.6, -3.2],
  [2.6, 3.2],
  [-2.6, 3.2],
  [-2.6, -3.2]
] as const satisfies FloorPlanPoint[];

export const FLOOR_PLAN_COLUMN_POINTS: FloorPlanColumnPoint[] = [
  { id: "col-nw", point: [-12, -8] },
  { id: "col-nc", point: [-4, -8] },
  { id: "col-nm", point: [4, -8] },
  { id: "col-ne", point: [12, -8] },
  { id: "col-w-mid", point: [-12, 0] },
  { id: "col-core-west", point: [-4, 0] },
  { id: "col-core-east", point: [4, 0] },
  { id: "col-e-mid", point: [12, 0] },
  { id: "col-sw", point: [-12, 8] },
  { id: "col-sc", point: [-4, 8] },
  { id: "col-sm", point: [4, 8] },
  { id: "col-se", point: [12, 8] }
] as const;

export const FLOOR_PLAN_OPTIMIZATION_MOVES: FloorPlanOptimizationMove[] = [
  {
    id: "opt-west-shift",
    from: [-7.2, 0.6],
    to: [-4, 0]
  },
  {
    id: "opt-south-shift",
    from: [3.2, -5.2],
    to: [4, -8]
  },
  {
    id: "opt-east-shift",
    from: [9.4, 1.4],
    to: [12, 0]
  }
] as const;

export const FLOOR_PLAN_LOAD_PATHS = [
  {
    id: "path-west",
    points: [
      [-12, -8],
      [-9.2, -5.8],
      [-6.8, -2.2],
      [-4.2, 0.2]
    ]
  },
  {
    id: "path-mid",
    points: [
      [-4, -8],
      [-1.6, -4.8],
      [1.4, -1.6],
      [4, 0]
    ]
  },
  {
    id: "path-east",
    points: [
      [12, -8],
      [9.8, -5.2],
      [7.2, -2.2],
      [4.2, 0.2]
    ]
  }
] as const;
