import { cn } from "@/lib/utils";
import { motion } from "motion/react";

interface MetricBarProps {
  label: string;
  value: number;
  type: "pollution" | "forest" | "happiness";
  delta?: number;
  compact?: boolean;
}

const BAR_CONFIGS = {
  pollution: {
    barClass: "bg-pollution",
    textClass: "text-pollution",
    bgClass: "bg-red-100",
    icon: "💨",
    // For pollution, reverse the bar (lower = more green space shown)
    reversed: true,
  },
  forest: {
    barClass: "bg-forest",
    textClass: "text-forest",
    bgClass: "bg-green-100",
    icon: "🌳",
    reversed: false,
  },
  happiness: {
    barClass: "bg-happiness",
    textClass: "text-happiness",
    bgClass: "bg-amber-100",
    icon: "😊",
    reversed: false,
  },
};

export function MetricBar({
  label,
  value,
  type,
  delta,
  compact,
}: MetricBarProps) {
  const config = BAR_CONFIGS[type];
  const displayWidth = value;

  return (
    <div className={cn("flex flex-col gap-1", compact ? "gap-0.5" : "gap-1.5")}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className={compact ? "text-sm" : "text-base"}>
            {config.icon}
          </span>
          <span
            className={cn(
              "font-display font-semibold",
              config.textClass,
              compact ? "text-xs" : "text-sm",
            )}
          >
            {label}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span
            className={cn(
              "font-display font-bold tabular-nums",
              config.textClass,
              compact ? "text-sm" : "text-base",
            )}
          >
            {Math.round(value)}
          </span>
          {delta !== undefined && delta !== 0 && (
            <motion.span
              initial={{ opacity: 0, scale: 0.6, y: -4 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.6 }}
              className={cn(
                "text-xs font-bold px-1.5 py-0.5 rounded-full",
                delta > 0
                  ? type === "pollution"
                    ? "bg-red-100 text-red-600"
                    : "bg-green-100 text-green-700"
                  : type === "pollution"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-600",
              )}
            >
              {delta > 0 ? "+" : ""}
              {delta}
            </motion.span>
          )}
        </div>
      </div>
      <div
        className={cn(
          "relative w-full rounded-full overflow-hidden",
          config.bgClass,
          compact ? "h-2.5" : "h-4",
        )}
      >
        <motion.div
          className={cn("h-full rounded-full", config.barClass)}
          initial={{ width: 0 }}
          animate={{ width: `${displayWidth}%` }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}
