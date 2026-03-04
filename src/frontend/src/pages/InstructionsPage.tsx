import { LanguageToggle } from "@/components/game/LanguageToggle";
import { Button } from "@/components/ui/button";
import { type Language, getTranslation } from "@/translations";
import { ArrowLeft } from "lucide-react";
import { motion } from "motion/react";

interface InstructionsPageProps {
  lang: Language;
  onToggleLang: () => void;
  onStartGame: () => void;
  onBack: () => void;
}

const ruleKeys = [
  {
    titleKey: "rule1Title" as const,
    descKey: "rule1Desc" as const,
    delay: 0.2,
  },
  {
    titleKey: "rule2Title" as const,
    descKey: "rule2Desc" as const,
    delay: 0.3,
  },
  {
    titleKey: "rule3Title" as const,
    descKey: "rule3Desc" as const,
    delay: 0.4,
  },
  {
    titleKey: "rule4Title" as const,
    descKey: "rule4Desc" as const,
    delay: 0.5,
  },
];

export function InstructionsPage({
  lang,
  onToggleLang,
  onStartGame,
  onBack,
}: InstructionsPageProps) {
  const t = getTranslation(lang);

  return (
    <div className="min-h-screen bg-game-gradient py-8 px-4">
      {/* Header */}
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground font-display font-medium text-sm transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {t.backHome}
          </button>
          <LanguageToggle lang={lang} onToggle={onToggleLang} />
        </div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center mb-8"
        >
          <div className="text-4xl mb-3">📖</div>
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-foreground mb-2">
            {t.instructionsTitle}
          </h1>
          <p className="text-muted-foreground font-medium">
            {t.instructionsSubtitle}
          </p>
        </motion.div>

        {/* Rules */}
        <div className="space-y-4 mb-8">
          {ruleKeys.map((rule) => (
            <motion.div
              key={rule.titleKey}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: rule.delay }}
              className="bg-white rounded-2xl p-5 shadow-card border border-border flex gap-4 items-start"
            >
              <div className="flex-1">
                <h3 className="font-display font-bold text-foreground text-base sm:text-lg mb-1">
                  {t[rule.titleKey]}
                </h3>
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                  {t[rule.descKey]}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Goal card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.6 }}
          className="bg-primary/10 rounded-2xl p-5 border border-primary/20 mb-8 text-center"
        >
          <h3 className="font-display font-bold text-primary text-lg mb-1">
            {t.goalTitle}
          </h3>
          <p className="text-foreground text-sm sm:text-base">{t.goalDesc}</p>
        </motion.div>

        {/* Metric legend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.7 }}
          className="bg-white rounded-2xl p-5 shadow-card border border-border mb-8"
        >
          <h3 className="font-display font-bold text-foreground text-base mb-3 text-center">
            📊{" "}
            {lang === "en" ? "Track These Metrics" : "यी मेट्रिकहरू ट्र्याक गर्नुहोस्"}
          </h3>
          <div className="space-y-2">
            <div className="flex items-center gap-3 p-2.5 rounded-xl bg-red-50">
              <span className="text-xl">💨</span>
              <div>
                <span className="font-display font-bold text-pollution text-sm">
                  {t.pollution}
                </span>
                <span className="text-muted-foreground text-xs ml-2">
                  {lang === "en" ? "— keep LOW" : "— कम राख्नुहोस्"}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3 p-2.5 rounded-xl bg-green-50">
              <span className="text-xl">🌳</span>
              <div>
                <span className="font-display font-bold text-forest text-sm">
                  {t.forestHealth}
                </span>
                <span className="text-muted-foreground text-xs ml-2">
                  {lang === "en" ? "— keep HIGH" : "— उच्च राख्नुहोस्"}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3 p-2.5 rounded-xl bg-amber-50">
              <span className="text-xl">😊</span>
              <div>
                <span className="font-display font-bold text-happiness text-sm">
                  {t.happiness}
                </span>
                <span className="text-muted-foreground text-xs ml-2">
                  {lang === "en" ? "— keep HIGH" : "— उच्च राख्नुहोस्"}
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Start button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.8 }}
          className="flex justify-center"
        >
          <Button
            data-ocid="instructions.start_button"
            onClick={onStartGame}
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-display font-bold text-lg px-12 py-6 rounded-2xl shadow-nature-lg w-full sm:w-auto"
          >
            🌿 {t.startGame}
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
