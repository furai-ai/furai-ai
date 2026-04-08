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
      --terminal-max-w:    860px;
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
        radial-gradient(ellipse 55% 35% at 12% 18%, rgba(180,80,20,0.03) 0%, transparent 65%),
        radial-gradient(ellipse 45% 55% at 88% 82%, rgba(120,50,10,0.028) 0%, transparent 65%),
        radial-gradient(ellipse 70% 40% at 65% 30%, rgba(200,120,30,0.02) 0%, transparent 60%),
        radial-gradient(ellipse 90% 60% at 50% 50%, rgba(8,4,2,0.58) 0%, transparent 100%);
    }

    #ambientVisual {
      position: fixed;
      inset: 0;
      z-index: 1;
      overflow: hidden;
      pointer-events: none;
      opacity: 0;
      transition: opacity 2.2s ease;
    }

    #ambientVisual::after {
      content: "";
      position: absolute;
      inset: 0;
      background:
        radial-gradient(circle at 18% 22%, rgba(255, 196, 116, 0.16), transparent 28%),
        radial-gradient(circle at 82% 76%, rgba(255, 175, 92, 0.12), transparent 24%),
        linear-gradient(180deg, rgba(1, 2, 8, 0.08), rgba(1, 2, 8, 0.46) 38%, rgba(1, 2, 8, 0.72) 100%);
    }

    #ambientVisual img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transform: scale(1.08);
      filter: blur(24px) saturate(0.84) brightness(0.4) contrast(1.06);
      opacity: 0.88;
      animation: ambientFloat 38s linear infinite;
    }

    #ambientVisual.is-active {
      opacity: 0.82;
    }

    @keyframes ambientFloat {
      0%   { transform: scale(1.08) translate3d(0, 0, 0); }
      50%  { transform: scale(1.13) translate3d(-1.4%, -1.1%, 0); }
      100% { transform: scale(1.08) translate3d(0, 0, 0); }
    }

    .grain {
      position: fixed;
      inset: 0;
      z-index: 2;
      pointer-events: none;
      opacity: 0.034;
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
        linear-gradient(rgba(255,179,71,0.006) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,179,71,0.006) 1px, transparent 1px);
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
      background: linear-gradient(90deg, transparent, rgba(232,168,76,0.12), transparent);
      animation: scanPulse 5s ease-in-out infinite;
      pointer-events: none;
    }

    #sceneVisual {
      position: fixed;
      right: 24px;
      bottom: calc(34px + env(safe-area-inset-bottom));
      z-index: 7;
      width: min(34vw, 390px);
      pointer-events: none;
      opacity: 0;
      transform: translateY(14px);
      transition: opacity 0.9s ease, transform 0.9s ease;
    }

    #sceneVisual.is-active {
      opacity: 1;
      transform: translateY(0);
    }

    .sceneFrame {
      display: flex;
      flex-direction: column;
      gap: 10px;
      padding: 14px;
      background:
        linear-gradient(180deg, rgba(13, 8, 4, 0.84), rgba(6, 4, 2, 0.7)),
        rgba(8, 5, 2, 0.72);
      border: 1px solid rgba(232, 168, 76, 0.18);
      box-shadow:
        0 18px 38px rgba(0, 0, 0, 0.26),
        inset 0 1px 0 rgba(255, 233, 196, 0.04);
      backdrop-filter: blur(10px);
    }

    .sceneMetaRow {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
    }

    .sceneLabel {
      font-size: 9px;
      letter-spacing: 0.28em;
      text-transform: uppercase;
      color: rgba(255, 201, 106, 0.76);
    }

    .sceneTimer {
      flex: 0 0 auto;
      padding: 4px 8px;
      border: 1px solid rgba(255, 201, 106, 0.22);
      font-size: 9px;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: rgba(248, 234, 208, 0.86);
      background: rgba(0, 0, 0, 0.2);
      font-family: var(--font-mono);
    }

    .sceneImageShell {
      position: relative;
      overflow: hidden;
      aspect-ratio: 4 / 3;
      border: 1px solid rgba(232, 168, 76, 0.16);
      background: rgba(0, 0, 0, 0.3);
    }

    .sceneImageShell::after {
      content: "";
      position: absolute;
      inset: 0;
      background:
        linear-gradient(180deg, rgba(255, 219, 168, 0.06), transparent 34%, rgba(0, 0, 0, 0.18) 100%);
      pointer-events: none;
    }

    .sceneImageShell img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      filter: saturate(0.94) contrast(1.04) brightness(0.92);
      transform: scale(1.01);
    }

    #sceneVisual[data-asset-kind="official_portrait"] .sceneImageShell {
      background:
        radial-gradient(circle at 50% 24%, rgba(255, 191, 96, 0.18), transparent 48%),
        rgba(17, 10, 3, 0.88);
    }

    #sceneVisual[data-asset-kind="official_portrait"] .sceneImageShell::after {
      background:
        linear-gradient(180deg, rgba(255, 214, 149, 0.16), rgba(120, 62, 12, 0.08) 38%, rgba(0, 0, 0, 0.3) 100%);
    }

    #sceneVisual[data-asset-kind="official_portrait"] .sceneImageShell img {
      filter: grayscale(1) sepia(1) saturate(4.2) hue-rotate(338deg) brightness(0.76) contrast(1.14);
    }

    .sceneCaption {
      font-family: var(--font-mono);
      font-size: 12px;
      line-height: 1.5;
      color: rgba(248, 234, 208, 0.82);
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
      background: linear-gradient(180deg, rgba(7,5,2,0.62), rgba(7,5,2,0.12));
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
      padding: calc(var(--header-height) + env(safe-area-inset-top) + 24px) 24px calc(24px + env(safe-area-inset-bottom));
    }

    #terminalShell {
      position: relative;
      width: min(100%, var(--terminal-max-w));
      height: min(76vh, calc(var(--app-height) - var(--header-height) - env(safe-area-inset-top) - env(safe-area-inset-bottom) - 48px));
      min-height: 0;
      display: flex;
      flex-direction: column;
      gap: 14px;
      padding: var(--terminal-pad);
      background:
        linear-gradient(180deg, rgba(255, 214, 154, 0.004), rgba(255, 214, 154, 0.001) 22%, rgba(8, 4, 2, 0.004) 48%, rgba(4, 3, 2, 0.006) 100%),
        linear-gradient(135deg, rgba(255, 223, 170, 0.004), rgba(255, 223, 170, 0.001) 28%, rgba(8, 4, 2, 0.003) 56%, rgba(4, 3, 2, 0.006) 100%);
      border: 1px solid var(--color-border);
      box-shadow:
        0 12px 34px rgba(0, 0, 0, 0.05),
        0 0 12px rgba(232, 168, 76, 0.015),
        inset 0 1px 0 rgba(255, 223, 170, 0.02),
        inset 0 -1px 0 rgba(0, 0, 0, 0.03);
      backdrop-filter: blur(1.25px) saturate(106%);
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
        linear-gradient(180deg, rgba(255, 233, 196, 0.016), rgba(255, 233, 196, 0.003) 18%, transparent 36%),
        radial-gradient(circle at 14% 8%, rgba(255, 236, 205, 0.014), transparent 28%),
        radial-gradient(circle at 82% 0%, rgba(255, 217, 145, 0.01), transparent 26%);
      mix-blend-mode: screen;
      opacity: 0.28;
      z-index: 0;
    }

    #terminalShell::after {
      inset: 14px;
      border: 1px solid rgba(232, 168, 76, 0.035);
      pointer-events: none;
    }

    #terminalShell::after {
      box-shadow: inset 0 0 0 1px rgba(255, 226, 179, 0.008);
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
      background: rgba(10, 6, 3, 0.16);
    }

    #log {
      flex: 1;
      min-height: 0;
      overflow-y: auto;
      padding: 18px;
      border: 1px solid rgba(232, 168, 76, 0.12);
      background:
        linear-gradient(180deg, rgba(255, 229, 184, 0.002), rgba(255, 229, 184, 0.0008) 16%, rgba(1, 2, 8, 0.0012) 36%, rgba(1, 2, 8, 0.0024) 100%),
        rgba(1, 2, 8, 0.0016);
      white-space: pre-wrap;
      line-height: 1.72;
      scroll-behavior: smooth;
      overscroll-behavior: contain;
      -webkit-overflow-scrolling: touch;
      font-family: var(--font-mono);
      font-size: 14px;
      box-shadow:
        inset 0 1px 0 rgba(255, 227, 183, 0.012),
        inset 0 0 6px rgba(0, 0, 0, 0.01);
      backdrop-filter: blur(0.35px);
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
      background: rgba(0, 0, 0, 0.16);
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
      opacity: 0.07;
      border-color: rgba(232, 168, 76, 0.06);
      box-shadow: none;
      backdrop-filter: blur(0.2px) saturate(102%);
    }

    .meditation #header {
      opacity: 0.16;
      border-bottom-color: rgba(232, 168, 76, 0.04);
      backdrop-filter: blur(2px);
    }

    .meditation #terminalMeta,
    .meditation #inputDock {
      opacity: 0.05;
    }

    .meditation #log {
      border-color: rgba(232, 168, 76, 0.03);
      background: rgba(1, 2, 8, 0.0001);
      box-shadow: none;
    }

    .meditation .nebula {
      opacity: 0.85;
    }

    .meditation #ambientVisual {
      opacity: 0.18;
    }

    .meditation #sceneVisual {
      opacity: 0.08;
    }

    .meditation .grain {
      opacity: 0.018;
    }

    .meditation .grid {
      opacity: 0.35;
    }

    .meditation .scanline {
      opacity: 0.08;
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
        padding-bottom: calc(12px + env(safe-area-inset-bottom));
      }

      #terminalShell {
        height: calc(var(--app-height) - var(--header-height) - env(safe-area-inset-top) - env(safe-area-inset-bottom) - 26px);
      }

      #log {
        padding: 14px;
        font-size: 13px;
      }

      #sceneVisual {
        right: 12px;
        bottom: calc(18px + env(safe-area-inset-bottom));
        width: min(42vw, 320px);
      }
    }

    @media (max-width: 640px) {
      #header {
        grid-template-columns: 1fr auto;
      }

      #terminalWrap {
        padding-top: calc(var(--header-height) + env(safe-area-inset-top) + 18px);
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

      #ambientVisual img {
        filter: blur(18px) saturate(0.82) brightness(0.38) contrast(1.04);
      }

      #sceneVisual {
        left: 10px;
        right: 10px;
        bottom: calc(12px + env(safe-area-inset-bottom));
        width: auto;
      }

      .sceneFrame {
        padding: 12px;
      }
    }`
