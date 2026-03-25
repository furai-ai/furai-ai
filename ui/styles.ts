export const uiStyles = `    /* ── Design tokens ─────────────────────────── */
    :root {
      --color-bg:          #000000;
      --color-surface:     #080603;
      --color-border:      #3a2a12;
      --color-border-mid:  #5e3d1a;
      --color-accent:      #ffb347;
      --color-dim:         #9c6d2c;
      --color-white:       #ffffff;

      --font-mono: monospace;

      --header-height:     40px;
      --terminal-max-w:    900px;
      --log-max-h:         70vh;

      --type-speed-ms:     12;
      --line-gap-ms:       40;

      --star-speed-normal:     2.8;
      --star-speed-meditation: 0.4;

      --audio-fade-in-s:   5;
      --audio-fade-out-s:  6;
      --audio-fade-out-ms: 6200;

      --ghost-interval-ms: 90000;
      --history-max:       20;

      --breath-interval-ms: 8000;
      --breath-base:        0.022;
      --breath-variation:   0.008;
      --pink-target-gain:   0.034;
    }

    /* ── Reset & base ──────────────────────────── */
    *, *::before, *::after {
      box-sizing: border-box;
    }

    body {
      margin: 0;
      background: var(--color-bg);
      color: var(--color-accent);
      font-family: var(--font-mono);
      overflow: hidden;
    }

    /* ── Starfield canvas ──────────────────────── */
    #stars {
      position: fixed;
      inset: 0;
      z-index: 0;
      background: black;
    }

    /* ── Header ────────────────────────────────── */
    #header {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      height: var(--header-height);
      background: var(--color-surface);
      border-bottom: 1px solid var(--color-border);
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 20px;
      z-index: 3;
      font-size: 13px;
      letter-spacing: 1px;
      color: var(--color-accent);
    }

    #meditationToggle {
      cursor: pointer;
      opacity: 0.8;
      transition: opacity 0.3s;
      user-select: none;
    }

    #meditationToggle:hover {
      opacity: 1;
    }

    /* ── Terminal ───────────────────────────────── */
    #terminal {
      position: relative;
      z-index: 2;
      padding: calc(var(--header-height) + 30px) 40px 40px;
      max-width: var(--terminal-max-w);
      margin: 0 auto;
      transition: opacity 1.5s;
    }

    #log {
      white-space: pre-wrap;
      line-height: 1.6;
      margin-bottom: 25px;
      max-height: var(--log-max-h);
      overflow-y: auto;
      padding-right: 10px;
      scroll-behavior: smooth;
    }

    #inputRow {
      display: flex;
      gap: 10px;
    }

    #input {
      flex: 1;
      background: var(--color-bg);
      border: 1px solid var(--color-border-mid);
      color: var(--color-accent);
      padding: 10px;
      font-family: var(--font-mono);
      outline: none;
    }

    #input:focus {
      border-color: var(--color-accent);
    }

    #send {
      background: var(--color-surface);
      border: 1px solid var(--color-border-mid);
      color: var(--color-accent);
      padding: 10px 16px;
      cursor: pointer;
      font-family: var(--font-mono);
      transition: border-color 0.2s;
    }

    #send:hover {
      border-color: var(--color-accent);
    }

    /* ── Log line classes ───────────────────────── */
    .system { color: var(--color-dim); }
    .user   { color: var(--color-white); }
    .furai  { color: var(--color-accent); }

    /* ── Typing cursor ──────────────────────────── */
    .cursor {
      display: inline-block;
      margin-left: 3px;
      animation: blink 1s infinite;
    }

    @keyframes blink {
      0%, 100% { opacity: 1; }
      50%       { opacity: 0; }
    }

    /* ── Thinking indicator ─────────────────────── */
    #thinkingCore {
      position: fixed;
      bottom: 30px;
      left: 30px;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background: var(--color-accent);
      box-shadow: 0 0 10px var(--color-accent);
      animation: pulse 3s infinite;
      opacity: 0;
      transition: opacity 0.3s;
    }

    @keyframes pulse {
      0%, 100% { transform: scale(0.8); opacity: 0.25; }
      50%       { transform: scale(1.2); opacity: 0.50; }
    }

    /* ── Meditation mode ────────────────────────── */
    .meditation #terminal {
      opacity: 0.25;
    }`
