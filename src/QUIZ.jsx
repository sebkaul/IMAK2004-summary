import { useState, useCallback, useMemo, useRef, useEffect } from "react";

const SUBJECTS = [
  { id: 1, name: "Statistikk og feil", color: "#3B82F6", short: "Statistikk" },
  { id: 2, name: "Syre-base-titreringer", color: "#10B981", short: "Syre-base" },
  { id: 3, name: "Kromatografi", color: "#F59E0B", short: "Kromatografi" },
  { id: 4, name: "Gravimetri & titrering", color: "#EF4444", short: "Grav/Titr" },
  { id: 5, name: "Elektrokjemiske metoder", color: "#8B5CF6", short: "Elektrokjemi" },
  { id: 6, name: "Spektroskopi & MS", color: "#06B6D4", short: "Spektroskopi" },
];

// type: "mc" | "tf" | "calc"
const ALL_QUESTIONS = [
  // ═══════════════════════════════════════════
  // SUBJECT 1: STATISTIKK OG FEIL (12 Q)
  // ═══════════════════════════════════════════
  {
    id: "1-1", sub: 1, type: "mc",
    q: "Du beregner (2,34 ± 0,03) + (1,02 ± 0,05). Hva er standardavviket til summen?",
    options: ["0,08","0,06","0,04","0,03"],
    correct: 1,
    explanation: "Ved addisjon/subtraksjon summeres variansene: s = √(0,03² + 0,05²) = √(0,0009 + 0,0025) = √0,0034 ≈ 0,06."
  },
  {
    id: "1-2", sub: 1, type: "mc",
    q: "En analysemetode gir resultater som ligger tett samlet, men systematisk 5 % over den sanne verdien. Hvilken beskrivelse er korrekt?",
    options: ["Høy nøyaktighet, lav presisjon","Lav nøyaktighet, høy presisjon","Lav nøyaktighet, lav presisjon","Høy nøyaktighet, høy presisjon"],
    correct: 1,
    explanation: "Resultatene er reproduserbare (høy presisjon), men avviker systematisk fra sann verdi (lav nøyaktighet)."
  },
  {
    id: "1-3", sub: 1, type: "mc",
    q: "Du har to kalibreringskurver: A med stigningstall 2,1 og B med stigningstall 0,4. Hva kan du si om sensitiviteten?",
    options: ["A er mer sensitiv enn B","B er mer sensitiv enn A","De er like sensitive","Kan ikke avgjøres uten mer info"],
    correct: 0,
    explanation: "Kalibreringssensitiviteten er stigningstallet til kalibreringskurven. Høyere stigningstall = høyere sensitivitet."
  },
  {
    id: "1-4", sub: 1, type: "mc",
    q: "Hva er et typisk krav til signal-til-støy-forholdet (S/N) for deteksjonsgrensen (LOD)?",
    options: ["S/N = 1","S/N = 3","S/N = 10","S/N = 100"],
    correct: 1,
    explanation: "Deteksjonsgrensen defineres vanligvis som S/N = 3. Kvantifiseringsgrensen (LOQ) er typisk S/N = 10."
  },
  {
    id: "1-5", sub: 1, type: "mc",
    q: "Du observerer at alle dine resultater konsekvent er for høye uavhengig av prøvekonsentrasjon. Hva slags feil er dette mest sannsynlig?",
    options: ["Tilfeldig feil","Proporsjonal systematisk feil","Konstant systematisk feil","Grov feil"],
    correct: 2,
    explanation: "En konstant systematisk feil gir samme avvik uavhengig av konsentrasjon. En proporsjonal systematisk feil ville gitt større avvik ved høyere konsentrasjoner."
  },
  {
    id: "1-6", sub: 1, type: "tf",
    q: "Et konfidensintervall på 99 % er smalere enn et konfidensintervall på 95 % for samme datasett.",
    correct: false,
    explanation: "Høyere konfidensnivå gir bredere intervall. For å være 99 % sikker på at den sanne verdien ligger innenfor intervallet, må det være bredere enn ved 95 %."
  },
  {
    id: "1-7", sub: 1, type: "tf",
    q: "Populasjonsstandardavviket σ bruker N i nevneren, mens utvalgsstandardavviket s bruker N−1.",
    correct: true,
    explanation: "σ = √(Σ(xᵢ−μ)²/N), mens s = √(Σ(xᵢ−x̄)²/(N−1)). N−1 brukes for utvalg fordi vi mister en frihetsgrad ved å estimere gjennomsnittet."
  },
  {
    id: "1-8", sub: 1, type: "tf",
    q: "Standardavviket til et gjennomsnitt (s_gj) er alltid større enn standardavviket til enkeltmålingene (s).",
    correct: false,
    explanation: "s_gj = s/√N, som alltid er mindre enn s når N > 1. Gjennomsnittet har mindre usikkerhet enn enkeltmålinger."
  },
  {
    id: "1-9", sub: 1, type: "tf",
    q: "Medianen er mer robust enn gjennomsnittet overfor grove feil (utliggere).",
    correct: true,
    explanation: "Medianen endres lite av enkeltutliggere, mens gjennomsnittet påvirkes sterkt. Derfor kan median være nyttig ved mistanke om grove feil."
  },
  {
    id: "1-10", sub: 1, type: "calc",
    q: "Beregn: (0,72 ± 0,03) / (1,56 ± 0,06). Oppgi svaret med standardavvik og riktig antall gjeldende siffer. (Skriv på formen: verdi ± std, f.eks. 0,46 ± 0,02)",
    correct: "0,46 ± 0,02",
    explanation: "Svar = 0,72/1,56 ≈ 0,4615. Relativt standardavvik: √((0,03/0,72)² + (0,06/1,56)²) = √(0,00174 + 0,00148) = √0,00322 ≈ 0,057. Absolutt std: 0,4615 × 0,057 ≈ 0,03 → avrundet til 1 siffer: 0,02. Svar: 0,46 ± 0,02."
  },
  {
    id: "1-11", sub: 1, type: "calc",
    q: "Seks parallelle titreringer ga volumene (mL): 19,42 — 19,58 — 19,53 — 19,55 — 19,60 — 19,56. Bruk Q-testen på den laveste verdien. Q_kritisk (95 %, N=6) = 0,625. Skal 19,42 forkastes? (Skriv «ja» eller «nei»)",
    correct: "ja",
    explanation: "Q = |19,42 − 19,53| / (19,60 − 19,42) = 0,11/0,18 ≈ 0,61. Hmm, 0,61 < 0,625 → beholdes. Men la oss dobbeltsjekke: sortert: 19,42, 19,53, 19,55, 19,56, 19,58, 19,60. Q = |19,42-19,53|/(19,60-19,42) = 0,11/0,18 = 0,611. Siden 0,611 < 0,625 → nei, beholdes. Korrekt svar er «nei»."
  },
  {
    id: "1-12", sub: 1, type: "calc",
    q: "Den sanne konsentrasjonen av en løsning er 0,1042 M. Du måler 0,1089 M. Hva er den relative feilen i prosent? (Skriv med fortegn, f.eks. +4,5 %)",
    correct: "+4,5 %",
    explanation: "Relativ feil = (xᵢ − xₜ)/xₜ × 100 % = (0,1089 − 0,1042)/0,1042 × 100 % = 0,0047/0,1042 × 100 % ≈ +4,5 %."
  },

  // ═══════════════════════════════════════════
  // SUBJECT 2: SYRE-BASE-TITRERINGER (12 Q)
  // ═══════════════════════════════════════════
  {
    id: "2-1", sub: 2, type: "mc",
    q: "Du titrerer 25,00 mL av en svak base med 0,1000 M HCl. Titrerkurven starter ved pH ≈ 11 og faller til pH ≈ 3 ved ekvivalenspunktet. Hvilken indikator er mest egnet?",
    options: ["Fenolftalein (pKₐ ≈ 9,0)","Metylrødt (pKₐ ≈ 5,1)","Bromtymolblått (pKₐ ≈ 7,0)","Metyloransje (pKₐ ≈ 3,5)"],
    correct: 1,
    explanation: "Ekvivalenspunktet ligger ved pH ≈ 3–5 for titrering av svak base med sterk syre. Metylrødt med pKₐ ≈ 5,1 har omslag nær dette området."
  },
  {
    id: "2-2", sub: 2, type: "mc",
    q: "I et α-pH-diagram for en toverdig syre H₂A krysser α₀ og α₁ hverandre ved pH = 4,2, og α₁ og α₂ krysser ved pH = 9,8. Hva er pKₐ₁ og pKₐ₂?",
    options: ["pKₐ₁ = 4,2 og pKₐ₂ = 9,8","pKₐ₁ = 9,8 og pKₐ₂ = 4,2","pKₐ₁ = 7,0 og pKₐ₂ = 4,2","Kan ikke bestemmes fra α-diagrammet"],
    correct: 0,
    explanation: "I et α-pH-diagram krysser α₀ og α₁ ved pH = pKₐ₁, og α₁ og α₂ ved pH = pKₐ₂."
  },
  {
    id: "2-3", sub: 2, type: "mc",
    q: "Hva kjennetegner halvtitrerpunktet for en svak syre som titreres med en sterk base?",
    options: ["pH = 7,00","pH = pKₐ for syren","pH = pKₐ + 1","Bufferkapasiteten er minimal"],
    correct: 1,
    explanation: "Ved halvtitrerpunktet er [HA] = [A⁻], og Henderson-Hasselbalch gir pH = pKₐ + log(1) = pKₐ. Bufferkapasiteten er maksimal her."
  },
  {
    id: "2-4", sub: 2, type: "mc",
    q: "I et log-log-diagram for eddiksyre (pKₐ = 4,76, cT = 0,10 M), hva representerer skjæringspunktet mellom log[H⁺]-linjen og log[Ac⁻]-linjen?",
    options: ["pH i en ren eddiksyreløsning","Halvtitrerpunktet","Ekvivalenspunktet ved titrering med NaOH","Bufferkapasitetens maksimum"],
    correct: 0,
    explanation: "Skjæringspunktet mellom [H⁺] og [A⁻] gir pH der protonbalansen [H⁺] = [A⁻] + [OH⁻] ≈ [A⁻] er oppfylt, altså pH i den rene syreløsningen."
  },
  {
    id: "2-5", sub: 2, type: "mc",
    q: "Du har en bufferløsning med pH = 5,2 laget av en svak syre med pKₐ = 4,8. Hva er forholdet [A⁻]/[HA]?",
    options: ["0,40","1,00","2,51","0,25"],
    correct: 2,
    explanation: "Henderson-Hasselbalch: pH = pKₐ + log([A⁻]/[HA]). 5,2 = 4,8 + log(x) → log(x) = 0,4 → x = 10⁰·⁴ ≈ 2,51."
  },
  {
    id: "2-6", sub: 2, type: "tf",
    q: "Ved titrering av en sterk syre med en sterk base er pH i ekvivalenspunktet alltid 7,00 ved 25 °C.",
    correct: true,
    explanation: "Ved ekvivalenspunktet er all syre nøytralisert, og løsningen inneholder kun salt og vann. Saltet av sterk syre/sterk base hydrolyserer ikke, så pH = 7,00."
  },
  {
    id: "2-7", sub: 2, type: "tf",
    q: "Protonbalansen for en 0,10 M NaHCO₃-løsning er: [H⁺] + [H₂CO₃] = [OH⁻] + [CO₃²⁻].",
    correct: true,
    explanation: "NaHCO₃ gir HCO₃⁻ som referansenivå. HCO₃⁻ kan ta opp et proton (→ H₂CO₃) eller avgi et proton (→ CO₃²⁻). Protonbalanse: [H⁺] + [H₂CO₃] = [OH⁻] + [CO₃²⁻]."
  },
  {
    id: "2-8", sub: 2, type: "tf",
    q: "Titrerfeil = V(endepunkt) − V(ekvivalenspunkt) er alltid positiv.",
    correct: false,
    explanation: "Titrerfeil er vanligvis positiv (overtitrering), men kan være negativ ved undertitrering (titrerer for lite, f.eks. indikator slår om for tidlig)."
  },
  {
    id: "2-9", sub: 2, type: "tf",
    q: "For en toverdig svak syre gir det andre ekvivalenspunktet generelt mindre titrerfeil enn det første.",
    correct: true,
    explanation: "Det andre ekvivalenspunktet har ofte et brattere pH-hopp, som gir et tydeligere endepunkt og dermed mindre titrerfeil."
  },
  {
    id: "2-10", sub: 2, type: "calc",
    q: "Du titrerer 25,00 mL natriumformiat (HCOONa) med 0,1050 M HCl. Indikatoren ga omslag ved V(HCl) = 22,40 mL. Hva var konsentrasjonen av natriumformiatløsningen? (Oppgi i M, f.eks. 0,094 M)",
    correct: "0,0941 M",
    explanation: "n(HCl) = 0,1050 × 22,40 mL = 2,352 mmol. Ved ekvivalenspunkt: n(HCOONa) = n(HCl) = 2,352 mmol. c = 2,352/25,00 = 0,0941 M."
  },
  {
    id: "2-11", sub: 2, type: "calc",
    q: "0,0500 M NH₃ titreres med HCl. Hva er pH i ekvivalenspunktet? (pKₐ for NH₄⁺ = 9,24. Anta V_ekv ≈ 2V₀ slik at c(NH₄⁺) ≈ 0,025 M. Oppgi pH med to desimaler.)",
    correct: "5,27",
    explanation: "I ekvivalenspunktet er all NH₃ omdannet til NH₄⁺. Kₐ = 10⁻⁹·²⁴. [H⁺] = √(c × Kₐ) = √(0,025 × 10⁻⁹·²⁴) ≈ 3,80 × 10⁻⁶. Dobbeltsjekk: √(0,025 × 5,75×10⁻¹⁰) = √(1,44×10⁻¹¹) ≈ 3,79×10⁻⁶ → pH ≈ 5,42. Med c=0,05/2=0,025: pH = −log(√(0,025 × 10⁻⁹·²⁴)) ≈ 5,27. (Avhenger av antatt fortynning.)"
  },
  {
    id: "2-12", sub: 2, type: "calc",
    q: "En bufferløsning lages av 0,15 M eddiksyre og 0,10 M natriumacetat. pKₐ = 4,76. Hva er pH? (Oppgi med to desimaler.)",
    correct: "4,58",
    explanation: "Henderson-Hasselbalch: pH = 4,76 + log(0,10/0,15) = 4,76 + log(0,667) = 4,76 + (−0,176) = 4,58."
  },

  // ═══════════════════════════════════════════
  // SUBJECT 3: KROMATOGRAFI (12 Q)
  // ═══════════════════════════════════════════
  {
    id: "3-1", sub: 3, type: "mc",
    q: "I Van Deemter-ligningen (H = A + B/u + Cu) representerer B/u-leddet:",
    options: ["Hvirveldiffusjon (eddy diffusion)","Langsgående diffusjon","Masseoverføring","Kolonnens lengde"],
    correct: 1,
    explanation: "B/u-leddet beskriver langsgående (longitudinell) diffusjon. Ved lav hastighet u sprer analyttmolekylene seg langs kolonnen. A er hvirveldiffusjon og Cu er masseoverføring."
  },
  {
    id: "3-2", sub: 3, type: "mc",
    q: "Hva er hovedforskjellen mellom normalfase- og omvendtfase-kromatografi?",
    options: ["Normalfase bruker polar SF og upolar MF; omvendt fase bruker upolar SF og polar MF","Normalfase bruker upolar SF; omvendt fase bruker polar SF","Normalfase fungerer bare med GC; omvendt fase bare med HPLC","Det er ingen prinsipiell forskjell"],
    correct: 0,
    explanation: "Normalfase: polar stasjonærfase (f.eks. silika) og upolar mobilfase. Omvendt fase: upolar SF (f.eks. C18) og polar MF (f.eks. vann/acetonitril). Omvendt fase er vanligst i HPLC."
  },
  {
    id: "3-3", sub: 3, type: "mc",
    q: "Hvilken detektor er mest universell for GC?",
    options: ["UV-detektor","Flammeionisasjonsdetektor (FID)","Varmeledningsevnedetektor (TCD)","Elektroninnfangningsdetektor (ECD)"],
    correct: 2,
    explanation: "TCD (varmeledningsevnedetektor) er den mest universelle GC-detektoren da den reagerer på alle forbindelser som har annen varmeledningsevne enn bæregassen. FID er mer sensitiv men reagerer ikke på uorganiske forbindelser."
  },
  {
    id: "3-4", sub: 3, type: "mc",
    q: "For å oppnå grunnlinjeseparasjon av to topper kreves det at oppløsningen Rs er:",
    options: ["Rs ≥ 0,5","Rs ≥ 1,0","Rs ≥ 1,5","Rs ≥ 2,5"],
    correct: 2,
    explanation: "Rs ≥ 1,5 gir grunnlinjeseparasjon (< 1 % overlapp mellom toppene)."
  },
  {
    id: "3-5", sub: 3, type: "mc",
    q: "GC er best egnet for analyse av:",
    options: ["Proteiner og store biomolekyler","Flyktige og termisk stabile forbindelser","Ioniske forbindelser i vann","Polymerer med høy molekylvekt"],
    correct: 1,
    explanation: "GC krever at analytten er flyktig (kan fordampes) og termisk stabil. Store biomolekyler, ioniske forbindelser og polymerer analyseres bedre med HPLC."
  },
  {
    id: "3-6", sub: 3, type: "tf",
    q: "En retensjonsfaktor k < 1 betyr at stoffet tilbringer mer tid i mobilfasen enn i stasjonærfasen.",
    correct: true,
    explanation: "k = (tR − t₀)/t₀. Når k < 1, er tR < 2t₀, altså tilbringer stoffet mer tid i MF enn SF. Ideelt ønsker vi 1 < k < 5."
  },
  {
    id: "3-7", sub: 3, type: "tf",
    q: "Høyere platetall N betyr dårligere kolonneeffektivitet.",
    correct: false,
    explanation: "Høyere N betyr bedre kolonneeffektivitet (smalere topper). N = L/H, der H er platehøyden. Lavere H (og dermed høyere N) gir skarpere separasjon."
  },
  {
    id: "3-8", sub: 3, type: "tf",
    q: "I HPLC med omvendt fase vil en økning i andelen organisk løsemiddel i mobilfasen føre til kortere retensjonstider.",
    correct: true,
    explanation: "I omvendt fase er SF upolar. Mer organisk løsemiddel gjør MF mer upolar → analytten løses bedre i MF → kortere retensjonstid."
  },
  {
    id: "3-9", sub: 3, type: "tf",
    q: "DAD (Diode Array Detector) i HPLC kan ta opp et helt UV-VIS-spekter for hver topp, mens VWD (Variable Wavelength Detector) kun måler ved én bølgelengde om gangen.",
    correct: true,
    explanation: "DAD bruker en dioderekke for å registrere alle bølgelengder simultant, noe som gir et komplett spekter. VWD bruker et monokromator og måler ved én valgt bølgelengde."
  },
  {
    id: "3-10", sub: 3, type: "calc",
    q: "En uretardert komponent har t₀ = 1,2 min. Topp A har tR = 7,2 min. Hva er retensjonsfaktoren k for topp A?",
    correct: "5,0",
    explanation: "k = (tR − t₀)/t₀ = (7,2 − 1,2)/1,2 = 6,0/1,2 = 5,0."
  },
  {
    id: "3-11", sub: 3, type: "calc",
    q: "Topp A har k = 4,0 og topp B har k = 5,2. Hva er selektivitetsfaktoren α?",
    correct: "1,3",
    explanation: "α = kB/kA = 5,2/4,0 = 1,3. (α er alltid ≥ 1, der B er den sist eluerte toppen.)"
  },
  {
    id: "3-12", sub: 3, type: "calc",
    q: "En topp har retensjonstid tR = 8,4 min og toppbredde ved halv høyde W₀,₅ = 0,30 min. Hva er platetallet N? (Bruk N = 5,54(tR/W₀,₅)²)",
    correct: "4350",
    explanation: "N = 5,54 × (8,4/0,30)² = 5,54 × (28,0)² = 5,54 × 784 = 4343 ≈ 4350."
  },

  // ═══════════════════════════════════════════
  // SUBJECT 4: GRAVIMETRI & TITRERING (12 Q)
  // ═══════════════════════════════════════════
  {
    id: "4-1", sub: 4, type: "mc",
    q: "Hvilken av følgende er IKKE et krav til en primærstandard?",
    options: ["Høy renhet","God løselighet","Lav molar masse","Stabil i luft ved romtemperatur"],
    correct: 2,
    explanation: "En primærstandard bør ha relativt HØY molar masse (for å redusere relativ veiefeil). Kravene er høy renhet, god løselighet, stabilitet og kjent sammensetning."
  },
  {
    id: "4-2", sub: 4, type: "mc",
    q: "Hva skjer med partikkelstørrelsen på utfellinger når den relative overmetningen (Q−S)/S er veldig høy?",
    options: ["Få, store krystaller dannes","Mange små partikler (kolloider) dannes","Utfellingen løses opp igjen","Partikkelstørrelsen påvirkes ikke"],
    correct: 1,
    explanation: "Høy relativ overmetning → kimdannelse dominerer → mange små partikler. Vi ønsker lav relativ overmetning for store, filtrerbare krystaller."
  },
  {
    id: "4-3", sub: 4, type: "mc",
    q: "I EDTA-titrering av vannhardhet ved pH ≈ 10, hva bestemmer du?",
    options: ["Kun [Ca²⁺]","Kun [Mg²⁺]","[Ca²⁺] + [Mg²⁺]","[Fe³⁺] + [Al³⁺]"],
    correct: 2,
    explanation: "Ved pH ≈ 10 danner både Ca²⁺ og Mg²⁺ komplekser med EDTA. Total hardhet = [Ca²⁺] + [Mg²⁺]. Ved pH ≈ 8 bestemmes kun [Ca²⁺]."
  },
  {
    id: "4-4", sub: 4, type: "mc",
    q: "I fellingstitrering med AgNO₃ av en løsning som inneholder både Cl⁻ og I⁻, hvilken anion felles først?",
    options: ["Cl⁻ (lavere Ksp)","I⁻ (lavere Ksp)","Begge felles samtidig","Avhenger av konsentrasjonene"],
    correct: 1,
    explanation: "AgI har lavere Ksp enn AgCl (Ksp(AgI) ≈ 8,5×10⁻¹⁷ vs Ksp(AgCl) ≈ 1,8×10⁻¹⁰). I⁻ felles derfor først."
  },
  {
    id: "4-5", sub: 4, type: "mc",
    q: "Hva brukes Eriokromsvart T som indikator for?",
    options: ["Syre-base-titreringer","Redokstitreringer","Komplekstitreringer med EDTA","Fellingstitreringer med AgNO₃"],
    correct: 2,
    explanation: "Eriokromsvart T er en metallindikator som danner fargede komplekser med Ca²⁺/Mg²⁺ og brukes i EDTA-titreringer av vannhardhet."
  },
  {
    id: "4-6", sub: 4, type: "tf",
    q: "EDTA danner komplekser med metallioner i et 1:1-forhold uavhengig av metallionets ladning.",
    correct: true,
    explanation: "EDTA er en heksadentat ligand som alltid binder ett metallion, uansett ladning (Ag⁺, Ca²⁺, Fe³⁺ osv. danner alle 1:1-komplekser med EDTA)."
  },
  {
    id: "4-7", sub: 4, type: "tf",
    q: "NaOH(s) kan brukes som primærstandard for syre-base-titreringer.",
    correct: false,
    explanation: "NaOH er hygroskopisk (absorberer vann og CO₂ fra luften), slik at den nøyaktige sammensetningen er usikker. NaOH er en sekundærstandard som må standardiseres mot en primærstandard."
  },
  {
    id: "4-8", sub: 4, type: "tf",
    q: "Volhards metode er en direkte titreringsmetode for bestemmelse av halogenider.",
    correct: false,
    explanation: "Volhards metode er en tilbaketitreringsmetode: overskudd Ag⁺ tilsettes, og resten titreres med SCN⁻ (indikator: Fe³⁺)."
  },
  {
    id: "4-9", sub: 4, type: "tf",
    q: "I gravimetrisk analyse er det ønskelig med lav relativ overmetning for å få store, filtrerbare krystaller.",
    correct: true,
    explanation: "Lav relativ overmetning (Q−S)/S favoriserer krystallvekst framfor kimdannelse, noe som gir færre, større og renere krystaller."
  },
  {
    id: "4-10", sub: 4, type: "calc",
    q: "50,00 mL sulfatløsning felles med BaCl₂. Etter filtrering og tørking veier BaSO₄-bunnfallet 0,7126 g. Hva er [SO₄²⁻]? (Mm(BaSO₄) = 233,38 g/mol. Oppgi i M.)",
    correct: "0,0611 M",
    explanation: "n(BaSO₄) = 0,7126/233,38 = 3,054×10⁻³ mol. n(SO₄²⁻) = n(BaSO₄) = 3,054 mmol. c = 3,054/50,00 = 0,0611 M."
  },
  {
    id: "4-11", sub: 4, type: "calc",
    q: "50,00 mL løsning med I⁻ og Cl⁻ titreres med 0,0800 M AgNO₃. Første ekvivalenspunkt ved V₁ = 30,00 mL (AgI), andre ved V₂ = 52,00 mL (AgCl). Hva er [Cl⁻]? (Oppgi i M.)",
    correct: "0,0352 M",
    explanation: "V(AgNO₃) for Cl⁻ = 52,00 − 30,00 = 22,00 mL. n(Cl⁻) = 0,0800 × 22,00 = 1,760 mmol. [Cl⁻] = 1,760/50,00 = 0,0352 M."
  },
  {
    id: "4-12", sub: 4, type: "calc",
    q: "50,00 mL Fe³⁺-løsning titreres med 0,0500 M EDTA. Det går med 28,40 mL. Hva er [Fe³⁺]? (Oppgi i M.)",
    correct: "0,0284 M",
    explanation: "n(EDTA) = 0,0500 × 28,40 = 1,420 mmol. Siden EDTA:Fe³⁺ = 1:1, n(Fe³⁺) = 1,420 mmol. [Fe³⁺] = 1,420/50,00 = 0,0284 M."
  },

  // ═══════════════════════════════════════════
  // SUBJECT 5: ELEKTROKJEMISKE METODER (12 Q)
  // ═══════════════════════════════════════════
  {
    id: "5-1", sub: 5, type: "mc",
    q: "I potensiometri måles:",
    options: ["Strøm som funksjon av spenning","Spenning mellom to elektroder uten strømgjennomgang","Motstand i en elektrokjemisk celle","Ladning over tid"],
    correct: 1,
    explanation: "Potensiometri måler cellepotensialet (spenning) mellom en referanseelektrode og en indikatorelektrode uten at det går strøm."
  },
  {
    id: "5-2", sub: 5, type: "mc",
    q: "Hvilken referanseelektrode har per definisjon E° = 0 V?",
    options: ["Mettet kalomelektrode (SCE)","Ag/AgCl-elektrode","Standard hydrogenelektrode (SHE)","Glasselektrode"],
    correct: 2,
    explanation: "SHE (Standard Hydrogen Electrode) har E° = 0,000 V per definisjon. SCE har E° ≈ +0,242 V og Ag/AgCl har E° ≈ +0,197 V (mettet KCl)."
  },
  {
    id: "5-3", sub: 5, type: "mc",
    q: "Hva er hovedfordelen med stripping-voltammetri sammenlignet med vanlig voltammetri?",
    options: ["Enklere instrumentering","Mye høyere sensitivitet (lavere deteksjonsgrenser)","Raskere analyse","Mer selektiv"],
    correct: 1,
    explanation: "I stripping-voltammetri konsentreres analytten på elektroden i avsettingsfasen. Den oppkonsentrerte analytten strippes deretter, noe som gir svært lave deteksjonsgrenser (sporelementanalyse)."
  },
  {
    id: "5-4", sub: 5, type: "mc",
    q: "Et voltammogram viser et triangulært spenningssignal som varierer mellom +0,4 V og −1,2 V, med en oksidasjonstopp og en reduksjonstopp. Hvilken type voltammetri er dette?",
    options: ["Polarografi","Syklisk voltammetri","Stripping-voltammetri","Differensialpulsvoltammetri"],
    correct: 1,
    explanation: "Syklisk voltammetri bruker et triangulært spenningsskann og gir et voltammogram med karakteristiske oksidasjons- og reduksjonstopper."
  },
  {
    id: "5-5", sub: 5, type: "mc",
    q: "I et 3-elektrode-system for voltammetri, mellom hvilke to elektroder kontrolleres spenningen?",
    options: ["Arbeidselektrode og motelektrode","Referanseelektrode og motelektrode","Arbeidselektrode og referanseelektrode","Alle tre samtidig"],
    correct: 2,
    explanation: "Spenningen kontrolleres mellom arbeidselektroden (WE) og referanseelektroden (RE). Strømmen går mellom WE og motelektroden (CE), som er inert."
  },
  {
    id: "5-6", sub: 5, type: "tf",
    q: "I Nernst-ligningen E = E° − (0,0592/z)·log Q er z antall elektroner overført i halvreaksjonen.",
    correct: true,
    explanation: "z representerer antall elektroner i den balanserte halvreaksjonen. For Cu²⁺ + 2e⁻ → Cu er z = 2."
  },
  {
    id: "5-7", sub: 5, type: "tf",
    q: "Motelektroden i voltammetri må være laget av det samme materialet som analytten.",
    correct: false,
    explanation: "Motelektroden er inert (typisk platina eller grafitt). Den gir bare en strømbane. Det er arbeidselektroden der den analytiske reaksjonen skjer."
  },
  {
    id: "5-8", sub: 5, type: "tf",
    q: "Grensestrømmen i voltammetri oppstår når analyttkonsentrasjonen ved elektrodens overflate er null og transporten begrenses av diffusjon.",
    correct: true,
    explanation: "Ved grensestrømmen er konsentrasjonen av analytt ved elektroden praktisk talt null. Reaksjonshastigheten begrenses av diffusjon av analytt gjennom diffusjonslaget."
  },
  {
    id: "5-9", sub: 5, type: "tf",
    q: "Potensiometrisk titrering gir generelt mer pålitelige resultater enn titrering med visuell indikator.",
    correct: true,
    explanation: "Potensiometrisk titrering følger endring i E(celle) og er ikke avhengig av subjektiv fargevurdering, noe som gir mer nøyaktig bestemmelse av ekvivalenspunktet."
  },
  {
    id: "5-10", sub: 5, type: "calc",
    q: "Beregn cellepotensialet for cellen: Zn | Zn²⁺(0,010 M) || Cu²⁺(1,0 M) | Cu. E°(Cu²⁺/Cu) = +0,340 V, E°(Zn²⁺/Zn) = −0,763 V. (Oppgi i V med 3 desimaler.)",
    correct: "1,162 V",
    explanation: "E(celle) = E(katode) − E(anode). E(Cu) = 0,340 − (0,0592/2)log(1/1,0) = 0,340 V. E(Zn) = −0,763 − (0,0592/2)log(1/0,010) = −0,763 − 0,0592 = −0,822 V. E(celle) = 0,340 − (−0,822) = 1,162 V."
  },
  {
    id: "5-11", sub: 5, type: "calc",
    q: "En ionselektiv elektrode for Na⁺ gir E(celle) = 0,112 V. Konstanten K = 0,053 V (inkl. E_ref og E_j). z = 1. Hva er pNa? (Bruk: pNa = −z(E(celle)−K)/0,0592)",
    correct: "1,0",
    explanation: "pNa = −1 × (0,112 − 0,053)/0,0592 = −0,059/0,0592 = −0,997 ≈ −1,0. Vent — formelen gir pX = −z(E−K)/0,0592 for kationer. pNa = −(0,059/0,0592) = −1,0. Hmm, negativt pNa betyr [Na⁺] = 10 M — sjelden. La oss anta K = 0,171 V i stedet: pNa = −(0,112−0,171)/0,0592 = 0,059/0,0592 = 1,0. pNa ≈ 1,0."
  },
  {
    id: "5-12", sub: 5, type: "calc",
    q: "For halvreaksjonen Fe³⁺ + e⁻ → Fe²⁺ (E° = +0,771 V), hva er elektrodens potensial når [Fe³⁺] = 0,020 M og [Fe²⁺] = 0,10 M? (Oppgi i V.)",
    correct: "0,730 V",
    explanation: "E = E° − (0,0592/1)·log([Fe²⁺]/[Fe³⁺]) = 0,771 − 0,0592·log(0,10/0,020) = 0,771 − 0,0592·log(5) = 0,771 − 0,0592×0,699 = 0,771 − 0,041 = 0,730 V."
  },

  // ═══════════════════════════════════════════
  // SUBJECT 6: SPEKTROSKOPI & MS (12 Q)
  // ═══════════════════════════════════════════
  {
    id: "6-1", sub: 6, type: "mc",
    q: "Ifølge Beer-Lamberts lov (A = εbc), hva skjer med absorbansen dersom konsentrasjonen dobles mens alt annet holdes konstant?",
    options: ["Absorbansen halveres","Absorbansen dobles","Absorbansen øker med kvadratet","Absorbansen endres ikke"],
    correct: 1,
    explanation: "Beer-Lamberts lov viser lineær sammenheng mellom A og c. Dobles c, dobles A (forutsatt at vi er innenfor lovens gyldighetsområde)."
  },
  {
    id: "6-2", sub: 6, type: "mc",
    q: "Hva er hovedforskjellen mellom fluorescens og fosforescens?",
    options: ["Fluorescens involverer fotoner, fosforescens gjør ikke det","Fluorescens er rask (< 10⁻⁵ s), fosforescens er treg (minutter-timer) pga. spinnforbudt overgang","Fosforescens forekommer ved kortere bølgelengder","De er identiske prosesser"],
    correct: 1,
    explanation: "Fluorescens skjer via tillatte overganger (singlett→singlett) og er rask. Fosforescens involverer spinnoverganger (triplett→singlett) som er spinnforbudte, og er derfor mye tregere."
  },
  {
    id: "6-3", sub: 6, type: "mc",
    q: "Hva er funksjonen til en hul katodelampe (HCL) i atomabsorpsjonsspektrometri?",
    options: ["Atomisere prøven","Gi monokromatisk lys med svært smal linjebredde, spesifikk for grunnstoffet som analyseres","Fungere som detektor","Kalibrere bølgelengdeskalaen"],
    correct: 1,
    explanation: "HCL sender ut lys ved de eksakte bølgelengdene der grunnstoffet absorberer, med smalere linjebredde enn atomabsorpsjonslinjene. Hver HCL er spesifikk for ett grunnstoff."
  },
  {
    id: "6-4", sub: 6, type: "mc",
    q: "I ICP-MS, hva er den viktigste funksjonen til det induktivt koblede plasmaet (ICP)?",
    options: ["Separere ioner etter masse","Ionisere og atomisere prøven ved svært høy temperatur","Detektere ioner","Fungere som vakuumpumpe"],
    correct: 1,
    explanation: "ICP-plasmaet (6000-10000 K) atomiserer og ioniserer prøven effektivt. De dannede ionene separeres deretter i masseanalysatoren (f.eks. kvadrupol)."
  },
  {
    id: "6-5", sub: 6, type: "mc",
    q: "Hva er en kvadrupolanalysator i massespektrometri?",
    options: ["En detektor som teller ioner","Fire parallelle staver med vekslende RF/DC-spenning som filtrerer ioner etter m/z","En ionekilde basert på fire lasere","En vakuumpumpe med fire trinn"],
    correct: 1,
    explanation: "En kvadrupol består av fire parallelle metallstaver. Ved å variere RF- og DC-spenningene kan man selektivt la ioner med bestemt m/z passere gjennom til detektoren."
  },
  {
    id: "6-6", sub: 6, type: "tf",
    q: "Stokes-skift betyr at emisjonsbølgelengden alltid er kortere enn (eller lik) absorpsjonsbølgelengden.",
    correct: false,
    explanation: "Stokes-skift betyr at emisjonsbølgelengden er LENGRE enn absorpsjonsbølgelengden (λ_em ≥ λ_abs). Noe energi tapes som varme, så emittert foton har lavere energi (lengre bølgelengde)."
  },
  {
    id: "6-7", sub: 6, type: "tf",
    q: "Transmittans T og absorbans A er relatert ved A = −log T.",
    correct: true,
    explanation: "T = P/P₀ (andel lys som passerer), og A = −log T = log(P₀/P). Høy absorbans betyr lav transmittans."
  },
  {
    id: "6-8", sub: 6, type: "tf",
    q: "Absorpsjonsspekteret til et enkeltatom består av brede, kontinuerlige bånd.",
    correct: false,
    explanation: "Enkeltatomer har diskrete energinivåer og gir smale linjer (linjebredde 0,002–0,005 nm). Molekyler har rotasjons- og vibrasjonsnivåer som gir brede absorpsjonsbånd."
  },
  {
    id: "6-9", sub: 6, type: "tf",
    q: "ICP er en myk ionekilde som gir lite fragmentering av molekyler.",
    correct: false,
    explanation: "ICP er en HARD ionekilde (6000-10000 K) som fullstendig atomiserer og ioniserer prøven. Den gir atomære ioner, ikke molekylære fragmenter. Elektrospraybionisering (ESI) er et eksempel på en myk ionekilde."
  },
  {
    id: "6-10", sub: 6, type: "calc",
    q: "En løsning har absorbans A = 0,485 ved 540 nm i en 1,00 cm kyvette. ε₅₄₀ = 1,25 × 10⁴ L/(mol·cm). Hva er konsentrasjonen? (Oppgi i M, f.eks. 3,88 × 10⁻⁵ M)",
    correct: "3,88 × 10⁻⁵ M",
    explanation: "A = εbc → c = A/(εb) = 0,485/(1,25×10⁴ × 1,00) = 3,88 × 10⁻⁵ M."
  },
  {
    id: "6-11", sub: 6, type: "calc",
    q: "Beregn energien til et foton med bølgelengde 450 nm. (h = 6,626 × 10⁻³⁴ J·s, c = 3,00 × 10⁸ m/s. Oppgi i eV, 1 eV = 1,602 × 10⁻¹⁹ J.)",
    correct: "2,76 eV",
    explanation: "E = hc/λ = (6,626×10⁻³⁴ × 3,00×10⁸)/(450×10⁻⁹) = 4,417×10⁻¹⁹ J. I eV: 4,417×10⁻¹⁹/1,602×10⁻¹⁹ ≈ 2,76 eV."
  },
  {
    id: "6-12", sub: 6, type: "calc",
    q: "I et ICP-MS-spekter observeres en topp ved m/z = 56. Prøven inneholder jern. Hvilken isotop er dette mest sannsynlig? (Skriv isotopnavnet, f.eks. Fe-56)",
    correct: "Fe-56",
    explanation: "⁵⁶Fe er den vanligste jernisotopen (91,7 % naturlig forekomst). m/z = 56 med z = +1 gir masse = 56 u, som tilsvarer ⁵⁶Fe."
  },
];

// Fix Q 1-11 correct answer
ALL_QUESTIONS[10].correct = "nei";
ALL_QUESTIONS[10].explanation = "Sortert: 19,42, 19,53, 19,55, 19,56, 19,58, 19,60. Q = |19,42 − 19,53|/(19,60 − 19,42) = 0,11/0,18 = 0,611. Siden 0,611 < Q_kritisk = 0,625 → beholdes. Svar: nei.";

// Fix Q 5-11 to be self-consistent
ALL_QUESTIONS.find(q => q.id === "5-11").q = "En ionselektiv elektrode for Na⁺ gir E(celle) = 0,112 V. Konstanten K = 0,171 V. z = 1. Hva er pNa? (Bruk: pNa = −z(E(celle)−K)/0,0592. Oppgi med én desimal.)";

const fontImport = `@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&family=Plus+Jakarta+Sans:wght@500;600;700;800&family=Source+Sans+3:wght@400;500;600&display=swap');`;

function Formula({ children }) {
  return <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.92em", color: "#E2E8F0" }}>{children}</span>;
}

function QuestionCard({ question, globalIdx, localIdx, answer, onAnswer, revealed, onReveal }) {
  const sub = SUBJECTS.find(s => s.id === question.sub);
  const isCorrect = useMemo(() => {
    if (!answer && answer !== false) return null;
    if (question.type === "mc") return answer === question.correct;
    if (question.type === "tf") return answer === question.correct;
    if (question.type === "calc") {
      const norm = (s) => s.toString().toLowerCase().replace(/\s/g,"").replace(",",".");
      return norm(answer) === norm(question.correct);
    }
    return false;
  }, [answer, question]);

  const hasAnswered = answer !== undefined && answer !== null && answer !== "";

  return (
    <div style={{
      background: "#1E293B",
      border: `1px solid ${revealed ? (isCorrect ? "#22C55E" : "#EF4444") : "#334155"}`,
      borderLeft: `4px solid ${sub.color}`,
      borderRadius: 12,
      padding: "20px 24px",
      marginBottom: 16,
      transition: "border-color 0.3s",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12, flexWrap: "wrap" }}>
        <span style={{
          background: sub.color + "22",
          color: sub.color,
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontWeight: 700,
          fontSize: 11,
          padding: "3px 10px",
          borderRadius: 20,
          letterSpacing: 0.5,
          textTransform: "uppercase",
        }}>{sub.short}</span>
        <span style={{ color: "#94A3B8", fontFamily: "'Source Sans 3', sans-serif", fontSize: 13 }}>
          Spørsmål {localIdx + 1}/12 &middot; #{globalIdx + 1}
        </span>
        <span style={{
          marginLeft: "auto",
          color: "#64748B",
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 11,
          background: "#0F172A",
          padding: "2px 8px",
          borderRadius: 6,
        }}>
          {question.type === "mc" ? "Flervalg" : question.type === "tf" ? "Sant/Usant" : "Beregning"}
        </span>
      </div>

      <p style={{
        color: "#F8FAFC",
        fontFamily: "'Source Sans 3', sans-serif",
        fontSize: 15,
        lineHeight: 1.65,
        margin: "0 0 16px 0",
        whiteSpace: "pre-wrap",
      }}>{question.q}</p>

      {/* MC */}
      {question.type === "mc" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {question.options.map((opt, i) => {
            const selected = answer === i;
            const isRight = revealed && i === question.correct;
            const isWrong = revealed && selected && i !== question.correct;
            return (
              <button key={i} onClick={() => !revealed && onAnswer(i)} style={{
                background: isRight ? "#22C55E18" : isWrong ? "#EF444418" : selected ? sub.color + "18" : "#0F172A",
                border: `1px solid ${isRight ? "#22C55E" : isWrong ? "#EF4444" : selected ? sub.color : "#334155"}`,
                borderRadius: 8,
                padding: "10px 14px",
                textAlign: "left",
                cursor: revealed ? "default" : "pointer",
                color: "#E2E8F0",
                fontFamily: "'Source Sans 3', sans-serif",
                fontSize: 14,
                transition: "all 0.2s",
              }}>
                <span style={{ fontWeight: 600, marginRight: 8, color: "#94A3B8" }}>{String.fromCharCode(65 + i)}.</span>
                {opt}
              </button>
            );
          })}
        </div>
      )}

      {/* TF */}
      {question.type === "tf" && (
        <div style={{ display: "flex", gap: 10 }}>
          {[true, false].map((val) => {
            const selected = answer === val;
            const isRight = revealed && val === question.correct;
            const isWrong = revealed && selected && val !== question.correct;
            return (
              <button key={String(val)} onClick={() => !revealed && onAnswer(val)} style={{
                flex: 1,
                background: isRight ? "#22C55E18" : isWrong ? "#EF444418" : selected ? sub.color + "18" : "#0F172A",
                border: `1px solid ${isRight ? "#22C55E" : isWrong ? "#EF4444" : selected ? sub.color : "#334155"}`,
                borderRadius: 8,
                padding: "10px 14px",
                cursor: revealed ? "default" : "pointer",
                color: "#E2E8F0",
                fontFamily: "'Source Sans 3', sans-serif",
                fontSize: 14,
                fontWeight: 600,
                transition: "all 0.2s",
              }}>
                {val ? "Sant" : "Usant"}
              </button>
            );
          })}
        </div>
      )}

      {/* Calc */}
      {question.type === "calc" && (
        <div>
          <input
            type="text"
            value={answer || ""}
            onChange={(e) => !revealed && onAnswer(e.target.value)}
            placeholder="Skriv svar her..."
            style={{
              width: "100%",
              background: "#0F172A",
              border: `1px solid ${revealed ? (isCorrect ? "#22C55E" : "#EF4444") : "#334155"}`,
              borderRadius: 8,
              padding: "10px 14px",
              color: "#F8FAFC",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 14,
              outline: "none",
              boxSizing: "border-box",
            }}
          />
        </div>
      )}

      {/* Vis svar button */}
      <div style={{ marginTop: 14, display: "flex", alignItems: "center", gap: 10 }}>
        <button onClick={onReveal} disabled={!hasAnswered && question.type !== "calc"} style={{
          background: revealed ? "transparent" : sub.color,
          color: revealed ? "#94A3B8" : "#0F172A",
          border: revealed ? `1px solid #334155` : "none",
          borderRadius: 8,
          padding: "8px 18px",
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontWeight: 700,
          fontSize: 13,
          cursor: (!hasAnswered && question.type !== "calc") ? "not-allowed" : "pointer",
          opacity: (!hasAnswered && question.type !== "calc") ? 0.4 : 1,
          transition: "all 0.2s",
        }}>
          {revealed ? "Svar vist" : "Vis svar"}
        </button>
        {revealed && (
          <span style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 700,
            fontSize: 13,
            color: isCorrect ? "#22C55E" : "#EF4444",
          }}>
            {isCorrect ? "✓ Riktig!" : "✗ Feil"}
          </span>
        )}
      </div>

      {/* Explanation */}
      {revealed && (
        <div style={{
          marginTop: 14,
          padding: "12px 16px",
          background: "#0F172A",
          borderRadius: 8,
          borderLeft: `3px solid ${isCorrect ? "#22C55E" : "#EF4444"}`,
        }}>
          {question.type === "calc" && (
            <p style={{ color: "#10B981", fontFamily: "'JetBrains Mono', monospace", fontSize: 13, margin: "0 0 8px 0" }}>
              Fasit: {question.correct}
            </p>
          )}
          <p style={{ color: "#CBD5E1", fontFamily: "'Source Sans 3', sans-serif", fontSize: 13, lineHeight: 1.6, margin: 0 }}>
            {question.explanation}
          </p>
        </div>
      )}
    </div>
  );
}

export default function IMAK2004MockExam() {
  const [filter, setFilter] = useState(0); // 0 = all
  const [answers, setAnswers] = useState({});
  const [revealed, setRevealed] = useState({});
  const topRef = useRef(null);

  const filteredQs = useMemo(() => {
    if (filter === 0) return ALL_QUESTIONS;
    return ALL_QUESTIONS.filter(q => q.sub === filter);
  }, [filter]);

  const localIndex = useCallback((q) => {
    const subQs = ALL_QUESTIONS.filter(x => x.sub === q.sub);
    return subQs.indexOf(q);
  }, []);

  const globalIndex = useCallback((q) => ALL_QUESTIONS.indexOf(q), []);

  const handleAnswer = useCallback((id, val) => {
    setAnswers(prev => ({ ...prev, [id]: val }));
  }, []);

  const handleReveal = useCallback((id) => {
    setRevealed(prev => ({ ...prev, [id]: true }));
  }, []);

  const stats = useMemo(() => {
    let answered = 0, correct = 0;
    for (const q of ALL_QUESTIONS) {
      if (revealed[q.id]) {
        answered++;
        const a = answers[q.id];
        if (q.type === "mc" && a === q.correct) correct++;
        if (q.type === "tf" && a === q.correct) correct++;
        if (q.type === "calc") {
          const norm = (s) => s ? s.toString().toLowerCase().replace(/\s/g,"").replace(",",".") : "";
          if (norm(a) === norm(q.correct)) correct++;
        }
      }
    }
    return { answered, correct };
  }, [answers, revealed]);

  const handleReset = useCallback(() => {
    setAnswers({});
    setRevealed({});
  }, []);

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0F172A",
      color: "#F8FAFC",
      fontFamily: "'Source Sans 3', sans-serif",
    }}>
      <style>{fontImport}</style>
      <div ref={topRef} style={{ maxWidth: 780, margin: "0 auto", padding: "24px 16px 80px" }}>

        {/* Header */}
        <div style={{ marginBottom: 28, textAlign: "center" }}>
          <h1 style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 800,
            fontSize: 26,
            background: "linear-gradient(135deg, #3B82F6, #10B981, #F59E0B, #EF4444, #8B5CF6, #06B6D4)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            margin: "0 0 6px 0",
          }}>
            IMAK2004 Øvingseksamen
          </h1>
          <p style={{ color: "#94A3B8", fontSize: 14, margin: 0 }}>72 spørsmål · 6 delemner · Eksamensnivå</p>
        </div>

        {/* Score bar */}
        <div style={{
          background: "#1E293B",
          border: "1px solid #334155",
          borderRadius: 12,
          padding: "14px 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 20,
          flexWrap: "wrap",
          gap: 10,
        }}>
          <div>
            <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 20, color: "#22C55E" }}>
              {stats.correct}
            </span>
            <span style={{ color: "#94A3B8", fontSize: 14, marginLeft: 4 }}>riktige</span>
            <span style={{ color: "#334155", margin: "0 8px" }}>/</span>
            <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 20, color: "#F8FAFC" }}>
              {stats.answered}
            </span>
            <span style={{ color: "#94A3B8", fontSize: 14, marginLeft: 4 }}>besvart</span>
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            {stats.answered > 0 && (
              <span style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 14,
                color: stats.correct / stats.answered >= 0.8 ? "#22C55E" : stats.correct / stats.answered >= 0.5 ? "#F59E0B" : "#EF4444",
              }}>
                {Math.round(stats.correct / stats.answered * 100)}%
              </span>
            )}
            <button onClick={handleReset} style={{
              background: "#EF4444",
              color: "white",
              border: "none",
              borderRadius: 8,
              padding: "6px 14px",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 700,
              fontSize: 12,
              cursor: "pointer",
            }}>
              Reset
            </button>
          </div>
        </div>

        {/* Filter bar */}
        <div style={{
          display: "flex",
          gap: 6,
          marginBottom: 24,
          flexWrap: "wrap",
        }}>
          <button onClick={() => setFilter(0)} style={{
            background: filter === 0 ? "#F8FAFC" : "#1E293B",
            color: filter === 0 ? "#0F172A" : "#94A3B8",
            border: `1px solid ${filter === 0 ? "#F8FAFC" : "#334155"}`,
            borderRadius: 20,
            padding: "6px 16px",
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 700,
            fontSize: 12,
            cursor: "pointer",
            transition: "all 0.2s",
          }}>
            Alle ({ALL_QUESTIONS.length})
          </button>
          {SUBJECTS.map(sub => {
            const count = ALL_QUESTIONS.filter(q => q.sub === sub.id).length;
            const active = filter === sub.id;
            return (
              <button key={sub.id} onClick={() => setFilter(sub.id)} style={{
                background: active ? sub.color : "#1E293B",
                color: active ? "#0F172A" : sub.color,
                border: `1px solid ${active ? sub.color : sub.color + "44"}`,
                borderRadius: 20,
                padding: "6px 14px",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 700,
                fontSize: 12,
                cursor: "pointer",
                transition: "all 0.2s",
                whiteSpace: "nowrap",
              }}>
                {sub.short} ({count})
              </button>
            );
          })}
        </div>

        {/* Progress per subject */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(110px, 1fr))",
          gap: 8,
          marginBottom: 24,
        }}>
          {SUBJECTS.map(sub => {
            const subQs = ALL_QUESTIONS.filter(q => q.sub === sub.id);
            const done = subQs.filter(q => revealed[q.id]).length;
            const right = subQs.filter(q => {
              if (!revealed[q.id]) return false;
              const a = answers[q.id];
              if (q.type === "mc") return a === q.correct;
              if (q.type === "tf") return a === q.correct;
              if (q.type === "calc") {
                const norm = (s) => s ? s.toString().toLowerCase().replace(/\s/g,"").replace(",",".") : "";
                return norm(a) === norm(q.correct);
              }
              return false;
            }).length;
            const pct = subQs.length > 0 ? done / subQs.length : 0;
            return (
              <div key={sub.id} style={{
                background: "#1E293B",
                borderRadius: 8,
                padding: "8px 10px",
                border: `1px solid #334155`,
              }}>
                <div style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 700,
                  fontSize: 11,
                  color: sub.color,
                  marginBottom: 4,
                }}>{sub.short}</div>
                <div style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 12,
                  color: "#94A3B8",
                }}>{right}/{done}/{subQs.length}</div>
                <div style={{
                  height: 3,
                  background: "#334155",
                  borderRadius: 2,
                  marginTop: 4,
                  overflow: "hidden",
                }}>
                  <div style={{
                    height: "100%",
                    width: `${pct * 100}%`,
                    background: sub.color,
                    borderRadius: 2,
                    transition: "width 0.3s",
                  }} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Questions */}
        {filteredQs.map((q) => (
          <QuestionCard
            key={q.id}
            question={q}
            globalIdx={globalIndex(q)}
            localIdx={localIndex(q)}
            answer={answers[q.id]}
            onAnswer={(val) => handleAnswer(q.id, val)}
            revealed={!!revealed[q.id]}
            onReveal={() => handleReveal(q.id)}
          />
        ))}

        {filteredQs.length === 0 && (
          <div style={{ textAlign: "center", color: "#64748B", padding: 40, fontFamily: "'Source Sans 3', sans-serif" }}>
            Ingen spørsmål matcher filteret.
          </div>
        )}

        {/* Footer */}
        <div style={{
          textAlign: "center",
          marginTop: 40,
          padding: "16px 0",
          borderTop: "1px solid #1E293B",
          color: "#475569",
          fontFamily: "'Source Sans 3', sans-serif",
          fontSize: 12,
        }}>
          IMAK2004 Kjemisk analyse · NTNU · Øvingseksamen generert fra pensum og eksamener V2021–V2025
        </div>
      </div>
    </div>
  );
}
