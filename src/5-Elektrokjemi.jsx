import { useState, useEffect, useCallback } from "react";

// ─── Constants ───
const VIOLET = "#8B5CF6";
const VIOLET_DIM = "rgba(139,92,246,0.15)";
const VIOLET_BORDER = "rgba(139,92,246,0.3)";
const BG = "#0F172A";
const CARD = "#1E293B";
const BORDER = "#334155";
const TEXT = "#F8FAFC";
const TEXT2 = "#94A3B8";

const TABS = [
  { id: 0, short: "Nernst", title: "Cellepotensial og Nernst" },
  { id: 1, short: "Ref.elektr.", title: "Referanseelektroder" },
  { id: 2, short: "Ind.elektr.", title: "Indikatorelektroder" },
  { id: 3, short: "pH & ISE", title: "pH-måling og ioneselektive elektroder" },
  { id: 4, short: "Pot. titr.", title: "Potensiometrisk titrering og redoks" },
  { id: 5, short: "Voltammetri", title: "Voltammetri: Grunnlag og teknikker" },
  { id: 6, short: "CV/Strip", title: "Syklisk, puls- og strippingvoltammetri" },
];

// ─── Styled helpers ───
const fonts = `@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Source+Sans+3:wght@400;500;600&family=JetBrains+Mono:wght@400;500;600&display=swap');`;

const Eq = ({ children }) => (
  <span style={{ fontFamily: "'JetBrains Mono', monospace", color: VIOLET, fontSize: "0.95em", fontWeight: 500 }}>
    {children}
  </span>
);

const Sub = ({ children }) => <sub style={{ fontSize: "0.75em", verticalAlign: "sub" }}>{children}</sub>;
const Sup = ({ children }) => <sup style={{ fontSize: "0.75em", verticalAlign: "super" }}>{children}</sup>;

const Pill = ({ term, def, color = VIOLET }) => {
  const [show, setShow] = useState(false);
  return (
    <span
      onClick={() => setShow(!show)}
      style={{
        display: "inline-block", cursor: "pointer", margin: "4px",
        padding: "6px 14px", borderRadius: 20,
        background: show ? `${color}22` : `${color}15`,
        border: `1px solid ${show ? color : color + "44"}`,
        color: show ? TEXT : color, fontSize: "0.85rem",
        fontFamily: "'Source Sans 3', sans-serif", fontWeight: 500,
        transition: "all 0.2s ease", userSelect: "none",
      }}
    >
      {term}
      {show && (
        <span style={{ display: "block", color: TEXT2, fontSize: "0.8rem", marginTop: 4, fontWeight: 400 }}>
          {def}
        </span>
      )}
    </span>
  );
};

const Section = ({ title, icon, children }) => (
  <div style={{ marginBottom: 28 }}>
    <h3 style={{
      fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700,
      fontSize: "1.05rem", color: VIOLET, marginBottom: 12,
      display: "flex", alignItems: "center", gap: 8,
    }}>
      <span style={{ fontSize: "1.1rem" }}>{icon}</span> {title}
    </h3>
    <div style={{ fontFamily: "'Source Sans 3', sans-serif", color: TEXT, lineHeight: 1.7, fontSize: "0.95rem" }}>
      {children}
    </div>
  </div>
);

const CollapsibleStep = ({ num, title, children }) => {
  const [open, setOpen] = useState(false);
  return (
    <div
      onClick={() => setOpen(!open)}
      style={{
        background: open ? `${VIOLET}11` : CARD,
        border: `1px solid ${open ? VIOLET_BORDER : BORDER}`,
        borderRadius: 10, padding: "12px 16px", marginBottom: 8, cursor: "pointer",
        transition: "all 0.2s ease",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{
          background: VIOLET, color: "#fff", borderRadius: "50%",
          width: 26, height: 26, display: "flex", alignItems: "center",
          justifyContent: "center", fontSize: "0.8rem", fontWeight: 700,
          fontFamily: "'JetBrains Mono', monospace", flexShrink: 0,
        }}>{num}</span>
        <span style={{ fontWeight: 600, fontFamily: "'Source Sans 3', sans-serif", fontSize: "0.9rem", color: TEXT }}>
          {title}
        </span>
        <span style={{ marginLeft: "auto", color: TEXT2, fontSize: "0.8rem" }}>{open ? "▲" : "▼"}</span>
      </div>
      {open && (
        <div style={{
          marginTop: 10, paddingLeft: 36, color: TEXT2,
          fontFamily: "'JetBrains Mono', monospace", fontSize: "0.85rem", lineHeight: 1.8,
        }}>
          {children}
        </div>
      )}
    </div>
  );
};

const Huskeregel = ({ children }) => (
  <div style={{
    background: `linear-gradient(135deg, ${VIOLET}18, ${VIOLET}08)`,
    border: `2px solid ${VIOLET}55`, borderRadius: 14,
    padding: "16px 20px", marginBottom: 28,
  }}>
    <div style={{
      fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700,
      fontSize: "0.9rem", color: VIOLET, marginBottom: 8,
      display: "flex", alignItems: "center", gap: 8,
    }}>
      💡 Huskeregel
    </div>
    <div style={{ fontFamily: "'Source Sans 3', sans-serif", color: TEXT, fontSize: "0.9rem", lineHeight: 1.6 }}>
      {children}
    </div>
  </div>
);

const ExamNote = ({ children }) => (
  <div style={{
    background: `${CARD}`, border: `1px dashed ${VIOLET}44`,
    borderRadius: 10, padding: "12px 16px", marginBottom: 10,
  }}>
    <span style={{
      fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700,
      fontSize: "0.8rem", color: VIOLET, marginRight: 8,
    }}>🎓 Eksamensrelevans:</span>
    <span style={{ fontFamily: "'Source Sans 3', sans-serif", color: TEXT2, fontSize: "0.85rem" }}>
      {children}
    </span>
  </div>
);

const FormulaBox = ({ children }) => (
  <div style={{
    background: "#0c1222", border: `1px solid ${BORDER}`, borderRadius: 10,
    padding: "14px 18px", margin: "12px 0", overflowX: "auto",
    fontFamily: "'JetBrains Mono', monospace", fontSize: "0.9rem", color: VIOLET, lineHeight: 2,
  }}>
    {children}
  </div>
);

// ─── SVG Visuals ───

const NernstCellDiagram = () => (
  <svg viewBox="0 0 520 260" style={{ width: "100%", maxWidth: 520, display: "block", margin: "16px auto" }}>
    <defs>
      <linearGradient id="zn" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#64748b" /><stop offset="100%" stopColor="#475569" />
      </linearGradient>
      <linearGradient id="cu" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#f59e0b" /><stop offset="100%" stopColor="#d97706" />
      </linearGradient>
    </defs>
    {/* Beakers */}
    <rect x="30" y="80" width="180" height="140" rx="8" fill="none" stroke={BORDER} strokeWidth="2"/>
    <rect x="310" y="80" width="180" height="140" rx="8" fill="none" stroke={BORDER} strokeWidth="2"/>
    {/* Solutions */}
    <rect x="32" y="120" width="176" height="98" rx="4" fill="rgba(100,116,139,0.15)"/>
    <rect x="312" y="120" width="176" height="98" rx="4" fill="rgba(245,158,11,0.1)"/>
    {/* Electrodes */}
    <rect x="100" y="60" width="20" height="130" rx="3" fill="url(#zn)"/>
    <rect x="400" y="60" width="20" height="130" rx="3" fill="url(#cu)"/>
    {/* Salt bridge */}
    <path d="M 210 100 Q 260 50 310 100" fill="none" stroke={VIOLET} strokeWidth="3" strokeLinecap="round"/>
    <text x="260" y="58" textAnchor="middle" fill={VIOLET} fontSize="11" fontFamily="'Plus Jakarta Sans'" fontWeight="600">Saltbro</text>
    {/* Labels */}
    <text x="120" y="245" textAnchor="middle" fill={TEXT2} fontSize="12" fontFamily="'Source Sans 3'">ZnSO₄ (1 M)</text>
    <text x="400" y="245" textAnchor="middle" fill={TEXT2} fontSize="12" fontFamily="'Source Sans 3'">CuSO₄ (0.5 M)</text>
    <text x="110" y="52" textAnchor="middle" fill="#94a3b8" fontSize="12" fontFamily="'Plus Jakarta Sans'" fontWeight="700">Zn (anode)</text>
    <text x="410" y="52" textAnchor="middle" fill="#f59e0b" fontSize="12" fontFamily="'Plus Jakarta Sans'" fontWeight="700">Cu (katode)</text>
    {/* Electrons arrow */}
    <path d="M 130 70 L 390 70" fill="none" stroke={TEXT2} strokeWidth="1.5" strokeDasharray="4,3" markerEnd="url(#arr)"/>
    <defs><marker id="arr" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6" fill={TEXT2}/></marker></defs>
    <text x="260" y="30" textAnchor="middle" fill={TEXT} fontSize="11" fontFamily="'JetBrains Mono'" fontWeight="500">e⁻ →</text>
    {/* Ions */}
    <text x="80" y="160" fill="#94a3b8" fontSize="10" fontFamily="'JetBrains Mono'">Zn²⁺</text>
    <text x="370" y="160" fill="#d97706" fontSize="10" fontFamily="'JetBrains Mono'">Cu²⁺</text>
    {/* E cell */}
    <text x="260" y="160" textAnchor="middle" fill={VIOLET} fontSize="13" fontFamily="'JetBrains Mono'" fontWeight="600">E(celle) ≈ 1.09 V</text>
  </svg>
);

const PotentiometrySetupDiagram = () => (
  <svg viewBox="0 0 480 200" style={{ width: "100%", maxWidth: 480, display: "block", margin: "16px auto" }}>
    {/* Voltmeter */}
    <rect x="180" y="10" width="120" height="40" rx="8" fill={CARD} stroke={VIOLET} strokeWidth="2"/>
    <text x="240" y="36" textAnchor="middle" fill={VIOLET} fontSize="13" fontFamily="'JetBrains Mono'" fontWeight="600">V (I≈0)</text>
    {/* Wires */}
    <line x1="180" y1="30" x2="80" y2="30" stroke={TEXT2} strokeWidth="1.5"/>
    <line x1="80" y1="30" x2="80" y2="80" stroke={TEXT2} strokeWidth="1.5"/>
    <line x1="300" y1="30" x2="400" y2="30" stroke={TEXT2} strokeWidth="1.5"/>
    <line x1="400" y1="30" x2="400" y2="80" stroke={TEXT2} strokeWidth="1.5"/>
    {/* Ref electrode */}
    <rect x="60" y="80" width="40" height="90" rx="4" fill="rgba(139,92,246,0.2)" stroke={VIOLET} strokeWidth="1.5"/>
    <text x="80" y="190" textAnchor="middle" fill={VIOLET} fontSize="10" fontFamily="'Plus Jakarta Sans'" fontWeight="600">E_ref</text>
    {/* Salt bridge */}
    <rect x="120" y="100" width="60" height="16" rx="4" fill={VIOLET} opacity="0.3"/>
    <text x="150" y="112" textAnchor="middle" fill={TEXT2} fontSize="8" fontFamily="'Source Sans 3'">Saltbro</text>
    {/* Solution */}
    <rect x="180" y="80" width="200" height="100" rx="6" fill="rgba(139,92,246,0.06)" stroke={BORDER} strokeWidth="1.5"/>
    <text x="280" y="140" textAnchor="middle" fill={TEXT2} fontSize="11" fontFamily="'Source Sans 3'">Analyttløsning</text>
    {/* Indicator electrode */}
    <rect x="380" y="80" width="40" height="90" rx="4" fill="rgba(139,92,246,0.3)" stroke={VIOLET} strokeWidth="1.5"/>
    <text x="400" y="190" textAnchor="middle" fill={VIOLET} fontSize="10" fontFamily="'Plus Jakarta Sans'" fontWeight="600">E_ind</text>
    {/* Labels */}
    <text x="80" y="75" textAnchor="middle" fill={TEXT2} fontSize="9" fontFamily="'Source Sans 3'" fontWeight="500">Referanse</text>
    <text x="400" y="75" textAnchor="middle" fill={TEXT2} fontSize="9" fontFamily="'Source Sans 3'" fontWeight="500">Indikator</text>
    {/* E_j */}
    <text x="150" y="130" textAnchor="middle" fill={TEXT2} fontSize="9" fontFamily="'JetBrains Mono'">E_j</text>
  </svg>
);

const ReferenceElectrodeComparison = () => (
  <svg viewBox="0 0 500 220" style={{ width: "100%", maxWidth: 500, display: "block", margin: "16px auto" }}>
    {[
      { x: 30, name: "SHE", half: "Pt|H₂|H⁺", e: "0.000 V", col: "#64748b", note: "Upraktisk" },
      { x: 190, name: "SCE", half: "Hg|Hg₂Cl₂|KCl", e: "+0.244 V", col: "#8B5CF6", note: "Mettet KCl" },
      { x: 350, name: "Ag/AgCl", half: "Ag|AgCl|KCl", e: "+0.197 V", col: "#10B981", note: "Mest brukt" },
    ].map((el, i) => (
      <g key={i}>
        <rect x={el.x} y="20" width="130" height="170" rx="12" fill={CARD} stroke={el.col + "66"} strokeWidth="2"/>
        <rect x={el.x} y="20" width="130" height="36" rx="12" fill={el.col + "22"}/>
        <rect x={el.x} y="44" width="130" height="1" fill={el.col + "44"}/>
        <text x={el.x + 65} y="44" textAnchor="middle" fill={el.col} fontSize="14" fontFamily="'Plus Jakarta Sans'" fontWeight="700">{el.name}</text>
        <text x={el.x + 65} y="80" textAnchor="middle" fill={TEXT2} fontSize="10" fontFamily="'JetBrains Mono'">{el.half}</text>
        <text x={el.x + 65} y="110" textAnchor="middle" fill={TEXT} fontSize="16" fontFamily="'JetBrains Mono'" fontWeight="600">{el.e}</text>
        <text x={el.x + 65} y="135" textAnchor="middle" fill={TEXT2} fontSize="10" fontFamily="'Source Sans 3'">vs. SHE</text>
        <rect x={el.x + 15} y="152" width="100" height="24" rx="6" fill={el.col + "15"}/>
        <text x={el.x + 65} y="168" textAnchor="middle" fill={el.col} fontSize="10" fontFamily="'Source Sans 3'" fontWeight="600">{el.note}</text>
      </g>
    ))}
  </svg>
);

const IndicatorElectrodeTypes = () => (
  <svg viewBox="0 0 500 280" style={{ width: "100%", maxWidth: 500, display: "block", margin: "16px auto" }}>
    {/* Central label */}
    <rect x="170" y="10" width="160" height="36" rx="18" fill={VIOLET} />
    <text x="250" y="33" textAnchor="middle" fill="#fff" fontSize="13" fontFamily="'Plus Jakarta Sans'" fontWeight="700">Indikatorelektroder</text>
    {/* Lines down */}
    <line x1="120" y1="46" x2="120" y2="76" stroke={VIOLET} strokeWidth="1.5" opacity="0.5"/>
    <line x1="250" y1="46" x2="250" y2="76" stroke={VIOLET} strokeWidth="1.5" opacity="0.5"/>
    <line x1="380" y1="46" x2="380" y2="76" stroke={VIOLET} strokeWidth="1.5" opacity="0.5"/>
    <line x1="120" y1="46" x2="380" y2="46" stroke={VIOLET} strokeWidth="1.5" opacity="0.5"/>
    {/* Three branches */}
    {[
      { x: 40, title: "1. type", desc: "M|M²⁺", detail: "Metall ↔ kation", ex: "Cu|Cu²⁺, Ag|Ag⁺", nernst: "E = E° − (0.0592/z)·pM" },
      { x: 180, title: "2. type", desc: "M|MA|A⁻", detail: "Metall ↔ anion", ex: "Ag|AgCl|Cl⁻", nernst: "E = E° + (0.0592/z)·pA" },
      { x: 310, title: "Inert redoks", desc: "Pt, Au, C", detail: "Overvåker redoks", ex: "Pt|Ce⁴⁺/Ce³⁺", nernst: "E = E° − (0.0592/z)·log(red/oks)" },
    ].map((b, i) => (
      <g key={i}>
        <rect x={b.x} y="76" width="160" height="190" rx="10" fill={CARD} stroke={BORDER} strokeWidth="1.5"/>
        <rect x={b.x} y="76" width="160" height="32" rx="10" fill={VIOLET + "18"}/>
        <text x={b.x + 80} y="97" textAnchor="middle" fill={VIOLET} fontSize="12" fontFamily="'Plus Jakarta Sans'" fontWeight="700">{b.title}</text>
        <text x={b.x + 80} y="126" textAnchor="middle" fill={TEXT} fontSize="11" fontFamily="'JetBrains Mono'" fontWeight="500">{b.desc}</text>
        <text x={b.x + 80} y="150" textAnchor="middle" fill={TEXT2} fontSize="10" fontFamily="'Source Sans 3'">{b.detail}</text>
        <line x1={b.x + 20} y1="162" x2={b.x + 140} y2="162" stroke={BORDER} strokeWidth="1"/>
        <text x={b.x + 80} y="180" textAnchor="middle" fill={TEXT2} fontSize="9" fontFamily="'Source Sans 3'">Eks: {b.ex}</text>
        <text x={b.x + 80} y="210" textAnchor="middle" fill={VIOLET} fontSize="8.5" fontFamily="'JetBrains Mono'">{b.nernst.substring(0,22)}</text>
        <text x={b.x + 80} y="225" textAnchor="middle" fill={VIOLET} fontSize="8.5" fontFamily="'JetBrains Mono'">{b.nernst.substring(22)}</text>
      </g>
    ))}
  </svg>
);

const GlassElectrodeDiagram = () => (
  <svg viewBox="0 0 440 260" style={{ width: "100%", maxWidth: 440, display: "block", margin: "16px auto" }}>
    {/* Outer electrode body */}
    <rect x="150" y="20" width="140" height="220" rx="20" fill="none" stroke={VIOLET} strokeWidth="2"/>
    {/* Glass membrane at bottom */}
    <ellipse cx="220" cy="230" rx="60" ry="15" fill={VIOLET + "22"} stroke={VIOLET} strokeWidth="2"/>
    <text x="220" y="255" textAnchor="middle" fill={VIOLET} fontSize="10" fontFamily="'Plus Jakarta Sans'" fontWeight="600">Glassmembran</text>
    {/* Inner solution */}
    <rect x="170" y="80" width="100" height="130" rx="4" fill="rgba(139,92,246,0.08)"/>
    <text x="220" y="140" textAnchor="middle" fill={TEXT2} fontSize="9" fontFamily="'JetBrains Mono'">a₂ = konst.</text>
    <text x="220" y="155" textAnchor="middle" fill={TEXT2} fontSize="9" fontFamily="'JetBrains Mono'">[Cl⁻] = 0.1 M</text>
    {/* Inner ref */}
    <rect x="210" y="40" width="20" height="100" rx="3" fill={VIOLET + "44"}/>
    <text x="220" y="35" textAnchor="middle" fill={TEXT2} fontSize="9" fontFamily="'Source Sans 3'">Ag/AgCl (indre)</text>
    {/* External solution labels */}
    <text x="60" y="200" textAnchor="middle" fill={TEXT} fontSize="11" fontFamily="'Source Sans 3'" fontWeight="600">Analytt</text>
    <text x="60" y="215" textAnchor="middle" fill={TEXT2} fontSize="10" fontFamily="'JetBrains Mono'">a₁ = [H⁺]</text>
    <path d="M 95 205 L 150 220" stroke={TEXT2} strokeWidth="1" strokeDasharray="3,3" markerEnd="url(#arr2)"/>
    <defs><marker id="arr2" markerWidth="6" markerHeight="5" refX="6" refY="2.5" orient="auto"><path d="M0,0 L6,2.5 L0,5" fill={TEXT2}/></marker></defs>
    {/* E labels on right */}
    <text x="310" y="60" fill={TEXT2} fontSize="9" fontFamily="'JetBrains Mono'">E(Ag,AgCl) ← konst.</text>
    <text x="310" y="140" fill={TEXT2} fontSize="9" fontFamily="'JetBrains Mono'">E₂ ← konst.</text>
    <text x="310" y="225" fill={VIOLET} fontSize="10" fontFamily="'JetBrains Mono'" fontWeight="600">E₁ ← pH-sensitiv</text>
    <text x="220" y="180" textAnchor="middle" fill={VIOLET} fontSize="10" fontFamily="'JetBrains Mono'" fontWeight="500">E_b = E₁ − E₂</text>
  </svg>
);

const RedoxTitrationCurve = () => {
  const points = [];
  for (let i = 0; i <= 100; i++) {
    const f = i / 50;
    let E;
    if (f < 0.98) E = 0.77 - 0.0592 * Math.log10((1 - f) / Math.max(f, 0.01));
    else if (f < 1.02) E = 0.77 + (1.51 - 0.77) * ((f - 0.98) / 0.04);
    else E = 1.51 - 0.0592 / 5 * Math.log10(1 / Math.max(f - 1, 0.01));
    E = Math.max(0.5, Math.min(1.7, E));
    points.push({ x: 40 + i * 3.8, y: 200 - (E - 0.4) * 140 });
  }
  const path = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
  return (
    <svg viewBox="0 0 460 240" style={{ width: "100%", maxWidth: 460, display: "block", margin: "16px auto" }}>
      {/* Axes */}
      <line x1="40" y1="210" x2="430" y2="210" stroke={BORDER} strokeWidth="1.5"/>
      <line x1="40" y1="20" x2="40" y2="210" stroke={BORDER} strokeWidth="1.5"/>
      {/* Labels */}
      <text x="235" y="235" textAnchor="middle" fill={TEXT2} fontSize="11" fontFamily="'Source Sans 3'">Volum titrant (mL)</text>
      <text x="15" y="115" textAnchor="middle" fill={TEXT2} fontSize="11" fontFamily="'Source Sans 3'" transform="rotate(-90,15,115)">E (V)</text>
      {/* Curve */}
      <path d={path} fill="none" stroke={VIOLET} strokeWidth="2.5" strokeLinecap="round"/>
      {/* Eq point */}
      <line x1="228" y1="20" x2="228" y2="210" stroke={VIOLET} strokeWidth="1" strokeDasharray="4,4" opacity="0.4"/>
      <text x="228" y="15" textAnchor="middle" fill={VIOLET} fontSize="10" fontFamily="'Plus Jakarta Sans'" fontWeight="600">Ekv.pkt</text>
      {/* Y ticks */}
      {[0.5, 0.8, 1.0, 1.2, 1.5].map(v => {
        const y = 200 - (v - 0.4) * 140;
        return <g key={v}><line x1="36" y1={y} x2="40" y2={y} stroke={BORDER}/><text x="32" y={y+4} textAnchor="end" fill={TEXT2} fontSize="9" fontFamily="'JetBrains Mono'">{v.toFixed(1)}</text></g>;
      })}
    </svg>
  );
};

const ThreeElectrodeSystem = () => (
  <svg viewBox="0 0 480 260" style={{ width: "100%", maxWidth: 480, display: "block", margin: "16px auto" }}>
    {/* Potentiostat box */}
    <rect x="140" y="10" width="200" height="50" rx="10" fill={VIOLET + "18"} stroke={VIOLET} strokeWidth="2"/>
    <text x="240" y="40" textAnchor="middle" fill={VIOLET} fontSize="13" fontFamily="'Plus Jakarta Sans'" fontWeight="700">Potentiostat</text>
    {/* Three electrodes */}
    {[
      { x: 60, label: "RE", full: "Referanse", color: "#10B981", note: "Kjent E" },
      { x: 220, label: "WE", full: "Arbeidselektrode", color: VIOLET, note: "Reaksjonen skjer" },
      { x: 380, label: "CE", full: "Motelektrode", color: "#F59E0B", note: "Inert" },
    ].map((el, i) => (
      <g key={i}>
        <line x1={el.x + 20} y1="60" x2={el.x + 20} y2="100" stroke={el.color} strokeWidth="2"/>
        <rect x={el.x} y="100" width="40" height="100" rx="6" fill={el.color + "22"} stroke={el.color} strokeWidth="1.5"/>
        <text x={el.x + 20} y="220" textAnchor="middle" fill={el.color} fontSize="14" fontFamily="'Plus Jakarta Sans'" fontWeight="800">{el.label}</text>
        <text x={el.x + 20} y="238" textAnchor="middle" fill={TEXT2} fontSize="9" fontFamily="'Source Sans 3'">{el.full}</text>
        <text x={el.x + 20} y="252" textAnchor="middle" fill={TEXT2} fontSize="8" fontFamily="'JetBrains Mono'">{el.note}</text>
      </g>
    ))}
    {/* Solution */}
    <rect x="30" y="120" width="420" height="80" rx="8" fill="rgba(139,92,246,0.05)" stroke={BORDER} strokeWidth="1"/>
    <text x="240" y="175" textAnchor="middle" fill={TEXT2} fontSize="10" fontFamily="'Source Sans 3'">Analyttløsning</text>
    {/* Circuits */}
    <path d="M 80 60 Q 80 35 140 35" fill="none" stroke="#10B981" strokeWidth="1.5" strokeDasharray="4,3"/>
    <path d="M 400 60 Q 400 35 340 35" fill="none" stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="4,3"/>
    <text x="100" y="80" fill="#10B981" fontSize="8" fontFamily="'JetBrains Mono'">Ref.krets</text>
    <text x="360" y="80" fill="#F59E0B" fontSize="8" fontFamily="'JetBrains Mono'">Arb.krets</text>
    <text x="110" y="92" fill="#10B981" fontSize="7" fontFamily="'Source Sans 3'">(spenning)</text>
    <text x="370" y="92" fill="#F59E0B" fontSize="7" fontFamily="'Source Sans 3'">(strøm)</text>
  </svg>
);

const CyclicVoltammogram = () => {
  // Generate a realistic CV shape
  const pts = [];
  for (let i = 0; i <= 100; i++) {
    const E = 0.4 - i * 0.016; // scan from +0.4 to -1.2 V
    let I;
    // Forward scan (reduction peak around -0.8V)
    if (i <= 50) {
      const center = 38;
      I = -1.8 * Math.exp(-((i - center) ** 2) / 40) + 0.1 * (i / 50) - 0.3;
    } else {
      // Reverse scan (oxidation peak around -0.2V)
      const j = i - 50;
      const center = 35;
      I = 3.0 * Math.exp(-((j - center) ** 2) / 30) - 0.1 * (j / 50) + 0.2;
    }
    const px = 50 + i * 3.6;
    const py = 130 - I * 50;
    pts.push({ x: px, y: py });
  }
  const path = pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
  return (
    <svg viewBox="0 0 460 260" style={{ width: "100%", maxWidth: 460, display: "block", margin: "16px auto" }}>
      <line x1="50" y1="130" x2="420" y2="130" stroke={BORDER} strokeWidth="1" strokeDasharray="3,3"/>
      <line x1="50" y1="20" x2="50" y2="240" stroke={BORDER} strokeWidth="1.5"/>
      <line x1="50" y1="240" x2="420" y2="240" stroke={BORDER} strokeWidth="1.5"/>
      <path d={path} fill="none" stroke={VIOLET} strokeWidth="2.5"/>
      {/* Peak labels */}
      <text x="190" y="195" fill={VIOLET} fontSize="10" fontFamily="'JetBrains Mono'" fontWeight="600">B (red.)</text>
      <text x="330" y="40" fill={VIOLET} fontSize="10" fontFamily="'JetBrains Mono'" fontWeight="600">A (oks.)</text>
      {/* Axis labels */}
      <text x="235" y="258" textAnchor="middle" fill={TEXT2} fontSize="10" fontFamily="'Source Sans 3'">Potensial (V vs. Ag/AgCl)</text>
      <text x="20" y="130" textAnchor="middle" fill={TEXT2} fontSize="10" fontFamily="'Source Sans 3'" transform="rotate(-90,20,130)">Strøm (µA)</text>
      {/* Arrow for scan direction */}
      <path d="M 100 160 L 80 170" stroke={TEXT2} strokeWidth="1" markerEnd="url(#arr3)"/>
      <defs><marker id="arr3" markerWidth="6" markerHeight="5" refX="6" refY="2.5" orient="auto"><path d="M0,0 L6,2.5 L0,5" fill={TEXT2}/></marker></defs>
      <text x="65" y="185" fill={TEXT2} fontSize="8" fontFamily="'Source Sans 3'">Fremover</text>
    </svg>
  );
};

const StrippingDiagram = () => (
  <svg viewBox="0 0 480 200" style={{ width: "100%", maxWidth: 480, display: "block", margin: "16px auto" }}>
    {/* Step 1 */}
    <rect x="20" y="20" width="200" height="160" rx="12" fill={CARD} stroke={BORDER} strokeWidth="1.5"/>
    <rect x="20" y="20" width="200" height="30" rx="12" fill={VIOLET + "20"}/>
    <text x="120" y="41" textAnchor="middle" fill={VIOLET} fontSize="12" fontFamily="'Plus Jakarta Sans'" fontWeight="700">Trinn 1: Avsetting</text>
    {/* Electrode with deposited metal */}
    <rect x="100" y="70" width="20" height="70" rx="3" fill={VIOLET + "44"} stroke={VIOLET} strokeWidth="1.5"/>
    {/* Dots being deposited */}
    {[80, 95, 110, 125].map((y, i) => (
      <circle key={i} cx={95 + (i % 2) * 30} cy={y} r="3" fill={VIOLET} opacity={0.3 + i * 0.15}/>
    ))}
    <text x="120" y="160" textAnchor="middle" fill={TEXT2} fontSize="9" fontFamily="'Source Sans 3'">M²⁺ + 2e⁻ → M(s)</text>
    <text x="120" y="175" textAnchor="middle" fill={TEXT2} fontSize="8" fontFamily="'JetBrains Mono'">Konsentrering, t = min</text>
    {/* Arrow */}
    <path d="M 230 100 L 260 100" stroke={VIOLET} strokeWidth="2" markerEnd="url(#arr4)"/>
    <defs><marker id="arr4" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6" fill={VIOLET}/></marker></defs>
    {/* Step 2 */}
    <rect x="260" y="20" width="200" height="160" rx="12" fill={CARD} stroke={VIOLET + "44"} strokeWidth="1.5"/>
    <rect x="260" y="20" width="200" height="30" rx="12" fill={VIOLET + "30"}/>
    <text x="360" y="41" textAnchor="middle" fill={VIOLET} fontSize="12" fontFamily="'Plus Jakarta Sans'" fontWeight="700">Trinn 2: Stripping</text>
    {/* Electrode stripped */}
    <rect x="340" y="70" width="20" height="70" rx="3" fill={VIOLET + "22"} stroke={VIOLET} strokeWidth="1" strokeDasharray="3,3"/>
    {/* Ions leaving */}
    {[80, 95, 110, 125].map((y, i) => (
      <g key={i}>
        <circle cx={320 - i * 5} cy={y} r="3" fill={VIOLET} opacity={0.6 - i * 0.1}/>
        <path d={`M 340 ${y} L ${325 - i * 5} ${y}`} stroke={VIOLET} strokeWidth="0.5" opacity="0.3"/>
      </g>
    ))}
    <text x="360" y="160" textAnchor="middle" fill={TEXT2} fontSize="9" fontFamily="'Source Sans 3'">M(s) → M²⁺ + 2e⁻</text>
    <text x="360" y="175" textAnchor="middle" fill={VIOLET} fontSize="8" fontFamily="'JetBrains Mono'" fontWeight="600">Måler strøm → topp</text>
  </svg>
);

// ─── Tab Content Components ───

const Tab0_Nernst = () => (
  <>
    <Section title="Nøkkelbegreper" icon="🏷️">
      <div style={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
        <Pill term="Cellepotensial" def="Spenningsforskjellen mellom to halvceller: E(celle) = E(HS) − E(VS)" />
        <Pill term="Nernst-ligningen" def="E = E° − (0.0592/z) · log Q ved 25°C" />
        <Pill term="Halvcellepotensial" def="Potensial for én halvreaksjon, kan ikke måles alene" />
        <Pill term="Standard potensial (E°)" def="Halvcellepotensial når alle aktiviteter = 1" />
        <Pill term="Likevektskonstant" def="ln K = zFE°/RT — kobler E° til K" />
        <Pill term="Aktivitet vs konsentrasjon" def="a = γ·c, feilen øker med ionestyrke" />
      </div>
    </Section>

    <Section title="Forklaring" icon="📖">
      <p>Cellepotensialet beregnes fra halvcellepotensialene. Konvensjonen er:</p>
      <FormulaBox>
        E(celle) = E(høyre side) − E(venstre side)<br/>
        E(celle) = E<Sub>red</Sub>(katode) − E<Sub>red</Sub>(anode)
      </FormulaBox>
      <p>Nernst-ligningen gir sammenhengen mellom potensial og konsentrasjon (aktivitet):</p>
      <FormulaBox>
        E = E° − (RT / zF) · ln Q ≈ E° − (0.0592 V / z) · log Q &nbsp;&nbsp;(ved 25°C)
      </FormulaBox>
      <p>Her er <Eq>z</Eq> antall elektroner overført, <Eq>Q</Eq> er reaksjonskvotienten (produkter/reaktanter), og <Eq>F = 96485 C/mol</Eq>.</p>
      <p style={{ marginTop: 10 }}>Ved likevekt er <Eq>E(celle) = 0</Eq> og <Eq>Q = K</Eq>, som gir:</p>
      <FormulaBox>
        ln K = zFE° / RT &nbsp;&nbsp;→&nbsp;&nbsp; E° = (0.0592/z) · log K
      </FormulaBox>
      <p>Nernst-ligningen kan brukes på totalreaksjonen <em>eller</em> på hver halvcelle for seg — resultatene er de samme.</p>
    </Section>

    <Section title="Visuell illustrasjon" icon="🔬">
      <NernstCellDiagram />
      <p style={{ textAlign: "center", color: TEXT2, fontSize: "0.8rem" }}>Galvanisk celle: Zn/Cu (Daniell-cellen)</p>
    </Section>

    <Section title="Eksempel" icon="✏️">
      <p style={{ color: TEXT2, fontSize: "0.9rem", marginBottom: 12 }}>
        Beregn E(celle) for: <Eq>Zn(s) | Zn²⁺(1 M) || Cu²⁺(0.5 M) | Cu(s)</Eq>
      </p>
      <CollapsibleStep num={1} title="Identifiser halvreaksjoner og E°-verdier">
        Anode (VS): Zn²⁺ + 2e⁻ → Zn(s), E° = −0.76 V<br/>
        Katode (HS): Cu²⁺ + 2e⁻ → Cu(s), E° = +0.34 V
      </CollapsibleStep>
      <CollapsibleStep num={2} title="Beregn standard cellepotensial">
        E°(celle) = E°(HS) − E°(VS) = 0.34 − (−0.76) = 1.10 V
      </CollapsibleStep>
      <CollapsibleStep num={3} title="Sett opp Nernst for totalreaksjonen">
        Cu²⁺(0.5) + Zn(s) → Zn²⁺(1) + Cu(s)<br/>
        Q = [Zn²⁺]/[Cu²⁺] = 1/0.5 = 2<br/>
        z = 2
      </CollapsibleStep>
      <CollapsibleStep num={4} title="Beregn E(celle)">
        E = 1.10 − (0.0592/2) · log(2)<br/>
        E = 1.10 − 0.0296 · 0.301<br/>
        E ≈ 1.09 V
      </CollapsibleStep>
    </Section>

    <Huskeregel>
      <strong>«HS minus VS»</strong> — cellepotensial = høyre side minus venstre side. Anode alltid til venstre. Positivt E(celle) betyr spontan reaksjon. Husk: <Eq>0.0592 / z</Eq> er «nernst-brøken» ved 25°C.
    </Huskeregel>

    <ExamNote>
      Nernst-beregninger dukker opp nesten hvert år. V2023 og V2024 har direkte potensiometri-beregninger som krever Nernst. V2022 ber om å sammenligne potensiometri og voltammetri.
    </ExamNote>
  </>
);

const Tab1_Ref = () => (
  <>
    <Section title="Nøkkelbegreper" icon="🏷️">
      <div style={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
        <Pill term="Referanseelektrode" def="Elektrode med kjent, konstant potensial uavhengig av analytten" />
        <Pill term="SHE" def="Standard hydrogenelektrode: E° = 0 V, upraktisk" />
        <Pill term="SCE" def="Mettet kalomelektrode: Hg|Hg₂Cl₂|KCl(mettet), E = +0.244 V" />
        <Pill term="Ag/AgCl" def="Ag|AgCl|KCl, E ≈ +0.197 V (mettet KCl), mest brukt" />
        <Pill term="Overgangspotensial (E_j)" def="Potensialforskjell over grenseflaten mellom to løsninger" />
        <Pill term="Saltbro" def="Minimerer E_j med ioner av lik mobilitet (KCl, NH₄NO₃)" />
      </div>
    </Section>

    <Section title="Forklaring" icon="📖">
      <p><strong>SHE (Standard Hydrogenelektrode)</strong>: Definerer E° = 0 V. Halvreaksjon: 2H⁺ + 2e⁻ → H₂(g). Brukes lite i praksis fordi den er vanskelig å vedlikeholde.</p>
      <p style={{ marginTop: 10 }}><strong>SCE (Mettet kalomelektrode)</strong>: Hg(l) | Hg₂Cl₂(mettet) | KCl(mettet). Halvreaksjon: Hg₂Cl₂ + 2e⁻ → 2Hg(l) + 2Cl⁻. Brukes mindre nå pga kvikksølv (HMS).</p>
      <p style={{ marginTop: 10 }}><strong>Ag/AgCl</strong>: Ag(s) | AgCl(mettet), KCl(xM). Halvreaksjon: AgCl(s) + e⁻ → Ag(s) + Cl⁻. Fordeler: ingen kvikksølv, tåler T {'>'} 60°C. Mest brukt i moderne instrumenter.</p>
      <p style={{ marginTop: 10 }}><strong>Overgangspotensial E<Sub>j</Sub></strong>: Oppstår når to elektrolyttløsninger med ulik sammensetning er i kontakt. Saltbroen minimerer dette ved å bruke ioner med lik mobilitet (f.eks. K⁺ og Cl⁻). Kan være begrensende for nøyaktighet.</p>
    </Section>

    <Section title="Visuell illustrasjon" icon="🔬">
      <ReferenceElectrodeComparison />
    </Section>

    <Section title="Eksempel" icon="✏️">
      <p style={{ color: TEXT2, fontSize: "0.9rem", marginBottom: 12 }}>
        Et cellepotensial måles til +0.512 V med Ag/AgCl-referanse (E = +0.197 V vs SHE). Hva er potensialet vs SHE?
      </p>
      <CollapsibleStep num={1} title="Forstå sammenhengen">
        E(målt) = E(ind) − E(ref)<br/>
        Målt mot Ag/AgCl betyr at E(ref) = +0.197 V vs SHE
      </CollapsibleStep>
      <CollapsibleStep num={2} title="Regn om til SHE">
        E(ind) vs SHE = E(målt) + E(ref)<br/>
        = 0.512 + 0.197 = 0.709 V vs SHE
      </CollapsibleStep>
    </Section>

    <Huskeregel>
      <strong>«Ag/AgCl er standarden»</strong> — i praksis er Ag/AgCl-elektroden den mest brukte referanseelektroden. Husk E(Ag/AgCl, mettet KCl) ≈ <Eq>+0.197 V</Eq> vs SHE, og E(SCE) ≈ <Eq>+0.244 V</Eq> vs SHE.
    </Huskeregel>

    <ExamNote>
      V2024 ber om å sette opp cellerekka for et pH-meter med to Ag/AgCl-referanseelektroder (7 poeng). V2022 spør om oppsettet for potensiometri inkludert referanseelektrode.
    </ExamNote>
  </>
);

const Tab2_Ind = () => (
  <>
    <Section title="Nøkkelbegreper" icon="🏷️">
      <div style={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
        <Pill term="Indikatorelektrode" def="Elektrode som responderer på analyttkonsentrasjonen" />
        <Pill term="1. type (metall)" def="Rent metall i likevekt med sitt kation: M|M²⁺" />
        <Pill term="2. type (metall)" def="Metall dekket av tungt løselig salt, responderer på anion: Ag|AgCl|Cl⁻" />
        <Pill term="Inert redokselektrode" def="Pt, Au, C — overvåker redokssystemer uten å delta" />
        <Pill term="Membranelektrode" def="Ioneselektiv elektrode med membran (f.eks. glasselektrode)" />
      </div>
    </Section>

    <Section title="Forklaring" icon="📖">
      <p><strong>1. type</strong>: Elektrode av rent metall i kontakt med sitt kation. Eksempel: Cu-elektrode i Cu²⁺-løsning.</p>
      <FormulaBox>
        E(ind) = E°(M<Sup>z+</Sup>|M) − (0.0592/z) · pM<br/>
        der pM = −log(a<Sub>M<Sup>z+</Sup></Sub>)
      </FormulaBox>
      <p>Negativt stigningstall: økt konsentrasjon → lavere pM → høyere E.</p>
      <p style={{ marginTop: 10 }}><strong>2. type</strong>: Metall dekket av en tungt løselig utfelling. Eksempel: Ag|AgCl|Cl⁻. Responderer på anionkonsentrasjonen.</p>
      <FormulaBox>
        AgCl(s) + e⁻ ⇌ Ag(s) + Cl⁻, E° = 0.222 V<br/>
        Positivt stigningstall: økt [Cl⁻] → lavere potensial
      </FormulaBox>
      <p style={{ marginTop: 10 }}><strong>Inerte redokselektroder</strong>: Pt, Au, Pd, C. Deltar ikke i reaksjonen, men overvåker forholdet mellom oksidert/redusert form. Eksempel: Pt i en løsning med Ce⁴⁺/Ce³⁺.</p>
    </Section>

    <Section title="Visuell illustrasjon" icon="🔬">
      <IndicatorElectrodeTypes />
    </Section>

    <Section title="Eksempel" icon="✏️">
      <p style={{ color: TEXT2, fontSize: "0.9rem", marginBottom: 12 }}>
        En Ag-elektrode brukes som indikator for Cl⁻ i en løsning. E°(AgCl|Ag) = 0.222 V. [Cl⁻] = 0.010 M. Finn E(ind).
      </p>
      <CollapsibleStep num={1} title="Skriv halvreaksjonen">
        AgCl(s) + e⁻ ⇌ Ag(s) + Cl⁻<br/>
        z = 1
      </CollapsibleStep>
      <CollapsibleStep num={2} title="Bruk Nernst">
        E = E° − (0.0592/1) · log[Cl⁻]<br/>
        E = 0.222 − 0.0592 · log(0.010)<br/>
        E = 0.222 − 0.0592 · (−2)<br/>
        E = 0.222 + 0.118 = 0.340 V
      </CollapsibleStep>
    </Section>

    <Huskeregel>
      <strong>«Første type for kationer, andre type for anioner»</strong>. 1. type: metall direkte i løsning med sine ioner. 2. type: metall + utfelling — reager på anionen. Inert = bare tilskuer (Pt).
    </Huskeregel>

    <ExamNote>
      V2022 ber om å diskutere selektiviteten til ulike indikatorelektroder. V2024 krever forståelse av hvordan Ag/AgCl fungerer som del av et pH-meter.
    </ExamNote>
  </>
);

const Tab3_pH = () => (
  <>
    <Section title="Nøkkelbegreper" icon="🏷️">
      <div style={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
        <Pill term="Glasselektrode" def="pH-sensitiv glassmembran som detekterer [H⁺]-forskjell" />
        <Pill term="Kombinasjonselektrode" def="Glasselektrode og referanse bygd inn i én enhet" />
        <Pill term="Grensepotensial (E_b)" def="E₁ − E₂: potensialforskjell over glassmembranen" />
        <Pill term="Syrefeil" def="For høy pH-avlesning i sterkt sure løsninger (pH < 0.5)" />
        <Pill term="Alkalifeil" def="Alkalimetallioner gir respons i basiske løsninger" />
        <Pill term="Direkte potensiometri" def="Beregner [analytt] direkte fra cellepotensialet" />
        <Pill term="Standard addisjon" def="Tilsetter kjent mengde standard til prøven, eliminerer matrikseffekter" />
        <Pill term="ISE" def="Ioneselektiv elektrode — responderer selektivt på ett ionetype" />
      </div>
    </Section>

    <Section title="Forklaring" icon="📖">
      <p>Et pH-meter er den mest brukte anvendelsen av potensiometri. Glasselektroden har en tynn membran som er sensitiv for H⁺-konsentrasjonen.</p>
      <FormulaBox>
        E(celle) = E(ind) − E(ref) + E<Sub>j</Sub><br/>
        Operasjonell pH: pH(X) = pH(S) − [E(X) − E(S)] / 0.0592 V
      </FormulaBox>
      <p><strong>Feilkilder ved pH-måling:</strong></p>
      <ul style={{ paddingLeft: 20, color: TEXT2, fontSize: "0.9rem" }}>
        <li>Syrefeil: måler for høy pH i svært sure løsninger</li>
        <li>Alkalifeil: Na⁺, K⁺ gir falsk respons i basiske løsninger</li>
        <li>Dehydrering: tørr elektrode gir store avvik</li>
        <li>Variasjon i E<Sub>j</Sub> og lav ionestyrke</li>
      </ul>
      <p style={{ marginTop: 12 }}><strong>Direkte potensiometri</strong> — beregn analyttkonsentrasjon:</p>
      <FormulaBox>
        Kationer: pX = −z(E(celle) − K) / 0.0592 V<br/>
        Anioner: pA = +z(E(celle) − K) / 0.0592 V
      </FormulaBox>
      <p><strong>Standard addisjonsmetoden</strong>: Mål E før og etter tilsats av kjent mengde standard. Eliminerer matrikseffekter fordi prøven selv er matrisen.</p>
    </Section>

    <Section title="Visuell illustrasjon" icon="🔬">
      <GlassElectrodeDiagram />
    </Section>

    <Section title="Eksempel — Standard addisjon (V2023-type)" icon="✏️">
      <p style={{ color: TEXT2, fontSize: "0.9rem", marginBottom: 12 }}>
        50.00 mL prøve (fortynnet 10→100 mL) med Ca²⁺-ISE. E₁ = −0.05290 V. Etter tilsats av 1.00 mL 0.0500 M Ca²⁺: E₂ = −0.04417 V. Finn [Ca²⁺] i originalprøven.
      </p>
      <CollapsibleStep num={1} title="Sett opp Nernst for begge målinger">
        z = 2 for Ca²⁺<br/>
        E₁ = K + (0.0592/2) · log(c₀)<br/>
        E₂ = K + (0.0592/2) · log[(c₀·V₀ + c_s·V_s)/(V₀ + V_s)]
      </CollapsibleStep>
      <CollapsibleStep num={2} title="Trekk fra: E₂ − E₁">
        ΔE = (0.0592/2) · log[(c₀·50 + 0.05·1)/(51·c₀)]<br/>
        −0.04417 − (−0.05290) = 0.00873 V<br/>
        0.00873 = 0.0296 · log[(50c₀ + 0.05)/(51c₀)]
      </CollapsibleStep>
      <CollapsibleStep num={3} title="Løs for c₀">
        log[...] = 0.00873/0.0296 = 0.2949<br/>
        (50c₀ + 0.05)/(51c₀) = 10^0.2949 = 1.972<br/>
        50c₀ + 0.05 = 100.6c₀<br/>
        0.05 = 50.6c₀<br/>
        c₀ = 9.88 × 10⁻⁴ M (i fortynnet løsning)<br/>
        Original: c = 9.88 × 10⁻⁴ × (100/10) ≈ 0.00988 M
      </CollapsibleStep>
    </Section>

    <Huskeregel>
      <strong>Standard addisjon</strong>: Mål → tilsett → mål igjen → trekk fra. Fordelen er at matrikseffektene er de samme i begge målinger. Husk å korrigere for fortynning (V₀ + V_s i nevner)!
    </Huskeregel>

    <ExamNote>
      Standard addisjonsberegning med ISE er en gjenganger: V2023 oppgave 7a (Ca²⁺, 7 poeng), V2024 oppgave 7b (I⁻ med ekstern/intern standard, 7 poeng). V2023 6b spør om feilkilder ved pH-måling.
    </ExamNote>
  </>
);

const Tab4_Titr = () => (
  <>
    <Section title="Nøkkelbegreper" icon="🏷️">
      <div style={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
        <Pill term="Potensiometrisk titrering" def="Følger E(celle) vs volum titrant" />
        <Pill term="Redokstitrering" def="Titrerreaksjonen er en redoksreaksjon" />
        <Pill term="Ekvivalenspunkt" def="Bratt endring i E(celle), alle analytten har reagert" />
        <Pill term="Jodometri" def="I₂/I⁻-system med stivelse som indikator" />
        <Pill term="Permanganat" def="KMnO₄: sterkt oksidasjonsmiddel, selvindikerende (lilla)" />
        <Pill term="Indikatorer" def="Generelle (fargeendring ved E) eller spesifikke (stivelse + I₃⁻)" />
      </div>
    </Section>

    <Section title="Forklaring" icon="📖">
      <p><strong>Potensiometrisk titrering</strong>: Måler potensialet til en indikatorelektrode som funksjon av tilsatt volum standardløsning. Fordeler: mer pålitelig enn visuell indikator, kan automatiseres, ser på <em>endring</em> i E, ikke absolutt verdi.</p>
      <p style={{ marginTop: 10 }}><strong>Redokstitrering</strong>: Titrerreaksjonen innebærer elektronoverføring. Før ekvivalenspunktet beregnes E fra <em>analytten</em>, etter ekvivalenspunktet fra <em>titrantet</em>.</p>
      <FormulaBox>
        Ved likevekt: E(analytt) = E(titrant) = E(indikator)
      </FormulaBox>
      <p style={{ marginTop: 10 }}><strong>Jodometri</strong>: Bruker I₂/I⁻-systemet. I₂ løses med overskudd KI til I₃⁻. Stivelse gir blått kompleks med I₃⁻ → tydelig endepunkt.</p>
      <p style={{ marginTop: 10 }}><strong>Permanganat (KMnO₄)</strong>: MnO₄⁻ + 8H⁺ + 5e⁻ → Mn²⁺ + 4H₂O. E° = 1.51 V. Selvindikerende: lilla → fargeløs.</p>
    </Section>

    <Section title="Visuell illustrasjon" icon="🔬">
      <p style={{ textAlign: "center", color: TEXT2, fontSize: "0.85rem", marginBottom: 4 }}>Titrerkurve for redokstitrering (Fe²⁺ med MnO₄⁻)</p>
      <RedoxTitrationCurve />
    </Section>

    <Section title="Eksempel — Jodometri" icon="✏️">
      <p style={{ color: TEXT2, fontSize: "0.9rem", marginBottom: 12 }}>
        0.1210 g KIO₃ (Mm = 214.00 g/mol) løses, tilsettes overskudd KI og HCl. Frigjort I₂ krever 41.64 mL tiosulfat. Finn c(Na₂S₂O₃).
      </p>
      <CollapsibleStep num={1} title="Finn n(KIO₃)">
        n = m/Mm = 0.1210/214.00 = 5.654 × 10⁻⁴ mol
      </CollapsibleStep>
      <CollapsibleStep num={2} title="Støkiometri: IO₃⁻ → I₂">
        IO₃⁻ + 5I⁻ + 6H⁺ → 3I₂ + 3H₂O<br/>
        n(I₂) = 3 × n(IO₃⁻) = 3 × 5.654 × 10⁻⁴ = 1.696 × 10⁻³ mol
      </CollapsibleStep>
      <CollapsibleStep num={3} title="Støkiometri: I₂ + tiosulfat">
        I₂ + 2S₂O₃²⁻ → 2I⁻ + S₄O₆²⁻<br/>
        n(S₂O₃²⁻) = 2 × n(I₂) = 2 × 1.696 × 10⁻³ = 3.393 × 10⁻³ mol
      </CollapsibleStep>
      <CollapsibleStep num={4} title="Beregn konsentrasjon">
        c = n/V = 3.393 × 10⁻³ / 0.04164 = 0.08149 M
      </CollapsibleStep>
    </Section>

    <Huskeregel>
      <strong>Redokstitrering = to halvreaksjoner</strong>. Titrerkurven beregnes med Nernst: analytten før ekv.pkt, titrantet etter. Potensiometrisk titrering er mer robust enn visuell fordi den ikke avhenger av én spesifikk farge.
    </Huskeregel>

    <ExamNote>
      Redokstitrering (jodometri) er lab-pensum og kan dukke opp som beregningsoppgave. Potensiometrisk titrering vs. visuell titrering er et klassisk sammenligningsspørsmål (V2022).
    </ExamNote>
  </>
);

const Tab5_Volt = () => (
  <>
    <Section title="Nøkkelbegreper" icon="🏷️">
      <div style={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
        <Pill term="Voltammetri" def="Måler strøm som funksjon av påtrykt spenning" />
        <Pill term="3-elektrodesystem" def="WE (arbeid), RE (referanse), CE (mot) — to kretser" />
        <Pill term="Arbeidselektrode (WE)" def="Der reaksjonen skjer, liten overflate" />
        <Pill term="Motelektrode (CE)" def="Inert, strømmen måles mellom WE og CE" />
        <Pill term="Grensestrøm" def="Maks strøm når c(analytt) = 0 ved elektroden" />
        <Pill term="Diffusjonslag" def="Tynt lag nær WE der konsentrasjonen synker" />
        <Pill term="Polarografi" def="Voltammetri med DME (kvikksølvdråpe), ingen røring" />
        <Pill term="E₁/₂" def="Halvbølgepotensial ≈ E° for reaksjonen" />
        <Pill term="Ohmsk potensial" def="Spenningsstap E = IR over cellemotstanden" />
      </div>
    </Section>

    <Section title="Forklaring" icon="📖">
      <p><strong>Voltammetri</strong> måler strøm som funksjon av påtrykt spenning. Brukes til kvantitativ analyse av både organiske og uorganiske forbindelser. Svært sensitiv teknikk, egnet for sporelementanalyse, kan automatiseres og brukes in situ.</p>
      <p style={{ marginTop: 10 }}>I et <strong>3-elektrodesystem</strong> har man to uavhengige kretser:</p>
      <ul style={{ paddingLeft: 20, color: TEXT2, fontSize: "0.9rem" }}>
        <li><strong>Referansekretsen</strong>: Kontrollerer spenning mellom WE og RE</li>
        <li><strong>Arbeidskretsen</strong>: Måler strøm mellom WE og CE</li>
      </ul>
      <p style={{ marginTop: 10 }}><strong>Grensestrøm</strong>: Når konsentrasjonen av analytten ved WE → 0, begrenses strømmen av diffusjon gjennom diffusjonslaget. Grensestrømmen er proporsjonal med analyttkonsentrasjonen i bulkløsningen.</p>
      <p style={{ marginTop: 10 }}><strong>Polarografi</strong>: Voltammetri uten røring, med DME (kvikksølvdråpe) som WE. Fordeler med Hg: fornyer seg selv, stor overspenning for H₂. Ulemper: giftig, egner seg ikke ved positive potensialer.</p>
      <p style={{ marginTop: 10 }}><strong>Hydrodynamisk voltammetri</strong>: Med røring → tynt diffusjonslag → strømmen stabiliserer seg raskt.</p>
    </Section>

    <Section title="Visuell illustrasjon" icon="🔬">
      <ThreeElectrodeSystem />
    </Section>

    <Section title="Eksempel — Flervalg (V2025-type)" icon="✏️">
      <p style={{ color: TEXT2, fontSize: "0.9rem", marginBottom: 12 }}>
        Hva er riktig om voltammetri?
      </p>
      <CollapsibleStep num={1} title="«Det brukes bare til uorganiske forbindelser»">
        ❌ Feil — kan brukes for både organiske og uorganiske.
      </CollapsibleStep>
      <CollapsibleStep num={2} title="«Det kan automatiseres»">
        ✅ Riktig — voltammetri kan fullautomatiseres.
      </CollapsibleStep>
      <CollapsibleStep num={3} title="«Det kan brukes til in situ-målinger»">
        ✅ Riktig — egnet for overvåking på stedet.
      </CollapsibleStep>
      <CollapsibleStep num={4} title="«I polarografi blir diffusjonslaget tynt pga røring»">
        ❌ Feil — polarografi har INGEN røring. Diffusjonen alene styrer grensestrømmen.
      </CollapsibleStep>
      <CollapsibleStep num={5} title="«WE bør ha stort areal»">
        ❌ Feil — liten overflate er gunstig for å ikke påvirke bulkkonsentrasjonen.
      </CollapsibleStep>
    </Section>

    <Huskeregel>
      <strong>Potensiometri = spenning (I=0). Voltammetri = strøm (V påtrykt).</strong> I voltammetri: to kretser, tre elektroder. Strøm mellom WE og CE, spenning kontrollert mellom WE og RE. Grensestrøm ∝ c(analytt).
    </Huskeregel>

    <ExamNote>
      Flervalg om voltammetri kommer hvert år. V2025: «hva måles som funksjon av hva» + elektrodespørsmål (6 poeng). V2021: flervalg om WE-areal og kretser. V2024: grensestrøm og diffusjon (2 poeng).
    </ExamNote>
  </>
);

const Tab6_CVStrip = () => (
  <>
    <Section title="Nøkkelbegreper" icon="🏷️">
      <div style={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
        <Pill term="Syklisk voltammetri (CV)" def="Triangulært skann frem og tilbake, viser reduksjon + oksidasjon" />
        <Pill term="Pulsvoltammetri" def="Kort puls (~50 mV), måler Δi → topp ved E_peak" />
        <Pill term="Stripping" def="To trinn: avsetting (konsentrering) → stripping (måling)" />
        <Pill term="Anodisk stripping" def="Reduksjon i trinn 1 (katode), oksidasjon i trinn 2 (anode)" />
        <Pill term="E_pc / E_pa" def="Katodisk/anodisk toppotensial i CV" />
        <Pill term="DME" def="Dropping Mercury Electrode — dråpen fornyer seg" />
      </div>
    </Section>

    <Section title="Forklaring" icon="📖">
      <p><strong>Syklisk voltammetri (CV)</strong>: Spenningen skannes lineært til et toppunkt og tilbake. Gir et voltammogram med to topper: én for reduksjon (fremover-skann) og én for oksidasjon (bakover-skann). Brukes mye for å karakterisere redokssystemer.</p>
      <FormulaBox>
        Fremover: skann til mer negative verdier → reduksjon<br/>
        Bakover: skann til mer positive verdier → oksidasjon<br/>
        Reversibel reaksjon: ΔE<Sub>p</Sub> = |E<Sub>pa</Sub> − E<Sub>pc</Sub>| ≈ 0.059/z V
      </FormulaBox>
      <p style={{ marginTop: 10 }}><strong>Pulsvoltammetri</strong>: En kort puls (~50 mV, ~50 ms) legges på, strømmen måles før og ved slutten av pulsen. Differansen Δi plottes mot E → gir en topp. Toppens høyde ∝ konsentrasjon. Bedre signal/støy enn lineært skann.</p>
      <p style={{ marginTop: 10 }}><strong>Stripping-voltammetri</strong>: Ekstremt sensitiv metode for sporelementanalyse.</p>
      <ul style={{ paddingLeft: 20, color: TEXT2, fontSize: "0.9rem" }}>
        <li><strong>Trinn 1 (avsetting)</strong>: Analytten konsentreres på WE over flere minutter</li>
        <li><strong>Trinn 2 (stripping)</strong>: Analytten oksideres/reduseres raskt mens strømmen måles</li>
      </ul>
      <p>Oppkonsentreringen i trinn 1 gir ekstremt høy sensitivitet. Kan detektere konsentrasjoner ned til ppb-nivå.</p>
    </Section>

    <Section title="Visuell illustrasjon — Syklisk voltammogram" icon="🔬">
      <CyclicVoltammogram />
      <p style={{ textAlign: "center", color: TEXT2, fontSize: "0.8rem", marginTop: -4 }}>Typisk CV for et reversibelt redokspar (f.eks. Fe(CN)₆³⁻/⁴⁻)</p>
    </Section>

    <Section title="Visuell illustrasjon — Stripping" icon="🔬">
      <StrippingDiagram />
    </Section>

    <Section title="Eksempel — Identifiser voltammogramtype (V2023)" icon="✏️">
      <p style={{ color: TEXT2, fontSize: "0.9rem", marginBottom: 12 }}>
        Et voltammogram viser en kurve med to topper: én negativ strømtopp ved ca. −0.8 V og én positiv strømtopp ved ca. 0.0 V. Kurven er en lukket sløyfe. Hvilken type voltammetri er dette?
      </p>
      <CollapsibleStep num={1} title="Analyser formen">
        Sløyfeform med to topper (reduksjon og oksidasjon) betyr at spenningen skannes frem og tilbake.
      </CollapsibleStep>
      <CollapsibleStep num={2} title="Svar">
        ✅ Syklisk voltammetri (CV).<br/>
        Toppen A = oksidasjon (bakover-skann), toppen B = reduksjon (fremover-skann).
      </CollapsibleStep>
    </Section>

    <Huskeregel>
      <strong>CV = lukket sløyfe (to topper)</strong>. Pulsvoltammetri = én topp (Δi). Stripping = to trinn (oppkonsentrering → måling). Stripping er den mest sensitive av alle voltammetriske metoder.
    </Huskeregel>

    <ExamNote>
      V2023 oppgave 7b: identifiser CV fra voltammogram (2 poeng). V2025 oppgave 6d: forklar stripping-voltammetri og hovedfordelen (4 poeng). V2022 oppgave 14d: identifiser signaltype (triangulært skann = CV, 2 poeng).
    </ExamNote>
  </>
);

// ─── Main Component ───

export default function ElektrokjemiGuide() {
  const [activeTab, setActiveTab] = useState(0);
  const [visited, setVisited] = useState(new Set([0]));

  const handleTabClick = useCallback((id) => {
    setActiveTab(id);
    setVisited(prev => new Set([...prev, id]));
  }, []);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowRight") handleTabClick(Math.min(activeTab + 1, TABS.length - 1));
      if (e.key === "ArrowLeft") handleTabClick(Math.max(activeTab - 1, 0));
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [activeTab, handleTabClick]);

  const tabContent = [
    <Tab0_Nernst key={0} />,
    <Tab1_Ref key={1} />,
    <Tab2_Ind key={2} />,
    <Tab3_pH key={3} />,
    <Tab4_Titr key={4} />,
    <Tab5_Volt key={5} />,
    <Tab6_CVStrip key={6} />,
  ];

  return (
    <div style={{ background: BG, minHeight: "100vh", fontFamily: "'Source Sans 3', sans-serif", color: TEXT }}>
      <style>{fonts}</style>

      {/* Header */}
      <div style={{
        background: `linear-gradient(135deg, ${VIOLET}22, ${BG})`,
        borderBottom: `2px solid ${VIOLET}44`,
        padding: "20px 24px 16px",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
          <div style={{
            background: VIOLET, borderRadius: 8, padding: "6px 12px",
            fontFamily: "'JetBrains Mono', monospace", fontSize: "0.8rem",
            fontWeight: 700, color: "#fff",
          }}>Emne 5</div>
          <span style={{ color: TEXT2, fontSize: "0.85rem" }}>IMAK2004 Kjemisk Analyse</span>
        </div>
        <h1 style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800,
          fontSize: "1.5rem", color: TEXT, margin: 0,
        }}>Elektrokjemiske metoder</h1>
        <p style={{ color: TEXT2, fontSize: "0.85rem", margin: "6px 0 0" }}>
          Kap. 17, 19, 21 — Cellepotensial · Potensiometri · Voltammetri
        </p>

        {/* Progress */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 12 }}>
          <span style={{ color: TEXT2, fontSize: "0.75rem", fontFamily: "'JetBrains Mono', monospace" }}>
            {visited.size}/{TABS.length} besøkt
          </span>
          <div style={{ flex: 1, height: 4, background: BORDER, borderRadius: 2 }}>
            <div style={{
              width: `${(visited.size / TABS.length) * 100}%`,
              height: "100%", background: VIOLET, borderRadius: 2,
              transition: "width 0.3s ease",
            }}/>
          </div>
        </div>
      </div>

      {/* Tab bar */}
      <div style={{
        display: "flex", overflowX: "auto", gap: 2,
        padding: "8px 16px", background: CARD,
        borderBottom: `1px solid ${BORDER}`,
        WebkitOverflowScrolling: "touch",
      }}>
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            style={{
              flex: "0 0 auto",
              padding: "8px 14px", borderRadius: 8, border: "none",
              cursor: "pointer", whiteSpace: "nowrap",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: "0.8rem", fontWeight: activeTab === tab.id ? 700 : 500,
              background: activeTab === tab.id ? VIOLET : "transparent",
              color: activeTab === tab.id ? "#fff" : (visited.has(tab.id) ? VIOLET : TEXT2),
              transition: "all 0.2s ease",
              position: "relative",
            }}
          >
            {tab.short}
            {visited.has(tab.id) && activeTab !== tab.id && (
              <span style={{
                position: "absolute", top: 3, right: 3,
                width: 5, height: 5, borderRadius: "50%",
                background: VIOLET,
              }}/>
            )}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div style={{ padding: "24px 20px", maxWidth: 700, margin: "0 auto" }}>
        {/* Tab title */}
        <div style={{
          background: `linear-gradient(90deg, ${VIOLET}22, transparent)`,
          borderLeft: `4px solid ${VIOLET}`,
          padding: "12px 16px", borderRadius: "0 8px 8px 0",
          marginBottom: 24,
        }}>
          <h2 style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 800, fontSize: "1.15rem", color: TEXT, margin: 0,
          }}>
            {TABS[activeTab].title}
          </h2>
          <span style={{ color: TEXT2, fontSize: "0.8rem" }}>
            Emne 5 — Elektrokjemiske metoder · Fane {activeTab + 1}/{TABS.length}
          </span>
        </div>

        {tabContent[activeTab]}

        {/* Navigation */}
        <div style={{
          display: "flex", justifyContent: "space-between",
          marginTop: 32, paddingTop: 20,
          borderTop: `1px solid ${BORDER}`,
        }}>
          <button
            onClick={() => activeTab > 0 && handleTabClick(activeTab - 1)}
            disabled={activeTab === 0}
            style={{
              padding: "10px 20px", borderRadius: 10, border: `1px solid ${BORDER}`,
              background: activeTab === 0 ? "transparent" : CARD,
              color: activeTab === 0 ? TEXT2 + "44" : TEXT2,
              cursor: activeTab === 0 ? "default" : "pointer",
              fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.85rem", fontWeight: 600,
            }}
          >
            ← Forrige
          </button>
          <button
            onClick={() => activeTab < TABS.length - 1 && handleTabClick(activeTab + 1)}
            disabled={activeTab === TABS.length - 1}
            style={{
              padding: "10px 20px", borderRadius: 10, border: "none",
              background: activeTab === TABS.length - 1 ? BORDER : VIOLET,
              color: activeTab === TABS.length - 1 ? TEXT2 : "#fff",
              cursor: activeTab === TABS.length - 1 ? "default" : "pointer",
              fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.85rem", fontWeight: 600,
            }}
          >
            Neste →
          </button>
        </div>
      </div>
    </div>
  );
}
