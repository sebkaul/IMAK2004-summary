import { useState, useCallback } from "react";

// ═══════════════════════════════════════════════════════════════
// DESIGN SYSTEM
// ═══════════════════════════════════════════════════════════════
const C = {
  bg: "#0F172A", card: "#1E293B", border: "#334155",
  t1: "#F8FAFC", t2: "#94A3B8", accent: "#3B82F6",
  adim: "rgba(59,130,246,0.15)", abord: "rgba(59,130,246,0.3)",
  green: "#10B981", red: "#EF4444", amber: "#F59E0B", violet: "#8B5CF6",
};

const TABS = [
  { id: "1.1", label: "Nøyaktighet & feil", fire: "🔥🔥🔥" },
  { id: "1.2", label: "Gjennomsnitt & stdavvik", fire: "🔥🔥" },
  { id: "1.3", label: "Feilforplanting", fire: "🔥🔥🔥🔥🔥" },
  { id: "1.4", label: "Q-test", fire: "🔥🔥🔥🔥" },
  { id: "1.5", label: "Konfidensintervall", fire: "🔥🔥" },
  { id: "1.6", label: "Kalibrering & LOD", fire: "🔥🔥🔥" },
  { id: "1.7", label: "Gjeldende siffer", fire: "🔥🔥🔥🔥" },
];

const fonts = `@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800&family=Source+Sans+3:ital,wght@0,400;0,500;0,600;1,400&family=JetBrains+Mono:wght@400;500;600&display=swap');`;

// ═══════════════════════════════════════════════════════════════
// SHARED COMPONENTS
// ═══════════════════════════════════════════════════════════════
function Pill({ term, def, color = C.accent }) {
  const [show, setShow] = useState(false);
  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <button onClick={() => setShow(!show)} style={{
        background: `${color}22`, border: `1px solid ${color}55`, color,
        padding: "6px 14px", borderRadius: "999px", fontFamily: "'Source Sans 3',sans-serif",
        fontSize: "13px", fontWeight: 600, cursor: "pointer", transition: "all 0.2s", outline: "none",
      }}>{term}</button>
      {show && (
        <div style={{
          position: "absolute", top: "calc(100% + 8px)", left: "50%", transform: "translateX(-50%)",
          background: C.card, border: `1px solid ${C.border}`, borderRadius: "10px",
          padding: "12px 16px", minWidth: "220px", maxWidth: "300px", zIndex: 50,
          boxShadow: "0 8px 32px rgba(0,0,0,0.4)", fontFamily: "'Source Sans 3',sans-serif",
          fontSize: "13px", color: C.t2, lineHeight: 1.5,
        }}>
          <div style={{ position: "absolute", top: "-6px", left: "50%", transform: "translateX(-50%) rotate(45deg)",
            width: "12px", height: "12px", background: C.card, borderTop: `1px solid ${C.border}`, borderLeft: `1px solid ${C.border}` }} />
          {def}
        </div>
      )}
    </div>
  );
}

function Section({ num, title, children, accent = false }) {
  return (
    <section style={{
      background: accent ? `linear-gradient(135deg, ${C.adim}, transparent)` : C.card,
      borderRadius: "14px", border: `1px solid ${accent ? C.abord : C.border}`,
      padding: "24px", marginBottom: "24px",
    }}>
      <h2 style={{
        fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: "17px", fontWeight: 700,
        color: C.accent, marginBottom: "14px", display: "flex", alignItems: "center", gap: "8px",
      }}>
        <span style={{ opacity: 0.4 }}>{num}</span> {title}
      </h2>
      {children}
    </section>
  );
}

function Step({ number, title, children, isLast }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderLeft: `2px solid ${open ? C.accent : C.border}`, marginLeft: "12px",
      paddingLeft: "20px", paddingBottom: isLast ? 0 : "8px", transition: "border-color 0.3s" }}>
      <button onClick={() => setOpen(!open)} style={{
        background: "none", border: "none", color: open ? C.accent : C.t1,
        fontFamily: "'Source Sans 3',sans-serif", fontSize: "14px", fontWeight: 600,
        cursor: "pointer", padding: "6px 0", display: "flex", alignItems: "center", gap: "8px", width: "100%",
      }}>
        <span style={{
          display: "inline-flex", alignItems: "center", justifyContent: "center", width: "22px", height: "22px",
          borderRadius: "50%", background: open ? C.accent : C.border, color: open ? "#fff" : C.t2,
          fontSize: "11px", fontWeight: 700, fontFamily: "'JetBrains Mono',monospace", flexShrink: 0,
        }}>{number}</span>
        <span style={{ textAlign: "left" }}>{title}</span>
        <span style={{ marginLeft: "auto", transform: open ? "rotate(90deg)" : "rotate(0)", transition: "transform 0.2s", fontSize: "11px" }}>▶</span>
      </button>
      {open && <div style={{ color: C.t2, fontFamily: "'Source Sans 3',sans-serif", fontSize: "14px", lineHeight: 1.7, padding: "8px 0 12px 30px" }}>{children}</div>}
    </div>
  );
}

function Formula({ children }) {
  return <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "14px", color: C.t1 }}>{children}</span>;
}

function FormulaBlock({ children }) {
  return (
    <div style={{ background: C.bg, borderRadius: "10px", padding: "16px", borderLeft: `3px solid ${C.accent}`, marginBottom: "14px" }}>
      <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "14px", color: C.t1, lineHeight: 1.8 }}>{children}</div>
    </div>
  );
}

function InfoBox({ color, title, children }) {
  return (
    <div style={{ background: C.bg, borderRadius: "10px", padding: "16px", borderLeft: `3px solid ${color}`, marginBottom: "14px" }}>
      {title && <div style={{ fontWeight: 600, color, marginBottom: "8px", fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: "13px" }}>{title}</div>}
      <div style={{ color: C.t2, fontSize: "14px", lineHeight: 1.7 }}>{children}</div>
    </div>
  );
}

function Prose({ children }) {
  return <div style={{ color: C.t2, fontSize: "15px", lineHeight: 1.8, fontFamily: "'Source Sans 3',sans-serif" }}>{children}</div>;
}

function ExamBox({ children }) {
  return (
    <Section num="🎯" title="Eksamensrelevans">
      <div style={{ color: C.t2, fontSize: "14px", lineHeight: 1.7 }}>{children}</div>
    </Section>
  );
}

function HuskeBox({ children }) {
  return <Section num="💡" title="Huskeregel" accent>{children}</Section>;
}

// ═══════════════════════════════════════════════════════════════
// TAB 1.1 — NØYAKTIGHET, PRESISJON OG FEILTYPER
// ═══════════════════════════════════════════════════════════════
function TargetDiagram() {
  const [ac, setAc] = useState(0);
  const cases = [
    { label: "Høy nøyaktighet, høy presisjon", emoji: "✅", desc: "Nær sann verdi og reproduserbart", pts: [[0,-4],[3,2],[-2,-1],[1,3],[-3,-2]], color: C.green, rule: "Syst. feil ≈ 0, Tilf. feil ≈ 0" },
    { label: "Høy nøyaktighet, lav presisjon", emoji: "⚠️", desc: "Gjennomsnitt nær sann verdi, stor spredning", pts: [[-18,12],[15,-20],[-10,22],[20,-8],[-5,-18]], color: C.amber, rule: "Syst. feil ≈ 0, Tilf. feil = stor" },
    { label: "Lav nøyaktighet, høy presisjon", emoji: "🔧", desc: "Systematisk feil — reproduserbart, men feil verdi", pts: [[18,15],[22,18],[16,20],[20,13],[19,17]], color: C.red, rule: "Syst. feil ≠ 0, Tilf. feil ≈ 0" },
    { label: "Lav nøyaktighet, lav presisjon", emoji: "❌", desc: "Verken nær sann verdi eller reproduserbart", pts: [[-20,18],[15,-22],[22,15],[-18,-15],[5,25]], color: C.violet, rule: "Syst. feil ≠ 0, Tilf. feil = stor" },
  ];
  const c = cases[ac];
  return (
    <div>
      <div style={{ display: "flex", gap: "6px", marginBottom: "16px", flexWrap: "wrap" }}>
        {cases.map((cs, i) => (
          <button key={i} onClick={() => setAc(i)} style={{
            background: ac === i ? cs.color + "22" : "transparent", border: `1px solid ${ac === i ? cs.color : C.border}`,
            color: ac === i ? cs.color : C.t2, padding: "5px 10px", borderRadius: "8px",
            fontFamily: "'Source Sans 3',sans-serif", fontSize: "11px", fontWeight: 600, cursor: "pointer",
          }}>{cs.emoji} {cs.label}</button>
        ))}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "24px", flexWrap: "wrap", justifyContent: "center" }}>
        <svg viewBox="-80 -80 160 160" width="200" height="200">
          {[70,52,35,17].map((r,i) => <circle key={i} cx={0} cy={0} r={r} fill="none" stroke={C.border} strokeWidth={1} opacity={0.6} />)}
          <line x1={-70} y1={0} x2={70} y2={0} stroke={C.border} strokeWidth={0.5} opacity={0.4} />
          <line x1={0} y1={-70} x2={0} y2={70} stroke={C.border} strokeWidth={0.5} opacity={0.4} />
          <circle cx={0} cy={0} r={3} fill={C.accent} opacity={0.7} />
          {c.pts.map((p, i) => <circle key={`${ac}-${i}`} cx={p[0]} cy={p[1]} r={5} fill={c.color} opacity={0.85} />)}
        </svg>
        <div style={{ flex: 1, minWidth: "180px" }}>
          <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: "15px", fontWeight: 700, color: c.color, marginBottom: "6px" }}>{c.emoji} {c.label}</div>
          <div style={{ fontFamily: "'Source Sans 3',sans-serif", fontSize: "13px", color: C.t2, lineHeight: 1.6, marginBottom: "10px" }}>{c.desc}</div>
          <div style={{ padding: "8px 12px", background: `${c.color}11`, border: `1px solid ${c.color}33`, borderRadius: "8px", fontFamily: "'JetBrains Mono',monospace", fontSize: "12px", color: c.color }}>{c.rule}</div>
        </div>
      </div>
    </div>
  );
}

function Tab11() {
  return (<>
    <Section num="01" title="Nøkkelbegreper">
      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
        <Pill term="Nøyaktighet" def="Hvor nær en måling er den sanne verdien. Påvirkes av systematiske feil." />
        <Pill term="Presisjon" def="Hvor reproduserbare målingene er. Påvirkes av tilfeldige feil." />
        <Pill term="Systematisk feil" def="Påvirker alle resultater i samme retning. Tre kilder: instrumentelle, metode-, menneskelige." color={C.red} />
        <Pill term="Tilfeldig feil" def="Gir tilfeldig spredning rundt middelverdien. Kan ikke elimineres, men reduseres med flere målinger." color={C.amber} />
        <Pill term="Grov feil" def="Påvirker enkeltmålinger. Skyldes ofte menneskelige feil. Kan detekteres med Q-test." color={C.violet} />
        <Pill term="Absolutt feil" def={<span>E = x<sub>i</sub> − x<sub>t</sub></span>} />
        <Pill term="Relativ feil" def={<span>E<sub>r</sub> = (E / x<sub>t</sub>) × 100 %</span>} />
      </div>
    </Section>

    <Section num="02" title="Forklaring">
      <Prose>
        <p style={{ marginBottom: "12px" }}>I analytisk kjemi er det to fundamentale mål på kvaliteten til en analyse: <strong style={{ color: C.t1 }}>nøyaktighet</strong> og <strong style={{ color: C.t1 }}>presisjon</strong>.</p>
        <p style={{ marginBottom: "12px" }}><strong style={{ color: C.t1 }}>Nøyaktighet</strong> handler om hvor nær resultatet er den <em>sanne verdien</em>. Lav nøyaktighet skyldes <span style={{ color: C.red }}>systematiske feil</span> — feil som påvirker alle målinger i samme retning.</p>
        <InfoBox color={C.red} title="Systematiske feil — tre kilder:">
          <div><strong style={{ color: C.t1 }}>Instrumentelle:</strong> Feil kalibrert utstyr, temperaturavvik</div>
          <div><strong style={{ color: C.t1 }}>Metodefeil:</strong> Feil indikator, ufullstendig reaksjon</div>
          <div><strong style={{ color: C.t1 }}>Menneskelige:</strong> Konsekvent feilavlesning, overtitrering</div>
          <div style={{ marginTop: "8px", fontSize: "12px", color: C.amber }}>Kan være <strong>konstante</strong> (uavhengig av prøvemengde) eller <strong>proporsjonale</strong></div>
        </InfoBox>
        <p style={{ marginBottom: "12px" }}><strong style={{ color: C.t1 }}>Presisjon</strong> handler om reproduserbarhet. Lav presisjon skyldes <span style={{ color: C.amber }}>tilfeldige feil</span>. Disse kan ikke elimineres, men begrenses ved flere målinger.</p>
        <p style={{ marginBottom: "12px" }}><strong style={{ color: C.t1 }}>Grove feil</strong> påvirker enkeltmålinger. Detekteres med <span style={{ color: C.accent }}>Q-test</span>. Medianen påvirkes lite, men gjennomsnittet kan forskyves kraftig.</p>
        <FormulaBlock>
          <div>E = x<sub>i</sub> − x<sub>t</sub></div>
          <div>E<sub>r</sub> = (x<sub>i</sub> − x<sub>t</sub>) / x<sub>t</sub> × 100 %</div>
        </FormulaBlock>
      </Prose>
    </Section>

    <Section num="03" title="Visuell illustrasjon">
      <p style={{ color: C.t2, fontSize: "13px", marginBottom: "12px" }}>Klikk for å se fire kombinasjoner av nøyaktighet og presisjon. Blå prikk = sann verdi.</p>
      <TargetDiagram />
    </Section>

    <Section num="04" title="Eksempel">
      <p style={{ color: C.t2, fontSize: "14px", marginBottom: "14px", lineHeight: 1.6 }}>
        Du beregner en konsentrasjon på <Formula>0,0215 M</Formula>, men den faktiske er <Formula>0,0221 M</Formula>. Beregn absolutt og relativ feil. <span style={{ color: C.accent, fontSize: "12px" }}>(V2021)</span>
      </p>
      <Step number={1} title="Identifiser verdiene">
        <Formula>x<sub>i</sub> = 0,0215 M, x<sub>t</sub> = 0,0221 M</Formula>
      </Step>
      <Step number={2} title="Absolutt feil">
        <Formula>E = 0,0215 − 0,0221 = <strong style={{ color: C.accent }}>−0,0006 M</strong></Formula>
        <div style={{ marginTop: "4px", fontSize: "13px" }}>Negativt → vi har målt lavere enn sann verdi.</div>
      </Step>
      <Step number={3} title="Relativ feil" isLast>
        <Formula>E<sub>r</sub> = (−0,0006 / 0,0221) × 100 % ≈ <strong style={{ color: C.accent }}>−3 %</strong></Formula>
      </Step>
    </Section>

    <HuskeBox>
      <div style={{ color: C.t1, fontSize: "15px", lineHeight: 1.7, fontFamily: "'Source Sans 3',sans-serif" }}>
        <strong style={{ color: C.accent, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>«Nøyaktighet = Nærhet, Presisjon = Pålitelighet»</strong><br />
        <span style={{ color: C.t2, fontSize: "13px" }}>Bueskyting: Nøyaktighet = treffer du blinken? Presisjon = treffer du <em>samme sted</em> hver gang?</span>
        <div style={{ marginTop: "12px", padding: "10px 14px", background: C.card, borderRadius: "8px", border: `1px solid ${C.border}`, fontFamily: "'JetBrains Mono',monospace", fontSize: "12px", color: C.t2 }}>
          <div><span style={{ color: C.red }}>Systematisk feil</span> → rammer <strong style={{ color: C.t1 }}>nøyaktighet</strong></div>
          <div><span style={{ color: C.amber }}>Tilfeldig feil</span> → rammer <strong style={{ color: C.t1 }}>presisjon</strong></div>
          <div><span style={{ color: C.violet }}>Grov feil</span> → rammer <strong style={{ color: C.t1 }}>enkeltmålinger</strong></div>
        </div>
      </div>
    </HuskeBox>

    <ExamBox>
      <strong style={{ color: C.t1 }}>V2021:</strong> Beregning av absolutt og relativ feil (direkte oppgave). <strong style={{ color: C.t1 }}>V2024 oppg 1b:</strong> «Gi 1–3 eksempler på tilfeldige og systematiske feil i syre-base-titrering.» Forventet: konkrete eksempler med retning og tiltak for å redusere.
    </ExamBox>
  </>);
}

// ═══════════════════════════════════════════════════════════════
// TAB 1.2 — GJENNOMSNITT, STANDARDAVVIK OG VARIANS
// ═══════════════════════════════════════════════════════════════
function GaussPlot() {
  const makeGauss = (mu, sigma, n = 200) => {
    const pts = [];
    for (let i = 0; i <= n; i++) {
      const x = mu - 4 * sigma + (8 * sigma * i) / n;
      const y = (1 / (sigma * Math.sqrt(2 * Math.PI))) * Math.exp(-0.5 * ((x - mu) / sigma) ** 2);
      pts.push([x, y]);
    }
    return pts;
  };
  const narrow = makeGauss(0, 1);
  const wide = makeGauss(0, 2);
  const toPath = (pts, xScale, yScale, xOff, yOff) => pts.map((p, i) => `${i === 0 ? "M" : "L"}${xOff + p[0] * xScale},${yOff - p[1] * yScale}`).join(" ");
  const w = 400, h = 180, xS = 40, yS = 350, xO = w / 2, yO = h - 20;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} width="100%" style={{ maxWidth: "450px" }}>
      <line x1={20} y1={yO} x2={w - 20} y2={yO} stroke={C.border} strokeWidth={1} />
      <line x1={xO} y1={10} x2={xO} y2={yO} stroke={C.border} strokeWidth={0.5} strokeDasharray="4 4" opacity={0.5} />
      {[-3,-2,-1,0,1,2,3].map(v => (
        <g key={v}>
          <line x1={xO + v * xS} y1={yO} x2={xO + v * xS} y2={yO + 4} stroke={C.t2} strokeWidth={0.5} />
          <text x={xO + v * xS} y={yO + 14} fill={C.t2} fontSize="10" textAnchor="middle" fontFamily="JetBrains Mono">{v === 0 ? "μ" : `${v > 0 ? "+" : ""}${v}σ`}</text>
        </g>
      ))}
      <path d={toPath(wide, xS, yS, xO, yO)} fill="none" stroke={C.amber} strokeWidth={2} opacity={0.7} />
      <path d={toPath(narrow, xS, yS, xO, yO)} fill="none" stroke={C.accent} strokeWidth={2} />
      {/* Shaded 1σ region for narrow */}
      <path d={`${toPath(narrow.filter(p => p[0] >= -1 && p[0] <= 1), xS, yS, xO, yO)} L${xO + 1 * xS},${yO} L${xO - 1 * xS},${yO} Z`} fill={C.accent} opacity={0.1} />
      <text x={w - 80} y={40} fill={C.accent} fontSize="11" fontFamily="Source Sans 3">σ = 1 (smal)</text>
      <text x={w - 80} y={56} fill={C.amber} fontSize="11" fontFamily="Source Sans 3">σ = 2 (bred)</text>
      <text x={xO} y={yO - 5} fill={C.accent} fontSize="9" textAnchor="middle" fontFamily="JetBrains Mono" opacity={0.7}>68,3 %</text>
    </svg>
  );
}

function Tab12() {
  return (<>
    <Section num="01" title="Nøkkelbegreper">
      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
        <Pill term="Populasjonsgjennomsnitt (μ)" def="Sann middelverdi for hele populasjonen. Lik den sanne verdien." />
        <Pill term="Utvalgsgjennomsnitt (x̄)" def="Gjennomsnitt beregnet fra et utvalg. Nærmer seg μ når N → ∞." />
        <Pill term="Standardavvik (σ, s)" def="Mål på spredning. σ for populasjon (deler på N), s for utvalg (deler på N−1)." />
        <Pill term="Varians (σ², s²)" def="Kvadratet av standardavviket. Brukes i mange statistiske tester." />
        <Pill term="Normalfordeling" def="Gaussisk fordeling. 68,3 % innenfor ±1σ, 95,4 % innenfor ±2σ, 99,7 % innenfor ±3σ." color={C.green} />
        <Pill term="Student t-fordeling" def="Brukes ved N < 30. Flatere enn normalfordelingen med bredere haler." color={C.amber} />
      </div>
    </Section>

    <Section num="02" title="Forklaring">
      <Prose>
        <p style={{ marginBottom: "12px" }}><strong style={{ color: C.t1 }}>Gjennomsnitt</strong> er det enkleste estimatet av den sanne verdien. Vi skiller mellom:</p>
        <FormulaBlock>
          <div style={{ marginBottom: "6px" }}>Utvalgsgjennomsnitt: x̄ = (Σx<sub>i</sub>) / N</div>
          <div>Når N → ∞, nærmer x̄ seg μ (populasjonsgjennomsnitt)</div>
          <div style={{ color: C.t2, fontSize: "12px", marginTop: "4px" }}>Vanligvis x̄ ≈ μ hvis N {">"} 20–30</div>
        </FormulaBlock>
        <p style={{ marginBottom: "12px" }}><strong style={{ color: C.t1 }}>Standardavvik</strong> måler spredningen i dataene:</p>
        <FormulaBlock>
          <div style={{ marginBottom: "4px" }}>Populasjon: σ = √[Σ(x<sub>i</sub> − μ)² / N]</div>
          <div style={{ marginBottom: "4px" }}>Utvalg: s = √[Σ(x<sub>i</sub> − x̄)² / (N − 1)]</div>
          <div style={{ marginBottom: "4px" }}>Gjennomsnittets stdavvik: s<sub>gj</sub> = s / √N</div>
          <div style={{ color: C.amber, fontSize: "12px", marginTop: "6px" }}>⚠ Deler på N−1 (ikke N) i utvalget fordi vi «bruker opp» en frihetsgrad ved å beregne x̄</div>
        </FormulaBlock>
        <p style={{ marginBottom: "12px" }}><strong style={{ color: C.t1 }}>Varians</strong> = standardavviket², altså σ² eller s². Brukes direkte i F-test og ANOVA.</p>
        <p style={{ marginBottom: "12px" }}>Ved <strong style={{ color: C.t1 }}>N {"<"} 30</strong> bruker vi <span style={{ color: C.amber }}>Student t-fordelingen</span> istedenfor normalfordelingen. Den er flatere med bredere haler, men identisk med normalfordelingen ved N ≥ 30.</p>
      </Prose>
    </Section>

    <Section num="03" title="Visuell illustrasjon">
      <p style={{ color: C.t2, fontSize: "13px", marginBottom: "12px" }}>Normalfordeling med to ulike standardavvik. Skravert område = ±1σ (68,3 %).</p>
      <div style={{ display: "flex", justifyContent: "center" }}><GaussPlot /></div>
      <div style={{ marginTop: "12px", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "8px" }}>
        {[["±1σ", "68,3 %", C.accent], ["±2σ", "95,4 %", C.green], ["±3σ", "99,7 %", C.amber]].map(([r, p, col]) => (
          <div key={r} style={{ background: C.bg, borderRadius: "8px", padding: "10px", textAlign: "center", border: `1px solid ${C.border}` }}>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "14px", color: col, fontWeight: 600 }}>{r}</div>
            <div style={{ fontFamily: "'Source Sans 3',sans-serif", fontSize: "12px", color: C.t2 }}>{p}</div>
          </div>
        ))}
      </div>
    </Section>

    <Section num="04" title="Eksempel">
      <p style={{ color: C.t2, fontSize: "14px", marginBottom: "14px", lineHeight: 1.6 }}>
        Du har målt konsentrasjonen av NaCl i 5 paralleller: <Formula>0,1023, 0,1028, 0,1020, 0,1031, 0,1025 M</Formula>. Finn gjennomsnitt, standardavvik og standardavviket til gjennomsnittet.
      </p>
      <Step number={1} title="Gjennomsnitt">
        <Formula>x̄ = (0,1023 + 0,1028 + 0,1020 + 0,1031 + 0,1025) / 5</Formula><br />
        <Formula>x̄ = 0,5127 / 5 = <strong style={{ color: C.accent }}>0,10254 M</strong></Formula>
      </Step>
      <Step number={2} title="Standardavvik (s)">
        <div style={{ fontSize: "13px", marginBottom: "4px" }}>Beregn (x<sub>i</sub> − x̄)² for hver:</div>
        <Formula>(−0,00024)² + (0,00026)² + (−0,00054)² + (0,00056)² + (−0,00004)²</Formula><br />
        <Formula>= 7,6 × 10⁻⁷</Formula><br />
        <Formula>s = √(7,6 × 10⁻⁷ / 4) = <strong style={{ color: C.accent }}>4,4 × 10⁻⁴ M</strong></Formula>
      </Step>
      <Step number={3} title="Standardavvik til gjennomsnittet" isLast>
        <Formula>s<sub>gj</sub> = s / √N = 4,4 × 10⁻⁴ / √5 ≈ <strong style={{ color: C.accent }}>2,0 × 10⁻⁴ M</strong></Formula>
      </Step>
    </Section>

    <HuskeBox>
      <div style={{ color: C.t1, fontSize: "15px", lineHeight: 1.7 }}>
        <strong style={{ color: C.accent, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>σ vs s: «Kjenner du sannheten?»</strong><br />
        <span style={{ color: C.t2, fontSize: "13px" }}>Kjenner du μ (sann verdi) → bruk σ (del på N). Kjenner du bare x̄ → bruk s (del på N−1).</span>
        <div style={{ marginTop: "10px", fontFamily: "'JetBrains Mono',monospace", fontSize: "12px", color: C.amber }}>
          Flere målinger → lavere s<sub>gj</sub> → smalere konfidensintervall → bedre estimat!
        </div>
      </div>
    </HuskeBox>

    <ExamBox>Gjennomsnitt og standardavvik trengs i nesten <em>alle</em> beregningsoppgaver. Sjelden testet isolert, men er grunnlaget for feilforplanting (1.3), Q-test (1.4) og konfidensintervall (1.5).</ExamBox>
  </>);
}

// ═══════════════════════════════════════════════════════════════
// TAB 1.3 — FEILFORPLANTING  🔥🔥🔥🔥🔥
// ═══════════════════════════════════════════════════════════════
function Tab13() {
  return (<>
    <Section num="01" title="Nøkkelbegreper">
      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
        <Pill term="Feilforplanting" def="Hvordan usikkerheten i enkeltmålinger forplanter seg til det endelige resultatet." />
        <Pill term="Addisjon / Subtraksjon" def="Absolutte standardavvik adderes i kvadratur: s = √(s₁² + s₂² + ...)" color={C.green} />
        <Pill term="Multiplikasjon / Divisjon" def="Relative standardavvik adderes i kvadratur: s_rel = √((s₁/x₁)² + (s₂/x₂)² + ...)" color={C.amber} />
        <Pill term="Gjeldende siffer" def="Standardavviket oppgis med 1 gjeldende siffer. Svaret rundes til samme desimal." color={C.red} />
      </div>
    </Section>

    <Section num="02" title="Forklaring">
      <Prose>
        <p style={{ marginBottom: "12px" }}>Feilforplanting handler om å beregne usikkerheten i et <em>sammensatt resultat</em> basert på usikkerhetene til enkeltmålingene. Reglene avhenger av hvilken matematisk operasjon som utføres:</p>

        <InfoBox color={C.green} title="Regel 1: Addisjon / Subtraksjon (y = a ± b)">
          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "14px", color: C.t1 }}>s<sub>y</sub> = √(s<sub>a</sub>² + s<sub>b</sub>²)</div>
          <div style={{ marginTop: "6px", fontSize: "13px" }}>Bruk <strong style={{ color: C.t1 }}>absolutte</strong> standardavvik. Legg dem sammen i kvadratur.</div>
        </InfoBox>

        <InfoBox color={C.amber} title="Regel 2: Multiplikasjon / Divisjon (y = a × b / c)">
          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "14px", color: C.t1 }}>s<sub>y</sub> = |y| × √((s<sub>a</sub>/a)² + (s<sub>b</sub>/b)² + (s<sub>c</sub>/c)²)</div>
          <div style={{ marginTop: "6px", fontSize: "13px" }}>Bruk <strong style={{ color: C.t1 }}>relative</strong> standardavvik. Multipliser sluttresultatet med den kombinerte relative usikkerheten.</div>
        </InfoBox>

        <InfoBox color={C.accent} title="Kombinasjon (teller med ± og nevner med ×/÷)">
          <div style={{ fontSize: "13px" }}>
            <div>1. Beregn s for teller/nevner separat med <span style={{ color: C.green }}>regel 1</span></div>
            <div>2. Kombiner teller og nevner med <span style={{ color: C.amber }}>regel 2</span></div>
            <div style={{ marginTop: "6px", fontFamily: "'JetBrains Mono',monospace", color: C.t1, fontSize: "14px" }}>Alltid: beregn svaret først, så standardavviket</div>
          </div>
        </InfoBox>
      </Prose>
    </Section>

    <Section num="03" title="Visuell illustrasjon — Beslutningstre">
      <svg viewBox="0 0 420 280" width="100%" style={{ maxWidth: "500px", display: "block", margin: "0 auto" }}>
        <rect x={120} y={10} width={180} height={40} rx={8} fill={C.accent + "22"} stroke={C.accent} strokeWidth={1.5} />
        <text x={210} y={35} fill={C.t1} fontSize="13" textAnchor="middle" fontFamily="Plus Jakarta Sans" fontWeight="600">Hvilken operasjon?</text>
        <line x1={160} y1={50} x2={90} y2={90} stroke={C.border} strokeWidth={1.5} />
        <line x1={260} y1={50} x2={330} y2={90} stroke={C.border} strokeWidth={1.5} />
        <rect x={10} y={90} width={160} height={40} rx={8} fill={C.green + "22"} stroke={C.green} strokeWidth={1.5} />
        <text x={90} y={115} fill={C.green} fontSize="12" textAnchor="middle" fontFamily="Plus Jakarta Sans" fontWeight="600">Addisjon / Subtraksjon</text>
        <rect x={250} y={90} width={160} height={40} rx={8} fill={C.amber + "22"} stroke={C.amber} strokeWidth={1.5} />
        <text x={330} y={115} fill={C.amber} fontSize="12" textAnchor="middle" fontFamily="Plus Jakarta Sans" fontWeight="600">Multiplikasjon / Divisjon</text>
        <line x1={90} y1={130} x2={90} y2={160} stroke={C.border} strokeWidth={1.5} />
        <line x1={330} y1={130} x2={330} y2={160} stroke={C.border} strokeWidth={1.5} />
        <rect x={10} y={160} width={160} height={50} rx={8} fill={C.bg} stroke={C.border} strokeWidth={1} />
        <text x={90} y={182} fill={C.t1} fontSize="11" textAnchor="middle" fontFamily="JetBrains Mono">s = √(s₁² + s₂²)</text>
        <text x={90} y={200} fill={C.t2} fontSize="10" textAnchor="middle" fontFamily="Source Sans 3">Absolutte stdavvik</text>
        <rect x={250} y={160} width={160} height={50} rx={8} fill={C.bg} stroke={C.border} strokeWidth={1} />
        <text x={330} y={182} fill={C.t1} fontSize="10" textAnchor="middle" fontFamily="JetBrains Mono">s = |y|·√((s₁/x₁)²+...)</text>
        <text x={330} y={200} fill={C.t2} fontSize="10" textAnchor="middle" fontFamily="Source Sans 3">Relative stdavvik</text>
        <line x1={90} y1={210} x2={210} y2={245} stroke={C.border} strokeWidth={1} strokeDasharray="4 3" />
        <line x1={330} y1={210} x2={210} y2={245} stroke={C.border} strokeWidth={1} strokeDasharray="4 3" />
        <rect x={130} y={240} width={160} height={35} rx={8} fill={C.red + "22"} stroke={C.red} strokeWidth={1.5} />
        <text x={210} y={262} fill={C.red} fontSize="11" textAnchor="middle" fontFamily="Plus Jakarta Sans" fontWeight="600">Rund av: 1 gj.siffer i s</text>
      </svg>
    </Section>

    <Section num="04" title="Eksempel">
      <p style={{ color: C.t2, fontSize: "14px", marginBottom: "14px", lineHeight: 1.6 }}>
        Beregn: <Formula>0,45(±0,02) / [1,03(±0,07) + 0,31(±0,01)]</Formula> <span style={{ color: C.accent, fontSize: "12px" }}>(V2022)</span>
      </p>
      <Step number={1} title="Beregn nevneren">
        <Formula>1,03 + 0,31 = 1,34</Formula>
      </Step>
      <Step number={2} title="Standardavvik nevner (addisjon → regel 1)">
        <Formula>s<sub>nevner</sub> = √(0,07² + 0,01²) = √(0,0049 + 0,0001) ≈ <strong style={{ color: C.green }}>0,07</strong></Formula>
      </Step>
      <Step number={3} title="Beregn brøken">
        <Formula>y = 0,45 / 1,34 ≈ 0,336</Formula>
      </Step>
      <Step number={4} title="Standardavvik resultat (divisjon → regel 2)">
        <Formula>s = 0,336 × √((0,02/0,45)² + (0,07/1,34)²)</Formula><br />
        <Formula>s = 0,336 × √(0,00198 + 0,00273)</Formula><br />
        <Formula>s = 0,336 × 0,0687 ≈ <strong style={{ color: C.amber }}>0,02</strong></Formula>
      </Step>
      <Step number={5} title="Rund av korrekt" isLast>
        <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "15px", color: C.accent, fontWeight: 600 }}>Svar: 0,34 (±0,02)</div>
        <div style={{ marginTop: "4px", fontSize: "13px" }}>Standardavviket har 1 gjeldende siffer → svaret rundes til samme desimal.</div>
      </Step>
    </Section>

    <HuskeBox>
      <div style={{ color: C.t1, fontSize: "15px", lineHeight: 1.7 }}>
        <strong style={{ color: C.accent, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>«Pluss/minus → pluss i kvadratur. Ganger/deler → relative i kvadratur.»</strong><br />
        <span style={{ color: C.t2, fontSize: "13px" }}>Huskeregel: + − bruker <strong>absolutte</strong> s-verdier. × ÷ bruker <strong>relative</strong> s/x-verdier. Begge adderes som √(Σ²).</span>
        <div style={{ marginTop: "10px", padding: "10px", background: C.card, borderRadius: "8px", border: `1px solid ${C.border}`, fontFamily: "'JetBrains Mono',monospace", fontSize: "12px", color: C.red }}>
          ALLTID: Beregn svar → beregn s → rund av s til 1 siffer → rund av svar til samme desimal
        </div>
      </div>
    </HuskeBox>

    <ExamBox>
      <strong style={{ color: C.red }}>⚡ Aller viktigste emne — kommer HVERT ÅR!</strong><br />
      V2021 (oppg 2), V2022 (oppg 9), V2023 (oppg 1a), V2024 (oppg 1a), V2025 (oppg 2a). Alltid 4+ poeng. Varianter inkluderer ulike kombinasjoner av +/− i teller og ×/÷ mellom teller/nevner. Drill denne til du kan den i søvne.
    </ExamBox>
  </>);
}

// ═══════════════════════════════════════════════════════════════
// TAB 1.4 — Q-TEST OG EKSTREMVERDIER
// ═══════════════════════════════════════════════════════════════
function QTestTable() {
  const data = [
    [3, 0.941, 0.970, 0.994], [4, 0.765, 0.829, 0.926], [5, 0.642, 0.710, 0.821],
    [6, 0.560, 0.625, 0.740], [7, 0.507, 0.568, 0.680], [8, 0.468, 0.526, 0.634],
    [9, 0.437, 0.493, 0.598], [10, 0.412, 0.466, 0.568],
  ];
  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "'JetBrains Mono',monospace", fontSize: "12px" }}>
        <thead>
          <tr>
            {["N", "90 %", "95 %", "99 %"].map(h => (
              <th key={h} style={{ padding: "8px 12px", borderBottom: `2px solid ${C.accent}`, color: C.accent, textAlign: "center", fontWeight: 600 }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map(([n, ...vals]) => (
            <tr key={n}>
              <td style={{ padding: "6px 12px", borderBottom: `1px solid ${C.border}`, color: C.t1, textAlign: "center", fontWeight: 600 }}>{n}</td>
              {vals.map((v, i) => (
                <td key={i} style={{ padding: "6px 12px", borderBottom: `1px solid ${C.border}`, color: C.t2, textAlign: "center" }}>{v.toFixed(3)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Tab14() {
  return (<>
    <Section num="01" title="Nøkkelbegreper">
      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
        <Pill term="Ekstremverdi (utligger)" def="Datapunkt som avviker mye fra de andre. Kan skyldes grov feil eller naturlig variasjon." />
        <Pill term="Q-test" def="Statistisk test for å avgjøre om en utligger skal forkastes. Sammenligner Q med Q_kritisk." color={C.red} />
        <Pill term="Q_kritisk" def="Tabellverdi som avhenger av antall observasjoner (N) og konfidensnivå (90/95/99 %)." color={C.amber} />
        <Pill term="Forkast/behold" def="Q > Q_krit → forkast utliggeren. Q < Q_krit → behold." color={C.green} />
      </div>
    </Section>

    <Section num="02" title="Forklaring">
      <Prose>
        <p style={{ marginBottom: "12px" }}>Når en måling avviker kraftig fra de andre, må vi avgjøre om den skyldes en <span style={{ color: C.red }}>grov feil</span> (forkast) eller <span style={{ color: C.amber }}>naturlig variasjon</span> (behold). Q-testen gir et statistisk svar.</p>
        <FormulaBlock>
          <div style={{ fontSize: "16px", marginBottom: "4px" }}>Q = |x<sub>q</sub> − x<sub>n</sub>| / w</div>
          <div style={{ color: C.t2, fontSize: "13px", marginTop: "6px" }}>
            x<sub>q</sub> = verdien du mistenker (utliggeren)<br />
            x<sub>n</sub> = nærmeste nabo i datasettet<br />
            w = spredningen = (største verdi − minste verdi)
          </div>
        </FormulaBlock>
        <InfoBox color={C.red} title="Beslutningsregel:">
          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "14px", color: C.t1 }}>
            Q {">"} Q<sub>kritisk</sub> → <span style={{ color: C.red }}>FORKAST</span> utliggeren<br />
            Q {"<"} Q<sub>kritisk</sub> → <span style={{ color: C.green }}>BEHOLD</span> utliggeren
          </div>
        </InfoBox>
        <p style={{ marginBottom: "12px" }}>Q<sub>kritisk</sub> finnes i tabellen under, og avhenger av antall observasjoner og ønsket konfidensnivå.</p>
      </Prose>
    </Section>

    <Section num="03" title="Visuell illustrasjon — Q_kritisk-tabell">
      <p style={{ color: C.t2, fontSize: "13px", marginBottom: "12px" }}>Forkast utliggeren hvis Q {">"} Q<sub>kritisk</sub>:</p>
      <QTestTable />
    </Section>

    <Section num="04" title="Eksempel">
      <p style={{ color: C.t2, fontSize: "14px", marginBottom: "14px", lineHeight: 1.6 }}>
        6 paralleller av en titrering (sortert): <Formula>19,32 — 19,53 — 19,57 — 19,58 — 19,63 — 19,65 mL</Formula>. Bruk Q-test med 95 % konfidens. <span style={{ color: C.accent, fontSize: "12px" }}>(V2022 oppg 10)</span>
      </p>
      <Step number={1} title="Identifiser utliggeren">
        <Formula>x<sub>q</sub> = 19,32 mL</Formula> (laveste verdi, avviker mest)
      </Step>
      <Step number={2} title="Finn nærmeste nabo">
        <Formula>x<sub>n</sub> = 19,53 mL</Formula>
      </Step>
      <Step number={3} title="Beregn Q">
        <Formula>w = 19,65 − 19,32 = 0,33</Formula><br />
        <Formula>Q = |19,32 − 19,53| / 0,33 = 0,21 / 0,33 ≈ <strong style={{ color: C.accent }}>0,64</strong></Formula>
      </Step>
      <Step number={4} title="Sammenlign med Q_kritisk" isLast>
        <Formula>N = 6, 95 % konfidens → Q<sub>kritisk</sub> = 0,625</Formula><br />
        <Formula>Q = 0,64 {">"} 0,625 = Q<sub>kritisk</sub></Formula><br />
        <div style={{ marginTop: "6px", fontFamily: "'JetBrains Mono',monospace", fontSize: "14px", color: C.red, fontWeight: 600 }}>→ FORKAST den første parallellen</div>
      </Step>
    </Section>

    <HuskeBox>
      <div style={{ color: C.t1, fontSize: "15px", lineHeight: 1.7 }}>
        <strong style={{ color: C.accent, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>«Q = gap / spread»</strong><br />
        <span style={{ color: C.t2, fontSize: "13px" }}>Gap = avstand til naboen. Spread = total spredning. Stor Q betyr at utliggeren er «for langt unna» relativt til datasettet.</span>
        <div style={{ marginTop: "10px", padding: "10px", background: C.card, borderRadius: "8px", border: `1px solid ${C.border}`, fontFamily: "'JetBrains Mono',monospace", fontSize: "12px", color: C.t2 }}>
          Prosedyre: Sorter data → Identifiser utligger → Beregn Q → Slå opp Q<sub>krit</sub> → Forkast/behold
        </div>
      </div>
    </HuskeBox>

    <ExamBox>
      <strong style={{ color: C.t1 }}>V2022 oppg 10:</strong> Full beregning med 6 varianter (ulike tall, ulike konfidensnivåer). Noen varianter gir forkast, andre behold — du MÅ slå opp riktig Q<sub>kritisk</sub>. Tabellen gis på formelarket.
    </ExamBox>
  </>);
}

// ═══════════════════════════════════════════════════════════════
// TAB 1.5 — KONFIDENSINTERVALL OG HYPOTESETESTING
// ═══════════════════════════════════════════════════════════════
function Tab15() {
  return (<>
    <Section num="01" title="Nøkkelbegreper">
      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
        <Pill term="Konfidensintervall" def="Intervallet som med en viss sannsynlighet inneholder den sanne verdien μ." />
        <Pill term="Konfidensnivå" def="Sannsynligheten for at μ er innenfor intervallet. Vanligvis 95 % (≈ ±2σ)." color={C.green} />
        <Pill term="Student t" def="t-verdi som avhenger av konfidensnivå og antall frihetsgrader (N−1)." color={C.amber} />
        <Pill term="Hypotesetesting" def="Statistisk test for å avgjøre om en påstand om data er sann. Bruker nullhypotese H₀." color={C.violet} />
        <Pill term="ANOVA" def="Variansanalyse — sammenligner gjennomsnitt for mer enn to grupper." />
      </div>
    </Section>

    <Section num="02" title="Forklaring">
      <Prose>
        <p style={{ marginBottom: "12px" }}>Et <strong style={{ color: C.t1 }}>konfidensintervall</strong> angir hvor vi forventer at den sanne verdien μ ligger, gitt våre målinger. Ved ukjent σ (som nesten alltid i praksis), bruker vi t-fordelingen:</p>
        <FormulaBlock>
          <div style={{ fontSize: "16px" }}>KI = x̄ ± (t · s) / √N</div>
          <div style={{ color: C.t2, fontSize: "12px", marginTop: "6px" }}>t avhenger av konfidensnivå og frihetsgrader (df = N − 1)</div>
        </FormulaBlock>
        <p style={{ marginBottom: "12px" }}><strong style={{ color: C.t1 }}>Hypotesetesting</strong> brukes til å avgjøre om observerte forskjeller er statistisk signifikante:</p>
        <InfoBox color={C.accent} title="Tre typiske anvendelser:">
          <div style={{ display: "grid", gap: "8px" }}>
            <div><strong style={{ color: C.t1 }}>a)</strong> Er μ = μ₀? (sammenligne med kjent verdi)</div>
            <div><strong style={{ color: C.t1 }}>b)</strong> Er μ {">"} μ₀ eller μ {"<"} μ₀? (ensidig test)</div>
            <div><strong style={{ color: C.t1 }}>c)</strong> Er μ₁ = μ₂? (sammenligne to datasett)</div>
          </div>
        </InfoBox>
        <p style={{ marginBottom: "12px" }}><strong style={{ color: C.t1 }}>ANOVA</strong> (variansanalyse) utvider dette til å sammenligne gjennomsnittene til <em>flere</em> grupper. Nullhypotesen er at alle gjennomsnittene er like. ANOVA sammenligner variansen <em>mellom</em> gruppene med variansen <em>innad</em> i gruppene.</p>
      </Prose>
    </Section>

    <Section num="03" title="Visuell illustrasjon — Konfidensintervall">
      <svg viewBox="0 0 420 160" width="100%" style={{ maxWidth: "480px", display: "block", margin: "0 auto" }}>
        <line x1={40} y1={80} x2={380} y2={80} stroke={C.border} strokeWidth={1} />
        {/* 95% CI */}
        <line x1={120} y1={50} x2={280} y2={50} stroke={C.accent} strokeWidth={3} />
        <line x1={120} y1={42} x2={120} y2={58} stroke={C.accent} strokeWidth={2} />
        <line x1={280} y1={42} x2={280} y2={58} stroke={C.accent} strokeWidth={2} />
        <circle cx={200} cy={50} r={5} fill={C.accent} />
        <text x={200} y={38} fill={C.accent} fontSize="11" textAnchor="middle" fontFamily="Plus Jakarta Sans" fontWeight="600">95 % KI</text>
        {/* 99% CI */}
        <line x1={80} y1={80} x2={320} y2={80} stroke={C.amber} strokeWidth={3} opacity={0.7} />
        <line x1={80} y1={72} x2={80} y2={88} stroke={C.amber} strokeWidth={2} opacity={0.7} />
        <line x1={320} y1={72} x2={320} y2={88} stroke={C.amber} strokeWidth={2} opacity={0.7} />
        <circle cx={200} cy={80} r={5} fill={C.amber} opacity={0.7} />
        <text x={200} y={100} fill={C.amber} fontSize="11" textAnchor="middle" fontFamily="Plus Jakarta Sans" fontWeight="600">99 % KI</text>
        {/* Labels */}
        <text x={200} y={130} fill={C.t1} fontSize="12" textAnchor="middle" fontFamily="JetBrains Mono">x̄</text>
        <text x={120} y={130} fill={C.t2} fontSize="10" textAnchor="middle" fontFamily="JetBrains Mono">x̄ − ts/√N</text>
        <text x={280} y={130} fill={C.t2} fontSize="10" textAnchor="middle" fontFamily="JetBrains Mono">x̄ + ts/√N</text>
        <text x={355} y={70} fill={C.t2} fontSize="10" fontFamily="Source Sans 3">Høyere konfidens</text>
        <text x={355} y={82} fill={C.t2} fontSize="10" fontFamily="Source Sans 3">= bredere intervall</text>
      </svg>
    </Section>

    <Section num="04" title="Eksempel">
      <p style={{ color: C.t2, fontSize: "14px", marginBottom: "14px", lineHeight: 1.6 }}>
        5 målinger gir x̄ = 0,1025 M, s = 0,00044 M. Finn 95 % konfidensintervall. (t = 2,776 for df = 4, 95 %)
      </p>
      <Step number={1} title="Sett inn i formelen">
        <Formula>KI = x̄ ± (t · s) / √N = 0,1025 ± (2,776 × 0,00044) / √5</Formula>
      </Step>
      <Step number={2} title="Beregn" isLast>
        <Formula>KI = 0,1025 ± 0,00055</Formula><br />
        <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "14px", color: C.accent, fontWeight: 600, marginTop: "6px" }}>μ ligger i [0,1020 , 0,1031] med 95 % konfidens</div>
      </Step>
    </Section>

    <HuskeBox>
      <div style={{ color: C.t1, fontSize: "15px", lineHeight: 1.7 }}>
        <strong style={{ color: C.accent, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>Flere målinger = smalere intervall</strong><br />
        <span style={{ color: C.t2, fontSize: "13px" }}>Fordi √N er i nevneren. Doble antall målinger → KI reduseres med faktor √2 ≈ 1,4.</span>
      </div>
    </HuskeBox>

    <ExamBox>Konfidensintervall testes sjelden som isolert beregning, men konseptet dukker opp i forståelsesspørsmål. Viktigere å forstå <em>når</em> man bruker t-test vs F-test vs ANOVA.</ExamBox>
  </>);
}

// ═══════════════════════════════════════════════════════════════
// TAB 1.6 — KALIBRERING, LOD, LOQ OG SENSITIVITET
// ═══════════════════════════════════════════════════════════════
function CalibrationPlot() {
  const points = [[0.05, 0.08], [0.10, 0.19], [0.20, 0.38], [0.30, 0.61], [0.40, 0.82]];
  const w = 400, h = 220, px = 60, py = 20, pw = w - px - 20, ph = h - py - 40;
  const toX = v => px + v / 0.45 * pw;
  const toY = v => h - py - 20 - v / 0.95 * ph;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} width="100%" style={{ maxWidth: "460px", display: "block", margin: "0 auto" }}>
      <line x1={px} y1={h - py - 20} x2={w - 20} y2={h - py - 20} stroke={C.border} strokeWidth={1} />
      <line x1={px} y1={10} x2={px} y2={h - py - 20} stroke={C.border} strokeWidth={1} />
      <text x={w / 2} y={h - 2} fill={C.t2} fontSize="11" textAnchor="middle" fontFamily="Source Sans 3">Analyttkonsentrasjon</text>
      <text x={14} y={h / 2} fill={C.t2} fontSize="11" textAnchor="middle" fontFamily="Source Sans 3" transform={`rotate(-90, 14, ${h / 2})`}>Respons</text>
      {/* Best fit line */}
      <line x1={toX(0)} y1={toY(-0.02)} x2={toX(0.45)} y2={toY(0.93)} stroke={C.accent} strokeWidth={2} strokeDasharray="6 3" opacity={0.6} />
      {/* Points */}
      {points.map(([x, y], i) => <circle key={i} cx={toX(x)} cy={toY(y)} r={5} fill={C.accent} />)}
      {/* LOD marker */}
      <line x1={toX(0.02)} y1={toY(0)} x2={toX(0.02)} y2={toY(0.06)} stroke={C.red} strokeWidth={1.5} strokeDasharray="3 2" />
      <text x={toX(0.02)} y={toY(0.08)} fill={C.red} fontSize="9" textAnchor="middle" fontFamily="JetBrains Mono">LOD</text>
      {/* LOQ marker */}
      <line x1={toX(0.06)} y1={toY(0)} x2={toX(0.06)} y2={toY(0.10)} stroke={C.amber} strokeWidth={1.5} strokeDasharray="3 2" />
      <text x={toX(0.06)} y={toY(0.12)} fill={C.amber} fontSize="9" textAnchor="middle" fontFamily="JetBrains Mono">LOQ</text>
      {/* Slope label */}
      <text x={toX(0.30)} y={toY(0.72)} fill={C.t2} fontSize="10" fontFamily="Source Sans 3">stigningstall = sensitivitet</text>
    </svg>
  );
}

function Tab16() {
  return (<>
    <Section num="01" title="Nøkkelbegreper">
      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
        <Pill term="Kalibreringskurve" def="Graf som viser sammenhengen mellom signal og konsentrasjon. Ønsker lineær!" />
        <Pill term="Sensitivitet" def="Stigningstallet til kalibreringskurven. Høy → stor signalendring per konsentrasjonsendring." color={C.green} />
        <Pill term="LOD" def="Deteksjonsgrense: laveste konsentrasjon som kan detekteres. S/N = 3." color={C.red} />
        <Pill term="LOQ" def="Kvantifiseringsgrense: laveste konsentrasjon som kan kvantifiseres. S/N = 10." color={C.amber} />
        <Pill term="Ekstern standard" def="Sammenligner prøvesignal med kalibreringskurve fra standardløsninger." />
        <Pill term="Intern standard" def="Tilsetter kjent mengde referansestoff til alle prøver. Sammenligner signal-forholdet." color={C.violet} />
      </div>
    </Section>

    <Section num="02" title="Forklaring">
      <Prose>
        <p style={{ marginBottom: "12px" }}><strong style={{ color: C.t1 }}>Kalibrering</strong> er nødvendig i nesten all kvantitativ analyse. Den gir forholdet mellom den målte størrelsen (signal) og analyttkonsentrasjonen.</p>
        <FormulaBlock>
          <div style={{ marginBottom: "6px" }}>LOD = S/N = 3 (deteksjon)</div>
          <div>LOQ = S/N = 10 (kvantifisering)</div>
          <div style={{ color: C.t2, fontSize: "12px", marginTop: "6px" }}>S = signal, N = støy (noise)</div>
        </FormulaBlock>
        <InfoBox color={C.green} title="Ideell sensor:">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4px", fontFamily: "'JetBrains Mono',monospace", fontSize: "12px" }}>
            <div>Sensitivitet: <span style={{ color: C.green }}>HØY</span></div>
            <div>LOD: <span style={{ color: C.green }}>LAV</span></div>
            <div>S/N-forhold: <span style={{ color: C.green }}>HØYT</span></div>
            <div>LOQ: <span style={{ color: C.green }}>LAV</span></div>
            <div>Selektivitet: <span style={{ color: C.green }}>HØY</span></div>
            <div></div>
          </div>
        </InfoBox>
        <InfoBox color={C.accent} title="Ekstern vs intern standard:">
          <div><strong style={{ color: C.t1 }}>Ekstern:</strong> Lager kalibreringskurve fra separate standardløsninger. Enklere, men påvirkes mer av matrikseffekter.</div>
          <div style={{ marginTop: "4px" }}><strong style={{ color: C.t1 }}>Intern:</strong> Tilsetter referansestoff til alle prøver. Korrigerer for variasjon i prøvevolum/injeksjon.</div>
        </InfoBox>
      </Prose>
    </Section>

    <Section num="03" title="Visuell illustrasjon">
      <p style={{ color: C.t2, fontSize: "13px", marginBottom: "12px" }}>Kalibreringskurve med LOD og LOQ markert. Stigningstallet = sensitiviteten.</p>
      <CalibrationPlot />
    </Section>

    <Section num="04" title="Eksempel">
      <p style={{ color: C.t2, fontSize: "14px", marginBottom: "14px", lineHeight: 1.6 }}>
        To metoder A og B har kalibreringskurver med ulike stigningstall. A har brattere kurve. Hvilken er mer sensitiv? <span style={{ color: C.accent, fontSize: "12px" }}>(V2023 oppg 1b)</span>
      </p>
      <Step number={1} title="Definer sensitivitet">
        <div style={{ fontSize: "13px" }}>Sensitivitet = kalibreringssensitivitet = stigningstallet til kalibreringskurven</div>
      </Step>
      <Step number={2} title="Sammenlign" isLast>
        <div style={{ fontSize: "13px" }}>A har brattere kurve (høyere stigningstall) → <strong style={{ color: C.accent }}>A er mer sensitiv enn B</strong></div>
      </Step>
    </Section>

    <HuskeBox>
      <div style={{ color: C.t1, fontSize: "15px", lineHeight: 1.7 }}>
        <strong style={{ color: C.accent, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>«LOD = 3, LOQ = 10» — tall du bare MÅ huske</strong><br />
        <span style={{ color: C.t2, fontSize: "13px" }}>LOD: kan du <em>se</em> signalet? (3× støy). LOQ: kan du <em>måle</em> det nøyaktig? (10× støy).</span>
      </div>
    </HuskeBox>

    <ExamBox>
      <strong style={{ color: C.t1 }}>V2022 oppg 1b:</strong> Flervalg om LOD/LOQ. <strong style={{ color: C.t1 }}>V2023 oppg 1b:</strong> Kalibreringskurver og sensitivitet. <strong style={{ color: C.t1 }}>V2023 oppg 1d:</strong> Ideell sensor (høy/lav matching). Typisk 1–3 poeng per oppgave.
    </ExamBox>
  </>);
}

// ═══════════════════════════════════════════════════════════════
// TAB 1.7 — GJELDENDE SIFFER OG RAPPORTERING
// ═══════════════════════════════════════════════════════════════
function Tab17() {
  return (<>
    <Section num="01" title="Nøkkelbegreper">
      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
        <Pill term="Gjeldende siffer" def="Alle sikre siffer + det første usikre sifferet. Nuller foran teller ikke!" />
        <Pill term="Avrunding" def="Standardavviket rundes til 1 gjeldende siffer. Svaret rundes til samme desimal." color={C.red} />
        <Pill term="Mellomregning" def="Behold flere siffer enn du trenger underveis. Rund av KUN til slutt." color={C.amber} />
      </div>
    </Section>

    <Section num="02" title="Forklaring">
      <Prose>
        <p style={{ marginBottom: "12px" }}>Korrekt rapportering av resultater er kritisk i analytisk kjemi. Feil avrunding = tapte poeng på eksamen!</p>

        <InfoBox color={C.red} title="Gullregler for rapportering:">
          <div style={{ display: "grid", gap: "6px", fontSize: "14px" }}>
            <div><strong style={{ color: C.t1 }}>1.</strong> Standardavviket skal ha <strong style={{ color: C.red }}>1 gjeldende siffer</strong></div>
            <div><strong style={{ color: C.t1 }}>2.</strong> Svaret rundes av til <strong style={{ color: C.red }}>samme desimal</strong> som standardavviket</div>
            <div><strong style={{ color: C.t1 }}>3.</strong> Det siste sifferet i svaret skal være <strong style={{ color: C.t1 }}>usikkert</strong>, resten sikre</div>
            <div><strong style={{ color: C.t1 }}>4.</strong> Behold <strong style={{ color: C.amber }}>ekstra siffer</strong> i mellomregninger — rund av kun til slutt</div>
          </div>
        </InfoBox>

        <InfoBox color={C.accent} title="Regler for gjeldende siffer:">
          <div style={{ display: "grid", gap: "4px", fontFamily: "'JetBrains Mono',monospace", fontSize: "13px" }}>
            <div><span style={{ color: C.green }}>0,004530</span> → 4 gj.siffer (ledende nuller teller ikke)</div>
            <div><span style={{ color: C.green }}>1,200</span> → 4 gj.siffer (etterfølgende nuller teller!)</div>
            <div><span style={{ color: C.green }}>1200</span> → 2, 3 eller 4 gj.siffer (tvetydig — bruk vitenskapelig notasjon)</div>
            <div><span style={{ color: C.green }}>1,200 × 10³</span> → 4 gj.siffer (utvetydig)</div>
          </div>
        </InfoBox>
      </Prose>
    </Section>

    <Section num="03" title="Visuell illustrasjon — Riktig vs feil rapportering">
      <div style={{ display: "grid", gap: "8px" }}>
        {[
          { calc: "5,90 ± 0,16", wrong: "5,90 ± 0,16", right: "5,9 ± 0,2", why: "s rundes til 1 gj.siffer (0,2), svar til samme desimal" },
          { calc: "0,239 ± 0,0106", wrong: "0,239 ± 0,0106", right: "0,24 ± 0,01", why: "s = 0,01, svar rundes til hundredelene" },
          { calc: "1,09 ± 0,14", wrong: "1,09 ± 0,14", right: "1,1 ± 0,1", why: "s = 0,1, svar rundes til én desimal" },
        ].map((ex, i) => (
          <div key={i} style={{ background: C.bg, borderRadius: "10px", padding: "14px", border: `1px solid ${C.border}`, display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
            <div>
              <div style={{ fontSize: "10px", color: C.red, fontWeight: 600, marginBottom: "4px", textTransform: "uppercase", letterSpacing: "1px" }}>❌ Feil</div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "13px", color: C.t2, textDecoration: "line-through" }}>{ex.wrong}</div>
            </div>
            <div>
              <div style={{ fontSize: "10px", color: C.green, fontWeight: 600, marginBottom: "4px", textTransform: "uppercase", letterSpacing: "1px" }}>✅ Riktig</div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "13px", color: C.t1 }}>{ex.right}</div>
            </div>
            <div style={{ gridColumn: "1 / -1", fontSize: "12px", color: C.t2 }}>{ex.why}</div>
          </div>
        ))}
      </div>
    </Section>

    <Section num="04" title="Eksempel">
      <p style={{ color: C.t2, fontSize: "14px", marginBottom: "14px", lineHeight: 1.6 }}>
        Du beregner: <Formula>12,34(±0,05) / [1,67(±0,04) + 0,42(±0,04)]</Formula> <span style={{ color: C.accent, fontSize: "12px" }}>(V2025 oppg 2a)</span>
      </p>
      <Step number={1} title="Beregn nevner og dens s">
        <Formula>nevner = 1,67 + 0,42 = 2,09</Formula><br />
        <Formula>s<sub>nevner</sub> = √(0,04² + 0,04²) ≈ 0,057</Formula>
      </Step>
      <Step number={2} title="Beregn resultat">
        <Formula>y = 12,34 / 2,09 ≈ 5,904</Formula>
      </Step>
      <Step number={3} title="Beregn s for resultatet">
        <Formula>s = 5,904 × √((0,05/12,34)² + (0,057/2,09)²) ≈ 0,163</Formula>
      </Step>
      <Step number={4} title="Rund av korrekt" isLast>
        <div style={{ fontSize: "13px", marginBottom: "6px" }}>s = 0,163 → rundes til 1 gj.siffer → <strong style={{ color: C.red }}>s = 0,2</strong></div>
        <div style={{ fontSize: "13px", marginBottom: "6px" }}>Svar rundes til samme desimal (tiendedeler) → <strong style={{ color: C.accent }}>5,9</strong></div>
        <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "16px", color: C.accent, fontWeight: 600 }}>Svar: 5,9 ± 0,2</div>
      </Step>
    </Section>

    <HuskeBox>
      <div style={{ color: C.t1, fontSize: "15px", lineHeight: 1.7 }}>
        <strong style={{ color: C.accent, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>«1-siffer i s, rund svar til match»</strong><br />
        <span style={{ color: C.t2, fontSize: "13px" }}>Tre steg: (1) beregn s, (2) rund s til 1 gj.siffer, (3) rund svar til samme desimalplass.</span>
        <div style={{ marginTop: "10px", padding: "10px", background: C.card, borderRadius: "8px", border: `1px solid ${C.border}`, fontFamily: "'JetBrains Mono',monospace", fontSize: "12px", color: C.red }}>
          Vanligste eksamensfeil: «Ikke stole på at formler gir riktig antall gjeldende siffer» — Forberedelsesguiden
        </div>
      </div>
    </HuskeBox>

    <ExamBox>
      Riktig avrunding er en del av <em>alle</em> feilforplantningsoppgaver (V2021–V2025). Du taper poeng hvis du oppgir for mange eller for få siffer. Forberedelsesguiden lister dette som fallgruve #1.
    </ExamBox>
  </>);
}

// ═══════════════════════════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════════════════════════
const TAB_COMPONENTS = [Tab11, Tab12, Tab13, Tab14, Tab15, Tab16, Tab17];

export default function Emne1StatistikkOgFeil() {
  const [activeTab, setActiveTab] = useState(0);
  const TabContent = TAB_COMPONENTS[activeTab];

  return (
    <div style={{ background: C.bg, minHeight: "100vh", fontFamily: "'Source Sans 3',sans-serif" }}>
      <style>{fonts}</style>
      <style>{`* { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { height: 4px; } ::-webkit-scrollbar-track { background: ${C.bg}; } ::-webkit-scrollbar-thumb { background: ${C.border}; border-radius: 4px; }`}</style>

      {/* Header */}
      <div style={{
        background: `linear-gradient(135deg, ${C.accent}, ${C.accent}cc)`, padding: "24px 24px 16px",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
          background: "repeating-linear-gradient(90deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 40px)" }} />
        <div style={{ fontFamily: "'Source Sans 3',sans-serif", fontSize: "11px", fontWeight: 600, color: "rgba(255,255,255,0.6)",
          textTransform: "uppercase", letterSpacing: "2px", marginBottom: "6px" }}>IMAK2004 Kjemisk Analyse</div>
        <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: "24px", fontWeight: 800, color: "#fff", lineHeight: 1.2 }}>
          Emne 1 — Statistikk og feil
        </div>
      </div>

      {/* Tab bar */}
      <div style={{
        display: "flex", gap: "4px", padding: "8px 12px", overflowX: "auto",
        background: C.bg, borderBottom: `1px solid ${C.border}`, position: "sticky", top: 0, zIndex: 100,
      }}>
        {TABS.map((tab, i) => (
          <button key={tab.id} onClick={() => setActiveTab(i)} style={{
            background: activeTab === i ? C.accent + "22" : "transparent",
            border: `1px solid ${activeTab === i ? C.accent : "transparent"}`,
            color: activeTab === i ? C.accent : C.t2,
            padding: "8px 12px", borderRadius: "8px", fontFamily: "'Source Sans 3',sans-serif",
            fontSize: "12px", fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap",
            transition: "all 0.2s", flexShrink: 0,
          }}>
            <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", opacity: 0.6, marginRight: "4px" }}>{tab.id}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab subtitle with fire rating */}
      <div style={{ padding: "12px 24px 0", display: "flex", alignItems: "center", gap: "8px" }}>
        <span style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: "14px", fontWeight: 700, color: C.t1 }}>
          {TABS[activeTab].id} {TABS[activeTab].label}
        </span>
        <span style={{ fontSize: "12px" }}>{TABS[activeTab].fire}</span>
      </div>

      {/* Content */}
      <div style={{ padding: "16px 20px 40px", maxWidth: "800px", margin: "0 auto" }}>
        <TabContent />
      </div>
    </div>
  );
}
