import { MarkO, MarkX } from "@/components/game/marks";
import { cellLabel, type Cell, type Mark } from "@/lib/game/engine";
import { cn } from "@/lib/utils";

const WIN_LINES: Record<string, { x1: string; y1: string; x2: string; y2: string }> =
  {
    "0,1,2": { x1: "8%", y1: "16.7%", x2: "92%", y2: "16.7%" },
    "3,4,5": { x1: "8%", y1: "50%", x2: "92%", y2: "50%" },
    "6,7,8": { x1: "8%", y1: "83.3%", x2: "92%", y2: "83.3%" },
    "0,3,6": { x1: "16.7%", y1: "8%", x2: "16.7%", y2: "92%" },
    "1,4,7": { x1: "50%", y1: "8%", x2: "50%", y2: "92%" },
    "2,5,8": { x1: "83.3%", y1: "8%", x2: "83.3%", y2: "92%" },
    "0,4,8": { x1: "14%", y1: "14%", x2: "86%", y2: "86%" },
    "2,4,6": { x1: "86%", y1: "14%", x2: "14%", y2: "86%" },
  };

type BoardProps = {
  board: Cell[];
  winningLine: number[] | null;
  lastMove: number | null;
  locked: boolean;
  winner: Mark | "draw" | null;
  onPlay: (index: number) => void;
};

export function Board({
  board,
  winningLine,
  lastMove,
  locked,
  winner,
  onPlay,
}: BoardProps) {
  const winKey = winningLine ? winningLine.join(",") : "";
  const winPath = WIN_LINES[winKey];

  return (
    <div
      className={cn("xo-board relative mx-auto w-full max-w-sm", winner && "xo-board-over")}
      role="grid"
      aria-label="Tic-tac-toe board"
    >
      <div className="grid aspect-square grid-cols-3 gap-px rounded-xl bg-border p-2">
        {board.map((value, index) => {
          const isWin = winningLine?.includes(index) ?? false;
          const filled = value !== null;
          return (
            <button
              key={index}
              type="button"
              role="gridcell"
              data-testid={`cell-${index}`}
              aria-label={cellLabel(index, value)}
              disabled={locked || filled}
              onClick={() => onPlay(index)}
              className={cn(
                "xo-cell relative flex items-center justify-center rounded-md bg-surface",
                filled ? "cursor-default" : "hover:bg-surface-2",
                lastMove === index && "xo-cell-last",
                isWin && "xo-cell-win",
              )}
            >
              {value === "X" ? <MarkX /> : value === "O" ? <MarkO /> : null}
            </button>
          );
        })}
      </div>
      {winPath ? (
        <svg
          className="pointer-events-none absolute inset-0 size-full"
          aria-hidden="true"
        >
          <line
            className="xo-win-line"
            x1={winPath.x1}
            y1={winPath.y1}
            x2={winPath.x2}
            y2={winPath.y2}
          />
        </svg>
      ) : null}
    </div>
  );
}
