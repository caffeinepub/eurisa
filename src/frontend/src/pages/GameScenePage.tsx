import { LanguageToggle } from "@/components/game/LanguageToggle";
import { MetricBar } from "@/components/game/MetricBar";
import { Button } from "@/components/ui/button";
import { type Metrics, SCENES } from "@/gameData";
import type { SessionId } from "@/hooks/useQueries";
import { useMakeDecision } from "@/hooks/useQueries";
import { cn } from "@/lib/utils";
import { type Language, getTranslation } from "@/translations";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

interface GameScenePageProps {
  lang: Language;
  onToggleLang: () => void;
  currentSceneIndex: number;
  metrics: Metrics;
  sessionId: SessionId | null;
  onChoiceMade: (
    sceneIndex: number,
    choiceIndex: number,
    newMetrics: Metrics,
  ) => void;
  onGameComplete: () => void;
}

type PhaseType = "choosing" | "impact" | "transitioning";

export function GameScenePage({
  lang,
  onToggleLang,
  currentSceneIndex,
  metrics,
  sessionId,
  onChoiceMade,
  onGameComplete,
}: GameScenePageProps) {
  const t = getTranslation(lang);
  const scene = SCENES[currentSceneIndex];
  const makeDecision = useMakeDecision();

  const [phase, setPhase] = useState<PhaseType>("choosing");
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);
  const [pendingMetrics, setPendingMetrics] = useState<Metrics | null>(null);

  // Reset phase when scene changes
  // biome-ignore lint/correctness/useExhaustiveDependencies: state setters are stable, currentSceneIndex is the trigger
  useEffect(() => {
    setPhase("choosing");
    setSelectedChoice(null);
    setPendingMetrics(null);
  }, [currentSceneIndex]);

  const handleChoice = async (choiceIndex: number) => {
    if (phase !== "choosing") return;

    const choice = scene.choices[choiceIndex];
    const newMetrics: Metrics = {
      pollution: Math.max(
        0,
        Math.min(100, metrics.pollution + choice.impact.pollution),
      ),
      forest: Math.max(0, Math.min(100, metrics.forest + choice.impact.forest)),
      happiness: Math.max(
        0,
        Math.min(100, metrics.happiness + choice.impact.happiness),
      ),
    };

    setSelectedChoice(choiceIndex);
    setPendingMetrics(newMetrics);
    setPhase("impact");

    // Fire and forget to backend
    if (sessionId !== null) {
      makeDecision.mutate({
        sessionId,
        sceneIndex: BigInt(currentSceneIndex),
        choiceIndex: BigInt(choiceIndex),
      });
    }

    // Show impact for 2.5s then advance
    setTimeout(() => {
      setPhase("transitioning");
      setTimeout(() => {
        onChoiceMade(currentSceneIndex, choiceIndex, newMetrics);
        const isLast = currentSceneIndex >= SCENES.length - 1;
        if (isLast) {
          onGameComplete();
        }
      }, 400);
    }, 2500);
  };

  const choice = selectedChoice !== null ? scene.choices[selectedChoice] : null;
  const impact = choice?.impact;
  const deltas = phase === "impact" ? impact : undefined;

  return (
    <div className="min-h-screen bg-game-gradient">
      {/* Top header */}
      <div className="sticky top-0 z-30 bg-background/90 backdrop-blur-md border-b border-border">
        <div className="max-w-2xl mx-auto px-4 py-3">
          {/* Progress & language */}
          <div className="flex items-center justify-between mb-3">
            <div
              data-ocid="game.scene_progress"
              className="flex items-center gap-2"
            >
              {/* Scene dots */}
              <div className="flex gap-1.5">
                {SCENES.map((scene, i) => (
                  <div
                    key={scene.id}
                    className={cn(
                      "rounded-full transition-all duration-300",
                      i < currentSceneIndex
                        ? "w-4 h-2.5 bg-primary"
                        : i === currentSceneIndex
                          ? "w-6 h-2.5 bg-primary animate-pulse"
                          : "w-2.5 h-2.5 bg-border",
                    )}
                  />
                ))}
              </div>
              <span className="font-display text-xs text-muted-foreground font-medium">
                {t.scene} {currentSceneIndex + 1} {t.of} {SCENES.length}
              </span>
            </div>
            <LanguageToggle lang={lang} onToggle={onToggleLang} />
          </div>

          {/* Metric bars */}
          <div className="grid grid-cols-3 gap-3">
            <MetricBar
              label={t.pollution}
              value={metrics.pollution}
              type="pollution"
              delta={phase === "impact" ? deltas?.pollution : undefined}
              compact
            />
            <MetricBar
              label={t.forestHealth}
              value={metrics.forest}
              type="forest"
              delta={phase === "impact" ? deltas?.forest : undefined}
              compact
            />
            <MetricBar
              label={t.happiness}
              value={metrics.happiness}
              type="happiness"
              delta={phase === "impact" ? deltas?.happiness : undefined}
              compact
            />
          </div>
        </div>
      </div>

      {/* Scene content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`scene-${currentSceneIndex}`}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: phase === "transitioning" ? 0 : 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.4 }}
          className="max-w-2xl mx-auto px-4 py-6"
        >
          {/* Scene image */}
          <div className="relative rounded-2xl overflow-hidden mb-5 shadow-nature aspect-[2/1]">
            <img
              src={scene.image}
              alt={lang === "en" ? scene.titleEn : scene.titleNp}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h2 className="font-display text-xl sm:text-2xl font-extrabold text-white">
                {lang === "en" ? scene.titleEn : scene.titleNp}
              </h2>
            </div>
          </div>

          {/* Scene description */}
          <p className="text-foreground text-sm sm:text-base leading-relaxed mb-6 font-medium">
            {lang === "en" ? scene.descEn : scene.descNp}
          </p>

          {/* Impact feedback overlay */}
          <AnimatePresence>
            {phase === "impact" && impact && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -10 }}
                className="bg-white rounded-2xl border border-border p-5 mb-5 shadow-card"
              >
                <h3 className="font-display font-bold text-foreground text-base mb-4 text-center">
                  {lang === "en"
                    ? "📊 Impact of Your Decision"
                    : "📊 तपाईंको निर्णयको प्रभाव"}
                </h3>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    {
                      key: "pollution" as const,
                      icon: "💨",
                      label: t.pollution,
                      value: impact.pollution,
                    },
                    {
                      key: "forest" as const,
                      icon: "🌳",
                      label: t.forestHealth,
                      value: impact.forest,
                    },
                    {
                      key: "happiness" as const,
                      icon: "😊",
                      label: t.happiness,
                      value: impact.happiness,
                    },
                  ].map(({ icon, label, value, key }) => (
                    <div key={key} className="text-center">
                      <div className="text-2xl mb-1">{icon}</div>
                      <div className="font-display text-xs text-muted-foreground mb-1">
                        {label}
                      </div>
                      <div
                        className={cn(
                          "font-display font-extrabold text-lg",
                          value === 0
                            ? "text-muted-foreground"
                            : value > 0
                              ? key === "pollution"
                                ? "text-pollution"
                                : "text-forest"
                              : key === "pollution"
                                ? "text-forest"
                                : "text-pollution",
                        )}
                      >
                        {value > 0 ? "+" : ""}
                        {value}
                        {value > 0
                          ? key === "pollution"
                            ? " ↑"
                            : " ↑"
                          : value < 0
                            ? " ↓"
                            : " →"}
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-center text-muted-foreground text-xs mt-4 font-medium">
                  {lang === "en"
                    ? "⏳ Moving to next scene..."
                    : "⏳ अर्को दृश्यमा जाँदैछ..."}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Choice buttons */}
          <div className="space-y-3">
            <h3 className="font-display font-bold text-foreground text-sm uppercase tracking-wide mb-3 text-center">
              {lang === "en" ? "What will you do?" : "तपाईं के गर्नुहुनेछ?"}
            </h3>
            {scene.choices.map((ch, i) => {
              const isSelected = selectedChoice === i;
              const choiceKey = `${scene.id}-${i}`;
              return (
                <motion.div
                  key={choiceKey}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                >
                  <Button
                    data-ocid={
                      `game.choice_button.${i + 1}` as `game.choice_button.${1 | 2 | 3}`
                    }
                    onClick={() => handleChoice(i)}
                    disabled={phase !== "choosing"}
                    variant="outline"
                    className={cn(
                      "w-full text-left h-auto py-4 px-5 rounded-xl font-display font-semibold text-sm sm:text-base",
                      "border-2 transition-all duration-200 choice-btn",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                      isSelected
                        ? "border-primary bg-primary/10 text-foreground shadow-nature"
                        : phase === "choosing"
                          ? "border-border bg-white hover:border-primary hover:bg-primary/5 hover:shadow-nature text-foreground"
                          : "border-border bg-white/60 text-muted-foreground cursor-not-allowed opacity-60",
                    )}
                  >
                    <div className="flex items-start gap-3">
                      <span
                        className={cn(
                          "flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-sm font-extrabold",
                          isSelected
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground",
                        )}
                      >
                        {String.fromCharCode(65 + i)}
                      </span>
                      <span className="flex-1 leading-relaxed">
                        {lang === "en" ? ch.en : ch.np}
                      </span>
                    </div>
                  </Button>
                </motion.div>
              );
            })}
          </div>

          {/* Updated metrics preview during impact */}
          {phase === "impact" && pendingMetrics && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 bg-white rounded-2xl p-5 border border-border shadow-card"
            >
              <h3 className="font-display font-bold text-sm text-muted-foreground text-center mb-4">
                {lang === "en"
                  ? "📈 Updated Environment Status"
                  : "📈 अद्यावधिक वातावरण स्थिति"}
              </h3>
              <div className="space-y-3">
                <MetricBar
                  label={t.pollution}
                  value={pendingMetrics.pollution}
                  type="pollution"
                />
                <MetricBar
                  label={t.forestHealth}
                  value={pendingMetrics.forest}
                  type="forest"
                />
                <MetricBar
                  label={t.happiness}
                  value={pendingMetrics.happiness}
                  type="happiness"
                />
              </div>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
