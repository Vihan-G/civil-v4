/* global React */
const { useState, useEffect } = React;

// ─────────────────────────────────────────────────────────
//  ATOMS — Civil Agent landing
//  Lives on the Vellum tokens in ../colors_and_type.css
// ─────────────────────────────────────────────────────────

function Label({ children, style, as = 'span' }) {
  const Tag = as;
  return (
    <Tag style={{
      fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 600,
      textTransform: 'uppercase', letterSpacing: '.14em',
      color: '#5e6054', ...style,
    }}>{children}</Tag>
  );
}

function Mono({ children, style }) {
  return (
    <span style={{
      fontFamily: 'JetBrains Mono, ui-monospace, monospace',
      fontSize: 11.5, letterSpacing: '-.01em', color: '#5e6054', ...style,
    }}>{children}</span>
  );
}

function Button({ variant = 'primary', icon, trailingIcon, children, onClick, href, size = 'md', style }) {
  const sizes = {
    sm: { padding: '8px 14px', fontSize: 12 },
    md: { padding: '12px 20px', fontSize: 13 },
    lg: { padding: '16px 24px', fontSize: 14 },
  };
  const base = {
    fontFamily: 'Space Grotesk, sans-serif',
    fontWeight: 500, borderRadius: 2,
    cursor: 'pointer', border: 'none', textDecoration: 'none',
    display: 'inline-flex', alignItems: 'center', gap: 10,
    transition: 'all 120ms cubic-bezier(.2,0,0,1)',
    ...sizes[size],
    ...style,
  };
  const variants = {
    primary: { background: '#313429', color: '#faf7f6' },
    tool:    { background: '#5f5e5e', color: '#faf7f6' },
    ghost:   { background: 'transparent', color: '#313429', outline: '0.5px solid rgba(49,52,41,.18)', outlineOffset: '-0.5px' },
    text:    { background: 'transparent', color: '#313429', padding: '6px 0', gap: 6 },
  };
  const Component = href ? 'a' : 'button';
  const handle = e => {
    e.currentTarget.style.transform = 'scale(.97)';
    setTimeout(() => { if (e.currentTarget) e.currentTarget.style.transform = ''; }, 130);
    onClick && onClick(e);
  };
  return (
    <Component href={href} onClick={handle} style={{ ...base, ...variants[variant] }}>
      {icon && <span className="material-symbols-outlined" style={{ fontSize: 18 }}>{icon}</span>}
      {children}
      {trailingIcon && <span className="material-symbols-outlined" style={{ fontSize: 18 }}>{trailingIcon}</span>}
    </Component>
  );
}

function Chip({ tone = 'teal', children, icon }) {
  const tones = {
    teal:   { bg: 'rgba(0,106,106,.10)',  fg: '#006a6a' },
    purple: { bg: 'rgba(106,76,147,.10)', fg: '#6a4c93' },
    pink:   { bg: 'rgba(181,84,140,.10)', fg: '#b5548c' },
    coral:  { bg: 'rgba(194,97,91,.10)',  fg: '#c2615b' },
    blue:   { bg: 'rgba(60,110,145,.10)', fg: '#3c6e91' },
    neutral:{ bg: '#efeee3',              fg: '#313429' },
  };
  const t = tones[tone];
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      background: t.bg, color: t.fg,
      fontFamily: 'Inter, sans-serif', fontSize: 10.5, fontWeight: 600,
      textTransform: 'uppercase', letterSpacing: '.14em',
      padding: '4px 8px', borderRadius: 2,
    }}>
      {icon && <span className="material-symbols-outlined" style={{ fontSize: 13 }}>{icon}</span>}
      {children}
    </span>
  );
}

// A blueprint-style annotation tick (dimension line w/ label)
function AnnotationMark({ label, length = 60, orientation = 'horizontal', color = 'rgba(49,52,41,.45)', style }) {
  if (orientation === 'horizontal') {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, color, ...style }}>
        <div style={{ width: 1, height: 8, background: color }} />
        <div style={{ height: 0.5, width: length, background: color }} />
        <Mono style={{ color, fontSize: 10 }}>{label}</Mono>
        <div style={{ height: 0.5, width: length, background: color }} />
        <div style={{ width: 1, height: 8, background: color }} />
      </div>
    );
  }
  return (
    <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: 6, color, ...style }}>
      <div style={{ height: 1, width: 8, background: color }} />
      <div style={{ width: 0.5, height: length, background: color }} />
      <Mono style={{ color, fontSize: 10, writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>{label}</Mono>
      <div style={{ width: 0.5, height: length, background: color }} />
      <div style={{ height: 1, width: 8, background: color }} />
    </div>
  );
}

// Section eyebrow: numeric index + label
function SectionEyebrow({ index, children, style }) {
  return (
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, ...style }}>
      <Mono style={{ color: '#5e6054', fontSize: 11 }}>{index}</Mono>
      <div style={{ flex: 1, height: 0.5, background: 'rgba(49,52,41,.15)' }} />
      <Label>{children}</Label>
    </div>
  );
}

Object.assign(window, { Button, Chip, Label, Mono, AnnotationMark, SectionEyebrow });
