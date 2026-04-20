/* global React */
const { useState } = React;

function Button({ variant = 'primary', icon, children, onClick, style }) {
  const base = {
    fontFamily: 'Space Grotesk, sans-serif',
    fontSize: 13, fontWeight: 500,
    padding: '10px 18px', borderRadius: 2,
    cursor: 'pointer', border: 'none',
    display: 'inline-flex', alignItems: 'center', gap: 8,
    transition: 'all 120ms cubic-bezier(.2,0,0,1)',
    ...style,
  };
  const variants = {
    primary: { background: '#5f5e5e', color: '#faf7f6' },
    ghost:   { background: 'transparent', color: '#313429', outline: '0.5px solid rgba(178,179,165,.4)', outlineOffset: '-0.5px' },
    text:    { background: 'transparent', color: '#5f5e5e', padding: '10px 4px' },
    terminal:{ background: '#5f5e5e', color: '#faf7f6', fontFamily: 'Inter, sans-serif', fontSize: 10, fontWeight: 700, letterSpacing: '.2em', textTransform: 'uppercase' },
  };
  return (
    <button onClick={onClick} style={{ ...base, ...variants[variant] }}>
      {icon && <span className="material-symbols-outlined" style={{ fontSize: 16 }}>{icon}</span>}
      {children}
    </button>
  );
}

function Chip({ tone = 'teal', children, icon }) {
  const tones = {
    teal:   { bg: 'rgba(0,106,106,.10)',  fg: '#006a6a' },
    purple: { bg: 'rgba(106,76,147,.10)', fg: '#6a4c93' },
    pink:   { bg: 'rgba(181,84,140,.10)', fg: '#b5548c' },
    coral:  { bg: 'rgba(194,97,91,.10)',  fg: '#c2615b' },
    blue:   { bg: 'rgba(60,110,145,.10)', fg: '#3c6e91' },
    ok:     { bg: 'rgba(74,124,89,.12)',  fg: '#4a7c59' },
    warn:   { bg: 'rgba(184,132,43,.12)', fg: '#b8842b' },
    error:  { bg: 'rgba(159,64,61,.10)',  fg: '#9f403d' },
  };
  const t = tones[tone];
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      background: t.bg, color: t.fg,
      fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 600,
      textTransform: 'uppercase', letterSpacing: '.14em',
      padding: '4px 10px', borderRadius: 2,
    }}>
      {icon && <span className="material-symbols-outlined" style={{ fontSize: 14 }}>{icon}</span>}
      {children}
    </span>
  );
}

function ConfidenceBar({ value = 0.84, tone = 'teal', width = 64 }) {
  const colors = { teal: '#006a6a', warn: '#b8842b', error: '#9f403d', ok: '#4a7c59' };
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
      <div style={{ width, height: 3, background: '#e9e9dc' }}>
        <div style={{ width: `${value * 100}%`, height: '100%', background: colors[tone] }} />
      </div>
      <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 12 }}>
        {Math.round(value * 100)}%
      </span>
    </div>
  );
}

function Label({ children, style }) {
  return <span style={{
    fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 600,
    textTransform: 'uppercase', letterSpacing: '.14em',
    color: '#5e6054',
    ...style,
  }}>{children}</span>;
}

function MetricCard({ label, value, unit, accent, highlight }) {
  return (
    <div style={{
      background: highlight ? '#e9e9dc' : '#f5f4eb',
      padding: 20, height: 118,
      display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
      borderLeft: highlight ? `2px solid ${accent || '#006a6a'}` : 'none',
    }}>
      <Label style={{ color: highlight ? (accent || '#006a6a') : '#5e6054' }}>{label}</Label>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
        <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 30, letterSpacing: '-.02em', color: '#313429', lineHeight: 1 }}>{value}</span>
        {unit && <Label>{unit}</Label>}
      </div>
    </div>
  );
}

function WarningBlock({ title, children }) {
  return (
    <div style={{
      background: 'rgba(159,64,61,.05)',
      borderLeft: '2px solid #9f403d',
      padding: '14px 16px',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
        <span className="material-symbols-outlined" style={{ color: '#9f403d', fontSize: 18, fontVariationSettings: '"FILL" 1' }}>warning</span>
        <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.14em', color: '#9f403d' }}>{title}</span>
      </div>
      <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#313429', lineHeight: 1.5 }}>{children}</div>
    </div>
  );
}

Object.assign(window, { Button, Chip, ConfidenceBar, Label, MetricCard, WarningBlock });
