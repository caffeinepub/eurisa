import { LanguageToggle } from "@/components/game/LanguageToggle";
import { Button } from "@/components/ui/button";
import { type Language, getTranslation } from "@/translations";
import { Globe, Leaf, TreePine, Wind } from "lucide-react";
import { motion } from "motion/react";

interface HomePageProps {
  lang: Language;
  onToggleLang: () => void;
  onStartGame: () => void;
  onHowToPlay: () => void;
}

export function HomePage({
  lang,
  onToggleLang,
  onStartGame,
  onHowToPlay,
}: HomePageProps) {
  const t = getTranslation(lang);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Hero background */}
      <div className="absolute inset-0">
        <img
          src="/assets/generated/hero-banner.dim_1200x500.jpg"
          alt="Nepal Himalayas"
          className="w-full h-full object-cover"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-green-950/70 via-green-900/50 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-green-950/40 to-transparent" />
      </div>

      {/* Language toggle */}
      <div className="absolute top-4 right-4 z-20">
        <LanguageToggle lang={lang} onToggle={onToggleLang} />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 pb-16 pt-20 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 backdrop-blur-sm border border-white/30 text-white text-sm font-display font-medium">
            <Globe className="w-4 h-4" />
            🇳🇵 Nepal Climate Simulator
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display text-5xl sm:text-6xl md:text-7xl font-extrabold text-white mb-4 leading-tight"
        >
          {t.appTitle}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-display text-xl sm:text-2xl text-emerald-200 font-semibold mb-6"
        >
          {t.appSubtitle}
        </motion.p>

        {/* Intro text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-xl text-white/85 text-base sm:text-lg leading-relaxed mb-10"
        >
          {t.appIntro}
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 items-center"
        >
          <Button
            data-ocid="home.start_button"
            onClick={onStartGame}
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-display font-bold text-lg px-10 py-6 rounded-2xl shadow-nature-lg animate-pulse-glow transition-all"
          >
            🌿 {t.startGame}
          </Button>
          <Button
            data-ocid="home.instructions_button"
            onClick={onHowToPlay}
            variant="outline"
            size="lg"
            className="bg-white/20 hover:bg-white/30 border-white/50 text-white hover:text-white font-display font-bold text-lg px-8 py-6 rounded-2xl backdrop-blur-sm"
          >
            📖 {t.howToPlay}
          </Button>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-14 flex flex-wrap justify-center gap-6 sm:gap-10"
        >
          {[
            {
              icon: <Leaf className="w-5 h-5" />,
              label: "6 Decisions",
              labelNp: "६ निर्णयहरू",
            },
            {
              icon: <TreePine className="w-5 h-5" />,
              label: "3 Metrics",
              labelNp: "३ मेट्रिकहरू",
            },
            {
              icon: <Wind className="w-5 h-5" />,
              label: "Bilingual",
              labelNp: "द्विभाषिक",
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className="flex items-center gap-2 text-white/80 font-display text-sm font-medium"
            >
              {stat.icon}
              <span>{lang === "en" ? stat.label : stat.labelNp}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 80"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
          aria-hidden="true"
          role="presentation"
        >
          <path
            d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z"
            fill="oklch(0.97 0.015 130)"
          />
        </svg>
      </div>
    </div>
  );
}
