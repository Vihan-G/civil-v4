/* global React, Label, Chip, ConfidenceBar */

function BuildingPlanSVG() {
  return (
    <svg viewBox="0 0 800 600" style={{ width: '90%', height: '90%', opacity: .95 }}>
      <g stroke="rgba(49,52,41,.2)" strokeDasharray="4 4" strokeWidth="0.5">
        {[100,200,300,400,500].map(y => <line key={'h'+y} x1="0" x2="800" y1={y} y2={y}/>)}
        {[100,200,300,400,500,600,700].map(x => <line key={'v'+x} x1={x} x2={x} y1="0" y2="600"/>)}
      </g>
      <rect x="50" y="50" width="700" height="500" fill="none" stroke="#313429" strokeWidth="2"/>
      <rect x="300" y="200" width="200" height="200" fill="#006a6a" fillOpacity=".05" stroke="#006a6a" strokeDasharray="2 2" strokeWidth="1.5"/>
      <text x="400" y="305" fill="#006a6a" fontFamily="Space Grotesk" fontSize="12" textAnchor="middle" style={{ textTransform: 'uppercase', letterSpacing: '.14em', fontWeight: 500 }}>Primary Core</text>
      <g stroke="#5f5e5e" strokeLinecap="square" strokeWidth="8">
        <line x1="50" x2="300" y1="50" y2="50"/>
        <line x1="500" x2="750" y1="50" y2="50"/>
        <line x1="50" x2="750" y1="550" y2="550"/>
        <line x1="50" x2="50" y1="50" y2="550"/>
        <line x1="750" x2="750" y1="50" y2="550"/>
        <line strokeWidth="4" x1="300" x2="300" y1="200" y2="400"/>
        <line strokeWidth="4" x1="500" x2="500" y1="200" y2="400"/>
      </g>
      {[[100,100,'#4a7c59'],[700,100,'#4a7c59'],[100,500,'#4a7c59'],[700,500,'#4a7c59'],
        [300,200,'#b8842b'],[500,200,'#b8842b'],[400,50,'#9f403d']].map(([x,y,c],i) =>
        <circle key={i} cx={x} cy={y} r="6" fill={c} stroke="#313429" strokeWidth="0.5"/>
      )}
      <rect x="350" y="46" width="100" height="8" fill="#fbf9f2"/>
      <text x="400" y="40" fill="#5f5e5e" fontFamily="Inter" fontSize="9" textAnchor="middle" style={{ textTransform: 'uppercase' }}>Main Entry Gap</text>
    </svg>
  );
}

function Legend() {
  return (
    <div style={{ position: 'absolute', bottom: 24, left: 24, display: 'flex', flexDirection: 'column', gap: 6 }}>
      {[['#4a7c59','Verified Column'],['#b8842b','Constraint Conflict'],['#9f403d','Transfer Risk']].map(([c,t]) => (
        <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: c }} />
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, textTransform: 'uppercase', letterSpacing: '.14em', color: '#5e6054' }}>{t}</span>
        </div>
      ))}
    </div>
  );
}

function CanvasControls() {
  return (
    <div style={{ position: 'absolute', bottom: 24, right: 24, display: 'flex', flexDirection: 'column', gap: 8 }}>
      {['add','remove','center_focus_weak'].map(i => (
        <button key={i} style={{
          width: 36, height: 36, background: '#fbf9f2',
          border: '0.5px solid rgba(49,52,41,.1)', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <span className="material-symbols-outlined" style={{ fontSize: 18, color: '#313429' }}>{i}</span>
        </button>
      ))}
    </div>
  );
}

function IsometricViewport() {
  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none', perspective: 2000 }}>
      <div style={{ position: 'relative', width: 520, height: 520, transform: 'rotateX(60deg) rotateZ(-45deg)', transformStyle: 'preserve-3d' }}>
        <div style={{ position: 'absolute', inset: 60, background: 'rgba(0,106,106,.08)', border: '1px solid rgba(0,106,106,.4)', boxShadow: '0 0 40px rgba(0,106,106,.1)' }}>
          <div style={{ position: 'absolute', bottom: 8, left: 10, fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#006a6a' }}>ZONE_ALPHA_TEAL</div>
        </div>
        <div style={{ position: 'absolute', inset: 60, transform: 'translateZ(80px) translateY(-60px)', background: 'rgba(181,84,140,.08)', border: '1px solid rgba(181,84,140,.3)' }}>
          <div style={{ position: 'absolute', top: 8, right: 10, fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#b5548c' }}>FLOW_CORRIDOR_PINK</div>
        </div>
        <div style={{ position: 'absolute', inset: 100, transform: 'translateZ(160px) translateY(-120px)', background: 'rgba(106,76,147,.08)', border: '1px solid rgba(106,76,147,.3)' }}>
          <div style={{ position: 'absolute', bottom: 8, right: 10, fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#6a4c93' }}>VOID_PLATE_PURPLE</div>
        </div>
      </div>
    </div>
  );
}

function HudPanel({ color, label, lines }) {
  return (
    <div style={{
      padding: 14, background: 'rgba(251,249,242,.8)',
      backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
      border: '0.5px solid rgba(49,52,41,.1)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
        <div style={{ width: 10, height: 10, background: color }} />
        <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.14em', color: '#313429' }}>{label}</span>
      </div>
      <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#5e6054', lineHeight: 1.5 }}>
        {lines.map((l,i) => <div key={i}>{l}</div>)}
      </div>
    </div>
  );
}

function TerminalBar({ value, onChange }) {
  return (
    <footer style={{
      height: 40, background: '#313429', color: '#fbf9f2',
      display: 'flex', alignItems: 'center', padding: '0 16px',
      fontFamily: 'JetBrains Mono, monospace', fontSize: 11,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, paddingRight: 16, borderRight: '0.5px solid rgba(251,249,242,.2)' }}>
        <span className="material-symbols-outlined" style={{ fontSize: 14 }}>terminal</span>
        <span>TERMINAL_READY</span>
      </div>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 8, paddingLeft: 16 }}>
        <span style={{ color: 'rgba(251,249,242,.5)' }}>Terminal_Prompt &gt;</span>
        <input value={value} onChange={e => onChange(e.target.value)} style={{
          flex: 1, background: 'transparent', border: 'none', outline: 'none',
          color: '#fbf9f2', fontFamily: 'JetBrains Mono, monospace', fontSize: 11,
        }} />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, paddingLeft: 16, borderLeft: '0.5px solid rgba(251,249,242,.2)', color: 'rgba(251,249,242,.5)' }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer' }}><span className="material-symbols-outlined" style={{ fontSize: 14 }}>list_alt</span>System_Logs</span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer' }}><span className="material-symbols-outlined" style={{ fontSize: 14 }}>tune</span>Parameters</span>
      </div>
    </footer>
  );
}

function ActivePropertiesPanel() {
  return (
    <aside style={{ width: 300, flexShrink: 0, background: '#f5f4eb', borderLeft: '0.5px solid rgba(227,228,212,.5)', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: 20, borderBottom: '0.5px solid rgba(49,52,41,.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Label>Active Element</Label>
        <span className="material-symbols-outlined" style={{ fontSize: 16, opacity: .4, cursor: 'pointer' }}>keyboard_double_arrow_right</span>
      </div>
      <div style={{ padding: 20, flex: 1, overflowY: 'auto' }}>
        <div style={{ marginBottom: 28 }}>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, textTransform: 'uppercase', letterSpacing: '.14em', color: '#7a7c6f', margin: '0 0 4px' }}>Identification</p>
          <h4 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 20, fontWeight: 500, color: '#006a6a', margin: '0 0 4px' }}>Column B-3</h4>
          <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, opacity: .6, margin: 0 }}>UUID: 8824-STR-C3-001</p>
        </div>
        {[['Grid Alignment', 0.95], ['Zone Compatibility', 0.82]].map(([k,v]) => (
          <div key={k} style={{ marginBottom: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <Label>{k}</Label>
              <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 16 }}>{v}</span>
            </div>
            <div style={{ height: 3, background: '#e3e4d4' }}>
              <div style={{ height: '100%', width: `${v*100}%`, background: '#006a6a' }} />
            </div>
          </div>
        ))}
        <div style={{ paddingTop: 20, borderTop: '0.5px solid rgba(49,52,41,.08)' }}>
          <Label style={{ display: 'block', marginBottom: 12 }}>Spatial Coordinates</Label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {[['X_POS','8500.00'],['Y_POS','12000.00'],['Z_BASE','0.00'],['Z_TOP','3200.00']].map(([k,v]) => (
              <div key={k} style={{ padding: 10, background: '#fbf9f2', border: '0.5px solid rgba(178,179,165,.2)' }}>
                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, opacity: .4, marginBottom: 2 }}>{k}</div>
                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11 }}>{v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}

Object.assign(window, { BuildingPlanSVG, Legend, CanvasControls, IsometricViewport, HudPanel, TerminalBar, ActivePropertiesPanel });
