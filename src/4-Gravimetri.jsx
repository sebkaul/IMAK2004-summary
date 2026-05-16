import { useState, useCallback, useEffect } from "react";

// ─── Fonts ───
const fontLink = document.createElement("link");
fontLink.href = "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Source+Sans+3:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500;600&display=swap";
fontLink.rel = "stylesheet";
document.head.appendChild(fontLink);

// ─── Colors ───
const C = {
  bg: "#0F172A", card: "#1E293B", border: "#334155",
  text: "#F8FAFC", muted: "#94A3B8", accent: "#EF4444",
  accentDim: "rgba(239,68,68,0.15)", accentBorder: "rgba(239,68,68,0.3)",
  accentGlow: "rgba(239,68,68,0.08)",
};

// ─── Reusable Components ───

function Pill({ children, def, color = C.accent }) {
  const [show, setShow] = useState(false);
  return (
    <span
      onClick={() => setShow(!show)}
      style={{
        display: "inline-block", cursor: "pointer", position: "relative",
        background: `${color}22`, border: `1px solid ${color}44`,
        borderRadius: 6, padding: "4px 12px", margin: "3px 4px",
        fontFamily: "'Source Sans 3'", fontSize: 14, fontWeight: 500,
        color: color, transition: "all 0.2s",
      }}
    >
      {children}
      {show && def && (
        <span style={{
          position: "absolute", left: 0, top: "110%", zIndex: 20,
          background: C.card, border: `1px solid ${C.border}`, borderRadius: 8,
          padding: "8px 12px", fontSize: 13, color: C.muted, width: 260,
          boxShadow: "0 8px 24px rgba(0,0,0,0.4)", lineHeight: 1.5,
          fontWeight: 400,
        }}>
          {def}
        </span>
      )}
    </span>
  );
}

function Formula({ children }) {
  return (
    <code style={{
      fontFamily: "'JetBrains Mono'", fontSize: 14, color: "#F87171",
      background: "rgba(239,68,68,0.08)", padding: "2px 6px", borderRadius: 4,
    }}>
      {children}
    </code>
  );
}

function FormulaBlock({ children }) {
  return (
    <div style={{
      fontFamily: "'JetBrains Mono'", fontSize: 14, color: "#FCA5A5",
      background: "rgba(239,68,68,0.06)", border: `1px solid ${C.accentBorder}`,
      borderRadius: 8, padding: "14px 18px", margin: "12px 0",
      lineHeight: 1.8, overflowX: "auto", whiteSpace: "pre-wrap",
    }}>
      {children}
    </div>
  );
}

function Section({ title, icon, children }) {
  return (
    <div style={{ marginBottom: 28 }}>
      <h3 style={{
        fontFamily: "'Plus Jakarta Sans'", fontSize: 16, fontWeight: 700,
        color: C.accent, marginBottom: 10, display: "flex", alignItems: "center", gap: 8,
        letterSpacing: 0.3,
      }}>
        <span style={{ fontSize: 18 }}>{icon}</span> {title}
      </h3>
      <div style={{ color: C.text, fontFamily: "'Source Sans 3'", fontSize: 15, lineHeight: 1.75 }}>
        {children}
      </div>
    </div>
  );
}

function Step({ n, title, children }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{
      border: `1px solid ${open ? C.accentBorder : C.border}`,
      borderRadius: 8, marginBottom: 8, overflow: "hidden",
      background: open ? C.accentGlow : "transparent",
      transition: "all 0.25s",
    }}>
      <div
        onClick={() => setOpen(!open)}
        style={{
          padding: "10px 14px", cursor: "pointer", display: "flex",
          alignItems: "center", gap: 10, userSelect: "none",
        }}
      >
        <span style={{
          width: 26, height: 26, borderRadius: "50%",
          background: open ? C.accent : C.border, color: open ? "#fff" : C.muted,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: "'JetBrains Mono'", fontSize: 13, fontWeight: 600, flexShrink: 0,
        }}>
          {n}
        </span>
        <span style={{
          fontFamily: "'Source Sans 3'", fontSize: 14, fontWeight: 600,
          color: open ? C.text : C.muted, flex: 1,
        }}>
          {title}
        </span>
        <span style={{ color: C.muted, fontSize: 12, transform: open ? "rotate(90deg)" : "none", transition: "transform 0.2s" }}>▶</span>
      </div>
      {open && (
        <div style={{
          padding: "6px 14px 14px 50px",
          fontFamily: "'JetBrains Mono'", fontSize: 13, color: "#FCA5A5",
          lineHeight: 1.8,
        }}>
          {children}
        </div>
      )}
    </div>
  );
}

function Huskeregel({ children }) {
  return (
    <div style={{
      background: "rgba(239,68,68,0.07)",
      border: `2px solid ${C.accent}`,
      borderRadius: 10, padding: "14px 18px", margin: "12px 0",
      position: "relative",
    }}>
      <div style={{
        position: "absolute", top: -12, left: 16,
        background: C.accent, color: "#fff", padding: "2px 12px",
        borderRadius: 4, fontFamily: "'Plus Jakarta Sans'", fontSize: 12,
        fontWeight: 700, letterSpacing: 0.5,
      }}>
        💡 HUSKEREGEL
      </div>
      <div style={{
        fontFamily: "'Source Sans 3'", fontSize: 14, color: C.text,
        lineHeight: 1.7, marginTop: 6,
      }}>
        {children}
      </div>
    </div>
  );
}

function ExamBox({ children }) {
  return (
    <div style={{
      background: "rgba(239,68,68,0.04)",
      borderLeft: `3px solid ${C.accent}`,
      borderRadius: "0 8px 8px 0", padding: "10px 16px", margin: "8px 0",
    }}>
      <div style={{
        fontFamily: "'Plus Jakarta Sans'", fontSize: 12, fontWeight: 700,
        color: C.accent, marginBottom: 4, letterSpacing: 0.8,
      }}>
        📋 EKSAMENSRELEVANS
      </div>
      <div style={{ fontFamily: "'Source Sans 3'", fontSize: 13, color: C.muted, lineHeight: 1.6 }}>
        {children}
      </div>
    </div>
  );
}

// sub/superscript helpers
const sub = (t) => <sub style={{ fontSize: "0.75em" }}>{t}</sub>;
const sup = (t) => <sup style={{ fontSize: "0.75em" }}>{t}</sup>;

// ════════════════════════════════════════════════════════
// TAB 1: Gravimetrisk analyse
// ════════════════════════════════════════════════════════
function Tab1() {
  return (
    <>
      <Section title="Nøkkelbegreper" icon="🏷️">
        <div style={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
          <Pill def="Kvantitativ analyse basert på massemålinger av ren forbindelse.">Gravimetri</Pill>
          <Pill def="Analytten felles ut fra løsning, filtreres, tørkes og veies.">Fellingsgravimetri</Pill>
          <Pill def="Analytten avgis som gass (f.eks. H₂O, CO₂).">Fordampingsgravimetri</Pill>
          <Pill def="Analytten avsettes på elektrode ved elektrolyse.">Elektrogravimetri</Pill>
          <Pill def="Reagerer kun med analytten.">Spesifikk reagens</Pill>
          <Pill def="Reagerer med begrenset antall forbindelser inkl. analytten.">Selektiv reagens</Pill>
          <Pill def="Kjemisk konstant for løselighet: Ksp = [kation]·[anion].">Løselighetsprodukt (K_sp)</Pill>
          <Pill def="Spesifikk fellingsreagens for Ni²⁺.">Dimetylglyoksim (DMG)</Pill>
        </div>
      </Section>

      <Section title="Forklaring" icon="📖">
        <p>
          <strong>Gravimetri</strong> er en gruppe kvantitative analysemetoder der vi bruker en analysevekt
          til å gjøre massemålinger. Det finnes fire hovedtyper: fellingsgravimetri, fordampingsgravimetri,
          elektrogravimetri og gravimetrisk titrering.
        </p>
        <p style={{ marginTop: 10 }}>
          I <strong>fellingsgravimetri</strong> følger vi denne prosedyren:
        </p>
        <p style={{ color: C.muted, fontSize: 14, margin: "8px 0", fontStyle: "italic" }}>
          Tilsett fellingsreagens → analytten felles ut → filtrering → vasking → tørking/varmebehandling → veiing
        </p>
        <p style={{ marginTop: 10 }}>
          <strong>Krav til utfellingen:</strong> Den bør være fri for forurensninger, ha kjent sammensetning,
          være filtrerbar og vaskbar, og ha lav løselighet (lav K{sub("sp")}).
        </p>
        <p style={{ marginTop: 10 }}>
          <strong>Fellingsreagenser</strong> kan være uorganiske (vanligvis ikke spesifikke) eller
          kelatdannere som kan være svært spesifikke. Eksempel: Dimetylglyoksim (DMG) er spesifikk
          for Ni{sup("2+")}.
        </p>
        <p style={{ marginTop: 10 }}>
          <strong>Varmebehandling:</strong> Etter filtrering/vasking varmebehandles utfellingen til
          konstant masse. Varmebehandlingen kan endre den kjemiske sammensetningen
          (f.eks. Al(OH){sub("3")} → Al{sub("2")}O{sub("3")}).
        </p>
        <p style={{ marginTop: 10 }}>
          <strong>Fordampingsgravimetri</strong> brukes til å bestemme vanninnhold eller CO{sub("2")}.
          Direkte analyse: vann samles på tørkemiddel som veies. Indirekte: prøven veies før og etter
          fordamping.
        </p>

        <FormulaBlock>
{`Gravimetrisk beregning:

  n(bunnfall) = m(bunnfall) / M(bunnfall)
  n(analytt)  = n(bunnfall) × støkiometrisk faktor
  m(analytt)  = n(analytt) × M(analytt)
  masse%      = m(analytt) / m(prøve) × 100%`}
        </FormulaBlock>
      </Section>

      <Section title="Visuell illustrasjon" icon="📊">
        <svg viewBox="0 0 700 180" style={{ width: "100%", maxWidth: 700 }}>
          {/* Flowchart: Gravimetri prosedyre */}
          {[
            { x: 10, label: "Tilsett\nfellingsreagens" },
            { x: 130, label: "Utfelling\ndannes" },
            { x: 250, label: "Filtrering" },
            { x: 370, label: "Vasking" },
            { x: 490, label: "Tørking/\nvarmebehandl." },
            { x: 610, label: "Veiing" },
          ].map((item, i) => (
            <g key={i}>
              <rect x={item.x} y={50} width={100} height={60} rx={8}
                fill={i === 5 ? "rgba(239,68,68,0.25)" : C.card}
                stroke={i === 5 ? C.accent : C.border} strokeWidth={1.5} />
              {item.label.split("\n").map((line, li) => (
                <text key={li} x={item.x + 50} y={76 + li * 16}
                  textAnchor="middle" fill={C.text}
                  style={{ fontSize: 11, fontFamily: "'Source Sans 3'" }}>
                  {line}
                </text>
              ))}
              {i < 5 && (
                <polygon points={`${item.x + 106},80 ${item.x + 124},80 ${item.x + 124},76 ${item.x + 130},82 ${item.x + 124},88 ${item.x + 124},84 ${item.x + 106},84`}
                  fill={C.accent} opacity={0.6} />
              )}
            </g>
          ))}
          <text x={350} y={145} textAnchor="middle" fill={C.muted}
            style={{ fontSize: 12, fontFamily: "'Source Sans 3'", fontStyle: "italic" }}>
            Resultat: m(bunnfall) → beregn n(analytt) → finn konsentrasjon eller masse%
          </text>
        </svg>
      </Section>

      <Section title="Eksempel — Bestemmelse av sulfat" icon="✏️">
        <p style={{ fontSize: 13, color: C.muted, marginBottom: 8 }}>
          Vi bestemmer mengden SO{sub("4")}{sup("2−")} i 50,00 mL løsning gravimetrisk.
          BaCl{sub("2")} tilsettes → BaSO{sub("4")}(s). Etter tørking veier bunnfallet 0,9482 g.
        </p>
        <Step n={1} title="Skriv reaksjonslikning">
          Ba{sup("2+")} + SO{sub("4")}{sup("2−")} → BaSO{sub("4")}(s){"\n"}
          Støkiometri: 1:1
        </Step>
        <Step n={2} title="Beregn stoffmengde bunnfall">
          n(BaSO₄) = m / M = 0,9482 g / 233,38 g/mol ≈ 4,063 mmol
        </Step>
        <Step n={3} title="Finn konsentrasjon av sulfat">
          n(SO₄²⁻) = n(BaSO₄) = 4,063 mmol{"\n"}
          c(SO₄²⁻) = n / V = 4,063 mmol / 50,00 mL = 0,08126 M
        </Step>
      </Section>

      <Huskeregel>
        <strong>Gravimetri = «vei og regn bakover».</strong> Du kjenner massen av bunnfallet og
        molvekten. Regn stoffmengde → bruk støkiometri → finn analytten. Sjekk alltid om
        varmebehandling endrer formelen (f.eks. Al(OH)₃ → Al₂O₃ — da er det oksid du veier!).
      </Huskeregel>

      <ExamBox>
        Gravimetrisk beregning av masse% har kommet på eksamen V2024 (oppg. 6a: Al i prøve via Al₂O₃),
        V2022 (oppg. 11: KBr via AgBr), og V2021 (oppg. 3a: relativ overmetting forklaring). Forvent
        beregningsoppgaver der du må finne masse% fra bunnfallsvekt + støkiometri.
      </ExamBox>
    </>
  );
}

// ════════════════════════════════════════════════════════
// TAB 2: Partikkelstørrelse og relativ overmetting
// ════════════════════════════════════════════════════════
function Tab2() {
  return (
    <>
      <Section title="Nøkkelbegreper" icon="🏷️">
        <div style={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
          <Pill def="Noen få ioner danner fast stoff — gir mange, små partikler.">Kimdannelse (nukleering)</Pill>
          <Pill def="Ioner avsettes på eksisterende krystaller — gir færre, større partikler.">Krystallvekst (kornvekst)</Pill>
          <Pill def="(Q − S) / S der Q er faktisk konsentrasjon, S er likevektskonsentrasjon.">Relativ overmetting</Pill>
          <Pill def="Partikler 10⁻⁹ – 10⁻⁶ m, vanskelig å filtrere, stabile pga dobbeltlag.">Kolloid suspensjon</Pill>
          <Pill def="Kolloide partikler slår seg sammen — økes ved oppvarming/røring.">Koagulering</Pill>
          <Pill def="Urenheter som følger med utfellingen (overflateadsorpsjon, okkulsjoner, etc.).">Medfellinger</Pill>
          <Pill def="Fellingsreagensen dannes sakte i løsningen via kjemisk reaksjon.">Utfelling fra homogen løsning</Pill>
        </div>
      </Section>

      <Section title="Forklaring" icon="📖">
        <p>
          Når en utfelling dannes, konkurrerer to mekanismer: <strong>kimdannelse</strong> (nukleering)
          og <strong>krystallvekst</strong> (kornvekst). Vi ønsker at krystallvekst dominerer fordi det
          gir større partikler som er lettere å filtrere.
        </p>
        <p style={{ marginTop: 10 }}>
          Dette styres av <strong>relativ overmetting</strong>:
        </p>
        <FormulaBlock>
{`  Relativ overmetting = (Q − S) / S

  Q = faktisk konsentrasjon av analytten
  S = likevektskonsentrasjon (fra Ksp)

  Lav relativ overmetting → krystallvekst dominerer (ønskelig!)
  Høy relativ overmetting → kimdannelse dominerer (uønsket)`}
        </FormulaBlock>
        <p style={{ marginTop: 10 }}>
          <strong>Kontrollere relativ overmetting:</strong> Fortynn løsningen (reduserer Q), tilsett
          reagensen sakte, rør godt (jevner ut Q), juster temperatur/pH (påvirker S).
        </p>
        <p style={{ marginTop: 10 }}>
          <strong>Kolloide utfellinger</strong> er stabile pga. dobbeltlag-struktur som gir elektrostatisk
          frastøting. Koagulering (at kolloide slår seg sammen) oppnås ved oppvarming, røring
          eller tilsetting av elektrolytt.
        </p>
        <p style={{ marginTop: 10 }}>
          <strong>Medfellinger</strong> er forurensninger som følger med:
        </p>
        <ul style={{ color: C.muted, fontSize: 14, paddingLeft: 20, lineHeight: 1.8 }}>
          <li><strong style={{ color: C.text }}>Overflateadsorpsjon</strong> — størst problem ved små partikler</li>
          <li><strong style={{ color: C.text }}>Miksede krystaller</strong> — ioner «bytter plass» i gitteret</li>
          <li><strong style={{ color: C.text }}>Okkulsjoner</strong> — ioner innelukket i hulrom</li>
          <li><strong style={{ color: C.text }}>Mekaniske inneslutninger</strong> — krystaller vokser sammen og fanger løsning</li>
        </ul>
        <p style={{ marginTop: 10 }}>
          <strong>Utfelling fra homogen løsning</strong> (f.eks. hydrolyse av urea som langsomt
          danner OH{sup("−")}) gir lavere relativ overmetting → større, renere partikler.
        </p>
      </Section>

      <Section title="Visuell illustrasjon" icon="📊">
        {/* SVG: Relativ overmetting vs partikkeltype */}
        <svg viewBox="0 0 600 260" style={{ width: "100%", maxWidth: 600 }}>
          {/* Axes */}
          <line x1={80} y1={200} x2={560} y2={200} stroke={C.border} strokeWidth={2} />
          <line x1={80} y1={200} x2={80} y2={30} stroke={C.border} strokeWidth={2} />
          <text x={320} y={240} textAnchor="middle" fill={C.muted} style={{ fontSize: 12, fontFamily: "'Source Sans 3'" }}>
            Relativ overmetting (Q − S) / S →
          </text>
          <text x={25} y={115} textAnchor="middle" fill={C.muted}
            style={{ fontSize: 12, fontFamily: "'Source Sans 3'" }}
            transform="rotate(-90, 25, 115)">
            Partikkelstørrelse →
          </text>

          {/* Curve */}
          <path d="M 100 60 Q 200 65, 280 100 Q 360 140, 440 170 Q 500 185, 540 190"
            fill="none" stroke={C.accent} strokeWidth={2.5} />

          {/* Annotations */}
          <rect x={90} y={40} width={120} height={40} rx={6} fill="rgba(16,185,129,0.15)" stroke="rgba(16,185,129,0.4)" strokeWidth={1} />
          <text x={150} y={56} textAnchor="middle" fill="#10B981" style={{ fontSize: 11, fontFamily: "'Source Sans 3'", fontWeight: 600 }}>Krystallvekst</text>
          <text x={150} y={70} textAnchor="middle" fill="#10B981" style={{ fontSize: 10, fontFamily: "'Source Sans 3'" }}>store partikler ✓</text>

          <rect x={400} y={145} width={140} height={40} rx={6} fill="rgba(239,68,68,0.15)" stroke="rgba(239,68,68,0.4)" strokeWidth={1} />
          <text x={470} y={161} textAnchor="middle" fill={C.accent} style={{ fontSize: 11, fontFamily: "'Source Sans 3'", fontWeight: 600 }}>Kimdannelse</text>
          <text x={470} y={175} textAnchor="middle" fill={C.accent} style={{ fontSize: 10, fontFamily: "'Source Sans 3'" }}>mange små partikler ✗</text>

          {/* Circles representing particles */}
          {[0, 1, 2].map(i => (
            <circle key={`big${i}`} cx={120 + i * 30} cy={100 + i * 5} r={10 - i} fill="rgba(16,185,129,0.3)" stroke="#10B981" strokeWidth={1} />
          ))}
          {[0, 1, 2, 3, 4, 5, 6, 7].map(i => (
            <circle key={`sm${i}`} cx={430 + (i % 4) * 12} cy={115 + Math.floor(i / 4) * 12} r={3} fill="rgba(239,68,68,0.4)" stroke={C.accent} strokeWidth={0.8} />
          ))}
        </svg>
      </Section>

      <Section title="Eksempel — Kontrollere partikkelstørrelse" icon="✏️">
        <p style={{ fontSize: 13, color: C.muted, marginBottom: 8 }}>
          Du vil felle Al(OH){sub("3")} fra en løsning med Al{sup("3+")}. Hvordan oppnår du store,
          filtrerbare krystaller?
        </p>
        <Step n={1} title="Identifiser parameterne i (Q − S) / S">
          Q = faktisk konsentrasjon av Al³⁺ og OH⁻{"\n"}
          S = likevektskonsentrasjon bestemt av Ksp for Al(OH)₃
        </Step>
        <Step n={2} title="Redusér Q">
          Fortynn løsningen, tilsett fellingsreagens (OH⁻) sakte, rør godt.
        </Step>
        <Step n={3} title="Øk S">
          Varme opp (øker løseligheten). Bruk utfelling fra homogen løsning:
          hydrolyse av urea gir OH⁻ langsomt.{"\n"}
          (H₂N)₂CO + H₂O → CO₂ + 2NH₄⁺ + 2OH⁻
        </Step>
        <Step n={4} title="Resultat">
          Lav relativ overmetting → krystallvekst dominerer → store, rene partikler
          → lettere å filtrere og vaske → bedre analysekvalitet.
        </Step>
      </Section>

      <Huskeregel>
        <strong>Lav overmetting = store krystaller.</strong> Husk: «Sakte og fortynnet» er oppskriften.
        Tenk på det som å dyrke krystaller — tålmodighet gir store krystaller.
        Formelen (Q−S)/S: Senk Q (fortynn, tilsett sakte) og øk S (varm opp).
      </Huskeregel>

      <ExamBox>
        Relativ overmetting og krystallvekst vs kimdannelse er et gjengangertema. V2021 oppg. 3a:
        «Forklar hva relativ overmetting er, hvordan det kan kontrolleres, og hvorfor det er viktig i
        gravimetrisk analyse» (5 poeng). V2023 oppg. 3e: «Hva er sant om medfellinger?»
        Forvent teorioppgaver der du skal forklare konseptene + vite at medfellinger kan gi
        både positiv og negativ feil.
      </ExamBox>
    </>
  );
}

// ════════════════════════════════════════════════════════
// TAB 3: Fellingstitrering — Argentometri
// ════════════════════════════════════════════════════════
function Tab3() {
  return (
    <>
      <Section title="Nøkkelbegreper" icon="🏷️">
        <div style={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
          <Pill def="Titrering der titrerreaksjonen er en fellingsreaksjon.">Fellingstitrering</Pill>
          <Pill def="Fellingstitrering med Ag⁺ som titrant. Brukes for halogenider.">Argentometri</Pill>
          <Pill def="Løselighetsproduktet — likevektskonstant for oppløsning av tungt løselig salt.">K_sp</Pill>
          <Pill def="AgNO₃ titrant + kromat-indikator. Endepunkt: rødbrunt Ag₂CrO₄ bunnfall.">Mohrs metode</Pill>
          <Pill def="Tilbaketitrering: overskudd Ag⁺ titreres med KSCN, Fe³⁺-indikator.">Volhards metode</Pill>
          <Pill def="Adsorpsjonsindikator (f.eks. fluorescein) adsorberes på bunnfall ved ekvivalenspunkt.">Fajans metode</Pill>
          <Pill def="Volumforskjellen mellom endepunkt og ekvivalenspunkt.">Titrerfeil</Pill>
        </div>
      </Section>

      <Section title="Forklaring" icon="📖">
        <p>
          <strong>Fellingstitrering</strong> er en titrering der titrerreaksjonen er en fellingsreaksjon.
          Reaksjonen må være fullstendig (lav K{sub("sp")}), rask, og ha kjent støkiometri.
          Den vanligste typen er <strong>argentometri</strong> der AgNO{sub("3")} brukes som titrant.
        </p>
        <FormulaBlock>
{`  Ag⁺ + Cl⁻ → AgCl(s)    Ksp = 1,8 × 10⁻¹⁰
  Ag⁺ + Br⁻ → AgBr(s)    Ksp = 5,0 × 10⁻¹³
  Ag⁺ + I⁻  → AgI(s)     Ksp = 8,3 × 10⁻¹⁷

  Lavest Ksp felles først: I⁻ → Br⁻ → Cl⁻`}
        </FormulaBlock>

        <p style={{ marginTop: 12 }}>
          <strong>Titrering med flere anioner:</strong> Hvis K{sub("sp")}-verdiene er tilstrekkelig
          forskjellige, felles det ene anionet fullstendig før det andre begynner. Det gir to
          ekvivalenspunkt på titrerkurven og lar oss bestemme hvert anion separat.
        </p>

        <p style={{ marginTop: 14, fontWeight: 600, color: C.accent }}>Tre metoder for endepunktsdeteksjon:</p>
        <div style={{ marginTop: 8 }}>
          <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: 14, marginBottom: 8 }}>
            <strong style={{ color: "#FBBF24" }}>Mohrs metode:</strong>
            <span style={{ color: C.muted, fontSize: 14 }}> Titrant AgNO₃, indikator CrO₄²⁻ (kromat).
            Ved ekvivalenspunkt dannes rødbrunt Ag₂CrO₄(s). Problem: kromat er kreftfremkallende.</span>
          </div>
          <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: 14, marginBottom: 8 }}>
            <strong style={{ color: "#34D399" }}>Volhards metode:</strong>
            <span style={{ color: C.muted, fontSize: 14 }}> Tilbaketitrering. Overskudd Ag⁺ tilsettes,
            overskuddet titreres med KSCN. Indikator: Fe(NO₃)₃ — gir rødfarget [Fe(SCN)]²⁺ ved endepunkt.</span>
          </div>
          <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: 14 }}>
            <strong style={{ color: "#60A5FA" }}>Fajans metode:</strong>
            <span style={{ color: C.muted, fontSize: 14 }}> Adsorpsjonsindikator (f.eks. fluorescein)
            adsorberes på bunnfallets overflate ved ekvivalenspunkt → fargeendring.</span>
          </div>
        </div>
      </Section>

      <Section title="Visuell illustrasjon — Titrerkurve (Argentometri)" icon="📊">
        <svg viewBox="0 0 600 320" style={{ width: "100%", maxWidth: 600 }}>
          {/* Axes */}
          <line x1={70} y1={270} x2={560} y2={270} stroke={C.border} strokeWidth={2} />
          <line x1={70} y1={270} x2={70} y2={20} stroke={C.border} strokeWidth={2} />
          <text x={315} y={305} textAnchor="middle" fill={C.muted} style={{ fontSize: 12, fontFamily: "'Source Sans 3'" }}>
            V(AgNO₃) / mL →
          </text>
          <text x={20} y={145} textAnchor="middle" fill={C.muted}
            style={{ fontSize: 12, fontFamily: "'Source Sans 3'" }}
            transform="rotate(-90, 20, 145)">
            pAg →
          </text>

          {/* pAg labels */}
          {[2, 4, 6, 8, 10].map((v, i) => (
            <g key={i}>
              <text x={60} y={270 - (v / 12) * 240} textAnchor="end" fill={C.muted} style={{ fontSize: 10, fontFamily: "'JetBrains Mono'" }}>{v}</text>
              <line x1={67} y1={270 - (v / 12) * 240} x2={70} y2={270 - (v / 12) * 240} stroke={C.border} />
            </g>
          ))}

          {/* Two-halide titration curve (I⁻ then Cl⁻) */}
          <path
            d={`M 80 230
                C 120 228, 180 225, 220 220
                Q 240 210, 250 160
                C 255 130, 260 120, 270 115
                Q 285 110, 320 108
                C 360 105, 390 100, 410 90
                Q 420 70, 425 50
                C 428 40, 435 38, 460 35
                L 540 33`}
            fill="none" stroke={C.accent} strokeWidth={2.5} />

          {/* Eq points */}
          <line x1={250} y1={25} x2={250} y2={265} stroke="#FBBF24" strokeWidth={1} strokeDasharray="4,4" />
          <text x={250} y={18} textAnchor="middle" fill="#FBBF24" style={{ fontSize: 10, fontFamily: "'Source Sans 3'", fontWeight: 600 }}>
            Ekv.pkt 1 (I⁻)
          </text>
          <line x1={425} y1={25} x2={425} y2={265} stroke="#34D399" strokeWidth={1} strokeDasharray="4,4" />
          <text x={425} y={18} textAnchor="middle" fill="#34D399" style={{ fontSize: 10, fontFamily: "'Source Sans 3'", fontWeight: 600 }}>
            Ekv.pkt 2 (Cl⁻)
          </text>

          {/* Region labels */}
          <text x={160} y={255} textAnchor="middle" fill="#FCA5A5" style={{ fontSize: 10, fontFamily: "'Source Sans 3'" }}>
            I⁻ felles
          </text>
          <text x={340} y={255} textAnchor="middle" fill="#FCA5A5" style={{ fontSize: 10, fontFamily: "'Source Sans 3'" }}>
            Cl⁻ felles
          </text>
          <text x={500} y={255} textAnchor="middle" fill="#FCA5A5" style={{ fontSize: 10, fontFamily: "'Source Sans 3'" }}>
            Overskudd Ag⁺
          </text>
        </svg>
        <p style={{ fontSize: 12, color: C.muted, fontStyle: "italic", textAlign: "center", marginTop: 4 }}>
          Titrerkurve for argentometrisk titrering av I⁻ og Cl⁻ med AgNO₃. Lavest K{sub("sp")} felles først.
        </p>
      </Section>

      <Section title="Eksempel — V2025 Oppg. 5: Jodid og klorid" icon="✏️">
        <p style={{ fontSize: 13, color: C.muted, marginBottom: 8 }}>
          50,00 mL løsning med I⁻ og Cl⁻ titreres med 0,08452 M AgNO₃. Fra titrerkurven:
          V₁ = 34,43 mL (ekv.pkt I⁻), V₂ = 58,80 mL (ekv.pkt Cl⁻).
        </p>
        <Step n={1} title="Identifiser titrerreaksjoner og rekkefølge">
          Ag⁺ + I⁻ → AgI(s)   (felles først, lavest Ksp){"\n"}
          Ag⁺ + Cl⁻ → AgCl(s) (felles etterpå)
        </Step>
        <Step n={2} title="Finn volum AgNO₃ for hver">
          V(I⁻) = 34,43 mL{"\n"}
          V(Cl⁻) = 58,80 − 34,43 = 24,37 mL
        </Step>
        <Step n={3} title="Beregn konsentrasjoner">
          c(I⁻) = c·V₁ / V_analytt = 0,08452 × 34,43 / 50,00 ≈ 0,05820 M{"\n"}
          c(Cl⁻) = c·V₂ / V_analytt = 0,08452 × 24,37 / 50,00 ≈ 0,04120 M
        </Step>
      </Section>

      <Huskeregel>
        <strong>«Lavest K{sub("sp")} felles først»</strong> — I⁻ før Br⁻ før Cl⁻ i argentometri.
        Husk de tre metodene: <strong>M</strong>ohr (kromat), <strong>V</strong>olhard (tilbaketitrering med SCN⁻),
        <strong>F</strong>ajans (adsorpsjonsindikator). Volhard er eneste som bruker tilbaketitrering!
      </Huskeregel>

      <ExamBox>
        Argentometri dukker regelmessig opp: V2025 oppg. 5 (fellingstitrering med to halogenider, 9 poeng),
        V2022 oppg. 11-12 (fellingsgravimetri av KBr + sammenligning med Volhards metode).
        Forvent å lese av titrerkurve og beregne konsentrasjoner, samt vite forskjellen på Mohr/Volhard/Fajans.
      </ExamBox>
    </>
  );
}

// ════════════════════════════════════════════════════════
// TAB 4: Kompleksdannelse og EDTA
// ════════════════════════════════════════════════════════
function Tab4() {
  return (
    <>
      <Section title="Nøkkelbegreper" icon="🏷️">
        <div style={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
          <Pill def="Elektronpardonor / Lewis-base som binder til sentralion.">Ligand</Pill>
          <Pill def="Ligand som donerer ett elektronpar.">Unidentat ligand</Pill>
          <Pill def="Ligand som donerer flere elektronpar.">Polydentat ligand</Pill>
          <Pill def="Kompleks dannet med polydentat ligand. Ekstra stabilt.">Kelat</Pill>
          <Pill def="Antall σ-bindinger mellom sentralion og ligander (typisk 2, 4, 6).">Koordinasjonstall</Pill>
          <Pill def="Likevektskonstant for kompleksdannelse. Kn for hvert trinn.">Dannelseskonstant (Kn)</Pill>
          <Pill def="Total dannelseskonstant: βn = K₁·K₂·…·Kn">βn (beta)</Pill>
          <Pill def="Etylendiamintetraeddiksyre. Heksadentat ligand, 4-protisk syre (H₄Y).">EDTA</Pill>
          <Pill def="Andel av EDTA som er fullt deprotonert (Y⁴⁻) ved gitt pH.">αY⁴⁻</Pill>
          <Pill def="Dannelseskonstant justert for pH. K'f = Kf · αY⁴⁻.">Betinget dannelseskonstant</Pill>
        </div>
      </Section>

      <Section title="Forklaring" icon="📖">
        <p>
          Et <strong>kompleks</strong> dannes når et metallion (M) binder til en eller flere <strong>ligander</strong> (L).
          Prosessen skjer trinnvis, med en <strong>dannelseskonstant</strong> K{sub("n")} for hvert trinn:
        </p>
        <FormulaBlock>
{`  M + L ⇌ ML       K₁ = [ML] / ([M]·[L])       β₁ = K₁
  ML + L ⇌ ML₂     K₂ = [ML₂] / ([ML]·[L])     β₂ = K₁·K₂
  ...
  MLₙ₋₁ + L ⇌ MLₙ  Kₙ = [MLₙ] / ([MLₙ₋₁]·[L])  βₙ = K₁·K₂·…·Kₙ`}
        </FormulaBlock>

        <p style={{ marginTop: 12 }}>
          <strong>α-verdier</strong> angir andelen av totalkonsentrasjonen som har en spesifikk form:
        </p>
        <FormulaBlock>
{`  αM = [M] / ([M] + [ML] + … + [MLₙ])
  Tilsvarende for αML, αML₂, osv.`}
        </FormulaBlock>

        <p style={{ marginTop: 12 }}>
          <strong>EDTA</strong> (etylendiamintetraeddiksyre) er den viktigste titranten i komplekstitrering.
          Det er en <strong>heksadentat</strong> ligand (6 bindingspunkter) som danner oktaedriske
          kelater med nesten alle metallioner i <strong>1:1-forhold</strong>, uavhengig av ionets ladning.
        </p>
        <p style={{ marginTop: 10 }}>
          EDTA er en <strong>4-protisk syre</strong> (H{sub("4")}Y) med 4 syre-base-likevekter.
          Kun den fullt deprotonerte formen Y{sup("4−")} danner komplekser effektivt.
          Ved lav pH er mesteparten av EDTA protonert → mindre Y{sup("4−")} tilgjengelig → svakere kompleksdannelse.
        </p>
        <FormulaBlock>
{`  H₄Y  dominant ved pH < 3
  H₃Y⁻ dominant ved pH ≈ 2–3
  H₂Y²⁻ dominant ved pH ≈ 3–6
  HY³⁻  dominant ved pH ≈ 6–10
  Y⁴⁻   dominant ved pH > 10

  αY⁴⁻ = [Y⁴⁻] / cT(EDTA)

  Betinget dannelseskonstant:
  K'f = Kf · αY⁴⁻`}
        </FormulaBlock>
      </Section>

      <Section title="Visuell illustrasjon — EDTA specier vs pH" icon="📊">
        <svg viewBox="0 0 620 280" style={{ width: "100%", maxWidth: 620 }}>
          {/* Axes */}
          <line x1={60} y1={230} x2={580} y2={230} stroke={C.border} strokeWidth={2} />
          <line x1={60} y1={230} x2={60} y2={20} stroke={C.border} strokeWidth={2} />
          <text x={320} y={265} textAnchor="middle" fill={C.muted} style={{ fontSize: 12, fontFamily: "'Source Sans 3'" }}>pH →</text>
          <text x={15} y={125} textAnchor="middle" fill={C.muted} style={{ fontSize: 12, fontFamily: "'Source Sans 3'" }} transform="rotate(-90, 15, 125)">α →</text>

          {/* pH labels */}
          {[0, 2, 4, 6, 8, 10, 12, 14].map((ph, i) => (
            <text key={i} x={60 + (ph / 14) * 520} y={245} textAnchor="middle" fill={C.muted}
              style={{ fontSize: 10, fontFamily: "'JetBrains Mono'" }}>{ph}</text>
          ))}

          {/* α = 1.0 and 0.5 lines */}
          <line x1={60} y1={30} x2={580} y2={30} stroke={C.border} strokeWidth={0.5} strokeDasharray="3,3" />
          <text x={55} y={34} textAnchor="end" fill={C.muted} style={{ fontSize: 9, fontFamily: "'JetBrains Mono'" }}>1.0</text>
          <line x1={60} y1={130} x2={580} y2={130} stroke={C.border} strokeWidth={0.5} strokeDasharray="3,3" />
          <text x={55} y={134} textAnchor="end" fill={C.muted} style={{ fontSize: 9, fontFamily: "'JetBrains Mono'" }}>0.5</text>

          {/* Simplified species curves */}
          {/* H4Y: peaks at pH ~1, drops by pH ~3 */}
          <path d="M 60 30 C 100 30, 120 35, 140 80 Q 160 130, 180 200 L 200 228" fill="none" stroke="#EF4444" strokeWidth={2} />
          <text x={85} y={55} fill="#EF4444" style={{ fontSize: 11, fontFamily: "'JetBrains Mono'", fontWeight: 600 }}>H₄Y</text>

          {/* H3Y-: peaks ~pH 2.5 */}
          <path d="M 120 228 Q 140 160, 155 110 Q 170 70, 185 110 Q 200 160, 220 228" fill="none" stroke="#F59E0B" strokeWidth={2} />
          <text x={160} y={85} fill="#F59E0B" style={{ fontSize: 11, fontFamily: "'JetBrains Mono'", fontWeight: 600 }}>H₃Y⁻</text>

          {/* H2Y2-: peaks ~pH 4.5 */}
          <path d="M 180 228 Q 220 130, 260 60 Q 280 40, 300 60 Q 330 100, 360 228" fill="none" stroke="#10B981" strokeWidth={2} />
          <text x={265} y={48} fill="#10B981" style={{ fontSize: 11, fontFamily: "'JetBrains Mono'", fontWeight: 600 }}>H₂Y²⁻</text>

          {/* HY3-: peaks ~pH 8 */}
          <path d="M 300 228 Q 350 120, 400 50 Q 420 35, 440 50 Q 470 90, 500 228" fill="none" stroke="#3B82F6" strokeWidth={2} />
          <text x={410} y={40} fill="#3B82F6" style={{ fontSize: 11, fontFamily: "'JetBrains Mono'", fontWeight: 600 }}>HY³⁻</text>

          {/* Y4-: rises from pH ~8 */}
          <path d="M 430 228 Q 470 160, 500 100 Q 520 60, 540 40 L 580 30" fill="none" stroke="#8B5CF6" strokeWidth={2} />
          <text x={550} y={55} fill="#8B5CF6" style={{ fontSize: 11, fontFamily: "'JetBrains Mono'", fontWeight: 600 }}>Y⁴⁻</text>
        </svg>
        <p style={{ fontSize: 12, color: C.muted, fontStyle: "italic", textAlign: "center" }}>
          Fordelingen av EDTA-specier som funksjon av pH. Y⁴⁻ (den kompleksdannende formen) dominerer først ved pH {'>'} 10.
        </p>
      </Section>

      <Section title="Eksempel — Betinget dannelseskonstant" icon="✏️">
        <p style={{ fontSize: 13, color: C.muted, marginBottom: 8 }}>
          Kf for CaY²⁻ er 5,0 × 10¹⁰. Finn betinget dannelseskonstant ved pH = 10, der αY⁴⁻ = 0,36.
        </p>
        <Step n={1} title="Skriv formelen for betinget Kf">
          K'f = Kf × αY⁴⁻
        </Step>
        <Step n={2} title="Sett inn verdier">
          K'f = 5,0 × 10¹⁰ × 0,36 = 1,8 × 10¹⁰
        </Step>
        <Step n={3} title="Vurder om titreringen er gjennomførbar">
          K'f = 1,8 × 10¹⁰ — dette er veldig stort.{"\n"}
          Titreringen er gjennomførbar ved pH = 10.{"\n"}
          Tommelregel: K'f bør være ≥ 10⁸ for bratt nok titrerkurve.
        </Step>
      </Section>

      <Huskeregel>
        <strong>EDTA = «én ligand til alle»</strong> — heksadentat, 1:1 komplekser med nesten alle metallioner.
        Husk at αY⁴⁻ øker med pH, og at K'{sub("f")} = K{sub("f")} · αY⁴⁻. Lav pH → lav αY⁴⁻ → svak
        kompleksdannelse. Derfor titreres ved bufret pH der K'{sub("f")} er stor nok.
      </Huskeregel>

      <ExamBox>
        Forståelse av EDTA, pH-avhengighet og betinget dannelseskonstant er grunnlaget for alle
        EDTA-regneoppgavene. V2022 oppg. 14c tester konseptuelt om du forstår selektivitet via pH.
        V2023 oppg. 3e spør om fordeler med polydentate ligander (store K, brattere titrerkurve).
      </ExamBox>
    </>
  );
}

// ════════════════════════════════════════════════════════
// TAB 5: EDTA-titrering — Beregninger og anvendelser
// ════════════════════════════════════════════════════════
function Tab5() {
  return (
    <>
      <Section title="Nøkkelbegreper" icon="🏷️">
        <div style={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
          <Pill def="Bestemmelse av Ca²⁺ + Mg²⁺ i vann ved EDTA-titrering.">Vannhardhet</Pill>
          <Pill def="Metallindikator. Fargeskifte blå→rød med Ca²⁺/Mg²⁺.">Eriokromsvart T</Pill>
          <Pill def="Danner rødt kompleks med Fe³⁺. Brukes som indikator i EDTA-titrering.">Salisylsyre</Pill>
          <Pill def="Tilsetter overskudd titrant, deretter titrerer overskuddet med en annen standard.">Tilbaketitrering</Pill>
          <Pill def="Justere pH slik at kun ett metallion danner EDTA-kompleks.">pH-selektivitet</Pill>
          <Pill def="Først titrere ett ion, deretter endre pH for å titrere det neste.">Sekvensiell titrering</Pill>
        </div>
      </Section>

      <Section title="Forklaring" icon="📖">
        <p>
          EDTA danner 1:1-komplekser med metallioner uavhengig av ladning:
        </p>
        <FormulaBlock>
{`  M^n+ + Y⁴⁻ ⇌ [MY]^(n-4)

  Eksempler:
  Ag⁺ + Y⁴⁻ ⇌ [AgY]³⁻
  Ca²⁺ + Y⁴⁻ ⇌ [CaY]²⁻
  Fe³⁺ + Y⁴⁻ ⇌ [FeY]⁻
  Al³⁺ + Y⁴⁻ ⇌ [AlY]⁻

  Alltid: n(EDTA) = n(M^n+) ved ekvivalenspunkt`}
        </FormulaBlock>

        <p style={{ marginTop: 12 }}><strong>Selektivitet via pH:</strong></p>
        <p style={{ color: C.muted, fontSize: 14 }}>
          Forskjellige metallioner trenger ulik minimums-pH for å danne stabile EDTA-komplekser.
          Ved å justere pH kan vi titrere selektivt:
        </p>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", margin: "8px 0" }}>
          <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: "10px 14px", flex: 1, minWidth: 180 }}>
            <div style={{ color: C.accent, fontFamily: "'JetBrains Mono'", fontSize: 13, fontWeight: 600 }}>pH ≈ 2</div>
            <div style={{ color: C.muted, fontSize: 13 }}>Kun Fe³⁺ danner kompleks</div>
          </div>
          <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: "10px 14px", flex: 1, minWidth: 180 }}>
            <div style={{ color: C.accent, fontFamily: "'JetBrains Mono'", fontSize: 13, fontWeight: 600 }}>pH ≈ 5</div>
            <div style={{ color: C.muted, fontSize: 13 }}>Fe³⁺ og Al³⁺ danner komplekser</div>
          </div>
          <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: "10px 14px", flex: 1, minWidth: 180 }}>
            <div style={{ color: C.accent, fontFamily: "'JetBrains Mono'", fontSize: 13, fontWeight: 600 }}>pH ≈ 8</div>
            <div style={{ color: C.muted, fontSize: 13 }}>Kun Ca²⁺ (ikke Mg²⁺)</div>
          </div>
          <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: "10px 14px", flex: 1, minWidth: 180 }}>
            <div style={{ color: C.accent, fontFamily: "'JetBrains Mono'", fontSize: 13, fontWeight: 600 }}>pH ≈ 10</div>
            <div style={{ color: C.muted, fontSize: 13 }}>Ca²⁺ + Mg²⁺ (vannhardhet)</div>
          </div>
        </div>

        <p style={{ marginTop: 12 }}><strong>Vannhardhet:</strong></p>
        <FormulaBlock>
{`  pH ≈ 10:  n(EDTA) = n(Ca²⁺) + n(Mg²⁺)  → total hardhet
  pH ≈ 8:   n(EDTA) = n(Ca²⁺)             → kun kalsium
  n(Mg²⁺) = n(total) − n(Ca²⁺)`}
        </FormulaBlock>

        <p style={{ marginTop: 12 }}><strong>Tilbaketitrering:</strong></p>
        <p style={{ color: C.muted, fontSize: 14 }}>
          Noen ganger titrerer vi ikke direkte. Vi tilsetter et kjent overskudd av EDTA,
          lar det reagere, og titrerer overskuddet med en annen metallionløsning.
          n(analytt) = n(EDTA tilsatt) − n(EDTA overskudd).
        </p>
      </Section>

      <Section title="Visuell illustrasjon — Sekvensiell EDTA-titrering" icon="📊">
        <svg viewBox="0 0 640 240" style={{ width: "100%", maxWidth: 640 }}>
          {/* Three-stage diagram */}
          {[
            { x: 10, bg: "#EF444422", border: "#EF4444", title: "Trinn 1: pH = 2", lines: ["Titrér med EDTA", "Kun Fe³⁺ reagerer", "→ n(Fe³⁺) = n(EDTA₁)"] },
            { x: 220, bg: "#F59E0B22", border: "#F59E0B", title: "Trinn 2: pH = 5", lines: ["Tilsett overskudd EDTA", "Fe³⁺ + Al³⁺ reagerer", "Al³⁺ reagerer med EDTA₂"] },
            { x: 430, bg: "#3B82F622", border: "#3B82F6", title: "Trinn 3: Tilbaketitrering", lines: ["Titrér overskudd EDTA", "med Fe³⁺-standard", "→ n(Al³⁺) = n(EDTA₂)−n(overskudd)"] },
          ].map((stage, i) => (
            <g key={i}>
              <rect x={stage.x} y={20} width={195} height={180} rx={10}
                fill={stage.bg} stroke={stage.border} strokeWidth={1.5} />
              <text x={stage.x + 97} y={46} textAnchor="middle" fill={stage.border}
                style={{ fontSize: 13, fontFamily: "'Plus Jakarta Sans'", fontWeight: 700 }}>
                {stage.title}
              </text>
              {stage.lines.map((line, li) => (
                <text key={li} x={stage.x + 97} y={80 + li * 22} textAnchor="middle"
                  fill={C.muted} style={{ fontSize: 12, fontFamily: "'Source Sans 3'" }}>
                  {line}
                </text>
              ))}
              {i < 2 && (
                <polygon points={`${stage.x + 205},110 ${stage.x + 220},115 ${stage.x + 205},120`}
                  fill={C.muted} />
              )}
            </g>
          ))}
          <text x={320} y={225} textAnchor="middle" fill={C.muted}
            style={{ fontSize: 11, fontFamily: "'Source Sans 3'", fontStyle: "italic" }}>
            Eksempel: Bestemmelse av Fe³⁺ og Al³⁺ i samme løsning
          </text>
        </svg>
      </Section>

      <Section title="Eksempel — Fe³⁺ og Al³⁺ (fra forelesning)" icon="✏️">
        <p style={{ fontSize: 13, color: C.muted, marginBottom: 8 }}>
          50,00 mL løsning med Fe³⁺ og Al³⁺. Titreres med 0,05002 M EDTA ved pH = 2 (24,82 mL).
          Deretter bufres til pH = 5, tilsettes 50,00 mL 0,05002 M EDTA. Overskudd tilbaketitreres
          med 0,04109 M Fe³⁺ (17,84 mL).
        </p>
        <Step n={1} title="Trinn 1: Bestem Fe³⁺ (pH = 2)">
          n(Fe³⁺) = n(EDTA₁) = c·V = 0,05002 × 24,82 = 1,2415 mmol{"\n"}
          c(Fe³⁺) = 1,2415 / 50,00 = 0,02483 M
        </Step>
        <Step n={2} title="Trinn 2: Tilsett EDTA-overskudd (pH = 5)">
          n(EDTA₂) = c·V = 0,05002 × 50,00 = 2,501 mmol{"\n"}
          Alt Al³⁺ + noe overskudd EDTA
        </Step>
        <Step n={3} title="Trinn 3: Tilbaketitrér overskudd EDTA">
          n(overskudd EDTA) = n(Fe³⁺ tilbake) = 0,04109 × 17,84 = 0,7330 mmol
        </Step>
        <Step n={4} title="Beregn Al³⁺">
          n(Al³⁺) = n(EDTA₂) − n(overskudd) = 2,501 − 0,7330 = 1,768 mmol{"\n"}
          c(Al³⁺) = 1,768 / 50,00 = 0,03536 M
        </Step>
      </Section>

      <Huskeregel>
        <strong>EDTA er alltid 1:1!</strong> n(EDTA) = n(M{sup("n+")}) uansett ladning.
        For sekvensiell titrering: husk å trekke fra — «totalt tilsatt minus overskudd = det som reagerte».
        Vannhardhet: pH 10 gir totalt (Ca + Mg), pH 8 gir bare Ca. Differansen = Mg.
      </Huskeregel>

      <ExamBox>
        EDTA-beregninger er den hyppigste oppgavetypen fra emne 4: V2021 oppg. 3b (vannhardhet, MgCO₃ i ppm),
        V2022 oppg. 14c (Pb²⁺ + Cd²⁺ med pH-selektivitet — konseptuelt), V2024 oppg. 6b (Cd²⁺ via
        tilbaketitrering med Ag⁺/CN⁻). Forvent alltid en beregningsoppgave med 1:1-støkiometri,
        og vit hvordan tilbaketitrering fungerer.
      </ExamBox>
    </>
  );
}

// ════════════════════════════════════════════════════════
// MAIN APP
// ════════════════════════════════════════════════════════

const TABS = [
  { id: 0, short: "Gravimetri", title: "Gravimetrisk analyse — Prinsipper og prosedyre" },
  { id: 1, short: "Overmetting", title: "Partikkelstørrelse og relativ overmetting" },
  { id: 2, short: "Argentometri", title: "Fellingstitrering — Argentometri" },
  { id: 3, short: "EDTA-teori", title: "Kompleksdannelse og EDTA" },
  { id: 4, short: "EDTA-beregn.", title: "EDTA-titrering — Beregninger og anvendelser" },
];

export default function App() {
  const [activeTab, setActiveTab] = useState(0);
  const [visited, setVisited] = useState(new Set([0]));

  const handleTabChange = useCallback((id) => {
    setActiveTab(id);
    setVisited((prev) => new Set([...prev, id]));
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "ArrowRight") handleTabChange(Math.min(activeTab + 1, TABS.length - 1));
      if (e.key === "ArrowLeft") handleTabChange(Math.max(activeTab - 1, 0));
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [activeTab, handleTabChange]);

  const TabContent = [Tab1, Tab2, Tab3, Tab4, Tab5][activeTab];

  return (
    <div style={{
      minHeight: "100vh", background: C.bg, color: C.text,
      fontFamily: "'Source Sans 3', sans-serif",
    }}>
      {/* Header */}
      <div style={{
        background: `linear-gradient(135deg, ${C.accent} 0%, #B91C1C 100%)`,
        padding: "20px 24px 16px",
      }}>
        <div style={{
          fontFamily: "'Plus Jakarta Sans'", fontSize: 11, fontWeight: 600,
          color: "rgba(255,255,255,0.7)", letterSpacing: 1.5, textTransform: "uppercase",
          marginBottom: 4,
        }}>
          Emne 4 — IMAK2004
        </div>
        <h1 style={{
          fontFamily: "'Plus Jakarta Sans'", fontSize: 22, fontWeight: 800,
          color: "#fff", margin: 0, lineHeight: 1.3,
        }}>
          Gravimetri, fellingstitrering og komplekstitrering
        </h1>
        <div style={{
          marginTop: 8, display: "flex", alignItems: "center", gap: 8,
          fontFamily: "'Source Sans 3'", fontSize: 13, color: "rgba(255,255,255,0.6)",
        }}>
          <span>Kapittel 10, 15</span>
          <span style={{ opacity: 0.4 }}>·</span>
          <span>{visited.size}/{TABS.length} emner besøkt</span>
          <div style={{ display: "flex", gap: 3, marginLeft: 4 }}>
            {TABS.map((_, i) => (
              <div key={i} style={{
                width: 8, height: 8, borderRadius: "50%",
                background: visited.has(i) ? "#fff" : "rgba(255,255,255,0.25)",
                transition: "background 0.3s",
              }} />
            ))}
          </div>
        </div>
      </div>

      {/* Tab bar */}
      <div style={{
        display: "flex", overflowX: "auto", background: C.card,
        borderBottom: `1px solid ${C.border}`,
        scrollbarWidth: "none",
      }}>
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            style={{
              flex: "0 0 auto",
              padding: "12px 18px",
              background: "transparent",
              border: "none",
              borderBottom: activeTab === tab.id ? `3px solid ${C.accent}` : "3px solid transparent",
              color: activeTab === tab.id ? C.accent : C.muted,
              fontFamily: "'Plus Jakarta Sans'",
              fontSize: 13,
              fontWeight: activeTab === tab.id ? 700 : 500,
              cursor: "pointer",
              whiteSpace: "nowrap",
              transition: "all 0.2s",
              position: "relative",
            }}
          >
            {visited.has(tab.id) && activeTab !== tab.id && (
              <span style={{
                position: "absolute", top: 6, right: 6,
                width: 5, height: 5, borderRadius: "50%",
                background: "#10B981",
              }} />
            )}
            {tab.short}
          </button>
        ))}
      </div>

      {/* Tab title */}
      <div style={{
        padding: "16px 20px 8px",
        fontFamily: "'Plus Jakarta Sans'", fontSize: 16, fontWeight: 700,
        color: C.text,
        borderBottom: `1px solid ${C.border}`,
      }}>
        {TABS[activeTab].title}
      </div>

      {/* Tab content */}
      <div style={{ padding: "16px 20px 40px", maxWidth: 800, margin: "0 auto" }}>
        <TabContent />
      </div>

      {/* Navigation footer */}
      <div style={{
        position: "fixed", bottom: 0, left: 0, right: 0,
        display: "flex", justifyContent: "space-between",
        padding: "10px 20px",
        background: `linear-gradient(transparent, ${C.bg} 30%)`,
        pointerEvents: "none",
      }}>
        {activeTab > 0 ? (
          <button
            onClick={() => handleTabChange(activeTab - 1)}
            style={{
              background: C.card, border: `1px solid ${C.border}`, borderRadius: 8,
              padding: "8px 16px", color: C.muted, cursor: "pointer",
              fontFamily: "'Source Sans 3'", fontSize: 13, pointerEvents: "auto",
            }}
          >
            ← {TABS[activeTab - 1].short}
          </button>
        ) : <div />}
        {activeTab < TABS.length - 1 ? (
          <button
            onClick={() => handleTabChange(activeTab + 1)}
            style={{
              background: C.accent, border: "none", borderRadius: 8,
              padding: "8px 16px", color: "#fff", cursor: "pointer",
              fontFamily: "'Plus Jakarta Sans'", fontSize: 13, fontWeight: 600,
              pointerEvents: "auto",
            }}
          >
            {TABS[activeTab + 1].short} →
          </button>
        ) : <div />}
      </div>
    </div>
  );
}
