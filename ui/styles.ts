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
      --meditation-transition-ms: 5000ms;
      --ease-cinematic:    cubic-bezier(0.22, 1, 0.36, 1);
      --ease-soft:         cubic-bezier(0.32, 0.08, 0.24, 1);
      --meditation-stage-1: 1000ms;
      --meditation-stage-2: 2500ms;
      --meditation-stage-3: 3800ms;
    }

    @supports (height: 100svh) {
      :root {
        --app-height: 100svh;
      }
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
      touch-action: manipulation;
      --meditation-shell-delay: 0ms;
      --meditation-header-delay: 0ms;
      --meditation-chrome-delay: 0ms;
      --meditation-log-delay: 0ms;
      --meditation-overlay-delay: 0ms;
      --meditation-cursor-blink-ms: 1000ms;
      --meditation-bloom-opacity: 0;
      --meditation-bloom-scale: 0.92;
      --meditation-star-filter: brightness(1) contrast(1) saturate(1);
    }

    body::before {
      content: "";
      position: fixed;
      inset: -12%;
      z-index: 4;
      pointer-events: none;
      opacity: var(--meditation-bloom-opacity);
      transform: scale(var(--meditation-bloom-scale)) translate3d(0, 0, 0);
      background:
        radial-gradient(circle at 50% 40%, rgba(255, 214, 149, 0.18) 0%, rgba(255, 191, 96, 0.1) 24%, rgba(20, 11, 5, 0.06) 44%, transparent 72%),
        radial-gradient(circle at 50% 60%, rgba(7, 5, 2, 0.42) 0%, transparent 58%);
      filter: blur(52px);
      transition:
        opacity 1400ms var(--ease-soft),
        transform 2600ms var(--ease-cinematic),
        filter 2600ms var(--ease-soft);
    }

    body::after {
      content: "";
      position: fixed;
      inset: 0;
      z-index: 9;
      pointer-events: none;
      opacity: 0;
      background:
        radial-gradient(circle at 50% 42%, rgba(32, 18, 6, 0.18), rgba(2, 2, 6, 0.58) 48%, rgba(0, 0, 0, 0.94) 100%),
        linear-gradient(180deg, rgba(0, 0, 0, 0.16), rgba(0, 0, 0, 0.82));
      transition: opacity var(--meditation-transition-ms) var(--ease-soft);
      transition-delay: var(--meditation-overlay-delay);
    }

    #stars {
      position: fixed;
      inset: 0;
      z-index: 0;
      background: black;
      filter: var(--meditation-star-filter);
      transition: filter var(--meditation-transition-ms) var(--ease-soft);
    }

    .nebula {
      position: fixed;
      inset: 0;
      z-index: 1;
      pointer-events: none;
      opacity: 1;
      filter: saturate(1) brightness(1);
      background:
        radial-gradient(ellipse 55% 35% at 12% 18%, rgba(180,80,20,0.03) 0%, transparent 65%),
        radial-gradient(ellipse 45% 55% at 88% 82%, rgba(120,50,10,0.028) 0%, transparent 65%),
        radial-gradient(ellipse 70% 40% at 65% 30%, rgba(200,120,30,0.02) 0%, transparent 60%),
        radial-gradient(ellipse 90% 60% at 50% 50%, rgba(8,4,2,0.58) 0%, transparent 100%);
      transition: opacity var(--meditation-transition-ms) var(--ease-soft), filter var(--meditation-transition-ms) var(--ease-soft);
      transition-delay: var(--meditation-overlay-delay);
    }

    #ambientVisual {
      position: fixed;
      inset: 0;
      z-index: 1;
      overflow: hidden;
      pointer-events: none;
      opacity: 0;
      filter: saturate(1) brightness(1);
      transition: opacity 2.2s var(--ease-soft), filter var(--meditation-transition-ms) var(--ease-soft);
      transition-delay: var(--meditation-overlay-delay);
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
      transition: opacity var(--meditation-transition-ms) var(--ease-soft);
      transition-delay: var(--meditation-overlay-delay);
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
      opacity: 1;
      animation: gridDrift 200s linear infinite;
      transition: opacity var(--meditation-transition-ms) var(--ease-soft);
      transition-delay: var(--meditation-overlay-delay);
    }

    .scanline {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      height: 1px;
      z-index: 10;
      background: linear-gradient(90deg, transparent, rgba(232,168,76,0.12), transparent);
      opacity: 1;
      animation: scanPulse 5s ease-in-out infinite;
      pointer-events: none;
      transition: opacity var(--meditation-transition-ms) var(--ease-soft);
      transition-delay: var(--meditation-overlay-delay);
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
      filter: brightness(1) saturate(1);
      transition:
        opacity 0.9s var(--ease-soft),
        transform 0.9s var(--ease-cinematic),
        filter var(--meditation-transition-ms) var(--ease-soft);
      transition-delay: var(--meditation-overlay-delay);
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
      height: calc(var(--header-height) + env(safe-area-inset-top));
      padding:
        calc(env(safe-area-inset-top) + 10px)
        calc(18px + env(safe-area-inset-right))
        10px
        calc(18px + env(safe-area-inset-left));
      display: flex;
      align-items: center;
      justify-content: flex-start;
      background: linear-gradient(180deg, rgba(7, 5, 2, 0.44), rgba(7, 5, 2, 0.12) 72%, rgba(7, 5, 2, 0));
      backdrop-filter: blur(10px);
      transform: translateY(0);
      filter: brightness(1) saturate(1);
      transition:
        opacity var(--meditation-transition-ms) var(--ease-soft),
        backdrop-filter var(--meditation-transition-ms) var(--ease-soft),
        transform var(--meditation-transition-ms) var(--ease-cinematic),
        filter var(--meditation-transition-ms) var(--ease-soft);
      transition-delay: var(--meditation-header-delay);
    }

    #meditationControlLayer {
      position: fixed;
      top: 0;
      right: 0;
      z-index: 12;
      display: flex;
      justify-content: flex-end;
      padding:
        calc(env(safe-area-inset-top) + 10px)
        calc(18px + env(safe-area-inset-right))
        10px
        calc(18px + env(safe-area-inset-left));
      pointer-events: none;
      opacity: 0.92;
      transform: translateY(0);
      transition:
        opacity var(--meditation-transition-ms) var(--ease-soft),
        transform var(--meditation-transition-ms) var(--ease-cinematic),
        filter var(--meditation-transition-ms) var(--ease-soft);
    }

    #meditationControlLayer .meditationSwitch {
      pointer-events: auto;
    }

    #header::after {
      content: "";
      position: absolute;
      left: calc(18px + env(safe-area-inset-left));
      right: calc(18px + env(safe-area-inset-right));
      bottom: 0;
      height: 1px;
      background: linear-gradient(
        90deg,
        transparent 0%,
        rgba(232, 168, 76, 0.12) 5%,
        rgba(232, 168, 76, 0.28) 50%,
        rgba(232, 168, 76, 0.12) 95%,
        transparent 100%
      );
      box-shadow: 0 0 10px rgba(232, 168, 76, 0.06);
      pointer-events: none;
      transition:
        background var(--meditation-transition-ms) var(--ease-soft),
        box-shadow var(--meditation-transition-ms) var(--ease-soft),
        opacity var(--meditation-transition-ms) var(--ease-soft);
      transition-delay: var(--meditation-header-delay);
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
      text-decoration: none;
    }

    .frameButton:disabled {
      cursor: default;
      opacity: 0.62;
      transform: none;
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

    .frameButton-secondary {
      color: rgba(248, 234, 208, 0.72);
    }

    .headerLink {
      justify-self: start;
      display: inline-flex;
      align-items: center;
      min-height: 40px;
      color: rgba(248, 234, 208, 0.84);
      font-size: 10px;
      letter-spacing: 0.34em;
      text-transform: uppercase;
      text-decoration: none;
      transition: color 0.3s ease, opacity 0.3s ease, transform 0.3s ease;
      -webkit-tap-highlight-color: transparent;
    }

    .headerLink:hover,
    .headerLink:focus-visible {
      color: rgba(255, 214, 149, 0.96);
      opacity: 1;
      outline: none;
      transform: translateY(-1px);
    }

    .meditationSwitch {
      position: relative;
      justify-self: end;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-height: 40px;
      padding: 7px 10px 7px 16px;
      border: 1px solid rgba(232, 168, 76, 0.2);
      border-radius: 999px;
      color: rgba(248, 234, 208, 0.92);
      background:
        linear-gradient(180deg, rgba(34, 23, 10, 0.72), rgba(11, 8, 4, 0.5)),
        rgba(5, 4, 2, 0.24);
      box-shadow:
        inset 0 1px 0 rgba(255, 236, 205, 0.08),
        inset 0 -1px 0 rgba(0, 0, 0, 0.18),
        0 12px 28px rgba(0, 0, 0, 0.22),
        0 0 16px rgba(232, 168, 76, 0.06),
        0 0 30px rgba(255, 191, 96, 0.03);
      backdrop-filter: blur(16px) saturate(118%);
      cursor: pointer;
      font-family: var(--font-ui);
      font-size: 10px;
      letter-spacing: 0.24em;
      text-transform: uppercase;
      isolation: isolate;
      transform: translateZ(0);
      transition:
        color 700ms var(--ease-soft),
        border-color 700ms var(--ease-soft),
        background 700ms var(--ease-soft),
        box-shadow 900ms var(--ease-soft),
        backdrop-filter 900ms var(--ease-soft),
        transform 1100ms var(--ease-cinematic);
      -webkit-tap-highlight-color: transparent;
    }

    .meditationSwitch::before,
    .meditationSwitch::after {
      content: "";
      position: absolute;
      border-radius: inherit;
      pointer-events: none;
      transition:
        opacity 900ms var(--ease-soft),
        transform 1100ms var(--ease-cinematic);
    }

    .meditationSwitch::before {
      inset: -16px;
      z-index: -2;
      background:
        radial-gradient(circle at 74% 50%, rgba(255, 191, 96, 0.2), transparent 36%),
        radial-gradient(circle at 24% 50%, rgba(255, 220, 164, 0.08), transparent 42%);
      filter: blur(24px);
      opacity: 0.26;
      transform: scale(0.92);
    }

    .meditationSwitch::after {
      inset: 1px;
      z-index: -1;
      background: linear-gradient(180deg, rgba(255, 239, 213, 0.08), rgba(255, 239, 213, 0.02) 42%, rgba(0, 0, 0, 0.16) 100%);
      opacity: 0.86;
    }

    .meditationSwitch-inner {
      display: inline-flex;
      align-items: center;
      gap: 12px;
      white-space: nowrap;
    }

    .meditationSwitch:hover,
    .meditationSwitch:focus-visible {
      color: rgba(255, 220, 164, 0.98);
      border-color: rgba(255, 205, 118, 0.32);
      box-shadow:
        inset 0 1px 0 rgba(255, 236, 205, 0.1),
        inset 0 -1px 0 rgba(0, 0, 0, 0.18),
        0 16px 34px rgba(0, 0, 0, 0.22),
        0 0 24px rgba(232, 168, 76, 0.1),
        0 0 42px rgba(255, 191, 96, 0.05);
      outline: none;
      backdrop-filter: blur(16px) saturate(120%);
      transform: translateY(-0.5px);
    }

    .meditationSwitch:hover::before,
    .meditationSwitch:focus-visible::before {
      opacity: 0.34;
      transform: scale(0.98);
    }

    .meditationSwitch:disabled {
      cursor: default;
      opacity: 0.68;
    }

    .meditationSwitch-label {
      transition: color 700ms var(--ease-soft), text-shadow 900ms var(--ease-soft);
    }

    .meditationSwitch-track {
      position: relative;
      width: 40px;
      height: 22px;
      flex: 0 0 auto;
      border: 1px solid rgba(232, 168, 76, 0.28);
      border-radius: 999px;
      background:
        linear-gradient(180deg, rgba(255, 225, 178, 0.08), rgba(0, 0, 0, 0.2)),
        rgba(7, 5, 2, 0.84);
      box-shadow:
        inset 0 0 0 1px rgba(255, 226, 179, 0.04),
        inset 0 6px 10px rgba(0, 0, 0, 0.16),
        0 0 14px rgba(232, 168, 76, 0.05),
        0 0 24px rgba(255, 191, 96, 0.025);
      overflow: visible;
      transition:
        border-color 700ms var(--ease-soft),
        background 700ms var(--ease-soft),
        box-shadow 900ms var(--ease-soft);
    }

    .meditationSwitch-track::before,
    .meditationSwitch-track::after {
      content: "";
      position: absolute;
      pointer-events: none;
      transition:
        opacity 900ms var(--ease-soft),
        transform 1100ms var(--ease-cinematic);
    }

    .meditationSwitch-track::before {
      top: 50%;
      left: 6px;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(255, 196, 116, 0.36) 0%, rgba(255, 196, 116, 0.12) 46%, transparent 76%);
      filter: blur(12px);
      opacity: 0.36;
      transform: translateY(-50%);
    }

    .meditationSwitch-track::after {
      inset: 1px;
      border-radius: inherit;
      background: linear-gradient(180deg, rgba(255, 237, 202, 0.08), transparent 42%, rgba(0, 0, 0, 0.12));
      opacity: 0.68;
    }

    .meditationSwitch-thumb {
      position: absolute;
      top: 2px;
      left: 2px;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background:
        radial-gradient(circle at 34% 30%, rgba(255, 246, 226, 0.92), rgba(255, 222, 170, 0.72) 38%, rgba(223, 170, 101, 0.98) 100%);
      box-shadow:
        inset 0 1px 0 rgba(255, 255, 255, 0.46),
        inset 0 -1px 2px rgba(134, 82, 23, 0.22),
        0 1px 4px rgba(0, 0, 0, 0.42),
        0 0 12px rgba(232, 168, 76, 0.16),
        0 0 22px rgba(255, 201, 106, 0.06);
      transition:
        transform 1100ms var(--ease-cinematic),
        background 700ms var(--ease-soft),
        box-shadow 900ms var(--ease-soft);
    }

    .meditationSwitch-thumb::after {
      content: "";
      position: absolute;
      inset: 2px;
      border-radius: inherit;
      background: radial-gradient(circle at 36% 28%, rgba(255, 255, 255, 0.48), transparent 42%);
      opacity: 0.7;
    }

    .meditationSwitch[aria-checked="true"] .meditationSwitch-label {
      color: rgba(255, 220, 164, 0.98);
      text-shadow:
        0 0 14px rgba(255, 179, 71, 0.22),
        0 0 28px rgba(255, 191, 96, 0.08);
    }

    .meditationSwitch[aria-checked="true"]::before {
      opacity: 0.58;
      transform: scale(1.02);
    }

    .meditationSwitch[aria-checked="true"] .meditationSwitch-track {
      border-color: rgba(255, 201, 106, 0.7);
      background:
        linear-gradient(180deg, rgba(255, 214, 149, 0.28), rgba(255, 179, 71, 0.08)),
        rgba(17, 10, 3, 0.78);
      box-shadow:
        inset 0 0 0 1px rgba(255, 226, 179, 0.06),
        inset 0 8px 12px rgba(63, 35, 8, 0.14),
        0 0 18px rgba(232, 168, 76, 0.14),
        0 0 30px rgba(255, 179, 71, 0.14),
        0 0 52px rgba(255, 191, 96, 0.07);
    }

    .meditationSwitch[aria-checked="true"] .meditationSwitch-track::before {
      opacity: 0.62;
      transform: translate(18px, -50%) scale(1.26);
    }

    .meditationSwitch[aria-checked="true"] .meditationSwitch-thumb {
      transform: translateX(18px);
      background:
        radial-gradient(circle at 34% 28%, rgba(255, 249, 232, 0.98), rgba(255, 232, 184, 0.84) 40%, rgba(244, 187, 102, 0.98) 100%);
      box-shadow:
        inset 0 1px 0 rgba(255, 255, 255, 0.54),
        inset 0 -1px 3px rgba(148, 86, 23, 0.28),
        0 2px 5px rgba(0, 0, 0, 0.42),
        0 0 14px rgba(255, 201, 106, 0.44),
        0 0 28px rgba(232, 168, 76, 0.22),
        0 0 40px rgba(255, 214, 149, 0.08);
    }

    .welcomePage,
    .pricingPage {
      overflow: hidden;
    }

    html:has(body.pricingPage) {
      height: auto;
      min-height: 100%;
      overflow-y: auto;
    }

    body.pricingPage {
      height: auto;
      min-height: 100%;
      overflow-y: auto;
    }

    .welcomeShell,
    .pricingShell {
      position: relative;
      z-index: 5;
      width: min(100%, 980px);
      min-height: var(--app-height);
      margin: 0 auto;
      padding:
        calc(72px + env(safe-area-inset-top))
        calc(24px + env(safe-area-inset-right))
        calc(48px + env(safe-area-inset-bottom))
        calc(24px + env(safe-area-inset-left));
    }

    .welcomeShell {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
    }

    .welcomeMark {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 12px;
      margin-bottom: 28px;
      opacity: 0.82;
      animation: welcomeReveal 1.6s cubic-bezier(0.16, 1, 0.3, 1) both;
    }

    .welcomeMark span {
      width: 48px;
      height: 1px;
      background: linear-gradient(90deg, transparent, rgba(232,168,76,0.5));
    }

    .welcomeMark span:last-child {
      transform: scaleX(-1);
    }

    .welcomeMark i {
      width: 6px;
      height: 6px;
      border: 1px solid rgba(232,168,76,0.6);
      transform: rotate(45deg);
      animation: glyphBreathe 3.5s ease-in-out infinite;
    }

    .welcomeKicker {
      margin: 0 0 16px;
      font-size: 10px;
      letter-spacing: 0.34em;
      text-transform: uppercase;
      color: rgba(232, 168, 76, 0.58);
      animation: welcomeReveal 1.6s 0.08s cubic-bezier(0.16, 1, 0.3, 1) both;
    }

    .welcomeShell h1,
    .pricingHeader h1 {
      margin: 0;
      font-size: clamp(52px, 13vw, 118px);
      line-height: 0.9;
      font-weight: 300;
      letter-spacing: 0;
      color: rgba(255, 195, 106, 0.98);
      text-shadow: 0 0 30px rgba(255, 179, 71, 0.08);
      animation: welcomeReveal 1.6s 0.16s cubic-bezier(0.16, 1, 0.3, 1) both;
    }

    .welcomeCopy,
    .pricingHeader p:last-child {
      max-width: 620px;
      margin: 24px auto 0;
      font-family: var(--font-mono);
      font-size: 14px;
      line-height: 1.8;
      color: rgba(248, 234, 208, 0.66);
      animation: welcomeReveal 1.6s 0.24s cubic-bezier(0.16, 1, 0.3, 1) both;
    }

    .welcomeActions {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 16px;
      margin-top: 34px;
      animation: welcomeReveal 1.6s 0.34s cubic-bezier(0.16, 1, 0.3, 1) both;
    }

    .welcomeMeta {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 14px 22px;
      margin-top: 44px;
      font-size: 9px;
      letter-spacing: 0.26em;
      text-transform: uppercase;
      color: rgba(232, 168, 76, 0.28);
      animation: welcomeReveal 1.6s 0.46s cubic-bezier(0.16, 1, 0.3, 1) both;
    }

    .pricingShell {
      padding-top: calc(40px + env(safe-area-inset-top));
    }

    .pricingBack {
      margin-bottom: 46px;
    }

    .pricingNav {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
    }

    .pricingNav {
      margin-top: 0;
      margin-bottom: 46px;
    }

    .terminalNavLink {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-height: 38px;
      padding: 10px 14px;
      border: 1px solid rgba(232, 168, 76, 0.28);
      color: rgba(255, 195, 106, 0.92);
      background:
        linear-gradient(180deg, rgba(20, 12, 4, 0.46), rgba(8, 5, 2, 0.24)),
        rgba(8, 5, 2, 0.48);
      font-size: 10px;
      letter-spacing: 0.22em;
      text-transform: uppercase;
      text-decoration: none;
      box-shadow: 0 0 18px rgba(232, 168, 76, 0.06);
      transition: color 0.3s ease, border-color 0.3s ease, transform 0.3s ease, background 0.3s ease;
    }

    .terminalNavLink:hover,
    .terminalNavLink:focus-visible {
      color: rgba(255, 214, 145, 1);
      border-color: rgba(232, 168, 76, 0.5);
      background:
        linear-gradient(180deg, rgba(32, 18, 5, 0.62), rgba(10, 6, 2, 0.34)),
        rgba(8, 5, 2, 0.58);
      outline: none;
      transform: translateY(-1px);
    }

    .terminalNavLink-primary {
      border-color: rgba(255, 195, 106, 0.52);
      color: #010208;
      background: rgba(255, 179, 71, 0.88);
      box-shadow: 0 0 26px rgba(232, 168, 76, 0.12);
    }

    .terminalNavLink-primary:hover,
    .terminalNavLink-primary:focus-visible {
      color: #010208;
      border-color: rgba(255, 214, 145, 0.8);
      background: rgba(255, 200, 110, 0.96);
    }

    .pricingHeader {
      max-width: 680px;
    }

    .pricingHeader h1 {
      font-size: clamp(42px, 8vw, 86px);
    }

    .pricingHeader p:last-child {
      margin-left: 0;
      margin-right: 0;
    }

    .pricingTiers {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 1px;
      margin-top: 46px;
      border: 1px solid rgba(232, 168, 76, 0.12);
      background: rgba(232, 168, 76, 0.12);
      animation: welcomeReveal 1.6s 0.32s cubic-bezier(0.16, 1, 0.3, 1) both;
    }

    .pricingTier {
      display: flex;
      min-height: 280px;
      flex-direction: column;
      gap: 18px;
      padding: 24px;
      color: rgba(248, 234, 208, 0.7);
      text-decoration: none;
      background:
        linear-gradient(180deg, rgba(13, 8, 4, 0.78), rgba(6, 4, 2, 0.62)),
        rgba(8, 5, 2, 0.72);
      transition: color 0.35s ease, background 0.35s ease, transform 0.35s ease;
    }

    .pricingTier:hover,
    .pricingTier:focus-visible {
      color: rgba(248, 234, 208, 0.92);
      background:
        linear-gradient(180deg, rgba(22, 13, 4, 0.88), rgba(9, 6, 2, 0.7)),
        rgba(8, 5, 2, 0.82);
      outline: none;
      transform: translateY(-2px);
    }

    .pricingTier-featured {
      background:
        linear-gradient(180deg, rgba(38, 22, 7, 0.9), rgba(13, 8, 3, 0.76)),
        rgba(8, 5, 2, 0.86);
    }

    .tierIndex {
      font-size: 10px;
      letter-spacing: 0.28em;
      color: rgba(232, 168, 76, 0.38);
    }

    .pricingTier strong {
      font-size: 18px;
      letter-spacing: 0.28em;
      font-weight: 400;
      color: rgba(255, 195, 106, 0.94);
    }

    .tierPrice {
      font-family: var(--font-mono);
      font-size: 14px;
      color: rgba(255, 220, 160, 0.82);
    }

    .tierText {
      flex: 1;
      font-family: var(--font-mono);
      font-size: 13px;
      line-height: 1.75;
    }

    .tierAction {
      font-size: 10px;
      letter-spacing: 0.28em;
      text-transform: uppercase;
      color: rgba(255, 195, 106, 0.84);
    }

    @keyframes welcomeReveal {
      from {
        opacity: 0;
        transform: translateY(18px);
        filter: blur(4px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
        filter: blur(0);
      }
    }

    @keyframes glyphBreathe {
      0%, 100% { opacity: 0.45; box-shadow: 0 0 0 rgba(232,168,76,0); }
      50%      { opacity: 1; box-shadow: 0 0 10px rgba(232,168,76,0.35); }
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
      height: min(76svh, calc(var(--app-height) - var(--header-height) - env(safe-area-inset-top) - env(safe-area-inset-bottom) - 48px));
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
      transform: translateY(0) scale(1);
      filter: none;
      transition:
        opacity var(--meditation-transition-ms) var(--ease-soft),
        border-color var(--meditation-transition-ms) var(--ease-soft),
        box-shadow var(--meditation-transition-ms) var(--ease-soft),
        backdrop-filter var(--meditation-transition-ms) var(--ease-soft),
        transform var(--meditation-transition-ms) var(--ease-cinematic),
        filter var(--meditation-transition-ms) var(--ease-soft);
      transition-delay: var(--meditation-shell-delay);
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
      transition:
        opacity var(--meditation-transition-ms) var(--ease-soft),
        filter var(--meditation-transition-ms) var(--ease-soft);
      transition-delay: var(--meditation-shell-delay);
    }

    #terminalShell::after {
      inset: 14px;
      border: 1px solid rgba(232, 168, 76, 0.035);
      pointer-events: none;
      opacity: 1;
      transition:
        opacity var(--meditation-transition-ms) var(--ease-soft),
        border-color var(--meditation-transition-ms) var(--ease-soft),
        box-shadow var(--meditation-transition-ms) var(--ease-soft);
      transition-delay: var(--meditation-shell-delay);
    }

    #terminalShell::after {
      box-shadow: inset 0 0 0 1px rgba(255, 226, 179, 0.008);
    }

    #terminalShell > * {
      position: relative;
      z-index: 1;
    }

    #orientationPanel {
      padding: 6px 2px 12px;
      filter: blur(0);
      transform: translateY(0);
      transition:
        opacity var(--meditation-transition-ms) var(--ease-soft),
        filter var(--meditation-transition-ms) var(--ease-soft),
        transform var(--meditation-transition-ms) var(--ease-cinematic);
      transition-delay: var(--meditation-chrome-delay);
    }

    .orientationKicker {
      margin-bottom: 8px;
      font-size: 9px;
      letter-spacing: 0.28em;
      text-transform: uppercase;
      color: rgba(232, 168, 76, 0.52);
    }

    #orientationPanel h1 {
      margin: 0 0 8px;
      font-size: clamp(36px, 8vw, 72px);
      line-height: 0.92;
      font-weight: 300;
      letter-spacing: 0;
      color: rgba(255, 195, 106, 0.96);
      text-shadow: 0 0 24px rgba(255, 179, 71, 0.08);
    }

    #orientationPanel p {
      max-width: 650px;
      margin: 0;
      font-family: var(--font-mono);
      font-size: 13px;
      line-height: 1.7;
      color: rgba(248, 234, 208, 0.66);
    }

    #terminalMeta::after {
      content: "";
      flex: 1 1 auto;
      min-width: 24px;
      height: 1px;
      align-self: center;
      background: linear-gradient(90deg, rgba(232,168,76,0.14), transparent);
      transition:
        opacity var(--meditation-transition-ms) var(--ease-soft),
        background var(--meditation-transition-ms) var(--ease-soft);
      transition-delay: var(--meditation-chrome-delay);
    }

    #terminalMeta {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      align-items: center;
      padding-bottom: 2px;
      filter: blur(0);
      transform: translateY(0);
      transition:
        opacity var(--meditation-transition-ms) var(--ease-soft),
        filter var(--meditation-transition-ms) var(--ease-soft),
        transform var(--meditation-transition-ms) var(--ease-cinematic);
      transition-delay: var(--meditation-chrome-delay);
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

    .metaItem-passive {
      color: rgba(203, 166, 112, 0.5);
      border-color: rgba(171, 128, 62, 0.12);
      background:
        linear-gradient(180deg, rgba(12, 9, 5, 0.24), rgba(8, 6, 3, 0.14)),
        rgba(8, 6, 3, 0.16);
      box-shadow: inset 0 1px 0 rgba(255, 222, 170, 0.02);
    }

    .metaItemButton {
      appearance: none;
      font-family: inherit;
      text-align: left;
      cursor: pointer;
      transition:
        color 0.32s ease,
        border-color 0.32s ease,
        background 0.32s ease,
        box-shadow 0.32s ease,
        transform 0.32s ease;
    }

    .metaItemButton:hover,
    .metaItemButton:focus-visible {
      color: rgba(255, 207, 125, 0.94);
      border-color: rgba(232, 168, 76, 0.34);
      background:
        linear-gradient(180deg, rgba(20, 12, 4, 0.38), rgba(10, 6, 3, 0.18)),
        rgba(10, 6, 3, 0.2);
      box-shadow:
        inset 0 0 0 1px rgba(255, 205, 118, 0.05),
        0 0 16px rgba(232, 168, 76, 0.06);
      outline: none;
      transform: translateY(-1px);
    }

    .metaItemButton:active {
      transform: translateY(0);
    }

    .metaItemButton-jp {
      letter-spacing: 0.18em;
    }

    .metaItemButton-encrypted:hover,
    .metaItemButton-encrypted:focus-visible {
      color: rgba(242, 194, 182, 0.94);
      border-color: rgba(113, 32, 36, 0.68);
      background:
        linear-gradient(180deg, rgba(52, 13, 18, 0.7), rgba(27, 7, 10, 0.44)),
        rgba(31, 7, 11, 0.42);
      box-shadow:
        inset 0 0 0 1px rgba(152, 56, 61, 0.16),
        0 0 18px rgba(92, 22, 29, 0.18);
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
      filter: brightness(1) contrast(1);
      transition:
        opacity var(--meditation-transition-ms) var(--ease-soft),
        border-color var(--meditation-transition-ms) var(--ease-soft),
        background var(--meditation-transition-ms) var(--ease-soft),
        box-shadow var(--meditation-transition-ms) var(--ease-soft),
        filter var(--meditation-transition-ms) var(--ease-soft);
      transition-delay: var(--meditation-log-delay);
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
      filter: blur(0);
      transform: translateY(0);
      transition:
        opacity var(--meditation-transition-ms) var(--ease-soft),
        filter var(--meditation-transition-ms) var(--ease-soft),
        transform var(--meditation-transition-ms) var(--ease-cinematic);
      transition-delay: var(--meditation-chrome-delay);
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
      transition:
        border-color var(--meditation-transition-ms) var(--ease-soft),
        background var(--meditation-transition-ms) var(--ease-soft),
        color var(--meditation-transition-ms) var(--ease-soft),
        box-shadow var(--meditation-transition-ms) var(--ease-soft);
    }

    #input::placeholder {
      color: rgba(232,168,76,0.34);
      letter-spacing: 0.12em;
      transition: color var(--meditation-transition-ms) var(--ease-soft);
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
      animation: blink var(--meditation-cursor-blink-ms) infinite;
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

    body.meditation {
      --meditation-bloom-opacity: 0.16;
      --meditation-bloom-scale: 1.08;
      --meditation-cursor-blink-ms: 4200ms;
      --meditation-star-filter: brightness(1.08) contrast(1.08) saturate(0.88);
    }

    body.meditation.meditation-shifting {
      --meditation-shell-delay: var(--meditation-stage-1);
      --meditation-header-delay: var(--meditation-stage-1);
      --meditation-chrome-delay: var(--meditation-stage-2);
      --meditation-log-delay: var(--meditation-stage-2);
      --meditation-overlay-delay: var(--meditation-stage-3);
      --meditation-bloom-opacity: 0.34;
      --meditation-bloom-scale: 1;
      --meditation-cursor-blink-ms: 3200ms;
      --meditation-star-filter: brightness(1.04) contrast(1.05) saturate(0.94);
    }

    .meditation #terminalShell {
      opacity: 0.22;
      border-color: rgba(232, 168, 76, 0.02);
      box-shadow:
        0 0 0 1px rgba(255, 214, 149, 0.008),
        inset 0 1px 0 rgba(255, 223, 170, 0.008);
      backdrop-filter: blur(8px) saturate(68%);
      transform: translateY(8px) scale(0.99);
      filter: brightness(0.42) contrast(0.58) saturate(0.64);
    }

    .meditation #terminalShell::before {
      opacity: 0.08;
      filter: blur(8px);
    }

    .meditation #terminalShell::after {
      opacity: 0.14;
      border-color: rgba(232, 168, 76, 0.02);
      box-shadow: inset 0 0 0 1px rgba(255, 226, 179, 0.004);
    }

    .meditation #header {
      opacity: 0.18;
      backdrop-filter: blur(14px) saturate(70%);
      transform: translateY(-1px);
      filter: brightness(0.62) saturate(0.72);
    }

    .meditation #header::after {
      background: linear-gradient(
        90deg,
        transparent 0%,
        rgba(232, 168, 76, 0.04) 5%,
        rgba(232, 168, 76, 0.1) 50%,
        rgba(232, 168, 76, 0.04) 95%,
        transparent 100%
      );
      box-shadow: 0 0 8px rgba(232, 168, 76, 0.04);
    }

    .meditation #meditationControlLayer {
      opacity: 0.86;
      transform: translateY(1px);
      filter: brightness(1.04) saturate(1.02);
    }

    .meditation #meditationToggle {
      color: rgba(255, 210, 126, 0.98);
      text-shadow: 0 0 12px rgba(255, 191, 96, 0.14);
      border-color: rgba(255, 201, 106, 0.24);
      background:
        linear-gradient(180deg, rgba(24, 15, 6, 0.76), rgba(8, 5, 2, 0.48)),
        rgba(5, 4, 2, 0.42);
      box-shadow:
        inset 0 1px 0 rgba(255, 236, 205, 0.1),
        inset 0 -1px 0 rgba(0, 0, 0, 0.2),
        0 0 0 1px rgba(255, 191, 96, 0.12),
        0 12px 32px rgba(0, 0, 0, 0.28),
        0 0 28px rgba(255, 179, 71, 0.18),
        0 0 56px rgba(255, 191, 96, 0.12);
      backdrop-filter: blur(18px) saturate(120%);
    }

    .meditation #meditationToggle::before {
      opacity: 0.62;
      transform: scale(1.01);
    }

    .meditation #meditationToggle .meditationSwitch-track {
      border-color: rgba(255, 201, 106, 0.52);
      background:
        linear-gradient(180deg, rgba(255, 214, 149, 0.22), rgba(255, 179, 71, 0.06)),
        rgba(14, 9, 3, 0.82);
      box-shadow:
        inset 0 0 0 1px rgba(255, 226, 179, 0.07),
        inset 0 8px 12px rgba(63, 35, 8, 0.14),
        0 0 22px rgba(232, 168, 76, 0.16),
        0 0 38px rgba(255, 191, 96, 0.09);
    }

    .meditation #meditationToggle .meditationSwitch-thumb {
      box-shadow:
        inset 0 1px 0 rgba(255, 255, 255, 0.58),
        inset 0 -1px 3px rgba(148, 86, 23, 0.28),
        0 2px 5px rgba(0, 0, 0, 0.42),
        0 0 16px rgba(255, 201, 106, 0.38),
        0 0 30px rgba(232, 168, 76, 0.18),
        0 0 42px rgba(255, 214, 149, 0.08);
    }

    .meditation #terminalMeta,
    .meditation #orientationPanel,
    .meditation #inputDock {
      opacity: 0.22;
      filter: blur(0.8px);
      transform: translateY(4px);
    }

    .meditation #terminalMeta::after {
      opacity: 0.24;
      background: linear-gradient(90deg, rgba(232,168,76,0.05), transparent);
    }

    .meditation #log {
      opacity: 0.22;
      border-color: rgba(232, 168, 76, 0.02);
      background:
        linear-gradient(180deg, rgba(255, 229, 184, 0.0006), rgba(1, 2, 8, 0.0002) 42%, rgba(1, 2, 8, 0.0014) 100%),
        rgba(1, 2, 8, 0.0008);
      box-shadow: none;
      filter: brightness(0.58) contrast(0.72);
    }

    .meditation #input {
      border-color: rgba(232, 168, 76, 0.08);
      background: rgba(0, 0, 0, 0.06);
      color: rgba(248, 234, 208, 0.5);
      box-shadow: inset 0 0 0 1px rgba(255,255,255,0.006);
    }

    .meditation #input::placeholder {
      color: rgba(232,168,76,0.16);
    }

    .meditation .nebula {
      opacity: 0.22;
      filter: brightness(0.74) saturate(0.8);
    }

    .meditation #ambientVisual {
      opacity: 0.14;
      filter: saturate(0.72) brightness(0.72);
    }

    .meditation #sceneVisual {
      opacity: 0.08;
      transform: translateY(10px) scale(0.986);
      filter: brightness(0.52) saturate(0.66);
    }

    .meditation .grain {
      opacity: 0.01;
    }

    .meditation .grid {
      opacity: 0.06;
    }

    .meditation .scanline {
      opacity: 0.015;
    }

    .meditation::after {
      opacity: 0.94;
    }

    @media (max-width: 820px) {
      :root {
        --header-height: 54px;
        --terminal-pad: 14px;
      }

      #header {
        padding-top: calc(env(safe-area-inset-top) + 7px);
        padding-bottom: 7px;
        padding-left: calc(12px + env(safe-area-inset-left));
        padding-right: calc(12px + env(safe-area-inset-right));
        gap: 8px;
      }

      #meditationControlLayer {
        padding-top: calc(env(safe-area-inset-top) + 7px);
        padding-bottom: 7px;
        padding-left: calc(12px + env(safe-area-inset-left));
        padding-right: calc(12px + env(safe-area-inset-right));
      }

      #header::after {
        left: calc(12px + env(safe-area-inset-left));
        right: calc(12px + env(safe-area-inset-right));
      }

      .headerLink {
        font-size: 9px;
        letter-spacing: 0.28em;
      }

      .frameButton {
        padding: 11px 14px;
        font-size: 9px;
        letter-spacing: 0.22em;
      }

      .meditationSwitch {
        padding-left: 12px;
        padding-right: 8px;
        font-size: 9px;
        letter-spacing: 0.2em;
      }

      .meditationSwitch-inner {
        gap: 8px;
      }

      .pricingTiers {
        grid-template-columns: 1fr;
      }

      .pricingTier {
        min-height: 0;
      }

      #terminalWrap {
        padding-left: 10px;
        padding-right: 10px;
        padding-bottom: calc(12px + env(safe-area-inset-bottom));
      }

      #terminalShell {
        height: calc(var(--app-height) - var(--header-height) - env(safe-area-inset-top) - env(safe-area-inset-bottom) - 26px);
      }

      #orientationPanel h1 {
        font-size: 42px;
      }

      #orientationPanel p {
        font-size: 12px;
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
      .meditationSwitch {
        min-width: 0;
        justify-self: end;
      }

      .meditationSwitch-label {
        letter-spacing: 0.18em;
      }

      .welcomeShell,
      .pricingShell {
        padding-left: calc(18px + env(safe-area-inset-left));
        padding-right: calc(18px + env(safe-area-inset-right));
      }

      .welcomeShell h1 {
        font-size: 58px;
      }

      .welcomeActions {
        width: 100%;
        align-items: stretch;
      }

      .welcomeActions .frameButton {
        width: 100%;
      }

      .pricingNav {
        width: 100%;
      }

      .terminalNavLink {
        width: 100%;
      }

      .welcomeMeta {
        flex-direction: column;
        gap: 10px;
      }

      #terminalWrap {
        padding-top: calc(var(--header-height) + env(safe-area-inset-top) + 18px);
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

      #meditationControlLayer {
        padding-top: calc(env(safe-area-inset-top) + 7px);
        padding-bottom: 7px;
        padding-left: calc(12px + env(safe-area-inset-left));
        padding-right: calc(12px + env(safe-area-inset-right));
      }
    }`
