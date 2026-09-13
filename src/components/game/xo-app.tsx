import { useEffect } from "react";
import { GameScreen } from "@/components/game/game-screen";
import { SetupScreen } from "@/components/game/setup-screen";
import { unlockAudio } from "@/lib/game/audio";
import { useGame } from "@/lib/game/store";

export function XOApp() {
  const phase = useGame((s) => s.phase);

  useEffect(() => {
    useGame.getState().hydrate();
  }, []);

  useEffect(() => {
    const unlock = () => unlockAudio();
    window.addEventListener("pointerdown", unlock);
    window.addEventListener("keydown", unlock);
    const onVis = () => {
      if (document.visibilityState === "visible") unlockAudio();
    };
    document.addEventListener("visibilitychange", onVis);
    return () => {
      window.removeEventListener("pointerdown", unlock);
      window.removeEventListener("keydown", unlock);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return (
    <div className="relative flex min-h-dvh justify-center overflow-x-hidden bg-background text-foreground">
      <div className="xo-vignette pointer-events-none" aria-hidden="true" />
      <main className="xo-shell relative flex min-h-dvh w-full max-w-lg flex-col px-4 sm:py-10">
        {phase === "setup" ? <SetupScreen /> : <GameScreen />}
      </main>
    </div>
  );
}
