import { uiScript } from "./script"
import { uiStyles } from "./styles"

export function renderUI(): string {
  return /* html */ `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>VELORUM TERMINAL</title>
  <style>
${uiStyles}
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
${uiScript}
</script>

</body>
</html>`
}
