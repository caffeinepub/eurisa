import { LanguageToggle } from "@/components/game/LanguageToggle";
import { Button } from "@/components/ui/button";
import { type Language, getTranslation } from "@/translations";
import { motion } from "motion/react";

interface TipsPageProps {
  lang: Language;
  onToggleLang: () => void;
  onPlayAgain: () => void;
}

const TIP_KEYS = [
  {
    titleKey: "tip1Title" as const,
    bodyKey: "tip1Body" as const,
    color: "bg-blue-50 border-blue-200",
  },
  {
    titleKey: "tip2Title" as const,
    bodyKey: "tip2Body" as const,
    color: "bg-green-50 border-green-200",
  },
  {
    titleKey: "tip3Title" as const,
    bodyKey: "tip3Body" as const,
    color: "bg-yellow-50 border-yellow-200",
  },
  {
    titleKey: "tip4Title" as const,
    bodyKey: "tip4Body" as const,
    color: "bg-teal-50 border-teal-200",
  },
  {
    titleKey: "tip5Title" as const,
    bodyKey: "tip5Body" as const,
    color: "bg-cyan-50 border-cyan-200",
  },
  {
    titleKey: "tip6Title" as const,
    bodyKey: "tip6Body" as const,
    color: "bg-emerald-50 border-emerald-200",
  },
];

export function TipsPage({ lang, onToggleLang, onPlayAgain }: TipsPageProps) {
  const t = getTranslation(lang);

  return (
    <div className="min-h-screen bg-game-gradient">
      {/* Fixed header */}
      <div className="fixed top-0 left-0 right-0 z-30 bg-background/90 backdrop-blur-md border-b border-border">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="font-display font-extrabold text-foreground text-lg">
            🌍 {t.tipsTitle}
          </h1>
          <LanguageToggle lang={lang} onToggle={onToggleLang} />
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 pt-20 pb-8">
        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-muted-foreground text-center mb-8 text-sm sm:text-base"
        >
          {t.tipsSubtitle}
        </motion.p>

        {/* Tip cards */}
        <div className="space-y-4 mb-8">
          {TIP_KEYS.map((tip, i) => (
            <motion.div
              key={tip.titleKey}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`rounded-2xl border-2 p-5 shadow-card ${tip.color}`}
            >
              <h3 className="font-display font-bold text-foreground text-base sm:text-lg mb-2">
                {t[tip.titleKey]}
              </h3>
              <p className="text-foreground/80 text-sm sm:text-base leading-relaxed">
                {t[tip.bodyKey]}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Nepal fact banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="rounded-2xl bg-primary/10 border-2 border-primary/25 p-5 text-center mb-8"
        >
          <div className="text-3xl mb-3">🏔️</div>
          <h3 className="font-display font-bold text-primary text-lg mb-2">
            {lang === "en" ? "Did you know?" : "के तपाईंलाई थाहा छ?"}
          </h3>
          <p className="text-foreground text-sm sm:text-base leading-relaxed">
            {lang === "en"
              ? "Nepal is home to 8 of the world's 10 tallest mountains, including Mount Everest. Protecting Nepal's environment means protecting one of Earth's most spectacular natural heritages — and the water source for over a billion people downstream."
              : "नेपाल विश्वका १० सबैभन्दा अग्ला पहाडहरू मध्ये ८ को घर हो, जसमा सगरमाथा पनि पर्छ। नेपालको वातावरण जोगाउनु भनेको पृथ्वीका सबैभन्दा शानदार प्राकृतिक सम्पदाहरू मध्ये एकलाई — र एक अर्बभन्दा बढी मानिसको पानीको स्रोतलाई — जोगाउनु हो।"}
          </p>
        </motion.div>

        {/* Play again button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex justify-center"
        >
          <Button
            data-ocid="tips.play_again_button"
            onClick={onPlayAgain}
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-display font-bold text-lg px-12 py-6 rounded-2xl shadow-nature-lg w-full sm:w-auto"
          >
            🔄 {t.playAgain}
          </Button>
        </motion.div>

        {/* Footer */}
        <div className="mt-10 text-center">
          <p className="text-muted-foreground text-xs">
            © {new Date().getFullYear()}. Built with love using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline font-medium"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
