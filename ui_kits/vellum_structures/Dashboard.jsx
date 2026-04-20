/* global React, Label, MetricCard, Button, ConfidenceBar */
const { useState: useStateT } = React;

function ProjectTable() {
  const rows = [
    ['Nexus Spine Central',  'Mixed-Use High-Rise',     'IFC Binary',  0.98, '0.992', 'Complete',     'ok',   'Oct 24, 2023'],
    ['Cantilever Garden',    'Commercial Pavilion',     'DXF Plot',    0.45, '0.620', 'Processing',   'warn', 'Oct 25, 2023'],
    ['Void-Form Core V2',    'Residential Modular',     'Image Scan',  0.82, '0.415', 'Needs Review', 'error','Oct 22, 2023'],
    ['Transfer Plate North', 'Institutional',           'IFC Binary',  0.91, '0.884', 'Complete',     'ok',   'Oct 20, 2023'],
    ['Helix Tower v2.4',     'Mixed-Use High-Rise',     'IFC Binary',  0.76, '0.742', 'Processing',   'warn', 'Oct 26, 2023'],
  ];
  const toneColor = { ok: '#4a7c59', warn: '#b8842b', error: '#9f403d' };
  const toneIcon  = { ok: 'check_circle', warn: 'refresh', error: 'warning' };

  return (
    <div style={{ background: '#ffffff' }}>
      <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0 }}>
        <thead>
          <tr style={{ background: '#f5f4eb' }}>
            {['Project Identity','Source','Phase 1 Score','Phase 2 Conf.','Status','Timestamp',''].map(h => (
              <th key={h} style={{ textAlign: 'left', padding: '14px 24px', fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.14em', color: '#5e6054' }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody style={{ fontFamily: 'Inter, sans-serif', fontSize: 13 }}>
          {rows.map(([name, sub, src, score, conf, status, tone, ts], i) => (
            <tr key={i} style={{ transition: 'background 120ms' }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(245,244,235,.5)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
              <td style={{ padding: '18px 24px', borderBottom: '0.5px solid rgba(178,179,165,.2)' }}>
                <div style={{ fontWeight: 700, color: '#313429' }}>{name}</div>
                <div style={{ fontFamily: 'Inter', fontSize: 10, textTransform: 'uppercase', letterSpacing: '.08em', color: '#5e6054' }}>{sub}</div>
              </td>
              <td style={{ padding: '18px 24px', borderBottom: '0.5px solid rgba(178,179,165,.2)' }}>
                <span style={{ padding: '4px 8px', background: '#f5f4eb', borderRadius: 2, fontFamily: 'Inter, sans-serif', fontSize: 11, textTransform: 'uppercase', letterSpacing: '.08em' }}>{src}</span>
              </td>
              <td style={{ padding: '18px 24px', borderBottom: '0.5px solid rgba(178,179,165,.2)' }}>
                <ConfidenceBar value={score} tone={tone} />
              </td>
              <td style={{ padding: '18px 24px', borderBottom: '0.5px solid rgba(178,179,165,.2)', fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, color: toneColor[tone] }}>{conf}</td>
              <td style={{ padding: '18px 24px', borderBottom: '0.5px solid rgba(178,179,165,.2)', color: toneColor[tone] }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 14, fontVariationSettings: tone === 'warn' ? '"FILL" 0' : '"FILL" 1' }}>{toneIcon[tone]}</span>
                  <span style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.14em' }}>{status}</span>
                </span>
              </td>
              <td style={{ padding: '18px 24px', borderBottom: '0.5px solid rgba(178,179,165,.2)', color: '#5e6054' }}>{ts}</td>
              <td style={{ padding: '18px 24px', borderBottom: '0.5px solid rgba(178,179,165,.2)' }}>
                <span className="material-symbols-outlined" style={{ color: '#5e6054', cursor: 'pointer' }}>more_vert</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function DashboardScreen() {
  return (
    <main style={{ flex: 1, padding: 40, overflowY: 'auto', background: '#fbf9f2' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 48 }}>
          <div>
            <h1 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 40, fontWeight: 700, letterSpacing: '-.02em', color: '#313429', margin: '0 0 8px' }}>Project Repository</h1>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#5e6054', display: 'flex', alignItems: 'center', gap: 8, margin: 0 }}>
              <span className="material-symbols-outlined" style={{ fontSize: 18 }}>database</span>
              Showing 24 active structural computations
            </p>
          </div>
          <Button icon="add">New Project</Button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16, marginBottom: 40 }}>
          <MetricCard label="Avg. Confidence"  value="94.2" unit="%" />
          <MetricCard label="Processing Load"  value="12"   unit="Nodes" />
          <MetricCard label="Storage Util."    value="68"   unit="GB" />
          <MetricCard label="System Status"    value="Optimal" highlight accent="#006a6a" />
        </div>

        <ProjectTable />

        <div style={{ marginTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontFamily: 'Inter, sans-serif', fontSize: 11, textTransform: 'uppercase', letterSpacing: '.14em', fontWeight: 700, color: '#5e6054' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer' }}>
              <span className="material-symbols-outlined" style={{ fontSize: 16 }}>chevron_left</span>Prev
            </span>
            <span style={{ display: 'flex', gap: 8 }}>
              <span style={{ color: '#313429' }}>01</span>
              <span>02</span>
              <span>03</span>
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer' }}>
              Next<span className="material-symbols-outlined" style={{ fontSize: 16 }}>chevron_right</span>
            </span>
          </div>
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, textTransform: 'uppercase', letterSpacing: '.14em', color: '#5e6054' }}>Page 1 of 4</span>
        </div>
      </div>
    </main>
  );
}

Object.assign(window, { ProjectTable, DashboardScreen });
