import { Bot, Shuffle, Users } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { unlockAudio } from "@/lib/game/audio";
import type { Difficulty, Mode, Side } from "@/lib/game/engine";
import { useGame } from "@/lib/game/store";
import { cn } from "@/lib/utils";

const MODES: { value: Mode; label: string; icon: typeof Bot }[] = [
  { value: "ai", label: "You vs AI", icon: Bot },
  { value: "local", label: "Two players", icon: Users },
];

const SIDES: { value: Side; label: string }[] = [
  { value: "X", label: "Play X" },
  { value: "O", label: "Play O" },
  { value: "mix", label: "Mix" },
];

const DIFFICULTIES: { value: Difficulty; label: string }[] = [
  { value: "easy", label: "Casual" },
  { value: "medium", label: "Sharp" },
  { value: "hard", label: "Perfect" },
];

export function SetupScreen() {
  const storedMode = useGame((s) => s.mode);
  const storedSide = useGame((s) => s.side);
  const storedDifficulty = useGame((s) => s.difficulty);
  const scores = useGame((s) => s.scoresAi);
  const startMatch = useGame((s) => s.startMatch);
  const resetScores = useGame((s) => s.resetScores);

  const [mode, setMode] = useState<Mode>(storedMode);
  const [side, setSide] = useState<Side>(storedSide);
  const [difficulty, setDifficulty] = useState<Difficulty>(storedDifficulty);

  useEffect(() => {
    setMode(storedMode);
    setSide(storedSide);
    setDifficulty(storedDifficulty);
  }, [storedMode, storedSide, storedDifficulty]);

  return (
    <div className="flex flex-1 flex-col justify-center gap-8 py-4">
      <header className="flex flex-col gap-3">
        <p className="text-2xs font-medium tracking-kicker text-muted uppercase">
          Noughts and crosses
        </p>
        <h1 className="font-display text-6xl leading-none tracking-tight text-foreground sm:text-7xl">
          <span className="text-mark-x">X</span>
          <span className="text-mark-o">O</span>
        </h1>
        <p className="max-w-sm text-base leading-relaxed text-muted">
          Pick a mark. The other side is the AI. Mix swaps X and O every round so
          you play both.
        </p>
      </header>

      <div className="flex items-center gap-6 text-sm tabular-nums text-muted">
        <ScoreChip label="You" value={scores.human} />
        <ScoreChip label="Draw" value={scores.draws} />
        <ScoreChip label="AI" value={scores.ai} />
      </div>

      <div className="flex flex-col gap-6">
        <ChoiceRow label="Match" cols={2}>
          {MODES.map((opt) => {
            const Icon = opt.icon;
            return (
              <ChoiceButton
                key={opt.value}
                active={mode === opt.value}
                onClick={() => setMode(opt.value)}
                testId={`mode-${opt.value}`}
              >
                <Icon className="size-4" strokeWidth={1.75} />
                <span>{opt.label}</span>
              </ChoiceButton>
            );
          })}
        </ChoiceRow>

        {mode === "ai" ? (
          <ChoiceRow label="Your mark">
            {SIDES.map((opt) => (
              <ChoiceButton
                key={opt.value}
                active={side === opt.value}
                onClick={() => setSide(opt.value)}
                testId={`side-${opt.value}`}
              >
                {opt.value === "mix" ? (
                  <Shuffle className="size-3.5" strokeWidth={1.75} />
                ) : null}
                <span>{opt.label}</span>
              </ChoiceButton>
            ))}
          </ChoiceRow>
        ) : null}

        {mode === "ai" ? (
          <ChoiceRow label="AI">
            {DIFFICULTIES.map((opt) => (
              <ChoiceButton
                key={opt.value}
                active={difficulty === opt.value}
                onClick={() => setDifficulty(opt.value)}
                testId={`diff-${opt.value}`}
              >
                {opt.label}
              </ChoiceButton>
            ))}
          </ChoiceRow>
        ) : null}

        <p className="text-xs leading-relaxed text-subtle">
          {mode === "ai"
            ? side === "mix"
              ? "Each new round you take the other mark. X still always moves first."
              : side === "O"
                ? "You play O. The AI opens as X."
                : "You play X and open the board."
            : "Sit together. X opens, then O. Same board, no AI."}
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <Button
          data-testid="play"
          size="lg"
          className="w-full"
          onClick={() => {
            unlockAudio();
            startMatch({ mode, difficulty, side });
          }}
        >
          Play
        </Button>
        <Button variant="ghost" size="sm" onClick={resetScores}>
          Reset scores
        </Button>
      </div>
    </div>
  );
}

function ScoreChip({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-2xs tracking-kicker uppercase">{label}</span>
      <span className="font-display text-2xl leading-none text-foreground">{value}</span>
    </div>
  );
}

function ChoiceRow({
  label,
  children,
  cols = 3,
}: {
  label: string;
  children: ReactNode;
  cols?: 2 | 3;
}) {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-2xs font-medium tracking-kicker text-muted uppercase">{label}</p>
      <div className={cn("grid gap-2", cols === 2 ? "grid-cols-2" : "grid-cols-3")}>
        {children}
      </div>
    </div>
  );
}

function ChoiceButton({
  active,
  onClick,
  children,
  testId,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
  testId?: string;
}) {
  return (
    <button
      type="button"
      data-testid={testId}
      onClick={onClick}
      className={cn(
        "flex h-11 items-center justify-center gap-1.5 rounded-md border px-2 text-sm font-medium transition-colors duration-150",
        active
          ? "border-accent bg-accent text-accent-fg"
          : "border-border bg-surface text-foreground hover:border-border-strong",
      )}
    >
      {children}
    </button>
  );
}
