import { useState, useEffect } from "react";
import { sheetsRead, sheetsAppend, SHEETS_CONFIG } from "./sheetsConfig";

const STYLE = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Mono:wght@300;400;500&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --bg:#07090f; --surface:#0d1117; --card:#111820; --border:#1e2d3d;
    --amber:#f6a623; --green:#22d3a5; --red:#ff4d6a; --blue:#4fa3e0;
    --muted:#4a5568; --text:#cdd9e5; --heading:#e6edf3;
  }
  body { background:var(--bg); font-family:'DM Mono',monospace; color:var(--text); }
  .app { min-height:100vh; display:flex; flex-direction:column; }
  .topbar { background:var(--surface); border-bottom:1px solid var(--border); padding:0 28px; height:56px; display:flex; align-items:center; justify-content:space-between; position:sticky; top:0; z-index:100; }
  .brand-dot { width:10px; height:10px; border-radius:50%; background:var(--green); box-shadow:0 0 8px var(--green); animation:pulse 2s infinite; }
  @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.4} }
  .brand-name { font-family:'Syne',sans-serif; font-weight:800; font-size:15px; letter-spacing:.08em; color:var(--heading); text-transform:uppercase; }
  .brand-sub { font-size:10px; color:var(--muted); letter-spacing:.12em; }
  .topbar-brand { display:flex; align-items:center; gap:10px; }
  .topbar-status { display:flex; gap:8px; }
  .status-pill { padding:3px 10px; border-radius:20px; border:1px solid var(--border); font-size:10px; letter-spacing:.1em; }
  .status-pill.green { border-color:var(--green); color:var(--green); }
  .status-pill.amber { border-color:var(--amber); color:var(--amber); }
  .status-pill.red   { border-color:var(--red);   color:var(--red); }
  .nav { background:var(--surface); border-bottom:1px solid var(--border); display:flex; padding:0 28px; overflow-x:auto; }
  .nav-tab { padding:12px 20px; font-size:11px; letter-spacing:.1em; text-transform:uppercase; color:var(--muted); cursor:pointer; border-bottom:2px solid transparent; white-space:nowrap; transition:all .2s; background:none; border-left:none; border-right:none; border-top:none; }
  .nav-tab:hover { color:var(--text); }
  .nav-tab.active { color:var(--amber); border-bottom-color:var(--amber); }
  .main { padding:28px; flex:1; }
  .section-title { font-family:'Syne',sans-serif; font-size:13px; font-weight:700; letter-spacing:.15em; text-transform:uppercase; color:var(--muted); margin-bottom:16px; display:flex; align-items:center; gap:10px; }
  .section-title::after { content:''; flex:1; height:1px; background:var(--border); }
  .metrics-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(180px,1fr)); gap:12px; margin-bottom:28px; }
  .metric-card { background:var(--card); border:1px solid var(--border); border-radius:8px; padding:16px; position:relative; overflow:hidden; }
  .metric-card::before { content:''; position:absolute; top:0; left:0; right:0; height:2px; }
  .metric-card.green::before { background:var(--green); }
  .metric-card.amber::before { background:var(--amber); }
  .metric-card.red::before   { background:var(--red); }
  .metric-card.blue::before  { background:var(--blue); }
  .metric-label { font-size:10px; letter-spacing:.1em; color:var(--muted); text-transform:uppercase; margin-bottom:8px; }
  .metric-value { font-family:'Syne',sans-serif; font-size:32px; font-weight:800; line-height:1; margin-bottom:4px; }
  .metric-card.green .metric-value { color:var(​​​​​​​​​​​​​​​​
