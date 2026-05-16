import { useState, useEffect, useRef } from "react";

// ─── Google Fonts ────────────────────────────────────────────────
const fontLink = document.createElement("link");
fontLink.href = "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Source+Sans+3:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=JetBrains+Mono:wght@400;500;600;700&display=swap";
fontLink.rel = "stylesheet";
document.head.appendChild(fontLink);

// ─── Constants ───────────────────────────────────────────────────
const AMBER = "#F59E0B";
const AMBER_DIM = "#78350F";
const AMBER_GLOW = "#FDE68A";
const BG = "#0F172A";
const CARD = "#1E293B";
const BORDER = "#334155";
const TEXT = "#F8FAFC";
const TEXT2 = "#94A3B8";
const CARD_INNER = "#162032";

// ─── Reusable Components ────────────────────────────────────────
function Pill({ children, def, color = AMBER }) {
  const [show, setShow] = useState(false);
  return (
    <span style={{ position: "relative", display: "inline-block", margin: "4px 4px" }}>
      <span
        onClick={() => setShow(!show)}
        style={{
          display: "inline-block",
          padding: "4px 14px",
          borderRadius: 999,
          border: `1px solid ${color}44`,
          background: `${color}18`,
          color: color,
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 13,
          fontWeight: 600,
          cursor: "pointer",
          transition: "all 0.2s",
          userSelect: "none",
        }}
      >
        {children}
      </span>
      {show && (
        <span
          style={{
            position: "absolute",
            left: 0,
            top: "110%",
            zIndex: 100,
            background: "#0F172A",
            border: `1px solid ${BORDER}`,
            borderRadius: 8,
            padding: "8px 14px",
            fontSize: 13,
            color: TEXT2,
            fontFamily: "'Source Sans 3', sans-serif",
            minWidth: 200,
            maxWidth: 340,
            boxShadow: `0 8px 30px #00000066`,
            lineHeight: 1.5,
          }}
        >
          {def}
        </span>
      )}
    </span>
  );
}

function Formula({ children }) {
  return (
    <span
      style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 14,
        color: AMBER_GLOW,
        background: `${AMBER}12`,
        padding: "2px 8px",
        borderRadius: 4,
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </span>
  );
}

function FormulaBlock({ children, label }) {
  return (
    <div
      style={{
        background: CARD_INNER,
        border: `1px solid ${BORDER}`,
        borderLeft: `3px solid ${AMBER}`,
        borderRadius: 8,
        padding: "16px 20px",
        margin: "14px 0",
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 15,
        color: AMBER_GLOW,
        lineHeight: 1.8,
        overflowX: "auto",
      }}
    >
      {label && (
        <div style={{ fontSize: 11, color: TEXT2, fontFamily: "'Source Sans 3', sans-serif", marginBottom: 6, textTransform: "uppercase", letterSpacing: 1 }}>
          {label}
        </div>
      )}
      {children}
    </div>
  );
}

function Section({ title, icon, children }) {
  return (
    <div style={{ marginBottom: 28 }}>
      <h3
        style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: 16,
          fontWeight: 700,
          color: TEXT,
          margin: "0 0 12px 0",
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <span style={{ color: AMBER, fontSize: 18 }}>{icon}</span>
        {title}
      </h3>
      <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 15, color: TEXT2, lineHeight: 1.7 }}>
        {children}
      </div>
    </div>
  );
}

function Huskeregel({ children }) {
  return (
    <div
      style={{
        background: `${AMBER}0D`,
        border: `2px dashed ${AMBER}55`,
        borderRadius: 10,
        padding: "14px 20px",
        margin: "12px 0",
        fontFamily: "'Source Sans 3', sans-serif",
        fontSize: 14,
        color: AMBER_GLOW,
        lineHeight: 1.6,
      }}
    >
      <span style={{ fontWeight: 700, marginRight: 6 }}>💡 Huskeregel:</span>
      {children}
    </div>
  );
}

function Eksamen({ children }) {
  return (
    <div
      style={{
        background: `${CARD_INNER}`,
        border: `1px solid ${BORDER}`,
        borderRadius: 8,
        padding: "12px 18px",
        margin: "12px 0",
        fontFamily: "'Source Sans 3', sans-serif",
        fontSize: 13,
        color: TEXT2,
        lineHeight: 1.6,
      }}
    >
      <span style={{ color: AMBER, fontWeight: 700, marginRight: 6 }}>📝 Eksamensrelevans:</span>
      {children}
    </div>
  );
}

function CollapsibleSteps({ steps }) {
  const [revealed, setRevealed] = useState(0);
  return (
    <div style={{ margin: "10px 0" }}>
      {steps.map((s, i) => (
        <div
          key={i}
          style={{
            opacity: i <= revealed ? 1 : 0.3,
            transition: "opacity 0.3s",
            background: i <= revealed ? CARD_INNER : "transparent",
            border: `1px solid ${i <= revealed ? BORDER : "transparent"}`,
            borderRadius: 6,
            padding: "10px 14px",
            margin: "6px 0",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 13,
            color: i <= revealed ? AMBER_GLOW : TEXT2,
            cursor: i === revealed + 1 ? "pointer" : "default",
            lineHeight: 1.7,
          }}
          onClick={() => {
            if (i === revealed + 1) setRevealed(i);
          }}
        >
          <span style={{ color: AMBER, fontWeight: 700, marginRight: 8 }}>Steg {i + 1}:</span>
          {i <= revealed ? s : "Klikk for å vise..."}
        </div>
      ))}
      {revealed < steps.length - 1 && (
        <button
          onClick={() => setRevealed(r => r + 1)}
          style={{
            marginTop: 6,
            padding: "6px 16px",
            borderRadius: 6,
            border: `1px solid ${AMBER}44`,
            background: `${AMBER}18`,
            color: AMBER,
            fontFamily: "'Source Sans 3', sans-serif",
            fontSize: 13,
            cursor: "pointer",
          }}
        >
          Vis neste steg →
        </button>
      )}
    </div>
  );
}


// ─── TAB 1: Grunnbegreper ────────────────────────────────────────
function Tab1() {
  return (
    <>
      <Section title="Nøkkelbegreper" icon="🏷️">
        <div style={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
          <Pill def="Fordelingskonstant. K = c_SF / c_MF. Stor K → lang retensjonstid.">K (fordelingskonstant)</Pill>
          <Pill def="Tiden det tar før analytten når detektoren (tid i både SF og MF).">t_R (retensjonstid)</Pill>
          <Pill def="Dødtid — tiden et ikke-retardert stoff bruker. Lik for alle komponenter.">t₀ (dødtid)</Pill>
          <Pill def="Justert/relativ retensjonstid: t'_R = t_R − t₀. Kun tid i SF.">t'_R (justert retensj.)</Pill>
          <Pill def="Retensjonsfaktor: k = t'_R / t₀. Ideelt 1 < k < 5.">k (retensjonsfaktor)</Pill>
          <Pill def="Separasjonsfaktor: α = k_B / k_A (der k_B > k_A). Alltid ≥ 1.">α (selektivitetsfaktor)</Pill>
          <Pill def="Eluering = vandring av komponenter gjennom kolonnen. Lite retensjon → rask eluering.">Eluering</Pill>
          <Pill def="Mobilfasen (MF) beveger seg. Stasjonærfasen (SF) står i ro. Separasjon skjer mellom dem.">MF / SF</Pill>
        </div>
      </Section>

      <Section title="Forklaring" icon="📖">
        <p style={{ color: TEXT, fontWeight: 600, marginBottom: 8 }}>Hva er kromatografi?</p>
        <p>
          Kromatografi er en fysisk separasjonsmetode der komponenter i en blanding fordeles mellom to faser: 
          en <em>stasjonærfase</em> (SF) som står stille, og en <em>mobilfase</em> (MF) som beveger seg i en bestemt retning.
          Separasjon avhenger av hvor sterkt hver komponent interagerer med SF sammenlignet med MF.
        </p>

        <p style={{ color: TEXT, fontWeight: 600, margin: "16px 0 8px" }}>Fordelingskonstanten K</p>
        <p>Analytten A fordeler seg mellom SF og MF i en likevekt:</p>
        <FormulaBlock label="Fordelingskonstant">
          K = c<sub>A,SF</sub> / c<sub>A,MF</sub>
        </FormulaBlock>
        <p>
          Stor K → analytten bruker mye tid på SF → lang retensjonstid → eluerer sent.<br/>
          Liten K → kort tid på SF → kort retensjonstid → eluerer raskt.
        </p>

        <p style={{ color: TEXT, fontWeight: 600, margin: "16px 0 8px" }}>Retensjonstid og justert retensjonstid</p>
        <FormulaBlock label="Retensjonstider">
          t<sub>R</sub> = total tid til detektoren (i MF + SF)<br/>
          t₀ = t<sub>M</sub> = dødtid (kun MF, lik for alle komponenter)<br/>
          t'<sub>R</sub> = t<sub>R</sub> − t₀ = tid kun i SF
        </FormulaBlock>

        <p style={{ color: TEXT, fontWeight: 600, margin: "16px 0 8px" }}>Retensjonsfaktor k</p>
        <FormulaBlock label="Retensjonsfaktor">
          k = t'<sub>R</sub> / t₀ = (t<sub>R</sub> − t₀) / t₀
        </FormulaBlock>
        <p>
          Ideelle verdier: <Formula>1 {"<"} k {"<"} 5</Formula> (opptil 10 er OK).<br/>
          k ≪ 1 → dårlig separasjon. k {">"} 20–30 → unødvendig lang analysetid med brede topper.
        </p>

        <p style={{ color: TEXT, fontWeight: 600, margin: "16px 0 8px" }}>Selektivitetsfaktor α</p>
        <FormulaBlock label="Selektivitetsfaktor">
          α = k<sub>B</sub> / k<sub>A</sub> = t'<sub>R,B</sub> / t'<sub>R,A</sub>  (k<sub>B</sub> {">"} k<sub>A</sub>, α ≥ 1)
        </FormulaBlock>
        <p>Sier hvor godt kolonnen kan skille to komponenter. α = 1 betyr ingen separasjon.</p>
      </Section>

      <Section title="Visuell illustrasjon — Kromatogram" icon="📊">
        <svg viewBox="0 0 700 300" style={{ width: "100%", maxWidth: 700 }}>
          <defs>
            <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={AMBER} stopOpacity="0.5" />
              <stop offset="100%" stopColor={AMBER} stopOpacity="0.05" />
            </linearGradient>
          </defs>
          <rect x="0" y="0" width="700" height="300" rx="8" fill={CARD_INNER} />
          {/* Axes */}
          <line x1="80" y1="240" x2="660" y2="240" stroke={BORDER} strokeWidth="2" />
          <line x1="80" y1="240" x2="80" y2="30" stroke={BORDER} strokeWidth="2" />
          <text x="370" y="275" fill={TEXT2} textAnchor="middle" fontFamily="Source Sans 3" fontSize="13">Tid (min)</text>
          <text x="30" y="135" fill={TEXT2} textAnchor="middle" fontFamily="Source Sans 3" fontSize="13" transform="rotate(-90,30,135)">Signal</text>

          {/* t0 peak (dead time) */}
          <path d="M140,240 Q145,200 150,240" fill="none" stroke={TEXT2} strokeWidth="2" />
          <text x="150" y="258" fill={TEXT2} textAnchor="middle" fontFamily="JetBrains Mono" fontSize="11">t₀</text>

          {/* Peak A */}
          <path d="M280,240 Q300,60 320,240" fill="url(#g1)" stroke={AMBER} strokeWidth="2.5" />
          <text x="300" y="48" fill={AMBER} textAnchor="middle" fontFamily="Plus Jakarta Sans" fontSize="14" fontWeight="700">A</text>
          <text x="300" y="258" fill={AMBER} textAnchor="middle" fontFamily="JetBrains Mono" fontSize="11">t<tspan dy="-4" fontSize="8">R,A</tspan></text>
          {/* Width marker A */}
          <line x1="270" y1="237" x2="330" y2="237" stroke={AMBER} strokeWidth="1" strokeDasharray="4,3" />
          <text x="300" y="234" fill={TEXT2} textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9">W_A</text>

          {/* Peak B */}
          <path d="M440,240 Q470,90 500,240" fill="url(#g1)" stroke={AMBER} strokeWidth="2.5" />
          <text x="470" y="78" fill={AMBER} textAnchor="middle" fontFamily="Plus Jakarta Sans" fontSize="14" fontWeight="700">B</text>
          <text x="470" y="258" fill={AMBER} textAnchor="middle" fontFamily="JetBrains Mono" fontSize="11">t<tspan dy="-4" fontSize="8">R,B</tspan></text>
          <line x1="428" y1="237" x2="512" y2="237" stroke={AMBER} strokeWidth="1" strokeDasharray="4,3" />
          <text x="470" y="234" fill={TEXT2} textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9">W_B</text>

          {/* Annotations */}
          <line x1="150" y1="200" x2="300" y2="200" stroke={TEXT2} strokeWidth="1" strokeDasharray="3,3" />
          <text x="225" y="195" fill={TEXT2} textAnchor="middle" fontFamily="JetBrains Mono" fontSize="10">t'_R,A</text>
          <line x1="150" y1="215" x2="470" y2="215" stroke={`${AMBER}66`} strokeWidth="1" strokeDasharray="3,3" />
          <text x="310" y="210" fill={`${AMBER}88`} textAnchor="middle" fontFamily="JetBrains Mono" fontSize="10">t'_R,B</text>
        </svg>
      </Section>

      <Section title="Eksempel" icon="✏️">
        <p style={{ marginBottom: 8 }}>
          Gitt et kromatogram med t₀ = 1.0 min, t<sub>R,A</sub> = 5.6 min, t<sub>R,B</sub> = 8.4 min. Beregn k og α.
        </p>
        <CollapsibleSteps
          steps={[
            "t'_R,A = t_R,A − t₀ = 5.6 − 1.0 = 4.6 min",
            "t'_R,B = t_R,B − t₀ = 8.4 − 1.0 = 7.4 min",
            "k_A = t'_R,A / t₀ = 4.6 / 1.0 = 4.6",
            "k_B = t'_R,B / t₀ = 7.4 / 1.0 = 7.4",
            "α = k_B / k_A = 7.4 / 4.6 = 1.61",
          ]}
        />
      </Section>

      <Huskeregel>
        t<sub>R</sub> = «reisetid + hviletid». t₀ = kun reisetid. k = hviletid/reisetid.  
        Tenk på k som «hvor klistrete analytten er til SF». Ideelt 1–5.
      </Huskeregel>

      <Eksamen>
        Definisjonsspørsmål om t_R, k, α, K og kolonneeffektivitet har kommet på <em>alle</em> eksamener V2021–V2025. 
        V2025 oppg 1a: «Gi kort beskrivelse av hvert begrep, ta med formel» (8 poeng). V2022 oppg 2: beregn k, α, N fra kromatogramdata.
      </Eksamen>
    </>
  );
}


// ─── TAB 2: Kolonneeffektivitet & Van Deemter ────────────────────
function Tab2() {
  const [hoverTerm, setHoverTerm] = useState(null);
  return (
    <>
      <Section title="Nøkkelbegreper" icon="🏷️">
        <div style={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
          <Pill def="Platetall — mål på kolonneeffektivitet. Høyere N = smalere topper. N = 16(t_R/W)² eller N = 5.54(t_R/W½)²">N (platetall)</Pill>
          <Pill def="Platehøyde = L/N. Lavere H = mer effektiv kolonne.">H (platehøyde / HETP)</Pill>
          <Pill def="H = A + B/u + Cu. Summerer alle bidrag til båndspredning.">Van Deemter-ligningen</Pill>
          <Pill def="A-leddet. Molekyler tar ulike veier gjennom pakket kolonne. Ikke relevant for kapillærkolonner.">Eddydiffusjon (A)</Pill>
          <Pill def="B/u-leddet. Diffusjon i lengderetning fra høy til lav konsentrasjon. Vanlig årsak i GC.">Longitudinal diffusjon (B/u)</Pill>
          <Pill def="Cu-leddet. Tid for overgang mellom SF og MF. Avhenger av partikkelstørrelse/filmtykkelse.">Masseoverføringsmotstand (Cu)</Pill>
          <Pill def="Spredning av båndet/toppen etterhvert som analytten beveger seg gjennom kolonnen.">Båndspredning</Pill>
        </div>
      </Section>

      <Section title="Forklaring" icon="📖">
        <p style={{ color: TEXT, fontWeight: 600, marginBottom: 8 }}>Kolonneeffektivitet</p>
        <p>
          Et effektivt system gir smale, konsentrerte topper. Effektiviteten kvantifiseres med <Formula>N</Formula> (platetall) og <Formula>H</Formula> (platehøyde):
        </p>
        <FormulaBlock label="Platetall — to metoder">
          N = 16 · (t<sub>R</sub> / W)<sup>2</sup>  (fra toppbredde ved grunnlinje)<br/>
          N = 5.54 · (t<sub>R</sub> / W<sub>½</sub>)<sup>2</sup>  (fra halvhøydebredde)
        </FormulaBlock>
        <FormulaBlock label="Platehøyde">
          H = L / N
        </FormulaBlock>
        <p>Ønsker: høy N, lav H.</p>

        <p style={{ color: TEXT, fontWeight: 600, margin: "16px 0 8px" }}>Van Deemter-ligningen</p>
        <p>Summerer alle faktorer som bidrar til båndspredning:</p>
        <FormulaBlock label="Van Deemter">
          H = A + B/u + C·u
        </FormulaBlock>

        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 10, margin: "12px 0" }}>
          {[
            { t: "A — Eddydiffusjon", d: "Molekyler finner ulike veier gjennom pakket kolonne → ulik vandringslengde → spredning. Ikke relevant i kapillærkolonner (ingen pakking). Avhenger av partikkelstørrelse.", c: "#EF4444" },
            { t: "B/u — Longitudinal diffusjon", d: "Vanlig diffusjon fra høy til lav konsentrasjon i lengderetningen. Viktigst ved lav u. Vanlig årsak til spredning i GC (gass diffunderer raskt).", c: "#3B82F6" },
            { t: "C·u — Masseoverføringsmotstand", d: "Tiden det tar for analytter å veksle mellom SF og MF. Pakket kolonne: avhenger av partikkelstørrelse. Åpen kolonne: avhenger av filmtykkelse (d_f) og indre diameter.", c: "#10B981" },
          ].map((item, i) => (
            <div key={i} style={{ background: CARD_INNER, border: `1px solid ${BORDER}`, borderLeft: `3px solid ${item.c}`, borderRadius: 6, padding: "10px 14px" }}>
              <div style={{ color: item.c, fontWeight: 700, fontSize: 14, fontFamily: "'Plus Jakarta Sans', sans-serif", marginBottom: 4 }}>{item.t}</div>
              <div style={{ color: TEXT2, fontSize: 13, lineHeight: 1.6 }}>{item.d}</div>
            </div>
          ))}
        </div>

        <p style={{ color: TEXT, fontWeight: 600, margin: "16px 0 8px" }}>GC vs LC i Van Deemter</p>
        <p>
          LC gir generelt lavere H enn GC (bedre per plate), men GC-kolonner er mye lengre → GC får vanligvis høyere total N og bedre effektivitet.
          Optimal u er høyere for GC enn LC.
        </p>
      </Section>

      <Section title="Visuell illustrasjon — Van Deemter-kurve" icon="📊">
        <svg viewBox="0 0 700 360" style={{ width: "100%", maxWidth: 700 }}>
          <rect x="0" y="0" width="700" height="360" rx="8" fill={CARD_INNER} />
          {/* Axes */}
          <line x1="80" y1="300" x2="650" y2="300" stroke={BORDER} strokeWidth="2" />
          <line x1="80" y1="300" x2="80" y2="30" stroke={BORDER} strokeWidth="2" />
          <text x="370" y="340" fill={TEXT2} textAnchor="middle" fontFamily="Source Sans 3" fontSize="13">u (lineær MF-hastighet)</text>
          <text x="30" y="165" fill={TEXT2} textAnchor="middle" fontFamily="Source Sans 3" fontSize="13" transform="rotate(-90,30,165)">H (platehøyde)</text>

          {/* A-term (constant line) */}
          <line x1="100" y1="220" x2="630" y2="220" stroke="#EF4444" strokeWidth="2" strokeDasharray="6,4" />
          <text x="640" y="224" fill="#EF4444" fontFamily="JetBrains Mono" fontSize="12">A</text>

          {/* B/u curve */}
          <path d="M110,60 Q180,180 260,240 Q340,270 630,285" fill="none" stroke="#3B82F6" strokeWidth="2" strokeDasharray="6,4" />
          <text x="115" y="52" fill="#3B82F6" fontFamily="JetBrains Mono" fontSize="12">B/u</text>

          {/* Cu line */}
          <path d="M100,290 L630,80" fill="none" stroke="#10B981" strokeWidth="2" strokeDasharray="6,4" />
          <text x="610" y="72" fill="#10B981" fontFamily="JetBrains Mono" fontSize="12">C·u</text>

          {/* Total H curve */}
          <path d="M110,80 Q160,120 200,145 Q260,160 300,158 Q340,156 360,158 Q450,175 530,210 Q600,240 630,265" fill="none" stroke={AMBER} strokeWidth="3" />
          <text x="640" y="268" fill={AMBER} fontFamily="JetBrains Mono" fontSize="13" fontWeight="700">H</text>

          {/* Optimal u marker */}
          <line x1="310" y1="155" x2="310" y2="300" stroke={AMBER} strokeWidth="1.5" strokeDasharray="4,3" />
          <circle cx="310" cy="155" r="5" fill={AMBER} />
          <text x="310" y="318" fill={AMBER} textAnchor="middle" fontFamily="JetBrains Mono" fontSize="11">u_opt</text>
          <text x="310" y="145" fill={AMBER_GLOW} textAnchor="middle" fontFamily="JetBrains Mono" fontSize="10">H_min</text>
        </svg>
      </Section>

      <Section title="Eksempel" icon="✏️">
        <p style={{ marginBottom: 8 }}>
          To kolonner med lik lengde L = 20 cm. Kolonne 1: N = 2500. Kolonne 2: N = 625. Hvilken er mest effektiv?
        </p>
        <CollapsibleSteps
          steps={[
            "H₁ = L / N = 20 cm / 2500 = 0.008 cm",
            "H₂ = L / N = 20 cm / 625 = 0.032 cm",
            "H₁ < H₂ → Kolonne 1 er mest effektiv (lavest platehøyde, smalere topper)",
          ]}
        />
      </Section>

      <Huskeregel>
        Van Deemter: «<strong>A</strong>lle <strong>B</strong>arn <strong>C</strong>ykler» — Eddy (A, pakking), Longitudinal (B/u, diffusjon), Masse (C·u, overføring).
        Kapillærkolonner har <em>ingen</em> Eddy-diffusjon (A = 0) fordi det ikke er pakket materiale.
      </Huskeregel>

      <Eksamen>
        V2021 oppg 4b: «Hva er Van Deemter-plot og hva kan vi bruke det til?» + «Hvorfor bidrar ikke eddydiffusjon i kapillær-GC?».
        V2022 oppg 3a: Forklar forskjell mellom to kolonner med Van Deemter (HPLC pakket vs GC åpen).
      </Eksamen>
    </>
  );
}


// ─── TAB 3: Oppløsning, asymmetri, gradienter ──────────────────
function Tab3() {
  return (
    <>
      <Section title="Nøkkelbegreper" icon="🏷️">
        <div style={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
          <Pill def="Mål på hvor godt to topper er separert. R_s ≥ 1.5 = grunnlinjeseparasjon (≈0% overlapp).">R_s (oppløsning)</Pill>
          <Pill def="Grunnlinjeseparasjon: R_s ≥ 1.5. Toppene er fullstendig separert.">Grunnlinjeseparasjon</Pill>
          <Pill def="A_s = b/a (målt ved 10% av topphøyden). A_s = 1 er ideelt. < 1 = fronting, > 1 = tailing.">Asymmetri (A_s)</Pill>
          <Pill def="Fronting: slak front, skarp hale. Tailing: slak hale, skarp front.">Fronting / Tailing</Pill>
          <Pill def="Isokratisk: konstante betingelser. Gradient: endrer betingelser underveis.">Isokratisk vs Gradient</Pill>
          <Pill def="GC: temperaturgradienter. HPLC NP: øke MF-polaritet. HPLC RP: senke MF-polaritet.">Gradienttyper</Pill>
        </div>
      </Section>

      <Section title="Forklaring" icon="📖">
        <p style={{ color: TEXT, fontWeight: 600, marginBottom: 8 }}>Oppløsning R<sub>s</sub></p>
        <FormulaBlock label="Oppløsning — direkte fra kromatogram">
          R<sub>s</sub> = 2 · (t<sub>R,B</sub> − t<sub>R,A</sub>) / (W<sub>A</sub> + W<sub>B</sub>)
        </FormulaBlock>
        <FormulaBlock label="Oppløsning — sammenheng med N, α, k">
          R<sub>s</sub> = (√N / 4) · ((α−1)/α) · (k<sub>B</sub> / (1+k<sub>B</sub>))
        </FormulaBlock>
        <p>
          R<sub>s</sub> ≥ 1.5 → grunnlinjeseparasjon (≈ 0% overlapp).<br/>
          Den andre formelen viser at oppløsning avhenger av tre faktorer: <em>effektivitet</em> (N), <em>selektivitet</em> (α), og <em>retensjon</em> (k).
        </p>

        <p style={{ color: TEXT, fontWeight: 600, margin: "16px 0 8px" }}>Asymmetri</p>
        <FormulaBlock label="Asymmetrifaktor">
          A<sub>s</sub> = b / a  (målt ved 10% av topphøyden)
        </FormulaBlock>
        <p>
          A<sub>s</sub> = 1 → symmetrisk topp (ideelt). A<sub>s</sub> {"<"} 1 → fronting. A<sub>s</sub> {">"} 1 → tailing.<br/>
          Årsaker: variasjon i K med konsentrasjon, stort prøvevolum.
        </p>

        <p style={{ color: TEXT, fontWeight: 600, margin: "16px 0 8px" }}>Det generelle elueringsproblemet og gradienter</p>
        <p>
          Med konstante betingelser (isokratisk) kan det være vanskelig å separere analytter med svært ulike egenskaper:
          tidlige topper overlapper, sene topper blir brede.
        </p>
        <p><strong style={{ color: TEXT }}>Løsning:</strong> Gradientanalyse — endre betingelser underveis for å justere k:</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, margin: "10px 0" }}>
          {[
            { title: "GC", desc: "Temperatur­gradienter — øke T underveis → raskere eluering", c: "#EF4444" },
            { title: "HPLC NP", desc: "Øke polaritet til MF → sterkere eluering av polare analytter", c: "#3B82F6" },
            { title: "HPLC RP", desc: "Senke polaritet til MF (mer organisk) → sterkere eluering av upolare analytter", c: "#10B981" },
          ].map((g, i) => (
            <div key={i} style={{ background: CARD_INNER, border: `1px solid ${BORDER}`, borderTop: `3px solid ${g.c}`, borderRadius: 6, padding: "10px 12px" }}>
              <div style={{ color: g.c, fontWeight: 700, fontSize: 14, fontFamily: "'Plus Jakarta Sans', sans-serif", marginBottom: 4 }}>{g.title}</div>
              <div style={{ color: TEXT2, fontSize: 12, lineHeight: 1.5 }}>{g.desc}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Visuell illustrasjon — Asymmetri" icon="📊">
        <svg viewBox="0 0 700 240" style={{ width: "100%", maxWidth: 700 }}>
          <rect x="0" y="0" width="700" height="240" rx="8" fill={CARD_INNER} />
          
          {/* Symmetric */}
          <path d="M130,200 Q155,40 180,200" fill={`${AMBER}22`} stroke={AMBER} strokeWidth="2.5" />
          <text x="155" y="225" fill={TEXT} textAnchor="middle" fontFamily="Plus Jakarta Sans" fontSize="12" fontWeight="600">Symmetrisk</text>
          <text x="155" y="32" fill={AMBER} textAnchor="middle" fontFamily="JetBrains Mono" fontSize="11">A_s = 1</text>

          {/* Fronting */}
          <path d="M330,200 Q370,40 390,200" fill={`${AMBER}22`} stroke="#3B82F6" strokeWidth="2.5" />
          <text x="365" y="225" fill={TEXT} textAnchor="middle" fontFamily="Plus Jakarta Sans" fontSize="12" fontWeight="600">Fronting</text>
          <text x="365" y="32" fill="#3B82F6" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="11">{"A_s < 1"}</text>

          {/* Tailing */}
          <path d="M520,200 Q540,40 590,200" fill={`${AMBER}22`} stroke="#EF4444" strokeWidth="2.5" />
          <text x="555" y="225" fill={TEXT} textAnchor="middle" fontFamily="Plus Jakarta Sans" fontSize="12" fontWeight="600">Tailing</text>
          <text x="555" y="32" fill="#EF4444" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="11">{"A_s > 1"}</text>
        </svg>
      </Section>

      <Section title="Eksempel" icon="✏️">
        <p style={{ marginBottom: 8 }}>
          Gitt: t₀ = 2.3 min, t<sub>R,A</sub> = 5.6 min, t<sub>R,B</sub> = 8.4 min, W<sub>A</sub> = 0.57 min, W<sub>B</sub> = 0.59 min. Beregn R<sub>s</sub>.
        </p>
        <CollapsibleSteps
          steps={[
            "R_s = 2·(t_R,B − t_R,A) / (W_A + W_B)",
            "R_s = 2·(8.4 − 5.6) / (0.57 + 0.59)",
            "R_s = 2·2.8 / 1.16 = 5.6 / 1.16",
            "R_s = 4.83 → Langt over 1.5, så dette er god grunnlinjeseparasjon ✓",
          ]}
        />
      </Section>

      <Huskeregel>
        R<sub>s</sub> ≥ 1.5 = grunnlinjeseparasjon. Tre «knotter» styrer oppløsningen: N (effektivitet), α (selektivitet), k (retensjon).
        «Gradient fikser det generelle elueringsproblemet» — GC bruker temperatur, HPLC bruker MF-sammensetning.
      </Huskeregel>

      <Eksamen>
        V2022 oppg 2: Beregn R_s fra kromatogramdata, avgjør om grunnlinjeseparasjon er oppnådd. 
        V2021 oppg 4e: Forklar gradienttyper for GC og HPLC (NP og RP). V2023 oppg 2d: Forklare brede topper og sammenheng med gradienter.
      </Eksamen>
    </>
  );
}


// ─── TAB 4: GC ──────────────────────────────────────────────────
function Tab4() {
  return (
    <>
      <Section title="Nøkkelbegreper" icon="🏷️">
        <div style={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
          <Pill def="Transporterer prøven gjennom kolonnen. Helium mest brukt. Krav: inert, høy renhet (≥99.99%).">Bæregass</Pill>
          <Pill def="Split: en brøkdel av prøven inn på kolonne. Splitless: hele prøven inn. Split brukes pga lite volum i kapillærkolonner.">Split / Splitless</Pill>
          <Pill def="Nøyaktig temperaturkontroll. Isoterm eller gradientanalyse.">Kolonneovn</Pill>
          <Pill def="Fylte kolonner med SF-partikler. Høy prøvekapasitet, men lavere effektivitet.">Pakket kolonne</Pill>
          <Pill def="Mest brukt (WCOT). Fused silica. 10-100 m, ID 0.1-0.5 mm. Høy N, lav H.">Kapillærkolonne</Pill>
          <Pill def="Siloksan-basert (-Si-O- ryggrad). Allsidig med utskiftbare R-grupper. Upolar base, kan gjøres polar.">Siloksanfaser (SF)</Pill>
          <Pill def="SF fordamper fra kolonne → støy på detektor. Løses med «baking» og kjemisk stabilisering.">Kolonneblødning</Pill>
        </div>
      </Section>

      <Section title="Forklaring" icon="📖">
        <p style={{ color: TEXT, fontWeight: 600, marginBottom: 8 }}>Oppbygging av en GC</p>
        <p>
          GC (gasskromatografi) bruker gass som mobilfase for å separere flyktige forbindelser. 
          SF kan være væske (GLC, vanligst) eller fast stoff (GSC). Retensjon avhenger av SF, <em>ikke</em> MF.
        </p>

        <p style={{ color: TEXT, fontWeight: 600, margin: "16px 0 8px" }}>1. Bæregass</p>
        <p>
          Transporterer prøven — skal ikke reagere med prøve eller SF. Krav: inert, høy renhet (minimum 4.0 = 99.99%).
          De tre vanligste: helium (mest brukt i dag), hydrogen, nitrogen.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, margin: "10px 0" }}>
          {[
            { gas: "He", pro: "God separasjon, trygg, kan bruke høy u", con: "Dyrt", c: AMBER },
            { gas: "H₂", pro: "Best for flat Van Deemter, raskest", con: "Brannfarlig!", c: "#EF4444" },
            { gas: "N₂", pro: "Billig, lavest H_min", con: "Sakte, u_opt er lav, bredere topper ved høy u", c: "#3B82F6" },
          ].map((g, i) => (
            <div key={i} style={{ background: CARD_INNER, border: `1px solid ${BORDER}`, borderTop: `3px solid ${g.c}`, borderRadius: 6, padding: "10px 12px" }}>
              <div style={{ color: g.c, fontWeight: 700, fontSize: 15, fontFamily: "'JetBrains Mono', monospace" }}>{g.gas}</div>
              <div style={{ color: "#10B981", fontSize: 12, marginTop: 4 }}>+ {g.pro}</div>
              <div style={{ color: "#EF4444", fontSize: 12 }}>− {g.con}</div>
            </div>
          ))}
        </div>

        <p style={{ color: TEXT, fontWeight: 600, margin: "16px 0 8px" }}>2. Split/Splitless-injektor</p>
        <p>
          Fordamper prøven og overfører den til kolonnen. I kapillær-GC er kolonnevolumet lite, men 1 μL væske → ~500 μL gass.
          <em> Split-modus</em>: kun en brøkdel sendes inn (splitrate angir forholdet).
          <em> Splitless</em>: hele prøven sendes inn (brukes for lav konsentrasjon/sporanalyse).
          Ulempe med split: lavere følsomhet (høyere LOD/LOQ).
        </p>

        <p style={{ color: TEXT, fontWeight: 600, margin: "16px 0 8px" }}>3. Kolonner</p>
        <p>
          <strong style={{ color: TEXT }}>Pakket kolonne:</strong> L = 2–3 m, ID = 2–4 mm. SF-partikler fyller kolonnen.
          Høy prøvekapasitet, men mer båndspredning (eddydiffusjon). Brukes for permanente gasser.
        </p>
        <p>
          <strong style={{ color: TEXT }}>Kapillærkolonne (WCOT):</strong> L = 10–100 m, ID = 0.1–0.5 mm. Fused silica.
          Tynn SF-film på innsiden. Høy N, lav H. Mest brukt i moderne GC.
        </p>

        <p style={{ color: TEXT, fontWeight: 600, margin: "16px 0 8px" }}>4. Stasjonærfase (SF)</p>
        <p>
          <strong style={{ color: TEXT }}>Siloksanfaser:</strong> -Si-O- ryggrad med utskiftbare R-grupper. Lavt smeltepunkt, høyt kokepunkt, 
          kjemisk inert, termisk stabil. Upolar base (polydimetylsiloksan), kan gjøres polar med CN, OH, CO-grupper.
        </p>
        <p>
          <strong style={{ color: TEXT }}>PEG (polyetylenglykol):</strong> Polar kolonne for polare stoffer.
        </p>
        <p>
          Likt løser likt: polare SF → retarderer polare stoffer. Med lik polaritet → separasjon basert på kokepunkt.
        </p>

        <p style={{ color: TEXT, fontWeight: 600, margin: "16px 0 8px" }}>5. Kolonneblødning og stabilisering</p>
        <p>
          SF (væske) kan fordampe → støy. Løses med «baking» (250–300 °C, 4–6 timer) og kjemisk stabilisering: 
          «bonding» (binding til kolonnevegg) og «cross-linking» (kryssbindinger i SF).
        </p>
      </Section>

      <Section title="Visuell illustrasjon — GC oppbygging" icon="📊">
        <svg viewBox="0 0 700 260" style={{ width: "100%", maxWidth: 700 }}>
          <rect x="0" y="0" width="700" height="260" rx="8" fill={CARD_INNER} />
          
          {/* Bæregass tank */}
          <rect x="30" y="80" width="70" height="100" rx="10" fill={CARD} stroke={AMBER} strokeWidth="2" />
          <text x="65" y="120" fill={AMBER} textAnchor="middle" fontFamily="JetBrains Mono" fontSize="11" fontWeight="700">He</text>
          <text x="65" y="140" fill={TEXT2} textAnchor="middle" fontFamily="Source Sans 3" fontSize="9">Bæregass</text>
          <text x="65" y="155" fill={TEXT2} textAnchor="middle" fontFamily="Source Sans 3" fontSize="8">≥99.99%</text>

          {/* Arrow */}
          <line x1="100" y1="130" x2="140" y2="130" stroke={AMBER} strokeWidth="2" markerEnd="url(#arr)" />

          {/* Injektor */}
          <rect x="140" y="90" width="80" height="80" rx="8" fill={CARD} stroke={BORDER} strokeWidth="2" />
          <text x="180" y="125" fill={TEXT} textAnchor="middle" fontFamily="Plus Jakarta Sans" fontSize="10" fontWeight="600">Injektor</text>
          <text x="180" y="142" fill={TEXT2} textAnchor="middle" fontFamily="Source Sans 3" fontSize="9">Split/Splitless</text>

          {/* Arrow */}
          <line x1="220" y1="130" x2="260" y2="130" stroke={AMBER} strokeWidth="2" />

          {/* Oven + Kolonne */}
          <rect x="260" y="60" width="170" height="140" rx="10" fill={CARD} stroke="#EF4444" strokeWidth="2" strokeDasharray="8,4" />
          <text x="345" y="82" fill="#EF4444" textAnchor="middle" fontFamily="Source Sans 3" fontSize="10">Kolonneovn</text>
          {/* Coiled column inside */}
          <path d="M290,120 Q310,100 330,120 Q350,140 370,120 Q390,100 400,120" fill="none" stroke={AMBER} strokeWidth="3" strokeLinecap="round" />
          <text x="345" y="160" fill={TEXT2} textAnchor="middle" fontFamily="Source Sans 3" fontSize="9">Kapillærkolonne</text>
          <text x="345" y="175" fill={TEXT2} textAnchor="middle" fontFamily="JetBrains Mono" fontSize="8">10-100 m, ID 0.1-0.5 mm</text>

          {/* Arrow */}
          <line x1="430" y1="130" x2="470" y2="130" stroke={AMBER} strokeWidth="2" />

          {/* Detektor */}
          <rect x="470" y="90" width="80" height="80" rx="8" fill={CARD} stroke="#10B981" strokeWidth="2" />
          <text x="510" y="125" fill="#10B981" textAnchor="middle" fontFamily="Plus Jakarta Sans" fontSize="10" fontWeight="600">Detektor</text>
          <text x="510" y="142" fill={TEXT2} textAnchor="middle" fontFamily="Source Sans 3" fontSize="9">FID/TCD/MS</text>

          {/* Arrow */}
          <line x1="550" y1="130" x2="590" y2="130" stroke={AMBER} strokeWidth="2" />

          {/* Data system */}
          <rect x="590" y="100" width="80" height="60" rx="6" fill={CARD} stroke={BORDER} strokeWidth="2" />
          <text x="630" y="128" fill={TEXT2} textAnchor="middle" fontFamily="Source Sans 3" fontSize="9">Datasystem</text>
          <text x="630" y="143" fill={TEXT2} textAnchor="middle" fontFamily="Source Sans 3" fontSize="8">Kromatogram</text>

          {/* Labels at top */}
          <text x="350" y="25" fill={AMBER} textAnchor="middle" fontFamily="Plus Jakarta Sans" fontSize="14" fontWeight="700">Oppbygging GC</text>
          <text x="350" y="42" fill={TEXT2} textAnchor="middle" fontFamily="Source Sans 3" fontSize="11">Bæregass → Injektor → Kolonne (i ovn) → Detektor → Data</text>
        </svg>
      </Section>

      <Section title="Eksempel" icon="✏️">
        <p style={{ marginBottom: 8 }}>
          En kapillær GC-analyse bruker split-injeksjon med splitrate 1:50. 1.0 μL prøve injiseres. 
          Hvor mye av prøven når kolonnen?
        </p>
        <CollapsibleSteps
          steps={[
            "Splitrate 1:50 betyr at for hver 1 del som går inn i kolonnen, går 50 deler ut.",
            "Andel inn på kolonne = 1/(1+50) = 1/51 ≈ 0.020 (2.0%)",
            "Volum inn på kolonne = 1.0 μL × (1/51) ≈ 0.020 μL",
            "Konsekvens: Kun ~2% av prøven analyseres → lavere følsomhet, men smalere topper og bedre oppløsning.",
          ]}
        />
      </Section>

      <Huskeregel>
        «GC = Gass + Kokepunkt». Retensjon avhenger av SF (ikke MF). Mest brukt kolonne: WCOT kapillær (fused silica).
        Split-injeksjon finnes fordi 1 μL væske → 500 μL gass — for mye for kapillærkolonnen.
      </Huskeregel>

      <Eksamen>
        V2025 oppg 1b: 5 flervalg om GC (bæregass, kolonnetyper, split vs splitless). V2024 oppg 2b: «Hva er split/splitless-injektor og hvorfor brukes den?» (5p).
        V2021 oppg 4d: Skisser oppbygging av split-injektor. V2022 oppg 3: SF-struktur i GLC (siloksanfaser).
      </Eksamen>
    </>
  );
}


// ─── TAB 5: GC-detektorer & kvantitativ analyse ──────────────────
function Tab5() {
  return (
    <>
      <Section title="Nøkkelbegreper" icon="🏷️">
        <div style={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
          <Pill def="Flammeionisasjonsdetektor. Prøven brennes i H₂-flamme → ioner → strøm. Massesensitiv, sensitiv, bredt lineært område.">FID</Pill>
          <Pill def="Termisk ledningsevnedetektor. Universell. Måler endring i termisk ledningsevne.">TCD</Pill>
          <Pill def="Massespektrometer. Gir mye strukturinfo. GC-MS er enklere å koble enn LC-MS.">MS</Pill>
          <Pill def="Deteksjonsgrense: S/N = 3. Laveste konsentrasjon som gir detekterbart signal.">LOD</Pill>
          <Pill def="Kvantifiseringsgrense: S/N = 10. Laveste konsentrasjon som kan kvantifiseres.">LOQ</Pill>
          <Pill def="Sammenligner signal med kalibreringskurve laget fra standardløsninger.">Ekstern standard</Pill>
          <Pill def="Kjent mengde referansestoff tilsettes alle prøver. Bruker signalforhold analytt/IS.">Intern standard (IS)</Pill>
          <Pill def="Prøven deles i 2: én analyseres, én tilsettes kjent mengde standard. Signaler sammenlignes.">Standardaddisjon</Pill>
        </div>
      </Section>

      <Section title="Forklaring" icon="📖">
        <p style={{ color: TEXT, fontWeight: 600, marginBottom: 8 }}>Detektoregenskaper</p>
        <p>
          En GC-detektor genererer signal proporsjonalt med mengde analytt som forlater kolonnen. 
          Ønsket: høy sensitivitet, lite støy, bredt lineært område, termisk stabilitet.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 10, margin: "12px 0" }}>
          <div style={{ background: CARD_INNER, border: `1px solid ${BORDER}`, borderLeft: `3px solid ${AMBER}`, borderRadius: 6, padding: "14px 16px" }}>
            <div style={{ color: AMBER, fontWeight: 700, fontSize: 15, fontFamily: "'Plus Jakarta Sans', sans-serif", marginBottom: 6 }}>FID — Flammeionisasjonsdetektor</div>
            <div style={{ color: TEXT2, fontSize: 13, lineHeight: 1.7 }}>
              Prøven brennes i H₂-flamme → organisk C danner ioner → strøm mellom elektroder = signal.<br/>
              <span style={{ color: "#10B981" }}>✓ Sensitiv (10⁻¹⁰ – 10⁻¹³ g/s), stort lineært område, lite støy, robust</span><br/>
              <span style={{ color: "#EF4444" }}>✗ Destruktiv, detekterer ikke H₂O, CO₂, SO₂, NO₂ (stoffer uten organisk C). Trenger H₂.</span>
            </div>
          </div>
          <div style={{ background: CARD_INNER, border: `1px solid ${BORDER}`, borderLeft: `3px solid #3B82F6`, borderRadius: 6, padding: "14px 16px" }}>
            <div style={{ color: "#3B82F6", fontWeight: 700, fontSize: 15, fontFamily: "'Plus Jakarta Sans', sans-serif", marginBottom: 6 }}>TCD — Termisk ledningsevnedetektor</div>
            <div style={{ color: TEXT2, fontSize: 13, lineHeight: 1.7 }}>
              Universell detektor. Måler forskjell i termisk ledningsevne mellom ren bæregass og bæregass + analytt.<br/>
              <span style={{ color: "#10B981" }}>✓ Ikke-destruktiv, universell, enkel</span><br/>
              <span style={{ color: "#EF4444" }}>✗ Mindre sensitiv enn FID</span>
            </div>
          </div>
          <div style={{ background: CARD_INNER, border: `1px solid ${BORDER}`, borderLeft: `3px solid #8B5CF6`, borderRadius: 6, padding: "14px 16px" }}>
            <div style={{ color: "#8B5CF6", fontWeight: 700, fontSize: 15, fontFamily: "'Plus Jakarta Sans', sans-serif", marginBottom: 6 }}>MS — Massespektrometer</div>
            <div style={{ color: TEXT2, fontSize: 13, lineHeight: 1.7 }}>
              Allsidig, gir mye strukturinformasjon. GC-MS er enklere enn LC-MS fordi prøven allerede er på gassfase.<br/>
              <span style={{ color: "#10B981" }}>✓ Identifisering + kvantifisering, svært sensitiv</span><br/>
              <span style={{ color: "#EF4444" }}>✗ Dyrt, komplekst</span>
            </div>
          </div>
        </div>

        <p style={{ color: TEXT, fontWeight: 600, margin: "16px 0 8px" }}>LOD og LOQ</p>
        <FormulaBlock label="Deteksjonsgrense og kvantifiseringsgrense">
          LOD: S/N = 3  (signal er 3× støy)<br/>
          LOQ: S/N = 10  (signal er 10× støy)
        </FormulaBlock>

        <p style={{ color: TEXT, fontWeight: 600, margin: "16px 0 8px" }}>Kvantitativ analyse</p>
        <p>To mål fra kromatogrammet: <em>topphøyde</em> (påvirkes av båndspredning) og <em>toppareal</em> (påvirkes ikke, men påvirkes av overlapp).</p>
        <p>Tre metoder for standardisering:</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, margin: "10px 0" }}>
          {[
            { t: "Ekstern standard", d: "Kalibreringskurve fra standardløsninger. Sammenlign ukjent signal med kurven." },
            { t: "Intern standard", d: "Tilsett kjent referansestoff til alle prøver. Beregn signalforhold analytt/IS." },
            { t: "Standardaddisjon", d: "Del prøven i 2. Tilsett kjent mengde standard til den ene. Sammenlign signaler." },
          ].map((m, i) => (
            <div key={i} style={{ background: CARD_INNER, border: `1px solid ${BORDER}`, borderRadius: 6, padding: "10px 12px" }}>
              <div style={{ color: AMBER, fontWeight: 700, fontSize: 13, fontFamily: "'Plus Jakarta Sans', sans-serif", marginBottom: 4 }}>{m.t}</div>
              <div style={{ color: TEXT2, fontSize: 12, lineHeight: 1.5 }}>{m.d}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Visuell illustrasjon — LOD/LOQ" icon="📊">
        <svg viewBox="0 0 700 220" style={{ width: "100%", maxWidth: 700 }}>
          <rect x="0" y="0" width="700" height="220" rx="8" fill={CARD_INNER} />
          
          {/* Noise baseline */}
          <path d="M60,160 L80,155 L100,165 L120,158 L140,162 L160,156 L180,163 L200,157 L220,164 L240,158 L260,161 L280,156 L300,163 L320,157 L340,164 L360,158 L380,162 L400,156 L420,163 L440,157 L460,164 L480,158 L500,161 L520,156 L540,163 L560,157 L580,164 L600,160 L620,158 L640,162" 
            fill="none" stroke={TEXT2} strokeWidth="1.5" opacity="0.5" />
          <text x="650" y="163" fill={TEXT2} fontFamily="Source Sans 3" fontSize="10">Støy (N)</text>

          {/* Noise band indicator */}
          <rect x="50" y="150" width="600" height="20" fill={`${TEXT2}08`} stroke="none" />
          <line x1="50" y1="150" x2="650" y2="150" stroke={TEXT2} strokeWidth="0.5" strokeDasharray="3,3" />
          <line x1="50" y1="170" x2="650" y2="170" stroke={TEXT2} strokeWidth="0.5" strokeDasharray="3,3" />

          {/* LOD signal (3x noise) */}
          <path d="M200,160 Q215,130 230,160" fill="none" stroke="#3B82F6" strokeWidth="2.5" />
          <line x1="215" y1="130" x2="215" y2="160" stroke="#3B82F6" strokeWidth="1" strokeDasharray="3,3" />
          <text x="215" y="120" fill="#3B82F6" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="11">S/N=3</text>
          <text x="215" y="195" fill="#3B82F6" textAnchor="middle" fontFamily="Plus Jakarta Sans" fontSize="12" fontWeight="600">LOD</text>

          {/* LOQ signal (10x noise) */}
          <path d="M430,160 Q450,65 470,160" fill="none" stroke={AMBER} strokeWidth="2.5" />
          <line x1="450" y1="65" x2="450" y2="160" stroke={AMBER} strokeWidth="1" strokeDasharray="3,3" />
          <text x="450" y="55" fill={AMBER} textAnchor="middle" fontFamily="JetBrains Mono" fontSize="11">S/N=10</text>
          <text x="450" y="195" fill={AMBER} textAnchor="middle" fontFamily="Plus Jakarta Sans" fontSize="12" fontWeight="600">LOQ</text>

          <text x="350" y="22" fill={TEXT} textAnchor="middle" fontFamily="Plus Jakarta Sans" fontSize="13" fontWeight="700">Deteksjonsgrense vs Kvantifiseringsgrense</text>
        </svg>
      </Section>

      <Section title="Eksempel" icon="✏️">
        <p style={{ marginBottom: 8 }}>
          Et kromatogram viser en FID-analyse. En topp i en ukjent prøve har retensjonstid 4.32 min.
          En standardløsning av butanol gir topp ved 4.31 min. Hva kan man konkludere?
        </p>
        <CollapsibleSteps
          steps={[
            "Retensjonstidene er nesten identiske (4.32 vs 4.31 min).",
            "Dette tyder på at toppen i den ukjente prøven kan være butanol.",
            "For bekreftelse: bruk standardaddisjon — tilsett litt butanol til prøven. Hvis toppen øker uten ny topp, er det butanol.",
            "Alternativt: bruk MS-detektor for å identifisere basert på masse/struktur, ikke bare retensjonstid.",
          ]}
        />
      </Section>

      <Huskeregel>
        FID: «Flamme Ioniserer Det som brenner» — detekterer organisk C, men ikke H₂O/CO₂/uorganisk. 
        LOD = 3 (kan se signalet), LOQ = 10 (kan kvantifisere det).
      </Huskeregel>

      <Eksamen>
        V2021 oppg 4b: «Hvilke forbindelser detekteres ikke av FID? UV?» V2025 oppg 1b: «Hvilken detektor brukes ikke til GC?» (svar: NMR).
        V2022 oppg 3: Bæregass-sammenligning med Van Deemter-plot.
      </Eksamen>
    </>
  );
}


// ─── TAB 6: HPLC ────────────────────────────────────────────────
function Tab6() {
  return (
    <>
      <Section title="Nøkkelbegreper" icon="🏷️">
        <div style={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
          <Pill def="High-Performance Liquid Chromatography. MF = væske, krever høyt trykk. For ikke-flyktige/termisk ustabile stoffer.">HPLC</Pill>
          <Pill def="Stempelpumpe (dobbel). HPLC: 20-200 atm. UHPLC: 500-1200 atm.">Pumpe</Pill>
          <Pill def="6-ports injektor med loop. Fyller loop, deretter pumpes prøven inn. Autosampler mulig.">6-ports injektor</Pill>
          <Pill def="Beskytter analysekolonnen. 5 cm lang, fjerner urenheter. Samme SF som analytisk kolonne.">Forkolonne</Pill>
          <Pill def="NP: SF polar, MF upolar. Polare analytter retarderes. Øke MF-polaritet → sterkere eluering.">Normalfase (NP)</Pill>
          <Pill def="RP: SF upolar (C18), MF polar. Upolare analytter retarderes. Senke MF-polaritet → sterkere eluering.">Omvendt fase (RP)</Pill>
          <Pill def="Isokratisk: konstant MF-sammensetning. Gradient: MF endres underveis.">Isokratisk / Gradient</Pill>
        </div>
      </Section>

      <Section title="Forklaring" icon="📖">
        <p style={{ color: TEXT, fontWeight: 600, marginBottom: 8 }}>HPLC — oversikt</p>
        <p>
          HPLC er en videreutvikling av kolonnekromatografi til instrumentell analyse. Bruker væske som MF.
          Egnet for ikke-flyktige, termisk ustabile stoffer (proteiner, peptider, legemidler).
          Retensjon påvirkes av <em>både</em> SF og MF (i motsetning til GC der kun SF påvirker).
        </p>

        <p style={{ color: TEXT, fontWeight: 600, margin: "16px 0 8px" }}>Oppbygging</p>
        <p>
          <strong>Pumpe:</strong> Stempelpumpe (ofte dobbel for jevn flow). HPLC: 20–200 atm. Flow: 0.1–10 mL/min.<br/>
          <strong>Injektor:</strong> 6-ports injektor med loop. Volum endres ved å bytte loop.<br/>
          <strong>Kolonner:</strong> Forkolonne (5 cm, beskyttelse) + analytisk kolonne (5–25 cm, ID 3–5 mm). Pakket med porøse mikropartikler (3–5 μm). Silika vanligst.<br/>
          <strong>Kolonneovn:</strong> Stabil T for reproduserbar t<sub>R</sub>.
        </p>

        <p style={{ color: TEXT, fontWeight: 600, margin: "16px 0 8px" }}>Normalfase (NP) vs Omvendt fase (RP)</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, margin: "10px 0" }}>
          <div style={{ background: CARD_INNER, border: `1px solid ${BORDER}`, borderTop: `3px solid #3B82F6`, borderRadius: 6, padding: "14px 16px" }}>
            <div style={{ color: "#3B82F6", fontWeight: 700, fontSize: 14, fontFamily: "'Plus Jakarta Sans', sans-serif", marginBottom: 8 }}>Normalfase (NP-LC)</div>
            <div style={{ color: TEXT2, fontSize: 13, lineHeight: 1.7 }}>
              SF: Polar (silika)<br/>
              MF: Upolar (heksan, pentan)<br/>
              Polare analytter retarderes mest<br/>
              Minst polar elueres først<br/>
              <span style={{ color: AMBER }}>Gradient: øke MF-polaritet</span>
            </div>
          </div>
          <div style={{ background: CARD_INNER, border: `1px solid ${BORDER}`, borderTop: `3px solid #10B981`, borderRadius: 6, padding: "14px 16px" }}>
            <div style={{ color: "#10B981", fontWeight: 700, fontSize: 14, fontFamily: "'Plus Jakarta Sans', sans-serif", marginBottom: 8 }}>Omvendt fase (RP-LC)</div>
            <div style={{ color: TEXT2, fontSize: 13, lineHeight: 1.7 }}>
              SF: Upolar (C18-modifisert silika)<br/>
              MF: Polar (vann, metanol, ACN)<br/>
              Upolare analytter retarderes mest<br/>
              Mest polar elueres først<br/>
              <span style={{ color: AMBER }}>Gradient: senke MF-polaritet</span>
            </div>
          </div>
        </div>

        <p style={{ color: TEXT, fontWeight: 600, margin: "16px 0 8px" }}>Andre LC-metoder</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, margin: "10px 0" }}>
          {[
            { t: "Ionekromatografi", d: "SF med faste ioner. Analyserer anioner/kationer. Eluering ved å øke ionestyrke." },
            { t: "Eksklusjonskromatografi", d: "Porøs SF. Separerer etter molekylstørrelse. Store ut først, små sist." },
            { t: "Affinitetskromatografi", d: "Biologisk SF binder selektivt til analytt. Svært høy selektivitet." },
            { t: "Kiralkromatografi", d: "Separerer enantiomerer (R og S). Kiral SF eller MF." },
          ].map((m, i) => (
            <div key={i} style={{ background: CARD_INNER, border: `1px solid ${BORDER}`, borderRadius: 6, padding: "10px 12px" }}>
              <div style={{ color: AMBER, fontWeight: 600, fontSize: 13, fontFamily: "'Plus Jakarta Sans', sans-serif", marginBottom: 4 }}>{m.t}</div>
              <div style={{ color: TEXT2, fontSize: 12, lineHeight: 1.5 }}>{m.d}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Visuell illustrasjon — NP vs RP elueringsorden" icon="📊">
        <svg viewBox="0 0 700 300" style={{ width: "100%", maxWidth: 700 }}>
          <rect x="0" y="0" width="700" height="300" rx="8" fill={CARD_INNER} />
          <text x="350" y="25" fill={TEXT} textAnchor="middle" fontFamily="Plus Jakarta Sans" fontSize="14" fontWeight="700">Elueringsrekkefølge: NP vs RP</text>

          {/* NP section */}
          <text x="175" y="55" fill="#3B82F6" textAnchor="middle" fontFamily="Plus Jakarta Sans" fontSize="13" fontWeight="700">Normalfase (NP)</text>
          <text x="175" y="72" fill={TEXT2} textAnchor="middle" fontFamily="Source Sans 3" fontSize="10">SF polar, MF upolar</text>
          {/* Axis */}
          <line x1="50" y1="270" x2="340" y2="270" stroke={BORDER} strokeWidth="1.5" />
          <text x="195" y="290" fill={TEXT2} textAnchor="middle" fontFamily="Source Sans 3" fontSize="10">Tid →</text>
          {/* Peaks: least polar first */}
          <path d="M90,270 Q105,180 120,270" fill="#3B82F622" stroke="#3B82F6" strokeWidth="2" />
          <text x="105" y="170" fill={TEXT2} textAnchor="middle" fontFamily="Source Sans 3" fontSize="10">Upolar</text>
          <path d="M170,270 Q190,150 210,270" fill="#3B82F622" stroke="#3B82F6" strokeWidth="2" />
          <text x="190" y="140" fill={TEXT2} textAnchor="middle" fontFamily="Source Sans 3" fontSize="10">Medium</text>
          <path d="M260,270 Q285,120 310,270" fill="#3B82F622" stroke="#3B82F6" strokeWidth="2" />
          <text x="285" y="110" fill="#3B82F6" textAnchor="middle" fontFamily="Source Sans 3" fontSize="10" fontWeight="600">Polar</text>

          {/* Divider */}
          <line x1="360" y1="45" x2="360" y2="280" stroke={BORDER} strokeWidth="1" strokeDasharray="4,4" />

          {/* RP section */}
          <text x="525" y="55" fill="#10B981" textAnchor="middle" fontFamily="Plus Jakarta Sans" fontSize="13" fontWeight="700">Omvendt fase (RP)</text>
          <text x="525" y="72" fill={TEXT2} textAnchor="middle" fontFamily="Source Sans 3" fontSize="10">SF upolar, MF polar</text>
          <line x1="390" y1="270" x2="680" y2="270" stroke={BORDER} strokeWidth="1.5" />
          <text x="535" y="290" fill={TEXT2} textAnchor="middle" fontFamily="Source Sans 3" fontSize="10">Tid →</text>
          {/* Peaks: most polar first */}
          <path d="M430,270 Q445,180 460,270" fill="#10B98122" stroke="#10B981" strokeWidth="2" />
          <text x="445" y="170" fill="#10B981" textAnchor="middle" fontFamily="Source Sans 3" fontSize="10" fontWeight="600">Polar</text>
          <path d="M510,270 Q530,150 550,270" fill="#10B98122" stroke="#10B981" strokeWidth="2" />
          <text x="530" y="140" fill={TEXT2} textAnchor="middle" fontFamily="Source Sans 3" fontSize="10">Medium</text>
          <path d="M600,270 Q625,120 650,270" fill="#10B98122" stroke="#10B981" strokeWidth="2" />
          <text x="625" y="110" fill={TEXT2} textAnchor="middle" fontFamily="Source Sans 3" fontSize="10">Upolar</text>
        </svg>
      </Section>

      <Section title="Eksempel" icon="✏️">
        <p style={{ marginBottom: 8 }}>
          Tre stoffer analyseres med RP-HPLC (C18-kolonne, MF = vann/metanol): metanol, etanol, propanol.
          Estimer elueringsrekkefølgen.
        </p>
        <CollapsibleSteps
          steps={[
            "RP-LC: SF er upolar (C18). MF er polar (vann/metanol-blanding).",
            "Mest polare analytter elueres først (har svakest interaksjon med upolar SF).",
            "Polaritetsrekkefølge: metanol > etanol > propanol (kortere karbonkjede = mer polar).",
            "Elueringsorden: Metanol → Etanol → Propanol (mest polar først i RP).",
          ]}
        />
      </Section>

      <Huskeregel>
        NP: «<strong>N</strong>ormalt er <strong>P</strong>olart sist» (polar SF holder igjen polare stoffer lengst).
        RP: «<strong>R</strong>eversert — <strong>P</strong>olart først» (upolar SF slipper polare stoffer raskt).
        HPLC bruker alltid to kolonner: forkolonne + analytisk kolonne.
      </Huskeregel>

      <Eksamen>
        V2025 oppg 1c: Flervalg om HPLC (korrekte påstander). V2025 oppg 1e: Match metode med påstand (ionekrom., eksklusjon, affinitet, fordeling).
        V2021 oppg 4c/4e: NP vs RP, gradienttyper. V2022 oppg 1d: Eksklusjonskromatografi separerer basert på molekylstørrelse.
      </Eksamen>
    </>
  );
}


// ─── TAB 7: HPLC-detektorer & GC vs HPLC ────────────────────────
function Tab7() {
  return (
    <>
      <Section title="Nøkkelbegreper" icon="🏷️">
        <div style={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
          <Pill def="Fixed Wavelength Detector. Én fast bølgelengde. Enkleste spektrofotometriske detektor.">FWD</Pill>
          <Pill def="Variable Wavelength Detector. Kan velge bølgelengde. Velg λ med maks absorbans.">VWD</Pill>
          <Pill def="Diode Array Detector. Fullt UV-VIS spekter simultant. Dyrere, men mye mer info.">DAD</Pill>
          <Pill def="Massespektrometer. LC-MS krever fordamping av løsemiddel, mer utfordrende enn GC-MS.">MS (LC-MS)</Pill>
          <Pill def="Refractive Index-detektor. Universell. Måler forskjell i brytningsindeks. Lite sensitiv.">RI</Pill>
        </div>
      </Section>

      <Section title="Forklaring" icon="📖">
        <p style={{ color: TEXT, fontWeight: 600, marginBottom: 8 }}>Spektrofotometriske detektorer (HPLC)</p>
        <p>
          Vanligst i HPLC. Måler absorbert UV- eller synlig stråling. Absorbans er proporsjonal med konsentrasjon (Beer-Lamberts lov).
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, margin: "12px 0" }}>
          {[
            { t: "FWD", d: "Kun én fast bølgelengde. Enklest og billigst.", c: TEXT2, w: "Begrenset — må vite λ på forhånd." },
            { t: "VWD", d: "Kan velge ønsket bølgelengde. Velg λ med maks absorbans for maks sensitivitet.", c: "#3B82F6", w: "Én λ om gangen — mister info om andre λ." },
            { t: "DAD", d: "Fullt spekter — alle bølgelengder samtidig. Ekstra dimensjon. Avslører om flere komponenter bidrar til samme topp.", c: AMBER, w: "Dyrere enn VWD." },
          ].map((d, i) => (
            <div key={i} style={{ background: CARD_INNER, border: `1px solid ${BORDER}`, borderTop: `3px solid ${d.c}`, borderRadius: 6, padding: "12px 14px" }}>
              <div style={{ color: d.c, fontWeight: 700, fontSize: 14, fontFamily: "'JetBrains Mono', monospace", marginBottom: 6 }}>{d.t}</div>
              <div style={{ color: TEXT2, fontSize: 12, lineHeight: 1.5, marginBottom: 6 }}>{d.d}</div>
              <div style={{ color: "#EF4444", fontSize: 11, lineHeight: 1.4 }}>⚠ {d.w}</div>
            </div>
          ))}
        </div>

        <p style={{ color: TEXT, fontWeight: 600, margin: "16px 0 8px" }}>Andre HPLC-detektorer</p>
        <p>
          <strong style={{ color: TEXT }}>MS:</strong> Kraftig verktøy (LC-MS). Gir mye strukturinfo. Utfordring: MF er væske som må fordampes — volumøkning er enorm.
          GC-MS er enklere fordi prøven allerede er gass.
        </p>
        <p>
          <strong style={{ color: TEXT }}>RI:</strong> Universell detektor, måler brytningsindeks. Lite sensitiv, følsom for T-endringer. 
          Kan <em>ikke</em> brukes med gradienteluering (endret MF endrer brytningsindeks).
        </p>

        <p style={{ color: TEXT, fontWeight: 600, margin: "20px 0 8px" }}>Sammenligning GC vs HPLC</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, margin: "10px 0" }}>
          <div style={{ background: CARD_INNER, border: `1px solid ${BORDER}`, borderLeft: `3px solid #EF4444`, borderRadius: 6, padding: "14px 16px" }}>
            <div style={{ color: "#EF4444", fontWeight: 700, fontSize: 14, fontFamily: "'Plus Jakarta Sans', sans-serif", marginBottom: 8 }}>GC — Fordeler</div>
            <div style={{ color: TEXT2, fontSize: 13, lineHeight: 1.8 }}>
              • For flyktige, termisk stabile stoffer<br/>
              • Lavere kostnad<br/>
              • Raskere analyser<br/>
              • Høy oppløsning, høyt platetall<br/>
              • Enkelt å koble med MS (allerede gass)<br/>
              • Retensjon avh. kun av SF
            </div>
          </div>
          <div style={{ background: CARD_INNER, border: `1px solid ${BORDER}`, borderLeft: `3px solid #3B82F6`, borderRadius: 6, padding: "14px 16px" }}>
            <div style={{ color: "#3B82F6", fontWeight: 700, fontSize: 14, fontFamily: "'Plus Jakarta Sans', sans-serif", marginBottom: 8 }}>HPLC — Fordeler</div>
            <div style={{ color: TEXT2, fontSize: 13, lineHeight: 1.8 }}>
              • For ikke-flyktige, termisk ustabile stoffer<br/>
              • Egnet for uorganiske ioner<br/>
              • Allsidig (NP, RP, ionebytter, eksklusjon…)<br/>
              • Også manuell analyse mulig<br/>
              • Retensjon avh. av både SF og MF<br/>
              • To kolonner (forkolonne + analytisk)
            </div>
          </div>
        </div>
      </Section>

      <Section title="Visuell illustrasjon — Detektorvalg" icon="📊">
        <svg viewBox="0 0 700 280" style={{ width: "100%", maxWidth: 700 }}>
          <rect x="0" y="0" width="700" height="280" rx="8" fill={CARD_INNER} />
          <text x="350" y="28" fill={TEXT} textAnchor="middle" fontFamily="Plus Jakarta Sans" fontSize="14" fontWeight="700">Velg riktig detektor</text>

          {/* Flowchart */}
          {/* Start */}
          <rect x="250" y="45" width="200" height="35" rx="6" fill={CARD} stroke={AMBER} strokeWidth="2" />
          <text x="350" y="67" fill={AMBER} textAnchor="middle" fontFamily="Plus Jakarta Sans" fontSize="12" fontWeight="600">Analytt type?</text>

          {/* GC branch */}
          <line x1="280" y1="80" x2="160" y2="110" stroke={BORDER} strokeWidth="1.5" />
          <text x="200" y="98" fill={TEXT2} fontFamily="Source Sans 3" fontSize="10">Flyktig</text>
          <rect x="80" y="110" width="160" height="30" rx="6" fill={CARD} stroke="#EF4444" strokeWidth="1.5" />
          <text x="160" y="130" fill="#EF4444" textAnchor="middle" fontFamily="Plus Jakarta Sans" fontSize="11" fontWeight="600">GC-detektor</text>
          
          <line x1="110" y1="140" x2="80" y2="165" stroke={BORDER} strokeWidth="1" />
          <rect x="20" y="165" width="110" height="25" rx="4" fill={`${AMBER}18`} stroke={AMBER} strokeWidth="1" />
          <text x="75" y="182" fill={AMBER} textAnchor="middle" fontFamily="JetBrains Mono" fontSize="10">FID (organisk)</text>

          <line x1="160" y1="140" x2="160" y2="165" stroke={BORDER} strokeWidth="1" />
          <rect x="110" y="200" width="100" height="25" rx="4" fill={`#3B82F618`} stroke="#3B82F6" strokeWidth="1" />
          <text x="160" y="217" fill="#3B82F6" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="10">TCD (univ.)</text>

          <line x1="200" y1="140" x2="230" y2="165" stroke={BORDER} strokeWidth="1" />
          <rect x="170" y="165" width="110" height="25" rx="4" fill={`#8B5CF618`} stroke="#8B5CF6" strokeWidth="1" />
          <text x="225" y="182" fill="#8B5CF6" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="10">MS (struktur)</text>

          {/* HPLC branch */}
          <line x1="420" y1="80" x2="540" y2="110" stroke={BORDER} strokeWidth="1.5" />
          <text x="490" y="98" fill={TEXT2} fontFamily="Source Sans 3" fontSize="10">Ikke-flyktig</text>
          <rect x="460" y="110" width="160" height="30" rx="6" fill={CARD} stroke="#3B82F6" strokeWidth="1.5" />
          <text x="540" y="130" fill="#3B82F6" textAnchor="middle" fontFamily="Plus Jakarta Sans" fontSize="11" fontWeight="600">HPLC-detektor</text>

          <line x1="490" y1="140" x2="440" y2="165" stroke={BORDER} strokeWidth="1" />
          <rect x="380" y="165" width="120" height="25" rx="4" fill={`${AMBER}18`} stroke={AMBER} strokeWidth="1" />
          <text x="440" y="182" fill={AMBER} textAnchor="middle" fontFamily="JetBrains Mono" fontSize="10">DAD/VWD (UV)</text>

          <line x1="540" y1="140" x2="540" y2="165" stroke={BORDER} strokeWidth="1" />
          <rect x="490" y="200" width="100" height="25" rx="4" fill={`#8B5CF618`} stroke="#8B5CF6" strokeWidth="1" />
          <text x="540" y="217" fill="#8B5CF6" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="10">MS (LC-MS)</text>

          <line x1="590" y1="140" x2="640" y2="165" stroke={BORDER} strokeWidth="1" />
          <rect x="580" y="165" width="100" height="25" rx="4" fill={`#10B98118`} stroke="#10B981" strokeWidth="1" />
          <text x="630" y="182" fill="#10B981" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="10">RI (univ.)</text>

          <text x="350" y="268" fill={TEXT2} textAnchor="middle" fontFamily="Source Sans 3" fontSize="11">UV-detektorer brukes ikke til forbindelser uten UV-absorbans ({">"} ~210 nm)</text>
        </svg>
      </Section>

      <Section title="Eksempel" icon="✏️">
        <p style={{ marginBottom: 8 }}>
          Hvorfor er GC-MS enklere å koble enn LC-MS?
        </p>
        <CollapsibleSteps
          steps={[
            "MS krever at prøven er på gassfase (vakuum i analysatoren).",
            "GC: prøven er allerede gass ut av kolonnen → kan gå rett inn i MS.",
            "HPLC: prøven er løst i et løsemiddel (væske). Volumet øker enormt ved fordamping.",
            "Derfor må mye løsemiddel fjernes før prøven kan føres inn i MS → mer komplekst interface.",
          ]}
        />
      </Section>

      <Huskeregel>
        DAD = «Diode ser Alt» (fullt spekter). VWD = «Velg Wavelength» (én bølgelengde om gangen).
        RI kan <em>ikke</em> brukes med gradient (endret MF endrer RI). GC + MS = enkelt. HPLC + MS = volumproblemet.
      </Huskeregel>

      <Eksamen>
        V2022 oppg 3: DAD vs VWD (3p). V2024 oppg 2a: GC-MS vs LC-MS — hvilken er enklest? (utfordring med LC-MS).
        V2023 oppg 3b: Flervalg om spektrofotometriske detektorer. V2025 oppg 1d: GC vs HPLC sammenligning (8p).
      </Eksamen>
    </>
  );
}


// ─── MAIN APP ────────────────────────────────────────────────────
const TABS = [
  { id: 0, label: "Grunnbegreper", short: "1" },
  { id: 1, label: "N, H & Van Deemter", short: "2" },
  { id: 2, label: "Oppløsning & Gradient", short: "3" },
  { id: 3, label: "GC", short: "4" },
  { id: 4, label: "GC-detektorer", short: "5" },
  { id: 5, label: "HPLC", short: "6" },
  { id: 6, label: "HPLC-det. & GC vs HPLC", short: "7" },
];

const TAB_COMPONENTS = [Tab1, Tab2, Tab3, Tab4, Tab5, Tab6, Tab7];

export default function KromatografiGuide() {
  const [activeTab, setActiveTab] = useState(0);
  const [visited, setVisited] = useState(new Set([0]));
  const contentRef = useRef(null);

  const handleTabClick = (id) => {
    setActiveTab(id);
    setVisited(prev => new Set([...prev, id]));
    if (contentRef.current) contentRef.current.scrollTop = 0;
  };

  const ActiveComponent = TAB_COMPONENTS[activeTab];

  return (
    <div
      style={{
        background: BG,
        minHeight: "100vh",
        fontFamily: "'Source Sans 3', sans-serif",
        color: TEXT,
      }}
    >
      {/* ── Header ── */}
      <div
        style={{
          background: `linear-gradient(135deg, ${AMBER_DIM} 0%, ${BG} 100%)`,
          borderBottom: `2px solid ${AMBER}44`,
          padding: "20px 24px 14px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 4 }}>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 8,
              background: AMBER,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 18,
            }}
          >
            🧪
          </div>
          <div>
            <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 20, fontWeight: 800, color: TEXT }}>
              Emne 3 — Kromatografi
            </div>
            <div style={{ fontSize: 13, color: TEXT2, fontFamily: "'Source Sans 3', sans-serif" }}>
              IMAK2004 Kjemisk Analyse · NTNU
            </div>
          </div>
        </div>

        {/* Progress */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 10 }}>
          <span style={{ fontSize: 12, color: TEXT2 }}>Fremgang:</span>
          <div style={{ flex: 1, height: 6, background: `${BORDER}88`, borderRadius: 3, overflow: "hidden" }}>
            <div
              style={{
                width: `${(visited.size / TABS.length) * 100}%`,
                height: "100%",
                background: AMBER,
                borderRadius: 3,
                transition: "width 0.4s ease",
              }}
            />
          </div>
          <span style={{ fontSize: 12, color: AMBER, fontFamily: "'JetBrains Mono', monospace" }}>
            {visited.size}/{TABS.length}
          </span>
        </div>
      </div>

      {/* ── Tab bar ── */}
      <div
        style={{
          display: "flex",
          overflowX: "auto",
          background: CARD,
          borderBottom: `1px solid ${BORDER}`,
          padding: "0 8px",
          gap: 2,
          scrollbarWidth: "none",
        }}
      >
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            style={{
              padding: "10px 14px",
              border: "none",
              borderBottom: activeTab === tab.id ? `3px solid ${AMBER}` : "3px solid transparent",
              background: "transparent",
              color: activeTab === tab.id ? AMBER : TEXT2,
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: 13,
              fontWeight: activeTab === tab.id ? 700 : 500,
              cursor: "pointer",
              whiteSpace: "nowrap",
              transition: "all 0.2s",
              position: "relative",
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <span
              style={{
                width: 18,
                height: 18,
                borderRadius: "50%",
                background: visited.has(tab.id) ? (activeTab === tab.id ? AMBER : `${AMBER}44`) : "transparent",
                border: `1.5px solid ${visited.has(tab.id) ? AMBER : BORDER}`,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 10,
                color: visited.has(tab.id) ? (activeTab === tab.id ? BG : AMBER) : TEXT2,
                fontWeight: 700,
                fontFamily: "'JetBrains Mono', monospace",
                flexShrink: 0,
              }}
            >
              {visited.has(tab.id) ? "✓" : tab.short}
            </span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* ── Tab Header ── */}
      <div
        style={{
          background: `${AMBER}15`,
          borderBottom: `1px solid ${AMBER}33`,
          padding: "12px 24px",
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        <div
          style={{
            background: AMBER,
            color: BG,
            fontFamily: "'JetBrains Mono', monospace",
            fontWeight: 700,
            fontSize: 13,
            padding: "3px 10px",
            borderRadius: 4,
          }}
        >
          {TABS[activeTab].short}/7
        </div>
        <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 16, fontWeight: 700, color: TEXT }}>
          {TABS[activeTab].label}
        </div>
      </div>

      {/* ── Content ── */}
      <div ref={contentRef} style={{ padding: "20px 24px 40px", maxWidth: 800, margin: "0 auto" }}>
        <ActiveComponent />
      </div>

      {/* ── Navigation ── */}
      <div
        style={{
          padding: "12px 24px 20px",
          maxWidth: 800,
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          gap: 12,
        }}
      >
        <button
          onClick={() => activeTab > 0 && handleTabClick(activeTab - 1)}
          disabled={activeTab === 0}
          style={{
            padding: "10px 20px",
            borderRadius: 8,
            border: `1px solid ${activeTab === 0 ? BORDER : AMBER}44`,
            background: activeTab === 0 ? "transparent" : `${AMBER}12`,
            color: activeTab === 0 ? TEXT2 : AMBER,
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: 14,
            fontWeight: 600,
            cursor: activeTab === 0 ? "not-allowed" : "pointer",
            opacity: activeTab === 0 ? 0.4 : 1,
          }}
        >
          ← Forrige
        </button>
        <button
          onClick={() => activeTab < TABS.length - 1 && handleTabClick(activeTab + 1)}
          disabled={activeTab === TABS.length - 1}
          style={{
            padding: "10px 20px",
            borderRadius: 8,
            border: `1px solid ${activeTab === TABS.length - 1 ? BORDER : AMBER}44`,
            background: activeTab === TABS.length - 1 ? "transparent" : `${AMBER}18`,
            color: activeTab === TABS.length - 1 ? TEXT2 : AMBER,
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: 14,
            fontWeight: 600,
            cursor: activeTab === TABS.length - 1 ? "not-allowed" : "pointer",
            opacity: activeTab === TABS.length - 1 ? 0.4 : 1,
          }}
        >
          Neste →
        </button>
      </div>
    </div>
  );
}
