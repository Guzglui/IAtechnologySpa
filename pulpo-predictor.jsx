import { useState, useRef } from "react";

const TEAMS = [
  // CONMEBOL
  { name: "Argentina", flag: "🇦🇷", rating: 92, conf: "CONMEBOL" },
  { name: "Brasil", flag: "🇧🇷", rating: 89, conf: "CONMEBOL" },
  { name: "Colombia", flag: "🇨🇴", rating: 81, conf: "CONMEBOL" },
  { name: "Ecuador", flag: "🇪🇨", rating: 73, conf: "CONMEBOL" },
  { name: "Paraguay", flag: "🇵🇾", rating: 70, conf: "CONMEBOL" },
  { name: "Uruguay", flag: "🇺🇾", rating: 82, conf: "CONMEBOL" },
  // UEFA
  { name: "Alemania", flag: "🇩🇪", rating: 85, conf: "UEFA" },
  { name: "Austria", flag: "🇦🇹", rating: 76, conf: "UEFA" },
  { name: "Bélgica", flag: "🇧🇪", rating: 83, conf: "UEFA" },
  { name: "Bosnia y Herzegovina", flag: "🇧🇦", rating: 70, conf: "UEFA" },
  { name: "Croacia", flag: "🇭🇷", rating: 81, conf: "UEFA" },
  { name: "España", flag: "🇪🇸", rating: 86, conf: "UEFA" },
  { name: "Escocia", flag: "🏴󠁧󠁢󠁳󠁣󠁴󠁿", rating: 72, conf: "UEFA" },
  { name: "Francia", flag: "🇫🇷", rating: 90, conf: "UEFA" },
  { name: "Países Bajos", flag: "🇳🇱", rating: 84, conf: "UEFA" },
  { name: "Noruega", flag: "🇳🇴", rating: 75, conf: "UEFA" },
  { name: "Portugal", flag: "🇵🇹", rating: 85, conf: "UEFA" },
  { name: "Rep. Checa", flag: "🇨🇿", rating: 71, conf: "UEFA" },
  { name: "Suecia", flag: "🇸🇪", rating: 73, conf: "UEFA" },
  { name: "Suiza", flag: "🇨🇭", rating: 78, conf: "UEFA" },
  { name: "Turquía", flag: "🇹🇷", rating: 74, conf: "UEFA" },
  { name: "Inglaterra", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", rating: 87, conf: "UEFA" },
  // CAF
  { name: "Argelia", flag: "🇩🇿", rating: 71, conf: "CAF" },
  { name: "Cabo Verde", flag: "🇨🇻", rating: 65, conf: "CAF" },
  { name: "Costa de Marfil", flag: "🇨🇮", rating: 72, conf: "CAF" },
  { name: "Egipto", flag: "🇪🇬", rating: 73, conf: "CAF" },
  { name: "Ghana", flag: "🇬🇭", rating: 68, conf: "CAF" },
  { name: "Marruecos", flag: "🇲🇦", rating: 79, conf: "CAF" },
  { name: "RD del Congo", flag: "🇨🇩", rating: 66, conf: "CAF" },
  { name: "Senegal", flag: "🇸🇳", rating: 76, conf: "CAF" },
  { name: "Sudáfrica", flag: "🇿🇦", rating: 64, conf: "CAF" },
  { name: "Túnez", flag: "🇹🇳", rating: 67, conf: "CAF" },
  // AFC
  { name: "Arabia Saudita", flag: "🇸🇦", rating: 68, conf: "AFC" },
  { name: "Australia", flag: "🇦🇺", rating: 72, conf: "AFC" },
  { name: "Catar", flag: "🇶🇦", rating: 63, conf: "AFC" },
  { name: "Corea del Sur", flag: "🇰🇷", rating: 74, conf: "AFC" },
  { name: "Irak", flag: "🇮🇶", rating: 65, conf: "AFC" },
  { name: "Irán", flag: "🇮🇷", rating: 70, conf: "AFC" },
  { name: "Japón", flag: "🇯🇵", rating: 77, conf: "AFC" },
  { name: "Jordania", flag: "🇯🇴", rating: 63, conf: "AFC" },
  { name: "Uzbekistán", flag: "🇺🇿", rating: 64, conf: "AFC" },
  // CONCACAF
  { name: "Canadá", flag: "🇨🇦", rating: 76, conf: "CONCACAF" },
  { name: "Curazao", flag: "🇨🇼", rating: 60, conf: "CONCACAF" },
  { name: "Estados Unidos", flag: "🇺🇸", rating: 79, conf: "CONCACAF" },
  { name: "Haití", flag: "🇭🇹", rating: 59, conf: "CONCACAF" },
  { name: "México", flag: "🇲🇽", rating: 78, conf: "CONCACAF" },
  { name: "Panamá", flag: "🇵🇦", rating: 66, conf: "CONCACAF" },
  // OFC/repechaje
  { name: "Nueva Zelanda", flag: "🇳🇿", rating: 62, conf: "OFC" },
  { name: "Surinam", flag: "🇸🇷", rating: 58, conf: "CONCACAF" },
];

const CONFS = ["Todos", "CONMEBOL", "UEFA", "CAF", "AFC", "CONCACAF", "OFC"];

function OctopusSVG({ state }) {
  return (
    <div className={`octopus-wrap${state === "thinking" ? " octo-pulse" : ""}`}>
      <svg viewBox="0 0 200 220" width="170" height="190"
        style={{ filter: state === "thinking" ? "drop-shadow(0 0 18px #7c3aed)" : state === "reveal" ? "drop-shadow(0 0 24px #fbbf24)" : "drop-shadow(0 0 8px #a78bfa)" }}>
        <ellipse cx="100" cy="85" rx="58" ry="62" fill="#7c3aed" />
        <ellipse cx="82" cy="62" rx="22" ry="15" fill="rgba(255,255,255,0.13)" />
        <g className={state === "thinking" ? "tentacles-wave" : ""}>
          <path d="M55 135 Q30 160 25 185 Q22 200 35 195 Q48 190 50 175 Q52 160 60 150" fill="none" stroke="#6d28d9" strokeWidth="14" strokeLinecap="round" />
          <path d="M55 135 Q30 160 25 185 Q22 200 35 195 Q48 190 50 175 Q52 160 60 150" fill="none" stroke="#8b5cf6" strokeWidth="9" strokeLinecap="round" />
          <path d="M68 142 Q52 172 55 200 Q56 215 70 210 Q82 205 78 188 Q74 170 76 158" fill="none" stroke="#6d28d9" strokeWidth="14" strokeLinecap="round" />
          <path d="M68 142 Q52 172 55 200 Q56 215 70 210 Q82 205 78 188 Q74 170 76 158" fill="none" stroke="#8b5cf6" strokeWidth="9" strokeLinecap="round" />
          <path d="M84 148 Q80 180 88 208 Q91 220 104 214 Q114 208 108 192 Q102 175 100 162" fill="none" stroke="#6d28d9" strokeWidth="14" strokeLinecap="round" />
          <path d="M84 148 Q80 180 88 208 Q91 220 104 214 Q114 208 108 192 Q102 175 100 162" fill="none" stroke="#8b5cf6" strokeWidth="9" strokeLinecap="round" />
          <path d="M116 148 Q120 180 112 208 Q109 220 96 214 Q86 208 92 192 Q98 175 100 162" fill="none" stroke="#6d28d9" strokeWidth="14" strokeLinecap="round" />
          <path d="M116 148 Q120 180 112 208 Q109 220 96 214 Q86 208 92 192 Q102 175 100 162" fill="none" stroke="#8b5cf6" strokeWidth="9" strokeLinecap="round" />
          <path d="M132 142 Q148 172 145 200 Q144 215 130 210 Q118 205 122 188 Q126 170 124 158" fill="none" stroke="#6d28d9" strokeWidth="14" strokeLinecap="round" />
          <path d="M132 142 Q148 172 145 200 Q144 215 130 210 Q118 205 122 188 Q126 170 124 158" fill="none" stroke="#8b5cf6" strokeWidth="9" strokeLinecap="round" />
          <path d="M145 135 Q170 160 175 185 Q178 200 165 195 Q152 190 150 175 Q148 160 140 150" fill="none" stroke="#6d28d9" strokeWidth="14" strokeLinecap="round" />
          <path d="M145 135 Q170 160 175 185 Q178 200 165 195 Q152 190 150 175 Q148 160 140 150" fill="none" stroke="#8b5cf6" strokeWidth="9" strokeLinecap="round" />
        </g>
        <ellipse cx="78" cy="80" rx="16" ry="17" fill="white" />
        <ellipse cx="122" cy="80" rx="16" ry="17" fill="white" />
        <ellipse cx={state === "thinking" ? "82" : "78"} cy="82" rx="9" ry="10" fill="#1e1b4b" />
        <ellipse cx={state === "thinking" ? "126" : "122"} cy="82" rx="9" ry="10" fill="#1e1b4b" />
        <ellipse cx={state === "thinking" ? "84" : "80"} cy="79" rx="3" ry="3" fill="white" />
        <ellipse cx={state === "thinking" ? "128" : "124"} cy="79" rx="3" ry="3" fill="white" />
        <ellipse cx="62" cy="98" rx="10" ry="6" fill="rgba(244,114,182,0.35)" />
        <ellipse cx="138" cy="98" rx="10" ry="6" fill="rgba(244,114,182,0.35)" />
        {state === "reveal"
          ? <path d="M84 108 Q100 120 116 108" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" />
          : state === "thinking"
          ? <path d="M88 112 Q100 108 112 112" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" />
          : <path d="M88 110 Q100 116 112 110" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" />}
        {state === "idle" && (
          <g>
            <rect x="64" y="22" width="72" height="8" rx="4" fill="#4c1d95" />
            <rect x="74" y="0" width="52" height="24" rx="8" fill="#5b21b6" />
          </g>
        )}
        {state === "thinking" && (
          <>
            <circle cx="155" cy="40" r="5" fill="rgba(167,139,250,0.6)" className="bubble1" />
            <circle cx="165" cy="25" r="8" fill="rgba(167,139,250,0.5)" className="bubble2" />
            <circle cx="172" cy="8" r="12" fill="rgba(167,139,250,0.4)" className="bubble3" />
          </>
        )}
        {state === "reveal" && (
          <>
            <text x="22" y="50" fontSize="18" className="star1">⭐</text>
            <text x="158" y="40" fontSize="14" className="star2">✨</text>
            <text x="20" y="30" fontSize="10" className="star3">🌟</text>
          </>
        )}
      </svg>
    </div>
  );
}

function TeamPicker({ label, value, onChange, exclude }) {
  const [conf, setConf] = useState("Todos");
  const filtered = TEAMS.filter(t => (conf === "Todos" || t.conf === conf) && t.name !== exclude?.name);

  return (
    <div className="team-col">
      <label>{label}</label>
      <div className="conf-tabs">
        {CONFS.map(c => (
          <button key={c} className={`conf-tab${conf === c ? " active" : ""}`} onClick={() => setConf(c)}>
            {c === "Todos" ? "🌍" : c}
          </button>
        ))}
      </div>
      <div className="team-grid">
        {filtered.map(t => (
          <button
            key={t.name}
            className={`team-btn${value?.name === t.name ? " selected" : ""}`}
            onClick={() => onChange(t)}
            title={t.name}
          >
            <span className="btn-flag">{t.flag}</span>
            <span className="btn-name">{t.name}</span>
          </button>
        ))}
      </div>
      {value && (
        <div className="team-preview">
          <span className="team-flag">{value.flag}</span>
          <div className="team-info">
            <div className="team-name-display">{value.name}</div>
            <div className="team-rating-bar"><div className="team-rating-fill" style={{ width: `${value.rating}%` }} /></div>
            <div className="team-rating-label">Rating: {value.rating}/100 · {value.conf}</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function PulpoPredictor() {
  const [teamA, setTeamA] = useState(null);
  const [teamB, setTeamB] = useState(null);
  const [octoState, setOctoState] = useState("idle");
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [phase, setPhase] = useState("select");
  const [bubbleText, setBubbleText] = useState("");
  const [history, setHistory] = useState([]);
  const intervalRef = useRef(null);

  const thinkingPhrases = [
    "Consultando las profundidades del océano...",
    "Analizando estadísticas místicas...",
    "Comunicándome con los dioses del fútbol...",
    "Estudiando los patrones de las mareas...",
    "El cosmos habla a través de mis tentáculos...",
    "Procesando energías del balón...",
  ];

  async function predict() {
    if (!teamA || !teamB || loading) return;
    setLoading(true);
    setPhase("result");
    setOctoState("thinking");
    setPrediction(null);
    let i = 0;
    setBubbleText(thinkingPhrases[0]);
    intervalRef.current = setInterval(() => {
      i = (i + 1) % thinkingPhrases.length;
      setBubbleText(thinkingPhrases[i]);
    }, 900);

    try {
      const prompt = `Eres el Pulpo Predictor, un pulpo místico con poderes de predicción del fútbol. Predice el resultado de un partido del Mundial 2026 entre ${teamA.name} (${teamA.flag}, rating ${teamA.rating}/100, confederación ${teamA.conf}) y ${teamB.name} (${teamB.flag}, rating ${teamB.rating}/100, confederación ${teamB.conf}).

Responde SOLO con JSON válido, sin markdown ni backticks:
{
  "winner": "nombre exacto del equipo ganador",
  "loser": "nombre exacto del equipo perdedor",
  "score": "marcador ej: 2-1",
  "winnerFlag": "emoji bandera del ganador",
  "loserFlag": "emoji bandera del perdedor",
  "winProbability": numero entre 52 y 84,
  "mysticalReason": "razón mística y divertida de 1-2 oraciones en español en primera persona como el pulpo, con algo específico de esa selección",
  "keyPlayer": "nombre de un jugador clave real del equipo ganador",
  "mood": "certain o confident o surprised o dramatic"
}`;

      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 500,
          messages: [{ role: "user", content: prompt }],
        }),
      });
      const data = await res.json();
      clearInterval(intervalRef.current);
      const raw = data.content?.find(b => b.type === "text")?.text || "{}";
      const result = JSON.parse(raw.replace(/```json|```/g, "").trim());
      setOctoState("reveal");
      setPrediction(result);
      setLoading(false);
      setHistory(h => [{ teamA, teamB, result, id: Date.now() }, ...h.slice(0, 4)]);
    } catch (e) {
      clearInterval(intervalRef.current);
      setLoading(false);
      setOctoState("idle");
      setPrediction({ error: true });
    }
  }

  function reset() {
    setPhase("select");
    setOctoState("idle");
    setPrediction(null);
    setBubbleText("");
    setTeamA(null);
    setTeamB(null);
    clearInterval(intervalRef.current);
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bangers&family=Inter:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #0f0a1e; min-height: 100vh; font-family: 'Inter', sans-serif; color: white; }
        .app { min-height: 100vh; background: radial-gradient(ellipse at 50% 0%, #1e1060 0%, #0f0a1e 60%); display: flex; flex-direction: column; align-items: center; padding: 20px 12px 40px; }
        .header { text-align: center; margin-bottom: 16px; }
        .title { font-family: 'Bangers', cursive; font-size: clamp(2.2rem,7vw,3.6rem); letter-spacing: 3px; background: linear-gradient(135deg,#a78bfa,#fbbf24,#f472b6); -webkit-background-clip: text; -webkit-text-fill-color: transparent; line-height: 1.1; }
        .subtitle { color: #a78bfa; font-size: 0.8rem; margin-top: 3px; letter-spacing: 1.5px; text-transform: uppercase; opacity: 0.8; }
        .world-badge { display: inline-block; background: rgba(251,191,36,0.12); border: 1px solid rgba(251,191,36,0.3); border-radius: 999px; padding: 3px 12px; font-size: 0.72rem; color: #fbbf24; letter-spacing: 1px; margin-top: 6px; }
        @keyframes octoFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes octoPulse { 0%,100%{transform:translateY(-5px) scale(1)} 50%{transform:translateY(-12px) scale(1.04)} }
        .octopus-wrap { animation: octoFloat 3s ease-in-out infinite; display:flex; justify-content:center; }
        .octo-pulse { animation: octoPulse 0.7s ease-in-out infinite !important; }
        @keyframes tentWave { 0%,100%{transform:rotate(0)} 33%{transform:rotate(3deg)} 66%{transform:rotate(-3deg)} }
        .tentacles-wave { animation: tentWave 0.6s ease-in-out infinite; }
        @keyframes bubbleRise { from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:translateY(0)} }
        .bubble1{animation:bubbleRise 0.4s ease 0s both} .bubble2{animation:bubbleRise 0.4s ease 0.15s both} .bubble3{animation:bubbleRise 0.4s ease 0.3s both}
        @keyframes starSpin { 0%{transform:rotate(0)} 100%{transform:rotate(360deg)} }
        .star1{animation:starSpin 2s linear infinite} .star2{animation:starSpin 1.5s linear infinite reverse} .star3{animation:starSpin 3s linear infinite}
        .speech { background: rgba(109,40,217,0.22); border: 1px solid rgba(167,139,250,0.35); border-radius: 14px; padding: 8px 16px; font-size: 0.8rem; color: #c4b5fd; text-align: center; max-width: 280px; margin: 8px auto 16px; min-height: 34px; backdrop-filter: blur(6px); }
        /* TEAM PICKER */
        .select-section { width: 100%; max-width: 900px; }
        .vs-row { display: grid; grid-template-columns: 1fr auto 1fr; gap: 12px; align-items: start; margin-bottom: 20px; }
        .vs-badge { font-family:'Bangers',cursive; font-size:1.8rem; color:#fbbf24; letter-spacing:2px; text-align:center; padding-top:40px; }
        .team-col label { display:block; font-size:0.68rem; letter-spacing:2px; text-transform:uppercase; color:#a78bfa; margin-bottom:6px; text-align:center; }
        .conf-tabs { display:flex; flex-wrap:wrap; gap:4px; margin-bottom:8px; justify-content:center; }
        .conf-tab { background:rgba(255,255,255,0.05); border:1px solid rgba(167,139,250,0.2); border-radius:6px; color:#94a3b8; font-size:0.62rem; padding:3px 7px; cursor:pointer; transition:all 0.15s; white-space:nowrap; }
        .conf-tab.active,.conf-tab:hover { background:rgba(124,58,237,0.3); border-color:#7c3aed; color:white; }
        .team-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(90px,1fr)); gap:5px; max-height:240px; overflow-y:auto; padding-right:2px; margin-bottom:8px; }
        .team-grid::-webkit-scrollbar { width:4px; } .team-grid::-webkit-scrollbar-track { background:rgba(255,255,255,0.04); border-radius:2px; } .team-grid::-webkit-scrollbar-thumb { background:#4c1d95; border-radius:2px; }
        .team-btn { background:rgba(255,255,255,0.04); border:1.5px solid rgba(167,139,250,0.15); border-radius:9px; padding:6px 4px; cursor:pointer; transition:all 0.15s; display:flex; flex-direction:column; align-items:center; gap:3px; }
        .team-btn:hover { background:rgba(124,58,237,0.2); border-color:rgba(124,58,237,0.5); }
        .team-btn.selected { background:rgba(124,58,237,0.35); border-color:#a78bfa; box-shadow:0 0 8px rgba(124,58,237,0.4); }
        .btn-flag { font-size:1.3rem; line-height:1; }
        .btn-name { font-size:0.56rem; color:#c4b5fd; text-align:center; line-height:1.2; }
        .team-preview { background:rgba(255,255,255,0.05); border-radius:10px; padding:8px 12px; display:flex; align-items:center; gap:10px; border:1px solid rgba(167,139,250,0.2); }
        .team-flag { font-size:1.8rem; line-height:1; }
        .team-info { flex:1; }
        .team-name-display { font-weight:700; font-size:0.85rem; }
        .team-rating-bar { height:4px; background:rgba(255,255,255,0.1); border-radius:2px; margin-top:4px; overflow:hidden; }
        .team-rating-fill { height:100%; border-radius:2px; background:linear-gradient(90deg,#7c3aed,#fbbf24); transition:width 0.5s ease; }
        .team-rating-label { font-size:0.65rem; color:#a78bfa; margin-top:2px; }
        .predict-btn { display:block; width:100%; max-width:300px; margin:0 auto; padding:13px 28px; background:linear-gradient(135deg,#7c3aed,#a855f7); border:none; border-radius:14px; color:white; font-family:'Bangers',cursive; font-size:1.35rem; letter-spacing:2px; cursor:pointer; transition:transform 0.15s,box-shadow 0.2s; box-shadow:0 6px 24px rgba(124,58,237,0.5); }
        .predict-btn:hover:not(:disabled) { transform:translateY(-2px); box-shadow:0 10px 32px rgba(124,58,237,0.65); }
        .predict-btn:disabled { opacity:0.4; cursor:not-allowed; }
        @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        .result-card { width:100%; max-width:480px; background:linear-gradient(135deg,rgba(109,40,217,0.2),rgba(251,191,36,0.08)); border:1.5px solid rgba(167,139,250,0.35); border-radius:20px; padding:22px 18px; animation:fadeUp 0.5s ease both; backdrop-filter:blur(10px); }
        .result-header { text-align:center; margin-bottom:16px; }
        .result-label { font-size:0.65rem; letter-spacing:3px; text-transform:uppercase; color:#a78bfa; margin-bottom:5px; }
        .winner-name { font-family:'Bangers',cursive; font-size:clamp(1.8rem,7vw,2.8rem); letter-spacing:2px; background:linear-gradient(135deg,#fbbf24,#f97316); -webkit-background-clip:text; -webkit-text-fill-color:transparent; }
        .winner-flag-big { font-size:2.8rem; display:block; margin-top:3px; }
        .score-badge { display:inline-block; background:rgba(251,191,36,0.15); border:1px solid rgba(251,191,36,0.4); border-radius:999px; padding:3px 16px; font-family:'Bangers',cursive; font-size:1.5rem; letter-spacing:3px; color:#fbbf24; margin:5px 0 12px; }
        .matchup-row { display:flex; justify-content:center; align-items:center; gap:14px; margin-bottom:14px; }
        .matchup-team { text-align:center; flex:1; }
        .matchup-flag { font-size:2.2rem; display:block; }
        .matchup-name { font-size:0.75rem; color:#c4b5fd; margin-top:2px; }
        .matchup-name.winner-label { color:#fbbf24; font-weight:700; }
        .matchup-vs { font-family:'Bangers',cursive; color:#6d40a2; font-size:1.1rem; }
        .prob-bar-wrap { margin-bottom:14px; }
        .prob-labels { display:flex; justify-content:space-between; font-size:0.7rem; color:#a78bfa; margin-bottom:4px; }
        .prob-bar { height:8px; background:rgba(255,255,255,0.08); border-radius:4px; overflow:hidden; }
        .prob-fill { height:100%; background:linear-gradient(90deg,#7c3aed,#fbbf24); border-radius:4px; transition:width 1s ease; }
        .mystical-box { background:rgba(0,0,0,0.25); border-radius:12px; padding:11px 13px; margin-bottom:12px; font-size:0.83rem; color:#e0d7ff; line-height:1.5; border-left:3px solid #7c3aed; }
        .mystical-box strong { color:#a78bfa; }
        .key-player { font-size:0.78rem; color:#94a3b8; text-align:center; }
        .key-player span { color:#fbbf24; font-weight:600; }
        .reset-btn { display:block; width:100%; margin-top:14px; padding:9px; background:rgba(255,255,255,0.05); border:1px solid rgba(167,139,250,0.25); border-radius:10px; color:#a78bfa; font-size:0.82rem; cursor:pointer; transition:background 0.2s; }
        .reset-btn:hover { background:rgba(167,139,250,0.1); }
        .history-section { width:100%; max-width:480px; margin-top:24px; }
        .history-title { font-size:0.65rem; letter-spacing:3px; text-transform:uppercase; color:#6d40a2; margin-bottom:8px; text-align:center; }
        .history-item { display:flex; align-items:center; gap:8px; padding:7px 11px; background:rgba(255,255,255,0.03); border-radius:9px; margin-bottom:5px; font-size:0.77rem; color:#94a3b8; border:1px solid rgba(255,255,255,0.05); flex-wrap:wrap; }
        .history-winner { color:#fbbf24; font-weight:600; }
        .history-score { margin-left:auto; color:#6d40a2; font-family:'Bangers',cursive; font-size:1rem; letter-spacing:1px; }
        .footer { margin-top:28px; text-align:center; font-size:0.68rem; color:#3d2b6b; letter-spacing:1px; }
        @media(max-width:580px){ .vs-row{grid-template-columns:1fr auto 1fr;gap:6px} .vs-badge{font-size:1.3rem;padding-top:32px} .team-grid{max-height:200px} }
      `}</style>
      <div className="app">
        <div className="header">
          <div className="title">🐙 PULPO PREDICTOR</div>
          <div className="subtitle">El oráculo del fútbol mundial</div>
          <div className="world-badge">⚽ MUNDIAL 2026 · 48 SELECCIONES OFICIALES</div>
        </div>

        <OctopusSVG state={octoState} />

        <div className="speech">
          {octoState === "idle" && "¡Selecciona dos equipos del Mundial 2026 y déjame predecir! 🌊"}
          {octoState === "thinking" && bubbleText}
          {octoState === "reveal" && prediction && !prediction.error && `¡He visto el futuro con mis 8 tentáculos! ${prediction.mood === "certain" ? "🔮" : prediction.mood === "dramatic" ? "🌪️" : "⭐"}`}
        </div>

        {phase === "select" && (
          <div className="select-section">
            <div className="vs-row">
              <TeamPicker label="⚽ Equipo 1" value={teamA} onChange={setTeamA} exclude={teamB} />
              <div className="vs-badge">VS</div>
              <TeamPicker label="⚽ Equipo 2" value={teamB} onChange={setTeamB} exclude={teamA} />
            </div>
            <button className="predict-btn" onClick={predict} disabled={!teamA || !teamB || loading}>
              🔮 ¡PREDECIR!
            </button>
          </div>
        )}

        {phase === "result" && loading && (
          <div style={{ textAlign:"center", color:"#a78bfa", marginTop:16, fontSize:"0.85rem", opacity:0.7 }}>
            Mis tentáculos están procesando...
          </div>
        )}

        {phase === "result" && prediction && !loading && !prediction.error && (
          <div className="result-card">
            <div className="result-header">
              <div className="result-label">🏆 Ganador predicho</div>
              <div className="winner-name">{prediction.winner}</div>
              <span className="winner-flag-big">{prediction.winnerFlag}</span>
              <div className="score-badge">{prediction.score}</div>
            </div>
            <div className="matchup-row">
              <div className="matchup-team">
                <span className="matchup-flag">{teamA?.flag}</span>
                <div className={`matchup-name${prediction.winner === teamA?.name ? " winner-label" : ""}`}>{teamA?.name}</div>
              </div>
              <div className="matchup-vs">VS</div>
              <div className="matchup-team">
                <span className="matchup-flag">{teamB?.flag}</span>
                <div className={`matchup-name${prediction.winner === teamB?.name ? " winner-label" : ""}`}>{teamB?.name}</div>
              </div>
            </div>
            <div className="prob-bar-wrap">
              <div className="prob-labels">
                <span>{prediction.winner} {prediction.winProbability}%</span>
                <span>{prediction.loser} {100 - prediction.winProbability}%</span>
              </div>
              <div className="prob-bar"><div className="prob-fill" style={{ width:`${prediction.winProbability}%` }} /></div>
            </div>
            <div className="mystical-box"><strong>🐙 El Pulpo dice:</strong><br />{prediction.mysticalReason}</div>
            <div className="key-player">⚡ Jugador clave: <span>{prediction.keyPlayer}</span></div>
            <button className="reset-btn" onClick={reset}>← Nueva predicción</button>
          </div>
        )}

        {history.length > 0 && (
          <div className="history-section">
            <div className="history-title">📜 Predicciones anteriores</div>
            {history.map(h => (
              <div className="history-item" key={h.id}>
                <span>{h.teamA.flag} {h.teamA.name}</span>
                <span style={{color:"#3d2b6b"}}>vs</span>
                <span>{h.teamB.flag} {h.teamB.name}</span>
                <span className="history-winner">🏆 {h.result.winner}</span>
                <span className="history-score">{h.result.score}</span>
              </div>
            ))}
          </div>
        )}

        <div className="footer">🐙 PULPO PREDICTOR · Mundial 2026 · Powered by Claude AI</div>
      </div>
    </>
  );
}
