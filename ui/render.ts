import { OFFICIAL_PORTRAIT_DATA } from "../lib/officialPortraits.generated"
import { uiScript } from "./script"
import { uiStyles } from "./styles"

export function renderWelcomeUI(): string {
  return /* html */ `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
  <title>FURAI — AI interface to Velorum</title>
  <meta name="description" content="FURAI is the AI interface for entering Velorum, a living archive system with memory, crew records, sealed lore, and meditation mode." />
  <meta property="og:type" content="website" />
  <meta property="og:title" content="FURAI — AI interface to Velorum" />
  <meta property="og:description" content="Enter Velorum through FURAI: a conversational archive interface with memory, crew records, sealed lore, and meditation mode." />
  <meta property="og:site_name" content="FURAI" />
  <meta name="twitter:card" content="summary" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Jura:wght@300;400;500&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="/ai/styles.css" />
</head>
<body class="welcomePage">
  <div class="nebula" aria-hidden="true"></div>
  <div class="grain" aria-hidden="true"></div>
  <div class="grid" aria-hidden="true"></div>
  <div class="scanline" aria-hidden="true"></div>

  <main class="welcomeShell" aria-label="FURAI welcome screen">
    <div class="welcomeMark" aria-hidden="true">
      <span></span>
      <i></i>
      <span></span>
    </div>

    <p class="welcomeKicker">AI INTERFACE // VELORUM ARCHIVE</p>
    <h1>FURAI</h1>
    <p class="welcomeCopy">Enter Velorum through FURAI: ask the archive, follow crew records, and return to a signal that remembers you.</p>

    <nav class="welcomeActions" aria-label="Primary actions">
      <a class="frameButton" href="/ai">
        <span class="frameButton-inner">open terminal</span>
      </a>
      <a class="frameButton frameButton-secondary" href="/proximity.html">
        <span class="frameButton-inner">view pricing</span>
      </a>
    </nav>

    <div class="welcomeMeta" aria-hidden="true">
      <span>PRODUCT · FURAI</span>
      <span>WORLD SYSTEM · VELORUM</span>
      <span>STATUS · ARCHIVE READY</span>
    </div>
  </main>
</body>
</html>`
}

export function renderPricingUI(): string {
  return /* html */ `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
  <title>FURAI Pricing — Proximity</title>
  <meta name="description" content="Choose a FURAI access tier: free live sessions, remembered context, or deeper Velorum archive access." />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Jura:wght@300;400;500&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="/ai/styles.css" />
</head>
<body class="pricingPage">
  <div class="nebula" aria-hidden="true"></div>
  <div class="grain" aria-hidden="true"></div>
  <div class="grid" aria-hidden="true"></div>
  <div class="scanline" aria-hidden="true"></div>

  <main class="pricingShell" aria-label="FURAI pricing">
    <nav class="pricingNav" aria-label="Pricing navigation">
      <a class="terminalNavLink terminalNavLink-primary" href="/">return to welcome</a>
      <a class="terminalNavLink" href="/ai">open terminal</a>
    </nav>

    <div class="pricingHeader">
      <p class="welcomeKicker">FURAI PROXIMITY</p>
      <h1>Choose access</h1>
      <p>Each tier changes one thing clearly: whether FURAI remembers you, and how deep Velorum opens.</p>
    </div>

    <section class="pricingTiers" aria-label="Access tiers">
      <a class="pricingTier" href="/ai?plan=drift">
        <span class="tierIndex">I</span>
        <strong>DRIFT</strong>
        <span class="tierPrice">Free</span>
        <span class="tierText">Live FURAI session. No saved memory between visits.</span>
        <span class="tierAction">start free</span>
      </a>

      <a class="pricingTier" href="/ai?plan=signal">
        <span class="tierIndex">II</span>
        <strong>SIGNAL</strong>
        <span class="tierPrice">$9 / mo</span>
        <span class="tierText">FURAI remembers your identity and context across visits.</span>
        <span class="tierAction">choose signal</span>
      </a>

      <a class="pricingTier pricingTier-featured" href="/ai?plan=archive">
        <span class="tierIndex">III</span>
        <strong>ARCHIVE</strong>
        <span class="tierPrice">$29 / mo</span>
        <span class="tierText">Deeper archive responses, priority visuals, and expanded memory.</span>
        <span class="tierAction">choose archive</span>
      </a>
    </section>
  </main>
</body>
</html>`
}

export function renderUI(): string {
  return /* html */ `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
  <title>FURAI — AI interface to Velorum</title>
  <meta name="description" content="FURAI is the AI interface for entering Velorum, a living archive system. Ask questions, explore crew records, and return to a remembered signal." />
  <meta property="og:type" content="website" />
  <meta property="og:title" content="FURAI — AI interface to Velorum" />
  <meta property="og:description" content="Enter Velorum through FURAI: an AI archive interface with memory, lore, and meditative signal mode." />
  <meta property="og:site_name" content="FURAI" />
  <meta name="twitter:card" content="summary" />
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
  <a id="welcomeReturn" class="headerLink" href="/" aria-label="Return to welcome screen">
    WELCOME
  </a>
</header>

<div id="meditationControlLayer">
  <button id="meditationToggle" class="meditationSwitch" type="button" role="switch" aria-checked="false" aria-pressed="false" aria-label="Meditation mode">
    <span class="meditationSwitch-inner">
      <span class="meditationSwitch-label">MEDITATION</span>
      <span class="meditationSwitch-track" aria-hidden="true">
        <span class="meditationSwitch-thumb"></span>
      </span>
    </span>
  </button>
</div>

<main id="terminalWrap">
  <section id="terminalShell" aria-label="FURAI interface to the Velorum archive">
    <div id="orientationPanel" aria-label="FURAI orientation">
      <div class="orientationKicker">AI INTERFACE // VELORUM ARCHIVE</div>
      <h1>FURAI</h1>
      <p>Enter Velorum through a conversational archive. Ask about the vessel, the missing crew, sealed records, or switch into meditation mode.</p>
    </div>

    <div id="terminalMeta" aria-label="Velorum archive controls">
      <div class="metaItem metaItem-passive">FURAI // LIVE</div>
      <button id="viikaaKeyButton" class="metaItem metaItemButton" type="button" aria-label="Show Chief Engineer Viikaa archive photo">
        CREW RECORD // VIIKAA
      </button>
      <button id="rithanKeyButton" class="metaItem metaItemButton" type="button" aria-label="Show Captain Rithan archive photo">
        CREW RECORD // RITHAN
      </button>
      <button id="encryptedKeyButton" class="metaItem metaItemButton metaItemButton-jp metaItemButton-encrypted" type="button" aria-label="Encrypted archive access">
        SEALED RECORD // 暗号化
      </button>
    </div>

    <div id="log" role="log" aria-live="polite" aria-label="Terminal output"></div>

    <div id="inputDock">
      <label class="inputLabel" for="input">ask FURAI</label>
      <div id="inputRow">
        <input
          id="input"
          type="text"
          placeholder="Ask about Velorum, Rithan, Viikaa, or the sealed archive..."
          autocomplete="off"
          spellcheck="false"
          aria-label="Message input"
        />
        <button id="send" class="frameButton" type="button" aria-label="Send message">
          <span class="frameButton-inner">send</span>
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
    .replace(
      /'__CAPTAIN_RITHAN_PORTRAIT__'/g,
      JSON.stringify(OFFICIAL_PORTRAIT_DATA["captain-rithan"])
    )
    .replace(
      /'__CHIEF_ENGINEER_VIIKAA_PORTRAIT__'/g,
      JSON.stringify(OFFICIAL_PORTRAIT_DATA["chief-engineer-viikaa"])
    )
}
