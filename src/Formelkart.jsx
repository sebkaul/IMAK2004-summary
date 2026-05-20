import { useState, useEffect, useRef } from "react";

const SUBJECTS = [
  { id: 1, name: "Statistikk og feil", color: "#3B82F6", icon: "📊" },
  { id: 2, name: "Syre-base", color: "#10B981", icon: "🧪" },
  { id: 3, name: "Kromatografi", color: "#F59E0B", icon: "📈" },
  { id: 4, name: "Gravimetri & titrering", color: "#EF4444", icon: "⚖️" },
  { id: 5, name: "Elektrokjemi", color: "#8B5CF6", icon: "⚡" },
  { id: 6, name: "Spektroskopi & MS", color: "#06B6D4", icon: "🔬" },
];

const FORMULAS = {
  1: [
    {
      title: "Absolutt feil",
      formula: "E = xᵢ − xₜ",
      meaning: "Forskjellen mellom målt verdi og sann verdi.",
      trigger: "Når du har en målt verdi og en kjent/sann verdi, og skal vurdere hvor langt unna du er.",
      examTrigger: "«Regn ut absolutt feil for målingen...» eller «Hvor stor er feilen i resultatet?»",
      pitfall: "Husk fortegn — positiv feil betyr for høy verdi, negativ betyr for lav.",
    },
    {
      title: "Relativ feil",
      formula: "Eᵣ = (xᵢ − xₜ) / xₜ · 100 %",
      meaning: "Feil uttrykt som prosent av sann verdi — sammenlignbar på tvers av målestørrelser.",
      trigger: "Når du skal uttrykke feilen i prosent, eller sammenligne nøyaktigheten av ulike målinger.",
      examTrigger: "«Hva er den relative feilen i %?» eller «Hvor nøyaktig er målingen?»",
      pitfall: "Del på sann verdi (xₜ), ikke på målt verdi.",
    },
    {
      title: "Gjennomsnitt (utvalg)",
      formula: "x̄ = Σxᵢ / N",
      meaning: "Aritmetisk middel av N målinger.",
      trigger: "Når du har flere parallelle målinger og skal finne beste estimat.",
      examTrigger: "«Beregn gjennomsnittet av følgende målinger...»",
      pitfall: "Bruk ALLTID gjennomsnitt av paralleller, ikke enkeltmåling.",
    },
    {
      title: "Standardavvik (utvalg)",
      formula: "s = √[ Σ(xᵢ − x̄)² / (N−1) ]",
      meaning: "Mål på spredningen i måledataene. Deler på N−1 (ikke N) for utvalg.",
      trigger: "Når du skal kvantifisere presisjonen i et sett målinger.",
      examTrigger: "«Beregn standardavviket...» eller «Angi svaret med riktig antall siffer og standardavvik.»",
      pitfall: "Standardavviket skal ha 1 gjeldende siffer. Svaret rundes av til samme desimal.",
    },
    {
      title: "Standardavvik for gjennomsnitt",
      formula: "s_gj = s / √N",
      meaning: "Usikkerheten i gjennomsnittet — avtar med flere målinger.",
      trigger: "Når du skal oppgi usikkerheten i et gjennomsnittsresultat, eller beregne konfidensintervall.",
      examTrigger: "«Angi standardavviket for gjennomsnittet» eller «Beregn usikkerheten i middelverdien.»",
      pitfall: "Ikke forveksle s (spredning i data) med s_gj (usikkerhet i gjennomsnitt).",
    },
    {
      title: "Feilforplantning (add/sub)",
      formula: "s_y = √(s_a² + s_b² + ...)",
      meaning: "Ved addisjon/subtraksjon: absolutte usikkerheter adderes i kvadratur.",
      trigger: "Når sluttresultatet er en sum eller differanse av målte verdier med kjent usikkerhet.",
      examTrigger: "«Regn ut svaret og standardavviket» med uttrykk som a(±s_a) − b(±s_b).",
      pitfall: "Differanser gir stor relativ feil når tallene er nær like store.",
    },
    {
      title: "Feilforplantning (mult/div)",
      formula: "s_y/y = √[ (s_a/a)² + (s_b/b)² + ... ]",
      meaning: "Ved multiplikasjon/divisjon: relative usikkerheter adderes i kvadratur.",
      trigger: "Når sluttresultatet er et produkt eller kvotient av målte verdier.",
      examTrigger: "«3,48(±0,02) − 3,11(±0,01) / 0,34(±0,04) = ?» — kombiner begge regler!",
      pitfall: "Beregn teller og nevner separat, bruk riktig regel for hvert trinn.",
    },
    {
      title: "Q-test (utliggertest)",
      formula: "Q = |utligger − nærmest| / (størst − minst)",
      meaning: "Tester om en mistenkelig verdi er en statistisk utligger og bør forkastes.",
      trigger: "Når én måling skiller seg kraftig fra resten og du lurer på om den kan forkastes.",
      examTrigger: "«Kan denne verdien forkastes ved 95% konfidens?» — oppgi Q-tabell i oppgaven.",
      pitfall: "Sammenlign med Q_crit fra tabell. Forkast kun hvis Q > Q_crit.",
    },
    {
      title: "Kontrollgrenser",
      formula: "UCL = μ + 3σ/√N\nLCL = μ − 3σ/√N",
      meaning: "Grenser for akseptable resultater i kvalitetskontroll (±3σ).",
      trigger: "Når du skal vurdere om et kontrollresultat er innenfor akseptable grenser.",
      examTrigger: "«Er resultatet innenfor kontrollgrensene?» eller kvalitetskontroll-diagram.",
      pitfall: "Bruk σ (populasjon), ikke s (utvalg), hvis populasjonsdata er gitt.",
    },
    {
      title: "LOD og LOQ",
      formula: "LOD: S/N = 3\nLOQ: S/N = 10",
      meaning: "Laveste konsentrasjon som kan detekteres (LOD) vs kvantifiseres pålitelig (LOQ).",
      trigger: "Når du skal vurdere om en metode er sensitiv nok for en gitt analytt.",
      examTrigger: "«Hva er deteksjonsgrensen for metoden?» eller «Kan du kvantifisere ved denne konsentrasjonen?»",
      pitfall: "LOD ≠ LOQ. LOQ er alltid høyere — du trenger S/N = 10 for å kvantifisere.",
    },
  ],
  2: [
    {
      title: "Ka og pKa",
      formula: "Ka = [H⁺]·[A⁻] / [HA]\npKa = −log(Ka)",
      meaning: "Syrekonstanten beskriver styrken til en svak syre. Lavere pKa = sterkere syre.",
      trigger: "Når du jobber med svake syrer/baser og trenger likevektskonstanten.",
      examTrigger: "«Slå opp pKa i SICD tabell 38» — nesten alle syre-base-oppgaver starter her.",
      pitfall: "Ka·Kb = Kw = 10⁻¹⁴. Bruk dette til å finne Kb fra Ka.",
    },
    {
      title: "Henderson-Hasselbalch",
      formula: "pH = pKa + log([base] / [syre])",
      meaning: "Bufferligningen — gir pH når du kjenner forholdet mellom base- og syreform.",
      trigger: "Når du har en bufferløsning (svak syre + konjugert base) og skal finne pH, eller omvendt.",
      examTrigger: "«Hva er pH i halvtitrerpunktet?» (svar: pH = pKa) eller «Beregn pH i bufferløsningen.»",
      pitfall: "Gjelder KUN i bufferområdet. Ikke bruk ved ekvivalenspunktet!",
    },
    {
      title: "α-verdier (enprotisk syre)",
      formula: "α₀ = [H⁺] / ([H⁺] + Ka)\nα₁ = Ka / ([H⁺] + Ka)",
      meaning: "Andel av total konsentrasjon som er i syreform (α₀) vs baseform (α₁).",
      trigger: "Når du skal finne fordelingen mellom HA og A⁻ ved en gitt pH.",
      examTrigger: "«Hva er α₀ og α₁ ved pH = 5?» eller α-pH-plott der du skal identifisere skjæringspunkter.",
      pitfall: "α₀ + α₁ = 1 alltid. Ved halvtitrerpunktet er α₀ = α₁ = 0,5.",
    },
    {
      title: "α-verdier (diprotisk syre)",
      formula: "α₀ = [H⁺]² / D\nα₁ = [H⁺]·Ka1 / D\nα₂ = Ka1·Ka2 / D\nD = [H⁺]² + [H⁺]·Ka1 + Ka1·Ka2",
      meaning: "Fordeling mellom H₂A, HA⁻ og A²⁻ for en toprotisk syre.",
      trigger: "Når du har en diprotisk syre (f.eks. H₂CO₃, H₃AsO₄) og skal finne speciefordelingen.",
      examTrigger: "«Figuren viser α-pH-plott. Er dette en enverdig eller toverdig syre?» (V2022 oppg. 6a)",
      pitfall: "Halvtitrerpunkt 1: [H₂A] = [HA⁻], pH = pKa1. Halvtitrerpunkt 2: [HA⁻] = [A²⁻], pH = pKa2.",
    },
    {
      title: "Massebalanse",
      formula: "cT = Σ likevektskonsentrasjoner",
      meaning: "Total analytisk konsentrasjon = summen av alle former stoffet finnes på.",
      trigger: "Når du skal sette opp et ligningssystem for å løse pH-problemer eksakt.",
      examTrigger: "«Sett opp massebalanse for denne løsningen» (V2025 oppg. 3d)",
      pitfall: "Ikke glem noen specier! For H₂CO₃: cT = [H₂CO₃] + [HCO₃⁻] + [CO₃²⁻].",
    },
    {
      title: "Ladningsbalanse",
      formula: "Σz[M^z+] = Σz[A^z−]",
      meaning: "Summen av all positiv ladning = summen av all negativ ladning i løsningen.",
      trigger: "Når du skal sette opp et fullstendig ligningssystem — ofte sammen med massebalanse.",
      examTrigger: "«Sett opp ladningsbalanse» — husk å inkludere motioner som Na⁺ fra NaOH!",
      pitfall: "Multipliser med ladningstall! 2·[CO₃²⁻] og 2·[Ca²⁺], ikke bare konsentrasjonen.",
    },
    {
      title: "Protonbalanse",
      formula: "Σ[syre dannet] = Σ[base dannet]",
      meaning: "Antall protoner avgitt = antall protoner tatt opp, relativt til en referanseform.",
      trigger: "Når du skal finne pH i ekvivalenspunktet eller bestemme pH uten å kjenne volum.",
      examTrigger: "«Sett opp protonbalanse ved 1. ekvivalenspunkt» — velg dominerende specie som referanse.",
      pitfall: "Referanseform er den dominerende specien. Ved 1. ekv.pkt for H₂A: referanse er HA⁻.",
    },
    {
      title: "Halvtitrerpunkt",
      formula: "pH = pKa",
      meaning: "Når nøyaktig halvparten av syren er titrert, er [HA] = [A⁻] og pH = pKa.",
      trigger: "Når du skal bestemme pKa eksperimentelt fra en titrerkurve.",
      examTrigger: "«Bestem pKa fra titrerkurven» eller «pH i halvtitrerpunktet kan finnes ved skjæringspunktet mellom...»",
      pitfall: "For diprotisk syre: 1. halvtitrerpunkt gir pKa1, 2. halvtitrerpunkt gir pKa2.",
    },
    {
      title: "Bufferkapasitet",
      formula: "β = dcb/dpH = −dca/dpH",
      meaning: "Hvor mange mol sterk syre/base som trengs for å endre pH med 1 enhet per liter.",
      trigger: "Når du skal vurdere hvor godt en buffer motstår pH-endringer.",
      examTrigger: "«Hvor er bufferkapasiteten høyest/lavest?» — høyest ved pH = pKa, lavest ved ekvivalenspunkt.",
      pitfall: "Lav bufferkapasitet = bratt titrerkurve = lettere å bestemme ekvivalenspunktet nøyaktig!",
    },
    {
      title: "Titrerfeil",
      formula: "Et = V_ep − V_eq",
      meaning: "Volumforskjellen mellom observert endepunkt og teoretisk ekvivalenspunkt.",
      trigger: "Når du skal vurdere nøyaktigheten av en titrering.",
      examTrigger: "«Forklar titrerfeil og hva som påvirker den.»",
      pitfall: "Titrerfeil er alltid > 0 (endepunkt er etter ekvivalenspunkt). Brattere kurve = mindre feil.",
    },
    {
      title: "Indikatoromslag",
      formula: "pH = pKa(indikator) ± 1",
      meaning: "En indikator skifter farge i området pKa ± 1.",
      trigger: "Når du skal velge en passende indikator — omslagsområdet må treffe ekvivalenspunkt-pH.",
      examTrigger: "«Er fenolftalein/metylrødt en passende indikator?» (V2021 oppg. 5)",
      pitfall: "Svak syre + sterk base → basisk ekv.pkt → fenolftalein. Svak base + sterk syre → surt ekv.pkt → metylrødt.",
    },
    {
      title: "Log-log-diagram",
      formula: "Les av pH fra skjæringspunkter\nmellom konsentrasjonslinjer",
      meaning: "Grafisk verktøy der log[specie] plottes mot pH. Skjæringspunkter gir pH for viktige punkter.",
      trigger: "Når oppgaven gir et log-log-diagram og ber deg finne pH, identifisere syren, eller vurdere bufferkapasitet.",
      examTrigger: "«Bruk log-log-diagrammet til å finne pH i ekvivalenspunktet» (V2023, V2024)",
      pitfall: "Skjæring [H₂A]=[HA⁻] → pKa1. Skjæring [HA⁻]=[A²⁻] → pKa2. Skjæring [H₂A]=[A²⁻] → pH i 1. ekv.pkt.",
    },
  ],
  3: [
    {
      title: "Retensjonsfaktor, k",
      formula: "k = t'R / t₀ = (tR − t₀) / t₀",
      meaning: "Dimensjonsløst mål på hvor lenge analytten oppholder seg i stasjonærfasen relativt til mobilfasen.",
      trigger: "Når du har et kromatogram og skal kvantifisere retensjon for en komponent.",
      examTrigger: "«Beregn k for komponent 5 og 6» (V2021, V2024) — les av tR og t₀ fra kromatogrammet.",
      pitfall: "Ikke forveksle tR (total tid) med t'R (justert tid). t₀ = dødtid = mobilfasetoppen. Ideelt: 1 < k < 5.",
    },
    {
      title: "Separasjonsfaktor, α",
      formula: "α = kB / kA   (kB > kA, α ≥ 1)",
      meaning: "Hvor godt kolonnen skiller to komponenter — avhenger av stasjonærfasen.",
      trigger: "Når du har to nabotopper og skal vurdere selektiviteten.",
      examTrigger: "«Beregn α for komponent 5 og 6» — alltid: den med høyest k i teller.",
      pitfall: "α = 1 betyr ingen separasjon. Kan forbedres ved å endre SF eller temperatur (GC).",
    },
    {
      title: "Platetall, N",
      formula: "N = 16·(tR/W)²\nN = 5,54·(tR/W½)²",
      meaning: "Mål på kolonneeffektivitet — høyere N gir smalere topper og bedre separasjon.",
      trigger: "Når du skal vurdere kolonneeffektiviteten fra et kromatogram.",
      examTrigger: "«Beregn N fra halvhøydebredden» — les av W½ nøyaktig fra kromatogrammet.",
      pitfall: "Bruk retensjonstid og toppbredde i SAMME enhet. Sjekk om oppgaven gir W eller W½.",
    },
    {
      title: "Platehøyde, H",
      formula: "H = L / N",
      meaning: "Kolonneeffektivitet per lengdeenhet — lavere H er bedre.",
      trigger: "Når du skal sammenligne effektiviteten til to kolonner med ulik lengde.",
      examTrigger: "«Hvilken kolonne er mest effektiv?» — beregn H for begge, lavest H vinner.",
      pitfall: "Enheten følger L (cm eller mm). Vanlig å rapportere i cm.",
    },
    {
      title: "Van Deemter-ligningen",
      formula: "H = A + B/u + C·u",
      meaning: "Tre bidrag til båndspredning: eddydiffusjon (A), longitudinal diffusjon (B/u), massetransportmotstand (Cu).",
      trigger: "Når du skal forklare hva som påvirker toppbredden, eller optimalisere mobilfasehastigheten.",
      examTrigger: "«Bruk Van Deemter til å forklare forskjellen på kolonnene» (V2022 oppg. 3a)",
      pitfall: "A = 0 for kapillærkolonner (ingen eddydiffusjon). B/u dominerer ved lav u (viktigst i GC). C·u dominerer ved høy u.",
    },
    {
      title: "Oppløsning, Rs",
      formula: "Rs = 2(tR,B − tR,A) / (WA + WB)",
      meaning: "Kvantitativt mål på hvor godt to topper er separert.",
      trigger: "Når du skal vurdere om to topper er tilstrekkelig separert.",
      examTrigger: "«Beregn Rs for komponent 5 og 6. Har man grunnlinjeseparasjon?» (V2021, V2024)",
      pitfall: "Rs ≥ 1,5 → grunnlinjeseparasjon (≈0% overlapp). Rs < 1 → dårlig separasjon.",
    },
    {
      title: "Rs-formelen (utvidet)",
      formula: "Rs = (√N / 4) · ((α−1)/α) · (kB/(1+kB))",
      meaning: "Viser at Rs avhenger av tre faktorer: effektivitet (N), selektivitet (α) og retensjon (k).",
      trigger: "Når du skal diskutere HVORDAN separasjonen kan forbedres.",
      examTrigger: "«Hva kan du gjøre for å forbedre oppløsningen?» — øk N (lengre kolonne), øk α (annen SF), optimer k.",
      pitfall: "α har størst effekt. Dobling av N gir kun √2 ≈ 1,4× forbedring i Rs.",
    },
    {
      title: "Asymmetri",
      formula: "As = b / a   (ved 10% av topphøyden)",
      meaning: "Mål på symmetrien til en kromatografisk topp.",
      trigger: "Når du skal vurdere toppkvaliteten i et kromatogram.",
      examTrigger: "«Beregn asymmetrifaktoren» — mål a og b ved 10% av topphøyden.",
      pitfall: "As = 1: symmetrisk. As < 1: fronting. As > 1: tailing.",
    },
    {
      title: "GC vs HPLC (konsept)",
      formula: "GC: gass-MF, flyktige stoffer\nHPLC: væske-MF, ikke-flyktige stoffer",
      meaning: "To hovedtyper kromatografi med ulike anvendelsesområder og egenskaper.",
      trigger: "Når oppgaven spør om forskjeller, fordeler/ulemper, eller når du skal velge metode.",
      examTrigger: "«Hva er forskjellen mellom GC og HPLC?» (V2025 oppg. 1d), «Hvilken metode ville du brukt?»",
      pitfall: "GC: høyere N, raskere, billigere, men kun flyktige. HPLC: allsidig, kan kombineres med flere SF-typer.",
    },
    {
      title: "Normalfase vs omvendt fase",
      formula: "NP: polar SF, upolar MF\nRP: upolar SF, polar MF",
      meaning: "To modi for kromatografi med motsatt polaritetsprinsipp.",
      trigger: "Når oppgaven spør om elueringsrekkefølge eller valg av kolonne.",
      examTrigger: "«Estimer elueringsrekkefølgen på RP-LC» — mest polare eluerer først i RP.",
      pitfall: "RP er mest brukt. Gradient RP: synkende polaritet av MF. Gradient NP: økende polaritet.",
    },
  ],
  4: [
    {
      title: "Relativ overmetning",
      formula: "(Q − S) / S",
      meaning: "Q = faktisk konsentrasjon, S = likevektskonsentrasjon. Styrer krystallvekst vs kimdannelse.",
      trigger: "Når oppgaven handler om gravimetrisk analyse og partikkelstørrelse/krystallkvalitet.",
      examTrigger: "«Hva er relativ overmetting, og hva har det med krystallvekst å gjøre?» (V2025 oppg. 2c)",
      pitfall: "Høy overmetning → mange små krystaller (dårlig). Lav overmetning → få store (bra). Tilsett reagens langsomt!",
    },
    {
      title: "Gravimetrisk beregning",
      formula: "n(analytt) = m(utfelling) / M(utfelling)\nc = n / V",
      meaning: "Fra massen av utfellingen kan du beregne stoffmengde og konsentrasjon av analytten.",
      trigger: "Når du har veid en utfelling og skal beregne konsentrasjon av analytten i originalløsningen.",
      examTrigger: "«Hva var konsentrasjonen av sulfat i løsningen?» — kjent reaksjon og masse av BaSO₄.",
      pitfall: "Sjekk støkiometrien! Ikke alltid 1:1. F.eks. Ni²⁺ + 2DMG → BDN.",
    },
    {
      title: "Løselighetsprodukt, Ksp",
      formula: "Ksp = [M^m+]^a · [X^n−]^b\nfor MaXb(s) ⇌ aM^m+ + bX^n−",
      meaning: "Likevektskonstant for oppløsning av tungtoppløselig salt — lav Ksp = vanskelig å løse.",
      trigger: "Når du jobber med fellingstitrering eller skal vurdere om et salt feller ut.",
      examTrigger: "«Hvilken halogenid felles først?» — den med lavest Ksp felles først.",
      pitfall: "I⁻ felles først (lavest Ksp), så Br⁻, så Cl⁻ ved argentometri med AgNO₃.",
    },
    {
      title: "Fellingstitrering (argentometri)",
      formula: "n(Ag⁺) = n(X⁻)\nc·V(AgNO₃) = n(halogenid)",
      meaning: "Titrering med sølvnitrat for å bestemme halogenider — Ag⁺ + X⁻ → AgX(s).",
      trigger: "Når du skal bestemme konsentrasjon av Cl⁻, Br⁻, eller I⁻ ved titrering med AgNO₃.",
      examTrigger: "«Hvor mye bromid var i prøven?» (V2022) — Volhard-metode med tilbaketitrering.",
      pitfall: "Volhard: tilsett overskudd Ag⁺, titrér tilbake med SCN⁻. n(X⁻) = n(Ag⁺,tilsatt) − n(SCN⁻).",
    },
    {
      title: "Total dannelseskonstant, βn",
      formula: "βn = K₁ · K₂ · ... · Kn",
      meaning: "Produkt av trinnvise dannelseskonstanter for et kompleks ML_n.",
      trigger: "Når du jobber med kompleksdannelse i flere trinn.",
      examTrigger: "Sjelden beregnet direkte, men ligger bak EDTA-titrering og kondisjonelle konstantar.",
      pitfall: "Høy β = stabilt kompleks = gunstig for titrering.",
    },
    {
      title: "EDTA og αY4⁻",
      formula: "αY4⁻ = [Y⁴⁻] / cT(EDTA)\navhenger av pH",
      meaning: "Andelen av EDTA som er i den reaktive formen Y⁴⁻ — styres av pH.",
      trigger: "Når du jobber med EDTA-titrering og må ta hensyn til pH.",
      examTrigger: "«Ved hvilken pH kan du titrere dette metallionet?» — se minimums-pH-tabell for EDTA.",
      pitfall: "αY4⁻ øker med pH. Bufrer alltid EDTA-titreringer! pH = 10 for Ca²⁺/Mg²⁺, pH = 2 for Fe³⁺.",
    },
    {
      title: "Kondisjonell dannelseskonstant",
      formula: "K'f = αY4⁻ · Kf",
      meaning: "Effektiv dannelseskonstant ved en bestemt pH — tar hensyn til at ikke all EDTA er Y⁴⁻.",
      trigger: "Når du skal beregne titrerkurve for EDTA-titrering eller vurdere om titrering er mulig ved gitt pH.",
      examTrigger: "«Beregn K'f ved pH = 5» — slå opp αY4⁻ ved pH 5, multipliser med Kf fra tabell.",
      pitfall: "Stor K'f trengs for bratt titrerkurve. Lav pH gir lav αY4⁻ og dermed lav K'f.",
    },
    {
      title: "EDTA-titrering: beregning",
      formula: "n(M^z+) = n(EDTA) = c(EDTA)·V(EDTA)\n(alltid 1:1-støkiometri)",
      meaning: "EDTA danner 1:1-kompleks uavhengig av ladningen til metallionet.",
      trigger: "Når du skal beregne konsentrasjon av et metallion fra EDTA-forbruk.",
      examTrigger: "«Hva er konsentrasjonen av Fe³⁺ og Al³⁺?» (V2024 oppg.) — direkte + tilbaketitrering.",
      pitfall: "Ved tilbaketitrering: n(analytt) = n(EDTA,tilsatt) − n(EDTA,tilbaketitrert).",
    },
  ],
  5: [
    {
      title: "Termodynamisk cellepotensial",
      formula: "E(celle) = E(HS) − E(VS)",
      meaning: "Spenningen i cellen = potensial høyre halvcelle minus potensial venstre halvcelle.",
      trigger: "Når du har to halvreaksjoner med kjente standardpotensialer og skal finne cellespenningen.",
      examTrigger: "«Beregn cellepotensialet for følgende celle...» — skriv halvreaksjoner og bruk E°-verdier.",
      pitfall: "Katode (reduksjon) = høyre side. Anode (oksidasjon) = venstre side. Positiv E → spontan reaksjon.",
    },
    {
      title: "Nernst-ligningen (full)",
      formula: "E = E° − (RT/zF) · ln Q",
      meaning: "Cellepotensialet avhenger av konsentrasjonene via reaksjonskvotienten Q.",
      trigger: "Når konsentrasjonene ikke er standard (1 M) og du trenger eksakt potensial.",
      examTrigger: "Sjelden brukt direkte — den forenklede versjonen er vanligst.",
      pitfall: "R = 8,314 J/(mol·K), T i Kelvin, F = 96485 C/mol, z = antall elektroner overført.",
    },
    {
      title: "Nernst (forenklet, 25°C)",
      formula: "E ≈ E° − (0,0592 V / z) · log Q",
      meaning: "Forenklet versjon ved romtemperatur — bruk denne på eksamen!",
      trigger: "Når du beregner cellepotensial eller elektrodepotensial ved kjente konsentrasjoner.",
      examTrigger: "«Beregn potensialet til denne elektroden i en 0,01 M løsning...»",
      pitfall: "z = antall elektroner i halvreaksjonen. Q bruker likevektskonsentrasjoner/aktiviteter.",
    },
    {
      title: "Cellepotensial (potensiometri)",
      formula: "E(celle) = E(ind) − E(ref) + E(j)",
      meaning: "Målt spenning = indikatorelektrode − referanseelektrode + overgangspotensial.",
      trigger: "Når du gjør potensiometriske målinger med referanse- og indikatorelektrode.",
      examTrigger: "«Forklar oppsettet for potensiometri» (V2022 oppg. 12b)",
      pitfall: "E(j) er overgangspotensial (junction) — minimeres med saltbro (KCl). Ofte antatt ≈ 0.",
    },
    {
      title: "Operasjonell pH-definisjon",
      formula: "pH(X) = pH(S) − [E(X) − E(S)] / 0,0592 V",
      meaning: "pH bestemmes ved å sammenligne med en standardbuffer med kjent pH.",
      trigger: "Når du skal bestemme pH fra potensiometriske målinger.",
      examTrigger: "«Beregn pH i den ukjente løsningen gitt at...»",
      pitfall: "pH(S) = pH til standardbufferen. E(X) og E(S) er målte cellespenninger.",
    },
    {
      title: "Direkte potensiometri (kationer)",
      formula: "pX = −log(aX) = −z·(E(celle) − K) / 0,0592 V",
      meaning: "Bestem konsentrasjon av kationer direkte fra målt cellepotensial.",
      trigger: "Når du bruker en ioneselektiv elektrode til å måle kationkonsentrasjon.",
      examTrigger: "«Beregn konsentrasjonen av X²⁺ fra det målte cellepotensialet.»",
      pitfall: "K er en konstant som inkluderer E(ref) og E(j) — må bestemmes ved kalibrering.",
    },
    {
      title: "Direkte potensiometri (anioner)",
      formula: "pA = −log(aA) = z·(E(celle) − K) / 0,0592 V",
      meaning: "Som for kationer, men med positivt fortegn foran z.",
      trigger: "Når du bruker en ioneselektiv elektrode for anioner (f.eks. F⁻-elektrode).",
      examTrigger: "Sjeldnere enn kationer, men samme prinsipp.",
      pitfall: "Merk fortegnsforskjellen fra kation-versjonen!",
    },
    {
      title: "Voltammetri: 3-elektrode-system",
      formula: "WE (arbeidselektrode) — reaksjonen skjer\nRE (referanse) — kjent potensial\nCE (motelektrode) — strømkrets",
      meaning: "Måler strøm som funksjon av påtrykt spenning. Spenning styres mellom WE-RE, strøm går WE-CE.",
      trigger: "Når oppgaven viser et voltammogram eller spør om voltammetri-oppsett.",
      examTrigger: "«Figuren viser et voltammogram. Hva slags voltammetri?» (V2022, V2023 oppg. 7b)",
      pitfall: "Syklisk: triangulært spenningsskann, viser oksidasjon OG reduksjon. Stripping: deposition + stripping.",
    },
    {
      title: "Stripping-voltammetri",
      formula: "1. Deposition (konsentrering)\n2. Stripping (analyse)",
      meaning: "Ekstremt sensitiv teknikk — analytten konsentreres på elektroden før analyse.",
      trigger: "Når du skal detektere svært lave konsentrasjoner (sporelementanalyse).",
      examTrigger: "«Hva er fordelene med stripping-voltammetri?» — sensitiv pga konsentreringstrinnet.",
      pitfall: "Deposisjonstid påvirker sensitiviteten. Lengre tid = mer følsomt, men også lengre analyse.",
    },
  ],
  6: [
    {
      title: "Lyshastighet",
      formula: "c = λ · ν",
      meaning: "Bølgelengde × frekvens = lysets hastighet (3,00 × 10⁸ m/s).",
      trigger: "Når du skal omregne mellom bølgelengde og frekvens.",
      examTrigger: "«Omregn fra bølgelengde til frekvens» — enkel omregning.",
      pitfall: "Bruk riktige enheter: λ i meter, ν i Hz (s⁻¹).",
    },
    {
      title: "Fotonenergi",
      formula: "E = hν = hc/λ",
      meaning: "Energien til et foton — kort bølgelengde = høy energi.",
      trigger: "Når du skal beregne energien til stråling ved en gitt bølgelengde.",
      examTrigger: "«Hvilken type stråling har høyest energi?» — UV > synlig > IR.",
      pitfall: "h = 6,626 × 10⁻³⁴ J·s (Plancks konstant).",
    },
    {
      title: "Beer-Lamberts lov",
      formula: "A = εbc = log(P₀/P)",
      meaning: "Absorbans er proporsjonal med konsentrasjon — grunnlaget for kvantitativ UV/VIS.",
      trigger: "Når du skal bestemme konsentrasjon fra absorbansmåling, eller omvendt.",
      examTrigger: "«Beers lov sier at konsentrasjonen er proporsjonal med...absorbansen» (V2022 oppg. 14e)",
      pitfall: "Gjelder ved lav konsentrasjon og monokromatisk lys. Avvik ved høy c eller strølys.",
    },
    {
      title: "Transmittans og absorbans",
      formula: "T = P/P₀\nA = −log(T) = log(P₀/P)",
      meaning: "T = andel lys som passerer gjennom prøven. A = −log(T).",
      trigger: "Når du skal omregne mellom T og A.",
      examTrigger: "«Hva er absorbansen hvis transmittansen er 10%?» → A = −log(0,10) = 1,0.",
      pitfall: "T er et tall mellom 0 og 1. A er vanligvis mellom 0 og 2.",
    },
    {
      title: "Totalabsorbans for blandinger",
      formula: "A_total = ΣAᵢ = Σεᵢbcᵢ",
      meaning: "Absorbansen til en blanding er summen av bidragene fra hver komponent.",
      trigger: "Når du har en blanding av absorberande stoffer og skal analysere sammensetningen.",
      examTrigger: "«Bestem konsentrasjonen av M og N i blanding» — trenger 2 bølgelengder for 2 komponenter.",
      pitfall: "Trenger like mange bølgelengder som ukjente komponenter.",
    },
    {
      title: "Stokes-skift",
      formula: "λ(abs) ≤ λ(fluorescens)",
      meaning: "Fluorescert lys har alltid lengre bølgelengde (lavere energi) enn absorbert lys.",
      trigger: "Når du jobber med fluorescensspektroskopi og skal forstå emisjon vs absorpsjon.",
      examTrigger: "«Forklar Stokes-skift» — energitap til vibrasjonsrelaksering gir lengre λ.",
      pitfall: "Fosforescens har enda lengre λ enn fluorescens (pga spinnoverganger).",
    },
    {
      title: "Kvanteutbytte",
      formula: "ΦF = #fotoner ut / #fotoner inn",
      meaning: "Andelen av eksiterte molekyler som relakserer ved å sende ut fluorescens.",
      trigger: "Når du skal vurdere hvor effektivt et molekyl fluorescerer.",
      examTrigger: "«Forklar kort hva som menes med kvanteutbytte» (V2023, V2024 oppg. 8a)",
      pitfall: "ΦF mellom 0 og 1. Høy ΦF = sterkt fluorescerende. Påvirkes av løsemiddel og temperatur.",
    },
    {
      title: "Fluorescensintensitet",
      formula: "F = K'(P₀ − P) ≈ Kc\n(ved lav konsentrasjon)",
      meaning: "Ved lav konsentrasjon er fluorescensintensiteten proporsjonal med konsentrasjonen.",
      trigger: "Når du skal bruke fluorescens til kvantitativ bestemmelse.",
      examTrigger: "«Hvorfor er fluorescens mer sensitiv enn absorpsjon?» — måler mot svart bakgrunn.",
      pitfall: "Kun lineært ved lav c. Ved høy c: indre filtereffekt gir avvik.",
    },
    {
      title: "Fluorescens vs fosforescens",
      formula: "Fluorescens: rask (<10⁻⁵ s), S₁→S₀\nFosforescens: treg (min-timer), T₁→S₀",
      meaning: "Begge er fotoluminescens. Fosforescens involverer spinn-forbudt overgang.",
      trigger: "Når oppgaven ber deg skille mellom fluorescens og fosforescens.",
      examTrigger: "«Hva er forskjellen?» — fluorescens er rask (singlett→singlett), fosforescens er treg (triplett→singlett).",
      pitfall: "Fosforescens krever intersystem crossing (ISC) fra singlett til triplett.",
    },
    {
      title: "AAS: hul katodelampe",
      formula: "Prinsipp: Prøve atomiseres →\nfrie atomer absorberer ved spesifikk λ",
      meaning: "Hul katodelampe sender ut smale linjer ved analyttens bølgelengde. Absorbansen måles.",
      trigger: "Når oppgaven spør om AAS-instrumentering eller strålingskilder.",
      examTrigger: "«Hva er linjebredde og hvorfor brukes hul katodelampe?» — smalere linjer enn analyttens absorpsjon.",
      pitfall: "Én lampe per grunnstoff. Flamme-AAS er enklest, grafittovn er mer sensitivt.",
    },
    {
      title: "ICP-MS",
      formula: "ICP = ionekilde (plasma, 6000-10000 K)\nMS = masseanalysator (m/z)",
      meaning: "Induktivt koblet plasma ioniserer prøven, massespektrometer separerer etter m/z.",
      trigger: "Når oppgaven handler om grunnstoffanalyse med MS eller spør om ionekilde.",
      examTrigger: "«Hvilken ionekilde brukes for grunnstoffanalyse?» → ICP. «Er ICP myk eller hard?» → Hard (V2022 14f sier myk er feil).",
      pitfall: "ICP er en HARD ionekilde (gir kun atomære ioner). Kvadrupol er vanligste masseanalysator.",
    },
    {
      title: "MS-oppløsning",
      formula: "R = m / Δm",
      meaning: "Evnen til massespektrometeret til å skille to nærliggende masser.",
      trigger: "Når du skal vurdere om to ioner kan skilles i massespekteret.",
      examTrigger: "«Koble riktig forbindelse til riktig massespekter» (V2024 oppg. 8d) — bruk m/z-verdier.",
      pitfall: "Magnetsektoranalysator har høyere R enn kvadrupol.",
    },
  ],
};

function FormulaCard({ card, color, isExpanded, onToggle }) {
  return (
    <div
      style={{
        background: "#1E293B",
        borderLeft: `3px solid ${color}`,
        borderRadius: "8px",
        marginBottom: "10px",
        overflow: "hidden",
        transition: "all 0.2s ease",
      }}
    >
      <div
        onClick={onToggle}
        style={{
          padding: "14px 16px",
          cursor: "pointer",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <span
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 700,
              fontSize: "15px",
              color: color,
            }}
          >
            {card.title}
          </span>
          <span
            style={{
              color: "#64748B",
              fontSize: "18px",
              transform: isExpanded ? "rotate(180deg)" : "rotate(0)",
              transition: "transform 0.2s",
              flexShrink: 0,
              marginLeft: "8px",
            }}
          >
            ▾
          </span>
        </div>

        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "13px",
            color: "#E2E8F0",
            whiteSpace: "pre-line",
            lineHeight: 1.5,
            background: "#0F172A",
            padding: "8px 12px",
            borderRadius: "6px",
          }}
        >
          {card.formula}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "6px",
            padding: "6px 10px",
            background: `${color}15`,
            borderRadius: "6px",
            border: `1px solid ${color}30`,
          }}
        >
          <span style={{ fontSize: "13px", flexShrink: 0 }}>🎯</span>
          <span
            style={{
              fontFamily: "'Source Sans 3', sans-serif",
              fontSize: "13px",
              color: "#CBD5E1",
              lineHeight: 1.45,
            }}
          >
            <strong style={{ color: color }}>Bruk når du ser: </strong>
            {card.trigger}
          </span>
        </div>
      </div>

      {isExpanded && (
        <div
          style={{
            padding: "0 16px 14px",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          <div
            style={{
              fontFamily: "'Source Sans 3', sans-serif",
              fontSize: "13px",
              color: "#94A3B8",
              lineHeight: 1.5,
            }}
          >
            <strong style={{ color: "#CBD5E1" }}>Hva den betyr: </strong>
            {card.meaning}
          </div>

          <div
            style={{
              padding: "8px 12px",
              background: "#0F172A",
              borderRadius: "6px",
              borderLeft: `2px solid ${color}60`,
            }}
          >
            <span
              style={{
                fontFamily: "'Source Sans 3', sans-serif",
                fontSize: "13px",
                color: "#94A3B8",
                lineHeight: 1.5,
              }}
            >
              <strong style={{ color: "#CBD5E1" }}>Eksempel-trigger: </strong>
              {card.examTrigger}
            </span>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "6px",
              padding: "6px 10px",
              background: "#EF444415",
              borderRadius: "6px",
              border: "1px solid #EF444430",
            }}
          >
            <span style={{ fontSize: "13px", flexShrink: 0 }}>⚠️</span>
            <span
              style={{
                fontFamily: "'Source Sans 3', sans-serif",
                fontSize: "13px",
                color: "#FCA5A5",
                lineHeight: 1.45,
              }}
            >
              <strong>Vanlige feller: </strong>
              {card.pitfall}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default function FormelKart() {
  const [activeTab, setActiveTab] = useState(1);
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState({});
  const [visited, setVisited] = useState({ 1: true });
  const searchRef = useRef(null);

  useEffect(() => {
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;700;800&family=Source+Sans+3:wght@400;600;700&family=JetBrains+Mono:wght@400;500&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);

  const handleTabClick = (id) => {
    setActiveTab(id);
    setVisited((v) => ({ ...v, [id]: true }));
    setSearch("");
    setExpanded({});
  };

  const toggleCard = (key) => {
    setExpanded((e) => ({ ...e, [key]: !e[key] }));
  };

  const expandAll = () => {
    const cards = FORMULAS[activeTab];
    const allKeys = {};
    cards.forEach((_, i) => { allKeys[`${activeTab}-${i}`] = true; });
    setExpanded((e) => ({ ...e, ...allKeys }));
  };

  const collapseAll = () => {
    const cards = FORMULAS[activeTab];
    const rmKeys = {};
    cards.forEach((_, i) => { rmKeys[`${activeTab}-${i}`] = false; });
    setExpanded((e) => ({ ...e, ...rmKeys }));
  };

  const activeSubject = SUBJECTS.find((s) => s.id === activeTab);
  const filteredCards = FORMULAS[activeTab].filter((card) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      card.title.toLowerCase().includes(q) ||
      card.formula.toLowerCase().includes(q) ||
      card.meaning.toLowerCase().includes(q) ||
      card.trigger.toLowerCase().includes(q) ||
      card.examTrigger.toLowerCase().includes(q) ||
      card.pitfall.toLowerCase().includes(q)
    );
  });

  const visitedCount = Object.keys(visited).length;

  return (
    <div
      style={{
        background: "#0F172A",
        minHeight: "100vh",
        fontFamily: "'Source Sans 3', sans-serif",
        color: "#F8FAFC",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "20px 16px 12px",
          borderBottom: "1px solid #1E293B",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h1
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 800,
                fontSize: "22px",
                margin: 0,
                background: `linear-gradient(135deg, ${activeSubject.color}, #F8FAFC)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Formelkart
            </h1>
            <p style={{ margin: "2px 0 0", fontSize: "13px", color: "#64748B" }}>
              IMAK2004 — Når bruker du hva?
            </p>
          </div>
          <div
            style={{
              background: "#1E293B",
              borderRadius: "20px",
              padding: "4px 12px",
              fontSize: "12px",
              color: "#94A3B8",
              border: "1px solid #334155",
            }}
          >
            {visitedCount}/6 emner besøkt
          </div>
        </div>
      </div>

      {/* Tab bar */}
      <div
        style={{
          display: "flex",
          gap: "4px",
          padding: "10px 12px",
          overflowX: "auto",
          borderBottom: "1px solid #1E293B",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {SUBJECTS.map((s) => (
          <button
            key={s.id}
            onClick={() => handleTabClick(s.id)}
            style={{
              background: activeTab === s.id ? `${s.color}20` : "transparent",
              border: activeTab === s.id ? `1.5px solid ${s.color}` : "1.5px solid #334155",
              borderRadius: "8px",
              padding: "7px 12px",
              color: activeTab === s.id ? s.color : "#64748B",
              fontSize: "12px",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: activeTab === s.id ? 700 : 500,
              cursor: "pointer",
              whiteSpace: "nowrap",
              flexShrink: 0,
              position: "relative",
              transition: "all 0.15s ease",
            }}
          >
            <span style={{ marginRight: "4px" }}>{s.icon}</span>
            {s.name}
            {visited[s.id] && activeTab !== s.id && (
              <span
                style={{
                  position: "absolute",
                  top: "-2px",
                  right: "-2px",
                  width: "7px",
                  height: "7px",
                  borderRadius: "50%",
                  background: s.color,
                }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Search + controls */}
      <div style={{ padding: "10px 16px", display: "flex", gap: "8px", alignItems: "center" }}>
        <div style={{ position: "relative", flex: 1 }}>
          <input
            ref={searchRef}
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Søk i formler, triggere, feller..."
            style={{
              width: "100%",
              padding: "9px 12px 9px 32px",
              background: "#1E293B",
              border: "1px solid #334155",
              borderRadius: "8px",
              color: "#F8FAFC",
              fontSize: "13px",
              fontFamily: "'Source Sans 3', sans-serif",
              outline: "none",
              boxSizing: "border-box",
            }}
          />
          <span
            style={{
              position: "absolute",
              left: "10px",
              top: "50%",
              transform: "translateY(-50%)",
              fontSize: "14px",
              color: "#64748B",
            }}
          >
            🔍
          </span>
        </div>
        <button
          onClick={expandAll}
          style={{
            background: "#1E293B",
            border: "1px solid #334155",
            borderRadius: "6px",
            padding: "8px 10px",
            color: "#94A3B8",
            fontSize: "12px",
            cursor: "pointer",
            whiteSpace: "nowrap",
          }}
        >
          Åpne alle
        </button>
        <button
          onClick={collapseAll}
          style={{
            background: "#1E293B",
            border: "1px solid #334155",
            borderRadius: "6px",
            padding: "8px 10px",
            color: "#94A3B8",
            fontSize: "12px",
            cursor: "pointer",
            whiteSpace: "nowrap",
          }}
        >
          Lukk
        </button>
      </div>

      {/* Subject header */}
      <div
        style={{
          padding: "4px 16px 8px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 700,
            fontSize: "17px",
            color: activeSubject.color,
            margin: 0,
          }}
        >
          {activeSubject.icon} {activeSubject.name}
        </h2>
        <span style={{ fontSize: "12px", color: "#64748B" }}>
          {filteredCards.length} / {FORMULAS[activeTab].length} kort
        </span>
      </div>

      {/* Cards */}
      <div style={{ padding: "0 16px 80px" }}>
        {filteredCards.length === 0 ? (
          <div
            style={{
              padding: "40px 20px",
              textAlign: "center",
              color: "#64748B",
              fontSize: "14px",
            }}
          >
            Ingen treff for «{search}». Prøv et annet søkeord.
          </div>
        ) : (
          filteredCards.map((card, i) => {
            const origIndex = FORMULAS[activeTab].indexOf(card);
            const key = `${activeTab}-${origIndex}`;
            return (
              <FormulaCard
                key={key}
                card={card}
                color={activeSubject.color}
                isExpanded={!!expanded[key]}
                onToggle={() => toggleCard(key)}
              />
            );
          })
        )}
      </div>

      {/* Footer */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          background: "linear-gradient(transparent, #0F172A 30%)",
          padding: "30px 16px 12px",
          textAlign: "center",
        }}
      >
        <span
          style={{
            fontSize: "11px",
            color: "#475569",
            fontFamily: "'JetBrains Mono', monospace",
          }}
        >
          IMAK2004 · Eksamen 21. mai 2026 · Formelark + denne = A
        </span>
      </div>
    </div>
  );
}
