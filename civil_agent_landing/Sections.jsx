/* global React */
const { useState, useEffect } = React;

// ─────────────────────────────────────────────────────────
//  SECTIONS — How it works, Live preview, FAQ, CTA, Footer
// ─────────────────────────────────────────────────────────

function HowItWorks({ material }) {
  const accent = material === 'Steel' ? '#c2615b' : '#006a6a';

  const steps = [
    {
      n: '01',
      eyebrow: 'Input',
      title: 'Import the architectural massing.',
      body: 'Bring in floor plates, cores, and voids from Rhino, Revit, or IFC. Civil Agent parses the geometry into a Building Graph — bays, spans, tributary areas.',
      tag: 'Building Graph',
      tagTone: 'blue',
      annotation: '.dwg · .ifc · .3dm',
    },
    {
      n: '02',
      eyebrow: 'Constraints',
      title: 'Declare the constraints.',
      body: 'Material system, target floor-to-floor, seismic and wind zone, code jurisdiction. Civil Agent runs the load paths and flags transfer risk before a single member is sized.',
      tag: 'ACI 318 · ASCE 7',
      tagTone: 'teal',
      annotation: 'jurisdiction · SDC',
    },
    {
      n: '03',
      eyebrow: 'Optimize',
      title: 'Compare schemes side by side.',
      body: 'Physics-based iteration across grid spacing, lateral system, and depth of structure. Every scheme carries a confidence interval against code and cost.',
      tag: 'Structural Design Graph',
      tagTone: 'purple',
      annotation: '≥ 47 schemes · 8 min',
    },
    {
      n: '04',
      eyebrow: 'Handoff',
      title: 'Hand off, not hand over.',
      body: 'Export the chosen scheme as a structured report — member schedule, design notes, load tables, and a live link back to the graph. Your consultant continues from the same source of truth.',
      tag: 'Design Summary',
      tagTone: 'coral',
      annotation: '.pdf · .ifc · live link',
    },
  ];

  return (
    <section style={{ padding: '120px 40px 96px', background: '#fbf9f2' }}>
      <div style={{ maxWidth: 1320, margin: '0 auto' }}>
        <SectionEyebrow index="02 / 05">How it works</SectionEyebrow>

        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1.4fr',
          gap: 64, marginTop: 48, marginBottom: 80,
        }}>
          <h2 style={{
            fontFamily: 'Space Grotesk, sans-serif', fontSize: 44, fontWeight: 600,
            letterSpacing: '-.02em', lineHeight: 1.05, color: '#313429', margin: 0,
            textWrap: 'balance',
          }}>
            From massing to member schedule, without the two-week loop.
          </h2>
          <p style={{
            fontFamily: 'Inter, sans-serif', fontSize: 16, lineHeight: 1.6,
            color: '#5e6054', maxWidth: 560, marginTop: 12,
          }}>
            Civil Agent does not generate a building. It reasons about the one you already have — producing engineering-grade structural schemes that your team and your consultant can trust, interrogate, and iterate on.
          </p>
        </div>

        {/* Step pipeline */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 0, position: 'relative',
        }}>
          {/* Connector line behind */}
          <div style={{
            position: 'absolute', top: 40, left: '12.5%', right: '12.5%',
            height: 0.5, background: 'rgba(49,52,41,.2)', zIndex: 0,
          }} />

          {steps.map((s, i) => (
            <div key={s.n} style={{
              position: 'relative', zIndex: 1,
              padding: '0 24px 0 0', paddingTop: 0,
            }}>
              {/* Node */}
              <div style={{
                width: 80, height: 80,
                background: '#fbf9f2',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginLeft: -8, marginBottom: 24,
              }}>
                <div style={{
                  width: 56, height: 56,
                  background: i === 0 ? accent : '#f5f4eb',
                  color: i === 0 ? '#faf7f6' : '#313429',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 18,
                  letterSpacing: '-.01em',
                }}>{s.n}</div>
              </div>

              <Label style={{ color: '#5e6054', marginBottom: 10, display: 'block' }}>{s.eyebrow}</Label>
              <h3 style={{
                fontFamily: 'Space Grotesk, sans-serif', fontSize: 20, fontWeight: 600,
                color: '#313429', margin: '0 0 12px', lineHeight: 1.25, letterSpacing: '-.005em',
              }}>{s.title}</h3>
              <p style={{
                fontFamily: 'Inter, sans-serif', fontSize: 13.5, lineHeight: 1.55,
                color: '#313429', margin: '0 0 20px', maxWidth: 280,
              }}>{s.body}</p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <Chip tone={s.tagTone}>{s.tag}</Chip>
                <Mono style={{ color: '#5e6054', fontSize: 10.5 }}>{s.annotation}</Mono>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function LivePreview() {
  return (
    <section style={{
      padding: '96px 40px', background: '#f5f4eb',
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{ maxWidth: 1320, margin: '0 auto' }}>
        <SectionEyebrow index="03 / 05">Live product preview</SectionEyebrow>

        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: 48,
          alignItems: 'end', marginTop: 40, marginBottom: 48,
        }}>
          <div>
            <h2 style={{
              fontFamily: 'Space Grotesk, sans-serif', fontSize: 40, fontWeight: 600,
              letterSpacing: '-.02em', lineHeight: 1.05, color: '#313429', margin: 0,
              textWrap: 'balance',
            }}>
              The Building Graph, rendered at engineering fidelity.
            </h2>
          </div>
          <p style={{
            fontFamily: 'Inter, sans-serif', fontSize: 15, lineHeight: 1.6,
            color: '#5e6054', maxWidth: 520, margin: 0,
          }}>
            Every element is queryable. Confidence intervals, load paths, and code citations sit one hover away — because an engineer has to trust the output, not just look at it.
          </p>
        </div>
      </div>

      {/* Browser chrome + embed */}
      <div style={{ maxWidth: 1440, margin: '0 auto' }}>
        <div style={{
          background: '#fbf9f2',
          boxShadow: '0 28px 32px -12px rgba(49,52,41,.06)',
          overflow: 'hidden',
        }}>
          {/* Chrome */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 12,
            padding: '10px 16px',
            borderBottom: '0.5px solid rgba(49,52,41,.12)',
            background: '#efeee3',
          }}>
            <div style={{ display: 'flex', gap: 6 }}>
              {['#c2615b', '#b8842b', '#4a7c59'].map(c => (
                <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c, opacity: 0.65 }} />
              ))}
            </div>
            <div style={{
              flex: 1, textAlign: 'center',
              fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: '#5e6054',
            }}>
              civilagent.com/project/<span style={{ color: '#313429' }}>cornerstone-tower</span>/graph
            </div>
            <Mono style={{ fontSize: 10.5 }}>read-only preview</Mono>
          </div>

          {/* The actual embed */}
          <iframe
            src="../ui_kits/vellum_structures/index.html"
            style={{ width: '100%', height: 680, border: 'none', background: '#fbf9f2', display: 'block' }}
            title="Civil Agent live preview"
          />
        </div>

        {/* Caption under frame */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '16px 4px', gap: 24,
        }}>
          <Mono>fig. 003 — Cornerstone Tower · L1–L7 · RC flat-slab · 2-bay core</Mono>
          <a href="../ui_kits/vellum_structures/index.html" target="_blank"
             style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#006a6a', textDecoration: 'underline', textUnderlineOffset: 3 }}>
             Open full preview →
          </a>
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const [open, setOpen] = useState(0);
  const items = [
    {
      q: 'Does Civil Agent replace my structural engineer?',
      a: 'No. Civil Agent produces preliminary, code-compliant schemes for the early-design phase — the stage where schemes are normally sketched by hand in a meeting. The output is a starting point for your structural consultant, not a replacement. Every element, load path, and design decision is traceable, so your engineer can audit and take over without re-deriving the problem.',
    },
    {
      q: 'What structural systems are supported?',
      a: 'At launch: reinforced-concrete flat-plate, flat-slab with drops, one-way joist, and two-way with beams. Steel: composite beam-and-column with braced or moment frames, and steel-plate shear walls. Hybrid concrete-steel transfer schemes are supported with explicit transfer-risk annotations.',
    },
    {
      q: 'Which codes are implemented?',
      a: 'ACI 318-19 and AISC 360-22 for member design. ASCE 7-22 for loads. IBC 2024 for jurisdictional references. Additional jurisdictions (Eurocode, NBCC) are in evaluation — request your jurisdiction when you sign up for early access.',
    },
    {
      q: 'How is this different from a generative AI tool?',
      a: 'Civil Agent is constraint-driven and physics-based, not generative. It does not hallucinate geometry. The schemes it compares are produced by a deterministic solver that respects equilibrium, serviceability, and code limits; the agent\u2019s job is to search that space intelligently and explain the trade-offs.',
    },
    {
      q: 'Do I need to change my modeling workflow?',
      a: 'No. Civil Agent ingests the geometry you already produce — Rhino, Revit, or IFC — and writes back a structured report plus an IFC export for your consultant\u2019s workflow. We do not ask you to model in a new tool.',
    },
    {
      q: 'Is early access limited?',
      a: 'Yes. We are onboarding a small cohort of AEC firms during Q3 2026 to calibrate the solver against real project data. Waitlist requests from structural engineers and AEC firms are prioritized.',
    },
  ];

  return (
    <section style={{ padding: '120px 40px', background: '#fbf9f2' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <SectionEyebrow index="04 / 05">Frequently asked</SectionEyebrow>

        <h2 style={{
          fontFamily: 'Space Grotesk, sans-serif', fontSize: 44, fontWeight: 600,
          letterSpacing: '-.02em', lineHeight: 1.05, color: '#313429',
          margin: '40px 0 64px', textWrap: 'balance', maxWidth: 720,
        }}>
          Questions structural engineers tend to ask first.
        </h2>

        <div>
          {items.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={i} style={{
                borderTop: '0.5px solid rgba(49,52,41,.15)',
                borderBottom: i === items.length - 1 ? '0.5px solid rgba(49,52,41,.15)' : 'none',
              }}>
                <button onClick={() => setOpen(isOpen ? -1 : i)} style={{
                  width: '100%', background: 'transparent', border: 'none',
                  padding: '28px 0', textAlign: 'left', cursor: 'pointer',
                  display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 24,
                }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 24, flex: 1 }}>
                    <Mono style={{ color: '#5e6054', fontSize: 11, marginTop: 4, minWidth: 24 }}>
                      {String(i + 1).padStart(2, '0')}
                    </Mono>
                    <span style={{
                      fontFamily: 'Space Grotesk, sans-serif', fontSize: 20, fontWeight: 500,
                      color: '#313429', lineHeight: 1.3,
                    }}>{item.q}</span>
                  </div>
                  <span className="material-symbols-outlined" style={{
                    fontSize: 24, color: '#5e6054',
                    transition: 'transform 200ms cubic-bezier(.2,0,0,1)',
                    transform: isOpen ? 'rotate(45deg)' : 'rotate(0)',
                  }}>add</span>
                </button>
                <div style={{
                  maxHeight: isOpen ? 400 : 0, overflow: 'hidden',
                  transition: 'max-height 320ms cubic-bezier(.2,0,0,1)',
                }}>
                  <p style={{
                    fontFamily: 'Inter, sans-serif', fontSize: 15, lineHeight: 1.6,
                    color: '#313429', margin: '0 0 32px', paddingLeft: 48, maxWidth: 720,
                    textWrap: 'pretty',
                  }}>{item.a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function FinalCTA({ material }) {
  const accent = material === 'Steel' ? '#c2615b' : '#006a6a';
  return (
    <section style={{
      padding: '120px 40px',
      background: '#313429', color: '#faf7f6',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Subtle inverse drafting grid */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.06, pointerEvents: 'none',
        backgroundImage: `
          linear-gradient(to right, #faf7f6 1px, transparent 1px),
          linear-gradient(to bottom, #faf7f6 1px, transparent 1px)`,
        backgroundSize: '40px 40px',
      }} />

      <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative' }}>
        <SectionEyebrow index="05 / 05" style={{ '--label-color': '#9e9d97' }}>
          <span style={{ color: '#9e9d97' }}>Request early access</span>
        </SectionEyebrow>

        <div style={{
          display: 'grid', gridTemplateColumns: '1.3fr 1fr',
          gap: 64, marginTop: 48, alignItems: 'end',
        }}>
          <div>
            <h2 style={{
              fontFamily: 'Space Grotesk, sans-serif', fontSize: 60, fontWeight: 600,
              letterSpacing: '-.025em', lineHeight: 1.02,
              color: '#faf7f6', margin: 0, textWrap: 'balance',
            }}>
              Join the first cohort of AEC firms running preliminary design at the speed of conversation.
            </h2>
          </div>

          <div>
            <p style={{
              fontFamily: 'Inter, sans-serif', fontSize: 14.5, lineHeight: 1.6,
              color: '#b5b4ad', margin: '0 0 28px',
            }}>
              Onboarding in cohorts of 12 firms. We prioritize structural engineers and mixed AEC teams shipping real projects this year.
            </p>

            {/* Email capture */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 0,
              borderBottom: '0.5px solid rgba(250,247,246,.35)',
              paddingBottom: 12,
            }}>
              <span className="material-symbols-outlined" style={{ color: '#9e9d97', fontSize: 18, marginRight: 10 }}>mail</span>
              <input
                type="email" placeholder="you@firm.com"
                style={{
                  flex: 1, background: 'transparent', border: 'none', outline: 'none',
                  color: '#faf7f6', fontFamily: 'Inter, sans-serif', fontSize: 15,
                  padding: '6px 0',
                }}
              />
              <button style={{
                background: accent, color: '#faf7f6', border: 'none',
                fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 700,
                textTransform: 'uppercase', letterSpacing: '.18em',
                padding: '10px 20px', cursor: 'pointer',
                display: 'inline-flex', alignItems: 'center', gap: 8,
              }}>
                Request access
                <span className="material-symbols-outlined" style={{ fontSize: 16 }}>arrow_forward</span>
              </button>
            </div>

            <div style={{ display: 'flex', gap: 20, marginTop: 24, flexWrap: 'wrap' }}>
              <Mono style={{ color: '#9e9d97' }}>·  structural · AEC · architect</Mono>
              <Mono style={{ color: '#9e9d97' }}>·  no credit card</Mono>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const cols = [
    { h: 'Product',  items: ['Overview', 'Building Graph', 'Design Summary', 'Changelog'] },
    { h: 'Engineering', items: ['ACI 318-19', 'AISC 360-22', 'ASCE 7-22', 'Jurisdictions'] },
    { h: 'Company',  items: ['About', 'Careers', 'Contact', 'Press'] },
    { h: 'Legal',    items: ['Terms', 'Privacy', 'Security', 'Status'] },
  ];
  return (
    <footer style={{ padding: '64px 40px 40px', background: '#fbf9f2', borderTop: '0.5px solid rgba(49,52,41,.12)' }}>
      <div style={{ maxWidth: 1320, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.3fr repeat(4, 1fr)', gap: 48, marginBottom: 64 }}>
          <div>
            <Wordmark />
            <p style={{
              fontFamily: 'Inter, sans-serif', fontSize: 13, lineHeight: 1.55,
              color: '#5e6054', marginTop: 16, maxWidth: 280,
            }}>
              Structural intelligence for preliminary design. Built in collaboration with practicing structural engineers.
            </p>
          </div>
          {cols.map(c => (
            <div key={c.h}>
              <Label style={{ display: 'block', marginBottom: 16 }}>{c.h}</Label>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {c.items.map(i => (
                  <li key={i}>
                    <a href="#" style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#313429', textDecoration: 'none' }}>{i}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          paddingTop: 24, borderTop: '0.5px solid rgba(49,52,41,.12)',
          flexWrap: 'wrap', gap: 16,
        }}>
          <Mono>© 2026 Civil Agent · San Francisco + Zurich</Mono>
          <div style={{ display: 'flex', gap: 16 }}>
            <Mono>v0.8.2</Mono>
            <Mono style={{ color: '#4a7c59' }}>● all systems nominal</Mono>
          </div>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { HowItWorks, LivePreview, FAQ, FinalCTA, Footer });
