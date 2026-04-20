/* global React */

function TopAppBar({ active, onNav, compact = false }) {
  const items = ['Projects', 'Building Graph', '3D View', 'Summary'];
  const H = compact ? 48 : 64;
  return (
    <header style={{
      height: H, position: 'sticky', top: 0, zIndex: 50,
      background: '#fbf9f2',
      borderBottom: '0.5px solid rgba(49,52,41,.1)',
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '0 24px',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
        <span style={{
          fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700,
          fontSize: compact ? 15 : 17, letterSpacing: compact ? '.02em' : '.12em',
          textTransform: compact ? 'uppercase' : 'none',
          color: '#313429',
        }}>
          {compact ? 'VELLUM_STRUCTURES' : 'Project: Helix Tower v2.4'}
        </span>
        <nav style={{ display: 'flex', alignItems: 'center', gap: 24, height: '100%' }}>
          {items.map(it => (
            <a key={it} href="#" onClick={e => { e.preventDefault(); onNav(it); }}
              style={{
                fontFamily: 'Space Grotesk, sans-serif', fontSize: 13,
                textDecoration: 'none',
                color: active === it ? '#313429' : 'rgba(95,94,94,.7)',
                fontWeight: active === it ? 500 : 400,
                borderBottom: active === it ? '1px solid #313429' : 'none',
                padding: '4px 2px',
              }}>{it}</a>
          ))}
        </nav>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{
          display: 'flex', alignItems: 'center', background: '#f5f4eb',
          padding: '6px 12px', borderRadius: 2,
        }}>
          <span className="material-symbols-outlined" style={{ fontSize: 16, color: '#5f5e5e', marginRight: 8 }}>search</span>
          <input placeholder="Search projects…" style={{
            background: 'transparent', border: 'none', outline: 'none',
            fontFamily: 'Inter, sans-serif', fontSize: 13, width: 180,
          }} />
        </div>
        {['layers','settings','account_circle'].map(i => (
          <button key={i} className="material-symbols-outlined" style={{
            background: 'transparent', border: 'none', cursor: 'pointer',
            color: '#5f5e5e', padding: 8, borderRadius: 2, fontSize: 22,
          }}>{i}</button>
        ))}
      </div>
    </header>
  );
}

function SideNav({ active, onSelect }) {
  const items = [
    ['Dashboard',        'dashboard'],
    ['Input Form',       'edit_document'],
    ['File Upload',      'cloud_upload'],
    ['Building Graph',   'account_tree'],
    ['Structural Zones', 'grid_view'],
    ['Support Map',      'map'],
    ['Design Summary',   'summarize'],
  ];
  return (
    <aside style={{
      width: 256, flexShrink: 0, background: '#f5f4eb',
      borderRight: '0.5px solid rgba(49,52,41,.1)',
      display: 'flex', flexDirection: 'column',
      paddingTop: 20,
    }}>
      <div style={{ padding: '0 24px', marginBottom: 28 }}>
        <h2 style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 600, color: '#313429', margin: 0 }}>Navigation</h2>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, textTransform: 'uppercase', letterSpacing: '.14em', color: '#5e6054', margin: '4px 0 0', opacity: .7 }}>Analytical Views</p>
      </div>
      <nav style={{ flex: 1 }}>
        {items.map(([label, icon]) => {
          const isActive = active === label;
          return (
            <a key={label} href="#" onClick={e => { e.preventDefault(); onSelect(label); }}
              style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '12px 24px',
                textDecoration: 'none',
                fontFamily: 'Inter, sans-serif', fontSize: 12,
                textTransform: 'uppercase', letterSpacing: '.08em',
                color: isActive ? '#313429' : '#5f5e5e',
                fontWeight: isActive ? 700 : 400,
                background: isActive ? '#fbf9f2' : 'transparent',
                boxShadow: isActive ? 'inset 4px 0 0 0 #313429' : 'none',
                transition: 'background 120ms',
              }}
              onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = 'rgba(251,249,242,.6)'; }}
              onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = 'transparent'; }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: 18 }}>{icon}</span>
              <span>{label}</span>
            </a>
          );
        })}
      </nav>
      <div style={{ borderTop: '0.5px solid rgba(49,52,41,.08)', padding: 12 }}>
        <a href="#" style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 12px', textDecoration: 'none', color: '#5f5e5e', fontFamily: 'Inter, sans-serif', fontSize: 11, textTransform: 'uppercase', letterSpacing: '.1em' }}>
          <span className="material-symbols-outlined" style={{ fontSize: 16 }}>info</span>Metadata
        </a>
        <a href="#" style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 12px', textDecoration: 'none', color: '#5f5e5e', fontFamily: 'Inter, sans-serif', fontSize: 11, textTransform: 'uppercase', letterSpacing: '.1em' }}>
          <span className="material-symbols-outlined" style={{ fontSize: 16 }}>description</span>Project Details
        </a>
      </div>
    </aside>
  );
}

Object.assign(window, { TopAppBar, SideNav });
