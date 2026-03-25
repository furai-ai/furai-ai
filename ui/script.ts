export const uiScript = `'use strict';

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

  starSpeedNormal:    1.8,
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

document.addEventListener('DOMContentLoaded', () => {
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

  const dom = {
    log:              document.getElementById('log'),
    input:            document.getElementById('input'),
    send:             document.getElementById('send'),
    thinkingCore:     document.getElementById('thinkingCore'),
    meditationToggle: document.getElementById('meditationToggle'),
    meditationAudio:  document.getElementById('meditationAudio'),
    canvas:           document.getElementById('stars'),
  };

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

  function setThinking(active) {
    dom.thinkingCore.style.opacity = active ? 1 : 0;
  }

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

    setTimeout(() => {
      const now = ctx.currentTime;
      gain.gain.exponentialRampToValueAtTime(CONFIG.audioPinkTarget, now + CONFIG.audioFadeInS);
    }, CONFIG.audioFadeInDelay);

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

  async function boot() {
    for (const line of BOOT_SEQUENCE) {
      await typeLine(line, 'system');
      await delay(CONFIG.bootLineDelayMs);
    }
    writeLine('');
    writeLine('FURAI: communication channel open', 'furai');
  }

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

  dom.send.addEventListener('click', sendMessage);

  dom.input.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      sendMessage();
    }
  });

  dom.meditationToggle.addEventListener('click', toggleMeditation);

  dom.meditationToggle.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleMeditation();
    }
  });

  starfield.init();
  boot();
});`
