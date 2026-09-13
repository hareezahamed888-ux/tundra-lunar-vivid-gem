export type Mark = "X" | "O";
export type Cell = Mark | null;
export type Outcome = Mark | "draw";
export type Side = Mark | "mix";
export type Mode = "ai" | "local";
export type Difficulty = "easy" | "medium" | "hard";
export type Phase = "setup" | "playing" | "over";

export const LINES: readonly (readonly [number, number, number])[] = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export function emptyBoard(): Cell[] {
  return [null, null, null, null, null, null, null, null, null];
}

export function other(mark: Mark): Mark {
  return mark === "X" ? "O" : "X";
}

export function emptyCells(board: readonly Cell[]): number[] {
  const out: number[] = [];
  for (let i = 0; i < 9; i++) {
    if (!board[i]) out.push(i);
  }
  return out;
}

export function findWinner(
  board: readonly Cell[],
): { winner: Mark; line: number[] } | null {
  for (const line of LINES) {
    const [a, b, c] = line;
    const v = board[a];
    if (v && v === board[b] && v === board[c]) {
      return { winner: v, line: [a, b, c] };
    }
  }
  return null;
}

export function getOutcome(board: readonly Cell[]): Outcome | null {
  const win = findWinner(board);
  if (win) return win.winner;
  if (emptyCells(board).length === 0) return "draw";
  return null;
}

export function isLegal(board: readonly Cell[], index: number): boolean {
  return index >= 0 && index < 9 && board[index] === null;
}

export function applyMove(
  board: readonly Cell[],
  index: number,
  mark: Mark,
): Cell[] {
  if (!isLegal(board, index)) return board.slice();
  const next = board.slice();
  next[index] = mark;
  return next;
}

export function cellLabel(index: number, value: Cell): string {
  const row = Math.floor(index / 3) + 1;
  const col = (index % 3) + 1;
  if (!value) return `Empty cell, row ${row}, column ${col}`;
  return `${value} in row ${row}, column ${col}`;
}
