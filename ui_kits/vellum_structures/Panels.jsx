/* global React, Label, WarningBlock */

function SpecsPanel({ variant = 'full' }) {
  return (
    <aside style={{
      width: 320, flexShrink: 0,
      background: '#fbf9f2',
      borderLeft: '0.5px solid rgba(49,52,41,.1)',
      overflowY: 'auto',
      padding: 24,
    }}>
      <div style={{ marginBottom: 32 }}>
        <Label>Project Specs</Label>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: '#5e6054', margin: '4px 0 0', opacity: .7 }}>
          Layer Properties &amp; Metrics
        </p>
      </div>

      {/* Completeness */}
      <div style={{ marginBottom: 32, padding: 16, background: '#f5f4eb', borderBottom: '0.5px solid rgba(49,52,41,.06)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 10 }}>
          <Label>Completeness</Label>
          <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 24, letterSpacing: '-.02em', color: '#313429' }}>84.2%</span>
        </div>
        <div style={{ height: 4, background: '#e3e4d4' }}>
          <div style={{ height: '100%', width: '84.2%', background: '#006a6a' }} />
        </div>
        <p style={{ marginTop: 10, fontFamily: 'Inter, sans-serif', fontSize: 11, color: '#5e6054', lineHeight: 1.5 }}>
          Validation based on ASCE 7-22 seismic lateral force requirements.
        </p>
      </div>

      {/* Metadata */}
      <div style={{ marginBottom: 24 }}>
        <h3 style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.14em', color: '#313429', margin: '0 0 16px' }}>Structural Metadata</h3>
        {[
          ['Grid System',      'Orthogonal 10×10m', null],
          ['Total Area',       '3,850 m²',          null],
          ['Active Load Path', 'Verified (L1–L4)',  '#006a6a'],
          ['Material',         'Concrete C30/37',   null],
        ].map(([k, v, color]) => (
          <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '0.5px solid rgba(49,52,41,.06)' }}>
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#5e6054' }}>{k}</span>
            <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 12, fontWeight: 500, color: color || '#313429' }}>{v}</span>
          </div>
        ))}
      </div>

      {/* Assumptions */}
      <div style={{ paddingTop: 20, marginBottom: 24 }}>
        <h3 style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.14em', color: '#313429', margin: '0 0 12px' }}>Assumptions</h3>
        {[
          'All internal partitions are non-load bearing unless tagged.',
          'Foundation capacity assumes Class C soil profile.',
        ].map(a => (
          <div key={a} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 10 }}>
            <span className="material-symbols-outlined" style={{ fontSize: 14, marginTop: 2, color: '#5f5e5e' }}>info</span>
            <p style={{ margin: 0, fontFamily: 'Inter, sans-serif', fontSize: 11, color: '#5e6054', lineHeight: 1.5, fontStyle: 'italic' }}>{a}</p>
          </div>
        ))}
      </div>

      {/* Warning */}
      {variant === 'full' && (
        <div style={{ paddingTop: 20 }}>
          <h3 style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.14em', color: '#9f403d', margin: '0 0 12px' }}>Critical Warnings</h3>
          <WarningBlock title="Column Spacing">
            Span at Grid C-4 exceeds 12m limit. Transfer beam required or additional support candidate.
          </WarningBlock>
        </div>
      )}
    </aside>
  );
}

function CanvasGrid({ children, style }) {
  return (
    <div style={{
      position: 'relative', flex: 1, overflow: 'hidden',
      background: '#fbf9f2',
      backgroundImage: 'linear-gradient(to right, rgba(49,52,41,.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(49,52,41,.05) 1px, transparent 1px)',
      backgroundSize: '40px 40px',
      ...style,
    }}>{children}</div>
  );
}

function LayerToggles({ active, onToggle }) {
  const layers = ['Walls', 'Grid', 'Rooms', 'Columns', 'Cores'];
  const icons  = { Walls: 'check_box', Grid: 'grid_on', Rooms: 'home_work', Columns: 'trip_origin', Cores: 'texture' };
  return (
    <div style={{
      position: 'absolute', top: 24, left: '50%', transform: 'translateX(-50%)',
      zIndex: 20, display: 'flex', gap: 4, padding: 4,
      background: 'rgba(245,244,235,.8)',
      backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
      borderRadius: 8, boxShadow: '0 24px 32px -12px rgba(49,52,41,.06)',
    }}>
      {layers.map(l => {
        const on = active.includes(l);
        return (
          <button key={l} onClick={() => onToggle(l)} style={{
            padding: '6px 14px', border: 'none', cursor: 'pointer',
            background: on ? '#313429' : 'transparent',
            color: on ? '#fbf9f2' : '#313429',
            fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 600,
            textTransform: 'uppercase', letterSpacing: '.14em',
            borderRadius: 2, display: 'flex', alignItems: 'center', gap: 6,
            transition: 'background 120ms',
          }}>
            <span className="material-symbols-outlined" style={{ fontSize: 14, fontVariationSettings: on ? '"FILL" 1' : '"FILL" 0' }}>{icons[l]}</span>
            {l}
          </button>
        );
      })}
    </div>
  );
}

Object.assign(window, { SpecsPanel, CanvasGrid, LayerToggles });
