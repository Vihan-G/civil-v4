/* global React, CanvasGrid, LayerToggles, BuildingPlanSVG, Legend, CanvasControls,
          IsometricViewport, HudPanel, TerminalBar, ActivePropertiesPanel,
          SpecsPanel, Label, Button, Chip, MetricCard, WarningBlock */

const { useState: useS } = React;

function BuildingGraphScreen() {
  const [layers, setLayers] = useS(['Walls']);
  const toggle = l => setLayers(a => a.includes(l) ? a.filter(x=>x!==l) : [...a, l]);
  return (
    <div style={{ flex: 1, display: 'flex', minHeight: 0 }}>
      <CanvasGrid>
        <LayerToggles active={layers} onToggle={toggle} />
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 48, height: '100%' }}>
          <div style={{ width: '100%', maxWidth: 960, aspectRatio: '4/3', background: '#fbf9f2', boxShadow: '0 24px 32px -12px rgba(49,52,41,.05)', border: '0.5px solid rgba(49,52,41,.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
            <BuildingPlanSVG />
            <Legend />
          </div>
        </div>
        <CanvasControls />
      </CanvasGrid>
      <SpecsPanel variant="full" />
    </div>
  );
}

function ThreeDScreen() {
  const [cmd, setCmd] = useS('Move column B-3 to position 8500, 12000');
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
      <div style={{ flex: 1, display: 'flex', minHeight: 0 }}>
        <CanvasGrid>
          <IsometricViewport />
          <div style={{ position: 'absolute', top: 24, left: 24 }}>
            <div style={{ background: '#f5f4eb', padding: 8, border: '0.5px solid rgba(178,179,165,.2)', display: 'flex', flexDirection: 'column', gap: 4 }}>
              {['zoom_in','zoom_out','refresh'].map(i => (
                <button key={i} style={{ padding: 8, background: 'transparent', border: 'none', cursor: 'pointer' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 18, color: '#313429' }}>{i}</span>
                </button>
              ))}
            </div>
          </div>
          <div style={{ position: 'absolute', bottom: 24, left: 24, display: 'flex', gap: 16 }}>
            <HudPanel color="#006a6a" label="Load Bearing Path" lines={['ACTIVE ANALYSIS: CONTINUOUS', 'ERROR MARGIN: < 0.002mm']} />
            <HudPanel color="#9f403d" label="Stress Gradient" lines={['MOMENT: 450 kN/m', 'SHEAR: 120 kN']} />
          </div>
        </CanvasGrid>
        <ActivePropertiesPanel />
      </div>
      <TerminalBar value={cmd} onChange={setCmd} />
    </div>
  );
}

function SummaryScreen() {
  return (
    <main style={{ flex: 1, padding: 40, overflowY: 'auto', background: '#fbf9f2' }}>
      <div style={{ maxWidth: 900 }}>
        <Label>Export · Draft</Label>
        <h1 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 44, fontWeight: 700, letterSpacing: '-.02em', margin: '8px 0 8px', color: '#313429' }}>Design Summary</h1>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#5e6054', maxWidth: 640, margin: '0 0 40px' }}>
          Helix Tower v2.4 · Preliminary structural review prepared Oct 26, 2023. Values reference the validated load path and ASCE 7-22 seismic lateral force requirements.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16, marginBottom: 40 }}>
          <MetricCard label="Overall Confidence" value="84.2" unit="%" />
          <MetricCard label="Verified Columns"   value="42"   unit="of 47" />
          <MetricCard label="Open Warnings"      value="3"    unit="Review" highlight accent="#9f403d" />
        </div>

        <section style={{ marginBottom: 40 }}>
          <h3 style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.14em', color: '#313429', margin: '0 0 16px' }}>Zones</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            <Chip tone="teal">Core · Verified</Chip>
            <Chip tone="purple">Void Plate · L12</Chip>
            <Chip tone="pink">Flow · Corridor N</Chip>
            <Chip tone="coral">Transfer · L08</Chip>
            <Chip tone="blue">Metadata · Imported</Chip>
          </div>
        </section>

        <section style={{ marginBottom: 40 }}>
          <h3 style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.14em', color: '#9f403d', margin: '0 0 12px' }}>Critical Warnings</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <WarningBlock title="Column Spacing">Span at Grid C-4 exceeds 12m limit. Transfer beam required or additional support candidate.</WarningBlock>
            <WarningBlock title="Foundation Assumption">Soil class not verified via geotechnical report; Class C assumed.</WarningBlock>
          </div>
        </section>

        <div style={{ display: 'flex', gap: 12 }}>
          <Button icon="download">Export PDF</Button>
          <Button variant="ghost" icon="share">Share Draft</Button>
        </div>
      </div>
    </main>
  );
}

Object.assign(window, { BuildingGraphScreen, ThreeDScreen, SummaryScreen });
