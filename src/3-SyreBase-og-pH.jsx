import { useState, useCallback, useMemo } from "react";

const ACCENT = "#10B981";
const ACCENT_DIM = "rgba(16, 185, 129, 0.15)";
const ACCENT_BORDER = "rgba(16, 185, 129, 0.3)";
const BG = "#0F172A";
const CARD = "#1E293B";
const BORDER = "#334155";
const TEXT = "#F8FAFC";
const TEXT2 = "#94A3B8";

const fonts = `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Source+Sans+3:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500;600&display=swap');
`;

// ─── Shared Components ───

function Pill({ children, def, color = ACCENT }) {
  const [show, setShow] = useState(false);
  return (
    <span
      style={{
        position: "relative",
        display: "inline-block",
        cursor: "pointer",
      }}
      onClick={() => setShow(!show)}
      onMouseLeave={() => setShow(false)}
    >
      <span
        style={{
          display: "inline-block",
          padding: "4px 14px",
          borderRadius: 999,
          fontSize: 13,
          fontFamily: "'JetBrains Mono', monospace",
          fontWeight: 500,
          background: `${color}22`,
          color: color,
          border: `1px solid ${color}44`,
          userSelect: "none",
          transition: "all 0.2s",
        }}
      >
        {children}
      </span>
      {show && def && (
        <span
          style={{
            position: "absolute",
            bottom: "calc(100% + 8px)",
            left: "50%",
            transform: "translateX(-50%)",
            background: "#0F172A",
            border: `1px solid ${ACCENT_BORDER}`,
            borderRadius: 8,
            padding: "8px 14px",
            fontSize: 12,
            fontFamily: "'Source Sans 3', sans-serif",
            color: TEXT,
            whiteSpace: "nowrap",
            zIndex: 100,
            boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
            maxWidth: 320,
            whiteSpace: "normal",
          }}
        >
          {def}
        </span>
      )}
    </span>
  );
}

function CollapsibleStep({ n, title, children }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      style={{
        borderLeft: `2px solid ${open ? ACCENT : BORDER}`,
        paddingLeft: 16,
        marginBottom: 10,
        transition: "border-color 0.2s",
      }}
    >
      <div
        onClick={() => setOpen(!open)}
        style={{
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: 8,
          fontFamily: "'Source Sans 3', sans-serif",
          fontSize: 14,
          fontWeight: 600,
          color: open ? ACCENT : TEXT2,
          userSelect: "none",
          transition: "color 0.2s",
        }}
      >
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: 22,
            height: 22,
            borderRadius: "50%",
            background: open ? ACCENT : BORDER,
            color: open ? BG : TEXT2,
            fontSize: 11,
            fontWeight: 700,
            flexShrink: 0,
          }}
        >
          {n}
        </span>
        <span>{title}</span>
        <span style={{ marginLeft: "auto", fontSize: 16 }}>
          {open ? "▾" : "▸"}
        </span>
      </div>
      {open && (
        <div
          style={{
            marginTop: 8,
            fontFamily: "'Source Sans 3', sans-serif",
            fontSize: 14,
            color: TEXT,
            lineHeight: 1.7,
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
}

function SectionTitle({ children }) {
  return (
    <h3
      style={{
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontSize: 16,
        fontWeight: 700,
        color: ACCENT,
        marginTop: 28,
        marginBottom: 12,
        letterSpacing: "-0.01em",
        display: "flex",
        alignItems: "center",
        gap: 8,
      }}
    >
      {children}
    </h3>
  );
}

function Formula({ children }) {
  return (
    <span
      style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 13,
        color: "#E2E8F0",
        background: "rgba(16,185,129,0.08)",
        padding: "2px 8px",
        borderRadius: 4,
        display: "inline",
      }}
    >
      {children}
    </span>
  );
}

function FormulaBlock({ children }) {
  return (
    <div
      style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 14,
        color: "#E2E8F0",
        background: "rgba(16,185,129,0.06)",
        border: `1px solid ${ACCENT_BORDER}`,
        borderRadius: 8,
        padding: "14px 18px",
        margin: "12px 0",
        lineHeight: 2,
        overflowX: "auto",
      }}
    >
      {children}
    </div>
  );
}

function Huskeregel({ children }) {
  return (
    <div
      style={{
        background: `linear-gradient(135deg, ${ACCENT}15, ${ACCENT}08)`,
        border: `1.5px solid ${ACCENT}55`,
        borderRadius: 10,
        padding: "14px 18px",
        margin: "16px 0",
        fontFamily: "'Source Sans 3', sans-serif",
        fontSize: 14,
        color: TEXT,
        lineHeight: 1.6,
      }}
    >
      <div
        style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontWeight: 700,
          fontSize: 12,
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          color: ACCENT,
          marginBottom: 6,
        }}
      >
        💡 Huskeregel
      </div>
      {children}
    </div>
  );
}

function ExamNote({ children }) {
  return (
    <div
      style={{
        background: "rgba(239,68,68,0.06)",
        border: "1px solid rgba(239,68,68,0.2)",
        borderRadius: 8,
        padding: "10px 14px",
        margin: "14px 0 0",
        fontFamily: "'Source Sans 3', sans-serif",
        fontSize: 13,
        color: "#FCA5A5",
        lineHeight: 1.5,
      }}
    >
      <span style={{ fontWeight: 600 }}>🎯 Eksamensrelevans: </span>
      {children}
    </div>
  );
}

function Prose({ children }) {
  return (
    <div
      style={{
        fontFamily: "'Source Sans 3', sans-serif",
        fontSize: 14,
        color: TEXT,
        lineHeight: 1.75,
      }}
    >
      {children}
    </div>
  );
}

function Sub({ children }) {
  return (
    <sub style={{ fontSize: "0.75em", verticalAlign: "sub" }}>{children}</sub>
  );
}
function Sup({ children }) {
  return (
    <sup style={{ fontSize: "0.75em", verticalAlign: "super" }}>
      {children}
    </sup>
  );
}

// ─── TAB 1: Syre-base-teori og pH-beregninger ───

function Tab1() {
  return (
    <div>
      <SectionTitle>🔑 Nøkkelbegreper</SectionTitle>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        <Pill def="Likevektskonstant for en svak syre: Ka = [H⁺][A⁻]/[HA]">
          K<Sub>a</Sub>
        </Pill>
        <Pill def="Likevektskonstant for en svak base: Kb = [HB⁺][OH⁻]/[B]">
          K<Sub>b</Sub>
        </Pill>
        <Pill def="Ioneproduktet for vann: Kw = [H⁺][OH⁻] = 10⁻¹⁴ ved 25 °C">
          K<Sub>w</Sub>
        </Pill>
        <Pill def="pKa = −log(Ka). Lavere pKa = sterkere syre">pK<Sub>a</Sub></Pill>
        <Pill def="pKb = 14 − pKa ved 25 °C">pK<Sub>b</Sub></Pill>
        <Pill def="Syre som donerer proton (H⁺) til base">Protondonor</Pill>
        <Pill def="Base som aksepterer proton (H⁺) fra syre">
          Protonakseptor
        </Pill>
        <Pill def="Syre og base knyttet ved tap/opptak av ett proton">
          Konjugert par
        </Pill>
      </div>

      <SectionTitle>📖 Forklaring</SectionTitle>
      <Prose>
        <p>
          <strong>Brønsted-Lowry-definisjonen:</strong> En <em>syre</em> er en
          protondonor (avgir H<Sup>+</Sup>), en <em>base</em> er en
          protonakseptor (tar opp H<Sup>+</Sup>).
        </p>
        <p>
          <strong>Sterke syrer/baser</strong> dissosierer fullstendig i vann.
          HCl → H<Sup>+</Sup> + Cl<Sup>−</Sup>. For sterke syrer:
          pH = −log(c<Sub>syre</Sub>). For sterke baser:
          pOH = −log(c<Sub>base</Sub>), pH = 14 − pOH.
        </p>
        <p>
          <strong>Svake syrer</strong> er i likevekt:
        </p>
        <FormulaBlock>
          HA ⇌ H⁺ + A⁻
          <br />
          K<Sub>a</Sub> = [H⁺]·[A⁻] / [HA]
        </FormulaBlock>
        <p>
          <strong>Svake baser:</strong>
        </p>
        <FormulaBlock>
          B + H₂O ⇌ HB⁺ + OH⁻
          <br />
          K<Sub>b</Sub> = [HB⁺]·[OH⁻] / [B]
        </FormulaBlock>
        <p>
          Sammenhengen mellom K<Sub>a</Sub> og K<Sub>b</Sub> for et konjugert
          par:
        </p>
        <FormulaBlock>
          K<Sub>a</Sub> · K<Sub>b</Sub> = K<Sub>w</Sub> = 10⁻¹⁴ (ved 25 °C)
          <br />
          pK<Sub>a</Sub> + pK<Sub>b</Sub> = 14
        </FormulaBlock>
        <p>
          <strong>pH-beregning for svak syre</strong> — bruk ICE-tabell
          (Initial, Change, Equilibrium):
        </p>
        <FormulaBlock>
          K<Sub>a</Sub> = x² / (c₀ − x), der x = [H⁺]
          <br />
          Løses med andregradsligning eller iterasjon
        </FormulaBlock>
      </Prose>

      <SectionTitle>📊 Visuell illustrasjon</SectionTitle>
      <Prose>
        <p style={{ color: TEXT2, fontSize: 13, marginBottom: 8 }}>
          Styrkeforholdet mellom syrer — pK<Sub>a</Sub>-skala:
        </p>
      </Prose>
      <svg viewBox="0 0 700 130" style={{ width: "100%", maxWidth: 700 }}>
        {/* axis */}
        <line x1="50" y1="70" x2="650" y2="70" stroke={BORDER} strokeWidth="2" />
        {[0, 2, 4, 6, 8, 10, 12, 14].map((v, i) => (
          <g key={v}>
            <line
              x1={50 + i * (600 / 7)}
              y1="65"
              x2={50 + i * (600 / 7)}
              y2="75"
              stroke={TEXT2}
              strokeWidth="1.5"
            />
            <text
              x={50 + i * (600 / 7)}
              y="92"
              fill={TEXT2}
              fontSize="12"
              fontFamily="JetBrains Mono"
              textAnchor="middle"
            >
              {v}
            </text>
          </g>
        ))}
        <text
          x="350"
          y="115"
          fill={TEXT2}
          fontSize="13"
          fontFamily="Source Sans 3"
          textAnchor="middle"
        >
          pK<tspan baselineShift="sub" fontSize="10">a</tspan>
        </text>
        {/* strong acids */}
        <rect
          x="50"
          y="30"
          width="130"
          height="28"
          rx="6"
          fill="rgba(239,68,68,0.15)"
          stroke="rgba(239,68,68,0.4)"
        />
        <text
          x="115"
          y="48"
          fill="#FCA5A5"
          fontSize="11"
          fontFamily="Plus Jakarta Sans"
          fontWeight="600"
          textAnchor="middle"
        >
          Sterke syrer (HCl, HNO₃)
        </text>
        {/* weak acids */}
        <circle cx={50 + (4.75 / 14) * 600} cy="50" r="6" fill={ACCENT} />
        <text
          x={50 + (4.75 / 14) * 600}
          y="38"
          fill={ACCENT}
          fontSize="10"
          fontFamily="JetBrains Mono"
          textAnchor="middle"
        >
          CH₃COOH (4.75)
        </text>

        <circle cx={50 + (9.24 / 14) * 600} cy="50" r="6" fill="#F59E0B" />
        <text
          x={50 + (9.24 / 14) * 600}
          y="38"
          fill="#F59E0B"
          fontSize="10"
          fontFamily="JetBrains Mono"
          textAnchor="middle"
        >
          NH₄⁺ (9.24)
        </text>

        <circle cx={50 + (6.35 / 14) * 600} cy="50" r="6" fill="#8B5CF6" />
        <text
          x={50 + (6.35 / 14) * 600}
          y="26"
          fill="#8B5CF6"
          fontSize="10"
          fontFamily="JetBrains Mono"
          textAnchor="middle"
        >
          H₂CO₃ (6.35)
        </text>

        {/* arrow */}
        <text
          x="50"
          y="18"
          fill="#EF4444"
          fontSize="11"
          fontFamily="Plus Jakarta Sans"
          fontWeight="600"
        >
          ← Sterkere syre
        </text>
        <text
          x="650"
          y="18"
          fill="#3B82F6"
          fontSize="11"
          fontFamily="Plus Jakarta Sans"
          fontWeight="600"
          textAnchor="end"
        >
          Svakere syre →
        </text>
      </svg>

      <SectionTitle>✏️ Eksempel</SectionTitle>
      <Prose>
        <p>
          Beregn pH i 0,0500 M NaCN (K<Sub>a</Sub> for HCN = 10
          <Sup>−9,21</Sup>).
        </p>
      </Prose>
      <CollapsibleStep n={1} title="Identifiser systemet">
        CN⁻ er konjugert base til HCN. Vi har en svak base i vann:
        <br />
        CN⁻ + H₂O ⇌ HCN + OH⁻
        <br />K<Sub>b</Sub> = K<Sub>w</Sub>/K<Sub>a</Sub> = 10⁻¹⁴ / 10⁻⁹·²¹ = 10⁻⁴·⁷⁹
      </CollapsibleStep>
      <CollapsibleStep n={2} title="Sett opp ICE-tabell">
        <FormulaBlock>
          K<Sub>b</Sub> = x² / (0,0500 − x) = 10⁻⁴·⁷⁹
        </FormulaBlock>
      </CollapsibleStep>
      <CollapsibleStep n={3} title="Løs ved iterasjon">
        Start: x = 0,001
        <br />
        x₁ = √((0,0500 − 0,001) · 10⁻⁴·⁷⁹) = 8,915 · 10⁻⁴
        <br />
        x₂ = 8,924 · 10⁻⁴
        <br />
        x₃ = 8,924 · 10⁻⁴ ✓ (konvergert)
      </CollapsibleStep>
      <CollapsibleStep n={4} title="Beregn pH">
        pOH = −log(8,924 · 10⁻⁴) = 3,05
        <br />
        <strong>pH = 14 − 3,05 = 10,95</strong>
      </CollapsibleStep>

      <Huskeregel>
        <strong>K<Sub>a</Sub> · K<Sub>b</Sub> = K<Sub>w</Sub></strong> — konjugert par
        deler alltid K<Sub>w</Sub>. Svak syre → sterk konjugert base og omvendt.
        Svak base i vann? Finn K<Sub>b</Sub> = K<Sub>w</Sub>/K<Sub>a</Sub> og bruk ICE med OH⁻.
      </Huskeregel>

      <ExamNote>
        pH-beregning for svake baser (f.eks. NaCN, NH₃) dukker opp nesten hvert år. V2024 oppgave 4a:
        beregn pH i ekvivalenspunktet for titrering av ammoniakk med HCl — krever nettopp denne typen beregning.
      </ExamNote>
    </div>
  );
}

// ─── TAB 2: Titrering grunnprinsipper ───

function Tab2() {
  return (
    <div>
      <SectionTitle>🔑 Nøkkelbegreper</SectionTitle>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        <Pill def="Standardløsning med kjent konsentrasjon som tilsettes">Titrant</Pill>
        <Pill def="Stoffet som analyseres — ukjent konsentrasjon">Analytt</Pill>
        <Pill def="Løsning med nøyaktig kjent konsentrasjon">Standardløsning</Pill>
        <Pill def="Rent fast stoff med kjent sammensetning, høy renhet, stabil">Primærstandard</Pill>
        <Pill def="Teoretisk punkt der analytt har reagert fullstendig med titrant">Ekvivalenspunkt</Pill>
        <Pill def="Praktisk observert punkt (varig fargeendring > 10 s). Alltid etter ekvivalenspunktet">Endepunkt</Pill>
        <Pill def="Et = V(endepunkt) − V(ekvivalenspunkt). Bør være liten og positiv">Titrerfeil</Pill>
      </div>

      <SectionTitle>📖 Forklaring</SectionTitle>
      <Prose>
        <p>
          En <strong>titrering</strong> er en kvantitativ analysemetode der man tilsetter en
          løsning med kjent konsentrasjon (<em>titrant</em>) til en prøve (<em>analytt</em>) til
          reaksjonen er fullført.
        </p>
        <p><strong>Krav til titrerreaksjon:</strong></p>
        <p>1. Reaksjonen må være rask og gå fullstendig.</p>
        <p>2. Kjent og entydig støkiometri.</p>
        <p>3. Endepunktet må være entydig.</p>
        <p>
          Ved <strong>ekvivalenspunktet</strong> har lik (ekvivalent) stoffmengde analytt og titrant
          reagert:
        </p>
        <FormulaBlock>
          n<Sub>A</Sub> = n<Sub>T</Sub> → c<Sub>A</Sub> · V<Sub>A</Sub> = c<Sub>T</Sub> · V<Sub>T</Sub>
          <br />
          c<Sub>A</Sub> = c<Sub>T</Sub> · V<Sub>T</Sub> / V<Sub>A</Sub>
        </FormulaBlock>
        <p>
          <strong>Titrerfeil</strong> er differansen mellom endepunkt og ekvivalenspunkt i volum:
        </p>
        <FormulaBlock>
          E<Sub>t</Sub> = V<Sub>endepunkt</Sub> − V<Sub>ekvivalenspunkt</Sub>
        </FormulaBlock>
        <p>
          Positiv titrerfeil = overtitrert (vanligst). Negativ titrerfeil = undertitrert. Man
          ønsker at titrerkurven er bratt rundt ekvivalenspunktet for å minimere titrerfeil.
        </p>
      </Prose>

      <SectionTitle>📊 Visuell illustrasjon</SectionTitle>
      <Prose>
        <p style={{ color: TEXT2, fontSize: 13, marginBottom: 8 }}>
          Titreringsoppsett — flyt fra start til beregning:
        </p>
      </Prose>
      <svg viewBox="0 0 700 160" style={{ width: "100%", maxWidth: 700 }}>
        {/* boxes */}
        {[
          { x: 20, label: "Analytt\n(ukjent c)", sub: "V_A kjent" },
          { x: 170, label: "Tilsett\ntitrant", sub: "c_T kjent" },
          { x: 320, label: "Endepunkt\n(fargeomslag)", sub: "V_T avlest" },
          { x: 490, label: "Beregn", sub: "c_A = c_T·V_T/V_A" },
        ].map((b, i) => (
          <g key={i}>
            <rect
              x={b.x}
              y="30"
              width={130}
              height={70}
              rx="10"
              fill={i === 3 ? `${ACCENT}22` : CARD}
              stroke={i === 3 ? ACCENT : BORDER}
              strokeWidth="1.5"
            />
            {b.label.split("\n").map((line, j) => (
              <text
                key={j}
                x={b.x + 65}
                y={55 + j * 18}
                fill={TEXT}
                fontSize="12"
                fontFamily="Plus Jakarta Sans"
                fontWeight="600"
                textAnchor="middle"
              >
                {line}
              </text>
            ))}
            <text
              x={b.x + 65}
              y={115}
              fill={TEXT2}
              fontSize="10"
              fontFamily="JetBrains Mono"
              textAnchor="middle"
            >
              {b.sub}
            </text>
          </g>
        ))}
        {/* arrows */}
        {[150, 300, 470].map((x) => (
          <polygon
            key={x}
            points={`${x},62 ${x + 18},65 ${x},68`}
            fill={ACCENT}
          />
        ))}
      </svg>

      <SectionTitle>✏️ Eksempel</SectionTitle>
      <Prose>
        <p>
          25,00 mL natriumformat (HCOONa) titreres med 0,104 M HCl. Fargeomslag ved
          V(HCl) = 23,84 mL. Finn konsentrasjonen.
        </p>
      </Prose>
      <CollapsibleStep n={1} title="Identifiser reaksjon">
        HCOO⁻ + H⁺ → HCOOH (1:1 støkiometri)
      </CollapsibleStep>
      <CollapsibleStep n={2} title="Beregn stoffmengde titrant">
        n(HCl) = 0,104 M × 0,02384 L = 2,479 × 10⁻³ mol
      </CollapsibleStep>
      <CollapsibleStep n={3} title="Beregn konsentrasjon analytt">
        c(HCOONa) = n / V = 2,479 × 10⁻³ / 0,02500 = <strong>0,0992 M</strong>
      </CollapsibleStep>

      <Huskeregel>
        <strong>n<Sub>A</Sub> = n<Sub>T</Sub></strong> ved ekvivalenspunktet. Alt du trenger er å lese
        av V<Sub>T</Sub> fra byretten og vite c<Sub>T</Sub>, V<Sub>A</Sub>. Husk å
        multiplisere med støkiometrisk faktor hvis reaksjonen ikke er 1:1.
      </Huskeregel>

      <ExamNote>
        V2023 oppgave 4: Titrering av natriumformat med HCl — beregn konsentrasjon, pH i
        halvtitrerpunkt, og volum. Helt standard oppgave som krever denne formelen.
      </ExamNote>
    </div>
  );
}

// ─── TAB 3: Titrerkurver ───

function Tab3() {
  const [curveType, setCurveType] = useState("strong");

  const generateCurve = useCallback((type) => {
    const points = [];
    for (let v = 0; v <= 50; v += 0.5) {
      let pH;
      const veq = 25;
      const f = v / veq;
      if (type === "strong") {
        if (v < veq) {
          const cH = (0.1 * (veq - v)) / (25 + v);
          pH = -Math.log10(Math.max(cH, 1e-14));
        } else if (Math.abs(v - veq) < 0.3) {
          pH = 7;
        } else {
          const cOH = (0.1 * (v - veq)) / (25 + v);
          pH = 14 + Math.log10(Math.max(cOH, 1e-14));
        }
      } else if (type === "weakacid") {
        const pKa = 4.75;
        const Ka = Math.pow(10, -pKa);
        if (v === 0) {
          const x = Math.sqrt(Ka * 0.1);
          pH = -Math.log10(x);
        } else if (v < veq) {
          const ratio = (veq - v) / v;
          pH = pKa + Math.log10(1 / ratio);
        } else if (Math.abs(v - veq) < 0.3) {
          const cT = 0.1 * 25 / (25 + veq);
          const Kb = 1e-14 / Ka;
          const x = Math.sqrt(Kb * cT);
          pH = 14 + Math.log10(x);
        } else {
          const cOH = (0.1 * (v - veq)) / (25 + v);
          pH = 14 + Math.log10(Math.max(cOH, 1e-14));
        }
      } else {
        // weak base titrated with strong acid
        const pKb = 4.75;
        const Kb = Math.pow(10, -pKb);
        const pKa = 14 - pKb;
        if (v === 0) {
          const x = Math.sqrt(Kb * 0.1);
          pH = 14 + Math.log10(x);
        } else if (v < veq) {
          const ratio = v / (veq - v);
          pH = pKa - Math.log10(ratio);
        } else if (Math.abs(v - veq) < 0.3) {
          const cT = 0.1 * 25 / (25 + veq);
          const Ka = Math.pow(10, -pKa);
          const x = Math.sqrt(Ka * cT);
          pH = -Math.log10(x);
        } else {
          const cH = (0.1 * (v - veq)) / (25 + v);
          pH = -Math.log10(Math.max(cH, 1e-14));
        }
      }
      pH = Math.max(0, Math.min(14, pH));
      points.push({ v, pH });
    }
    return points;
  }, []);

  const curve = useMemo(() => generateCurve(curveType), [curveType, generateCurve]);

  const xScale = (v) => 60 + (v / 50) * 580;
  const yScale = (pH) => 20 + ((14 - pH) / 14) * 220;

  const pathD = curve
    .map((p, i) => `${i === 0 ? "M" : "L"}${xScale(p.v)},${yScale(p.pH)}`)
    .join(" ");

  const labels = {
    strong: {
      title: "Sterk syre + sterk base",
      eqpH: 7,
      desc: "Ekvivalenspunkt: pH = 7",
    },
    weakacid: {
      title: "Svak syre + sterk base",
      eqpH: 8.7,
      desc: "Ekvivalenspunkt: pH > 7",
    },
    weakbase: {
      title: "Svak base + sterk syre",
      eqpH: 5.3,
      desc: "Ekvivalenspunkt: pH < 7",
    },
  };

  return (
    <div>
      <SectionTitle>🔑 Nøkkelbegreper</SectionTitle>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        <Pill def="Graf av pH vs volum titrant tilsatt">Titrerkurve</Pill>
        <Pill def="Der all analytt har reagert med titrant">Ekvivalenspunkt</Pill>
        <Pill def="Der halvparten av analytt er titrert. pH = pKa">Halvtitrerpunkt</Pill>
        <Pill def="Brattere kurve rundt ekvivalenspunkt → mindre titrerfeil">Bratthet</Pill>
      </div>

      <SectionTitle>📖 Forklaring</SectionTitle>
      <Prose>
        <p>
          En <strong>titrerkurve</strong> viser pH som funksjon av tilsatt volum titrant.
          Formen avhenger av hva som titreres:
        </p>
        <p>
          <strong>Sterk syre + sterk base:</strong> Ekvivalenspunkt ved pH = 7. Bratt kurve — lite
          titrerfeil.
        </p>
        <p>
          <strong>Svak syre + sterk base:</strong> Ekvivalenspunkt ved pH {"> "}7 (konjugert base i
          løsning). Bufferregion før ekvivalenspunktet der pH ≈ pK<Sub>a</Sub>.
        </p>
        <p>
          <strong>Svak base + sterk syre:</strong> Ekvivalenspunkt ved pH {"< "}7 (konjugert syre i
          løsning).
        </p>
        <p>
          <strong>Flerverdig syre:</strong> Gir flere ekvivalenspunkt. F.eks. H₂A gir to
          ekvivalenspunkt med to bufferregioner.
        </p>
      </Prose>

      <SectionTitle>📊 Interaktiv titrerkurve</SectionTitle>
      <div style={{ display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap" }}>
        {[
          ["strong", "Sterk/sterk"],
          ["weakacid", "Svak syre/sterk base"],
          ["weakbase", "Svak base/sterk syre"],
        ].map(([key, label]) => (
          <button
            key={key}
            onClick={() => setCurveType(key)}
            style={{
              padding: "6px 14px",
              borderRadius: 999,
              border: `1px solid ${curveType === key ? ACCENT : BORDER}`,
              background: curveType === key ? ACCENT_DIM : "transparent",
              color: curveType === key ? ACCENT : TEXT2,
              fontFamily: "'Source Sans 3', sans-serif",
              fontSize: 12,
              fontWeight: 500,
              cursor: "pointer",
              transition: "all 0.2s",
            }}
          >
            {label}
          </button>
        ))}
      </div>
      <div
        style={{
          background: CARD,
          borderRadius: 10,
          border: `1px solid ${BORDER}`,
          padding: 12,
          marginBottom: 8,
        }}
      >
        <div
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: 13,
            fontWeight: 600,
            color: ACCENT,
            marginBottom: 6,
          }}
        >
          {labels[curveType].title} — {labels[curveType].desc}
        </div>
        <svg viewBox="0 0 660 270" style={{ width: "100%" }}>
          {/* grid */}
          {[0, 2, 4, 6, 8, 10, 12, 14].map((pH) => (
            <g key={pH}>
              <line
                x1="60"
                y1={yScale(pH)}
                x2="640"
                y2={yScale(pH)}
                stroke={BORDER}
                strokeWidth="0.5"
                strokeDasharray="4,4"
              />
              <text
                x="52"
                y={yScale(pH) + 4}
                fill={TEXT2}
                fontSize="10"
                fontFamily="JetBrains Mono"
                textAnchor="end"
              >
                {pH}
              </text>
            </g>
          ))}
          {[0, 10, 20, 25, 30, 40, 50].map((v) => (
            <text
              key={v}
              x={xScale(v)}
              y="260"
              fill={TEXT2}
              fontSize="10"
              fontFamily="JetBrains Mono"
              textAnchor="middle"
            >
              {v}
            </text>
          ))}
          <text
            x="350"
            y="255"
            fill={TEXT2}
            fontSize="11"
            fontFamily="Source Sans 3"
            textAnchor="middle"
          />
          <text
            x="22"
            y="130"
            fill={TEXT2}
            fontSize="11"
            fontFamily="Source Sans 3"
            textAnchor="middle"
            transform="rotate(-90, 22, 130)"
          >
            pH
          </text>

          {/* eq point marker */}
          <line
            x1={xScale(25)}
            y1="20"
            x2={xScale(25)}
            y2="240"
            stroke={ACCENT}
            strokeWidth="1"
            strokeDasharray="6,4"
            opacity="0.4"
          />
          <text
            x={xScale(25)}
            y="16"
            fill={ACCENT}
            fontSize="9"
            fontFamily="JetBrains Mono"
            textAnchor="middle"
          >
            V<tspan baselineShift="sub" fontSize="7">eq</tspan>
          </text>

          {/* half eq point for weak */}
          {curveType !== "strong" && (
            <>
              <line
                x1={xScale(12.5)}
                y1="20"
                x2={xScale(12.5)}
                y2="240"
                stroke="#F59E0B"
                strokeWidth="1"
                strokeDasharray="4,4"
                opacity="0.3"
              />
              <text
                x={xScale(12.5)}
                y="16"
                fill="#F59E0B"
                fontSize="9"
                fontFamily="JetBrains Mono"
                textAnchor="middle"
              >
                ½V<tspan baselineShift="sub" fontSize="7">eq</tspan>
              </text>
            </>
          )}

          {/* curve */}
          <path d={pathD} fill="none" stroke={ACCENT} strokeWidth="2.5" />
        </svg>
      </div>

      <SectionTitle>✏️ Eksempel</SectionTitle>
      <Prose>
        <p>
          25,00 mL 0,1000 M eddiksyre (pK<Sub>a</Sub> = 4,75) titreres med 0,1000 M NaOH.
          Hva er pH ved halvtitrerpunktet og ekvivalenspunktet?
        </p>
      </Prose>
      <CollapsibleStep n={1} title="Halvtitrerpunktet (V = 12,50 mL NaOH)">
        Ved halvtitrerpunktet er [CH₃COOH] = [CH₃COO⁻]
        <br />
        Henderson-Hasselbalch: pH = pK<Sub>a</Sub> + log(1) = <strong>4,75</strong>
      </CollapsibleStep>
      <CollapsibleStep n={2} title="Ekvivalenspunktet (V = 25,00 mL NaOH)">
        All eddiksyre er omdannet til CH₃COO⁻ (svak base).
        <br />
        c<Sub>T</Sub> = 0,1 × 25 / 50 = 0,050 M
        <br />
        K<Sub>b</Sub> = 10⁻¹⁴/10⁻⁴·⁷⁵ = 10⁻⁹·²⁵
        <br />
        [OH⁻] = √(K<Sub>b</Sub> · c<Sub>T</Sub>) = √(10⁻⁹·²⁵ × 0,050) = 5,30 × 10⁻⁶
        <br />
        pOH = 5,28 → <strong>pH = 8,72</strong>
      </CollapsibleStep>

      <Huskeregel>
        Ved halvtitrerpunktet: <strong>pH = pK<Sub>a</Sub></strong> (alltid!).
        Ved ekvivalenspunktet for svak syre + sterk base: svak base i løsning → pH {">"} 7.
        Sterk/sterk: pH = 7.
      </Huskeregel>

      <ExamNote>
        V2021 oppgave 5: Identifiser analytt og titrant fra titrerkurveform + velg passende indikator.
        V2022 oppgave 6: α-pH-plott for toverdig syre — identifiser halvtitrerpunkt og ekvivalenspunkt.
      </ExamNote>
    </div>
  );
}

// ─── TAB 4: Buffer og Henderson-Hasselbalch ───

function Tab4() {
  const [sliderRatio, setSliderRatio] = useState(1);

  const pH_hh = 4.75 + Math.log10(sliderRatio);

  return (
    <div>
      <SectionTitle>🔑 Nøkkelbegreper</SectionTitle>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        <Pill def="Løsning som motstår pH-endringer ved tilsats av syre/base">Bufferløsning</Pill>
        <Pill def="pH = pKa + log([base]/[syre])">Henderson-Hasselbalch</Pill>
        <Pill def="β = dc_b/dpH — mol sterk base/syre per L per pH-enhet">Bufferkapasitet (β)</Pill>
        <Pill def="pH = pKa, der [HA] = [A⁻]. Maks bufferkapasitet">Halvtitrerpunkt</Pill>
      </div>

      <SectionTitle>📖 Forklaring</SectionTitle>
      <Prose>
        <p>
          En <strong>bufferløsning</strong> inneholder en svak syre og dens konjugerte base
          (eller omvendt) i sammenlignbare konsentrasjoner. Den motstår pH-endringer fordi
          tilsatt H⁺ reagerer med basen (A⁻), og tilsatt OH⁻ reagerer med syren (HA).
        </p>
        <p>
          <strong>Henderson-Hasselbalch-ligningen:</strong>
        </p>
        <FormulaBlock>
          pH = pK<Sub>a</Sub> + log([A⁻] / [HA])
        </FormulaBlock>
        <p>
          Ved <strong>halvtitrerpunktet</strong> er [HA] = [A⁻], så log(1) = 0 og pH = pK<Sub>a</Sub>. Her er bufferkapasiteten maksimal.
        </p>
        <p>
          <strong>Bufferkapasitet (β)</strong> angir hvor mange mol sterk syre/base som kreves
          for å endre pH med 1 enhet per liter løsning:
        </p>
        <FormulaBlock>
          β = dc<Sub>b</Sub>/dpH = −dc<Sub>a</Sub>/dpH
        </FormulaBlock>
        <p>
          Bufferen er mest effektiv i området pH = pK<Sub>a</Sub> ± 1.
        </p>
      </Prose>

      <SectionTitle>📊 Interaktiv Henderson-Hasselbalch</SectionTitle>
      <Prose>
        <p style={{ color: TEXT2, fontSize: 13, marginBottom: 8 }}>
          Juster forholdet [A⁻]/[HA] for eddiksyre (pK<Sub>a</Sub> = 4,75):
        </p>
      </Prose>
      <div
        style={{
          background: CARD,
          borderRadius: 10,
          border: `1px solid ${BORDER}`,
          padding: "16px 20px",
          marginBottom: 12,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 12,
              color: TEXT2,
              minWidth: 100,
            }}
          >
            [A⁻]/[HA] = {sliderRatio.toFixed(2)}
          </span>
          <input
            type="range"
            min="0.1"
            max="10"
            step="0.1"
            value={sliderRatio}
            onChange={(e) => setSliderRatio(parseFloat(e.target.value))}
            style={{ flex: 1, accentColor: ACCENT }}
          />
        </div>
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 18,
            fontWeight: 600,
            color: ACCENT,
            textAlign: "center",
          }}
        >
          pH = 4.75 + log({sliderRatio.toFixed(2)}) ={" "}
          <span style={{ color: TEXT, fontSize: 24 }}>{pH_hh.toFixed(2)}</span>
        </div>
        <div style={{ textAlign: "center", marginTop: 8 }}>
          <span
            style={{
              fontFamily: "'Source Sans 3', sans-serif",
              fontSize: 12,
              color:
                Math.abs(pH_hh - 4.75) <= 1
                  ? ACCENT
                  : "#EF4444",
              fontWeight: 600,
            }}
          >
            {Math.abs(pH_hh - 4.75) <= 1
              ? "✓ Innenfor effektivt bufferområde (pKa ± 1)"
              : "⚠ Utenfor effektivt bufferområde"}
          </span>
        </div>
      </div>

      <SectionTitle>✏️ Eksempel</SectionTitle>
      <Prose>
        <p>
          En bufferløsning inneholder 0,10 M CH₃COOH og 0,15 M CH₃COONa. Hva er pH?
          (pK<Sub>a</Sub> = 4,75)
        </p>
      </Prose>
      <CollapsibleStep n={1} title="Sett inn i Henderson-Hasselbalch">
        pH = 4,75 + log(0,15 / 0,10) = 4,75 + log(1,5)
      </CollapsibleStep>
      <CollapsibleStep n={2} title="Beregn">
        pH = 4,75 + 0,176 = <strong>4,93</strong>
      </CollapsibleStep>

      <Huskeregel>
        pH = pK<Sub>a</Sub> + log([base]/[syre]). Ved halvtitrerpunktet: [base] = [syre],
        log(1) = 0, pH = pK<Sub>a</Sub>. Bufferen virker best i pH = pK<Sub>a</Sub> ± 1.
      </Huskeregel>

      <ExamNote>
        V2021 oppgave 8: Identifiser halvtitrerpunkt og ekvivalenspunkt i log-log-diagram der bufferkapasiteten er tegnet inn.
        V2024 oppgave 5d: Forklar forskjell i bufferkapasitet ved ulike pH ut fra α-verdier.
      </ExamNote>
    </div>
  );
}

// ─── TAB 5: Indikatorer ───

function Tab5() {
  return (
    <div>
      <SectionTitle>🔑 Nøkkelbegreper</SectionTitle>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        <Pill def="Svak organisk syre/base der syre- og baseformen har ulik farge">Syre-base-indikator</Pill>
        <Pill def="pH-området der farge endres: pKa(In) ± 1">Omslagsområde</Pill>
        <Pill def="Fargeløs i sur løsning, rød/rosa i basisk. Omslag pH 8–10">Fenolftalein</Pill>
        <Pill def="Bromtymolblått. Gul → grønn → blå. Omslag pH 6,0–7,6">BTB</Pill>
        <Pill def="Feil som oppstår fordi endepunktet ≠ ekvivalenspunktet">Indikatorfeil</Pill>
      </div>

      <SectionTitle>📖 Forklaring</SectionTitle>
      <Prose>
        <p>
          En <strong>syre-base-indikator</strong> er en svak organisk syre (HIn) der syreformen
          og baseformen har ulik farge:
        </p>
        <FormulaBlock>
          HIn ⇌ H⁺ + In⁻
          <br />
          Syrefarge ← → Basefarge
        </FormulaBlock>
        <p>Fargen vi ser avhenger av forholdet [HIn]/[In⁻]:</p>
        <FormulaBlock>
          [HIn]/[In⁻] {">"} 10 → ren syrefarge
          <br />
          [HIn]/[In⁻] {"<"} 0,1 → ren basefarge
          <br />
          0,1 ≤ [HIn]/[In⁻] ≤ 10 → fargeomslag
        </FormulaBlock>
        <p>
          Omslagsområdet tilsvarer <strong>pH = pK<Sub>a</Sub>(In) ± 1</strong>.
        </p>
        <p>
          <strong>Valg av indikator:</strong> Velg en indikator der pK<Sub>a</Sub>(In) er nær
          pH i ekvivalenspunktet. F.eks.: sterk syre/sterk base (eq pH = 7) → BTB;
          svak syre/sterk base (eq pH {">"} 7) → fenolftalein.
        </p>
      </Prose>

      <SectionTitle>📊 Visuell illustrasjon</SectionTitle>
      <Prose>
        <p style={{ color: TEXT2, fontSize: 13, marginBottom: 8 }}>
          Omslagsområder for vanlige indikatorer:
        </p>
      </Prose>
      <svg viewBox="0 0 700 180" style={{ width: "100%", maxWidth: 700 }}>
        {/* pH axis */}
        <line x1="80" y1="150" x2="660" y2="150" stroke={TEXT2} strokeWidth="1.5" />
        {Array.from({ length: 15 }, (_, i) => (
          <g key={i}>
            <line
              x1={80 + (i / 14) * 580}
              y1="146"
              x2={80 + (i / 14) * 580}
              y2="154"
              stroke={TEXT2}
              strokeWidth="1"
            />
            <text
              x={80 + (i / 14) * 580}
              y="168"
              fill={TEXT2}
              fontSize="10"
              fontFamily="JetBrains Mono"
              textAnchor="middle"
            >
              {i}
            </text>
          </g>
        ))}
        {/* indicators */}
        {[
          { name: "Metylrødt", low: 4.2, high: 6.3, y: 25, colorL: "#EF4444", colorR: "#FBBF24" },
          { name: "BTB", low: 6.0, high: 7.6, y: 60, colorL: "#FBBF24", colorR: "#3B82F6" },
          { name: "Fenolftalein", low: 8.0, high: 10.0, y: 95, colorL: "#64748B", colorR: "#EC4899" },
          { name: "Tymolblått", low: 1.2, high: 2.8, y: 130, colorL: "#EF4444", colorR: "#FBBF24" },
        ].map((ind) => {
          const x1 = 80 + (ind.low / 14) * 580;
          const x2 = 80 + (ind.high / 14) * 580;
          return (
            <g key={ind.name}>
              <defs>
                <linearGradient id={`grad-${ind.name}`} x1="0" x2="1" y1="0" y2="0">
                  <stop offset="0%" stopColor={ind.colorL} />
                  <stop offset="100%" stopColor={ind.colorR} />
                </linearGradient>
              </defs>
              <rect
                x={x1}
                y={ind.y - 8}
                width={x2 - x1}
                height={20}
                rx="10"
                fill={`url(#grad-${ind.name})`}
                opacity="0.7"
              />
              <text
                x={x1 - 6}
                y={ind.y + 6}
                fill={TEXT}
                fontSize="11"
                fontFamily="Source Sans 3"
                fontWeight="500"
                textAnchor="end"
              >
                {ind.name}
              </text>
              <text
                x={(x1 + x2) / 2}
                y={ind.y + 5}
                fill={BG}
                fontSize="10"
                fontFamily="JetBrains Mono"
                fontWeight="600"
                textAnchor="middle"
              >
                {ind.low}–{ind.high}
              </text>
            </g>
          );
        })}
      </svg>

      <SectionTitle>✏️ Eksempel</SectionTitle>
      <Prose>
        <p>
          Velg passende indikator for titrering av 0,1 M NH₃ med 0,1 M HCl.
        </p>
      </Prose>
      <CollapsibleStep n={1} title="Finn pH i ekvivalenspunktet">
        I ekvivalenspunktet har vi NH₄⁺ (svak syre, pK<Sub>a</Sub> = 9,24) i løsning.
        <br />
        c<Sub>T</Sub> ≈ 0,05 M, K<Sub>a</Sub> = 10⁻⁹·²⁴
        <br />
        [H⁺] = √(K<Sub>a</Sub> · c) = √(10⁻⁹·²⁴ × 0,05) ≈ 1,7 × 10⁻⁶
        <br />
        pH ≈ 5,1
      </CollapsibleStep>
      <CollapsibleStep n={2} title="Velg indikator">
        pH ≈ 5,1 → metylrødt (omslagsområde 4,2–6,3) passer godt!
        <br />
        Fenolftalein (8–10) passer IKKE — for langt unna ekvivalenspunktet.
      </CollapsibleStep>

      <Huskeregel>
        Omslagsområde = pK<Sub>a</Sub>(In) ± 1. Velg indikator der omslagsområdet
        overlapper med den bratte delen av titrerkurven rundt ekvivalenspunktet.
      </Huskeregel>

      <ExamNote>
        V2021 oppgave 5: Velg riktig indikator (metylrødt vs fenolftalein) basert på titrerkurve.
        V2024 oppgave 4: Bestem pH i ekvivalenspunkt for å begrunne indikatorvalg.
      </ExamNote>
    </div>
  );
}

// ─── TAB 6: MLP-balanser ───

function Tab6() {
  const [example, setExample] = useState("format");
  return (
    <div>
      <SectionTitle>🔑 Nøkkelbegreper</SectionTitle>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        <Pill def="Analytisk konsentrasjon = Σ likevektskonsentrasjoner av alle specier">Massebalanse</Pill>
        <Pill def="Σ positiv ladning = Σ negativ ladning. Elektrisk nøytralitet">Ladningsbalanse</Pill>
        <Pill def="Σ [syre dannet] = Σ [base dannet] fra et referansepunkt">Protonbalanse</Pill>
        <Pill def="Stoff som kan virke som både syre og base (f.eks. HCO₃⁻)">Amfolytt</Pill>
      </div>

      <SectionTitle>📖 Forklaring</SectionTitle>
      <Prose>
        <p>
          De tre balansene er verktøy for å beskrive kjemisk likevekt i løsning. Sammen
          med likevektsuttrykkene gir de nok ligninger til å løse for ukjente konsentrasjoner.
        </p>
        <p>
          <strong>Massebalanse:</strong> Summen av konsentrasjonene til alle former av et stoff
          er lik den analytiske konsentrasjonen:
        </p>
        <FormulaBlock>
          c<Sub>T</Sub> = [H₂A] + [HA⁻] + [A²⁻]
        </FormulaBlock>
        <p>
          <strong>Ladningsbalanse:</strong> Løsningen er elektrisk nøytral:
        </p>
        <FormulaBlock>
          Σ z·[kationer] = Σ z·[anioner]
        </FormulaBlock>
        <p>
          <strong>Protonbalanse:</strong> Fra et referansepunkt (dominerende specie) — summen
          av syrer dannet = summen av baser dannet:
        </p>
        <FormulaBlock>
          Σ [syre dannet] = Σ [base dannet]
        </FormulaBlock>
        <p>
          Protonbalansen er spesielt nyttig fordi den ikke inneholder Na⁺ eller andre
          «tilskuere» som ikke deltar i syre-base-likevekten.
        </p>
      </Prose>

      <SectionTitle>📊 Eksempler — velg system</SectionTitle>
      <div style={{ display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap" }}>
        {[
          ["format", "0,20 M NaHCOO"],
          ["karbon", "0,10 M H₂CO₃"],
          ["karbon_eq", "H₂CO₃ + NaOH (1. ekv.pkt)"],
        ].map(([key, label]) => (
          <button
            key={key}
            onClick={() => setExample(key)}
            style={{
              padding: "6px 12px",
              borderRadius: 999,
              border: `1px solid ${example === key ? ACCENT : BORDER}`,
              background: example === key ? ACCENT_DIM : "transparent",
              color: example === key ? ACCENT : TEXT2,
              fontFamily: "'Source Sans 3', sans-serif",
              fontSize: 12,
              cursor: "pointer",
            }}
          >
            {label}
          </button>
        ))}
      </div>
      <div
        style={{
          background: CARD,
          borderRadius: 10,
          border: `1px solid ${BORDER}`,
          padding: "16px 20px",
        }}
      >
        {example === "format" && (
          <Prose>
            <p style={{ fontWeight: 600 }}>0,20 M natriumformat (NaHCOO) i vann:</p>
            <p>Likevekter: HCOO⁻ + H₂O ⇌ HCOOH + OH⁻ og H₂O ⇌ H⁺ + OH⁻</p>
            <FormulaBlock>
              <strong>Massebalanse:</strong>
              <br />
              c<Sub>T</Sub> = 0,20 = [Na⁺] = [HCOO⁻] + [HCOOH]
            </FormulaBlock>
            <FormulaBlock>
              <strong>Ladningsbalanse:</strong>
              <br />
              [Na⁺] + [H⁺] = [HCOO⁻] + [OH⁻]
            </FormulaBlock>
            <FormulaBlock>
              <strong>Protonbalanse:</strong> (ref: HCOO⁻, H₂O)
              <br />
              [HCOOH] + [H⁺] = [OH⁻]
            </FormulaBlock>
          </Prose>
        )}
        {example === "karbon" && (
          <Prose>
            <p style={{ fontWeight: 600 }}>0,10 M karbonsyre (H₂CO₃) i vann:</p>
            <FormulaBlock>
              <strong>Massebalanse:</strong>
              <br />
              c<Sub>T</Sub> = 0,10 = [H₂CO₃] + [HCO₃⁻] + [CO₃²⁻]
            </FormulaBlock>
            <FormulaBlock>
              <strong>Ladningsbalanse:</strong>
              <br />
              [H⁺] = [OH⁻] + [HCO₃⁻] + 2·[CO₃²⁻]
            </FormulaBlock>
            <FormulaBlock>
              <strong>Protonbalanse:</strong> (ref: H₂CO₃, H₂O)
              <br />
              [H⁺] = [OH⁻] + [HCO₃⁻] + 2·[CO₃²⁻]
            </FormulaBlock>
          </Prose>
        )}
        {example === "karbon_eq" && (
          <Prose>
            <p style={{ fontWeight: 600 }}>
              H₂CO₃ titrert med NaOH til 1. ekvivalenspunkt → HCO₃⁻ dominerer:
            </p>
            <p>Likevekter: HCO₃⁻ ⇌ H⁺ + CO₃²⁻ og HCO₃⁻ + H₂O ⇌ H₂CO₃ + OH⁻</p>
            <FormulaBlock>
              <strong>Massebalanse:</strong>
              <br />
              c<Sub>T</Sub> = [H₂CO₃] + [HCO₃⁻] + [CO₃²⁻] ≈ [HCO₃⁻]
            </FormulaBlock>
            <FormulaBlock>
              <strong>Ladningsbalanse:</strong>
              <br />
              [H⁺] + [Na⁺] = [HCO₃⁻] + [OH⁻] + 2·[CO₃²⁻]
            </FormulaBlock>
            <FormulaBlock>
              <strong>Protonbalanse:</strong> (ref: HCO₃⁻, H₂O)
              <br />
              [H⁺] + [H₂CO₃] = [OH⁻] + [CO₃²⁻]
            </FormulaBlock>
            <p style={{ color: ACCENT, fontWeight: 600, fontSize: 13 }}>
              → Ved 1. ekv.pkt: [H₂CO₃] = [CO₃²⁻] gir pH fra skjæringspunktet i log-log-diagram
            </p>
          </Prose>
        )}
      </div>

      <Huskeregel>
        <strong>Protonbalansen</strong> er den du bruker mest — den inneholder ikke tilskuerioner som Na⁺.
        Referansepunkt = dominerende specie. Alt som har mistet proton(er) ift. referansen
        står på «base»-siden, alt som har fått proton(er) står på «syre»-siden. Koeffisient = antall protoner forskjell.
      </Huskeregel>

      <ExamNote>
        Kommer HVERT ÅR. V2021 oppg 6: MLP ved 1. ekv.pkt arsensyre. V2022 oppg 7: MLP i 2. ekv.pkt
        fosforsyre. V2023 oppg 5c: MLP ved 1. endepunkt toverdig syre. V2025 oppg 3d: MLP for løsning.
      </ExamNote>
    </div>
  );
}

// ─── TAB 7: α-verdier ───

function Tab7() {
  const pKa1 = 4.75;
  const Ka1 = Math.pow(10, -pKa1);

  const pKa1di = 6.35;
  const pKa2di = 10.33;
  const Ka1di = Math.pow(10, -pKa1di);
  const Ka2di = Math.pow(10, -pKa2di);

  const [mode, setMode] = useState("mono");

  const monoPoints = useMemo(() => {
    const pts = [];
    for (let pH = 0; pH <= 14; pH += 0.2) {
      const H = Math.pow(10, -pH);
      const a0 = H / (H + Ka1);
      const a1 = Ka1 / (H + Ka1);
      pts.push({ pH, a0, a1 });
    }
    return pts;
  }, []);

  const diPoints = useMemo(() => {
    const pts = [];
    for (let pH = 0; pH <= 14; pH += 0.2) {
      const H = Math.pow(10, -pH);
      const denom = H * H + H * Ka1di + Ka1di * Ka2di;
      const a0 = (H * H) / denom;
      const a1 = (H * Ka1di) / denom;
      const a2 = (Ka1di * Ka2di) / denom;
      pts.push({ pH, a0, a1, a2 });
    }
    return pts;
  }, []);

  const xS = (pH) => 60 + (pH / 14) * 580;
  const yS = (a) => 20 + (1 - a) * 200;

  const makePath = (pts, key) =>
    pts
      .map((p, i) => `${i === 0 ? "M" : "L"}${xS(p.pH)},${yS(p[key])}`)
      .join(" ");

  return (
    <div>
      <SectionTitle>🔑 Nøkkelbegreper</SectionTitle>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        <Pill def="Fraksjon av totalen i en bestemt form: αᵢ = cᵢ / cT">α-verdi</Pill>
        <Pill def="α₀ = [HA]/cT for enverdig, [H₂A]/cT for toverdig">α₀ (syreform)</Pill>
        <Pill def="α₁ = [A⁻]/cT for enverdig, [HA⁻]/cT for toverdig">α₁ (baseform / amfolytt)</Pill>
        <Pill def="Σαᵢ = 1 alltid">Sum = 1</Pill>
      </div>

      <SectionTitle>📖 Forklaring</SectionTitle>
      <Prose>
        <p>
          <strong>α-verdier</strong> viser fraksjonen av total analytisk konsentrasjon som
          befinner seg i en bestemt protonert form ved en gitt pH:
        </p>
        <FormulaBlock>
          α<Sub>i</Sub> = c<Sub>i</Sub> / c<Sub>T</Sub>, der Σα<Sub>i</Sub> = 1
        </FormulaBlock>
        <p><strong>Enverdig syre HA:</strong></p>
        <FormulaBlock>
          α₀ = [H⁺] / ([H⁺] + K<Sub>a</Sub>)
          <br />
          α₁ = K<Sub>a</Sub> / ([H⁺] + K<Sub>a</Sub>)
        </FormulaBlock>
        <p><strong>Diprotisk syre H₂A:</strong></p>
        <FormulaBlock>
          Nevner = [H⁺]² + [H⁺]·K<Sub>a,1</Sub> + K<Sub>a,1</Sub>·K<Sub>a,2</Sub>
          <br />
          α₀ = [H⁺]² / Nevner
          <br />
          α₁ = [H⁺]·K<Sub>a,1</Sub> / Nevner
          <br />
          α₂ = K<Sub>a,1</Sub>·K<Sub>a,2</Sub> / Nevner
        </FormulaBlock>
        <p>
          Skjæringspunktet mellom α₀ og α₁ gir halvtitrerpunktet (pH = pK<Sub>a</Sub>), der
          begge former er til stede i lik mengde.
        </p>
      </Prose>

      <SectionTitle>📊 α-pH-diagram</SectionTitle>
      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        {[
          ["mono", "Enverdig (pKa=4,75)"],
          ["di", "Diprotisk (pKa₁=6,35, pKa₂=10,33)"],
        ].map(([k, l]) => (
          <button
            key={k}
            onClick={() => setMode(k)}
            style={{
              padding: "6px 12px",
              borderRadius: 999,
              border: `1px solid ${mode === k ? ACCENT : BORDER}`,
              background: mode === k ? ACCENT_DIM : "transparent",
              color: mode === k ? ACCENT : TEXT2,
              fontFamily: "'Source Sans 3', sans-serif",
              fontSize: 12,
              cursor: "pointer",
            }}
          >
            {l}
          </button>
        ))}
      </div>
      <div
        style={{
          background: CARD,
          borderRadius: 10,
          border: `1px solid ${BORDER}`,
          padding: 12,
        }}
      >
        <svg viewBox="0 0 660 260" style={{ width: "100%" }}>
          {/* grid */}
          {[0, 0.25, 0.5, 0.75, 1.0].map((a) => (
            <g key={a}>
              <line
                x1="60"
                y1={yS(a)}
                x2="640"
                y2={yS(a)}
                stroke={BORDER}
                strokeWidth="0.5"
                strokeDasharray="4,4"
              />
              <text
                x="52"
                y={yS(a) + 4}
                fill={TEXT2}
                fontSize="10"
                fontFamily="JetBrains Mono"
                textAnchor="end"
              >
                {a.toFixed(2)}
              </text>
            </g>
          ))}
          {[0, 2, 4, 6, 8, 10, 12, 14].map((pH) => (
            <text
              key={pH}
              x={xS(pH)}
              y="240"
              fill={TEXT2}
              fontSize="10"
              fontFamily="JetBrains Mono"
              textAnchor="middle"
            >
              {pH}
            </text>
          ))}
          <text x="22" y="120" fill={TEXT2} fontSize="11" fontFamily="Source Sans 3" textAnchor="middle" transform="rotate(-90,22,120)">α</text>
          <text x="350" y="255" fill={TEXT2} fontSize="11" fontFamily="Source Sans 3" textAnchor="middle">pH</text>

          {mode === "mono" ? (
            <>
              <path d={makePath(monoPoints, "a0")} fill="none" stroke="#EF4444" strokeWidth="2.5" />
              <path d={makePath(monoPoints, "a1")} fill="none" stroke="#3B82F6" strokeWidth="2.5" />
              {/* labels */}
              <text x={xS(2)} y={yS(0.95) + 4} fill="#EF4444" fontSize="11" fontFamily="Source Sans 3" fontWeight="600">α₀ (HA)</text>
              <text x={xS(8)} y={yS(0.95) + 4} fill="#3B82F6" fontSize="11" fontFamily="Source Sans 3" fontWeight="600">α₁ (A⁻)</text>
              {/* crossover */}
              <line x1={xS(pKa1)} y1="20" x2={xS(pKa1)} y2="220" stroke="#F59E0B" strokeWidth="1" strokeDasharray="4,4" opacity="0.5" />
              <text x={xS(pKa1)} y="16" fill="#F59E0B" fontSize="9" fontFamily="JetBrains Mono" textAnchor="middle">
                pKa = {pKa1}
              </text>
            </>
          ) : (
            <>
              <path d={makePath(diPoints, "a0")} fill="none" stroke="#EF4444" strokeWidth="2.5" />
              <path d={makePath(diPoints, "a1")} fill="none" stroke={ACCENT} strokeWidth="2.5" />
              <path d={makePath(diPoints, "a2")} fill="none" stroke="#3B82F6" strokeWidth="2.5" />
              <text x={xS(3)} y={yS(0.9) + 4} fill="#EF4444" fontSize="11" fontFamily="Source Sans 3" fontWeight="600">α₀ (H₂A)</text>
              <text x={xS(8.3)} y={yS(0.7) + 4} fill={ACCENT} fontSize="11" fontFamily="Source Sans 3" fontWeight="600">α₁ (HA⁻)</text>
              <text x={xS(12.5)} y={yS(0.9) + 4} fill="#3B82F6" fontSize="11" fontFamily="Source Sans 3" fontWeight="600">α₂ (A²⁻)</text>
              <line x1={xS(pKa1di)} y1="20" x2={xS(pKa1di)} y2="220" stroke="#F59E0B" strokeWidth="1" strokeDasharray="4,4" opacity="0.4" />
              <line x1={xS(pKa2di)} y1="20" x2={xS(pKa2di)} y2="220" stroke="#F59E0B" strokeWidth="1" strokeDasharray="4,4" opacity="0.4" />
              <text x={xS(pKa1di)} y="16" fill="#F59E0B" fontSize="9" fontFamily="JetBrains Mono" textAnchor="middle">pKa₁</text>
              <text x={xS(pKa2di)} y="16" fill="#F59E0B" fontSize="9" fontFamily="JetBrains Mono" textAnchor="middle">pKa₂</text>
            </>
          )}
        </svg>
      </div>

      <SectionTitle>✏️ Eksempel</SectionTitle>
      <Prose>
        <p>
          V2024 oppg 5e: Sett opp uttrykk for α₁ for en diprotisk syre uten analytisk
          konsentrasjon.
        </p>
      </Prose>
      <CollapsibleStep n={1} title="Uttrykk for α₁">
        <FormulaBlock>
          α₁ = K<Sub>a,1</Sub>·[H⁺] / ([H⁺]² + K<Sub>a,1</Sub>·[H⁺] + K<Sub>a,1</Sub>·K<Sub>a,2</Sub>)
        </FormulaBlock>
        Merk: c<Sub>T</Sub> inngår ikke — alle ledd i nevneren deler c<Sub>T</Sub> som forkortes.
      </CollapsibleStep>

      <Huskeregel>
        α₀ + α₁ (+ α₂ ...) = 1 alltid. Ved pH = pK<Sub>a</Sub> krysser α-kurvene (α = 0,5 for
        de to tilstøtende formene). α-verdier er uavhengige av totalkonsentrasjon — kun
        avhengig av pH og K<Sub>a</Sub>-verdier.
      </Huskeregel>

      <ExamNote>
        V2022 oppg 6: Identifiser halvtitrerpunkt og ekvivalenspunkt fra α-pH-plott + bestem syren.
        V2024 oppg 5d: Sammenlign bufferkapasitet ved to pH-verdier med α-verdier.
        V2024 oppg 5e: Skriv uttrykk for α₁ uten c<Sub>T</Sub>.
      </ExamNote>
    </div>
  );
}

// ─── TAB 8: Log-log-diagram ───

function Tab8() {
  const pKa1 = 6.35;
  const pKa2 = 10.33;
  const logCt = -1; // 0.1 M

  // generate log-log lines for diprotic acid
  const logLogPoints = useMemo(() => {
    const Ka1 = Math.pow(10, -pKa1);
    const Ka2 = Math.pow(10, -pKa2);
    const pts = [];
    for (let pH = 0; pH <= 14; pH += 0.2) {
      const H = Math.pow(10, -pH);
      const cT = 0.1;
      const denom = H * H + H * Ka1 + Ka1 * Ka2;
      const H2A = (cT * H * H) / denom;
      const HA = (cT * H * Ka1) / denom;
      const A2 = (cT * Ka1 * Ka2) / denom;
      const OH = 1e-14 / H;
      pts.push({
        pH,
        logH: Math.log10(H),
        logOH: Math.log10(OH),
        logH2A: H2A > 1e-15 ? Math.log10(H2A) : -15,
        logHA: HA > 1e-15 ? Math.log10(HA) : -15,
        logA2: A2 > 1e-15 ? Math.log10(A2) : -15,
      });
    }
    return pts;
  }, []);

  const xS = (pH) => 70 + (pH / 14) * 560;
  const yS = (logC) => 20 + ((0 - logC) / 14) * 240;

  const mkPath = (pts, key) =>
    pts
      .filter((p) => p[key] > -14.5)
      .map((p, i) => `${i === 0 ? "M" : "L"}${xS(p.pH)},${yS(p[key])}`)
      .join(" ");

  return (
    <div>
      <SectionTitle>🔑 Nøkkelbegreper</SectionTitle>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        <Pill def="Plott av log[specie] vs pH for alle specier i systemet">Log-log-diagram</Pill>
        <Pill def="Sett opp protonbalanse → finn pH der relevante linjer krysser">Avlesning av pH</Pill>
        <Pill def="Stiplet kurve som viser bufferkapasiteten som funksjon av pH">β-kurve</Pill>
      </div>

      <SectionTitle>📖 Forklaring</SectionTitle>
      <Prose>
        <p>
          Et <strong>log-log-diagram</strong> plotter log-konsentrasjoner av alle specier
          (inkl. H⁺ og OH⁻) som funksjon av pH. Det er et kraftig grafisk verktøy for å
          bestemme pH i ulike situasjoner.
        </p>
        <p><strong>Slik bruker du det:</strong></p>
        <p>
          1. Sett opp <strong>protonbalansen</strong> for situasjonen (startløsning, ekvivalenspunkt, etc.)
        </p>
        <p>
          2. Forenkle: finn de to dominerende leddene i protonbalansen.
        </p>
        <p>
          3. Finn <strong>skjæringspunktet</strong> mellom de to linjene i diagrammet — det gir pH.
        </p>
        <p><strong>Viktige skjæringspunkt:</strong></p>
        <FormulaBlock>
          pH i 0,1 M H₂A: [H⁺] = [HA⁻] → les av skjæringspunkt
          <br />
          pH i 1. ekv.pkt: [H₂A] = [A²⁻] → les av skjæringspunkt
          <br />
          Halvtitrerpunkt 1: [H₂A] = [HA⁻] → pH = pK<Sub>a,1</Sub>
          <br />
          Halvtitrerpunkt 2: [HA⁻] = [A²⁻] → pH = pK<Sub>a,2</Sub>
        </FormulaBlock>
      </Prose>

      <SectionTitle>📊 Log-log-diagram: 0,10 M diprotisk syre (H₂CO₃)</SectionTitle>
      <div
        style={{
          background: CARD,
          borderRadius: 10,
          border: `1px solid ${BORDER}`,
          padding: 12,
        }}
      >
        <svg viewBox="0 0 660 300" style={{ width: "100%" }}>
          {/* grid */}
          {[0, -2, -4, -6, -8, -10, -12, -14].map((lc) => (
            <g key={lc}>
              <line
                x1="70"
                y1={yS(lc)}
                x2="630"
                y2={yS(lc)}
                stroke={BORDER}
                strokeWidth="0.5"
                strokeDasharray="4,4"
              />
              <text
                x="62"
                y={yS(lc) + 4}
                fill={TEXT2}
                fontSize="9"
                fontFamily="JetBrains Mono"
                textAnchor="end"
              >
                {lc}
              </text>
            </g>
          ))}
          {[0, 2, 4, 6, 8, 10, 12, 14].map((pH) => (
            <text
              key={pH}
              x={xS(pH)}
              y="280"
              fill={TEXT2}
              fontSize="10"
              fontFamily="JetBrains Mono"
              textAnchor="middle"
            >
              {pH}
            </text>
          ))}
          <text x="30" y="140" fill={TEXT2} fontSize="11" fontFamily="Source Sans 3" textAnchor="middle" transform="rotate(-90,30,140)">log [X]</text>
          <text x="350" y="296" fill={TEXT2} fontSize="11" fontFamily="Source Sans 3" textAnchor="middle">pH</text>

          {/* H+ and OH- */}
          <path d={mkPath(logLogPoints, "logH")} fill="none" stroke="#EF4444" strokeWidth="2" />
          <path d={mkPath(logLogPoints, "logOH")} fill="none" stroke="#3B82F6" strokeWidth="2" />
          {/* species */}
          <path d={mkPath(logLogPoints, "logH2A")} fill="none" stroke={ACCENT} strokeWidth="2.5" />
          <path d={mkPath(logLogPoints, "logHA")} fill="none" stroke="#F59E0B" strokeWidth="2.5" />
          <path d={mkPath(logLogPoints, "logA2")} fill="none" stroke="#8B5CF6" strokeWidth="2.5" />

          {/* labels */}
          <text x={xS(1)} y={yS(-1) - 6} fill="#EF4444" fontSize="10" fontFamily="JetBrains Mono" fontWeight="600">H⁺</text>
          <text x={xS(13)} y={yS(-1) - 6} fill="#3B82F6" fontSize="10" fontFamily="JetBrains Mono" fontWeight="600">OH⁻</text>
          <text x={xS(2.5)} y={yS(-1.2)} fill={ACCENT} fontSize="10" fontFamily="JetBrains Mono" fontWeight="600">H₂CO₃</text>
          <text x={xS(8.3)} y={yS(-1.2)} fill="#F59E0B" fontSize="10" fontFamily="JetBrains Mono" fontWeight="600">HCO₃⁻</text>
          <text x={xS(12.8)} y={yS(-1.5)} fill="#8B5CF6" fontSize="10" fontFamily="JetBrains Mono" fontWeight="600">CO₃²⁻</text>

          {/* pKa markers */}
          <line x1={xS(pKa1)} y1="20" x2={xS(pKa1)} y2="260" stroke="#F59E0B" strokeWidth="0.8" strokeDasharray="3,3" opacity="0.4" />
          <line x1={xS(pKa2)} y1="20" x2={xS(pKa2)} y2="260" stroke="#8B5CF6" strokeWidth="0.8" strokeDasharray="3,3" opacity="0.4" />
          <text x={xS(pKa1)} y="14" fill="#F59E0B" fontSize="8" fontFamily="JetBrains Mono" textAnchor="middle">pKa₁=6,35</text>
          <text x={xS(pKa2)} y="14" fill="#8B5CF6" fontSize="8" fontFamily="JetBrains Mono" textAnchor="middle">pKa₂=10,33</text>
        </svg>
      </div>

      <SectionTitle>✏️ Eksempel</SectionTitle>
      <Prose>
        <p>
          Hva er pH i 0,1 M H₂CO₃? Bruk protonbalansen og log-log-diagrammet.
        </p>
      </Prose>
      <CollapsibleStep n={1} title="Sett opp protonbalanse">
        Ref: H₂CO₃, H₂O
        <br />
        [H⁺] = [OH⁻] + [HCO₃⁻] + 2·[CO₃²⁻]
      </CollapsibleStep>
      <CollapsibleStep n={2} title="Forenkle">
        Ved lav pH: [CO₃²⁻] og [OH⁻] er neglisjerbare.
        <br />
        → [H⁺] ≈ [HCO₃⁻]
      </CollapsibleStep>
      <CollapsibleStep n={3} title="Les av fra diagrammet">
        Skjæringspunktet mellom H⁺-linjen og HCO₃⁻-linjen gir <strong>pH ≈ 3,7</strong>
      </CollapsibleStep>

      <SectionTitle>✏️ Eksempel 2</SectionTitle>
      <Prose><p>Hva er pH i 1. ekvivalenspunkt (HCO₃⁻ dominerer)?</p></Prose>
      <CollapsibleStep n={1} title="Protonbalanse med HCO₃⁻ som referanse">
        [H⁺] + [H₂CO₃] = [OH⁻] + [CO₃²⁻]
      </CollapsibleStep>
      <CollapsibleStep n={2} title="Forenkle og les av">
        Dominerende: [H₂CO₃] = [CO₃²⁻]
        <br />
        Les av skjæringspunktet → <strong>pH ≈ 8,3</strong>
      </CollapsibleStep>

      <Huskeregel>
        <strong>Oppskrift:</strong> 1) Sett opp protonbalanse. 2) Stryk neglisjerbare ledd. 3) Les av pH i
        skjæringspunktet mellom de to gjenværende linjene. Halvtitrerpunkt = der to specie-linjer
        krysser (pH = pK<Sub>a</Sub>). Ekvivalenspunkt = der «symmetriske» specier krysser
        (f.eks. [H₂A] = [A²⁻]).
      </Huskeregel>

      <ExamNote>
        V2021 oppg 7: Les av pH i 1. og 3. ekv.pkt for arsensyre fra log-log-diagram +
        oppg 8: identifiser halvtitrerpunkt/ekvivalenspunkt fra diagram med β-kurve.
        V2022 oppg 8: Avles ekvivalenspunkt i log-log for treverdig syre.
        V2023 oppg 5: Avles halvtitrerpunkt og ekvivalenspunkt, bestem ukjent syre.
        V2024 oppg 4: Bruk log-log-diagram for å finne pH i ekv.pkt for ammoniakk.
      </ExamNote>
    </div>
  );
}

// ─── Main App ───

const TABS = [
  { id: "theory", label: "Syre-base-teori", short: "Teori" },
  { id: "titration", label: "Titreringsprinsipper", short: "Titrering" },
  { id: "curves", label: "Titrerkurver", short: "Kurver" },
  { id: "buffer", label: "Buffer & H-H", short: "Buffer" },
  { id: "indicators", label: "Indikatorer", short: "Indikator" },
  { id: "mlp", label: "MLP-balanser", short: "MLP" },
  { id: "alpha", label: "α-verdier", short: "α-verdier" },
  { id: "loglog", label: "Log-log-diagram", short: "Log-log" },
];

const TAB_COMPONENTS = {
  theory: Tab1,
  titration: Tab2,
  curves: Tab3,
  buffer: Tab4,
  indicators: Tab5,
  mlp: Tab6,
  alpha: Tab7,
  loglog: Tab8,
};

export default function SyreBaseStudyGuide() {
  const [activeTab, setActiveTab] = useState("theory");
  const [visited, setVisited] = useState(new Set(["theory"]));

  const handleTabClick = (id) => {
    setActiveTab(id);
    setVisited((prev) => new Set([...prev, id]));
  };

  const TabContent = TAB_COMPONENTS[activeTab];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: BG,
        color: TEXT,
        fontFamily: "'Source Sans 3', sans-serif",
      }}
    >
      <style>{fonts}</style>

      {/* Header */}
      <div
        style={{
          background: `linear-gradient(135deg, ${ACCENT}22, ${BG})`,
          borderBottom: `2px solid ${ACCENT}44`,
          padding: "20px 24px 14px",
        }}
      >
        <div
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: 11,
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.15em",
            color: ACCENT,
            marginBottom: 4,
          }}
        >
          Emne 2 — Syre-base-titreringer
        </div>
        <div
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: 22,
            fontWeight: 800,
            color: TEXT,
            letterSpacing: "-0.02em",
          }}
        >
          IMAK2004 Kjemisk Analyse
        </div>
        <div
          style={{
            fontFamily: "'Source Sans 3', sans-serif",
            fontSize: 13,
            color: TEXT2,
            marginTop: 4,
          }}
        >
          {visited.size}/{TABS.length} emner besøkt
          <span
            style={{
              display: "inline-flex",
              gap: 4,
              marginLeft: 10,
              verticalAlign: "middle",
            }}
          >
            {TABS.map((t) => (
              <span
                key={t.id}
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: visited.has(t.id) ? ACCENT : BORDER,
                  transition: "background 0.3s",
                }}
              />
            ))}
          </span>
        </div>
      </div>

      {/* Tab bar */}
      <div
        style={{
          display: "flex",
          overflowX: "auto",
          gap: 2,
          padding: "0 8px",
          background: CARD,
          borderBottom: `1px solid ${BORDER}`,
        }}
      >
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => handleTabClick(t.id)}
            style={{
              padding: "10px 14px",
              border: "none",
              borderBottom: `2.5px solid ${
                activeTab === t.id ? ACCENT : "transparent"
              }`,
              background: "transparent",
              color: activeTab === t.id ? ACCENT : TEXT2,
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: 12,
              fontWeight: activeTab === t.id ? 700 : 500,
              cursor: "pointer",
              whiteSpace: "nowrap",
              transition: "all 0.2s",
              position: "relative",
            }}
          >
            {t.short}
            {visited.has(t.id) && activeTab !== t.id && (
              <span
                style={{
                  position: "absolute",
                  top: 6,
                  right: 4,
                  width: 5,
                  height: 5,
                  borderRadius: "50%",
                  background: ACCENT,
                  opacity: 0.5,
                }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Tab header */}
      <div
        style={{
          padding: "16px 24px 0",
        }}
      >
        <div
          style={{
            background: `${ACCENT}15`,
            border: `1px solid ${ACCENT}33`,
            borderRadius: 10,
            padding: "12px 18px",
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: 18,
            fontWeight: 700,
            color: TEXT,
          }}
        >
          <span style={{ color: ACCENT, fontSize: 14, fontWeight: 600 }}>
            {TABS.findIndex((t) => t.id === activeTab) + 1}/{TABS.length}{" "}
          </span>
          {TABS.find((t) => t.id === activeTab)?.label}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: "8px 24px 40px" }}>
        <TabContent />
      </div>
    </div>
  );
}
