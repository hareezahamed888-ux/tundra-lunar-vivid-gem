import {
  applyMove,
  emptyCells,
  getOutcome,
  other,
  type Cell,
  type Difficulty,
  type Mark,
} from "./engine.ts";

function randomOf<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)]!;
}

function winningMove(board: readonly Cell[], mark: Mark): number | null {
  for (const index of emptyCells(board)) {
    const next = applyMove(board, index, mark);
    if (getOutcome(next) === mark) return index;
  }
  return null;
}

function pickEasy(board: readonly Cell[], ai: Mark, empties: number[]): number {
  if (Math.random() < 0.45) {
    const win = winningMove(board, ai);
    if (win != null) return win;
  }
  if (Math.random() < 0.2) {
    const block = winningMove(board, other(ai));
    if (block != null) return block;
  }
  return randomOf(empties);
}

function pickMedium(board: readonly Cell[], ai: Mark, empties: number[]): number {
  const win = winningMove(board, ai);
  if (win != null) return win;

  const block = winningMove(board, other(ai));
  if (block != null && Math.random() < 0.82) return block;

  if (board[4] === null && Math.random() < 0.7) return 4;

  const corners = [0, 2, 6, 8].filter((i) => board[i] === null);
  if (corners.length && Math.random() < 0.65) return randomOf(corners);

  return randomOf(empties);
}

function minimax(
  board: Cell[],
  toMove: Mark,
  ai: Mark,
  depth: number,
  alpha: number,
  beta: number,
): number {
  const outcome = getOutcome(board);
  if (outcome === ai) return 10 - depth;
  if (outcome === other(ai)) return depth - 10;
  if (outcome === "draw") return 0;

  const empties = emptyCells(board);
  if (toMove === ai) {
    let best = -Infinity;
    for (const index of empties) {
      board[index] = toMove;
      const score = minimax(board, other(toMove), ai, depth + 1, alpha, beta);
      board[index] = null;
      if (score > best) best = score;
      if (best > alpha) alpha = best;
      if (beta <= alpha) break;
    }
    return best;
  }

  let best = Infinity;
  for (const index of empties) {
    board[index] = toMove;
    const score = minimax(board, other(toMove), ai, depth + 1, alpha, beta);
    board[index] = null;
    if (score < best) best = score;
    if (best < beta) beta = best;
    if (beta <= alpha) break;
  }
  return best;
}

function pickHard(board: readonly Cell[], ai: Mark, empties: number[]): number {
  const mutable = board.slice();
  let bestScore = -Infinity;
  const bestMoves: number[] = [];

  for (const index of empties) {
    mutable[index] = ai;
    const score = minimax(mutable, other(ai), ai, 1, -Infinity, Infinity);
    mutable[index] = null;
    if (score > bestScore) {
      bestScore = score;
      bestMoves.length = 0;
      bestMoves.push(index);
    } else if (score === bestScore) {
      bestMoves.push(index);
    }
  }

  return randomOf(bestMoves);
}

export function pickAiMove(
  board: readonly Cell[],
  ai: Mark,
  difficulty: Difficulty,
): number {
  const empties = emptyCells(board);
  if (empties.length === 0) return -1;
  if (difficulty === "easy") return pickEasy(board, ai, empties);
  if (difficulty === "medium") return pickMedium(board, ai, empties);
  return pickHard(board, ai, empties);
}
