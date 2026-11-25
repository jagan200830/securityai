export const portalDashboardStyles = `
.gd-app {
  --gd-ink: #25201e;
  --gd-muted: #4a3d36;
  --gd-line: rgb(74 49 33 / 15%);
  --gd-grid: rgb(74 49 33 / 19%);
  --gd-rim: rgb(255 253 246 / 54%);
  --gd-edge-light: rgb(255 254 247 / 86%);
  --gd-edge-shade: rgb(57 40 28 / 19%);
  --gd-gloss: rgb(255 251 242 / 46%);
  --gd-frame: rgb(247 236 224 / 36%);
  --gd-rail: rgb(243 228 214 / 62%);
  --gd-card: rgb(252 246 239 / 64%);
  --gd-card-light: rgb(255 252 247 / 44%);
  --gd-raised: rgb(255 250 245 / 88%);
  --gd-inner: rgb(255 250 245 / 48%);
  --gd-surface: #f7efe6;
  --gd-track: rgb(81 49 32 / 14%);
  --gd-primary: #261e1b;
  --gd-primary-ink: #fffaf5;
  --gd-pick: #fff9f3;
  --gd-pick-ink: #241b17;
  --gd-coral: #a43c27;
  --gd-teal: #09644f;
  --gd-ochre: #996300;
  --gd-graph-ink: #40332d;
  --gd-focus: #194b48;
  --gd-dark-shadow: 35 21 14;
  inline-size: 100%;
  min-inline-size: 0;
  flex: 1 1 100%;
  position: relative;
  isolation: isolate;
  min-block-size: 100svh;
  background: #ab8e76;
  color: var(--gd-ink);
  color-scheme: light;
  font-family: "Manrope Variable", Manrope, system-ui, sans-serif;
  font-size: 13px;
  font-weight: 550;
  font-variant-numeric: tabular-nums;
}
.gd-app[data-theme="dark"] {
  --gd-ink: #fff6e9;
  --gd-muted: #e5d5c7;
  --gd-line: rgb(243 221 198 / 19%);
  --gd-grid: rgb(243 221 198 / 19%);
  --gd-rim: rgb(255 236 212 / 31%);
  --gd-edge-light: rgb(255 242 225 / 49%);
  --gd-edge-shade: rgb(11 6 5 / 30%);
  --gd-gloss: rgb(255 237 213 / 13%);
  --gd-frame: rgb(36 27 25 / 64%);
  --gd-rail: rgb(42 30 28 / 68%);
  --gd-card: rgb(44 34 32 / 64%);
  --gd-card-light: rgb(106 88 81 / 30%);
  --gd-raised: rgb(74 61 55 / 88%);
  --gd-inner: rgb(72 56 51 / 54%);
  --gd-surface: #362b27;
  --gd-track: rgb(245 226 212 / 16%);
  --gd-primary: #f3ddca;
  --gd-primary-ink: #231a16;
  --gd-pick: #f9eee0;
  --gd-pick-ink: #241b17;
  --gd-coral: #ff9177;
  --gd-teal: #75dac0;
  --gd-ochre: #f1be58;
  --gd-graph-ink: #e7d9cd;
  --gd-focus: #f9bf9b;
  --gd-dark-shadow: 10 4 3;
  background: #352923;
  color-scheme: dark;
}

.gd-app *, .gd-app *::before, .gd-app *::after { box-sizing: border-box; }
.gd-app :where(button, input, select) { color: inherit; font: inherit; }
.gd-app :where(button, a, input, select):focus-visible { outline: 2px solid var(--gd-focus); outline-offset: 3px; }
.gd-app a { color: inherit; text-decoration: none; }
.gd-app button { cursor: pointer; }
.gd-app :where(h1, h2, h3, p, figure) { margin: 0; }
.gd-app svg { flex: none; }
.gd-sr { position: absolute; inline-size: 1px; block-size: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }

.gd-background, .gd-app::before {
  position: fixed;
  z-index: -2;
  inset: 0;
  inline-size: 100%;
  block-size: 100%;
  pointer-events: none;
}
.gd-background {
  object-fit: cover;
  object-position: center 45%;
  filter: sepia(.18) saturate(.88) brightness(.88);
  transition: filter .4s ease;
}
.gd-app::before {
  content: "";
  z-index: -1;
  background: linear-gradient(116deg, rgb(73 48 37 / 32%), transparent 44%, rgb(162 101 63 / 24%) 76%, transparent 100%),
    linear-gradient(0deg, rgb(53 33 25 / 32%), transparent 58%);
}
.gd-app[data-theme="dark"] .gd-background { filter: sepia(.14) saturate(.74) brightness(.52); }
.gd-app[data-breach="true"]::before {
  background: linear-gradient(116deg, rgb(140 28 18 / 44%), transparent 44%, rgb(164 46 28 / 34%) 78%, transparent 100%),
    linear-gradient(0deg, rgb(76 18 14 / 45%), transparent 60%);
}

.gd-surround {
  inline-size: min(calc(100% - 92px), 1400px);
  margin-inline: auto;
  padding-block: 20px 10px;
}
.gd-top, .gd-dock {
  border: 1px solid var(--gd-rim);
  background: linear-gradient(165deg, var(--gd-gloss), transparent 32% 73%, var(--gd-gloss)), var(--gd-rail);
  box-shadow: inset 1px 1px 1px var(--gd-edge-light), inset -1px -1px 1px var(--gd-edge-shade),
    inset 0 -2px 5px var(--gd-gloss), 0 7px 20px rgb(var(--gd-dark-shadow) / 17%);
  backdrop-filter: blur(15px) saturate(1.35);
  -webkit-backdrop-filter: blur(15px) saturate(1.35);
}
.gd-top {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(240px, 420px) minmax(0, 1fr);
  align-items: center;
  gap: 12px;
  min-block-size: 60px;
  border-radius: 999px;
  padding: 6px 9px 6px 13px;
}
.gd-brand { display: flex; align-items: center; gap: 10px; min-inline-size: 0; padding-inline-start: 3px; }
.gd-logo {
  inline-size: 36px; block-size: 36px; display: grid; place-items: center; flex: none;
  border-radius: 50%; background: var(--gd-pick); color: var(--gd-pick-ink);
  box-shadow: inset 0 0 0 1px var(--gd-gloss), 0 2px 7px rgb(var(--gd-dark-shadow) / 14%);
  font-weight: 850; font-size: 11px; letter-spacing: -.02em;
}
.gd-brand strong { display: block; font-size: 12.5px; letter-spacing: .12em; line-height: 1.1; font-weight: 850; white-space: nowrap; }
.gd-brand small { display: block; margin-block-start: 2px; font-size: 10px; color: var(--gd-muted); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

.gd-ask {
  position: relative;
  display: flex;
  align-items: center;
  gap: 10px;
  min-block-size: 43px;
  max-inline-size: 100%;
  border: 1px solid var(--gd-line);
  border-radius: 999px;
  background: var(--gd-inner);
  box-shadow: inset 0 1px 0 var(--gd-gloss);
  padding: 4px 13px 4px 9px;
  text-align: start;
}
.gd-ask:hover, .gd-icon-button:hover { background: var(--gd-raised); }
.gd-orb {
  flex: none;
  inline-size: 25px;
  block-size: 25px;
  border-radius: 50%;
  background:
    radial-gradient(ellipse at 32% 24%, #faf7fe 5%, #72ecf1 25%, transparent 58%),
    radial-gradient(ellipse at 67% 54%, #e1b7f9, #815add 55%, #353467 79%);
  box-shadow: inset 0 0 0 .75px rgb(246 245 255 / 75%), inset 0 -2px 5px #604db4, 0 0 0 3px rgb(91 70 115 / 13%), 0 2px 8px rgb(71 46 113 / 35%);
}
.gd-orb[data-shield="off"] {
  background:
    radial-gradient(ellipse at 32% 24%, #fff5f0 5%, #ffb199 30%, transparent 60%),
    radial-gradient(ellipse at 67% 54%, #ff8a6b, #b7321d 58%, #54140c 82%);
  box-shadow: inset 0 0 0 .75px rgb(255 240 235 / 75%), inset 0 -2px 5px #8a2315, 0 0 0 3px rgb(164 60 39 / 20%), 0 2px 8px rgb(164 60 39 / 35%);
}
.gd-prompt {
  overflow: hidden; white-space: nowrap; text-overflow: ellipsis;
  font-size: 12px; font-weight: 750;
  animation: gd-prompt-in .58s steps(24, end) both;
}
@keyframes gd-prompt-in { from { clip-path: inset(0 100% 0 0); } }
.gd-ask-search { margin-inline-start: auto; width: 15px; height: 15px; color: var(--gd-muted); }

.gd-top-actions { display: flex; justify-content: flex-end; align-items: center; gap: 6px; }
.gd-shield-switch {
  display: inline-flex; align-items: center; gap: 7px;
  min-block-size: 42px; padding: 0 13px; border-radius: 999px;
  border: 1px solid var(--gd-line); background: var(--gd-raised);
  font-size: 11px; font-weight: 800; white-space: nowrap;
  transition: background .18s ease, border-color .18s ease, transform .18s ease;
}
.gd-shield-switch[data-active="true"] {
  border-color: color-mix(in srgb, var(--gd-teal) 45%, var(--gd-rim));
  background: color-mix(in srgb, var(--gd-teal) 14%, var(--gd-raised));
  color: var(--gd-teal);
}
.gd-shield-switch[data-active="false"] {
  border-color: color-mix(in srgb, var(--gd-coral) 48%, var(--gd-rim));
  background: color-mix(in srgb, var(--gd-coral) 14%, var(--gd-raised));
  color: var(--gd-coral);
}
.gd-shield-switch svg { width: 15px; height: 15px; }

.gd-icon-button {
  position: relative; min-inline-size: 42px; min-block-size: 42px; display: inline-grid; place-items: center;
  border-radius: 999px; border: 1px solid var(--gd-line); padding: 0; background: var(--gd-inner);
}
.gd-icon-button svg { width: 17px; height: 17px; stroke-width: 1.75; }
.gd-notices { background: var(--gd-raised); }
.gd-notices i {
  position: absolute; block-size: 6px; inline-size: 6px; inset: 9px 9px auto auto; border-radius: 50%;
  background: var(--gd-coral); box-shadow: 0 0 0 2px var(--gd-surface);
}

.gd-stage-wrap { position: relative; margin-block: 11px 0; }
.gd-stage {
  color: var(--gd-ink);
  border: 1px solid var(--gd-rim);
  border-radius: 34px;
  background:
    linear-gradient(148deg, var(--gd-gloss), transparent 19% 77%, color-mix(in srgb, var(--gd-gloss) 48%, transparent)),
    var(--gd-frame);
  box-shadow: inset 1px 1px 1px var(--gd-edge-light), inset -1px -1px 1px var(--gd-edge-shade),
    inset 0 0 7px var(--gd-gloss),
    0 1px 3px rgb(var(--gd-dark-shadow) / 17%), 0 22px 72px rgb(var(--gd-dark-shadow) / 22%);
  backdrop-filter: blur(var(--gd-panel-frost, 14px)) saturate(1.24);
  -webkit-backdrop-filter: blur(var(--gd-panel-frost, 14px)) saturate(1.24);
}
.gd-stage-scroll {
  block-size: max(620px, min(880px, calc(100svh - 156px)));
  overflow: auto;
  overscroll-behavior: contain;
  scrollbar-width: thin;
  scrollbar-color: var(--gd-line) transparent;
  border-radius: inherit;
  padding: clamp(19px, 2.1vw, 32px) clamp(24px, 3vw, 44px) 44px;
}

.gd-breach-strip {
  display: flex; align-items: center; justify-content: space-between; gap: 12px; flex-wrap: wrap;
  margin-block-end: 16px; padding: 11px 15px; border-radius: 16px;
  border: 1px solid color-mix(in srgb, var(--gd-coral) 45%, var(--gd-rim));
  background: color-mix(in srgb, var(--gd-coral) 16%, var(--gd-raised));
  color: var(--gd-ink);
}
.gd-breach-strip strong { color: var(--gd-coral); font-weight: 840; }
.gd-breach-strip-left { display: flex; align-items: center; gap: 10px; font-size: 12px; }
.gd-breach-strip-left svg { width: 17px; height: 17px; color: var(--gd-coral); }

.gd-view-head {
  display: flex; align-items: flex-end; justify-content: space-between; gap: 12px 22px;
  margin-block-end: 18px;
}
.gd-view-head h1 {
  font-size: clamp(27px, 3.1vw, 44px);
  font-weight: 780;
  line-height: 1.04;
  letter-spacing: -.055em;
  text-wrap: balance;
}
.gd-view-head p { color: var(--gd-muted); font-size: 13px; margin-block-start: 7px; max-inline-size: 64ch; }
.gd-view-actions { display: flex; align-items: center; flex-wrap: wrap; justify-content: flex-end; gap: 7px; }
.gd-period {
  display: inline-flex; align-items: center; padding: 3px; border-radius: 999px;
  border: 1px solid var(--gd-rim); background: var(--gd-inner);
  box-shadow: inset 0 1px 0 var(--gd-gloss);
}
.gd-period button {
  min-block-size: 35px; min-inline-size: 56px; border: 0; border-radius: 999px; background: transparent;
  padding: 0 11px; font-size: 11px; font-weight: 750; white-space: nowrap;
}
.gd-period button[aria-pressed="true"] { background: var(--gd-primary); color: var(--gd-primary-ink); }
.gd-period button[aria-pressed="false"]:hover { background: var(--gd-inner); }

.gd-primary, .gd-secondary, .gd-danger, .gd-teal-btn {
  display: inline-flex; justify-content: center; align-items: center; gap: 7px;
  min-block-size: 40px; padding: 7px 14px;
  font-size: 11.5px; font-weight: 790; line-height: 1.2; border-radius: 999px;
  border: 1px solid transparent; white-space: nowrap;
  transition: filter .16s ease, background .16s ease, transform .16s ease;
}
.gd-primary { background: var(--gd-primary); color: var(--gd-primary-ink); }
.gd-secondary { background: var(--gd-raised); border-color: var(--gd-rim); color: var(--gd-ink); }
.gd-danger { background: var(--gd-coral); color: #fffaf5; }
.gd-teal-btn { background: var(--gd-teal); color: #fffaf5; }
.gd-primary:hover, .gd-danger:hover, .gd-teal-btn:hover { filter: brightness(1.12); }
.gd-secondary:hover { background: var(--gd-surface); }
.gd-primary svg, .gd-secondary svg, .gd-danger svg, .gd-teal-btn svg { width: 14px; height: 14px; }
.gd-primary:disabled, .gd-secondary:disabled, .gd-danger:disabled, .gd-teal-btn:disabled { opacity: .55; cursor: not-allowed; }
.gd-export { white-space: nowrap; }

.gd-content { min-inline-size: 0; }
.gd-analytics, .gd-command-grid, .gd-command-side, .gd-summary, .gd-metric-grid, .gd-analytics-grid { display: grid; gap: 12px; }
.gd-command-grid { grid-template-columns: minmax(0, 1.05fr) minmax(0, 1fr) minmax(0, 1.05fr); align-items: stretch; }
.gd-command-side { grid-column: 1; align-content: start; }
.gd-command-grid > .gd-activity { grid-column: 2 / -1; }
.gd-summary { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 7px; padding: 6px; }
.gd-analytics-grid { grid-template-columns: minmax(0, 1.72fr) minmax(0, 1fr); }
.gd-metric-grid { grid-template-columns: repeat(4, minmax(0, 1fr)); }

.gd-panel, .gd-metric, .gd-summary {
  min-inline-size: 0;
  border: 1px solid var(--gd-rim);
  border-radius: 20px;
  background: linear-gradient(144deg, var(--gd-card-light), transparent 66%), var(--gd-card);
  box-shadow: inset 0 1px 1px var(--gd-edge-light), inset -1px -1px 1px var(--gd-edge-shade), 0 6px 18px rgb(var(--gd-dark-shadow) / 9%);
}
.gd-summary { border-radius: 20px; background: var(--gd-inner); }
.gd-summary .gd-metric { border-radius: 15px; }
.gd-panel { padding: 15px 16px; }
.gd-panel-head {
  display: flex; flex-wrap: wrap; justify-content: space-between; align-items: flex-start;
  gap: 7px 12px; margin-block-end: 12px;
}
.gd-panel-head h2 { font-size: 14px; font-weight: 810; letter-spacing: -.024em; }
.gd-panel-head p { font-size: 11px; color: var(--gd-muted); margin-block-start: 3px; }

.gd-metric { display: flex; flex-direction: column; justify-content: space-between; min-block-size: 112px; padding: 11px 12px; }
.gd-metric[data-tone="teal"] {
  --gd-coral: #ffc8b8;
  --gd-teal: #b8f1dd;
  --gd-muted: #e4f5ef;
  color: #fff;
  border-color: rgb(196 248 231 / 55%);
  background: radial-gradient(ellipse at 5% -20%, #3a9381, transparent 68%), linear-gradient(145deg, #1e7461, #08443a);
  box-shadow: inset 0 1px 2px rgb(214 252 240 / 45%), 0 6px 14px rgb(19 78 64 / 17%);
}
.gd-metric[data-tone="danger"] {
  --gd-coral: #ffd2c7;
  --gd-teal: #ffd2c7;
  --gd-muted: #fde7e1;
  color: #fff;
  border-color: rgb(255 190 175 / 55%);
  background: radial-gradient(ellipse at 5% -20%, #c84b31, transparent 68%), linear-gradient(145deg, #9a2f1d, #56160d);
  box-shadow: inset 0 1px 2px rgb(255 215 205 / 40%), 0 6px 14px rgb(110 28 16 / 24%);
}
.gd-metric-head { display: flex; justify-content: space-between; align-items: center; gap: 4px; min-inline-size: 0; font-size: 11px; font-weight: 740; }
.gd-metric-icon, .gd-list-icon {
  display: grid; place-items: center; flex: none; color: inherit;
  inline-size: 28px; block-size: 28px; border-radius: 10px;
  background: var(--gd-inner); box-shadow: inset 0 1px 0 var(--gd-gloss);
}
.gd-metric-icon svg, .gd-list-icon svg { width: 14px; height: 14px; }
.gd-metric[data-tone="teal"] .gd-metric-icon,
.gd-metric[data-tone="danger"] .gd-metric-icon { background: rgb(255 255 255 / 16%); }
.gd-metric-value { display: block; font-size: clamp(22px, 2.3vw, 34px); line-height: 1.05; margin-block: 3px 7px; letter-spacing: -.05em; font-weight: 815; }
.gd-summary .gd-metric-value { font-size: clamp(20px, 1.95vw, 30px); }
.gd-metric-caption, .gd-balance-change { display: flex; flex-wrap: wrap; align-items: center; gap: 4px; color: var(--gd-muted); font-size: 10px; font-weight: 680; }
.gd-delta {
  display: inline-flex; align-items: center; gap: 2px; color: var(--gd-teal); font-weight: 850;
  border-radius: 6px; padding: 2px 5px;
  background: color-mix(in srgb, var(--gd-teal) 12%, transparent);
}
.gd-delta[data-attention="true"] { color: var(--gd-coral); background: color-mix(in srgb, var(--gd-coral) 13%, transparent); }
.gd-delta svg { width: 11px; height: 11px; stroke-width: 2.4; }

.gd-balance .gd-panel-head { align-items: center; margin-block-end: 9px; }
.gd-unit { border-radius: 6px; padding: 4px 7px; background: var(--gd-raised); font-size: 10px; font-weight: 810; }
.gd-balance-number { font-size: clamp(28px, 3.6vw, 52px); font-weight: 820; letter-spacing: -.072em; line-height: 1.02; }
.gd-balance-change { margin-block-start: 7px; }
.gd-balance-actions { display: grid; grid-template-columns: 1fr 1fr; gap: 6px; margin-block: 13px 12px; }
.gd-streams { display: flex; border-radius: 12px; background: var(--gd-inner); padding: 8px 2px; }
.gd-streams div { flex: 1; min-inline-size: 0; padding: 0 7px; }
.gd-streams div + div { border-inline-start: 1px solid var(--gd-line); }
.gd-streams span, .gd-streams strong { display: block; }
.gd-streams span { font-size: 9px; color: var(--gd-muted); }
.gd-streams strong { font-size: 11px; font-weight: 810; margin-block-start: 4px; }

.gd-capacity .gd-panel-head, .gd-approvals .gd-panel-head { margin-block-end: 10px; }
.gd-capacity-track, .gd-mix-track { display: block; height: 7px; border-radius: 999px; overflow: hidden; background: var(--gd-track); }
.gd-capacity-track .gd-fill { display: block; block-size: 100%; border-radius: inherit; background: var(--gd-teal); transform-origin: left center; transition: width .35s ease; }
.gd-capacity-track .gd-fill[data-warn="true"] { background: var(--gd-coral); }
.gd-capacity-label { display: flex; justify-content: space-between; flex-wrap: wrap; gap: 4px; color: var(--gd-muted); font-size: 10px; margin-top: 8px; }
.gd-capacity-label strong { color: var(--gd-ink); }
.gd-approval-content { display: flex; align-items: center; gap: 9px; min-inline-size: 0; }
.gd-approval-content .gd-list-icon { inline-size: 37px; block-size: 37px; color: var(--gd-teal); background: color-mix(in srgb, var(--gd-teal) 12%, var(--gd-inner)); }
.gd-approval-content .gd-list-icon[data-alert="true"] { color: var(--gd-coral); background: color-mix(in srgb, var(--gd-coral) 14%, var(--gd-inner)); }
.gd-approval-content div { flex: 1; min-inline-size: 0; }
.gd-approval-content strong, .gd-approval-content small { display: block; }
.gd-approval-content strong { font-size: 12px; font-weight: 810; }
.gd-approval-content small { margin-top: 3px; font-size: 10.5px; color: var(--gd-muted); }

.gd-table-tools { display: flex; flex-wrap: wrap; align-items: center; gap: 7px; max-inline-size: 100%; }
.gd-search, .gd-filter {
  display: inline-flex; align-items: center; gap: 6px; border: 1px solid var(--gd-line); border-radius: 10px;
  background: var(--gd-inner); min-block-size: 35px; padding: 0 9px;
}
.gd-search svg, .gd-filter svg { width: 13px; height: 13px; color: var(--gd-muted); }
.gd-search input { width: 130px; flex: 1; min-inline-size: 0; border: 0; background: transparent; min-block-size: 33px; }
.gd-search input::placeholder { color: var(--gd-muted); opacity: 1; }
.gd-search input, .gd-filter select { font-size: 11px; }
.gd-filter select { border: 0; background: transparent; padding: 5px 0; min-inline-size: 0; }
.gd-filter select option { color: var(--gd-ink); background: var(--gd-surface); }
.gd-search:focus-within, .gd-filter:focus-within { outline: 2px solid var(--gd-focus); }
.gd-app .gd-search input:focus-visible, .gd-app .gd-filter select:focus-visible { outline: none; }

.gd-table-scroll { max-inline-size: 100%; overflow: auto; scrollbar-width: thin; }
.gd-table-scroll table { inline-size: 100%; border-spacing: 0; text-align: start; }
.gd-table-scroll th, .gd-table-scroll td { padding: 9px 10px; text-align: start; }
.gd-table-scroll th { background: var(--gd-inner); font-size: 10px; color: var(--gd-muted); font-weight: 800; white-space: nowrap; }
.gd-table-scroll th:first-child { border-radius: 8px 0 0 8px; }
.gd-table-scroll th:last-child { border-radius: 0 8px 8px 0; }
.gd-table-scroll td { white-space: nowrap; font-size: 11.5px; }
.gd-table-scroll td:first-child { font-weight: 760; }
.gd-table-scroll tr + tr td { border-top: 1px solid var(--gd-line); }
.gd-table-scroll tbody tr.gd-clickable { cursor: pointer; transition: background .14s ease; }
.gd-table-scroll tbody tr.gd-clickable:hover td { background: var(--gd-inner); }

.gd-status-text {
  font-size: 11px; font-weight: 790; white-space: nowrap;
  color: var(--gd-graph-ink);
}
.gd-status-text[data-state="teal"] { color: var(--gd-teal); }
.gd-status-text[data-state="coral"] { color: var(--gd-coral); }
.gd-status-text[data-state="ochre"] { color: var(--gd-ochre); }
.gd-empty { padding: 14px 3px; color: var(--gd-muted); font-size: 12px; }

.gd-app [data-tone="ink"] { --gd-series: var(--gd-graph-ink); }
.gd-app [data-tone="coral"] { --gd-series: var(--gd-coral); }
.gd-app [data-tone="teal"] { --gd-series: var(--gd-teal); }
.gd-app [data-tone="ochre"] { --gd-series: var(--gd-ochre); }
.gd-legend { display: inline-flex; flex-wrap: wrap; align-items: center; gap: 6px 12px; color: var(--gd-muted); }
.gd-legend span, .gd-device-list button span:first-child { display: inline-flex; align-items: center; gap: 5px; font-size: 10px; font-weight: 740; }
.gd-legend i, .gd-device-list button span:first-child i { inline-size: 7px; block-size: 7px; border-radius: 50%; background: var(--gd-series); }
.gd-stack-meta { display: flex; justify-content: space-between; align-items: center; height: 20px; gap: 4px; }
.gd-chart-readout { font-size: 10px; font-weight: 830; white-space: nowrap; }
.gd-stack-plot { display: grid; grid-template-columns: repeat(var(--gd-series-count), minmax(0, 1fr)); gap: 4px; block-size: 184px; margin-top: 5px; }
.gd-command-chart .gd-stack-plot { block-size: 141px; }
.gd-stack-column { display: flex; flex-direction: column; align-items: center; min-inline-size: 0; border: 0; border-radius: 8px; background: transparent; padding: 3px 0 0; }
.gd-stack-column:is(:focus-visible, :hover, [aria-pressed="true"]) { background: var(--gd-inner); }
.gd-stack-track { display: flex; justify-content: center; align-items: end; flex: 1; inline-size: 100%; border-bottom: 1px solid var(--gd-line); }
.gd-stack-bar {
  display: flex; flex-direction: column; transform-origin: center bottom;
  inline-size: min(65%, 40px); min-inline-size: 6px; border-radius: 6px 6px 3px 3px; overflow: hidden;
}
.gd-stack-bar i { display: block; flex-basis: 0; background: var(--gd-series); min-block-size: 2px; }
.gd-stack-bar i:first-child { background: repeating-linear-gradient(138deg, var(--gd-series) 0 4px, color-mix(in srgb, var(--gd-series) 76%, white) 4px 6px); }
.gd-stack-label { font-size: 9px; color: var(--gd-muted); margin-top: 7px; white-space: nowrap; }

.gd-revenue-main { display: grid; grid-template-columns: 42px minmax(0, 1fr); }
.gd-chart-y { display: flex; flex-direction: column; justify-content: space-between; padding-block: 0; font-size: 10px; color: var(--gd-muted); }
.gd-line-plot { position: relative; min-inline-size: 0; block-size: 196px; }
.gd-line-plot svg { display: block; width: 100%; height: 100%; overflow: visible; }
.gd-grid-line { stroke: var(--gd-grid); stroke-dasharray: 3 4; vector-effect: non-scaling-stroke; }
.gd-chart-path { fill: none; stroke: var(--gd-series); stroke-width: 2.5; stroke-linecap: round; vector-effect: non-scaling-stroke; }
.gd-line-cursor { stroke: var(--gd-muted); stroke-dasharray: 2 4; vector-effect: non-scaling-stroke; }
.gd-chart-zones { position: absolute; inset: 0; display: flex; align-items: stretch; }
.gd-chart-zones button { flex: 1; min-inline-size: 0; border: 0; background: transparent; padding: 0; border-radius: 2px; }
.gd-line-tooltip {
  pointer-events: none; position: absolute; top: 6px; left: clamp(76px, var(--gd-tooltip-x), calc(100% - 76px)); translate: -50% 0;
  display: grid; gap: 2px; min-inline-size: 146px; padding: 7px 9px; background: var(--gd-surface);
  border: 1px solid var(--gd-line); border-radius: 9px; font-size: 10px; box-shadow: 0 4px 10px rgb(var(--gd-dark-shadow) / 15%);
}
.gd-line-tooltip span { display: flex; justify-content: space-between; gap: 10px; }
.gd-chart-axis { display: flex; justify-content: space-between; margin: 9px 0 0 42px; font-size: 9px; color: var(--gd-muted); }

.gd-device { display: grid; gap: 8px; justify-items: stretch; }
.gd-device-ring { position: relative; inline-size: min(100%, 146px); aspect-ratio: 1; justify-self: center; }
.gd-device-ring svg { display: block; inline-size: 100%; block-size: 100%; }
.gd-device-segment { stroke: var(--gd-series); transition: opacity .2s ease; }
.gd-device-segment[data-muted="true"] { opacity: .29; }
.gd-device-total { position: absolute; inset: 0; display: flex; flex-direction: column; justify-content: center; align-items: center; pointer-events: none; }
.gd-device-total strong { font-size: 22px; line-height: 1.05; letter-spacing: -.05em; font-weight: 850; }
.gd-device-total > span { font-size: 10px; margin-top: 4px; color: var(--gd-muted); }
.gd-device-list { display: grid; gap: 2px; }
.gd-device-list button {
  display: grid; grid-template-columns: 88px minmax(0, 1fr) 34px; gap: 7px; align-items: center;
  min-block-size: 32px; text-align: start; background: transparent; border: 0; border-radius: 8px; padding: 3px 6px;
}
.gd-device-list button:is(:hover, [aria-pressed="true"]) { background: var(--gd-inner); }
.gd-device-list button strong { text-align: end; font-weight: 850; font-size: 11px; }
.gd-mix-track { height: 4px; }
.gd-mix-track .gd-fill { display: block; block-size: 100%; border-radius: inherit; background: var(--gd-series); transform-origin: left center; }

/* Course Registration Grid */
.gd-course-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 11px; }
.gd-course-card {
  display: flex; flex-direction: column; justify-content: space-between; gap: 10px;
  padding: 14px 15px; border-radius: 16px;
  border: 1px solid var(--gd-rim); background: var(--gd-inner);
  box-shadow: inset 0 1px 0 var(--gd-gloss);
}
.gd-course-card[data-registered="true"] {
  border-color: color-mix(in srgb, var(--gd-teal) 46%, var(--gd-rim));
  background: color-mix(in srgb, var(--gd-teal) 8%, var(--gd-card));
}
.gd-course-top { display: flex; justify-content: space-between; align-items: flex-start; gap: 10px; }
.gd-course-meta { font-size: 10.5px; color: var(--gd-muted); display: flex; flex-wrap: wrap; gap: 5px; align-items: center; }
.gd-course-card h3 { font-size: 13.5px; font-weight: 810; letter-spacing: -.02em; margin-top: 3px; }
.gd-course-desc { font-size: 11.5px; line-height: 1.48; color: var(--gd-muted); }
.gd-course-foot { display: flex; justify-content: space-between; align-items: center; gap: 10px; flex-wrap: wrap; padding-top: 8px; border-top: 1px solid var(--gd-line); }

/* Event Calendar & Featured Media */
.gd-event-feature-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 12px; }
.gd-event-photo-card {
  display: flex; flex-direction: column; overflow: hidden; border-radius: 18px;
  border: 1px solid var(--gd-rim); background: var(--gd-card);
  box-shadow: inset 0 1px 1px var(--gd-edge-light), 0 6px 16px rgb(var(--gd-dark-shadow) / 10%);
}
.gd-event-media { position: relative; aspect-ratio: 4 / 3; overflow: hidden; background: var(--gd-surface); }
.gd-event-media img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform .35s ease; }
.gd-event-photo-card:hover .gd-event-media img { transform: scale(1.03); }
.gd-event-scrim {
  position: absolute; inset: 0;
  background: linear-gradient(to top, rgb(18 12 10 / 78%) 0%, rgb(18 12 10 / 18%) 48%, transparent 100%);
  display: flex; flex-direction: column; justify-content: flex-end; padding: 12px 13px; color: #fffaf5;
}
.gd-event-scrim small { font-size: 10px; opacity: .88; font-weight: 700; }
.gd-event-scrim strong { font-size: 13.5px; font-weight: 820; line-height: 1.2; margin-top: 2px; }
.gd-event-body { padding: 12px 13px; display: flex; flex-direction: column; gap: 8px; flex: 1; justify-content: space-between; }
.gd-event-body p { font-size: 11px; line-height: 1.45; color: var(--gd-muted); }

.gd-calendar-layout { display: grid; grid-template-columns: minmax(0, 1.15fr) minmax(0, 1fr); gap: 12px; align-items: start; }
.gd-cal-grid { display: grid; grid-template-columns: repeat(7, minmax(0, 1fr)); gap: 5px; }
.gd-cal-dow { text-align: center; font-size: 10px; font-weight: 800; color: var(--gd-muted); padding-bottom: 4px; }
.gd-cal-day {
  min-block-size: 50px; border-radius: 11px; border: 1px solid var(--gd-line); background: var(--gd-inner);
  display: flex; flex-direction: column; align-items: flex-start; justify-content: space-between;
  padding: 6px 7px; font-size: 11px; font-weight: 740; text-align: start;
  transition: background .15s ease, border-color .15s ease;
}
.gd-cal-day:hover { background: var(--gd-raised); }
.gd-cal-day[data-selected="true"] { background: var(--gd-primary); color: var(--gd-primary-ink); border-color: var(--gd-primary); }
.gd-cal-day[data-has-event="true"]:not([data-selected="true"]) {
  border-color: color-mix(in srgb, var(--gd-teal) 48%, var(--gd-line));
  background: color-mix(in srgb, var(--gd-teal) 10%, var(--gd-inner));
}
.gd-cal-day[data-empty="true"] { border-color: transparent; background: transparent; pointer-events: none; }
.gd-cal-marker { font-size: 9px; font-weight: 820; color: var(--gd-teal); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-inline-size: 100%; }
.gd-cal-day[data-selected="true"] .gd-cal-marker { color: var(--gd-primary-ink); opacity: .88; }

.gd-event-list { display: grid; gap: 8px; }
.gd-event-row {
  display: flex; justify-content: space-between; align-items: center; gap: 12px;
  padding: 11px 12px; border-radius: 13px; border: 1px solid var(--gd-line); background: var(--gd-inner);
}
.gd-event-row:hover { background: var(--gd-raised); }
.gd-event-row-info { min-inline-size: 0; flex: 1; }
.gd-event-row-info strong { display: block; font-size: 12px; font-weight: 810; }
.gd-event-row-info small { display: block; margin-top: 3px; font-size: 10.5px; color: var(--gd-muted); }

/* Mission Portal Shield (Track 2 Simulator & Comparison) */
.gd-shield-grid { display: grid; grid-template-columns: minmax(0, 1.05fr) minmax(0, 1.35fr); gap: 12px; align-items: start; }
.gd-attack-list { display: grid; gap: 7px; }
.gd-attack-btn {
  display: grid; gap: 4px; width: 100%; text-align: start;
  padding: 11px 12px; border-radius: 13px;
  border: 1px solid var(--gd-line); background: var(--gd-inner);
  transition: background .15s ease, border-color .15s ease;
}
.gd-attack-btn:hover { background: var(--gd-raised); }
.gd-attack-btn[aria-pressed="true"] {
  border-color: var(--gd-primary);
  background: var(--gd-raised);
  box-shadow: inset 0 1px 0 var(--gd-gloss), 0 4px 12px rgb(var(--gd-dark-shadow) / 10%);
}
.gd-attack-btn-head { display: flex; justify-content: space-between; align-items: center; gap: 8px; }
.gd-attack-btn strong { font-size: 12px; font-weight: 820; }
.gd-attack-btn small { font-size: 10.5px; color: var(--gd-muted); line-height: 1.4; }

.gd-code-box {
  font-family: ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace;
  font-size: 11px; line-height: 1.5;
  padding: 10px 12px; border-radius: 11px;
  border: 1px solid var(--gd-line); background: var(--gd-surface);
  overflow-x: auto; white-space: pre-wrap; word-break: break-all;
}
.gd-code-box[data-danger="true"] {
  border-color: color-mix(in srgb, var(--gd-coral) 45%, var(--gd-line));
  background: color-mix(in srgb, var(--gd-coral) 10%, var(--gd-surface));
}
.gd-step-list { display: grid; gap: 7px; margin-top: 10px; }
.gd-step-row {
  display: grid; grid-template-columns: minmax(0, 1fr) auto; gap: 4px 10px;
  padding: 9px 11px; border-radius: 11px;
  border: 1px solid var(--gd-line); background: var(--gd-inner);
}
.gd-step-row strong { font-size: 11.5px; font-weight: 810; color: var(--gd-teal); }
.gd-step-row span { font-size: 10px; font-weight: 800; color: var(--gd-muted); }
.gd-step-row p { grid-column: 1 / -1; font-size: 11px; line-height: 1.45; color: var(--gd-ink); }

.gd-compare-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; }
.gd-compare-col {
  padding: 14px 15px; border-radius: 16px;
  border: 1px solid var(--gd-rim); background: var(--gd-inner);
  display: grid; gap: 10px; align-content: start;
}
.gd-compare-col[data-mode="without"] {
  border-color: color-mix(in srgb, var(--gd-coral) 42%, var(--gd-rim));
  background: color-mix(in srgb, var(--gd-coral) 8%, var(--gd-card));
}
.gd-compare-col[data-mode="with"] {
  border-color: color-mix(in srgb, var(--gd-teal) 45%, var(--gd-rim));
  background: color-mix(in srgb, var(--gd-teal) 8%, var(--gd-card));
}
.gd-compare-facts { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 7px; }
.gd-compare-facts div { padding: 8px 9px; border-radius: 10px; border: 1px solid var(--gd-line); background: var(--gd-surface); }
.gd-compare-facts dt { font-size: 9.5px; color: var(--gd-muted); }
.gd-compare-facts dd { margin: 3px 0 0; font-size: 13px; font-weight: 830; }

/* Floating Docks */
.gd-dock {
  position: absolute; z-index: 3;
  display: flex; align-items: center; gap: 3px; padding: 4px; border-radius: 999px;
}
.gd-dock-side { flex-direction: column; left: -24px; top: clamp(66px, 14vh, 140px); }
.gd-dock-bottom { left: 50%; bottom: -24px; translate: -50% 0; }
.gd-dock a {
  z-index: 1; position: relative; display: flex; gap: 6px; justify-content: center; align-items: center;
  min-inline-size: 44px; min-block-size: 44px; padding: 0 13px; border-radius: 999px;
  font-size: 11px; font-weight: 800; white-space: nowrap;
}
.gd-dock-side a { padding: 0; }
.gd-dock a svg { width: 16px; height: 16px; stroke-width: 1.9; }
.gd-dock a[aria-current="page"] { color: var(--gd-pick-ink); }
.gd-dock a:not([aria-current="page"]):hover { background: var(--gd-inner); }
.gd-dock-indicator {
  position: absolute; inset: 0 auto auto 0; pointer-events: none; visibility: hidden;
  border-radius: 999px; background: var(--gd-pick); box-shadow: inset 0 1px 0 white, 0 2px 7px rgb(var(--gd-dark-shadow) / 16%);
}
.gd-dock-indicator[data-ready="true"] { visibility: visible; transition: transform .36s cubic-bezier(.24, .89, .26, 1), width .36s cubic-bezier(.24, .89, .26, 1), height .36s cubic-bezier(.24, .89, .26, 1); }
.gd-dock-side .gd-dock-text, .gd-dock-short { display: none; }
.gd-dock-tip {
  display: none; position: absolute; left: calc(100% + 7px); z-index: 1; pointer-events: none;
  color: var(--gd-ink); background: var(--gd-surface); padding: 6px 9px; border: 1px solid var(--gd-rim);
  border-radius: 7px; box-shadow: 0 3px 8px rgb(var(--gd-dark-shadow) / 17%);
}
.gd-dock-side a:is(:hover, :focus-visible) .gd-dock-tip { display: inline; }

.gd-footer { padding: 32px 3px 2px; display: flex; justify-content: space-between; align-items: center; gap: 10px; flex-wrap: wrap; }
.gd-footer > * {
  border-radius: 999px; padding: 5px 10px; color: var(--gd-ink); font-size: 10px; font-weight: 740;
  background: var(--gd-raised); min-block-size: 24px; display: flex; align-items: center; gap: 5px;
}
.gd-footer a:hover { text-decoration: underline; }
.gd-footer a svg { width: 11px; height: 11px; }

/* Native Modal Dialog */
.gd-dialog {
  max-inline-size: min(calc(100% - 26px), 540px); inline-size: 100%;
  border-radius: 23px; border: 1px solid var(--gd-rim); color: var(--gd-ink); padding: 0;
  background: var(--gd-surface); box-shadow: 0 20px 80px rgb(var(--gd-dark-shadow) / 38%);
}
.gd-dialog::backdrop { background: rgb(30 21 17 / 48%); backdrop-filter: blur(5px); }
.gd-dialog-inner { padding: 19px; }
.gd-dialog-inner > header { display: flex; gap: 10px; align-items: center; justify-content: space-between; margin-bottom: 13px; }
.gd-dialog-inner h2 { font-size: 21px; font-weight: 830; letter-spacing: -.04em; }
.gd-command-input { inline-size: 100%; padding-inline: 10px; margin-bottom: 8px; min-block-size: 44px; }
.gd-command-input input { min-block-size: 42px; font-size: 13.5px; }
.gd-quick-list { display: grid; gap: 5px; }
.gd-quick-list button {
  display: flex; align-items: center; gap: 9px; width: 100%; padding: 9px 10px;
  text-align: start; border: 1px solid var(--gd-line); border-radius: 10px; background: var(--gd-inner);
}
.gd-quick-list button:hover { background: var(--gd-raised); }
.gd-quick-list button svg { width: 16px; height: 16px; color: var(--gd-muted); }
.gd-quick-list button div { flex: 1; }
.gd-quick-list strong, .gd-quick-list small { display: block; }
.gd-quick-list small { color: var(--gd-muted); margin-top: 2px; font-size: 11px; }
.gd-work-dialog-description { margin: 10px 0 12px; font-size: 12px; line-height: 1.5; color: var(--gd-muted); }
.gd-work-facts { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 6px; margin-bottom: 12px; }
.gd-work-facts div { border: 1px solid var(--gd-line); border-radius: 9px; padding: 8px; background: var(--gd-inner); }
.gd-work-facts dt { font-size: 10px; color: var(--gd-muted); }
.gd-work-facts dd { margin: 3px 0 0; font-weight: 790; font-size: 12px; }

/* College Portal Website Navigation & Hero */
.gd-top-portal {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  min-block-size: 62px;
  border-radius: 999px;
  padding: 6px 10px 6px 14px;
}
.gd-nav-links {
  display: flex;
  align-items: center;
  gap: 4px;
  min-inline-size: 0;
}
.gd-nav-links button {
  border: 0;
  background: transparent;
  padding: 8px 12px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 760;
  white-space: nowrap;
  color: var(--gd-muted);
  transition: background .16s ease, color .16s ease;
}
.gd-nav-links button:hover {
  color: var(--gd-ink);
  background: var(--gd-inner);
}
.gd-nav-links button[aria-current="page"] {
  background: var(--gd-pick);
  color: var(--gd-pick-ink);
  box-shadow: inset 0 1px 0 white, 0 2px 6px rgb(var(--gd-dark-shadow) / 12%);
}

.gd-college-hero {
  position: relative;
  border-radius: 24px;
  overflow: hidden;
  border: 1px solid var(--gd-rim);
  min-block-size: 320px;
  display: grid;
  grid-template-columns: minmax(0, 1.35fr) minmax(0, 0.95fr);
  gap: 16px;
  padding: clamp(20px, 2.6vw, 32px);
  color: #fffaf5;
  box-shadow: 0 14px 36px rgb(var(--gd-dark-shadow) / 22%);
}
.gd-college-hero-bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
}
.gd-college-hero-scrim {
  position: absolute;
  inset: 0;
  z-index: 1;
  background:
    linear-gradient(100deg, rgb(20 14 11 / 86%) 0%, rgb(24 16 12 / 72%) 56%, rgb(24 16 12 / 60%) 100%),
    linear-gradient(to top, rgb(18 12 9 / 76%) 0%, transparent 55%);
}
.gd-college-hero-main,
.gd-college-hero-notices {
  position: relative;
  z-index: 2;
}
.gd-college-hero-main {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 16px;
}
.gd-hero-kicker {
  font-size: 11px;
  font-weight: 760;
  color: #f3d7bd;
  letter-spacing: .04em;
}
.gd-college-hero h1 {
  font-size: clamp(26px, 3vw, 42px);
  font-weight: 800;
  line-height: 1.07;
  letter-spacing: -.045em;
  text-wrap: balance;
  margin-top: 6px;
}
.gd-college-hero-sub {
  font-size: 13px;
  line-height: 1.55;
  color: rgb(255 247 238 / 86%);
  max-inline-size: 56ch;
  margin-top: 8px;
}
.gd-hero-cta-row {
  display: flex;
  flex-wrap: wrap;
  gap: 9px;
  margin-top: 14px;
}
.gd-hero-cta-light {
  display: inline-flex; align-items: center; gap: 7px;
  min-block-size: 42px; padding: 8px 16px; border-radius: 999px;
  background: #fffaf5; color: #241b17; border: 1px solid transparent;
  font-size: 12px; font-weight: 820; white-space: nowrap;
}
.gd-hero-cta-light:hover { filter: brightness(.95); }
.gd-hero-cta-glass {
  display: inline-flex; align-items: center; gap: 7px;
  min-block-size: 42px; padding: 8px 15px; border-radius: 999px;
  background: rgb(255 250 245 / 16%); color: #fffaf5;
  border: 1px solid rgb(255 250 245 / 34%);
  backdrop-filter: blur(8px);
  font-size: 12px; font-weight: 780; white-space: nowrap;
}
.gd-hero-cta-glass:hover { background: rgb(255 250 245 / 26%); }
.gd-hero-stats {
  display: flex; flex-wrap: wrap; gap: 18px;
  padding-top: 12px; border-top: 1px solid rgb(255 250 245 / 18%);
  font-size: 11px; color: rgb(255 246 236 / 84%);
}
.gd-hero-stats strong { display: block; font-size: 17px; font-weight: 830; color: #fff; }

.gd-college-hero-notices {
  border-radius: 18px;
  border: 1px solid rgb(255 248 240 / 22%);
  background: rgb(28 20 17 / 58%);
  backdrop-filter: blur(12px);
  padding: 15px 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.gd-notice-item {
  padding-top: 9px;
  border-top: 1px solid rgb(255 248 240 / 14%);
}
.gd-notice-item:first-of-type { padding-top: 0; border-top: 0; }
.gd-notice-meta { font-size: 10px; color: #f3d7bd; font-weight: 750; }
.gd-notice-item strong { display: block; font-size: 12px; font-weight: 800; margin-top: 2px; color: #fffaf5; }
.gd-notice-item p { font-size: 10.5px; color: rgb(255 245 235 / 78%); margin-top: 2px; line-height: 1.4; }

.gd-gateway-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 11px;
}
.gd-gateway-card {
  display: flex; flex-direction: column; justify-content: space-between; gap: 10px;
  padding: 15px; border-radius: 18px; text-align: start;
  border: 1px solid var(--gd-rim); background: var(--gd-card);
  box-shadow: inset 0 1px 1px var(--gd-edge-light), 0 6px 16px rgb(var(--gd-dark-shadow) / 8%);
  transition: transform .16s ease, background .16s ease;
}
.gd-gateway-card:hover { background: var(--gd-raised); transform: translateY(-2px); }
.gd-gateway-card h3 { font-size: 14px; font-weight: 820; margin-top: 8px; }
.gd-gateway-card p { font-size: 11.5px; color: var(--gd-muted); line-height: 1.46; margin-top: 4px; }
.gd-gateway-foot {
  display: flex; align-items: center; justify-content: space-between;
  font-size: 11px; font-weight: 800; color: var(--gd-teal);
  padding-top: 8px; border-top: 1px solid var(--gd-line);
}

.gd-dept-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 9px;
}
.gd-dept-card {
  padding: 12px 13px; border-radius: 14px;
  border: 1px solid var(--gd-line); background: var(--gd-inner);
}
.gd-dept-card strong { display: block; font-size: 12.5px; font-weight: 820; margin-top: 3px; }
.gd-dept-card small { display: block; font-size: 10.5px; color: var(--gd-muted); margin-top: 4px; line-height: 1.4; }

/* Login Portal Page */
.gd-login-layout {
  display: grid;
  grid-template-columns: minmax(0, 1.08fr) minmax(0, 0.92fr);
  gap: 14px;
  align-items: start;
}
.gd-field-group { display: grid; gap: 5px; }
.gd-field-group label { font-size: 11px; font-weight: 790; color: var(--gd-muted); }
.gd-text-input {
  width: 100%; min-block-size: 42px; padding: 0 12px;
  border-radius: 12px; border: 1px solid var(--gd-line);
  background: var(--gd-surface); font-size: 13px; font-weight: 600;
}
.gd-demo-acct-grid { display: grid; gap: 7px; }
.gd-demo-acct-btn {
  display: flex; align-items: center; justify-content: space-between; gap: 10px;
  width: 100%; text-align: start; padding: 10px 12px; border-radius: 12px;
  border: 1px solid var(--gd-line); background: var(--gd-inner);
}
.gd-demo-acct-btn:hover { background: var(--gd-raised); }
.gd-demo-acct-btn strong { display: block; font-size: 12px; font-weight: 810; }
.gd-demo-acct-btn small { display: block; font-size: 10.5px; color: var(--gd-muted); margin-top: 2px; }

.gd-user-pill {
  display: inline-flex; align-items: center; gap: 7px;
  min-block-size: 40px; padding: 4px 12px; border-radius: 999px;
  border: 1px solid var(--gd-rim); background: var(--gd-primary); color: var(--gd-primary-ink);
  font-size: 11px; font-weight: 800; white-space: nowrap;
}
.gd-user-pill:hover { filter: brightness(1.12); }

@media (max-width: 1120px) {
  .gd-surround { inline-size: calc(100% - 68px); }
  .gd-stage-scroll { padding-inline: 26px; }
  .gd-command-grid { grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); }
  .gd-command-grid > .gd-command-chart { grid-column: 1; }
  .gd-command-side { grid-column: 2; }
  .gd-command-grid > .gd-activity { grid-column: 1 / -1; }
  .gd-shield-grid, .gd-calendar-layout, .gd-college-hero, .gd-login-layout { grid-template-columns: 1fr; }
  .gd-event-feature-grid, .gd-gateway-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .gd-dept-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .gd-nav-links { display: none; }
}
@media (max-width: 820px) {
  .gd-surround { padding-top: 11px; padding-bottom: calc(74px + env(safe-area-inset-bottom)); inline-size: calc(100% - 22px); }
  .gd-top, .gd-top-portal { border-radius: 21px; padding: 7px 9px; gap: 8px; }
  .gd-shield-switch span { display: none; }
  .gd-stage { border-radius: 23px; }
  .gd-stage-scroll { block-size: auto; padding: 15px 13px 18px; overflow: visible; }
  .gd-view-head { align-items: flex-start; flex-direction: column; gap: 10px; margin-bottom: 14px; }
  .gd-command-grid, .gd-analytics-grid, .gd-course-grid, .gd-event-feature-grid, .gd-compare-grid, .gd-gateway-grid, .gd-dept-grid { grid-template-columns: 1fr; }
  .gd-command-side, .gd-command-grid > .gd-activity { grid-column: 1; }
  .gd-metric-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .gd-dock-side { display: none; }
  .gd-dock-bottom { position: fixed; inset: auto 10px calc(8px + env(safe-area-inset-bottom)); translate: none; justify-content: space-between; }
  .gd-dock-bottom a { flex: 1; flex-direction: column; gap: 2px; padding: 3px 4px; min-block-size: 46px; line-height: 1.15; font-size: 9px; }
  .gd-dock-bottom a svg { width: 15px; height: 15px; }
  .gd-dock-bottom .gd-dock-text { display: none; }
  .gd-dock-bottom .gd-dock-short { display: inline; }
  .gd-footer { padding-top: 10px; }
}
@media (prefers-reduced-motion: reduce) {
  .gd-app *, .gd-app *::before, .gd-app *::after { animation-duration: .01ms !important; transition-duration: .01ms !important; }
}
`;
