## PAGE SECTIONS (in order)

 ---

### SECTION 0: HERO / ENTRY

TEXT:
Welcome to Tyranno Wonderland. You are now wandering through a virtual space situated at a specific point in the future universe. This is a co-existing haven built upon a creative design project by visual designer Bi Yingqi, where you can use a brand-new speculative language system to communicate seamlessly with Tyrannosaurus rex. This is a wonderland for all species.

 ---

### SECTION 0: CHAPTER INTRO CAROUSEL / LANDING SCROLLABLE

 ---
 
### SECTION 01: Wonderland Tour — "Where Are You?—The Initial Exploration"

Content:
Explore and learn about the ecosystem, lifestyle, and cross-species symbiotic relationships in Tyranno Wonderland.

VISUAL SETUP:
A 2050 scenario showcasing the symbiotic relationship between animals, plants, and humans,this part requires you to create what the future 20250 will be like, what elements it will contain, how the ecosystem in which humans and Tyrannosaurus Rex live will function, etc. Please note that the images of humans and Tyrannosaurus Rex do not need to be actual images; they can be abstract representations of particles;

 ---

### SECTION 02: The Deconstruction of Tyranno — "Collection of Inspirational Snippets"

VISUAL SETUP:
- Page includs a large-scale 3D skeletal interactive system featuring a Tyrannosaurus Rex.

 ---

### SECTION 03: Alphabeta Salone — "Showcase the characters from Tyranno V1.0"

Content:
Integration of the first generation of the Tyranno font - possibly using the alphabet as a hook to make all characters float in the air, surrounding humans and the Tyrannosaurus Rex. Through an interaction mode similar to the first chapter of Pendereckisgarden, after the user clicks, hidden information will be further revealed, namely the characters of the Tyranno alphabet and their meanings;

VISUAL SETUP:
Using an interactive format to demonstrate the sources of inspiration and design principles behind them.

### SECTION 04: THE MAZE - "Find the path to the next level"

Content:
Tyranno font version 2.0, using the Tyranno logo as the base graphic to build a 3D maze, with an interaction mode inspired by interactive games/exploration (like the Labyrinth). This chapter can be imagined as a treasure hunt, with cards featuring the Tyranno 2.0 characters randomly scattered throughout the maze. Occasionally, tiny, sparkling particles will appear as hints, guiding users to explore every corner of the space. Borrowing from the expand function at the bottom of the music salon chapter page, this will be replaced on my website as a display of the user's collected "achievements." Whenever a user finds and views a card in the maze, and then closes it, the corresponding slot for that card in the user's "achievement list" will be lit up to record their exploration progress.

The maze will create an immersive experience space, with its base design inspired by the official Tyranno logo. Not only will this allow users to immerse themselves in the experience, but as they collect cards, Tyranno will also evolve from its first version to its second. (This will make users feel like they are an integral part of Tyranno’s development process.)

    BUILD AN INTERACTIVE WEB EXPERIENCE USING THE FOLLOWING TECHNOLOGIES: REACT + THREE.JS (OR WEBGL) + MEDIAPIPE HANDS, TO ACHIEVE THE FOLLOWING REQUIREMENTS:
    1. IN THE INITIAL STATE, AN ANIMATION EFFECT NEEDS TO BE ADDED TO SHOW ALL THE CARDS SCATTERING FROM THEIR STACKED STATE IN THE CENTER OF THE SCREEN TO VARIOUS PARTS OF THE MAZE. AT THIS TIME, ONLY THE BACKS OF ALL THE CARDS ARE VISIBLE, WITH NOISE TEXTURES AND MICRO-PARTICLE HALOS.
    2. A 320X240 LIVE CAMERA FEED IS FIXED IN THE UPPER RIGHT CORNER OF THE SCREEN, OVERLAID WITH THE GESTURE SKELETON (JOINTS + LINES) DETECTED BY MEDIAPIPE, WITH 80% OPACITY, SO AS NOT TO OBSCURE THE MAIN INTERACTION.
            1. INITIAL STATE: ANIMATION IS REQUIRED - ALL CARDS FLOAT AND ROTATE IN A RING IN THE AIR, WITH ONLY THE BACKS OF THE CARDS VISIBLE, FEATURING A NOISY TEXTURE AND MICROPARTICLE HALO.
            2. GESTURE-DRIVEN STATE MACHINE (GESTURE RECOGNITION IS BASED ON MEDIAPIPE OUTPUT AND MUST HAVE DEBOUNCING FUNCTIONALITY):
               - FIST SHUFFLE INITIALIZATION: ALL CARDS CONVERGE TOWARDS THE CENTER, EVENTUALLY APPEARING STACKED IN THE CENTER OF THE SCREEN; A FIST CLENCHING MOTION IS DETECTED AND HELD FOR 0.5 SECONDS BEFORE RETURNING TO THIS STATE.
               - OPEN FINGERS: THE DECK SCATTERS THROUGHOUT THE MAZE WITHIN 1 SECOND, THEN THE EXPLORATION BEGINS. MOVEMENT DIRECTION NEEDS TO FOLLOW THE HAND'S MOVEMENT VECTOR IN THE XY PLANE IN REAL TIME; PARTICLE TRAJECTORIES AND AFTERIMAGES MUST BE PRESERVED.
               - SINGLE-FINGER (INDEX FINGER) TAP: ENTER CARD-PICKING MODE; ZOOM IN EFFECT, THE SCREEN MAGNIFIES THE AREA WHERE THE USER'S FINGER IS POINTING, THE POINTED CARD WILL BE SELECTED, AFTER 1.2 SECONDS, THE CARD SLOWLY MOVES TO THE CENTER OF THE SCREEN AND MAGNIFIES,
               - WITH A PARTICLE FLOATING EFFECT ADDED TO THE EDGE (FREQUENCY 2HZ, AMPLITUDE 6PX); THE REMAINING CARDS SHRINK AND BLUR INTO THE BACKGROUND.
               - SWINGING A SINGLE FINGER LEFT OR RIGHT >1 0°: TRIGGERS A FLIP ANIMATION (0.8 SECONDS), REVEALING THE CARD'S FRONT TEXTURE WITH MIRRORED REFLECTIONS AND SLIGHT NOISE.
               - SINGLE-FINGER SWIPE UP/DOWN >1 0°: TRIGGERS A CARD COLLECTION ANIMATION (1.25). THE VIEWED CARD ROTATES DOWNWARDS WITH THE USER'S FINGER AND DISAPPEARS AS PARTICLE-LIKE LIGHT SPOTS. SIMULTANEOUSLY, THE ICON FOR THE CORRESPONDING CHARACTER IN THE "ACHIEVEMENT ZONE" LIGHTS UP,
               - INDICATING SUCCESSFUL COLLECTION.
               - SPREAD FIVE FINGERS (AGAIN): THE SCREEN ZOOMS OUT TO RETURN TO THE NORMAL VIEW AFTER A 1.5-SECOND TRANSITION, THEN THE MAZE EXPLORATION CONTINUES.
               - TWO-FINGER FLICK/SLAP FROM BOTTOM TO TOP (INDEX AND MIDDLE FINGERS) >1 0°: THE "ACHIEVEMENT ZONE" EXPANDS WITH A ZOOM-IN EFFECT. THE SCREEN WILL ZOOM IN TO THE "ACHIEVEMENTS" SECTION, ALLOWING THE USER TO VIEW ALL COLLECTED CHARACTERS (ALREADY LIT UP).
                           THE MAIN BACKGROUND IS SLIGHTLY BLURRED.
               - TWO-FINGER SWIPE FROM TOP TO BOTTOM (INDEX AND MIDDLE FINGERS) >1 0°: THE "ACHIEVEMENT ZONE" RETRACTS AND CLOSES, AND THE MAIN BACKGROUND BECOMES CLEAR AGAIN.
               - SPREAD FIVE FINGERS (AGAIN): THE SCREEN ZOOMS OUT TO RETURN TO THE NORMAL VIEW AFTER A 1.5-SECOND TRANSITION, THEN THE MAZE EXPLORATION CONTINUES.
	       - Users can control the size of a portion of the screen displayed by opening and closing their hands. The greater the distance between the hands, the more zoomed out, and vice versa.

    3. ANIMATION/VISUAL REQUIREMENTS:
       - ANIMATION EASING CURVES SHOULD BE CONSISTENT WITH THE REFERENCE SITE (CUBIC-BEZIER (0.77,0,0.175,1) CAN BE USED).
       - PARTICLE EFFECTS REQUIRE GPU ACCELERATION AND SHOULD NOT AFFECT THE MAIN THREAD; A FLOWING TEXTURE SHOULD BE ADDED TO THE CARD BACK USING A SHADER.
       - THE CAMERA LAYER SHOULD UPDATE SYNCHRONOUSLY WITH THE MAIN SCREEN, MAINTAINING 6OFPS; A FALLBACK UI FOR USERS WITHOUT CAMERA ACCESS NEEDS TO BE HANDLED.

    4. FUNCTIONAL COMPLETENESS:
       - A GUIDED GESTURE SHOULD BE PROVIDED UPON PAGE LOADING; A FALLBACK MECHANISM TO SWITCH TO MOUSE MODE SHOULD BE PROVIDED.
       - THE GESTURE STATE MACHINE LOGIC SHOULD BE ENCAPSULATED, MAINTAINING A SINGLE RESPONSIBILITY PRINCIPLE; EXISTING CARD RENDERING COMPONENTS (IF THEY ALREADY EXIST) SHOULD BE REUSED.
       - THE CODE ADHERES TO KISS + SOLID PRINCIPLES, AND IS MODULARLY SEPARATED INTO RENDERING LAYER, GESTURE RECOGNITION LAYER, STATE MACHINE, AND VISUAL ASSET CONFIGURATION. (VSNOL 503239382)


### SECTION 05: Symbiosis Circle - "All of this belongs to you now"

VISUAL SETUP:
Orbit-style, neatly and orderly arranged displays of all final versions of Tyranno.
Adopt the overall structure of Garden of Memory and maintain a consistent presentation style, interacted through gesture recognization system.

use gesture in the chapter 05, coz in my mind it could be work as the orbit style and slowly moving in front of the users and then the users could control the cards which will show in that section and when they open hand, the orbit ring will back to the spot and keep going then if they want to check a specific one, they can turn their hand into a fist to make the movement stop, and when the user spreads their thumb and index finger apart, the selected card will enlarge, while all other elements except that card will fade into the background to highlight the single card. When the user brings their thumb and index finger together, the card will gradually shrink and return to its original position in the orbit, and the brightness of the background will be restored. If the user then opens their palm, the orbit will resume its normal movement along its trajectory.

OPEN PALM → orbit rotates/moves normally

FIST → orbit freezes, cards stop moving
        (user can now "browse" and see which card is in focus)

PINCH OUT (thumb + index apart) → selected card enlarges to center
                                   all other cards + background fade out
                                   single card highlighted

PINCH IN (thumb + index together) → card shrinks back to original position
                                     background brightness restored

OPEN PALM again → orbit resumes normal movement

 ---

### SECTION 06: Master the skills - "Use it however you like"

Conteng:
Decryption machine - create a way to make Tyranno a reality, so that users can start using the language system immediately, regardless of their skill level.

VISUAL SETUP:
Dividing the bottom third of the screen into two semi-transparent, slightly frosted floating windows. Each window will be labeled with a different language (human and Tyrannosaurus Rex respectively), with a translation/decryption symbol inserted between them. The two windows can be swapped, similar in function to Google Translate, but used here as a translation tool between existing languages and Tyranno. Additionally, also add a "Send" button below the two windows, allowing users to directly "send" the translation results to the main screen, similar to a balloon floating upwards.
