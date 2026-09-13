import { Bot, RotateCcw, Settings2, User, Volume2, VolumeX } from "lucide-react";
import { useEffect, type ReactNode } from "react";
import { Board } from "@/components/game/board";
import { Button } from "@/components/ui/button";
import { pickAiMove } from "@/lib/game/ai";
import { emptyCells, other } from "@/lib/game/engine";
import { useGame } from "@/lib/game/store";
import { cn } from "@/lib/utils";

export function GameScreen() {
  const phase = useGame((s) => s.phase);
  const mode = useGame((s) => s.mode);
  const board = useGame((s) => s.board);
  const turn = useGame((s) => s.turn);
  const humanMark = useGame((s) => s.humanMark);
  const winner = useGame((s) => s.winner);
  const winningLine = useGame((s) => s.winningLine);
  const lastMove = useGame((s) => s.lastMove);
  const difficulty = useGame((s) => s.difficulty);
  const scoresAi = useGame((s) => s.scoresAi);
  const scoresLocal = useGame((s) => s.scoresLocal);
  const muted = useGame((s) => s.muted);
  const playCell = useGame((s) => s.playCell);
  const playAgain = useGame((s) => s.playAgain);
  const restartRound = useGame((s) => s.restartRound);
  const backToSetup = useGame((s) => s.backToSetup);
  const setMutedPref = useGame((s) => s.setMutedPref);

  const aiTurn = mode === "ai" && phase === "playing" && turn !== humanMark;
  const locked = phase !== "playing" || aiTurn;

  useEffect(() => {
    if (!aiTurn) return;
    if (emptyCells(board).length === 0) return;
    const delay = 480 + Math.floor(Math.random() * 260);
    const id = window.setTimeout(() => {
      const s = useGame.getState();
      if (s.phase !== "playing" || s.mode !== "ai" || s.turn === s.humanMark) return;
      const move = pickAiMove(s.board, other(s.humanMark), s.difficulty);
      if (move >= 0) s.playCell(move, { fromAi: true });
    }, delay);
    return () => window.clearTimeout(id);
  }, [aiTurn, board]);

  useEffect(() => {
    if (locked) return;
    const onKey = (event: KeyboardEvent) => {
      const n = Number(event.key);
      if (n >= 1 && n <= 9) playCell(n - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [locked, playCell]);

  const status = statusCopy({
    phase,
    mode,
    turn,
    humanMark,
    aiTurn,
    winner,
  });

  return (
    <div className="flex flex-1 flex-col gap-6">
      <header className="flex items-start justify-between gap-3">
        <div>
          <p className="font-display text-3xl leading-none tracking-tight">
            <span className="text-mark-x">X</span>
            <span className="text-mark-o">O</span>
          </p>
          <p className="mt-2 text-2xs tracking-kicker text-muted uppercase">
            {mode === "ai" ? difficultyLabel(difficulty) : "Two players"}
          </p>
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            aria-label={muted ? "Unmute" : "Mute"}
            onClick={() => setMutedPref(!muted)}
          >
            {muted ? (
              <VolumeX className="size-4" strokeWidth={1.75} />
            ) : (
              <Volume2 className="size-4" strokeWidth={1.75} />
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Back to setup"
            onClick={backToSetup}
          >
            <Settings2 className="size-4" strokeWidth={1.75} />
          </Button>
        </div>
      </header>

      {mode === "ai" ? (
        <div className="grid grid-cols-3 gap-3 rounded-xl border border-border bg-surface px-4 py-3">
          <ScoreStat
            icon={<User className="size-3.5" strokeWidth={1.75} />}
            label={`You · ${humanMark}`}
            value={scoresAi.human}
            align="start"
          />
          <ScoreStat label="Draw" value={scoresAi.draws} align="center" />
          <ScoreStat
            icon={<Bot className="size-3.5" strokeWidth={1.75} />}
            label={`AI · ${other(humanMark)}`}
            value={scoresAi.ai}
            align="end"
          />
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-3 rounded-xl border border-border bg-surface px-4 py-3">
          <ScoreStat label="X" value={scoresLocal.x} align="start" />
          <ScoreStat label="Draw" value={scoresLocal.draws} align="center" />
          <ScoreStat label="O" value={scoresLocal.o} align="end" />
        </div>
      )}

      <p
        className={cn(
          "min-h-6 text-sm text-muted",
          aiTurn && "xo-shimmer text-foreground",
        )}
        data-testid="status"
        aria-live="polite"
      >
        {status}
      </p>

      <Board
        board={board}
        winningLine={winningLine}
        lastMove={lastMove}
        locked={locked}
        winner={winner}
        onPlay={playCell}
      />

      <div className="flex flex-col gap-3 pt-2">
        {phase === "over" ? (
          <Button data-testid="play-again" size="lg" className="w-full" onClick={playAgain}>
            <RotateCcw className="size-4" strokeWidth={1.75} />
            Next round
          </Button>
        ) : (
          <Button
            variant="outline"
            className="w-full"
            onClick={restartRound}
            data-testid="restart"
          >
            Restart round
          </Button>
        )}
      </div>
    </div>
  );
}

function ScoreStat({
  label,
  value,
  icon,
  align,
}: {
  label: string;
  value: number;
  icon?: ReactNode;
  align: "start" | "center" | "end";
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-1",
        align === "center" && "items-center text-center",
        align === "end" && "items-end text-right",
      )}
    >
      <span className="flex items-center gap-1 text-2xs tracking-kicker text-muted uppercase">
        {icon}
        {label}
      </span>
      <span className="font-display text-2xl leading-none tabular-nums text-foreground">
        {value}
      </span>
    </div>
  );
}

function difficultyLabel(d: "easy" | "medium" | "hard") {
  if (d === "easy") return "Casual AI";
  if (d === "medium") return "Sharp AI";
  return "Perfect AI";
}

function statusCopy({
  phase,
  mode,
  turn,
  humanMark,
  aiTurn,
  winner,
}: {
  phase: "setup" | "playing" | "over";
  mode: "ai" | "local";
  turn: "X" | "O";
  humanMark: "X" | "O";
  aiTurn: boolean;
  winner: "X" | "O" | "draw" | null;
}) {
  if (phase === "over") {
    if (winner === "draw") return "Draw. Board is full.";
    if (mode === "ai") {
      return winner === humanMark ? "You win this round." : "AI takes the round.";
    }
    return `${winner} wins this round.`;
  }
  if (aiTurn) return `AI is thinking · you are ${humanMark}`;
  if (mode === "ai") return `Your move · you are ${humanMark}`;
  return `${turn} to move`;
}
