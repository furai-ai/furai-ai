// ─────────────────────────────────────────────
//  VELORUM TERMINAL  –  ui.ts
// ─────────────────────────────────────────────

export function renderUI(): string {
  return /* html */ `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>VELORUM TERMINAL</title>
  <style>
    /* ── Design tokens ─────────────────────────── */
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
    }
  </style>
</head>

<body>

<canvas id="stars" aria-hidden="true"></canvas>

<header id="header">
  <div>VELORUM ARCHIVE TERMINAL</div>
  <div id="meditationToggle" role="button" tabindex="0" aria-pressed="false">
    MEDITATION MODE: OFF
  </div>
  <div>FURAI CORE</div>
</header>

<main id="terminal">
  <div id="log" role="log" aria-live="polite" aria-label="Terminal output"></div>
  <div id="inputRow">
    <input
      id="input"
      type="text"
      placeholder="transmit signal..."
      autocomplete="off"
      spellcheck="false"
      aria-label="Message input"
    />
    <button id="send" aria-label="Send message">send</button>
  </div>
</main>

<div id="thinkingCore" aria-hidden="true"></div>

<audio id="meditationAudio" loop>
  <source src="/audio/velorum_meditation.mp3" type="audio/mpeg" />
</audio>

<script>
'use strict';

// ─────────────────────────────────────────────
//  CONFIG
// ─────────────────────────────────────────────

const CONFIG = Object.freeze({
  typeSpeedMs:       12,
  lineGapMs:         40,
  bootLineDelayMs:   200,

  historyMax:        20,
  ghostIntervalMs:   90_000,

  audioFadeInS:      5,
  audioFadeOutS:     6,
  audioFadeOutMs:    6_200,
  audioFadeInDelay:  200,
  audioInitGain:     0.0001,
  audioPinkTarget:   0.034,

  breathIntervalMs:  8_000,
  breathBase:        0.022,
  breathVariation:   0.008,

  meditationVolume:  0.35,
  meditationFadeInc: 0.02,
  meditationFadeMs:  120,

  starSpeedNormal:    2.8,
  starSpeedMeditate:  0.4,

  starLayers: [
    { count: 500, speed: 0.3, size: 0.6 },
    { count: 300, speed: 0.7, size: 1.0 },
    { count: 120, speed: 1.4, size: 1.8 },
  ],
});

const GHOST_SIGNALS = Object.freeze([
  'ARCHIVE SIGNAL FRAGMENT 01\\ntranslation confidence: 18%\\n"...velorum... transit corridor... unknown sector..."',
  'ARCHIVE SIGNAL FRAGMENT 02\\ntranslation confidence: 09%\\n"...do you copy... do you copy... signal drifting..."',
  'ARCHIVE SIGNAL FRAGMENT 03\\ntranslation confidence: 14%\\n"...anantari relay station... memory vault compromised..."',
  'ARCHIVE SIGNAL FRAGMENT 04\\ntranslation confidence: 07%\\n"...navigation star lost... recalibrating sky map..."',
  'ARCHIVE SIGNAL FRAGMENT 05\\ntranslation confidence: 11%\\n"...we were not the first archive vessel..."',
  'ARCHIVE SIGNAL FRAGMENT 06\\ntranslation confidence: 05%\\n"...signal echo detected in deep time..."',
]);

const BOOT_SEQUENCE = Object.freeze([
  'VELORUM ARCHIVE VESSEL DETECTED',
  '',
  '▲',
  '▲ ▲',
  '▲   ▲',
  '',
  'civilization origin: ANANTARI',
  'mission class: VIII EXPLORATION VESSEL',
  '',
  'restoring memory fragments...',
  'initializing FURAI AI',
  '',
  'connection established',
]);

// ─────────────────────────────────────────────
//  INIT — wait for DOM
// ─────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {

  // ─────────────────────────────────────────────
  //  STATE
  // ─────────────────────────────────────────────

  const state = {
    furaiTyping:       false,
    sending:           false,
    meditation:        false,
    dialogueHistory:   [],
    ghostRadioHandle:  null,
    audioCtx:          null,
    pinkNoiseNode:     null,
    pinkGain:          null,
    reactorBreath:     null,
  };

  // ─────────────────────────────────────────────
  //  DOM REFS
  // ─────────────────────────────────────────────

  const dom = {
    log:              document.getElementById('log'),
    input:            document.getElementById('input'),
    send:             document.getElementById('send'),
    thinkingCore:     document.getElementById('thinkingCore'),
    meditationToggle: document.getElementById('meditationToggle'),
    meditationAudio:  document.getElementById('meditationAudio'),
    canvas:           document.getElementById('stars'),
  };

  // ─────────────────────────────────────────────
  //  TERMINAL – output
  // ─────────────────────────────────────────────

  function scrollToBottom() {
    dom.log.scrollTop = dom.log.scrollHeight;
  }

  function writeLine(text, cls = 'system') {
    const line = document.createElement('div');
    line.className = cls;
    line.textContent = text;
    dom.log.appendChild(line);
    scrollToBottom();
  }

  function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async function typeLine(text, cls = 'furai') {
    state.furaiTyping = true;

    const line = document.createElement('div');
    line.className = cls;

    const textNode = document.createTextNode('');
    line.appendChild(textNode);

    const cursor = document.createElement('span');
    cursor.className  = 'cursor';
    cursor.textContent = '█';
    line.appendChild(cursor);

    dom.log.appendChild(line);

    for (const char of text) {
      textNode.textContent += char;
      scrollToBottom();
      await delay(CONFIG.typeSpeedMs);
    }

    cursor.remove();
    state.furaiTyping = false;
  }

  async function typeBlock(text, cls = 'furai') {
    for (const line of text.split('\\n')) {
      await typeLine(line, cls);
      await delay(CONFIG.lineGapMs);
    }
  }

  // ─────────────────────────────────────────────
  //  THINKING INDICATOR
  // ─────────────────────────────────────────────

  function setThinking(active) {
    dom.thinkingCore.style.opacity = active ? 1 : 0;
  }

  // ─────────────────────────────────────────────
  //  GHOST RADIO
  // ─────────────────────────────────────────────

  function randomFrom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function startGhostRadio() {
    state.ghostRadioHandle = setInterval(async () => {
      if (!state.meditation) return;
      await typeBlock(randomFrom(GHOST_SIGNALS), 'system');
    }, CONFIG.ghostIntervalMs);
  }

  function stopGhostRadio() {
    if (state.ghostRadioHandle) {
      clearInterval(state.ghostRadioHandle);
      state.ghostRadioHandle = null;
    }
  }

  // ─────────────────────────────────────────────
  //  PINK NOISE ENGINE
  // ─────────────────────────────────────────────

  function createPinkNoiseProcessor(ctx) {
    const BUFFER = 4096;
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;

    const node = ctx.createScriptProcessor(BUFFER, 1, 1);

    node.onaudioprocess = ({ outputBuffer }) => {
      const out = outputBuffer.getChannelData(0);
      for (let i = 0; i < BUFFER; i++) {
        const w = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + w * 0.0555179;
        b1 = 0.99332 * b1 + w * 0.0750759;
        b2 = 0.96900 * b2 + w * 0.1538520;
        b3 = 0.86650 * b3 + w * 0.3104856;
        b4 = 0.55000 * b4 + w * 0.5329522;
        b5 = -0.7616  * b5 - w * 0.0168980;
        const pink = b0 + b1 + b2 + b3 + b4 + b5 + b6 + w * 0.5362;
        b6 = w * 0.115926;
        out[i] = pink * 0.08;
      }
    };

    return node;
  }

  function startPinkNoise() {
    if (state.audioCtx) return;

    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    state.audioCtx      = ctx;
    state.pinkNoiseNode = createPinkNoiseProcessor(ctx);

    const gain = ctx.createGain();
    gain.gain.value = CONFIG.audioInitGain;
    state.pinkGain = gain;

    state.pinkNoiseNode.connect(gain);
    gain.connect(ctx.destination);

    // Soft fade-in after brief delay (needed on some browsers post-user-gesture)
    setTimeout(() => {
      const now = ctx.currentTime;
      gain.gain.exponentialRampToValueAtTime(CONFIG.audioPinkTarget, now + CONFIG.audioFadeInS);
    }, CONFIG.audioFadeInDelay);

    // Reactor breath: subtle gain oscillation for organic feel
    state.reactorBreath = setInterval(() => {
      if (!state.pinkGain) return;
      const now = ctx.currentTime;
      const target = CONFIG.breathBase + Math.random() * CONFIG.breathVariation;
      gain.gain.cancelScheduledValues(now);
      gain.gain.linearRampToValueAtTime(target, now + CONFIG.breathIntervalMs / 1000);
    }, CONFIG.breathIntervalMs);
  }

  function stopPinkNoise() {
    const { pinkGain, audioCtx, reactorBreath, pinkNoiseNode } = state;
    if (!pinkGain || !audioCtx) return;

    clearInterval(reactorBreath);
    state.reactorBreath = null;

    const now = audioCtx.currentTime;
    pinkGain.gain.cancelScheduledValues(now);
    pinkGain.gain.setValueAtTime(pinkGain.gain.value, now);
    pinkGain.gain.exponentialRampToValueAtTime(0.00001, now + CONFIG.audioFadeOutS);

    setTimeout(() => {
      try {
        pinkNoiseNode.disconnect();
        pinkGain.disconnect();
      } catch (e) {
        console.warn('[PinkNoise] disconnect error:', e);
      }
      state.pinkNoiseNode = null;
      state.pinkGain      = null;
      audioCtx.close();
      state.audioCtx = null;
    }, CONFIG.audioFadeOutMs);
  }

  // ─────────────────────────────────────────────
  //  MEDITATION AUDIO – fade helpers
  // ─────────────────────────────────────────────

  function fadeMeditationAudioIn() {
    const audio = dom.meditationAudio;
    audio.volume = 0;
    audio.play().catch(e => console.warn('[MeditationAudio] play error:', e));

    let v = 0;
    const id = setInterval(() => {
      v += CONFIG.meditationFadeInc;
      audio.volume = Math.min(v, CONFIG.meditationVolume);
      if (v >= CONFIG.meditationVolume) clearInterval(id);
    }, CONFIG.meditationFadeMs);
  }

  // ─────────────────────────────────────────────
  //  MEDITATION MODE
  // ─────────────────────────────────────────────

  function enterMeditation() {
    state.meditation = true;
    document.body.classList.add('meditation');
    dom.meditationToggle.textContent = 'MEDITATION MODE: ON';
    dom.meditationToggle.setAttribute('aria-pressed', 'true');

    starfield.setSpeed(CONFIG.starSpeedMeditate);

    startGhostRadio();
    startPinkNoise();
    fadeMeditationAudioIn();

    writeLine('FURAI: entering meditation field', 'system');
  }

  function exitMeditation() {
    state.meditation = false;
    document.body.classList.remove('meditation');
    dom.meditationToggle.textContent = 'MEDITATION MODE: OFF';
    dom.meditationToggle.setAttribute('aria-pressed', 'false');

    starfield.setSpeed(CONFIG.starSpeedNormal);

    stopGhostRadio();
    stopPinkNoise();

    dom.meditationAudio.pause();
    dom.meditationAudio.currentTime = 0;

    writeLine('FURAI: meditation field closed', 'system');
  }

  function toggleMeditation() {
    state.meditation ? exitMeditation() : enterMeditation();
  }

  // ─────────────────────────────────────────────
  //  BOOT SEQUENCE
  // ─────────────────────────────────────────────

  async function boot() {
    for (const line of BOOT_SEQUENCE) {
      await typeLine(line, 'system');
      await delay(CONFIG.bootLineDelayMs);
    }
    writeLine('');
    writeLine('FURAI: communication channel open', 'furai');
  }

  // ─────────────────────────────────────────────
  //  MESSAGE SEND
  // ─────────────────────────────────────────────

  function trimHistory(history) {
    return history.length > CONFIG.historyMax
      ? history.slice(-CONFIG.historyMax)
      : history;
  }

  async function sendMessage() {
    if (state.meditation || state.furaiTyping || state.sending) return;

    const msg = dom.input.value.trim();
    if (!msg) return;

    state.sending = true;
    writeLine('> ' + msg, 'user');
    dom.input.value = '';
    setThinking(true);

    try {
      const res = await fetch('/ai', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ message: msg, history: state.dialogueHistory }),
      });

      let data;
      try {
        data = await res.json();
      } catch {
        data = { reply: 'signal decode error' };
      }

      setThinking(false);
      await typeBlock('FURAI: ' + data.reply, 'furai');

      state.dialogueHistory = trimHistory([
        ...state.dialogueHistory,
        { role: 'user',      content: msg },
        { role: 'assistant', content: data.reply },
      ]);

    } catch (e) {
      console.error('[sendMessage]', e);
      setThinking(false);
      await typeLine('VELORUM SIGNAL ERROR', 'system');
    }

    state.sending = false;
  }

  // ─────────────────────────────────────────────
  //  STARFIELD
  // ─────────────────────────────────────────────

  const starfield = (() => {
    const canvas = dom.canvas;
    const ctx    = canvas.getContext('2d');
    let speed    = CONFIG.starSpeedNormal;
    let stars    = [];

    function resize() {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    function buildStars() {
      stars = [];
      for (const layer of CONFIG.starLayers) {
        for (let i = 0; i < layer.count; i++) {
          stars.push({
            x:     Math.random() * canvas.width  - canvas.width  / 2,
            y:     Math.random() * canvas.height - canvas.height / 2,
            z:     Math.random() * canvas.width,
            speed: layer.speed,
            size:  layer.size,
          });
        }
      }
    }

    function frame() {
      ctx.fillStyle = 'black';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const cx = canvas.width  / 2;
      const cy = canvas.height / 2;

      for (const star of stars) {
        star.z -= speed * star.speed;
        if (star.z <= 0) star.z = canvas.width;

        const k = 128 / star.z;
        const x = star.x * k + cx;
        const y = star.y * k + cy;

        if (x < 0 || x > canvas.width || y < 0 || y > canvas.height) continue;

        const size = (1 - star.z / canvas.width) * 3 * star.size;
        ctx.shadowColor = '#ffb347';
        ctx.shadowBlur  = 10 * star.size;
        ctx.fillStyle   = '#ffb347';
        ctx.fillRect(x, y, size, size);
        ctx.shadowBlur  = 0;
      }

      requestAnimationFrame(frame);
    }

    function init() {
      resize();
      buildStars();
      window.addEventListener('resize', () => {
        resize();
        buildStars();
      });
      frame();
    }

    return {
      init,
      setSpeed(s) { speed = s; },
    };
  })();

  // ─────────────────────────────────────────────
  //  EVENT BINDINGS
  // ─────────────────────────────────────────────

  dom.send.addEventListener('click', sendMessage);

  dom.input.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      sendMessage();
    }
  });

  dom.meditationToggle.addEventListener('click', toggleMeditation);

  // Keyboard support for the toggle (accessibility)
  dom.meditationToggle.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleMeditation();
    }
  });

  // ─────────────────────────────────────────────
  //  INIT
  // ─────────────────────────────────────────────

  starfield.init();
  boot();

}); // end DOMContentLoaded

</script>

</body>
</html>`;
}
