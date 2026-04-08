import { uiScript } from "./script"
import { uiStyles } from "./styles"

export function renderUI(): string {
  return /* html */ `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
  <title>VELORUM TERMINAL</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Jura:wght@300;400;500&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="/ai/styles.css" />
</head>

<body>

<canvas id="stars" aria-hidden="true"></canvas>
<div class="nebula" aria-hidden="true"></div>
<div id="ambientVisual" aria-hidden="true">
  <img id="ambientVisualImage" alt="" />
</div>
<div class="grain" aria-hidden="true"></div>
<div class="grid" aria-hidden="true"></div>
<div class="scanline" aria-hidden="true"></div>
<aside id="sceneVisual" aria-hidden="true">
  <div class="sceneFrame">
    <div class="sceneMetaRow">
      <div id="sceneVisualLabel" class="sceneLabel">ARCHIVE VISION // MATERIALIZING</div>
      <div id="sceneVisualTimer" class="sceneTimer" hidden></div>
    </div>
    <div class="sceneImageShell">
      <img id="sceneVisualImage" alt="" />
    </div>
    <div id="sceneVisualCaption" class="sceneCaption"></div>
  </div>
</aside>

<header id="header">
  <div class="headerSlot">VELORUM ARCHIVE TERMINAL</div>
  <button id="meditationToggle" class="frameButton" type="button" aria-pressed="false">
    <span class="frameButton-inner">MEDITATION MODE: OFF</span>
  </button>
  <div class="headerSlot">FURAI CORE</div>
</header>

<main id="terminalWrap">
  <section id="terminalShell" aria-label="Velorum terminal shell">
    <div id="terminalMeta" aria-hidden="true">
      <div class="metaItem">ARCHIVE // LIVE</div>
      <div class="metaItem">STASIS LOCK // SEALED</div>
      <div class="metaItem">RITHAN KEY // RESTRICTED</div>
      <div class="metaItem">EARTH UPLINK // OPEN</div>
    </div>

    <div id="log" role="log" aria-live="polite" aria-label="Terminal output"></div>

    <div id="inputDock">
      <label class="inputLabel" for="input">signal uplink</label>
      <div id="inputRow">
        <input
          id="input"
          type="text"
          placeholder="transmit signal..."
          autocomplete="off"
          spellcheck="false"
          aria-label="Message input"
        />
        <button id="send" class="frameButton" type="button" aria-label="Send message">
          <span class="frameButton-inner">send signal</span>
        </button>
      </div>
    </div>
  </section>
</main>

<div id="thinkingCore" aria-hidden="true"></div>

<audio id="meditationAudio" loop preload="none"></audio>

<script src="/ai/script.js" defer></script>

</body>
</html>`
}

export function renderUiStyles(): string {
  return uiStyles
}

export function renderUiScript(): string {
  return uiScript
}
