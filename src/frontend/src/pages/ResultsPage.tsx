import { LanguageToggle } from "@/components/game/LanguageToggle";
import { MetricBar } from "@/components/game/MetricBar";
import { Button } from "@/components/ui/button";
import {
  GRADE_COLORS,
  type Metrics,
  SCENES,
  computeClimateScore,
  getGrade,
} from "@/gameData";
import { cn } from "@/lib/utils";
import { type Language, getTranslation } from "@/translations";
import { motion } from "motion/react";

interface DecisionRecord {
  sceneIndex: number;
  choiceIndex: number;
}

interface ResultsPageProps {
  lang: Language;
  onToggleLang: () => void;
  finalMetrics: Metrics;
  decisions: DecisionRecord[];
  onPlayAgain: () => void;
  onLearnMore: () => void;
}

const GRADE_BG: Record<string, string> = {
  A: "bg-green-50 border-green-200",
  B: "bg-emerald-50 border-emerald-200",
  C: "bg-amber-50 border-amber-200",
  D: "bg-orange-50 border-orange-200",
  F: "bg-red-50 border-red-200",
};

export function ResultsPage({
  lang,
  onToggleLang,
  finalMetrics,
  decisions,
  onPlayAgain,
  onLearnMore,
}: ResultsPageProps) {
  const t = getTranslation(lang);
  const score = computeClimateScore(finalMetrics);
  const grade = getGrade(score);
  const gradeColor = GRADE_COLORS[grade];
  const gradeBg = GRADE_BG[grade];

  const gradeMessages: Record<string, string> = {
    A: t.gradeA,
    B: t.gradeB,
    C: t.gradeC,
    D: t.gradeD,
    F: t.gradeF,
  };

  return (
    <div className="min-h-screen bg-game-gradient">
      {/* Language toggle */}
      <div className="fixed top-4 right-4 z-30">
        <LanguageToggle lang={lang} onToggle={onToggleLang} />
      </div>

      <div className="max-w-2xl mx-auto px-4 py-8 pt-16">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6"
        >
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-foreground">
            {t.resultsTitle}
          </h1>
        </motion.div>

        {/* Trophy + Grade */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className={cn(
            "rounded-3xl border-2 p-6 text-center mb-6 shadow-card",
            gradeBg,
          )}
        >
          <div className="flex justify-center mb-3">
            <img
              src="/assets/generated/results-trophy-transparent.png"
              alt="Trophy"
              className="w-28 h-28 object-contain animate-float"
            />
          </div>

          <div className="flex items-center justify-center gap-3 mb-2">
            <span
              className={cn(
                "font-display text-8xl font-extrabold leading-none",
                gradeColor,
              )}
            >
              {grade}
            </span>
          </div>

          <div className="mb-3">
            <span className="font-display text-2xl font-bold text-foreground">
              {t.yourClimateScore}:
            </span>
            <span
              className={cn(
                "font-display text-2xl font-extrabold ml-2",
                gradeColor,
              )}
            >
              {Math.round(score)}/100
            </span>
          </div>

          <p className="text-foreground text-base font-medium leading-relaxed">
            {gradeMessages[grade]}
          </p>
        </motion.div>

        {/* Final metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl p-5 shadow-card border border-border mb-6"
        >
          <h2 className="font-display font-bold text-foreground text-lg mb-4">
            {t.finalMetrics}
          </h2>
          <div className="space-y-4">
            <div>
              <MetricBar
                label={t.pollution}
                value={finalMetrics.pollution}
                type="pollution"
              />
              <p className="text-muted-foreground text-xs mt-0.5 ml-6">
                {t.lowerBetter}
              </p>
            </div>
            <div>
              <MetricBar
                label={t.forestHealth}
                value={finalMetrics.forest}
                type="forest"
              />
              <p className="text-muted-foreground text-xs mt-0.5 ml-6">
                {t.higherBetter}
              </p>
            </div>
            <div>
              <MetricBar
                label={t.happiness}
                value={finalMetrics.happiness}
                type="happiness"
              />
              <p className="text-muted-foreground text-xs mt-0.5 ml-6">
                {t.higherBetter}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Decision recap */}
        {decisions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="bg-white rounded-2xl p-5 shadow-card border border-border mb-6"
          >
            <h2 className="font-display font-bold text-foreground text-lg mb-4">
              {t.yourDecisions}
            </h2>
            <div className="space-y-3">
              {decisions.map((d) => {
                const scene = SCENES[d.sceneIndex];
                const choice = scene?.choices[d.choiceIndex];
                if (!scene || !choice) return null;
                return (
                  <div
                    key={d.sceneIndex}
                    className="flex items-start gap-3 p-3 rounded-xl bg-muted/40"
                  >
                    <span className="flex-shrink-0 w-7 h-7 rounded-full bg-primary/15 text-primary font-display font-bold text-xs flex items-center justify-center">
                      {d.sceneIndex + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="font-display font-semibold text-foreground text-xs">
                        {lang === "en" ? scene.titleEn : scene.titleNp}
                      </p>
                      <p className="text-muted-foreground text-xs mt-0.5 truncate">
                        {lang === "en" ? choice.en : choice.np}
                      </p>
                    </div>
                    <div className="flex-shrink-0 flex gap-1 text-xs">
                      {choice.impact.pollution !== 0 && (
                        <span
                          className={cn(
                            "px-1 rounded",
                            choice.impact.pollution < 0
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-600",
                          )}
                        >
                          💨{choice.impact.pollution > 0 ? "+" : ""}
                          {choice.impact.pollution}
                        </span>
                      )}
                      {choice.impact.forest !== 0 && (
                        <span
                          className={cn(
                            "px-1 rounded",
                            choice.impact.forest > 0
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-600",
                          )}
                        >
                          🌳{choice.impact.forest > 0 ? "+" : ""}
                          {choice.impact.forest}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="flex flex-col sm:flex-row gap-4 pb-8"
        >
          <Button
            data-ocid="results.play_again_button"
            onClick={onPlayAgain}
            size="lg"
            className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-display font-bold text-base py-5 rounded-2xl shadow-nature"
          >
            🔄 {t.playAgain}
          </Button>
          <Button
            data-ocid="results.learn_more_button"
            onClick={onLearnMore}
            variant="outline"
            size="lg"
            className="flex-1 font-display font-bold text-base py-5 rounded-2xl border-2 border-primary text-primary hover:bg-primary/5"
          >
            📚 {t.learnMore}
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
