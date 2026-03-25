export const uiStyles = `    :root {
      --app-height:        100vh;
      --color-bg:          #010208;
      --color-surface:     rgba(7, 5, 2, 0.82);
      --color-surface-2:   rgba(11, 7, 3, 0.88);
      --color-border:      rgba(232, 168, 76, 0.16);
      --color-border-mid:  rgba(232, 168, 76, 0.36);
      --color-accent:      #ffb347;
      --color-accent-soft: #ffc96a;
      --color-dim:         rgba(232, 168, 76, 0.56);
      --color-white:       #f8ead0;
      --color-shadow:      rgba(232, 168, 76, 0.12);

      --font-ui:           "Jura", sans-serif;
      --font-mono:         ui-monospace, "SFMono-Regular", "SF Mono", Menlo, Consolas, monospace;

      --header-height:     64px;
      --terminal-max-w:    980px;
      --terminal-pad:      18px;
    }

    *, *::before, *::after {
      box-sizing: border-box;
    }

    html, body {
      margin: 0;
      padding: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
      overscroll-behavior: none;
      background: var(--color-bg);
      color: var(--color-accent);
      font-family: var(--font-ui);
    }

    body {
      position: relative;
      min-height: var(--app-height);
      height: var(--app-height);
      background: #010208;
    }

    #stars {
      position: fixed;
      inset: 0;
      z-index: 0;
      background: black;
    }

    .nebula {
      position: fixed;
      inset: 0;
      z-index: 1;
      pointer-events: none;
      background:
        radial-gradient(ellipse 55% 35% at 12% 18%, rgba(180,80,20,0.04) 0%, transparent 65%),
        radial-gradient(ellipse 45% 55% at 88% 82%, rgba(120,50,10,0.035) 0%, transparent 65%),
        radial-gradient(ellipse 70% 40% at 65% 30%, rgba(200,120,30,0.025) 0%, transparent 60%),
        radial-gradient(ellipse 90% 60% at 50% 50%, rgba(8,4,2,0.75) 0%, transparent 100%);
    }

    .grain {
      position: fixed;
      inset: 0;
      z-index: 2;
      pointer-events: none;
      opacity: 0.045;
      mix-blend-mode: overlay;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
      background-repeat: repeat;
      background-size: 180px 180px;
    }

    .grid {
      position: fixed;
      inset: 0;
      z-index: 1;
      pointer-events: none;
      background-image:
        linear-gradient(rgba(255,179,71,0.009) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,179,71,0.009) 1px, transparent 1px);
      background-size: 80px 80px;
      animation: gridDrift 200s linear infinite;
    }

    .scanline {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      height: 1px;
      z-index: 10;
      background: linear-gradient(90deg, transparent, rgba(232,168,76,0.2), transparent);
      animation: scanPulse 5s ease-in-out infinite;
      pointer-events: none;
    }

    @keyframes gridDrift {
      from { background-position: 0 0; }
      to   { background-position: 80px 80px; }
    }

    @keyframes scanPulse {
      0%, 100% { opacity: 0.28; }
      50%      { opacity: 0.92; }
    }

    #header {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 6;
      height: var(--header-height);
      padding: env(safe-area-inset-top) 18px 0;
      display: grid;
      grid-template-columns: 1fr auto 1fr;
      align-items: center;
      gap: 12px;
      background: linear-gradient(180deg, rgba(7,5,2,0.84), rgba(7,5,2,0.3));
      border-bottom: 1px solid var(--color-border);
      backdrop-filter: blur(8px);
    }

    .headerSlot {
      min-width: 0;
      font-size: 10px;
      letter-spacing: 0.32em;
      text-transform: uppercase;
      color: var(--color-dim);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .headerSlot:last-child {
      text-align: right;
    }

    .frameButton {
      display: inline-flex;
      position: relative;
      align-items: center;
      justify-content: center;
      padding: 12px 20px;
      min-height: 42px;
      color: var(--color-accent);
      background: transparent;
      border: 0;
      cursor: pointer;
      font-family: var(--font-ui);
      font-size: 10px;
      letter-spacing: 0.3em;
      text-transform: uppercase;
      transition: color 0.35s ease, transform 0.35s ease;
      isolation: isolate;
      -webkit-tap-highlight-color: transparent;
    }

    .frameButton::before,
    .frameButton::after {
      content: "";
      position: absolute;
      width: 10px;
      height: 10px;
      opacity: 0.45;
      transition: width 0.35s ease, height 0.35s ease, opacity 0.35s ease;
      pointer-events: none;
    }

    .frameButton::before {
      top: 0;
      left: 0;
      border-top: 1px solid var(--color-accent);
      border-left: 1px solid var(--color-accent);
    }

    .frameButton::after {
      right: 0;
      bottom: 0;
      border-right: 1px solid var(--color-accent);
      border-bottom: 1px solid var(--color-accent);
    }

    .frameButton:hover,
    .frameButton:focus-visible {
      color: var(--color-accent-soft);
      outline: none;
      transform: translateY(-1px);
    }

    .frameButton:hover::before,
    .frameButton:hover::after,
    .frameButton:focus-visible::before,
    .frameButton:focus-visible::after {
      width: 100%;
      height: 100%;
      opacity: 1;
    }

    .frameButton-inner {
      position: relative;
      z-index: 1;
    }

    #terminalWrap {
      position: relative;
      z-index: 5;
      display: flex;
      justify-content: center;
      align-items: stretch;
      min-height: var(--app-height);
      padding: calc(var(--header-height) + env(safe-area-inset-top) + 18px) 18px calc(16px + env(safe-area-inset-bottom));
    }

    #terminalShell {
      position: relative;
      width: min(100%, var(--terminal-max-w));
      height: calc(var(--app-height) - var(--header-height) - env(safe-area-inset-top) - env(safe-area-inset-bottom) - 34px);
      min-height: 0;
      display: flex;
      flex-direction: column;
      gap: 14px;
      padding: var(--terminal-pad);
      background:
        linear-gradient(180deg, rgba(255, 214, 154, 0.012), rgba(255, 214, 154, 0.003) 22%, rgba(8, 4, 2, 0.012) 48%, rgba(4, 3, 2, 0.018) 100%),
        linear-gradient(135deg, rgba(255, 223, 170, 0.01), rgba(255, 223, 170, 0.002) 28%, rgba(8, 4, 2, 0.006) 56%, rgba(4, 3, 2, 0.012) 100%);
      border: 1px solid var(--color-border);
      box-shadow:
        0 18px 54px rgba(0, 0, 0, 0.08),
        0 0 16px rgba(232, 168, 76, 0.02),
        inset 0 1px 0 rgba(255, 223, 170, 0.04),
        inset 0 -1px 0 rgba(0, 0, 0, 0.06);
      backdrop-filter: blur(2px) saturate(108%);
      overflow: hidden;
    }

    #terminalShell::before,
    #terminalShell::after {
      content: "";
      position: absolute;
      pointer-events: none;
    }

    #terminalShell::before {
      inset: 0;
      background:
        linear-gradient(180deg, rgba(255, 233, 196, 0.028), rgba(255, 233, 196, 0.006) 18%, transparent 36%),
        radial-gradient(circle at 14% 8%, rgba(255, 236, 205, 0.028), transparent 28%),
        radial-gradient(circle at 82% 0%, rgba(255, 217, 145, 0.02), transparent 26%);
      mix-blend-mode: screen;
      opacity: 0.42;
      z-index: 0;
    }

    #terminalShell::after {
      inset: 14px;
      border: 1px solid rgba(232, 168, 76, 0.05);
      pointer-events: none;
    }

    #terminalShell::after {
      box-shadow: inset 0 0 0 1px rgba(255, 226, 179, 0.012);
    }

    #terminalShell > * {
      position: relative;
      z-index: 1;
    }

    #terminalMeta::after {
      content: "";
      flex: 1 1 auto;
      min-width: 24px;
      height: 1px;
      align-self: center;
      background: linear-gradient(90deg, rgba(232,168,76,0.14), transparent);
    }

    #terminalMeta {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      align-items: center;
      padding-bottom: 2px;
    }

    .metaItem {
      border: 1px solid rgba(232,168,76,0.16);
      padding: 7px 10px;
      font-size: 9px;
      letter-spacing: 0.22em;
      text-transform: uppercase;
      color: var(--color-dim);
      background: rgba(10, 6, 3, 0.36);
    }

    #log {
      flex: 1;
      min-height: 0;
      overflow-y: auto;
      padding: 18px;
      border: 1px solid rgba(232, 168, 76, 0.16);
      background:
        linear-gradient(180deg, rgba(255, 229, 184, 0.006), rgba(255, 229, 184, 0.002) 16%, rgba(1, 2, 8, 0.004) 36%, rgba(1, 2, 8, 0.008) 100%),
        rgba(1, 2, 8, 0.006);
      white-space: pre-wrap;
      line-height: 1.72;
      scroll-behavior: smooth;
      overscroll-behavior: contain;
      -webkit-overflow-scrolling: touch;
      font-family: var(--font-mono);
      font-size: 14px;
      box-shadow:
        inset 0 1px 0 rgba(255, 227, 183, 0.025),
        inset 0 0 8px rgba(0, 0, 0, 0.02);
      backdrop-filter: blur(0.75px);
    }

    #log::-webkit-scrollbar {
      width: 8px;
    }

    #log::-webkit-scrollbar-thumb {
      background: rgba(232, 168, 76, 0.22);
      border-radius: 999px;
    }

    #inputDock {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .inputLabel {
      font-size: 9px;
      letter-spacing: 0.28em;
      text-transform: uppercase;
      color: var(--color-dim);
    }

    #inputRow {
      display: grid;
      grid-template-columns: minmax(0, 1fr) auto;
      gap: 12px;
      align-items: stretch;
    }

    #input {
      min-width: 0;
      background: rgba(0, 0, 0, 0.32);
      border: 1px solid var(--color-border-mid);
      color: var(--color-white);
      padding: 14px 16px;
      font-family: var(--font-mono);
      font-size: 14px;
      outline: none;
      border-radius: 0;
      box-shadow: inset 0 0 0 1px rgba(255,255,255,0.01);
    }

    #input::placeholder {
      color: rgba(232,168,76,0.34);
      letter-spacing: 0.12em;
    }

    #input:focus {
      border-color: rgba(232,168,76,0.64);
      box-shadow: 0 0 0 1px rgba(232,168,76,0.16);
    }

    #send {
      min-width: 142px;
    }

    .system { color: var(--color-dim); }
    .user   { color: var(--color-white); }
    .furai  { color: var(--color-accent); }

    .cursor {
      display: inline-block;
      margin-left: 3px;
      animation: blink 1s infinite;
    }

    @keyframes blink {
      0%, 100% { opacity: 1; }
      50%      { opacity: 0; }
    }

    #thinkingCore {
      position: fixed;
      left: 22px;
      bottom: calc(20px + env(safe-area-inset-bottom));
      width: 16px;
      height: 16px;
      z-index: 8;
      border-radius: 50%;
      background: var(--color-accent);
      box-shadow: 0 0 10px var(--color-accent);
      animation: pulse 3s infinite;
      opacity: 0;
      transition: opacity 0.3s;
      display: none;
    }

    @keyframes pulse {
      0%, 100% { transform: scale(0.82); opacity: 0.25; }
      50%      { transform: scale(1.18); opacity: 0.52; }
    }

    .meditation #terminalShell {
      opacity: 0.28;
    }

    @media (max-width: 820px) {
      :root {
        --header-height: 56px;
        --terminal-pad: 14px;
      }

      #header {
        padding-left: 12px;
        padding-right: 12px;
        gap: 8px;
      }

      .headerSlot {
        font-size: 9px;
        letter-spacing: 0.24em;
      }

      .frameButton {
        padding: 11px 14px;
        font-size: 9px;
        letter-spacing: 0.22em;
      }

      #terminalWrap {
        padding-left: 10px;
        padding-right: 10px;
        padding-bottom: calc(10px + env(safe-area-inset-bottom));
      }

      #terminalShell {
        height: calc(var(--app-height) - var(--header-height) - env(safe-area-inset-top) - env(safe-area-inset-bottom) - 18px);
      }

      #log {
        padding: 14px;
        font-size: 13px;
      }
    }

    @media (max-width: 640px) {
      #header {
        grid-template-columns: 1fr auto;
      }

      .headerSlot:last-child {
        display: none;
      }

      #terminalMeta {
        gap: 6px;
      }

      .metaItem {
        font-size: 8px;
        letter-spacing: 0.18em;
        padding: 6px 8px;
      }

      #inputRow {
        grid-template-columns: 1fr;
      }

      #send {
        width: 100%;
        min-width: 0;
      }

      #input {
        font-size: 16px;
      }
    }`
