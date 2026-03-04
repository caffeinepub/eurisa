import { INITIAL_METRICS, type Metrics, SCENES } from "@/gameData";
import { useCreateGameSession, useGetSessionState } from "@/hooks/useQueries";
import type { SessionId } from "@/hooks/useQueries";
import { GameScenePage } from "@/pages/GameScenePage";
import { HomePage } from "@/pages/HomePage";
import { InstructionsPage } from "@/pages/InstructionsPage";
import { ResultsPage } from "@/pages/ResultsPage";
import { TipsPage } from "@/pages/TipsPage";
import { VideoHubPage } from "@/pages/VideoHubPage";
import type { Language } from "@/translations";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useState } from "react";

type Page = "home" | "instructions" | "game" | "results" | "tips" | "videohub";

interface DecisionRecord {
  sceneIndex: number;
  choiceIndex: number;
}

export default function App() {
  const [page, setPage] = useState<Page>("home");
  const [lang, setLang] = useState<Language>("en");
  const [sessionId, setSessionId] = useState<SessionId | null>(null);
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [metrics, setMetrics] = useState<Metrics>(INITIAL_METRICS);
  const [decisions, setDecisions] = useState<DecisionRecord[]>([]);
  const [finalMetrics, setFinalMetrics] = useState<Metrics>(INITIAL_METRICS);
  const [isStarting, setIsStarting] = useState(false);

  const createSession = useCreateGameSession();
  const { data: sessionState } = useGetSessionState(
    page === "results" ? sessionId : null,
  );

  const toggleLang = useCallback(() => {
    setLang((prev) => (prev === "en" ? "np" : "en"));
  }, []);

  const handleStartGame = useCallback(async () => {
    if (isStarting) return;
    setIsStarting(true);

    // Reset game state
    setCurrentSceneIndex(0);
    setMetrics(INITIAL_METRICS);
    setDecisions([]);
    setFinalMetrics(INITIAL_METRICS);

    try {
      const newSessionId = await createSession.mutateAsync();
      setSessionId(newSessionId);
    } catch {
      // Continue without session if backend fails
      setSessionId(null);
    } finally {
      setIsStarting(false);
    }

    setPage("game");
  }, [createSession, isStarting]);

  const handleChoiceMade = useCallback(
    (sceneIndex: number, choiceIndex: number, newMetrics: Metrics) => {
      setDecisions((prev) => [...prev, { sceneIndex, choiceIndex }]);
      setMetrics(newMetrics);
      setCurrentSceneIndex((prev) => prev + 1);
    },
    [],
  );

  const handleGameComplete = useCallback(() => {
    setFinalMetrics(metrics);
    setPage("results");
  }, [metrics]);

  // If session state comes back from backend, use those scores as source of truth
  const displayMetrics: Metrics =
    page === "results" && sessionState?.scores
      ? {
          pollution: Number(sessionState.scores.pollution),
          forest: Number(sessionState.scores.forest),
          happiness: Number(sessionState.scores.happiness),
        }
      : finalMetrics;

  // Derive decisions from session if available
  const displayDecisions: DecisionRecord[] =
    page === "results" && sessionState?.decisions?.length
      ? sessionState.decisions.map((d) => ({
          sceneIndex: Number(d.sceneIndex),
          choiceIndex: Number(d.choiceIndex),
        }))
      : decisions;

  return (
    <div className="min-h-screen">
      <AnimatePresence mode="wait">
        {page === "home" && (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <HomePage
              lang={lang}
              onToggleLang={toggleLang}
              onStartGame={handleStartGame}
              onHowToPlay={() => setPage("instructions")}
              onOpenVideoHub={() => setPage("videohub")}
            />
          </motion.div>
        )}

        {page === "instructions" && (
          <motion.div
            key="instructions"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.3 }}
          >
            <InstructionsPage
              lang={lang}
              onToggleLang={toggleLang}
              onStartGame={handleStartGame}
              onBack={() => setPage("home")}
            />
          </motion.div>
        )}

        {page === "game" && currentSceneIndex < SCENES.length && (
          <motion.div
            key="game"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.3 }}
          >
            <GameScenePage
              lang={lang}
              onToggleLang={toggleLang}
              currentSceneIndex={currentSceneIndex}
              metrics={metrics}
              sessionId={sessionId}
              onChoiceMade={handleChoiceMade}
              onGameComplete={handleGameComplete}
            />
          </motion.div>
        )}

        {page === "results" && (
          <motion.div
            key="results"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.4 }}
          >
            <ResultsPage
              lang={lang}
              onToggleLang={toggleLang}
              finalMetrics={displayMetrics}
              decisions={displayDecisions}
              onPlayAgain={handleStartGame}
              onLearnMore={() => setPage("tips")}
            />
          </motion.div>
        )}

        {page === "tips" && (
          <motion.div
            key="tips"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.3 }}
          >
            <TipsPage
              lang={lang}
              onToggleLang={toggleLang}
              onPlayAgain={handleStartGame}
            />
          </motion.div>
        )}

        {page === "videohub" && (
          <motion.div
            key="videohub"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <VideoHubPage onBack={() => setPage("home")} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
