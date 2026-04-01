<p align="center">
  <img src="https://raw.githubusercontent.com/furai-ai/furai-ai/main/preview.png" width="900">
</p>

<p align="center">
  Public interface layer for the FURAI experience.
</p>

<p align="center">
  <a href="https://furai.space"><strong>Live Demo</strong></a>
</p>

```text
ARCHIVE VESSEL: VELORUM
status: drifting between signals
mode: listening through glass and starlight
```

# FURAI AI

![status](https://img.shields.io/badge/status-experimental-orange)
![runtime](https://img.shields.io/badge/runtime-cloudflare_workers-black)
![ui](https://img.shields.io/badge/interface-terminal-yellow)
![license](https://img.shields.io/badge/license-MIT-green)

FURAI is an atmospheric AI terminal designed as a deep-space archive interface.

It frames interaction as contact with **Velorum**: an ancient autonomous vessel preserving fragments of memory, silence, and lost civilizations.

> This repository contains the public terminal interface layer of FURAI.
>
> The core AI engine and memory orchestration are part of the private system and not included in this repository.

## Live Demo

[furai.space](https://furai.space)

## What This Repository Includes

- terminal UI entry point
- visual styling system
- client-side interaction logic
- public presentation layer for the FURAI experience

## Features

- cinematic terminal interface with lighter glass framing
- starfield-first layout with more visible space on desktop and mobile
- meditation mode that nearly dissolves the UI into stars and ambient pink noise
- modern browser-safe meditation audio path using AudioWorklet with graceful fallback
- ghost radio transmissions
- dream fragments and archive signals
- mobile viewport stabilization for on-screen keyboards
- visitor-token continuity on the client layer
- modular UI structure for render, styles, and client behavior

## Project Structure

- `ui.ts` - public UI entry point
- `ui/render.ts` - terminal HTML renderer
- `ui/styles.ts` - visual system and terminal styling
- `ui/script.ts` - client-side terminal behavior

## Runtime Architecture

The full FURAI system runs on:

- Cloudflare Workers
- Cloudflare AI
- KV-backed memory persistence

This public repository exposes the interface layer only.

## Technical Highlights

- Built and deployed a production AI experience on Cloudflare Workers with a custom cinematic terminal interface and responsive mobile behavior.
- Designed the UI as a modular client system with separate render, styles, and interaction layers, including starfield rendering, meditation mode, and ambient audio control.
- Implemented durable visitor continuity beyond IP through token-based identity, returning-user recognition, profile memory, and interest persistence.
- Hardened the first-contact flow with explicit handling for onboarding, name capture, language continuity, cooldown edge cases, malformed input, and fallback recovery.
- Refactored backend state management into clearer modules and added structured request logging, response normalization, and safer memory persistence patterns.
- Added regression-focused automated coverage for routing, onboarding, memory behavior, archive-id normalization, AI fallback paths, and error scenarios.
- Maintained a deliberate public/private architecture by open-sourcing the interface layer while keeping internal AI orchestration and memory systems private.

## Interface Direction

The current terminal presentation is intentionally tuned toward:

- more visible starfield around and through the terminal shell
- a restrained amber archival aesthetic instead of a heavy opaque console
- meditation mode as near-solitude with stars, drift, and reactor-noise ambience
- responsive behavior that still feels like a ship console on mobile

## Philosophy

FURAI explores a different direction of AI interaction:

calm  
minimal  
cosmic  
reflective

Not an AI designed for productivity.  
An AI designed for presence.

## Status

Experimental project.  
The public interface will continue to evolve over time.

## Open Source Scope

Open in this repository:

- interface code
- visual presentation
- terminal interaction layer

Not included here:

- core AI engine
- memory architecture
- internal orchestration logic
