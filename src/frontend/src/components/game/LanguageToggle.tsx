import { cn } from "@/lib/utils";
import type { Language } from "@/translations";

interface LanguageToggleProps {
  lang: Language;
  onToggle: () => void;
}

export function LanguageToggle({ lang, onToggle }: LanguageToggleProps) {
  return (
    <button
      type="button"
      data-ocid="game.language_toggle"
      onClick={onToggle}
      className={cn(
        "flex items-center gap-0.5 rounded-full px-3 py-1.5",
        "bg-white/80 backdrop-blur-sm border border-border",
        "font-display text-xs font-semibold",
        "hover:bg-white transition-all shadow-xs",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
      )}
      aria-label="Toggle language"
    >
      <span
        className={cn(
          lang === "en" ? "text-foreground" : "text-muted-foreground",
        )}
      >
        EN
      </span>
      <span className="text-muted-foreground mx-1">|</span>
      <span
        className={cn(
          lang === "np" ? "text-foreground" : "text-muted-foreground",
        )}
      >
        नेपाली
      </span>
    </button>
  );
}
