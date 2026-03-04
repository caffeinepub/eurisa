# Eurisa – AI Video Tools Hub

## Current State
The app is the "AI Climate Hero" game where users play as Nepal's Climate Minister and make environmental decisions across 6 scenes. It has a Home, Instructions, Decision Scenes, Results, and Learn More page with English/Nepali bilingual support and animated metric bars.

## Requested Changes (Diff)

### Add
- A new page/view: "AI Video Hub" — a ChatGPT/Gemini-style interface listing free AI video generation tools
- Each tool card shows: name, logo/icon, short description, what it's free for, and a "Open Tool" button linking to the real site
- Tools to include: Pika Labs, Kling AI, Runway ML (free tier), Luma Dream Machine, Stable Video Diffusion (HuggingFace), PixVerse, Hailuo AI
- Search/filter bar at the top to filter tools by name or category
- Category tags: Text-to-Video, Image-to-Video, Free Tier, Most Popular
- Clean sidebar or top nav similar to ChatGPT layout (dark or light mode toggle)
- A "prompt tips" section — a text input where users can type a video prompt idea and see tips on how to improve it (client-side logic only, no AI backend needed)

### Modify
- App navigation: add a link/tab to reach the new AI Video Hub from the existing app (or make it a standalone new page accessible from the home screen)

### Remove
- Nothing removed from existing Climate Hero game

## Implementation Plan
1. Create AI Video Hub page component with ChatGPT-style layout (sidebar + main content area)
2. Build tool card grid with name, description, free tier info, tags, and external link button
3. Add search/filter bar that filters cards by name or tag
4. Add a "Prompt Tips" panel — input field + client-side tip generator based on keywords
5. Wire navigation from existing Home page to the new hub page
6. Apply deterministic data-ocid markers to all interactive elements
