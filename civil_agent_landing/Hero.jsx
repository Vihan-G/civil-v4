/* global React */
const { useState, useEffect, useRef } = React;

// ─────────────────────────────────────────────────────────
//  HERO — Civil Agent landing
//  Editorial moment: isometric render on drafting paper
// ─────────────────────────────────────────────────────────

// Top app bar (thin, hairline, wordmark + tight nav)
function TopBar({ onCTA }) {
  const nav = ['Product', 'How it works', 'For teams', 'Changelog'];
  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 50,
      background: 'rgba(251,249,242,.88)',
      backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
      borderBottom: '0.5px solid rgba(49,52,41,.10)',
    }}>
      <div style={{
        maxWidth: 1320, margin: '0 auto', height: 64,
        padding: '0 40px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 48 }}>
          <Wordmark />
          <nav style={{ display: 'flex', gap: 28 }}>
            {nav.map(n => (
              <a key={n} href="#" style={{
                fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 500,
                color: '#313429', textDecoration: 'none',
              }}>{n}</a>
            ))}
          </nav>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Button variant="text" size="sm">Sign in</Button>
          <Button variant="primary" size="sm" onClick={onCTA} trailingIcon="arrow_forward">Request early access</Button>
        </div>
      </div>
    </header>
  );
}

function Wordmark({ compact = false }) {
  return (
    <a href="#" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
      {/* Mark — two stacked vellum sheets */}
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <rect x="3.5" y="5.5" width="13" height="13" fill="#313429" />
        <rect x="6.5" y="2.5" width="13" height="13" fill="none" stroke="#313429" strokeWidth="0.8" />
      </svg>
      <span style={{
        fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 15,
        color: '#313429', letterSpacing: '-.01em',
      }}>
        Civil Agent
      </span>
      {!compact && (
        <span style={{
          fontFamily: 'Inter, sans-serif', fontSize: 9.5, fontWeight: 600,
          textTransform: 'uppercase', letterSpacing: '.18em',
          color: '#5e6054', paddingLeft: 10, marginLeft: 2,
          borderLeft: '0.5px solid rgba(49,52,41,.18)',
        }}>PRE-LAUNCH</span>
      )}
    </a>
  );
}

// The isometric building on drafting grid.
// Pure CSS/SVG; no textures. Plan + stacked slabs.
function IsometricBuilding({ material = 'RC' /* 'RC' | 'Steel' */ }) {
  const accent = material === 'Steel' ? '#c2615b' : '#006a6a';
  const accentSoft = material === 'Steel' ? 'rgba(194,97,91,.10)' : 'rgba(0,106,106,.10)';
  const levels = 7;

  return (
    <div style={{
      position: 'relative', width: '100%', height: '100%',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <svg viewBox="-240 -260 480 520" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
        <defs>
          <pattern id="plate-hatch" patternUnits="userSpaceOnUse" width="6" height="6" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="6" stroke={accent} strokeWidth="0.4" opacity="0.35" />
          </pattern>
          <linearGradient id="slab-face" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f5f4eb" />
            <stop offset="100%" stopColor="#e9e9dc" />
          </linearGradient>
        </defs>

        {/* Grid spine — the building is a 3x5 bay grid (iso) */}
        {/* Iso transform baked into coords. Unit = 28 px horiz (x,y) and 16 vert. */}
        {(() => {
          const U = 28;         // bay size
          const FH = 18;        // floor height
          const bx = 5, by = 3; // bays x, y
          const iso = (x, y, z) => [(x - y) * U, (x + y) * U * 0.5 - z * FH];

          const floors = [];
          for (let l = 0; l < levels; l++) {
            const z = l * FH;
            // slab outline (top face)
            const corners = [
              iso(0, 0, z), iso(bx, 0, z), iso(bx, by, z), iso(0, by, z)
            ];
            floors.push(
              <g key={`fl-${l}`}>
                <polygon
                  points={corners.map(p => p.join(',')).join(' ')}
                  fill="url(#slab-face)"
                  stroke="#313429"
                  strokeWidth="0.6"
                  opacity={0.92}
                />
                {/* bay grid lines on slab */}
                {Array.from({ length: bx + 1 }, (_, i) => {
                  const [x1, y1] = iso(i, 0, z);
                  const [x2, y2] = iso(i, by, z);
                  return <line key={`gx-${l}-${i}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#313429" strokeWidth="0.3" opacity="0.25" />;
                })}
                {Array.from({ length: by + 1 }, (_, j) => {
                  const [x1, y1] = iso(0, j, z);
                  const [x2, y2] = iso(bx, j, z);
                  return <line key={`gy-${l}-${j}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#313429" strokeWidth="0.3" opacity="0.25" />;
                })}
              </g>
            );
            // slab edge (thickness) — front + right face
            const zBot = z - 3;
            const front = [iso(0, by, z), iso(bx, by, z), iso(bx, by, zBot), iso(0, by, zBot)];
            const right = [iso(bx, 0, z), iso(bx, by, z), iso(bx, by, zBot), iso(bx, 0, zBot)];
            floors.push(
              <g key={`th-${l}`}>
                <polygon points={front.map(p => p.join(',')).join(' ')} fill="#e3e4d4" stroke="#313429" strokeWidth="0.5" />
                <polygon points={right.map(p => p.join(',')).join(' ')} fill="#d6d4c6" stroke="#313429" strokeWidth="0.5" />
              </g>
            );
          }

          // Columns — every intersection except where voids are
          const voids = new Set(['2,1']); // a single void bay on column line 2,1
          const cols = [];
          for (let i = 0; i <= bx; i++) {
            for (let j = 0; j <= by; j++) {
              if (voids.has(`${i},${j}`)) continue;
              const [xt, yt] = iso(i, j, levels * FH);
              const [xb, yb] = iso(i, j, 0);
              cols.push(
                <line key={`col-${i}-${j}`} x1={xt} y1={yt} x2={xb} y2={yb}
                  stroke="#313429" strokeWidth="0.7" opacity="0.55" />
              );
            }
          }

          // Highlight: teal "core" spine (vertical core across floors 0..levels at bay (2..3, 1..2))
          const coreCorners = [
            iso(2, 1, levels * FH), iso(3, 1, levels * FH),
            iso(3, 2, levels * FH), iso(2, 2, levels * FH),
          ];
          const coreBase = [
            iso(2, 1, 0), iso(3, 1, 0), iso(3, 2, 0), iso(2, 2, 0),
          ];

          // Open plate (purple) — a rectangular void on level 3
          const voidLevel = 3;
          const voidZ = voidLevel * FH;
          const voidCorners = [
            iso(3.5, 0.3, voidZ), iso(4.7, 0.3, voidZ),
            iso(4.7, 1.4, voidZ), iso(3.5, 1.4, voidZ)
          ];

          // Transfer-risk zone (coral) — highlighted beam at level 1
          const transferZ = FH;
          const [tx1, ty1] = iso(0, 1.5, transferZ);
          const [tx2, ty2] = iso(bx, 1.5, transferZ);

          return (
            <g>
              {floors}
              {cols}

              {/* Core fill */}
              <polygon
                points={[...coreCorners, ...coreBase.slice().reverse()].map(p => p.join(',')).join(' ')}
                fill={accentSoft}
                opacity="0"
              />
              <polygon
                points={coreCorners.map(p => p.join(',')).join(' ')}
                fill={accent}
                opacity="0.22"
              />
              <polygon
                points={coreCorners.map(p => p.join(',')).join(' ')}
                fill="none"
                stroke={accent}
                strokeWidth="1"
              />
              {/* core label leader */}
              <g>
                <line x1={coreCorners[1][0]} y1={coreCorners[1][1]}
                      x2={coreCorners[1][0] + 80} y2={coreCorners[1][1] - 50}
                      stroke={accent} strokeWidth="0.6" />
                <circle cx={coreCorners[1][0] + 80} cy={coreCorners[1][1] - 50} r="2" fill={accent} />
              </g>

              {/* Open plate highlight */}
              <polygon
                points={voidCorners.map(p => p.join(',')).join(' ')}
                fill="rgba(106,76,147,.18)" stroke="#6a4c93" strokeWidth="0.8"
                strokeDasharray="3 2"
              />

              {/* Transfer beam highlight */}
              <line x1={tx1} y1={ty1} x2={tx2} y2={ty2}
                stroke="#c2615b" strokeWidth="2.5" opacity="0.85" />
            </g>
          );
        })()}
      </svg>

      {/* Floating annotations overlaid with absolute positioning */}
      <div style={{
        position: 'absolute', top: '14%', right: '-4%',
        display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 4,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{ width: 6, height: 6, background: accent }} />
          <Label style={{ color: accent, fontSize: 10 }}>{material === 'Steel' ? 'Steel Core' : 'RC Core'}</Label>
        </div>
        <Mono style={{ color: '#5e6054', fontSize: 10 }}>2-bay × 7-floor · shear wall</Mono>
      </div>

      <div style={{
        position: 'absolute', top: '38%', left: '-2%',
        display: 'flex', flexDirection: 'column', gap: 4,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{ width: 6, height: 6, background: '#c2615b' }} />
          <Label style={{ color: '#c2615b', fontSize: 10 }}>Transfer Beam</Label>
        </div>
        <Mono style={{ color: '#5e6054', fontSize: 10 }}>L1 · span 14.4 m</Mono>
      </div>

      <div style={{
        position: 'absolute', top: '10%', left: '12%',
        display: 'flex', flexDirection: 'column', gap: 4,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{ width: 6, height: 6, background: '#6a4c93' }} />
          <Label style={{ color: '#6a4c93', fontSize: 10 }}>Open Plate</Label>
        </div>
        <Mono style={{ color: '#5e6054', fontSize: 10 }}>L4 · double-height</Mono>
      </div>
    </div>
  );
}

// Hero
function Hero({ material, setMaterial, audience, variant = 'isometric' }) {
  const headline = audience === 'architect'
    ? 'Preliminary structural design, in minutes — while you\u2019re still sketching.'
    : 'Preliminary structural design, in minutes.';

  const sub = audience === 'architect'
    ? 'Civil Agent produces engineering-grade structural schemes from your massing. Constraint-driven. Code-compliant. Ready to hand off to your structural consultant.'
    : 'Civil Agent is a structural-intelligence workspace for preliminary design. Constraint-driven, physics-based, code-compliant schemes — directly from the Building Graph.';

  return (
    <section style={{
      position: 'relative',
      padding: '80px 40px 96px',
      backgroundImage: `
        linear-gradient(to right, rgba(49,52,41,.05) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(49,52,41,.05) 1px, transparent 1px)`,
      backgroundSize: '40px 40px',
      backgroundPosition: '0 0',
      overflow: 'hidden',
    }}>
      {/* Canvas corner marks */}
      <CanvasCornerMark position="tl" />
      <CanvasCornerMark position="tr" />

      <div style={{
        maxWidth: 1320, margin: '0 auto', position: 'relative',
        display: 'grid',
        gridTemplateColumns: variant === 'type' ? '1fr' : '1.1fr 1.3fr',
        gap: 48, alignItems: 'center',
        minHeight: 640,
      }}>
        {/* LEFT — copy */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 32 }}>
            <Chip tone="teal" icon="bolt">Early access · Q3 2026</Chip>
            <Mono style={{ color: '#5e6054' }}>v0.8.2 · internal</Mono>
          </div>

          <h1 style={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontSize: 'clamp(44px, 5.2vw, 68px)',
            fontWeight: 700, letterSpacing: '-.025em', lineHeight: 1.02,
            color: '#313429', margin: 0,
            textWrap: 'balance',
          }}>
            {headline.split('—').map((part, i, arr) => (
              <span key={i}>
                {part}
                {i < arr.length - 1 && (
                  <span style={{ display: 'inline-block', width: 40, height: 2, background: '#313429', margin: '0 14px 12px', verticalAlign: 'middle' }} />
                )}
              </span>
            ))}
          </h1>

          <p style={{
            fontFamily: 'Inter, sans-serif', fontSize: 17, lineHeight: 1.55,
            color: '#313429', maxWidth: 520, marginTop: 28, marginBottom: 40,
            textWrap: 'pretty',
          }}>
            {sub}
          </p>

          <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 48 }}>
            <Button variant="primary" size="lg" trailingIcon="arrow_forward">Request early access</Button>
            <Button variant="text" size="lg" icon="play_arrow">See how it works</Button>
          </div>

          {/* The "Big and Small" editorial row */}
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 24, paddingTop: 28,
            borderTop: '0.5px solid rgba(49,52,41,.12)',
          }}>
            <MetricPair metric="< 10 min" descriptor="Preliminary scheme" />
            <MetricPair metric="ACI 318" descriptor="Code-compliant, by default" />
            <MetricPair metric="RC · Steel" descriptor="Multi-material" />
          </div>
        </div>

        {/* RIGHT — isometric render */}
        {variant !== 'type' && <div style={{ position: 'relative', height: 640 }}>
          {/* Material toggle — top right of render area */}
          <div style={{
            position: 'absolute', top: 8, right: 8, zIndex: 2,
            display: 'inline-flex', background: 'rgba(251,249,242,.9)', padding: 2,
            border: '0.5px solid rgba(49,52,41,.12)',
          }}>
            {['RC', 'Steel'].map(m => (
              <button key={m} onClick={() => setMaterial(m)} style={{
                fontFamily: 'Inter, sans-serif', fontSize: 10.5, fontWeight: 600,
                textTransform: 'uppercase', letterSpacing: '.14em',
                padding: '6px 14px', border: 'none', cursor: 'pointer',
                background: material === m ? '#313429' : 'transparent',
                color: material === m ? '#faf7f6' : '#5e6054',
                transition: 'all 120ms cubic-bezier(.2,0,0,1)',
              }}>{m}</button>
            ))}
          </div>

          {/* Top horizontal annotation */}
          <div style={{ position: 'absolute', top: 52, left: 0, right: 80 }}>
            <AnnotationMark label="28.8 m — 6 bay" length={80} />
          </div>
          {/* Side vertical annotation */}
          <div style={{ position: 'absolute', top: 80, right: 0, height: 420, display: 'flex' }}>
            <AnnotationMark label="24.5 m — L7" length={150} orientation="vertical" />
          </div>

          <IsometricBuilding material={material} />

          {/* Bottom readout strip */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '10px 16px',
            background: '#0e0f0b', color: '#9e9d97',
            fontFamily: 'JetBrains Mono, monospace', fontSize: 11,
          }}>
            <span><span style={{ color: '#006a6a', marginRight: 8 }}>●</span>live</span>
            <span>CONFIDENCE 94.2%</span>
            <span>SCHEME 003/047</span>
            <span>ITER 00:08:42</span>
          </div>
        </div>}
      </div>
    </section>
  );
}

function MetricPair({ metric, descriptor }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <span style={{
        fontFamily: 'Space Grotesk, sans-serif',
        fontSize: 28, fontWeight: 700, letterSpacing: '-.015em',
        color: '#313429', lineHeight: 1,
      }}>{metric}</span>
      <Label>{descriptor}</Label>
    </div>
  );
}

function CanvasCornerMark({ position }) {
  const pos = {
    tl: { top: 24, left: 24 }, tr: { top: 24, right: 24 },
    bl: { bottom: 24, left: 24 }, br: { bottom: 24, right: 24 },
  }[position];
  const flipX = position.includes('r');
  const flipY = position.includes('b');
  return (
    <div style={{
      position: 'absolute', ...pos, width: 24, height: 24, pointerEvents: 'none',
      borderTop: flipY ? 'none' : '0.5px solid rgba(49,52,41,.35)',
      borderBottom: flipY ? '0.5px solid rgba(49,52,41,.35)' : 'none',
      borderLeft: flipX ? 'none' : '0.5px solid rgba(49,52,41,.35)',
      borderRight: flipX ? '0.5px solid rgba(49,52,41,.35)' : 'none',
    }} />
  );
}

Object.assign(window, { TopBar, Hero, Wordmark, MetricPair, CanvasCornerMark });
