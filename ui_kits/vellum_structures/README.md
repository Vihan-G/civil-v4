# Vellum Structures — UI Kit

Interactive recreation of the Vellum Structures (aka VELLUM_STRUCTURES / Helix Tower) structural design app. Click-through prototype of 4 core screens wired together in `index.html`:

1. **Dashboard** — Project Repository list with bento stats
2. **Building Graph** — plan-view canvas with layer toggles + project specs panel
3. **3D Working View** — isometric viewport + terminal command bar
4. **Design Summary** — export-ready summary report

## Components

- `TopAppBar.jsx` — fixed top bar, brand mark, primary nav, right-side icons
- `SideNav.jsx` — left analytical-views nav with active inset-bar indicator
- `SpecsPanel.jsx` — right metadata / warnings panel
- `CanvasGrid.jsx` — drafting-paper canvas background
- `MetricCard.jsx`, `Chip.jsx`, `Button.jsx`, `ConfidenceBar.jsx` — atomic elements
- `ProjectTable.jsx` — the project list table
- `BuildingPlanSVG.jsx` — plan-view floor plan with columns + zones
- `IsometricViewport.jsx` — simulated 3D stack
- `TerminalBar.jsx` — dark bottom command bar
- `WarningBlock.jsx` — critical warning stripe

Open `index.html`. Top-bar links switch screens, side-nav items mirror the switch.

## Recreation notes

Components are simplified cosmetic recreations — they do not run real engineering logic. Copy, paste, and adjust content as needed for mocks/prototypes. Pixel-level targets match the source screens, using the tokens in `../../colors_and_type.css`.
