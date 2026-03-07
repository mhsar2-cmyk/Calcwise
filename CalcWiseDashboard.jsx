import { useState, useEffect, useRef } from "react";

const COLORS = {
  bg: "#0a0c10",
  surface: "#0f1318",
  card: "#131920",
  border: "#1e2730",
  borderLight: "#243040",
  accent: "#f0b93a",
  accentDim: "rgba(240,185,58,0.12)",
  green: "#22c55e",
  greenDim: "rgba(34,197,94,0.12)",
  red: "#ef4444",
  redDim: "rgba(239,68,68,0.12)",
  blue: "#3b82f6",
  blueDim: "rgba(59,130,246,0.1)",
  text: "#e2e8f0",
  muted: "#64748b",
  mutedLight: "#94a3b8",
};

const assets = [
  { sym: "EUR/USD", price: 1.0842, change: 0.31, bias: "BULL", tf: "4H" },
  { sym: "BTC/USD", price: 84210, change: 2.47, bias: "BULL", tf: "1D" },
  { sym: "GOLD", price: 2914.5, change: -0.18, bias: "BEAR", tf: "4H" },
  { sym: "GBP/USD", price: 1.2641, change: 0.14, bias: "BULL", tf: "1H" },
  { sym: "USD/JPY", price: 148.32, change: -0.09, bias: "NEUT", tf: "4H" },
  { sym: "ETH/USD", price: 3420, change: 3.12, bias: "BULL", tf: "1D" },
];

const recentTrades = [
  { id: 1, pair: "EUR/USD", dir: "LONG", entry: 1.0798, exit: 1.0865, sl: 1.0764, tp: 1.0872, rr: 2.0, result: "WIN", pnl: +134, date: "Mar 06" },
  { id: 2, pair: "GOLD", dir: "SHORT", entry: 2934, exit: 2901, sl: 2950, tp: 2895, rr: 2.4, result: "WIN", pnl: +330, date: "Mar 05" },
  { id: 3, pair: "BTC/USD", dir: "LONG", entry: 82100, exit: 81200, sl: 81000, tp: 84500, rr: 2.0, result: "LOSS", pnl: -150, date: "Mar 04" },
  { id: 4, pair: "GBP/USD", dir: "LONG", entry: 1.2580, exit: 1.2641, sl: 1.2545, tp: 1.2650, rr: 2.0, result: "WIN", pnl: +183, date: "Mar 03" },
  { id: 5, pair: "USD/JPY", dir: "SHORT", entry: 149.80, exit: 148.40, sl: 150.40, tp: 148.00, rr: 3.0, result: "WIN", pnl: +210, date: "Mar 02" },
];

const signals = [
  { pair: "EUR/USD", tf: "4H", type: "BOS", bias: "BULL", conf: 87, entry: "1.0798–1.0810", sl: "1.0764", tp: "1.0910" },
  { pair: "BTC/USD", tf: "1D", type: "FVG", bias: "BULL", conf: 79, entry: "82,800–83,200", sl: "81,500", tp: "87,000" },
  { pair: "GOLD", tf: "4H", type: "OB", bias: "BEAR", conf: 72, entry: "2,930–2,940", sl: "2,960", tp: "2,880" },
  { pair: "GBP/JPY", tf: "1H", type: "SWEEP", bias: "BULL", conf: 65, entry: "188.20–188.50", sl: "187.60", tp: "190.10" },
];

// Mini sparkline component
function Sparkline({ data, color }) {
  const w = 80, h = 32;
  const min = Math.min(...data), max = Math.max(...data);
  const range = max - min || 1;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / range) * (h - 4) - 2;
    return `${x},${y}`;
  }).join(" ");
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{ display: "block" }}>
      <polyline points={pts} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Animated counter
function AnimCounter({ target, prefix = "", suffix = "", decimals = 0 }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = target / 40;
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setVal(target); clearInterval(timer); }
      else setVal(start);
    }, 18);
    return () => clearInterval(timer);
  }, [target]);
  return <span>{prefix}{val.toFixed(decimals)}{suffix}</span>;
}

// Position size calculator state
function useCalc() {
  const [balance, setBalance] = useState("10000");
  const [risk, setRisk] = useState("1.5");
  const [entry, setEntry] = useState("1.08420");
  const [sl, setSl] = useState("1.07980");
  const [tp, setTp] = useState("1.09300");

  const riskAmt = (parseFloat(balance) * parseFloat(risk)) / 100;
  const pips = Math.abs(parseFloat(entry) - parseFloat(sl));
  const pipsTp = Math.abs(parseFloat(tp) - parseFloat(entry));
  const lotSize = pips > 0 ? (riskAmt / (pips * 100000)).toFixed(2) : "0.00";
  const rr = pips > 0 ? (pipsTp / pips).toFixed(1) : "0.0";

  return { balance, setBalance, risk, setRisk, entry, setEntry, sl, setSl, tp, setTp, riskAmt, lotSize, rr, pips };
}

const navItems = [
  { id: "overview", label: "Overview", icon: "◈" },
  { id: "calculator", label: "Calculator", icon: "⊞" },
  { id: "signals", label: "Signals", icon: "◎" },
  { id: "journal", label: "Journal", icon: "≡" },
  { id: "scanner", label: "Scanner", icon: "⊡" },
];

// Equity curve data (last 30 days)
const equityData = [9200, 9150, 9300, 9450, 9400, 9600, 9750, 9700, 9850, 9900, 9800, 10050, 10200, 10150, 10300, 10450, 10400, 10600, 10550, 10700, 10800, 10750, 10900, 11050, 11000, 11150, 11300, 11250, 11400, 11540];

export default function CalcWiseDashboard() {
  const [active, setActive] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const calc = useCalc();

  const styles = {
    root: {
      display: "flex",
      height: "100vh",
      background: COLORS.bg,
      fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
      color: COLORS.text,
      overflow: "hidden",
    },
    sidebar: {
      width: sidebarOpen ? 220 : 64,
      background: COLORS.surface,
      borderRight: `1px solid ${COLORS.border}`,
      display: "flex",
      flexDirection: "column",
      transition: "width 0.25s cubic-bezier(.4,0,.2,1)",
      overflow: "hidden",
      flexShrink: 0,
    },
    sidebarTop: {
      padding: "1.2rem 1rem",
      borderBottom: `1px solid ${COLORS.border}`,
      display: "flex",
      alignItems: "center",
      gap: "0.7rem",
      cursor: "pointer",
    },
    logoText: {
      fontWeight: 800,
      fontSize: "1.1rem",
      letterSpacing: "-0.5px",
      whiteSpace: "nowrap",
      opacity: sidebarOpen ? 1 : 0,
      transition: "opacity 0.2s",
    },
    nav: {
      flex: 1,
      padding: "1rem 0.6rem",
      display: "flex",
      flexDirection: "column",
      gap: "0.2rem",
    },
    navItem: (id) => ({
      display: "flex",
      alignItems: "center",
      gap: "0.75rem",
      padding: "0.65rem 0.7rem",
      borderRadius: "8px",
      cursor: "pointer",
      transition: "all 0.15s",
      background: active === id ? COLORS.accentDim : "transparent",
      color: active === id ? COLORS.accent : COLORS.muted,
      fontWeight: active === id ? 600 : 400,
      fontSize: "0.88rem",
      whiteSpace: "nowrap",
      overflow: "hidden",
    }),
    navIcon: {
      fontSize: "1rem",
      flexShrink: 0,
      width: 20,
      textAlign: "center",
    },
    navLabel: {
      opacity: sidebarOpen ? 1 : 0,
      transition: "opacity 0.15s",
    },
    sidebarBottom: {
      padding: "1rem 0.8rem",
      borderTop: `1px solid ${COLORS.border}`,
    },
    userRow: {
      display: "flex",
      alignItems: "center",
      gap: "0.7rem",
      padding: "0.5rem 0.3rem",
      overflow: "hidden",
    },
    avatar: {
      width: 32, height: 32,
      borderRadius: "50%",
      background: `linear-gradient(135deg, ${COLORS.accent}, #e07b20)`,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: "0.75rem", fontWeight: 800, color: "#fff",
      flexShrink: 0,
    },
    main: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
    },
    topbar: {
      height: 56,
      background: COLORS.surface,
      borderBottom: `1px solid ${COLORS.border}`,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 1.5rem",
      flexShrink: 0,
    },
    content: {
      flex: 1,
      overflowY: "auto",
      padding: "1.5rem",
    },
    card: {
      background: COLORS.card,
      border: `1px solid ${COLORS.border}`,
      borderRadius: 12,
      padding: "1.25rem",
    },
    label: {
      fontSize: "0.72rem",
      color: COLORS.muted,
      letterSpacing: "1.5px",
      textTransform: "uppercase",
      fontWeight: 500,
      marginBottom: "0.4rem",
    },
    input: {
      width: "100%",
      background: COLORS.surface,
      border: `1px solid ${COLORS.border}`,
      borderRadius: 6,
      padding: "0.55rem 0.75rem",
      color: COLORS.text,
      fontSize: "0.88rem",
      outline: "none",
      fontFamily: "'JetBrains Mono', monospace",
      transition: "border-color 0.15s",
    },
  };

  const renderOverview = () => (
    <div>
      {/* KPI Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem", marginBottom: "1.25rem" }}>
        {[
          { label: "Account Balance", val: 11540, prefix: "$", decimals: 0, change: "+$340 today", up: true },
          { label: "Total P&L (Month)", val: 707, prefix: "+$", decimals: 0, change: "7.07% growth", up: true },
          { label: "Win Rate", val: 80, suffix: "%", decimals: 0, change: "4 of 5 trades", up: true },
          { label: "Avg Risk/Reward", val: 2.3, prefix: "", suffix: "x", decimals: 1, change: "This month", up: true },
        ].map((k, i) => (
          <div key={i} style={{ ...styles.card, position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: i === 2 ? COLORS.green : COLORS.accent, borderRadius: "12px 12px 0 0" }} />
            <div style={styles.label}>{k.label}</div>
            <div style={{ fontSize: "1.7rem", fontWeight: 800, letterSpacing: "-1px", color: COLORS.text, fontFamily: "'DM Sans', sans-serif" }}>
              <AnimCounter target={k.val} prefix={k.prefix} suffix={k.suffix} decimals={k.decimals} />
            </div>
            <div style={{ fontSize: "0.75rem", color: k.up ? COLORS.green : COLORS.red, marginTop: "0.3rem" }}>↑ {k.change}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: "1rem", marginBottom: "1.25rem" }}>
        {/* Equity Curve */}
        <div style={styles.card}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
            <div>
              <div style={styles.label}>Equity Curve</div>
              <div style={{ fontSize: "1.4rem", fontWeight: 800, color: COLORS.green }}>$11,540</div>
            </div>
            <div style={{ display: "flex", gap: "0.4rem" }}>
              {["1W", "1M", "3M"].map(t => (
                <button key={t} style={{ padding: "0.25rem 0.6rem", background: t === "1M" ? COLORS.accentDim : "transparent", border: `1px solid ${t === "1M" ? COLORS.accent : COLORS.border}`, borderRadius: 4, color: t === "1M" ? COLORS.accent : COLORS.muted, fontSize: "0.7rem", cursor: "pointer" }}>{t}</button>
              ))}
            </div>
          </div>
          <svg width="100%" height="120" viewBox="0 0 400 120" preserveAspectRatio="none" style={{ display: "block" }}>
            <defs>
              <linearGradient id="eq" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={COLORS.green} stopOpacity="0.2" />
                <stop offset="100%" stopColor={COLORS.green} stopOpacity="0" />
              </linearGradient>
            </defs>
            {(() => {
              const min = Math.min(...equityData), max = Math.max(...equityData);
              const range = max - min;
              const pts = equityData.map((v, i) => {
                const x = (i / (equityData.length - 1)) * 400;
                const y = 110 - ((v - min) / range) * 100;
                return `${x},${y}`;
              });
              const areaPath = `M ${pts[0]} ${pts.slice(1).map(p => `L ${p}`).join(" ")} L 400,120 L 0,120 Z`;
              const linePath = `M ${pts[0]} ${pts.slice(1).map(p => `L ${p}`).join(" ")}`;
              return (
                <>
                  <path d={areaPath} fill="url(#eq)" />
                  <path d={linePath} fill="none" stroke={COLORS.green} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </>
              );
            })()}
          </svg>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "0.5rem" }}>
            {["Mar 1", "Mar 8", "Mar 15", "Mar 22", "Mar 7"].map((d, i) => (
              <span key={i} style={{ fontSize: "0.65rem", color: COLORS.muted, fontFamily: "monospace" }}>{d}</span>
            ))}
          </div>
        </div>

        {/* Market Bias */}
        <div style={styles.card}>
          <div style={styles.label}>Market Bias Today</div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", marginTop: "0.5rem" }}>
            {assets.slice(0, 5).map((a, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.6rem", padding: "0.5rem 0.6rem", background: COLORS.surface, borderRadius: 7, border: `1px solid ${COLORS.border}` }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: "0.82rem", fontWeight: 600 }}>{a.sym}</div>
                  <div style={{ fontSize: "0.68rem", color: COLORS.muted, fontFamily: "monospace" }}>{a.change > 0 ? "+" : ""}{a.change}%</div>
                </div>
                <Sparkline data={equityData.slice(i * 4, i * 4 + 8)} color={a.change >= 0 ? COLORS.green : COLORS.red} />
                <span style={{
                  fontSize: "0.62rem", fontWeight: 700, padding: "0.2rem 0.5rem", borderRadius: 4, fontFamily: "monospace", letterSpacing: 1,
                  background: a.bias === "BULL" ? COLORS.greenDim : a.bias === "BEAR" ? COLORS.redDim : COLORS.accentDim,
                  color: a.bias === "BULL" ? COLORS.green : a.bias === "BEAR" ? COLORS.red : COLORS.accent,
                  border: `1px solid ${a.bias === "BULL" ? "rgba(34,197,94,0.25)" : a.bias === "BEAR" ? "rgba(239,68,68,0.25)" : "rgba(240,185,58,0.25)"}`,
                }}>{a.bias}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Trades */}
      <div style={styles.card}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
          <div style={styles.label}>Recent Trades</div>
          <button style={{ fontSize: "0.75rem", color: COLORS.accent, background: "none", border: "none", cursor: "pointer" }}>View All →</button>
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${COLORS.border}` }}>
              {["Pair", "Dir", "Entry", "Exit", "SL", "TP", "R:R", "P&L", "Date"].map(h => (
                <th key={h} style={{ textAlign: "left", padding: "0.4rem 0.6rem", fontSize: "0.65rem", color: COLORS.muted, fontWeight: 500, letterSpacing: "1.5px", textTransform: "uppercase" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {recentTrades.map((t, i) => (
              <tr key={t.id} style={{ borderBottom: `1px solid ${COLORS.border}`, transition: "background 0.15s" }}
                onMouseEnter={e => e.currentTarget.style.background = COLORS.surface}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                <td style={{ padding: "0.65rem 0.6rem", fontWeight: 600, fontSize: "0.85rem" }}>{t.pair}</td>
                <td style={{ padding: "0.65rem 0.6rem" }}>
                  <span style={{ fontSize: "0.7rem", fontWeight: 700, padding: "0.2rem 0.5rem", borderRadius: 4, background: t.dir === "LONG" ? COLORS.greenDim : COLORS.redDim, color: t.dir === "LONG" ? COLORS.green : COLORS.red, fontFamily: "monospace" }}>{t.dir}</span>
                </td>
                <td style={{ padding: "0.65rem 0.6rem", fontFamily: "monospace", fontSize: "0.8rem", color: COLORS.mutedLight }}>{t.entry}</td>
                <td style={{ padding: "0.65rem 0.6rem", fontFamily: "monospace", fontSize: "0.8rem" }}>{t.exit}</td>
                <td style={{ padding: "0.65rem 0.6rem", fontFamily: "monospace", fontSize: "0.8rem", color: COLORS.red }}>{t.sl}</td>
                <td style={{ padding: "0.65rem 0.6rem", fontFamily: "monospace", fontSize: "0.8rem", color: COLORS.green }}>{t.tp}</td>
                <td style={{ padding: "0.65rem 0.6rem", fontFamily: "monospace", fontSize: "0.8rem", color: COLORS.accent }}>{t.rr}x</td>
                <td style={{ padding: "0.65rem 0.6rem", fontFamily: "monospace", fontSize: "0.85rem", fontWeight: 700, color: t.pnl > 0 ? COLORS.green : COLORS.red }}>
                  {t.pnl > 0 ? "+" : ""}${t.pnl}
                </td>
                <td style={{ padding: "0.65rem 0.6rem", fontSize: "0.75rem", color: COLORS.muted }}>{t.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderCalculator = () => (
    <div style={{ display: "grid", gridTemplateColumns: "420px 1fr", gap: "1.25rem" }}>
      <div>
        <div style={{ ...styles.card, marginBottom: "1rem" }}>
          <div style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "1.2rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span style={{ color: COLORS.accent }}>⊞</span> Position Size Calculator
          </div>
          {[
            { label: "Account Balance ($)", val: calc.balance, set: calc.setBalance },
            { label: "Risk per Trade (%)", val: calc.risk, set: calc.setRisk },
            { label: "Entry Price", val: calc.entry, set: calc.setEntry },
            { label: "Stop Loss Price", val: calc.sl, set: calc.setSl },
            { label: "Take Profit Price", val: calc.tp, set: calc.setTp },
          ].map((f, i) => (
            <div key={i} style={{ marginBottom: "0.9rem" }}>
              <div style={styles.label}>{f.label}</div>
              <input
                value={f.val}
                onChange={e => f.set(e.target.value)}
                style={styles.input}
                onFocus={e => e.target.style.borderColor = COLORS.accent}
                onBlur={e => e.target.style.borderColor = COLORS.border}
              />
            </div>
          ))}
        </div>

        {/* Result Panel */}
        <div style={{ ...styles.card, background: "linear-gradient(135deg, #0d1f14, #0a1510)", border: `1px solid rgba(34,197,94,0.25)` }}>
          <div style={styles.label}>Calculation Result</div>
          <div style={{ fontSize: "2.8rem", fontWeight: 800, color: COLORS.green, letterSpacing: "-1.5px", lineHeight: 1, marginBottom: "0.3rem" }}>
            {calc.lotSize} <span style={{ fontSize: "1rem", color: COLORS.mutedLight, fontWeight: 400 }}>lots</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.6rem", marginTop: "1rem" }}>
            {[
              { l: "$ At Risk", v: `$${isNaN(calc.riskAmt) ? "0" : calc.riskAmt.toFixed(2)}`, c: COLORS.red },
              { l: "Risk:Reward", v: `${calc.rr}x`, c: COLORS.accent },
              { l: "Stop (pips)", v: isNaN(calc.pips) ? "0" : (calc.pips * 10000).toFixed(0), c: COLORS.mutedLight },
              { l: "Potential Profit", v: `$${isNaN(calc.riskAmt) ? "0" : (calc.riskAmt * parseFloat(calc.rr)).toFixed(2)}`, c: COLORS.green },
            ].map((r, i) => (
              <div key={i} style={{ background: "rgba(0,0,0,0.3)", borderRadius: 8, padding: "0.6rem 0.8rem" }}>
                <div style={{ fontSize: "0.65rem", color: COLORS.muted, letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "0.2rem" }}>{r.l}</div>
                <div style={{ fontSize: "1rem", fontWeight: 700, color: r.c, fontFamily: "monospace" }}>{r.v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Risk Stats */}
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <div style={styles.card}>
          <div style={styles.label}>Risk Distribution This Month</div>
          <div style={{ marginTop: "1rem" }}>
            {[
              { pair: "EUR/USD", risk: 1.5, trades: 3, pnl: +317 },
              { pair: "GOLD", risk: 1.0, trades: 2, pnl: +330 },
              { pair: "BTC/USD", risk: 1.5, trades: 1, pnl: -150 },
              { pair: "GBP/USD", risk: 1.0, trades: 2, pnl: +183 },
              { pair: "USD/JPY", risk: 1.0, trades: 1, pnl: +210 },
            ].map((r, i) => (
              <div key={i} style={{ marginBottom: "0.9rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.3rem" }}>
                  <span style={{ fontSize: "0.85rem", fontWeight: 600 }}>{r.pair}</span>
                  <div style={{ display: "flex", gap: "1rem" }}>
                    <span style={{ fontSize: "0.75rem", color: COLORS.muted, fontFamily: "monospace" }}>{r.risk}% risk · {r.trades} trades</span>
                    <span style={{ fontSize: "0.8rem", fontWeight: 700, fontFamily: "monospace", color: r.pnl >= 0 ? COLORS.green : COLORS.red }}>{r.pnl >= 0 ? "+" : ""}${r.pnl}</span>
                  </div>
                </div>
                <div style={{ height: 5, background: COLORS.border, borderRadius: 3, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${r.risk * 40}%`, background: r.pnl >= 0 ? COLORS.green : COLORS.red, borderRadius: 3, transition: "width 1s ease" }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={styles.card}>
          <div style={styles.label}>R:R Distribution</div>
          <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.8rem", alignItems: "flex-end", height: 80 }}>
            {[1.0, 1.5, 2.0, 2.5, 3.0, 3.5].map((rr, i) => {
              const h = [20, 35, 65, 80, 55, 30][i];
              return (
                <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "0.3rem" }}>
                  <div style={{ width: "100%", height: h, background: COLORS.accent, borderRadius: "3px 3px 0 0", opacity: 0.7, transition: "opacity 0.2s", cursor: "pointer" }}
                    onMouseEnter={e => e.target.style.opacity = 1}
                    onMouseLeave={e => e.target.style.opacity = 0.7} />
                  <span style={{ fontSize: "0.6rem", color: COLORS.muted, fontFamily: "monospace" }}>{rr}x</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );

  const renderSignals = () => (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1rem", marginBottom: "1.25rem" }}>
        {signals.map((s, i) => (
          <div key={i} style={{ ...styles.card, borderLeft: `3px solid ${s.bias === "BULL" ? COLORS.green : COLORS.red}`, position: "relative" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.8rem" }}>
              <div>
                <div style={{ fontSize: "1.1rem", fontWeight: 800, marginBottom: "0.2rem" }}>{s.pair}</div>
                <div style={{ display: "flex", gap: "0.4rem", alignItems: "center" }}>
                  <span style={{ fontSize: "0.65rem", fontFamily: "monospace", color: COLORS.muted, background: COLORS.surface, padding: "0.15rem 0.4rem", borderRadius: 3, border: `1px solid ${COLORS.border}` }}>{s.tf}</span>
                  <span style={{ fontSize: "0.65rem", fontFamily: "monospace", color: COLORS.accent, background: COLORS.accentDim, padding: "0.15rem 0.4rem", borderRadius: 3, border: `1px solid rgba(240,185,58,0.2)` }}>{s.type}</span>
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: "1.4rem", fontWeight: 800, color: COLORS.accent, fontFamily: "monospace" }}>{s.conf}<span style={{ fontSize: "0.8rem", color: COLORS.muted }}>%</span></div>
                <div style={{ fontSize: "0.65rem", color: COLORS.muted }}>confidence</div>
              </div>
            </div>
            <div style={{ height: 4, background: COLORS.border, borderRadius: 2, marginBottom: "0.8rem", overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${s.conf}%`, background: `linear-gradient(90deg, ${s.bias === "BULL" ? COLORS.green : COLORS.red}, ${COLORS.accent})`, borderRadius: 2 }} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.5rem" }}>
              {[["Entry", s.entry, COLORS.text], ["Stop Loss", s.sl, COLORS.red], ["Take Profit", s.tp, COLORS.green]].map(([lbl, val, col]) => (
                <div key={lbl} style={{ background: COLORS.surface, padding: "0.5rem 0.6rem", borderRadius: 6, border: `1px solid ${COLORS.border}` }}>
                  <div style={{ fontSize: "0.6rem", color: COLORS.muted, letterSpacing: "1px", textTransform: "uppercase", marginBottom: "0.2rem" }}>{lbl}</div>
                  <div style={{ fontSize: "0.75rem", fontFamily: "monospace", fontWeight: 600, color: col }}>{val}</div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: "0.8rem", display: "flex", gap: "0.5rem" }}>
              <button style={{ flex: 1, padding: "0.5rem", background: s.bias === "BULL" ? COLORS.greenDim : COLORS.redDim, border: `1px solid ${s.bias === "BULL" ? "rgba(34,197,94,0.3)" : "rgba(239,68,68,0.3)"}`, borderRadius: 6, color: s.bias === "BULL" ? COLORS.green : COLORS.red, fontSize: "0.75rem", fontWeight: 700, cursor: "pointer", fontFamily: "monospace", letterSpacing: 1 }}>
                {s.bias === "BULL" ? "↑ GO LONG" : "↓ GO SHORT"}
              </button>
              <button style={{ padding: "0.5rem 0.8rem", background: "transparent", border: `1px solid ${COLORS.border}`, borderRadius: 6, color: COLORS.muted, fontSize: "0.75rem", cursor: "pointer" }}>Save</button>
            </div>
          </div>
        ))}
      </div>

      <div style={styles.card}>
        <div style={styles.label}>Scanner — All Active Setups</div>
        <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.8rem", marginBottom: "1rem", flexWrap: "wrap" }}>
          {["All", "BOS", "FVG", "OB", "SWEEP", "MTF ALIGN"].map(f => (
            <button key={f} style={{ padding: "0.3rem 0.7rem", background: f === "All" ? COLORS.accent : "transparent", border: `1px solid ${f === "All" ? COLORS.accent : COLORS.border}`, borderRadius: 4, color: f === "All" ? "#000" : COLORS.muted, fontSize: "0.7rem", cursor: "pointer", fontWeight: f === "All" ? 700 : 400, fontFamily: "monospace", letterSpacing: 1 }}>{f}</button>
          ))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "0.5rem" }}>
          {[...assets, ...assets.slice(0, 2)].map((a, i) => (
            <div key={i} style={{ padding: "0.7rem 0.8rem", background: COLORS.surface, borderRadius: 7, border: `1px solid ${COLORS.border}`, cursor: "pointer", transition: "border-color 0.15s" }}
              onMouseEnter={e => e.currentTarget.style.borderColor = COLORS.accent}
              onMouseLeave={e => e.currentTarget.style.borderColor = COLORS.border}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.3rem" }}>
                <span style={{ fontSize: "0.82rem", fontWeight: 700 }}>{a.sym}</span>
                <span style={{ fontSize: "0.6rem", color: a.change >= 0 ? COLORS.green : COLORS.red, fontFamily: "monospace" }}>{a.change >= 0 ? "+" : ""}{a.change}%</span>
              </div>
              <div style={{ fontSize: "0.7rem", color: COLORS.muted, fontFamily: "monospace" }}>{a.tf} · {a.bias} bias</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderJournal = () => (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem", marginBottom: "1.25rem" }}>
        {[
          { l: "Total Trades", v: "5", sub: "This month" },
          { l: "Win Rate", v: "80%", sub: "4W / 1L" },
          { l: "Profit Factor", v: "4.2x", sub: "Wins / Losses" },
          { l: "Avg R:R Taken", v: "2.28x", sub: "vs 2.0x planned" },
        ].map((s, i) => (
          <div key={i} style={{ ...styles.card }}>
            <div style={styles.label}>{s.l}</div>
            <div style={{ fontSize: "1.8rem", fontWeight: 800, letterSpacing: "-0.5px", color: i === 0 ? COLORS.text : COLORS.accent }}>{s.v}</div>
            <div style={{ fontSize: "0.72rem", color: COLORS.muted, marginTop: "0.2rem" }}>{s.sub}</div>
          </div>
        ))}
      </div>

      <div style={{ ...styles.card, marginBottom: "1rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
          <div style={styles.label}>Trade Log</div>
          <button style={{ padding: "0.4rem 1rem", background: COLORS.accent, border: "none", borderRadius: 6, color: "#000", fontSize: "0.78rem", fontWeight: 700, cursor: "pointer" }}>+ Log Trade</button>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
          {recentTrades.map((t, i) => (
            <div key={t.id} style={{ display: "flex", alignItems: "center", gap: "1rem", padding: "0.75rem 1rem", background: COLORS.surface, borderRadius: 8, border: `1px solid ${COLORS.border}`, cursor: "pointer" }}
              onMouseEnter={e => e.currentTarget.style.borderColor = COLORS.borderLight}
              onMouseLeave={e => e.currentTarget.style.borderColor = COLORS.border}>
              <div style={{ width: 36, height: 36, borderRadius: 8, background: t.result === "WIN" ? COLORS.greenDim : COLORS.redDim, border: `1px solid ${t.result === "WIN" ? "rgba(34,197,94,0.3)" : "rgba(239,68,68,0.3)"}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem" }}>
                {t.result === "WIN" ? "✓" : "✗"}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <span style={{ fontWeight: 700, fontSize: "0.9rem" }}>{t.pair}</span>
                  <span style={{ fontSize: "0.65rem", fontFamily: "monospace", color: t.dir === "LONG" ? COLORS.green : COLORS.red, background: t.dir === "LONG" ? COLORS.greenDim : COLORS.redDim, padding: "0.1rem 0.4rem", borderRadius: 3 }}>{t.dir}</span>
                </div>
                <div style={{ fontSize: "0.73rem", color: COLORS.muted, fontFamily: "monospace", marginTop: "0.1rem" }}>Entry: {t.entry} → Exit: {t.exit} · RR: {t.rr}x</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontFamily: "monospace", fontWeight: 700, color: t.pnl >= 0 ? COLORS.green : COLORS.red, fontSize: "0.95rem" }}>{t.pnl >= 0 ? "+" : ""}${t.pnl}</div>
                <div style={{ fontSize: "0.68rem", color: COLORS.muted }}>{t.date}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Insights */}
      <div style={{ ...styles.card, background: "linear-gradient(135deg, #0d1520, #0a1018)", border: `1px solid ${COLORS.blue}33` }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1rem" }}>
          <div style={{ width: 28, height: 28, borderRadius: "50%", background: COLORS.blueDim, border: `1px solid ${COLORS.blue}55`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.8rem" }}>✦</div>
          <div style={{ fontSize: "0.88rem", fontWeight: 700, color: COLORS.blue }}>CalcWise AI — Journal Insights</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.7rem" }}>
          {[
            { icon: "↑", color: COLORS.green, text: "Your win rate is 80% — above average. Most wins come from 4H timeframe setups." },
            { icon: "⚡", color: COLORS.accent, text: "Your best R:R trades have been on GOLD and USD/JPY. Consider allocating more to these pairs." },
            { icon: "⚠", color: COLORS.red, text: "BTC/USD is your only losing pair this month. Review your entries — they may be too early before confirmation." },
          ].map((ins, i) => (
            <div key={i} style={{ display: "flex", gap: "0.75rem", padding: "0.75rem", background: "rgba(0,0,0,0.2)", borderRadius: 8 }}>
              <span style={{ color: ins.color, fontWeight: 700, flexShrink: 0 }}>{ins.icon}</span>
              <p style={{ fontSize: "0.85rem", color: COLORS.mutedLight, lineHeight: 1.55 }}>{ins.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const pageMap = { overview: renderOverview, calculator: renderCalculator, signals: renderSignals, journal: renderJournal };

  return (
    <div style={styles.root}>
      {/* SIDEBAR */}
      <div style={styles.sidebar}>
        <div style={styles.sidebarTop} onClick={() => setSidebarOpen(v => !v)}>
          <div style={{ width: 28, height: 28, borderRadius: 7, background: COLORS.accent, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.85rem", fontWeight: 800, color: "#000", flexShrink: 0 }}>C</div>
          <div style={styles.logoText}>Calc<span style={{ color: COLORS.accent }}>Wise</span></div>
        </div>

        <nav style={styles.nav}>
          {navItems.map(item => (
            <div key={item.id} style={styles.navItem(item.id)} onClick={() => setActive(item.id)}>
              <span style={styles.navIcon}>{item.icon}</span>
              <span style={styles.navLabel}>{item.label}</span>
            </div>
          ))}
        </nav>

        <div style={styles.sidebarBottom}>
          <div style={styles.userRow}>
            <div style={styles.avatar}>YA</div>
            {sidebarOpen && (
              <div style={{ overflow: "hidden" }}>
                <div style={{ fontSize: "0.82rem", fontWeight: 600, whiteSpace: "nowrap" }}>Your Account</div>
                <div style={{ fontSize: "0.68rem", color: COLORS.accent, whiteSpace: "nowrap" }}>Pro Plan</div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* MAIN */}
      <div style={styles.main}>
        {/* TOPBAR */}
        <div style={styles.topbar}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span style={{ fontSize: "0.7rem", color: COLORS.muted, fontFamily: "monospace", letterSpacing: "1.5px", textTransform: "uppercase" }}>
              {navItems.find(n => n.id === active)?.label}
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.75rem", color: COLORS.green, background: COLORS.greenDim, padding: "0.3rem 0.7rem", borderRadius: 20, border: "1px solid rgba(34,197,94,0.2)" }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: COLORS.green, display: "inline-block", animation: "ping 1.5s ease-in-out infinite" }} />
              Markets Live
            </div>
            <div style={{ width: 32, height: 32, borderRadius: "50%", background: COLORS.accentDim, border: `1px solid ${COLORS.border}`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: "0.8rem" }}>🔔</div>
            <div style={styles.avatar}>YA</div>
          </div>
        </div>

        {/* CONTENT */}
        <div style={styles.content}>
          {(pageMap[active] || renderOverview)()}
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap');
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; height: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #1e2730; border-radius: 2px; }
        @keyframes ping { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
        button { font-family: inherit; }
        input { font-family: 'JetBrains Mono', monospace; }
      `}</style>
    </div>
  );
}
