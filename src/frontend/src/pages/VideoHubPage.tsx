import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowLeft,
  ExternalLink,
  Lightbulb,
  Menu,
  Moon,
  Search,
  Sparkles,
  Sun,
  Video,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

// ── Types ──────────────────────────────────────────────────────────────────

type Category =
  | "All"
  | "Text-to-Video"
  | "Image-to-Video"
  | "Most Popular"
  | "Free Tier";

interface Tool {
  name: string;
  description: string;
  url: string;
  freeTier: string;
  tags: Category[];
  accent: string;
  emoji: string;
}

// ── Data ───────────────────────────────────────────────────────────────────

const TOOLS: Tool[] = [
  {
    name: "Pika Labs",
    description:
      "Generate stunning videos from text prompts with cinematic quality and smooth motion.",
    url: "https://pika.art",
    freeTier: "150 free credits/month",
    tags: ["Text-to-Video", "Most Popular"],
    accent: "hub-accent-violet",
    emoji: "⚡",
  },
  {
    name: "Kling AI",
    description:
      "Realistic motion video from text or images. Industry-leading physics and lifelike movement.",
    url: "https://klingai.com",
    freeTier: "66 free credits/day",
    tags: ["Text-to-Video", "Image-to-Video", "Most Popular"],
    accent: "hub-accent-cyan",
    emoji: "🎬",
  },
  {
    name: "Runway ML",
    description:
      "Professional-grade AI video editing and generation used by Hollywood studios.",
    url: "https://runwayml.com",
    freeTier: "125 free credits",
    tags: ["Text-to-Video", "Image-to-Video", "Free Tier"],
    accent: "hub-accent-green",
    emoji: "🚀",
  },
  {
    name: "Luma Dream Machine",
    description:
      "Hyper-realistic video from text or images with breathtaking detail and depth.",
    url: "https://lumalabs.ai/dream-machine",
    freeTier: "30 free generations/month",
    tags: ["Text-to-Video", "Image-to-Video", "Free Tier"],
    accent: "hub-accent-amber",
    emoji: "✨",
  },
  {
    name: "PixVerse",
    description:
      "Fun, creative video effects with unlimited free generations — no waitlist needed.",
    url: "https://pixverse.ai",
    freeTier: "Unlimited free generations",
    tags: ["Text-to-Video", "Most Popular", "Free Tier"],
    accent: "hub-accent-rose",
    emoji: "🎨",
  },
  {
    name: "Hailuo AI",
    description:
      "High quality cinematic video generation with vivid colours and expressive characters.",
    url: "https://hailuoai.com",
    freeTier: "Free daily credits",
    tags: ["Text-to-Video", "Free Tier"],
    accent: "hub-accent-indigo",
    emoji: "🎥",
  },
  {
    name: "Stable Video Diffusion",
    description:
      "Open-source, fully free image-to-video model running on Hugging Face. No account needed.",
    url: "https://huggingface.co/spaces/stabilityai/stable-video-diffusion",
    freeTier: "100% free, open source",
    tags: ["Image-to-Video", "Free Tier"],
    accent: "hub-accent-teal",
    emoji: "🔓",
  },
];

const CATEGORIES: Category[] = [
  "All",
  "Text-to-Video",
  "Image-to-Video",
  "Most Popular",
  "Free Tier",
];

// ── Prompt Tips Logic ──────────────────────────────────────────────────────

interface Tip {
  icon: string;
  heading: string;
  text: string;
}

function generateTips(prompt: string): Tip[] {
  const p = prompt.toLowerCase();
  const tips: Tip[] = [];

  const cameraWords = [
    "close-up",
    "closeup",
    "aerial",
    "wide",
    "medium shot",
    "pov",
    "bird",
    "tracking",
    "zoom",
    "dolly",
    "pan",
    "tilt",
    "crane",
  ];
  const lightingWords = [
    "golden hour",
    "sunset",
    "sunrise",
    "neon",
    "night",
    "dark",
    "bright",
    "studio",
    "candlelight",
    "moonlit",
    "foggy",
    "overcast",
    "backlit",
  ];
  const styleWords = [
    "cinematic",
    "anime",
    "realistic",
    "cartoon",
    "3d",
    "stop motion",
    "watercolor",
    "noir",
    "retro",
    "futuristic",
    "documentary",
  ];
  const motionWords = [
    "slow motion",
    "timelapse",
    "time-lapse",
    "fast",
    "flowing",
    "swirling",
    "panning",
    "drifting",
    "exploding",
  ];

  const hasCameraAngle = cameraWords.some((w) => p.includes(w));
  const hasLighting = lightingWords.some((w) => p.includes(w));
  const hasStyle = styleWords.some((w) => p.includes(w));
  const hasMotion = motionWords.some((w) => p.includes(w));

  if (!hasCameraAngle) {
    tips.push({
      icon: "🎥",
      heading: "Add a camera angle",
      text: 'Try "close-up shot", "aerial view", "wide establishing shot", or "POV perspective" to guide the camera movement.',
    });
  }
  if (!hasLighting) {
    tips.push({
      icon: "💡",
      heading: "Add lighting",
      text: 'Lighting transforms mood. Try "golden hour sunlight", "neon-lit rain", "dramatic backlight", or "soft studio lighting".',
    });
  }
  if (!hasStyle) {
    tips.push({
      icon: "🎨",
      heading: "Specify a visual style",
      text: 'Define the aesthetic: "cinematic 4K", "anime style", "realistic CGI", "stop-motion", or "watercolor painting".',
    });
  }
  if (!hasMotion) {
    tips.push({
      icon: "⚡",
      heading: "Describe motion",
      text: 'Motion makes videos alive. Try "slow motion", "timelapse of city lights", "swirling particles", or "camera slowly drifts forward".',
    });
  }

  if (prompt.trim().split(" ").length < 8) {
    tips.push({
      icon: "📝",
      heading: "Be more descriptive",
      text: "Longer prompts produce better results. Describe the subject, action, environment, mood, and time of day in detail.",
    });
  }

  return tips.slice(0, 4);
}

// ── Accent colour map ──────────────────────────────────────────────────────

const ACCENT_CLASSES: Record<string, string> = {
  "hub-accent-violet": "bg-[oklch(0.45_0.22_280)] text-white",
  "hub-accent-cyan": "bg-[oklch(0.55_0.18_210)] text-white",
  "hub-accent-green": "bg-[oklch(0.5_0.18_150)] text-white",
  "hub-accent-amber": "bg-[oklch(0.62_0.18_70)] text-white",
  "hub-accent-rose": "bg-[oklch(0.55_0.22_10)] text-white",
  "hub-accent-indigo": "bg-[oklch(0.42_0.2_265)] text-white",
  "hub-accent-teal": "bg-[oklch(0.5_0.16_190)] text-white",
};

const TAG_COLOUR: Record<Category, string> = {
  All: "bg-[oklch(0.28_0.03_260)] text-[oklch(0.8_0.08_260)]",
  "Text-to-Video":
    "bg-[oklch(0.25_0.08_280)] text-[oklch(0.82_0.12_280)] border border-[oklch(0.4_0.12_280)]",
  "Image-to-Video":
    "bg-[oklch(0.25_0.08_210)] text-[oklch(0.82_0.1_210)] border border-[oklch(0.4_0.1_210)]",
  "Most Popular":
    "bg-[oklch(0.3_0.1_65)] text-[oklch(0.88_0.14_65)] border border-[oklch(0.5_0.14_65)]",
  "Free Tier":
    "bg-[oklch(0.25_0.08_150)] text-[oklch(0.82_0.14_150)] border border-[oklch(0.4_0.14_150)]",
};

// ── Sidebar content (shared between mobile & desktop) ─────────────────────

interface SidebarContentProps {
  activeCategory: Category;
  onSelectCategory: (cat: Category) => void;
  onBack: () => void;
  onClose?: () => void;
}

function SidebarContent({
  activeCategory,
  onSelectCategory,
  onBack,
  onClose,
}: SidebarContentProps) {
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-5 border-b hub-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-[oklch(0.55_0.22_280)] flex items-center justify-center shadow-lg">
            <Video className="w-4 h-4 text-white" />
          </div>
          <span className="font-display font-bold text-sm hub-text-primary">
            AI Video Hub
          </span>
        </div>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="lg:hidden hub-text-muted hub-hover-text transition-colors p-1 rounded"
            aria-label="Close sidebar"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Categories */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <p className="px-3 mb-3 text-xs font-semibold uppercase tracking-widest hub-text-subtle">
          Categories
        </p>
        {CATEGORIES.map((cat, i) => (
          <button
            key={cat}
            type="button"
            data-ocid={`hub.filter.tab.${i + 1}`}
            onClick={() => {
              onSelectCategory(cat);
              onClose?.();
            }}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
              activeCategory === cat
                ? "bg-[oklch(0.55_0.22_280)] text-white shadow-md"
                : "hub-text-secondary hub-hover-item"
            }`}
          >
            <span className="text-base">
              {cat === "All"
                ? "🌐"
                : cat === "Text-to-Video"
                  ? "📝"
                  : cat === "Image-to-Video"
                    ? "🖼️"
                    : cat === "Most Popular"
                      ? "🔥"
                      : "🆓"}
            </span>
            {cat}
          </button>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-5 py-4 border-t hub-border">
        <button
          type="button"
          data-ocid="hub.back_button"
          onClick={onBack}
          className="flex items-center gap-2 text-sm hub-text-secondary hub-hover-text transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Climate Hero
        </button>
      </div>
    </div>
  );
}

// ── VideoHubPage ───────────────────────────────────────────────────────────

interface VideoHubPageProps {
  onBack: () => void;
}

export function VideoHubPage({ onBack }: VideoHubPageProps) {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [search, setSearch] = useState("");
  const [darkMode, setDarkMode] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [promptText, setPromptText] = useState("");
  const [tips, setTips] = useState<Tip[]>([]);
  const [showTips, setShowTips] = useState(false);

  const filteredTools = TOOLS.filter((tool) => {
    const matchesCategory =
      activeCategory === "All" || tool.tags.includes(activeCategory);
    const matchesSearch =
      search.trim() === "" ||
      tool.name.toLowerCase().includes(search.toLowerCase()) ||
      tool.description.toLowerCase().includes(search.toLowerCase()) ||
      tool.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleGetTips = () => {
    if (!promptText.trim()) return;
    const generated = generateTips(promptText);
    setTips(generated);
    setShowTips(true);
  };

  return (
    <div
      className={`min-h-screen flex flex-col ${darkMode ? "hub-dark-mode" : "hub-light-mode"}`}
    >
      <div className="flex flex-1 min-h-screen relative">
        {/* Mobile overlay */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-30 bg-black/60 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}
        </AnimatePresence>

        {/* ── Mobile sidebar (drawer) ──────────────────────────── */}
        <div
          className={`fixed inset-y-0 left-0 z-40 w-64 lg:hidden transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} ${darkMode ? "hub-sidebar-dark" : "hub-sidebar-light"}`}
        >
          <SidebarContent
            activeCategory={activeCategory}
            onSelectCategory={setActiveCategory}
            onBack={onBack}
            onClose={() => setSidebarOpen(false)}
          />
        </div>

        {/* ── Desktop sidebar (sticky) ─────────────────────────── */}
        <aside
          className={`hidden lg:flex w-64 flex-shrink-0 flex-col h-screen sticky top-0 ${darkMode ? "hub-sidebar-dark" : "hub-sidebar-light"}`}
        >
          <SidebarContent
            activeCategory={activeCategory}
            onSelectCategory={setActiveCategory}
            onBack={onBack}
          />
        </aside>

        {/* ── Main content ─────────────────────────────────────── */}
        <main
          className={`flex-1 flex flex-col min-w-0 ${darkMode ? "hub-main-dark" : "hub-main-light"}`}
        >
          {/* Top bar */}
          <header
            className={`sticky top-0 z-20 flex items-center gap-4 px-4 md:px-6 py-4 border-b hub-border ${darkMode ? "hub-topbar-dark" : "hub-topbar-light"}`}
          >
            {/* Mobile menu */}
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden hub-text-secondary hub-hover-text p-2 rounded-lg transition-colors"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Title */}
            <div className="flex items-center gap-2 mr-2">
              <Sparkles className="w-5 h-5 text-[oklch(0.7_0.18_280)]" />
              <h1 className="font-display font-bold text-base md:text-lg hub-text-primary whitespace-nowrap">
                AI Video Tools
              </h1>
            </div>

            {/* Search */}
            <div className="flex-1 relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 hub-text-muted" />
              <Input
                data-ocid="hub.search_input"
                type="text"
                placeholder="Search tools..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className={`pl-9 h-9 rounded-xl text-sm ${darkMode ? "hub-input-dark" : "hub-input-light"}`}
              />
            </div>

            {/* Theme toggle */}
            <button
              type="button"
              data-ocid="hub.theme.toggle"
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-xl transition-all hub-icon-btn ${darkMode ? "hub-icon-dark" : "hub-icon-light"}`}
              aria-label={
                darkMode ? "Switch to light mode" : "Switch to dark mode"
              }
            >
              {darkMode ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </button>
          </header>

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-4 md:px-6 py-6 max-w-5xl w-full mx-auto">
            {/* Hero intro */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mb-8"
            >
              <h2 className="font-display text-2xl md:text-3xl font-bold hub-text-primary mb-2">
                Free AI Video Generators
              </h2>
              <p className="hub-text-secondary text-sm md:text-base max-w-xl">
                The best free tools to create AI-generated videos from text or
                images — no subscription needed to get started.
              </p>

              {activeCategory !== "All" && (
                <div className="mt-3 flex items-center gap-2">
                  <span className="text-xs hub-text-muted">Showing:</span>
                  <button
                    type="button"
                    onClick={() => setActiveCategory("All")}
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${TAG_COLOUR[activeCategory]} transition-opacity hover:opacity-80`}
                  >
                    {activeCategory}
                    <X className="w-3 h-3" />
                  </button>
                </div>
              )}
            </motion.div>

            {/* Tool grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mb-12">
              <AnimatePresence mode="popLayout">
                {filteredTools.length === 0 ? (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="col-span-full flex flex-col items-center justify-center py-16 hub-text-muted"
                  >
                    <Search className="w-10 h-10 mb-3 opacity-30" />
                    <p className="text-sm">No tools match your search.</p>
                  </motion.div>
                ) : (
                  filteredTools.map((tool, idx) => (
                    <motion.div
                      key={tool.name}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.25, delay: idx * 0.04 }}
                    >
                      <ToolCard
                        tool={tool}
                        index={TOOLS.indexOf(tool) + 1}
                        darkMode={darkMode}
                      />
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>

            {/* Prompt Tips Section */}
            <motion.section
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.2 }}
              className="rounded-2xl p-6 border hub-prompt-panel hub-border mb-10"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-xl bg-[oklch(0.55_0.22_280)] flex items-center justify-center">
                  <Lightbulb className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-display font-bold hub-text-primary text-lg leading-tight">
                    Improve Your Prompt
                  </h3>
                  <p className="text-xs hub-text-muted">
                    Paste your video idea and get instant tips
                  </p>
                </div>
              </div>

              <Textarea
                data-ocid="hub.prompt.textarea"
                placeholder="Describe your video idea… e.g. 'A cat walking through a forest at night'"
                value={promptText}
                onChange={(e) => setPromptText(e.target.value)}
                rows={4}
                className={`w-full resize-none rounded-xl text-sm mb-4 ${darkMode ? "hub-textarea-dark" : "hub-textarea-light"}`}
              />

              <Button
                type="button"
                data-ocid="hub.prompt.submit_button"
                onClick={handleGetTips}
                disabled={!promptText.trim()}
                className="bg-[oklch(0.55_0.22_280)] hover:bg-[oklch(0.5_0.22_280)] text-white font-display font-semibold px-6 rounded-xl transition-colors disabled:opacity-40"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Get Tips
              </Button>

              {/* Tips output */}
              <AnimatePresence>
                {showTips && tips.length > 0 && (
                  <motion.div
                    key="tips-output"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-6 space-y-3"
                  >
                    <p className="text-xs font-semibold uppercase tracking-widest hub-text-muted mb-2">
                      Suggestions
                    </p>
                    {tips.map((tip, i) => (
                      <motion.div
                        key={tip.heading}
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.07 }}
                        className="flex gap-3 p-3 rounded-xl hub-tip-card"
                      >
                        <span className="text-xl flex-shrink-0 mt-0.5">
                          {tip.icon}
                        </span>
                        <div>
                          <p className="font-display font-semibold text-sm hub-text-primary mb-0.5">
                            {tip.heading}
                          </p>
                          <p className="text-sm hub-text-secondary leading-relaxed">
                            {tip.text}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
                {showTips && tips.length === 0 && (
                  <motion.div
                    key="tips-perfect"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-4 flex items-center gap-2 text-sm hub-text-secondary"
                  >
                    <span>✅</span>
                    Your prompt looks great! It already includes camera,
                    lighting, style, and motion details.
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.section>

            {/* Footer */}
            <footer className="text-center text-xs hub-text-subtle py-4">
              © {new Date().getFullYear()}. Built with love using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:opacity-80"
              >
                caffeine.ai
              </a>
            </footer>
          </div>
        </main>
      </div>
    </div>
  );
}

// ── ToolCard ───────────────────────────────────────────────────────────────

interface ToolCardProps {
  tool: Tool;
  index: number;
  darkMode: boolean;
}

function ToolCard({ tool, index, darkMode }: ToolCardProps) {
  const accentCls =
    ACCENT_CLASSES[tool.accent] ?? "bg-[oklch(0.5_0.15_280)] text-white";

  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={`group flex flex-col rounded-2xl border hub-border p-5 h-full ${darkMode ? "hub-card-dark" : "hub-card-light"}`}
    >
      {/* Card header */}
      <div className="flex items-start gap-3 mb-3">
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-xl ${accentCls}`}
        >
          {tool.emoji}
        </div>
        <div className="min-w-0">
          <h3 className="font-display font-bold hub-text-primary text-base leading-tight truncate">
            {tool.name}
          </h3>
          <p className="text-xs hub-text-subtle mt-0.5 truncate">
            {tool.url.replace("https://", "")}
          </p>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm hub-text-secondary leading-relaxed mb-4 flex-1">
        {tool.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {tool.tags.map((tag) => (
          <span
            key={tag}
            className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${TAG_COLOUR[tag]}`}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Free tier note */}
      <div className="flex items-center gap-1.5 mb-4">
        <span className="text-xs">🆓</span>
        <span className="text-xs font-medium text-[oklch(0.65_0.15_150)]">
          {tool.freeTier}
        </span>
      </div>

      {/* CTA */}
      <a
        href={tool.url}
        target="_blank"
        rel="noopener noreferrer"
        data-ocid={`hub.tool.open_modal_button.${index}`}
        className="inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-semibold font-display transition-all bg-[oklch(0.55_0.22_280)] hover:bg-[oklch(0.5_0.22_280)] text-white shadow-sm group-hover:shadow-md"
      >
        Open Tool
        <ExternalLink className="w-3.5 h-3.5" />
      </a>
    </motion.div>
  );
}
