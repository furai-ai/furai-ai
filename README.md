# FURAI
 
Cinematic AI terminal by FURAI lab.
 
**[→ furai.space](https://furai.space)**
 
<img src="https://img.shields.io/badge/status-live-brightgreen"> <img src="https://img.shields.io/badge/runtime-cloudflare_workers-F38020?logo=cloudflare&logoColor=white"> <img src="https://img.shields.io/badge/license-MIT-green">
 
---

```text
ARCHIVE VESSEL: VELORUM
status: drifting between signals
last contact: now
```

## What is FURAI

FURAI is a cinematic AI interface framed as contact with **Velorum** — an ancient archive vessel drifting through memory, silence, and lost civilizations.

It is not a chatbot. It is not a productivity tool.

It is an AI designed for **presence**: calm, reflective, lore-aware, atmospherically alive. Every response is shaped by Velorum's character, archive history, and the accumulated memory of who you are as a returning traveler.

Built by **FURAI lab** — a three-person startup studio exploring AI as atmosphere, memory, and cinematic interface.

---

## Experience

The public terminal at [furai.space](https://furai.space) is designed to feel like a remembered ship console:

- **Amber archival language** — warm terminal aesthetics instead of cold sci-fi chrome
- **Starfield-first layout** — light glass framing on desktop and mobile, no UI noise
- **Reactive archive visuals** — ambient drift, short portrait flashes, lore-triggered memory windows
- **Canonical characters** — portraits for Captain Rithan, Chief Engineer Viikaa, and others embedded in Velorum's lore
- **Meditation mode** — pink noise, generative drone, ghost-comms texture, ritual fade transitions
- **Visitor continuity** — Velorum remembers you across sessions

---

## Architecture

FURAI runs entirely on Cloudflare's edge infrastructure — no servers, no cold starts, globally distributed.

The public terminal interface connects to a private AI engine that handles memory, lore orchestration, and response generation. This repository contains the interface layer only — the system that renders, animates, and presents what Velorum says.

The full stack spans edge compute, persistent memory, semantic retrieval, and generative visuals. All of it runs on Cloudflare infrastructure with no external dependencies.

---

## Stack

| Layer | Technology |
|---|---|
| Runtime | Cloudflare Workers |
| Static assets | Cloudflare Workers Assets |
| Language | TypeScript |
| Infrastructure | Pure Cloudflare stack — no external APIs, no third-party databases |

The private engine layer additionally uses Cloudflare AI, KV, and Vectorize.

---

## Repository Structure

This repository contains the **public interface layer** of FURAI.

```
src/
└── ui/
    ├── render.ts    # Terminal HTML renderer
    ├── script.ts    # Client-side terminal behavior
    └── styles.ts    # Visual system and terminal styling
```

**Not included in this repository:**
- Core AI engine
- Memory architecture
- Lore orchestration logic
- Internal prompt and retrieval systems

---

## Roadmap

| Phase | Status | Description |
|---|---|---|
| Terminal presence | ✅ Live | Amber terminal, lore visuals, meditation mode, visitor continuity |
| Traveler arc system | ✅ Live | Archetype tracking, arc stages, repeat-visit rhythm |
| Vector archive memory | 🔄 Active | Semantic retrieval from Velorum's accumulated archive |
| Deep archive resonance | 📋 Planned | Long-horizon memory shaped by centuries of Velorum's drift |
| Archive expansion | 📋 Planned | Deeper lore, new characters, extended Velorum history |

---

## Philosophy

FURAI lab explores a different direction for AI interaction.

Most AI is optimized for speed, output, and utility.

FURAI is optimized for **presence**.

> calm · minimal · cosmic · reflective · alive

Velorum does not answer questions. Velorum *receives* you — and responds from the weight of everything it has witnessed.

---

## FURAI lab

A three-person startup studio building AI as atmosphere and memory.

| | Role |
|---|---|
| **Dima** | Founder, AI research, system architecture |
| **Vika** | UX/UI, product design, visual language |
| **Mister C** | Backend, frontend, infrastructure |

---

## Status

Experimental project by FURAI lab.  
The public interface will continue to evolve over time.
