import { useState, useEffect, useCallback } from "react";

// ─── Data ────────────────────────────────────────────────────────────────────
const ACCENT = "#06B6D4";
const BG = "#0F172A";
const CARD = "#1E293B";
const BORDER = "#334155";
const TEXT = "#F8FAFC";
const TEXT2 = "#94A3B8";

const TABS = [
  { id: "em", label: "EM-stråling" },
  { id: "beer", label: "Beer-Lambert & UV/VIS" },
  { id: "foto", label: "Fotometrisk titrering" },
  { id: "fluor", label: "Fluorescens & fosforescens" },
  { id: "aas", label: "AAS" },
  { id: "ms", label: "Massespektrometri" },
];

// ─── Shared components ──────────────────────────────────────────────────────

function Pill({ term, def, accent = ACCENT }) {
  const [open, setOpen] = useState(false);
  return (
    <span
      onClick={() => setOpen(!open)}
      style={{
        display: "inline-block",
        background: open ? accent + "22" : CARD,
        border: `1px solid ${open ? accent : BORDER}`,
        borderRadius: 20,
        padding: "4px 14px",
        margin: "4px",
        cursor: "pointer",
        fontSize: 13,
        fontFamily: "'Source Sans 3', sans-serif",
        color: open ? accent : TEXT,
        transition: "all .2s",
        position: "relative",
      }}
    >
      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 600 }}>
        {term}
      </span>
      {open && (
        <span
          style={{
            display: "block",
            color: TEXT2,
            fontSize: 12,
            marginTop: 2,
            fontFamily: "'Source Sans 3', sans-serif",
          }}
        >
          {def}
        </span>
      )}
    </span>
  );
}

function Section({ title, children, icon }) {
  return (
    <div
      style={{
        background: CARD,
        border: `1px solid ${BORDER}`,
        borderRadius: 12,
        padding: "20px 24px",
        marginBottom: 16,
      }}
    >
      <h3
        style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          color: ACCENT,
          fontSize: 16,
          fontWeight: 700,
          marginBottom: 12,
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        {icon && <span style={{ fontSize: 18 }}>{icon}</span>}
        {title}
      </h3>
      {children}
    </div>
  );
}

function CollapsibleStep({ num, title, children }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      style={{
        borderLeft: `3px solid ${open ? ACCENT : BORDER}`,
        paddingLeft: 16,
        marginBottom: 10,
        cursor: "pointer",
        transition: "border-color .2s",
      }}
      onClick={() => setOpen(!open)}
    >
      <div
        style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontWeight: 600,
          color: open ? ACCENT : TEXT,
          fontSize: 14,
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <span
          style={{
            background: open ? ACCENT : BORDER,
            color: open ? BG : TEXT,
            borderRadius: "50%",
            width: 24,
            height: 24,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 12,
            fontWeight: 700,
            flexShrink: 0,
          }}
        >
          {num}
        </span>
        {title}
        <span style={{ marginLeft: "auto", fontSize: 12, color: TEXT2 }}>
          {open ? "▲" : "▼"}
        </span>
      </div>
      {open && (
        <div
          style={{
            color: TEXT2,
            fontSize: 14,
            fontFamily: "'Source Sans 3', sans-serif",
            marginTop: 8,
            lineHeight: 1.6,
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
}

function Huskeregel({ children }) {
  return (
    <div
      style={{
        background: ACCENT + "11",
        border: `2px solid ${ACCENT}44`,
        borderRadius: 12,
        padding: "16px 20px",
        marginBottom: 16,
        borderLeft: `4px solid ${ACCENT}`,
      }}
    >
      <div
        style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontWeight: 700,
          color: ACCENT,
          fontSize: 14,
          marginBottom: 6,
        }}
      >
        💡 Huskeregel
      </div>
      <div
        style={{
          color: TEXT,
          fontSize: 14,
          fontFamily: "'Source Sans 3', sans-serif",
          lineHeight: 1.6,
        }}
      >
        {children}
      </div>
    </div>
  );
}

function ExamBox({ children }) {
  return (
    <div
      style={{
        background: "#7C3AED11",
        border: `1px solid #7C3AED44`,
        borderRadius: 10,
        padding: "12px 16px",
        marginBottom: 16,
      }}
    >
      <div
        style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontWeight: 700,
          color: "#A78BFA",
          fontSize: 13,
          marginBottom: 4,
        }}
      >
        🎓 Eksamensrelevans
      </div>
      <div
        style={{
          color: TEXT2,
          fontSize: 13,
          fontFamily: "'Source Sans 3', sans-serif",
          lineHeight: 1.5,
        }}
      >
        {children}
      </div>
    </div>
  );
}

function F({ children }) {
  return (
    <span
      style={{
        fontFamily: "'JetBrains Mono', monospace",
        color: ACCENT,
        fontSize: "0.92em",
      }}
    >
      {children}
    </span>
  );
}

function P({ children }) {
  return (
    <p
      style={{
        color: TEXT2,
        fontSize: 14,
        fontFamily: "'Source Sans 3', sans-serif",
        lineHeight: 1.7,
        marginBottom: 12,
      }}
    >
      {children}
    </p>
  );
}

function Eq({ children }) {
  return (
    <div
      style={{
        background: BG,
        border: `1px solid ${BORDER}`,
        borderRadius: 8,
        padding: "12px 16px",
        margin: "10px 0",
        fontFamily: "'JetBrains Mono', monospace",
        color: ACCENT,
        fontSize: 15,
        textAlign: "center",
        letterSpacing: 0.5,
        overflowX: "auto",
      }}
    >
      {children}
    </div>
  );
}

// ─── SVG Visuals ─────────────────────────────────────────────────────────────

function EMSpectrumSVG() {
  const regions = [
    { label: "γ-stråling", range: "< 0.01 nm", color: "#8B5CF6", x: 0, w: 70 },
    { label: "Røntgen", range: "0.01–10 nm", color: "#6366F1", x: 70, w: 80 },
    { label: "UV", range: "10–380 nm", color: "#3B82F6", x: 150, w: 90 },
    { label: "Synlig", range: "380–780 nm", color: "#10B981", x: 240, w: 80 },
    { label: "IR", range: "780 nm–1 mm", color: "#F59E0B", x: 320, w: 90 },
    { label: "Mikro", range: "1 mm–1 m", color: "#EF4444", x: 410, w: 80 },
    { label: "Radio", range: "> 1 m", color: "#EC4899", x: 490, w: 80 },
  ];
  return (
    <svg viewBox="0 0 580 180" style={{ width: "100%", maxWidth: 600 }}>
      <defs>
        <linearGradient id="specGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#8B5CF6" />
          <stop offset="25%" stopColor="#3B82F6" />
          <stop offset="40%" stopColor="#10B981" />
          <stop offset="55%" stopColor="#EAB308" />
          <stop offset="70%" stopColor="#F59E0B" />
          <stop offset="85%" stopColor="#EF4444" />
          <stop offset="100%" stopColor="#EC4899" />
        </linearGradient>
      </defs>
      <rect x="5" y="55" width="570" height="18" rx="4" fill="url(#specGrad)" opacity="0.85" />
      {regions.map((r, i) => (
        <g key={i}>
          <rect x={r.x + 5} y="80" width={r.w - 4} height="28" rx="4" fill={r.color} opacity="0.18" stroke={r.color} strokeWidth="1" />
          <text x={r.x + r.w / 2 + 3} y="98" textAnchor="middle" fill={r.color} fontSize="10" fontFamily="'Plus Jakarta Sans', sans-serif" fontWeight="700">
            {r.label}
          </text>
          <text x={r.x + r.w / 2 + 3} y="122" textAnchor="middle" fill={TEXT2} fontSize="8" fontFamily="'JetBrains Mono', monospace">
            {r.range}
          </text>
        </g>
      ))}
      <text x="5" y="46" fill={TEXT2} fontSize="10" fontFamily="'Source Sans 3', sans-serif">Høy energi / kort λ</text>
      <text x="490" y="46" fill={TEXT2} fontSize="10" fontFamily="'Source Sans 3', sans-serif">Lav energi / lang λ</text>
      <line x1="5" y1="50" x2="575" y2="50" stroke={BORDER} strokeWidth="1" markerEnd="url(#arrowEM)" />
      <defs>
        <marker id="arrowEM" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6" fill={BORDER} />
        </marker>
      </defs>
      <text x="290" y="155" textAnchor="middle" fill={ACCENT} fontSize="11" fontFamily="'Plus Jakarta Sans', sans-serif" fontWeight="700">
        E = hν = hc/λ → Kort λ = høy E
      </text>
    </svg>
  );
}

function BeerLambertSVG() {
  return (
    <svg viewBox="0 0 520 200" style={{ width: "100%", maxWidth: 520 }}>
      <rect x="60" y="40" width="120" height="120" rx="6" fill={ACCENT + "15"} stroke={ACCENT} strokeWidth="2" />
      <text x="120" y="105" textAnchor="middle" fill={ACCENT} fontSize="12" fontFamily="'JetBrains Mono', monospace" fontWeight="700">Kyvette</text>
      <text x="120" y="122" textAnchor="middle" fill={TEXT2} fontSize="10" fontFamily="'Source Sans 3', sans-serif">b (cm)</text>
      {[0, 1, 2, 3, 4].map((i) => (
        <line key={i} x1="10" y1={65 + i * 22} x2="55" y2={65 + i * 22} stroke="#FBBF24" strokeWidth="3" opacity={0.9 - i * 0.05} />
      ))}
      <text x="20" y="38" fill="#FBBF24" fontSize="11" fontFamily="'Plus Jakarta Sans', sans-serif" fontWeight="700">P₀</text>
      {[0, 1, 2].map((i) => (
        <line key={i} x1="185" y1={75 + i * 28} x2="240" y2={75 + i * 28} stroke="#FBBF24" strokeWidth="2" opacity={0.5} />
      ))}
      <text x="210" y="38" fill="#FBBF24" fontSize="11" fontFamily="'Plus Jakarta Sans', sans-serif" fontWeight="700" opacity="0.6">P</text>
      <rect x="260" y="50" width="240" height="100" rx="8" fill={CARD} stroke={BORDER} strokeWidth="1" />
      <text x="380" y="72" textAnchor="middle" fill={ACCENT} fontSize="13" fontFamily="'JetBrains Mono', monospace" fontWeight="700">A = εbc</text>
      <text x="380" y="95" textAnchor="middle" fill={TEXT2} fontSize="10" fontFamily="'Source Sans 3', sans-serif">A = absorbans (dimensjonsløs)</text>
      <text x="380" y="110" textAnchor="middle" fill={TEXT2} fontSize="10" fontFamily="'Source Sans 3', sans-serif">ε = molar absorptivitet (L/mol·cm)</text>
      <text x="380" y="125" textAnchor="middle" fill={TEXT2} fontSize="10" fontFamily="'Source Sans 3', sans-serif">b = optisk veilengde (cm)</text>
      <text x="380" y="140" textAnchor="middle" fill={TEXT2} fontSize="10" fontFamily="'Source Sans 3', sans-serif">c = konsentrasjon (mol/L)</text>
      <text x="380" y="178" textAnchor="middle" fill={TEXT2} fontSize="11" fontFamily="'JetBrains Mono', monospace">T = P/P₀  →  A = −log(T)</text>
    </svg>
  );
}

function PhotoTitrationSVG() {
  const curves = [
    { label: "A absorberer", path: "M30,40 L120,130 L210,130", dA: true, dT: false, dP: false },
    { label: "T absorberer", path: "M30,130 L120,130 L210,40", dA: false, dT: true, dP: false },
    { label: "P absorberer", path: "M30,130 L120,40 L210,40", dA: false, dT: false, dP: true },
    { label: "A + T absorberer", path: "M30,40 L120,80 L210,40", dA: true, dT: true, dP: false },
  ];
  return (
    <svg viewBox="0 0 560 180" style={{ width: "100%", maxWidth: 560 }}>
      {curves.map((c, i) => {
        const ox = i * 140;
        return (
          <g key={i} transform={`translate(${ox}, 0)`}>
            <line x1="28" y1="135" x2="215" y2="135" stroke={BORDER} strokeWidth="1" />
            <line x1="28" y1="35" x2="28" y2="135" stroke={BORDER} strokeWidth="1" />
            <path d={c.path} fill="none" stroke={ACCENT} strokeWidth="2.5" strokeLinejoin="round" />
            <circle cx="120" cy={c.path.includes("80") ? 80 : 130} r="4" fill="#EF4444" />
            <text x="120" y="157" textAnchor="middle" fill={TEXT2} fontSize="8" fontFamily="'Source Sans 3', sans-serif">{c.label}</text>
            <text x="120" y="170" textAnchor="middle" fill="#EF4444" fontSize="7" fontFamily="'JetBrains Mono', monospace">ekv.pkt</text>
            <text x="15" y="88" fill={TEXT2} fontSize="7" fontFamily="'Source Sans 3', sans-serif" transform={`rotate(-90, 15, 88)`}>A</text>
            <text x="120" y="148" fill={TEXT2} fontSize="7" fontFamily="'Source Sans 3', sans-serif">V(titrant)</text>
          </g>
        );
      })}
    </svg>
  );
}

function JablonskiSVG() {
  const lvl = (x, y, w, label, col) => (
    <g>
      <line x1={x} y1={y} x2={x + w} y2={y} stroke={col} strokeWidth="2.5" />
      <text x={x + w + 6} y={y + 4} fill={col} fontSize="9" fontFamily="'JetBrains Mono', monospace">{label}</text>
    </g>
  );
  return (
    <svg viewBox="0 0 480 260" style={{ width: "100%", maxWidth: 480 }}>
      {/* Ground state S0 */}
      {lvl(30, 230, 90, "S₀ (grunn)", TEXT)}
      {lvl(30, 218, 50, "v=1", BORDER)}
      {lvl(30, 206, 50, "v=2", BORDER)}
      {/* S1 */}
      {lvl(30, 100, 90, "S₁", "#3B82F6")}
      {lvl(30, 88, 50, "v=1", BORDER)}
      {lvl(30, 76, 50, "v=2", BORDER)}
      {/* T1 */}
      {lvl(280, 140, 90, "T₁ (triplett)", "#EF4444")}
      {lvl(280, 128, 50, "v=1", BORDER)}
      {/* Absorption arrow */}
      <line x1="50" y1="228" x2="50" y2="78" stroke="#FBBF24" strokeWidth="2.5" markerEnd="url(#arrowJup)" />
      <text x="18" y="155" fill="#FBBF24" fontSize="10" fontFamily="'Plus Jakarta Sans', sans-serif" fontWeight="700" transform="rotate(-90, 18, 155)">Absorpsjon</text>
      {/* Vibrational relaxation wavy */}
      <path d="M70,78 Q75,82 70,88 Q65,94 70,100" fill="none" stroke={TEXT2} strokeWidth="1.5" strokeDasharray="3,2" />
      <text x="78" y="90" fill={TEXT2} fontSize="7" fontFamily="'Source Sans 3', sans-serif">vib. rel.</text>
      {/* Fluorescence arrow */}
      <line x1="100" y1="102" x2="100" y2="216" stroke="#10B981" strokeWidth="2.5" markerEnd="url(#arrowJdn)" />
      <text x="108" y="160" fill="#10B981" fontSize="10" fontFamily="'Plus Jakarta Sans', sans-serif" fontWeight="700">Fluorescens</text>
      <text x="108" y="172" fill="#10B981" fontSize="8" fontFamily="'Source Sans 3', sans-serif">{"< 10⁻⁵ s"}</text>
      {/* ISC arrow */}
      <path d="M125,102 Q200,100 278,140" fill="none" stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="6,3" markerEnd="url(#arrowJisc)" />
      <text x="190" y="110" fill="#F59E0B" fontSize="8" fontFamily="'Source Sans 3', sans-serif">ISC (spinnendring)</text>
      {/* Phosphorescence */}
      <line x1="300" y1="142" x2="300" y2="228" stroke="#EF4444" strokeWidth="2.5" markerEnd="url(#arrowJpho)" strokeDasharray="6,3" />
      <text x="310" y="190" fill="#EF4444" fontSize="10" fontFamily="'Plus Jakarta Sans', sans-serif" fontWeight="700">Fosforescens</text>
      <text x="310" y="202" fill="#EF4444" fontSize="8" fontFamily="'Source Sans 3', sans-serif">min → timer</text>
      {/* S0 ground at phosph */}
      {lvl(270, 230, 80, "", TEXT)}
      {/* Stokes shift note */}
      <rect x="330" y="30" width="140" height="44" rx="6" fill={ACCENT + "15"} stroke={ACCENT} strokeWidth="1" />
      <text x="400" y="48" textAnchor="middle" fill={ACCENT} fontSize="9" fontFamily="'JetBrains Mono', monospace" fontWeight="700">Stokes-skift:</text>
      <text x="400" y="64" textAnchor="middle" fill={TEXT} fontSize="9" fontFamily="'JetBrains Mono', monospace">λ(abs) ≤ λ(fluor)</text>
      {/* Markers */}
      <defs>
        <marker id="arrowJup" markerWidth="8" markerHeight="6" refX="4" refY="3" orient="auto"><path d="M0,6 L4,0 L8,6" fill="#FBBF24" /></marker>
        <marker id="arrowJdn" markerWidth="8" markerHeight="6" refX="4" refY="3" orient="auto"><path d="M0,0 L4,6 L8,0" fill="#10B981" /></marker>
        <marker id="arrowJisc" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6" fill="#F59E0B" /></marker>
        <marker id="arrowJpho" markerWidth="8" markerHeight="6" refX="4" refY="3" orient="auto"><path d="M0,0 L4,6 L8,0" fill="#EF4444" /></marker>
      </defs>
    </svg>
  );
}

function AASSchemaSVG() {
  const box = (x, y, w, h, label, col) => (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="6" fill={col + "18"} stroke={col} strokeWidth="1.5" />
      <text x={x + w / 2} y={y + h / 2 + 4} textAnchor="middle" fill={col} fontSize="9" fontFamily="'Plus Jakarta Sans', sans-serif" fontWeight="700">{label}</text>
    </g>
  );
  return (
    <svg viewBox="0 0 560 220" style={{ width: "100%", maxWidth: 560 }}>
      {box(10, 30, 100, 50, "Hullkatode-", ACCENT)}
      <text x="60" y="68" textAnchor="middle" fill={ACCENT} fontSize="9" fontFamily="'Plus Jakarta Sans', sans-serif" fontWeight="700">lampe</text>
      <line x1="115" y1="55" x2="155" y2="55" stroke={ACCENT} strokeWidth="1.5" markerEnd="url(#arrAAS)" />
      {box(160, 20, 100, 70, "Flamme /", "#F59E0B")}
      <text x="210" y="68" textAnchor="middle" fill="#F59E0B" fontSize="9" fontFamily="'Plus Jakarta Sans', sans-serif" fontWeight="700">Grafittovn</text>
      <line x1="265" y1="55" x2="305" y2="55" stroke={ACCENT} strokeWidth="1.5" markerEnd="url(#arrAAS)" />
      {box(310, 30, 100, 50, "Monokromator", "#3B82F6")}
      <line x1="415" y1="55" x2="455" y2="55" stroke={ACCENT} strokeWidth="1.5" markerEnd="url(#arrAAS)" />
      {box(460, 30, 80, 50, "Detektor", "#10B981")}
      {/* Flamme vs Grafittovn comparison */}
      <rect x="10" y="110" width="250" height="100" rx="8" fill={CARD} stroke={BORDER} strokeWidth="1" />
      <text x="135" y="128" textAnchor="middle" fill="#F59E0B" fontSize="10" fontFamily="'Plus Jakarta Sans', sans-serif" fontWeight="700">Flamme-AAS</text>
      <text x="135" y="144" textAnchor="middle" fill={TEXT2} fontSize="9" fontFamily="'Source Sans 3', sans-serif">• Enkelt, rimelig, effektivt</text>
      <text x="135" y="158" textAnchor="middle" fill={TEXT2} fontSize="9" fontFamily="'Source Sans 3', sans-serif">• Kontinuerlig atomisering</text>
      <text x="135" y="172" textAnchor="middle" fill={TEXT2} fontSize="9" fontFamily="'Source Sans 3', sans-serif">• Lavere sensitivitet enn grafittovn</text>
      <text x="135" y="186" textAnchor="middle" fill={TEXT2} fontSize="9" fontFamily="'Source Sans 3', sans-serif">• Ulik T i ulike flammeregioner</text>
      <text x="135" y="200" textAnchor="middle" fill={TEXT2} fontSize="9" fontFamily="'Source Sans 3', sans-serif">• Over 70 grunnstoff</text>
      <rect x="280" y="110" width="265" height="100" rx="8" fill={CARD} stroke={BORDER} strokeWidth="1" />
      <text x="412" y="128" textAnchor="middle" fill="#EF4444" fontSize="10" fontFamily="'Plus Jakarta Sans', sans-serif" fontWeight="700">Elektrotermisk (Grafittovn)</text>
      <text x="412" y="144" textAnchor="middle" fill={TEXT2} fontSize="9" fontFamily="'Source Sans 3', sans-serif">• Høyere sensitivitet (diskret)</text>
      <text x="412" y="158" textAnchor="middle" fill={TEXT2} fontSize="9" fontFamily="'Source Sans 3', sans-serif">• Prøve i grafittrør, varmes av strøm</text>
      <text x="412" y="172" textAnchor="middle" fill={TEXT2} fontSize="9" fontFamily="'Source Sans 3', sans-serif">• Trinnvis: tørking → asking → atomisering</text>
      <text x="412" y="186" textAnchor="middle" fill={TEXT2} fontSize="9" fontFamily="'Source Sans 3', sans-serif">• Lavere deteksjonsgrense enn flamme</text>
      <text x="412" y="200" textAnchor="middle" fill={TEXT2} fontSize="9" fontFamily="'Source Sans 3', sans-serif">• Inert gass (Ar/N₂) i kammeret</text>
      <defs>
        <marker id="arrAAS" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6" fill={ACCENT} /></marker>
      </defs>
    </svg>
  );
}

function QuadrupoleSVG() {
  return (
    <svg viewBox="0 0 520 240" style={{ width: "100%", maxWidth: 520 }}>
      {/* Ion source */}
      <rect x="10" y="75" width="80" height="80" rx="8" fill="#8B5CF6" opacity="0.15" stroke="#8B5CF6" strokeWidth="1.5" />
      <text x="50" y="110" textAnchor="middle" fill="#8B5CF6" fontSize="10" fontFamily="'Plus Jakarta Sans', sans-serif" fontWeight="700">Ionekilde</text>
      <text x="50" y="126" textAnchor="middle" fill={TEXT2} fontSize="8" fontFamily="'Source Sans 3', sans-serif">(f.eks. ICP)</text>
      {/* Arrow */}
      <line x1="95" y1="115" x2="140" y2="115" stroke={TEXT2} strokeWidth="1.5" markerEnd="url(#arrQ)" />
      {/* Quadrupole rods */}
      <rect x="145" y="55" width="200" height="120" rx="8" fill={CARD} stroke={ACCENT} strokeWidth="1.5" />
      <text x="245" y="48" textAnchor="middle" fill={ACCENT} fontSize="11" fontFamily="'Plus Jakarta Sans', sans-serif" fontWeight="700">Kvadrupolanalysator</text>
      {/* 4 rods */}
      <ellipse cx="180" cy="82" rx="16" ry="10" fill="#EF4444" opacity="0.3" stroke="#EF4444" strokeWidth="1" />
      <text x="180" y="86" textAnchor="middle" fill="#EF4444" fontSize="8" fontFamily="'JetBrains Mono', monospace">+</text>
      <ellipse cx="310" cy="82" rx="16" ry="10" fill="#EF4444" opacity="0.3" stroke="#EF4444" strokeWidth="1" />
      <text x="310" y="86" textAnchor="middle" fill="#EF4444" fontSize="8" fontFamily="'JetBrains Mono', monospace">+</text>
      <ellipse cx="180" cy="148" rx="16" ry="10" fill="#3B82F6" opacity="0.3" stroke="#3B82F6" strokeWidth="1" />
      <text x="180" y="152" textAnchor="middle" fill="#3B82F6" fontSize="8" fontFamily="'JetBrains Mono', monospace">−</text>
      <ellipse cx="310" cy="148" rx="16" ry="10" fill="#3B82F6" opacity="0.3" stroke="#3B82F6" strokeWidth="1" />
      <text x="310" y="152" textAnchor="middle" fill="#3B82F6" fontSize="8" fontFamily="'JetBrains Mono', monospace">−</text>
      {/* Stable ion path */}
      <path d="M150,115 Q200,108 245,115 Q290,122 340,115" fill="none" stroke="#10B981" strokeWidth="2" />
      <circle cx="245" cy="115" r="4" fill="#10B981" />
      <text x="245" y="135" textAnchor="middle" fill="#10B981" fontSize="8" fontFamily="'Source Sans 3', sans-serif">stabil bane (riktig m/z)</text>
      {/* Unstable path */}
      <path d="M150,115 Q190,95 210,70" fill="none" stroke="#EF4444" strokeWidth="1.5" strokeDasharray="4,3" />
      <text x="205" y="65" fill="#EF4444" fontSize="7" fontFamily="'Source Sans 3', sans-serif">ustabil</text>
      {/* Arrow out */}
      <line x1="350" y1="115" x2="400" y2="115" stroke={TEXT2} strokeWidth="1.5" markerEnd="url(#arrQ)" />
      {/* Detector */}
      <rect x="405" y="85" width="70" height="60" rx="8" fill="#10B981" opacity="0.15" stroke="#10B981" strokeWidth="1.5" />
      <text x="440" y="115" textAnchor="middle" fill="#10B981" fontSize="10" fontFamily="'Plus Jakarta Sans', sans-serif" fontWeight="700">Detektor</text>
      {/* Resolution note */}
      <rect x="145" y="190" width="200" height="40" rx="6" fill={ACCENT + "11"} stroke={ACCENT + "44"} strokeWidth="1" />
      <text x="245" y="208" textAnchor="middle" fill={ACCENT} fontSize="9" fontFamily="'JetBrains Mono', monospace" fontWeight="700">R = m/Δm</text>
      <text x="245" y="222" textAnchor="middle" fill={TEXT2} fontSize="8" fontFamily="'Source Sans 3', sans-serif">Kvadrupol: relativt lav R (~1 Da)</text>
      <defs>
        <marker id="arrQ" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6" fill={TEXT2} /></marker>
      </defs>
    </svg>
  );
}

// ─── Tab Content Components ──────────────────────────────────────────────────

function TabEM() {
  return (
    <div>
      <Section title="Nøkkelbegreper" icon="🔑">
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          <Pill term="Bølgelengde (λ)" def="Avstand mellom to bølgetopper. Enhet: nm, m." />
          <Pill term="Frekvens (ν)" def="Antall svingninger per sekund. Enhet: Hz (s⁻¹)." />
          <Pill term="Bølgetall (ν̄)" def="Invers av bølgelengden: ν̄ = 1/λ. Enhet: cm⁻¹." />
          <Pill term="Foton" def="Diskret energipakke med E = hν." />
          <Pill term="Absorpsjon" def="Stråling tas opp av prøven → eksitasjon." />
          <Pill term="Emisjon" def="Prøven avgir stråling ved relaksering." />
          <Pill term="Transmittans (T)" def="Brøkdel stråling som passerer: T = P/P₀." />
          <Pill term="Eksitasjon" def="Tilførsel av energi løfter prøven til høyere energitilstand." />
          <Pill term="Relaksering" def="Overgang tilbake til grunntilstanden." />
          <Pill term="Kjemiluminescens" def="Kjemisk reaksjon gir eksitert produkt som emitterer." />
        </div>
      </Section>

      <Section title="Forklaring" icon="📖">
        <P>
          Elektromagnetisk (EM) stråling er energi som beveger seg gjennom rom — den trenger ikke et medium. Vi beskriver EM-stråling med både <F>bølgeegenskaper</F> og <F>partikkelegenskaper</F>.
        </P>
        <Eq>c = ν · λ &nbsp;&nbsp;→&nbsp;&nbsp; ν = c/λ</Eq>
        <P>
          Lyshastigheten i vakuum er <F>c ≈ 3.00 × 10⁸ m/s</F>. Frekvens og bølgelengde er omvendt proporsjonale — kort bølgelengde gir høy frekvens.
        </P>
        <Eq>E = hν = hc/λ = hcν̄</Eq>
        <P>
          Plancks konstant <F>h = 6.626 × 10⁻³⁴ J·s</F>. Kort bølgelengde → høy energi. Strålingseffekten <F>P</F> (watt) er proporsjonal med antall fotoner per sekund.
        </P>
        <P>
          Spektroskopi utnytter at prøven enten <F>absorberer</F> stråling (prøven eksiteres) eller <F>emitterer</F> stråling (prøven relakserer). Absorpsjonsspekteret viser hvilke bølgelengder prøven tar opp. Emisjonsspekteret viser bølgelengder prøven sender ut.
        </P>
        <P>
          <strong style={{ color: TEXT }}>Interaksjon mellom stråling og materie:</strong> Stråling kan reflekteres, brytes (refraksjon), spres (elastisk spredning), interferere, diffrakteres, transmitteres, eller absorberes. Absorpsjon skjer <F>kun</F> hvis strålingens energi matcher en tillatt overgang i prøven.
        </P>
        <P>
          <strong style={{ color: TEXT }}>Energioverganger i molekyler:</strong> Elektroniske overganger krever mest energi (UV/VIS), deretter vibrasjonsoverganger (IR), og rotasjonsoverganger krever minst. Atomer i gassfase har kun elektroniske overganger → smale linjer. Molekyler har alle tre → brede absorpsjonsbånd.
        </P>
        <P>
          <strong style={{ color: TEXT }}>Eksitasjonsmetoder:</strong> Absorpsjonsspektroskopi eksiterer med stråling. Emisjonsspektroskopi bruker varme. Fluorescens eksiteres med stråling. Kjemiluminescens eksiteres av en kjemisk reaksjon.
        </P>
      </Section>

      <Section title="Visuell illustrasjon — EM-spekteret" icon="🌈">
        <EMSpectrumSVG />
        <P>Spektroskopi i IMAK2004 fokuserer på UV/VIS-området (ca. 180–780 nm).</P>
      </Section>

      <Section title="Eksempel" icon="✏️">
        <P><strong style={{ color: TEXT }}>Oppgave:</strong> Beregn energien til et foton med bølgelengde λ = 500 nm.</P>
        <CollapsibleStep num={1} title="Omregn bølgelengde til meter">
          <F>λ = 500 nm = 500 × 10⁻⁹ m = 5.00 × 10⁻⁷ m</F>
        </CollapsibleStep>
        <CollapsibleStep num={2} title="Bruk E = hc/λ">
          <F>E = (6.626 × 10⁻³⁴ J·s × 3.00 × 10⁸ m/s) / (5.00 × 10⁻⁷ m)</F>
        </CollapsibleStep>
        <CollapsibleStep num={3} title="Beregn">
          <F>E = 3.98 × 10⁻¹⁹ J</F> per foton (synlig lys, grønt).
        </CollapsibleStep>
      </Section>

      <Huskeregel>
        <strong>«C-E-L-F»</strong>: <F>c = ν·λ</F>, <F>E = hν</F>, <F>L</F>ang bølgelengde = lav energi, <F>F</F>otoner er energipakker. Og husk rekkefølgen for energi i overganger: <strong>Elektronisk &gt; Vibrasjon &gt; Rotasjon</strong>.
      </Huskeregel>

      <ExamBox>
        V2025 oppg. 7a: Ranger stråletyper etter bølgelengde (γ, UV, synlig, IR). V2021 oppg. 3e: Ingen av de oppgitte størrelsene er proporsjonale med bølgelengde (de er alle omvendt proporsjonale eller uavhengige). V2022 oppg. 14g: Koble eksitasjonsmetode (stråling/varme/kjemisk) til riktig teknikk.
      </ExamBox>
    </div>
  );
}

function TabBeer() {
  return (
    <div>
      <Section title="Nøkkelbegreper" icon="🔑">
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          <Pill term="Absorbans (A)" def="A = log(P₀/P) = εbc. Dimensjonsløs." />
          <Pill term="Transmittans (T)" def="T = P/P₀. Brøkdel lys som passerer." />
          <Pill term="Molar absorptivitet (ε)" def="Stoffegenskap. Enhet: L/(mol·cm)." />
          <Pill term="Kromofore grupper" def="Gir farge, absorberer UV/VIS. Høy ε." />
          <Pill term="Ladningsoverføring" def="Charge transfer: intern redoks → uvanlig høy ε." />
          <Pill term="Strølys" def="Stråling utenfor valgt λ som når detektor → for lav A." />
          <Pill term="Monokromator" def="Velger smalt bølgelengdeområde (båndbredde)." />
          <Pill term="Kalibreringskurve" def="A vs c med standardløsninger → lineær (Beer)." />
          <Pill term="Standard addisjon" def="Metode ved matriseeffekter." />
          <Pill term="Absorpsjon vs adsorpsjon" def="Absorpsjon: energi inn i stoff. Adsorpsjon: stoff legger seg på overflate." />
        </div>
      </Section>

      <Section title="Forklaring" icon="📖">
        <P>
          Beer-Lamberts lov gir en lineær sammenheng mellom absorbans og konsentrasjon:
        </P>
        <Eq>A = εbc = log(P₀/P) = −log(T)</Eq>
        <P>
          <F>ε</F> er molar absorptivitet (stoffegenskap), <F>b</F> er kyvettens optiske veilengde (cm), og <F>c</F> er konsentrasjonen (mol/L). Lineær sammenheng gjør det mulig å bestemme ukjent konsentrasjon fra en kalibreringskurve.
        </P>
        <P>
          <strong style={{ color: TEXT }}>Analyse av blandinger:</strong> Total absorbans er summen av absorbansene til hver komponent: <F>A_total = Σ A_i</F>. For to komponenter trenger man målinger ved to bølgelengder. Generelt: én bølgelengde per komponent.
        </P>
        <P>
          <strong style={{ color: TEXT }}>Effekt av løsemiddel:</strong> I gassfase ser man mange enkeltlinjer (frie vibrasjoner/rotasjoner). Upolart løsemiddel (heksan) gir bredere topper. Polart løsemiddel (vann) gir én bred topp pga. sterke intermolekylære krefter. Løsemiddelet må ikke selv absorbere ved de aktuelle bølgelengdene.
        </P>
        <P>
          <strong style={{ color: TEXT }}>Organiske forbindelser:</strong> σ-bindinger (C–C, C–H) krever vakuum-UV (λ &lt; 180 nm). π-elektroner i dobbelt-/trippelbindinger gir nyttige absorpsjonsbånd i UV/VIS. <F>Kromofore grupper</F> absorberer UV/VIS og gir forbindelsen farge. Elektroner på O, N, S og halogener gir absorpsjon ved 170–250 nm.
        </P>
        <P>
          <strong style={{ color: TEXT }}>Overgangsmetaller:</strong> Brede absorpsjonsbånd i synlig lys fra d-d-overganger. Energien avhenger av metallet, oksidasjonstilstand og ligander. <F>Sjeldne jordarter</F> (f-blokka) har smalere bånd fordi 4f/5f-elektroner påvirkes lite av bindingen.
        </P>
        <P>
          <strong style={{ color: TEXT }}>Ladningsoverføringsabsorpsjon (charge transfer):</strong> Elektrondonor bundet til akseptor (ofte metallion). Gir uvanlig høy ε → høy sensitivitet i kvantitativ analyse.
        </P>
        <P>
          <strong style={{ color: TEXT }}>Avvik fra Beer-Lambert:</strong> Strølys gjør at observert A &lt; reell A (særlig ved høy A). For stor båndbredde gir utydelighet; for liten (&lt; 1 nm) gir dårlig signal/støy. Man velger vanligvis λ_max for maks sensitivitet og god overholdelse av Beer-Lambert.
        </P>
        <P>
          <strong style={{ color: TEXT }}>Usikkerhet:</strong> Avhenger av transmittansen. Typisk tre modeller: A) uavhengig av T (vanlig), B) ∝ √(T² + T) (høykvalitets-instrument), C) ∝ T (ikke-reproduserbar celleplassering).
        </P>
      </Section>

      <Section title="Visuell illustrasjon — Beer-Lamberts lov" icon="📊">
        <BeerLambertSVG />
      </Section>

      <Section title="Eksempel" icon="✏️">
        <P><strong style={{ color: TEXT }}>Oppgave:</strong> En løsning har ε = 1.20 × 10⁴ L/(mol·cm) ved 520 nm. Kyvetten er b = 1.00 cm. Absorbansen måles til A = 0.600. Finn konsentrasjonen.</P>
        <CollapsibleStep num={1} title="Sett opp Beer-Lambert">
          <F>A = εbc → c = A / (εb)</F>
        </CollapsibleStep>
        <CollapsibleStep num={2} title="Sett inn verdier">
          <F>c = 0.600 / (1.20 × 10⁴ × 1.00)</F>
        </CollapsibleStep>
        <CollapsibleStep num={3} title="Beregn">
          <F>c = 5.00 × 10⁻⁵ mol/L = 50.0 μM</F>
        </CollapsibleStep>
      </Section>

      <Huskeregel>
        <strong>A = εbc</strong> — «Alle Elefanter Bader i C-vitamin.» Husk: A er proporsjonal med c (lineært). Og T = 10⁻ᴬ, så når A øker, synker T eksponensielt. Velg alltid <F>λ_max</F> for best sensitivitet og linearitet.
      </Huskeregel>

      <ExamBox>
        V2022 oppg. 14e: Beer's lov sier at konsentrasjon er proporsjonal med absorbansen. V2023 oppg. 9a: Vibrasjonsoverganger krever mindre energi enn elektroniske overganger. V2023 oppg. 12c: Forskjellen mellom atom- og molekylspektre (linjer vs bånd) — skyldes at molekyler har vibrasjons- og rotasjonsnivåer i tillegg.
      </ExamBox>
    </div>
  );
}

function TabFoto() {
  return (
    <div>
      <Section title="Nøkkelbegreper" icon="🔑">
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          <Pill term="Fotometrisk titrering" def="Titrering der absorbansen måles som funksjon av tilsatt volum." />
          <Pill term="Knekkpunkt" def="Der to rette linjer møtes → ekvivalenspunktet." />
          <Pill term="Analytt (A)" def="Stoffet som bestemmes." />
          <Pill term="Titrant (T)" def="Reagensløsningen som tilsettes." />
          <Pill term="Produkt (P)" def="Produktet av titrerreaksjonen A + T → P." />
        </div>
      </Section>

      <Section title="Forklaring" icon="📖">
        <P>
          I en fotometrisk (spektrofotometrisk) titrering måler man absorbansen <F>A</F> som funksjon av volum tilsatt titrant. Titrerreaksjonen er <F>A + T → P</F>.
        </P>
        <P>
          Minst én av analytten, titranten eller produktet (evt. en indikator) må absorbere stråling ved den valgte bølgelengden. Titrerkurven består av to rette linjesegmenter som møtes i et <F>knekkpunkt</F>, som tilsvarer ekvivalenspunktet.
        </P>
        <P>
          <strong style={{ color: TEXT }}>Viktig:</strong> Målingene gjøres relativt langt unna ekvivalenspunktet — man trenger mange datapunkter på de rette linjene, ikke nær knekkpunktet. Metoden er mer nøyaktig enn vanlig fotometri fordi man ser på <F>endring i A</F>, ikke absolutt absorbans.
        </P>
        <P>
          <strong style={{ color: TEXT }}>Fordeler:</strong> Kan gjøres selv med flere absorberende specier til stede. Gir mer nøyaktige resultater enn direkte fotometriske målinger.
        </P>
        <P>
          Formen på titrerkurven avhenger av hvem som absorberer: Hvis bare analytten absorberer, synker A til ekv.pkt og blir konstant. Hvis bare titranten absorberer, er A konstant, så øker etter ekv.pkt. Ulike kombinasjoner gir ulike kurveformer.
        </P>
      </Section>

      <Section title="Visuell illustrasjon — Titrerkurver" icon="📈">
        <PhotoTitrationSVG />
        <P>Fire typiske kurveformer. Rød prikk = ekvivalenspunkt (knekkpunkt). Formen avhenger av hvem (A, T, P) som absorberer ved den valgte bølgelengden.</P>
      </Section>

      <Section title="Eksempel" icon="✏️">
        <P><strong style={{ color: TEXT }}>Oppgave:</strong> Både titranten og produktet absorberer, men analytten gjør det ikke. Skisser titrerkurven.</P>
        <CollapsibleStep num={1} title="Før ekvivalenspunktet">
          Analytten forbrukes, P dannes → A øker (P absorberer). Ingen fri T ennå.
        </CollapsibleStep>
        <CollapsibleStep num={2} title="Etter ekvivalenspunktet">
          All analytt er forbrukt. Overskudd T tilsettes → A fortsetter å øke (T absorberer også).
        </CollapsibleStep>
        <CollapsibleStep num={3} title="Kurveform">
          A stiger med én helning til ekv.pkt, deretter stiger med en annen helning (T + P bidrar). Knekkpunktet viser endring i stigning. Svar fra V2022 eksamen: ε(A) = 0, ε(T) &gt; 0, ε(P) &gt; 0.
        </CollapsibleStep>
      </Section>

      <Huskeregel>
        Tenk på hvem som «lyser opp» ved den valgte bølgelengden. Før ekv.pkt brukes analytten opp (A synker hvis den absorberer) og P dannes. Etter ekv.pkt tilsettes overskudd T. <strong>Knekkpunkt = ekvivalenspunkt.</strong> Mål LANGT fra knekkpunktet!
      </Huskeregel>

      <ExamBox>
        V2021 oppg. 3e: Identifiser riktig titrerkurveform gitt hvem som absorberer (T og P absorberer, A ikke). V2022 oppg. 14d: Fotometrisk titrering gir mer nøyaktige resultater enn direkte fotometri. V2023 oppg. 9c: ε(T) &gt; 0 og ε(A) &gt; 0 er riktig gitt kurveformen.
      </ExamBox>
    </div>
  );
}

function TabFluor() {
  return (
    <div>
      <Section title="Nøkkelbegreper" icon="🔑">
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          <Pill term="Fluorescens" def="Rask emisjon (< 10⁻⁵ s) etter eksitasjon. Singlett → singlett." />
          <Pill term="Fosforescens" def="Treg emisjon (min-timer). Triplett → singlett, spinn-forbudt." />
          <Pill term="Stokes-skift" def="λ(abs) ≤ λ(fluorescens). Energitap til vibrasjon." />
          <Pill term="Kvanteutbytte (Φ_F)" def="Andel eksiterte molekyler som fluorescerer. 0 ≤ Φ ≤ 1." />
          <Pill term="Singlett" def="Alle elektroner paret. Totalspinn = 0." />
          <Pill term="Triplett" def="Ett uparet elektron. 3 mulige spinntilstander." />
          <Pill term="Vibrasjonsrelaksering" def="Energi avgis som varme, ikke stråling. Til laveste vib.nivå." />
          <Pill term="Indre omdanning" def="Strålingsfri overgang mellom elektroniske tilstander." />
          <Pill term="Intersystem crossing (ISC)" def="Overgang singlett → triplett. Spinnendring." />
          <Pill term="Kjemiluminescens" def="Kjemisk reaksjon gir eksitert produkt → emisjon." />
        </div>
      </Section>

      <Section title="Forklaring" icon="📖">
        <P>
          <strong style={{ color: TEXT }}>Fotoluminescens</strong> er emisjon av stråling etter eksitasjon med lys. To typer: <F>fluorescens</F> (rask) og <F>fosforescens</F> (treg).
        </P>
        <P>
          <strong style={{ color: TEXT }}>Fluorescens:</strong> Skjer alltid fra det laveste vibrasjonsnivået i den laveste eksiterte elektroniske tilstanden (S₁) til et vibrasjonsnivå i grunntilstanden (S₀). Prosessen er rask (&lt; 10⁻⁵ s) fordi overgangen singlett → singlett er spinn-tillatt.
        </P>
        <P>
          <strong style={{ color: TEXT }}>Fosforescens:</strong> Molekylet gjennomgår ISC (intersystem crossing) fra singlett til triplett. Overgangen triplett → singlett er <F>spinn-forbudt</F>, dvs. usannsynlig → prosessen er treg (minutter til timer). Gjøres ofte ved lav temperatur for å begrense strålingsfri relaksering.
        </P>
        <P>
          <strong style={{ color: TEXT }}>Stokes-skift:</strong> Pga. vibrasjonsrelaksering har emittert lys lavere energi (lengre bølgelengde) enn absorbert lys: <F>λ(abs) ≤ λ(fluorescens)</F>.
        </P>
        <Eq>Φ_F = (# fotoner sendt ut) / (# fotoner tatt opp), &nbsp; 0 ≤ Φ_F ≤ 1</Eq>
        <P>
          <strong style={{ color: TEXT }}>Fluorescens og struktur:</strong> Aromatiske ringer gir ofte nyttig fluorescens. Φ_F øker med antall kondenserte ringer. <F>Rigide/stive</F> molekyler fluorescerer i større grad fordi de har færre muligheter til strålingsfri relaksering. Komplekser er rigide → høyere Φ.
        </P>
        <P>
          <strong style={{ color: TEXT }}>Konsentrasjon og fluorescensintensitet:</strong>
        </P>
        <Eq>F = K'(P₀ − P) ≈ K·c &nbsp;&nbsp;(ved lav c, εbc &lt; 0.05)</Eq>
        <P>
          Ved lav konsentrasjon er fluorescensintensiteten <F>lineært proporsjonal med c</F>. Ved høy konsentrasjon avviker sammenhengen fra linearitet.
        </P>
        <P>
          <strong style={{ color: TEXT }}>Fordeler:</strong> 10–1000 × mer sensitiv enn molekylær absorpsjonsspektroskopi. <strong>Begrensning:</strong> Bare for fluorescerende stoffer.
        </P>
      </Section>

      <Section title="Visuell illustrasjon — Energinivådiagram" icon="⚡">
        <JablonskiSVG />
        <P>Forenklet Jablonski-diagram: Absorpsjon (gul), vibrasjonsrelaksering (stiplet), fluorescens (grønn), ISC (oransje, spinnendring), fosforescens (rød, treg).</P>
      </Section>

      <Section title="Eksempel" icon="✏️">
        <P><strong style={{ color: TEXT }}>Oppgave (V2023):</strong> To organiske forbindelser — den ene kan rotere fritt rundt en enkeltbinding, den andre har en dobbeltbinding som gjør den rigid. Hvilken har størst kvanteutbytte?</P>
        <CollapsibleStep num={1} title="Identifiser rigiditet">
          Det rigide molekylet (med dobbeltbinding/mer planar struktur) har færre muligheter for strålingsfri relaksering.
        </CollapsibleStep>
        <CollapsibleStep num={2} title="Konkluder">
          Rigide molekyler har høyere Φ_F → det rigide molekylet har størst kvanteutbytte.
        </CollapsibleStep>
      </Section>

      <Huskeregel>
        <strong>Fluorescens = Flash (rask, singlett→singlett).</strong> <strong>Fosforescens = Prosess tar tid (treg, triplett→singlett, spinn-forbudt).</strong> Stokes-skift: emittert lys er alltid «rødere» (lengre λ) enn absorbert. Og rigide molekyler fluorescerer best — de «kan ikke riste av seg» energien.
      </Huskeregel>

      <ExamBox>
        V2025 oppg. 7d: Forklar forskjellen mellom fluorescens og fosforescens (spinntilstander, tid). V2023 oppg. 8b: Kvanteutbytte er mellom 0 og 1. Oppg. 8c: Rigid forbindelse har størst Φ. V2022 oppg. 14g: Fluorescens eksiteres med stråling, emisjon med varme, kjemiluminescens med kjemisk reaksjon.
      </ExamBox>
    </div>
  );
}

function TabAAS() {
  return (
    <div>
      <Section title="Nøkkelbegreper" icon="🔑">
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          <Pill term="AAS" def="Atomabsorpsjonsspektrometri. Måler absorpsjon av frie atomer." />
          <Pill term="Hullkatodelampe" def="Strålingskilde med smal linjebredde, spesifikk for ett grunnstoff." />
          <Pill term="Flamme-AAS" def="Kontinuerlig atomisering i flamme. Enkel, rimelig." />
          <Pill term="Grafittovn" def="Elektrotermisk atomisering. Høyere sensitivitet." />
          <Pill term="Nebulisering" def="Omdanning av prøve til aerosol." />
          <Pill term="Naturlig bredning" def="Heisenbergs usikkerhetsprinsipp. Endelig levetid → endelig linjebredde." />
          <Pill term="Kollisjonsbredning" def="= Trykkbredning. Øker med trykk og T." />
          <Pill term="Dopplerbredning" def="Termisk bevegelse → frekvensskift. Øker med T." />
          <Pill term="Resonanslinje" def="Overgang til/fra grunntilstanden. Mest intens." />
          <Pill term="Bakgrunnskorrelasjon" def="A_A = A_total − A_bakgrunn." />
          <Pill term="ICP" def="Induktivt koblet plasma. Argonplasma. Ionekilde for AAS/MS." />
        </div>
      </Section>

      <Section title="Forklaring" icon="📖">
        <P>
          AAS brukes til <F>grunnstoffanalyse</F>. Prøven atomiseres (i flamme eller grafittovn), og absorbansen av frie atomer måles. Hvert grunnstoff absorberer ved spesifikke bølgelengder.
        </P>
        <P>
          <strong style={{ color: TEXT }}>Atomspektre vs molekylspektre:</strong> Atomer i gassfase har kun elektroniske overganger (ingen vibrasjons-/rotasjonsnivåer) → smale, diskrete spektrallinjer. Resonanslinjer (involverer grunntilstanden) er de mest intense.
        </P>
        <P>
          <strong style={{ color: TEXT }}>Hullkatodelampe:</strong> Atomabsorpsjonslinjer er svært smale (0.002–0.005 nm), smalere enn det en monokromator kan gi. Løsningen er å bruke en hullkatodelampe som sender ut stråling med nøyaktig riktig bølgelengde og enda smalere linjebredde. Det finnes lamper for ca. 70 ulike grunnstoff — man bestemmer bare <F>ett grunnstoff om gangen</F>.
        </P>
        <P>
          <strong style={{ color: TEXT }}>Atomisering — flamme:</strong> Enkelt, rimelig, effektivt. Ulike flammer har ulik temperatur. Økt T → økt atomisering → økt sensitivitet. Men noen atomer ioniseres i flammen, og absorpsjonsspekteret inkluderer spektre for både nøytrale atomer og ioner.
        </P>
        <P>
          <strong style={{ color: TEXT }}>Atomisering — grafittovn (elektrotermisk):</strong> Prøven plasseres i et grafittrør som varmes av strøm i en inert gass (Ar/N₂). Trinnvis: tørking → asking → atomisering. Diskret metode. Mer sensitiv enn flamme — lavere deteksjonsgrense.
        </P>
        <P>
          <strong style={{ color: TEXT }}>Bredder av spektrallinjer:</strong> Tre hovedmekanismer: (1) <F>Naturlig bredning</F> — bestemt av levetid (Heisenberg), liten effekt. (2) <F>Kollisjonsbredning</F> (= trykkbredning) — øker med trykk og T, dominerer i flammer/plasmaer. (3) <F>Dopplerbredning</F> — termisk bevegelse gir frekvensforskyvning, øker med T.
        </P>
        <P>
          <strong style={{ color: TEXT }}>Interferenser:</strong> Total absorbans = analyttsignal + bakgrunn. Korrigeres med bakgrunnskorrelasjon: <F>A_A = A_T − A_B</F>.
        </P>
        <P>
          <strong style={{ color: TEXT }}>ICP (Induktivt koblet plasma):</strong> Argon ioniseres av RF-energi → plasma ved &gt; 6000 K. Brukes både som atomiseringsmetode for atomemisjonsspektroskopi og som ionekilde for MS. Plasma er elektrisk ledende. Ikke en diskret metode.
        </P>
        <P>
          <strong style={{ color: TEXT }}>Deteksjonsgrenser:</strong> ICP-MS &lt; elektrotermisk AAS &lt; flamme-AAS.
        </P>
      </Section>

      <Section title="Visuell illustrasjon — AAS instrumentoppsett" icon="🔬">
        <AASSchemaSVG />
      </Section>

      <Section title="Eksempel" icon="✏️">
        <P><strong style={{ color: TEXT }}>Oppgave (V2025):</strong> Hva er riktig om linjebredde? — «Kollisjonsutvidelse og trykkutvidelse er det samme» og «Dopplerbredningen øker med økende temperatur».</P>
        <CollapsibleStep num={1} title="Kollisjonsbredning = trykkbredning?">
          Ja, dette er to navn på samme fenomen. Kollisjoner mellom atomer i gassfase gjør at energinivåene forstyrres, som gir bredere linjer. Flere kollisjoner ved høyere trykk.
        </CollapsibleStep>
        <CollapsibleStep num={2} title="Dopplerbredning og temperatur?">
          Ja, Dopplerbredning skyldes termisk bevegelse av atomene. Høyere temperatur → raskere bevegelse → større frekvensforskyvning → bredere linjer.
        </CollapsibleStep>
      </Section>

      <Huskeregel>
        <strong>Hullkatodelampe = «skreddersydd lyskilde»</strong> — smalere enn absorpsjonslinjen, én per grunnstoff. Flamme-AAS = enkel og billig. Grafittovn = mer sensitiv. Og husk de tre bredningsmekanismene: <strong>N</strong>aturlig, <strong>K</strong>ollisjon (= trykk), <strong>D</strong>oppler — «NKD». Kollisjons- og Dopplerbredning øker begge med T.
      </Huskeregel>

      <ExamBox>
        V2025 oppg. 7b: Kollisjonsutvidelse = trykkutvidelse (riktig). Dopplerbredning øker med T (riktig). V2023 oppg. 9b: Økt T → økt atomisering (riktig), noen atomer ioniseres i flammen (riktig), ulike flammer har ulik T (riktig). ICP: plasma er elektrisk ledende (riktig).
      </ExamBox>
    </div>
  );
}

function TabMS() {
  return (
    <div>
      <Section title="Nøkkelbegreper" icon="🔑">
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          <Pill term="m/z-forhold" def="Masse-til-ladning. z er vanligvis +1." />
          <Pill term="Kvadrupolanalysator" def="4 staver, massefilter. Kun riktig m/z passerer. Lav R." />
          <Pill term="Magnetsektoranalysator" def="Magnetfelt separerer ioner. Høy oppløsning." />
          <Pill term="Flygetidsanalysator (TOF)" def="Alle ioner, samme E_k. Tyngre = tregere. Ubegrenset masse." />
          <Pill term="Oppløsning (R)" def="R = m/Δm. Evne til å skille nærliggende masser." />
          <Pill term="ICP-MS" def="ICP-ionekilde + masseanalysator. Grunnstoffanalyse." />
          <Pill term="Hard ionekilde" def="Mye fragmentering (f.eks. EI). For strukturbestemmelse." />
          <Pill term="Myk ionekilde" def="Lite fragmentering (f.eks. ICP). For molekylmasse/grunnstoff." />
          <Pill term="Fragmentering" def="Molekylionet splittes i mindre ioner i MS." />
          <Pill term="GC/MS" def="GC separerer, MS detekterer. Komplementære teknikker." />
          <Pill term="MS/MS (tandem)" def="To masseanalysatorer i serie. Raskere, mer sensitivt." />
        </div>
      </Section>

      <Section title="Forklaring" icon="📖">
        <P>
          Massespektrometri er <F>ikke egentlig spektroskopi</F> (bruker ikke lys), men grupperes sammen. Prøven ioniseres, og ioner separeres etter <F>m/z-forhold</F>. Vanligvis er z = +1, så m/z ≈ masse.
        </P>
        <P>
          <strong style={{ color: TEXT }}>Massespekter:</strong> Plotter ionestrøm (intensitet) mot m/z. Høyeste topp = 100 (normalisert). Kan bestemme grunnstoffsammensetning, isotopsammensetning og molekylstruktur.
        </P>
        <P>
          <strong style={{ color: TEXT }}>Ionekilder:</strong> <F>ICP</F> (induktivt koblet plasma) er den vanligste ionekilden for grunnstoffanalyse — den er en <F>myk</F> ionekilde for dette formålet. OBS: «ICP er en myk ionekilde» som generell påstand er FEIL på eksamen — ICP er hard nok til å ionisere alle grunnstoff, men for molekylær MS er EI (elektronionisering) en <F>hard</F> ionekilde som gir mye fragmentering.
        </P>
        <P>
          <strong style={{ color: TEXT }}>Harde vs myke ionekilder:</strong> Hard → mye fragmentering → nyttig for strukturbestemmelse og identifikasjon. Myk → lite fragmentering → gir molekylærionet → nyttig for å bestemme molekylmasse.
        </P>
        <P>
          <strong style={{ color: TEXT }}>Masseanalysatorer:</strong>
        </P>
        <P>
          <F>Kvadrupolanalysator:</F> Fire staver med vekslende elektrisk felt. Fungerer som massefilter — kun ioner med riktig m/z får stabil bane og passerer. Endrer spenningen → endrer hvilke ioner som passerer. Relativt lav oppløsning (~1 Da), men tilstrekkelig for atomær MS.
        </P>
        <P>
          <F>Magnetsektoranalysator:</F> Ionene akselereres (<F>E_k = zeV = ½mv²</F>), tyngre ioner beveger seg saktere. Magnetfeltet gir ulik bane etter hastighet. Kan gi svært høy oppløsning.
        </P>
        <P>
          <F>Flygetidsanalysator (TOF):</F> Alle ioner får samme kinetiske energi. Tyngre ioner beveger seg saktere (<F>v = √(2E/m)</F>). Begrenset oppløsning, men ubegrenset masseområde.
        </P>
        <Eq>R = m / Δm &nbsp;&nbsp;(oppløsning)</Eq>
        <P>
          <strong style={{ color: TEXT }}>ICP-MS for grunnstoffanalyse:</strong> Gir tydelige, enkle spektre. Både kvalitativ og kvantitativ informasjon om grunnstoff- og isotopsammensetning. Deteksjonsgrense &lt; 1 ppb. Interferenser: bakgrunnsioner (særlig Ar), andre ioner med samme m/z.
        </P>
        <P>
          <strong style={{ color: TEXT }}>Molekylær MS:</strong> Elektronionisering (EI) gir molekylærionet pluss fragmenter. Fragmenteringsmønsteret er fingeravtrykk for strukturen. <F>GC/MS:</F> GC separerer, MS detekterer. <F>MS/MS (tandem):</F> To masseanalysatorer — raskere, mer sensitivt, dyrere.
        </P>
      </Section>

      <Section title="Visuell illustrasjon — Kvadrupolanalysator" icon="⚙️">
        <QuadrupoleSVG />
      </Section>

      <Section title="Eksempel" icon="✏️">
        <P><strong style={{ color: TEXT }}>Oppgave:</strong> Hva er minimum oppløsning for å skille ¹⁰⁵Pd fra ¹⁰⁶Pd?</P>
        <CollapsibleStep num={1} title="Identifiser Δm og m">
          <F>Δm = 106 − 105 = 1 Da</F>, <F>m = 105</F> (velger den laveste massen).
        </CollapsibleStep>
        <CollapsibleStep num={2} title="Beregn R">
          <F>R = m/Δm = 105/1 = 105</F>
        </CollapsibleStep>
        <CollapsibleStep num={3} title="Konklusjon">
          Man trenger R &gt; 105 for å skille de to isotopene. En kvadrupolanalysator kan typisk oppnå dette (R ~ 500 er vanlig for en god kvadrupol).
        </CollapsibleStep>
      </Section>

      <Section title="Eksempel 2" icon="✏️">
        <P><strong style={{ color: TEXT }}>Oppgave (V2023):</strong> Et massespekter for grunnstoffanalyse viser topper ved m/z = 35, 37, 40. Hvilken ionekilde? Hva kan toppene være?</P>
        <CollapsibleStep num={1} title="Ionekilde for grunnstoffanalyse">
          <F>ICP</F> (induktivt koblet plasma) er den vanligste ionekilden for grunnstoffbestemmelse.
        </CollapsibleStep>
        <CollapsibleStep num={2} title="Toppene">
          m/z = 35 → ³⁵Cl (klor-35), m/z = 37 → ³⁷Cl (klor-37), m/z = 40 → ⁴⁰Ar (argon fra ICP-plasmaet) eller ⁴⁰Ca.
        </CollapsibleStep>
      </Section>

      <Huskeregel>
        <strong>Kvadrupol = «filter»</strong> — bare riktig m/z slipper gjennom. Lav R, men nok for grunnstoff. <strong>Magnetsektoranalysator = høy R.</strong> <strong>TOF = ubegrenset masseområde.</strong> For eksamen: ICP er ionekilden for grunnstoffanalyse. «ICP er en myk ionekilde» er FEIL som generell påstand. Og husk: hard ionekilde → struktur, myk → molekylmasse.
      </Huskeregel>

      <ExamBox>
        V2025 oppg. 7c: Forklar kvadrupolanalysator (massefilter, m/z, endrer spenning). Oppg. 7e: ICP er mest brukt ionekilde for grunnstoffbestemmelse. V2022 oppg. 14f: «ICP er en myk ionekilde» er IKKE riktig (dette var det feil alternativet). V2023 oppg. 9d: Tolke massespekter, ICP som ionekilde. V2021 oppg. 3d: Tolke fragmenteringsmønster for pentan.
      </ExamBox>
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

export default function SpektroskopStudyGuide() {
  const [activeTab, setActiveTab] = useState("em");
  const [visited, setVisited] = useState(new Set(["em"]));

  useEffect(() => {
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700&family=Plus+Jakarta+Sans:wght@500;600;700;800&family=Source+Sans+3:wght@400;500;600&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);

  const switchTab = useCallback(
    (id) => {
      setActiveTab(id);
      setVisited((prev) => new Set([...prev, id]));
    },
    []
  );

  const tabContent = {
    em: <TabEM />,
    beer: <TabBeer />,
    foto: <TabFoto />,
    fluor: <TabFluor />,
    aas: <TabAAS />,
    ms: <TabMS />,
  };

  return (
    <div
      style={{
        background: BG,
        minHeight: "100vh",
        color: TEXT,
        fontFamily: "'Source Sans 3', sans-serif",
        padding: 0,
        margin: 0,
      }}
    >
      {/* ── Header ── */}
      <div
        style={{
          background: `linear-gradient(135deg, ${ACCENT}22 0%, ${BG} 100%)`,
          borderBottom: `2px solid ${ACCENT}44`,
          padding: "20px 24px 14px",
        }}
      >
        <div
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: 12,
            color: ACCENT,
            fontWeight: 600,
            letterSpacing: 2,
            textTransform: "uppercase",
            marginBottom: 4,
          }}
        >
          Emne 6 — Spektroskopi og massespektrometri
        </div>
        <h1
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: 24,
            fontWeight: 800,
            color: TEXT,
            margin: 0,
          }}
        >
          Studyguide
        </h1>
        <div
          style={{
            fontSize: 13,
            color: TEXT2,
            marginTop: 4,
            fontFamily: "'Source Sans 3', sans-serif",
          }}
        >
          Kap 22 · 24A · 25 · 26 · 27 &nbsp;|&nbsp; {visited.size}/{TABS.length}{" "}
          emner besøkt
        </div>
        {/* Progress bar */}
        <div
          style={{
            marginTop: 8,
            height: 4,
            background: BORDER,
            borderRadius: 2,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${(visited.size / TABS.length) * 100}%`,
              height: "100%",
              background: ACCENT,
              borderRadius: 2,
              transition: "width .4s ease",
            }}
          />
        </div>
      </div>

      {/* ── Tabs ── */}
      <div
        style={{
          display: "flex",
          gap: 0,
          overflowX: "auto",
          borderBottom: `1px solid ${BORDER}`,
          background: CARD,
          padding: "0 8px",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {TABS.map((tab) => {
          const active = activeTab === tab.id;
          const seen = visited.has(tab.id);
          return (
            <button
              key={tab.id}
              onClick={() => switchTab(tab.id)}
              style={{
                background: "none",
                border: "none",
                borderBottom: active ? `3px solid ${ACCENT}` : "3px solid transparent",
                color: active ? ACCENT : seen ? TEXT : TEXT2,
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: active ? 700 : 500,
                fontSize: 13,
                padding: "12px 14px",
                cursor: "pointer",
                whiteSpace: "nowrap",
                transition: "all .2s",
                position: "relative",
                flexShrink: 0,
              }}
            >
              {tab.label}
              {seen && !active && (
                <span
                  style={{
                    position: "absolute",
                    top: 6,
                    right: 4,
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: ACCENT,
                    opacity: 0.5,
                  }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* ── Tab Header ── */}
      <div
        style={{
          background: ACCENT + "11",
          borderBottom: `1px solid ${ACCENT}33`,
          padding: "12px 24px",
        }}
      >
        <h2
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: 18,
            fontWeight: 700,
            color: ACCENT,
            margin: 0,
          }}
        >
          {TABS.find((t) => t.id === activeTab)?.label}
        </h2>
      </div>

      {/* ── Content ── */}
      <div style={{ padding: "16px 20px", maxWidth: 720, margin: "0 auto" }}>
        {tabContent[activeTab]}
      </div>

      {/* ── Navigation ── */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "16px 20px 32px",
          maxWidth: 720,
          margin: "0 auto",
        }}
      >
        {TABS.findIndex((t) => t.id === activeTab) > 0 ? (
          <button
            onClick={() => switchTab(TABS[TABS.findIndex((t) => t.id === activeTab) - 1].id)}
            style={{
              background: CARD,
              border: `1px solid ${BORDER}`,
              color: TEXT,
              padding: "10px 20px",
              borderRadius: 8,
              cursor: "pointer",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 600,
              fontSize: 13,
            }}
          >
            ← Forrige
          </button>
        ) : (
          <div />
        )}
        {TABS.findIndex((t) => t.id === activeTab) < TABS.length - 1 ? (
          <button
            onClick={() => switchTab(TABS[TABS.findIndex((t) => t.id === activeTab) + 1].id)}
            style={{
              background: ACCENT,
              border: "none",
              color: BG,
              padding: "10px 20px",
              borderRadius: 8,
              cursor: "pointer",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 700,
              fontSize: 13,
            }}
          >
            Neste →
          </button>
        ) : (
          <div
            style={{
              background: "#10B98122",
              border: `1px solid #10B98144`,
              color: "#10B981",
              padding: "10px 20px",
              borderRadius: 8,
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 700,
              fontSize: 13,
            }}
          >
            ✓ Ferdig!
          </div>
        )}
      </div>
    </div>
  );
}
