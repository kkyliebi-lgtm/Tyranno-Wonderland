# Reverse-Engineered Prompt: TYRANNO WONDERLAND
## A Speculative Interactive Website — For use with Gemini 2.0 / advanced generative models

---

## PROJECT CONCEPT

Build a complete, production-ready interactive website called **"TYRANNO WONDERLAND"** — a speculative design project by visual designer **Yingqi Bi** that proposes a visual language system for communication between humans and Tyrannosaurus Rex.

**Conceptual premise:** Set in a near-future (2050s) where biotechnology has revived extinct species, this project addresses the gap between human and dinosaur cognition/sensory systems. Drawing from semiotics, Chinese oracle bone script, and ancient hieroglyphic traditions, the designer constructed a symbolic font system — **Tyranno** — that transforms T. Rex skeletal structures and limb movements into a shared graphic vocabulary, enabling cross-species coexistence in the city.

**Tone:** Speculative / critical design. Not horror, not playful — serious, futuristic, poetic, and architectural. The visual language is **technological + ancient + organic** simultaneously.

**Tech stack to implement:** React + Three.js (or WebGL) + MediaPipe Hands for gesture recognition.

---

## VISUAL DESIGN LANGUAGE

### Color Palette
- **Primary background:** Deep space black / near-void `#050508` or `#07070f`
- **Secondary background:** Dark navy-indigo `#0a0a1a`
- **Text primary:** Bright off-white / cool white `#e8eaf0`
- **Accent 1 — Electric / Bioluminescent:** Cyan-teal `#00d4ff` or `#00f0c8` — used for glowing particles, highlights, skeleton wireframes
- **Accent 2 — Amber/Fossil:** Warm ochre-gold `#d4a84b` or `#c8922a` — for typography accents, the Tyranno alphabet characters
- **Accent 3 — Mist/Fog:** Very pale lavender-white `rgba(200,210,255,0.15)` — frosted glass panels
- **Danger/Highlight red:** Used sparingly for compositional reference `#ff3030`
- **Particle color:** Soft white-blue `rgba(180,220,255,0.7)` for micro-particle effects

### Visual Atmosphere
- **Dense space + fog** — the site feels like arriving through clouds or mist into an unknown future world. Depth, layers, parallax.
- **Lunar / spaceship aesthetic** on hero (references: lunar environment with teleportation system; spaceship vessel perspective arriving at Wonderland).
- **Third reference aesthetic** (most dominant for load-in): Dense clouds or fog, camera zooms in, scene clears to reveal the Wonderland — a lush, technologically advanced symbiotic ecosystem where city and countryside have no boundaries.
- Futuristic architecture glimpsed through atmospheric haze: biodomes, floating structures, organic-tech hybrids.
- **Particle systems everywhere** — floating micro-particles suggest a living atmosphere.
- Scenes feel like looking through a **telescope or spacecraft window** — the user is an astronaut arriving.

### Typography
- **Display font:** A custom or near-custom angular, structural typeface. Use `Space Grotesk` or `Orbitron` for UI labels, but reserve the **Tyranno font** (the project's own symbolic alphabet) as decorative/featured display elements — render it as SVG glyphs derived from T. Rex skeletal forms.
- **Body font:** `Inter` or `DM Sans` — clean, neutral, legible on dark backgrounds.
- **Chapter numbers:** Formatted as `.01` `.02` `.03` etc. in monospaced, muted cyan.
- **Section labels:** Small caps, wide letter-spacing (`letter-spacing: 0.3em`), subdued color.
- All reading columns: `max-width: 720px`, `line-height: 1.75`.

### Tyranno Alphabet Visual Style
- Characters are **skeletal/bone-derived graphic symbols** — angular, structural, somewhere between Chinese oracle bone script and technical diagram.
- They should float, rotate slowly in 3D space, glow faintly in amber-gold.
- When displayed large, they should feel like **ancient hieroglyphs discovered in a sci-fi world**.

---

## SITE ARCHITECTURE

### Site Name & Title
- **TYRANNO WONDERLAND** — all caps in display contexts
- Subtitle: *"A Speculative Language System for Human–Tyrannosaurus Rex Communication"*
- Designer credit: *Yingqi Bi*

### Six Chapters (Navigation)
```
.01  WONDERLAND          — Hero / 2050 scenario world-building
.02  SKELETON FIELD      — Inspiration gathering / 3D skeletal interactive system
.03  TYRANNO ALPHABET    — First-generation font integration / interactive reveal
.04  THE MAZE            — Tyranno 2.0 / 3D maze treasure hunt (gesture-controlled)
.05  MEMORY FIELD        — Video gallery (Garden of Memory equivalent)
.06  TRANSLATION ENGINE  — Decryption/translation machine (human ↔ Tyranno)
```

### Global Navigation
- Fixed top bar (transparent with blur backdrop):
  - Left: **TYRANNO WONDERLAND** wordmark in wide-tracked caps + small Tyranno glyph SVG
  - Right: Chapter number nav (`.01` through `.06`) + language toggle (EN / 中文)
- Hamburger alternative for mobile: slides in full-screen dark overlay with chapter list
- Bottom persistent bar: `← Previous chapter` | `current chapter name` | `Next chapter →`

### Persistent Ambient Audio Player (bottom-fixed)
- Minimal: play/pause + track name + elapsed time
- Ambient/atmospheric sound design — low drone, processed prehistoric soundscape
- Playlist drawer: ~5–8 curated ambient tracks
- No season selector (replace with **ERA selector**: `PREHISTORIC | PRESENT | 2050`)

---

## SECTION 0: HERO LOADING EXPERIENCE

### Loading / Entry Animation
The site loads as if the user is **traveling through space-time** to arrive at Tyranno Wonderland. Three sequential visual phases, each ~1.5–2 seconds:

**Phase 1 — Lunar departure:** Dark environment, a teleportation dome structure visible, particles streaming upward. Text: coordinates or a single line in Tyranno glyphs.

**Phase 2 — Spaceship transit:** User's POV is inside a vessel, looking out through a viewport at approaching luminescent clouds. Speed lines / warp effect. The Tyranno alphabet characters flash briefly.

**Phase 3 — Arrival / fog clearing:** Dense clouds or fog fill the screen. Camera slowly zooms forward. As fog clears, the **Wonderland** is revealed — a bioluminescent future cityscape where structures are grown rather than built, T. Rex silhouettes move in the distance, particles fill the air. This is the **hero state**.

**Implementation:** Three.js scene or layered CSS/canvas animation. Use `requestAnimationFrame`. Particle system active throughout.

### Hero State (after fog clears)
- Full viewport, immersive 3D or parallax scene
- **Foreground:** Floating Tyranno alphabet glyphs drifting through the air (animated, 3D rotate, glow)
- **Midground:** Abstract particle-form representations of humans and T. Rex coexisting (NOT photorealistic — abstract particle clouds in humanoid and dinosaur silhouette shapes)
- **Background:** Futuristic symbiotic ecosystem — biodomes, organic architecture, lush vegetation integrated with technology
- **Hero text** (fades in after 3s):
  ```
  TYRANNO WONDERLAND
  49°51' Future / 20°49' 2050
  "A language born from bone."
  ```
- **Enter CTA:** `Enter the Wonderland →` — borderless, glowing text button
- **Notice:** `"Use headphones for the best experience"`
- **Gesture notice** (if on supported device): `"This site responds to hand gestures"`

---

## CHAPTER .01 — WONDERLAND (2050 Scenario)

**Concept:** Showcase the symbiotic future — what the 2050 ecosystem looks like when humans, animals, plants, and T. Rex coexist without the boundaries of city vs. countryside.

**Layout:** Full-width immersive editorial. No sidebar — content flows in large typographic blocks with atmospheric imagery.

**Visual approach:** Abstract particle-based representations rather than literal images. A human figure = warm particle cluster. A T. Rex = larger, cool-blue particle silhouette. They exist in the same field.

**Content blocks:**

1. **Opening statement** (large italic display text, ~3rem):
   > *"In 2050, the city has no edges. The forest has no fence. What was once extinct now walks beside us."*

2. **Ecosystem description** (3–4 paragraphs):
   - The biotechnology context: revival of T. Rex through genetic reconstruction
   - The communication problem: dinosaur sensory/cognitive systems are radically different from human language
   - The symbiotic city: no difference between urban and natural environments
   - The need for a new language

3. **World-building visual** (full-width): Animated particle field — particles self-organize into the shapes of humans, plants, animals, and T. Rex forms, then dissolve and re-form. Slow, meditative. 60fps.

4. **Pull-quotes** (scattered through scroll):
   > *"Traditional language is insufficient to address the vastly different cognitive and sensory structures of dinosaurs and humans."*
   > *"We needed a vocabulary written in bone."*

5. **Transition to next chapter:** `Discover the Inspiration →`

---

## CHAPTER .02 — SKELETON FIELD (Inspiration Gathering)

**Concept:** The research foundation — the T. Rex skeletal structure as the basis for the Tyranno language system. Includes a large interactive 3D skeletal model.

**Layout:** Two-panel — left: text/research annotations, right: large 3D interactive viewer.

**Discovery Progress Indicator:**
- `"You have explored X% of this chapter"` in small cyan
- Thin progress bar

**Content:**

### Left Panel — Research Notes
A scrollable list of research cards (equivalent to Maestro's Manor stories):
- *Why Skeletal Structure?* — On how bone forms encode movement intention
- *Oracle Bone Script* — How ancient Chinese divination writing informed the Tyranno system
- *Semiotics of Motion* — The body as message
- *T. Rex Limb Range* — Annotated movement vocabulary
- *Hieroglyphs as Precedent* — Egyptian, Sumerian, and Mayan visual language systems
- *Cross-Species Cognition* — What we know about dinosaur perception
- *The Design Decision* — Why abstract over phonetic

Each card:
- Title in amber-gold
- 2–3 sentence description
- Optional pull-quote (italic, cyan-tinted)
- `Read more →` link

### Right Panel — 3D Skeletal Interactive System
- **Large-scale 3D T. Rex skeleton model** rendered in Three.js / WebGL
- **Wireframe style:** Cyan/teal lines on black — like a holographic diagram
- **Interactive:** User can click/drag to rotate 360°, zoom, click individual bones to reveal annotations
- **Bone annotations:** Clicking a bone highlights it and shows a tooltip: bone name + its corresponding Tyranno alphabet character
- **Ambient animation:** Skeleton breathes (subtle scale pulse on ribcage), joints glow softly
- **Fallback:** If WebGL unavailable, show a high-quality SVG skeletal diagram with hover interactions

**Booth concept note:** A special interactive booth panel below the 3D model invites deeper exploration of the skeletal-to-glyph mapping.

---

## CHAPTER .03 — TYRANNO ALPHABET (First Generation Font)

**Concept:** Reveal of the Tyranno alphabet characters — the visual language system. Characters float in the air around human and T. Rex forms, revealed through interaction (clicks).

**Interaction mode** (mirrors Penderecki's Garden Chapter 1 structure):

### Initial State
- All Tyranno alphabet characters (A–Z equivalent, ~26 glyphs) **float and rotate** in a 3D ring/cloud formation in the center of the screen
- Only the **backs** of the "cards" are visible — showing a noisy texture / micro-particle halo (dark, mysterious)
- Human and T. Rex particle silhouettes drift through the floating alphabet cloud

### Gesture / Click Interaction (MediaPipe Hands if available, mouse fallback)

**Fist clench (or click-hold):**
- All character cards converge toward center, stack
- Hold for 0.5s → cards scatter throughout the scene

**Open hand / cursor move:**
- Movement vector controls a "pointer" that moves through the floating cards
- Particle afterimages trail the hand movement

**Single finger tap / click on a card:**
- Card-picking mode activates
- Screen magnifies the area where finger/cursor points
- Pointed card slowly moves to center, magnifies (1.2s transition)
- Particle floating effect added to card edges (frequency 2Hz, amplitude 6px)
- Other cards shrink and blur into background

**Single finger swipe left/right (or drag):**
- Flip animation (0.8s) — reveals card's **front texture**: the Tyranno character
- Front shows: glyph in amber-gold, mirrored reflections, slight noise
- Character name and meaning revealed (e.g. "STRIDE — forward movement of the hindlimb")

**Single finger swipe up/down:**
- Card collection animation (1.2s)
- Card rotates downward and disappears as particle light spots
- Simultaneously: icon for this character in the **"Achievement Zone"** lights up (bottom bar)
- Indicates successful collection

**Spread five fingers / press Escape:**
- Screen zooms out, returns to normal ring view (1.5s transition)
- Maze exploration (if in maze chapter) continues

**Two-finger flick bottom-to-top:**
- "Achievement Zone" expands with zoom-in effect
- Screen zooms to "Collected Characters" section
- All collected characters shown (lit up)
- Background slightly blurred

**Two-finger swipe top-to-bottom:**
- Achievement Zone retracts and closes
- Main background clears

### Achievement Zone (bottom bar, persistent in ch.03 and ch.04)
- Shows all 26 (or however many) Tyranno character slots as small icons
- Collected ones glow amber; uncollected are dark with question mark
- Equivalent to Penderecki's music discovery progress
- "You have collected X / 26 characters"

### Camera Feed (Chapter .03 only, if MediaPipe active)
- 320×240 live camera feed fixed in upper-right corner
- Overlaid with gesture skeleton (joints + lines) detected by MediaPipe, 80% opacity
- Small, unobtrusive

### Technical requirements for gesture system:
- Animation easing: cubic-bezier(0.77, 0, 0.175, 1)
- Particle effects: GPU-accelerated, off main thread
- Flowing texture on card back: GLSL shader
- Camera layer updates synchronously with main screen at 60fps
- Fallback UI for users without camera access (mouse mode)
- Gesture state machine logic encapsulated (single responsibility)
- Modular architecture: rendering layer / gesture recognition layer / state machine / visual asset configuration
- Code adheres to KISS + SOLID principles (VSNOL 503239382)
- Guided gestures shown on page load; fallback to mouse mode provided

---

## CHAPTER .04 — THE MAZE (Tyranno 2.0 / Treasure Hunt)

**Concept:** A 3D maze built using the **Tyranno logo as the base graphic**. Users navigate the maze to find scattered Tyranno 2.0 character cards. Gesture-controlled (MediaPipe) with mouse fallback. Functions as a treasure hunt / achievement collector.

**Visual design:**
- 3D maze rendered in Three.js — dark space, walls are semi-transparent amber-tinted panels
- Maze floor has subtle Tyranno glyph engravings glowing faintly
- **Tyranno 2.0 character cards** randomly scattered throughout: visible as glowing rectangular objects
- **Hint particles:** Tiny, sparkling cyan particles appear occasionally as hints, guiding users toward unexplored corners
- **Camera:** Top-down or first-person (toggle), smooth movement

**Initial state animation:**
- All cards appear stacked in screen center, floating and rotating in a ring
- Only card backs visible — noisy texture, micro-particle halos
- Animation: cards scatter from stacked center-state to various maze positions (within 1 second)
- Then exploration begins

**Navigation:**
- WASD / arrow keys or mouse-click-to-move
- Collision detection against maze walls
- Smooth `requestAnimationFrame` movement

**Card discovery:**
- When user reaches a card: golden pulse radiates from it
- User can interact (click / gesture) to "pick up" the card — flip animation reveals character front
- Card collected → slot in Achievement Zone lights up → card disappears as particle burst

**Achievement Zone (same as Ch.03):**
- Displayed as a panel at screen bottom: "COLLECTED ACHIEVEMENTS"
- Replaces the Music Salon's "expand" function from Penderecki's Garden
- When user finds and closes a card, corresponding slot lights up permanently
- Two-finger flick up / click button → Achievement Zone expands to full overlay showing all collected characters

**Maze completion:**
- When all cards found: message appears:
  > *"You have decoded the Tyranno system. The language is now yours."*
- CTA: `Read more about the Tyranno font →` and `Explore again`

**Technical note on 3D cards (if feasible):**
- Cards could be 3D models of each Tyranno character
- Flip effect: character gradually appears from the flat card as a 3D effect, detaches from card
- Users can use gestures to manipulate each character: rotate 360°, view details
- Fallback: 2D card flip with CSS `transform: rotateY(180deg)`

---

## CHAPTER .05 — MEMORY FIELD (Video Gallery)

**Concept:** Mirrors the "Garden of Memory" from Penderecki's Garden — a chronological stream of video testimonials, statements, and documentation related to the Tyranno project. All video footage replaced with Tyranno-relevant video content.

**Layout:** Horizontal scroll stream of memory cards (same structure as original).

**Memory types:**

1. **Video memories** (embedded video players, autoplay on hover):
   - Project documentation videos
   - Designer's process footage
   - Expert interviews (paleontologists, semioticians, designers)
   - Exhibition footage

2. **Text memories** (written statements, press coverage, academic references):
   - Quotes from design critics
   - Academic references on cross-species communication
   - Historical references to hieroglyphic systems

3. **Audio memories** (inline player):
   - Ambient recordings from the project context
   - Voice-over narrations

**Each memory card:**
- Author/title
- Date (DD.MM.YYYY)
- Media player or video thumbnail (dark, atmospheric)
- `Play / Pause` button
- `Read more →` link

**Horizontal scroll navigation:** `← Scroll backward` `Scroll forward →`

**"Leave a Memory" form:**
- Text area: "Share your response to Tyranno Wonderland"
- Submit button: `Send`
- Confirmation message in Tyranno glyphs + English: *"Your message has been received."*

**Consistent presentation style:** Same layout architecture as Garden of Memory but all content is Tyranno-specific.

---

## CHAPTER .06 — TRANSLATION ENGINE (Decryption Machine)

**Concept:** A translation/decryption machine that translates between human language and the Tyranno system — like Google Translate, but for cross-species communication. Designed like a sci-fi interface panel.

**Layout:**
- Occupies the **bottom third of the screen** — two semi-transparent, slightly frosted floating windows side by side
- Main background (top two-thirds): blurred atmospheric scene from the Wonderland

**Two translation windows:**
- **Left window:** Labeled `HUMAN LANGUAGE` (in English or selected human language)
- **Right window:** Labeled `TYRANNOSAURUS REX` — displays Tyranno glyphs
- **Center:** Translation/decryption symbol between them (Tyranno glyph that means "bridge" or "translation")

**Interaction:**
- User types in left window → Tyranno glyphs appear in right window (animated, characters materialize one by one)
- Windows can be **swapped** (swap button between them): Tyranno glyphs → translates to human language
- Translation is **symbolic/poetic** rather than literal — the Tyranno system encodes motion and relationship concepts

**"Send" button:**
- Below the two windows
- Sends translation result to the **main screen** — like a balloon floating upward
- Animation: result text/glyph floats up from the bottom panel into the main viewport, drifts, fades
- Similar to a message in a bottle launched upward

**Visual details:**
- Windows: `backdrop-filter: blur(12px)`, slight frost/noise texture overlay
- Window border: 1px cyan glow
- Tyranno characters in right window: amber-gold, slight animation (scale pulse on entry)
- The swap button: rotary arrow icon, smooth 180° spin animation on click

**Language options (left window):**
- English, 中文 (Chinese), + others (dropdown)

---

## GLOBAL INTERACTIVE SYSTEMS

### Gesture Recognition (MediaPipe Hands) — Chapter .03 and .04
See detailed spec in Chapter .03 above. Key requirements:
- Debouncing on all gesture state transitions
- State machine: IDLE → GESTURE_DETECTED → ACTION → RETURN_TO_IDLE
- Camera feed overlay: 320×240, 80% opacity, upper-right corner
- All gestures have mouse/keyboard fallbacks

### Ambient Sound Player (Persistent Bottom Bar)
- Fixed bottom strip: play/pause | track name | elapsed time | open playlist
- Playlist drawer slides up from bottom
- Tracks: atmospheric ambient compositions (processed dinosaur/prehistoric soundscapes, future-city hum, bioluminescent textures)
- Era selector: `PREHISTORIC | PRESENT | 2050`

### Particle System (Global)
- Active on all pages — very subtle floating micro-particles (`rgba(180,220,255,0.4)`)
- Density increases in interactive zones
- Particles respond to mouse movement (gentle repel/attract within 80px radius)

### Scroll Behavior
- `IntersectionObserver` for reveal animations
- Each content block: `translateY(40px) → 0`, `opacity 0 → 1`, staggered 80ms delays
- Parallax on atmospheric background layers (0.3–0.5× scroll speed)

### Chapter Transitions
- Horizontal slide: current chapter slides out left, next slides in right
- Fog/particle burst at transition moment
- Tyranno glyph briefly fills screen (100ms flash) between chapters

---

## RESPONSIVE DESIGN

- **Desktop (≥1280px):** Two-panel layouts, full 3D maze, gesture interaction active
- **Tablet (768–1279px):** Single column, simplified 3D (lower poly), gesture reduced
- **Mobile (<768px):** All single column, maze replaced with 2D top-down version, touch controls, Translation Engine stacks vertically, ambient player collapses to icon

---

## ACCESSIBILITY

- Skip links: visually hidden, keyboard focusable
- All Tyranno glyphs have `aria-label` with their meaning in plain text
- Audio player: full keyboard controls
- Gesture interactions: complete mouse/keyboard fallbacks provided on page load
- Contrast mode toggle in footer
- `lang="en"` on root, `lang="zh"` on Chinese text
- Focus-visible outlines in cyan

---

## FOOTER

- **Designer credit:** Yingqi Bi | [Project Year]
- **Links:** About | Process | Contact
- **Academic context:** Brief one-liner about the project's speculative design framework
- **Contrast mode toggle**
- Small Tyranno glyph as decorative footer motif (meaning: "end / return")

---

## CONTENT PLACEHOLDERS

Since final content assets are not yet available:
- `[VIDEO_SRC_PLACEHOLDER]` — styled dark video card with play button + Tyranno glyph overlay
- `[TYRANNO_GLYPH_SVG]` — generate 6–8 sample SVG glyphs derived from angular bone-like strokes (use SVG path elements, amber-gold `#d4a84b` stroke, no fill, `stroke-width: 2`)
- `[3D_SKELETON_PLACEHOLDER]` — render a Three.js wireframe T. Rex skeleton using basic geometry primitives (boxes, cylinders, spheres) in cyan wireframe mode
- `[MAZE_STRUCTURE]` — generate a solvable grid maze in Three.js, walls as `BoxGeometry` with amber-tinted `MeshStandardMaterial`
- `[AMBIENT_AUDIO]` — Web Audio API generated drone: oscillator at 60Hz, filtered, with slow LFO modulation
- `[PARTICLE_SYSTEM]` — Three.js `Points` with `PointsMaterial`, ~2000 particles, slow drift animation

---

## SAMPLE TYRANNO GLYPH SVG STYLE

```svg
<svg width="80" height="80" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
  <!-- "STRIDE" glyph — forward hindlimb movement -->
  <g stroke="#d4a84b" stroke-width="2" fill="none" stroke-linecap="round">
    <line x1="40" y1="10" x2="40" y2="35"/>       <!-- spine -->
    <line x1="40" y1="35" x2="20" y2="55"/>       <!-- left femur -->
    <line x1="20" y1="55" x2="15" y2="70"/>       <!-- left tibia -->
    <line x1="40" y1="35" x2="58" y2="52"/>       <!-- right femur -->
    <line x1="58" y1="52" x2="65" y2="70"/>       <!-- right tibia -->
    <circle cx="40" cy="10" r="4" fill="#d4a84b"/> <!-- head joint -->
    <circle cx="40" cy="35" r="3"/>               <!-- hip joint -->
  </g>
</svg>
```

All Tyranno glyphs follow this pattern: **skeletal joints as circles, bones as lines, angular and architectural**.

---

## SAMPLE PULL-QUOTE STYLE

```
"A park is like a music score —
a fugato in one place,
monophonic texture in another."
```

Becomes for Tyranno:

```
"A language is like a skeleton —
compression in one joint,
extension in another."
— Yingqi Bi, Tyranno Wonderland
```

Rendered as: large italic display font (~2.2rem), amber-gold tint, left border 3px cyan, attribution in small-caps 0.75rem warm grey.

---

## OUTPUT REQUIREMENT

Produce the **complete, single-file HTML source code** of the full website — all CSS in `<style>` tags, all JavaScript in `<script>` tags (React + Three.js loaded via CDN), all SVG glyphs inline. The output must be a fully renderable, self-contained `.html` file that, when opened in a browser, recreates:

1. The fog-clearing hero load animation (Three.js or CSS canvas)
2. All 6 chapters with correct layout and navigation
3. The floating Tyranno alphabet card system with flip interactions (mouse fallback for gesture)
4. The 3D wireframe T. Rex skeleton viewer (Chapter .02)
5. The 3D maze with card scatter and collection (Chapter .04)
6. The frosted-glass Translation Engine (Chapter .06)
7. The persistent ambient audio player with era selector
8. The global particle system
9. The Achievement Zone bottom bar
10. Full responsive design

MediaPipe integration: include the MediaPipe Hands CDN script and initialize the gesture recognition system. Provide a graceful mouse-mode fallback on load for users without camera access.
