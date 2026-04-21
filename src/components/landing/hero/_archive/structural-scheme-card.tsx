// ARCHIVED — originally rendered during hero init as a scheme preview.
// Removed from live render 2026-04-21 because it flashed on page reload.
// Kept for potential reuse as a standalone element in a future section.

export function ArchivedStructuralSchemeCard() {
  return (
    <svg
      aria-hidden="true"
      className="h-full w-full"
      fill="none"
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 960 560"
    >
      <defs>
        <linearGradient id="posterGrid" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="rgba(180,220,255,0.2)" />
          <stop offset="100%" stopColor="rgba(180,220,255,0.04)" />
        </linearGradient>
        <radialGradient id="posterGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(180,220,255,0.24)" />
          <stop offset="100%" stopColor="rgba(180,220,255,0)" />
        </radialGradient>
      </defs>

      <rect fill="#0A0A0B" height="560" width="960" />
      <rect fill="#111113" height="420" rx="18" width="760" x="100" y="70" />
      <rect
        height="420"
        rx="18"
        stroke="rgba(245,245,245,0.08)"
        width="760"
        x="100"
        y="70"
      />

      <path
        d="M100 150H860M100 230H860M100 310H860M100 390H860"
        stroke="rgba(255,255,255,0.04)"
      />
      <path
        d="M180 70V490M260 70V490M340 70V490M420 70V490M500 70V490M580 70V490M660 70V490M740 70V490"
        stroke="rgba(255,255,255,0.04)"
      />

      <ellipse cx="510" cy="372" fill="url(#posterGlow)" rx="190" ry="96" />

      <path
        d="M332 326L520 238L694 238L506 326Z"
        fill="rgba(143,184,224,0.08)"
        stroke="rgba(220,232,244,0.42)"
      />
      <path
        d="M332 326L332 214L506 126L506 326"
        stroke="rgba(220,232,244,0.46)"
      />
      <path
        d="M506 326L506 126L694 126L694 238"
        stroke="rgba(220,232,244,0.32)"
      />
      <path d="M332 214L520 126L694 126" stroke="rgba(220,232,244,0.42)" />

      <path d="M356 314L544 226" stroke="rgba(220,232,244,0.4)" />
      <path d="M390 330L578 242" stroke="rgba(220,232,244,0.28)" />
      <path d="M424 346L612 258" stroke="rgba(220,232,244,0.18)" />

      <path
        d="M388 178V320M458 146V288M528 178V320M598 146V288"
        stroke="rgba(220,232,244,0.28)"
      />
      <path
        d="M476 248L424 274"
        stroke="rgba(217,107,97,0.85)"
        strokeDasharray="8 7"
        strokeWidth="2.4"
      />
      <path
        d="M572 202L620 178"
        stroke="rgba(217,107,97,0.85)"
        strokeDasharray="8 7"
        strokeWidth="2.4"
      />
      <circle cx="474" cy="248" fill="rgba(217,107,97,0.9)" r="8" />
      <circle cx="424" cy="274" fill="rgba(180,220,255,0.9)" r="8" />
      <circle cx="572" cy="202" fill="rgba(217,107,97,0.9)" r="8" />
      <circle cx="620" cy="178" fill="rgba(180,220,255,0.9)" r="8" />

      <rect
        fill="rgba(17,17,19,0.92)"
        height="88"
        rx="12"
        stroke="rgba(255,255,255,0.08)"
        width="222"
        x="146"
        y="114"
      />
      <text
        fill="rgba(138,138,147,1)"
        fontFamily="var(--font-mono), monospace"
        fontSize="14"
        letterSpacing="2.2"
        x="172"
        y="144"
      >
        STRUCTURAL SCHEME
      </text>
      <text
        fill="rgba(245,245,245,1)"
        fontFamily="var(--font-display), var(--font-body), sans-serif"
        fontSize="34"
        fontWeight="600"
        x="172"
        y="186"
      >
        Steel frame /
      </text>
      <text
        fill="rgba(245,245,245,1)"
        fontFamily="var(--font-display), var(--font-body), sans-serif"
        fontSize="34"
        fontWeight="600"
        x="172"
        y="222"
      >
        braced core
      </text>

      <text
        fill="rgba(138,138,147,1)"
        fontFamily="var(--font-mono), monospace"
        fontSize="14"
        letterSpacing="2.2"
        x="636"
        y="168"
      >
        BAYS
      </text>
      <text
        fill="rgba(138,138,147,1)"
        fontFamily="var(--font-mono), monospace"
        fontSize="14"
        letterSpacing="2.2"
        x="674"
        y="286"
      >
        SPANS
      </text>
      <text
        fill="rgba(138,138,147,1)"
        fontFamily="var(--font-mono), monospace"
        fontSize="14"
        letterSpacing="2.2"
        x="316"
        y="394"
      >
        TRIBUTARY AREAS
      </text>
    </svg>
  );
}
