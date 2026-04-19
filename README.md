# TYRANNO WONDERLAND

> *"A language born from bone."*

**TYRANNO WONDERLAND** is a speculative interactive web experience designed by **Yingqi Bi**, proposing a visual language system for communication between humans and Tyrannosaurus Rex.

---

## Concept

Set in a 2050 future where biotechnology has made it possible to revive extinct species, this project addresses a fundamental gap: traditional human language is insufficient to bridge the vastly different cognitive and sensory structures of humans and dinosaurs.

To solve this, the project draws from **semiotics**, the history of **ancient hieroglyphics** (including Chinese oracle bone script), and the **skeletal biology of T. Rex** — constructing a symbolic font system called **Tyranno**. This system transforms dinosaur skeletal structures and limb movements into a shared graphic vocabulary, enabling cross-species coexistence in the city.

By blending **critical design** with **historical typography**, TYRANNO WONDERLAND explores how visual communication can transcend biological boundaries between species.

---

## Website Structure

The website consists of six chapters:

| Chapter | Name | Description |
|---------|------|-------------|
| `.01` | **WONDERLAND** | A 2050 scenario showcasing the symbiotic ecosystem where humans, animals, plants, and T. Rex coexist |
| `.02` | **SKELETON FIELD** | Inspiration gathering — including a large-scale 3D interactive T. Rex skeletal system |
| `.03` | **TYRANNO ALPHABET** | First-generation Tyranno font, revealed through gesture-based interaction (MediaPipe Hands) |
| `.04` | **THE MAZE** | Tyranno 2.0 — a 3D maze treasure hunt built from the Tyranno logo, with collectible character cards |
| `.05` | **MEMORY FIELD** | Video, audio, and text documentation related to the project |
| `.06` | **TRANSLATION ENGINE** | A human ↔ Tyranno decryption/translation interface |

---

## Technology

- **React** — UI framework
- **Three.js / WebGL** — 3D skeletal viewer, maze, particle systems
- **MediaPipe Hands** — gesture recognition interaction (Ch. `.03` and `.04`)
- **Web Audio API** — ambient sound player
- **GLSL Shaders** — card back texture, particle effects

---

## Repository Structure

```
tyranno-wonderland/
│
├── assets/
│   ├── images/          ← visual references and mood boards
│   ├── fonts/           ← Tyranno font files (.ttf, .otf, .woff)
│   ├── videos/          ← project video footage
│   └── glyphs/          ← individual Tyranno glyph SVGs
│
├── docs/
│   ├── concept.md       ← full project brief and concept description
│   ├── chapters.md      ← chapter-by-chapter content breakdown
│   └── visual-guide.md  ← color palette, typography, visual references
│
├── prompts/
│   └── tyranno_wonderland_prompt.md  ← reverse-engineered site prompt for AI generation
│
└── README.md
```

---

## Visual Direction

- **Palette:** Deep space black + bioluminescent cyan + amber-fossil gold
- **Atmosphere:** Fog-clearing arrival into an unknown future realm; lunar / spaceship aesthetics transitioning into a lush symbiotic ecosystem
- **Typography:** Angular, structural display typeface + Tyranno symbolic glyphs (bone-derived SVG paths)
- **Motion:** Particle systems, floating glyphs, gesture-driven card interactions, 3D environments

---

## Designer

**Yingqi Bi**
Visual Designer — Speculative & Critical Design

---

## Status

🚧 *In development — assets and content being finalized.*
