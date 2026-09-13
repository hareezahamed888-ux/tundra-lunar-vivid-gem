import { create } from "zustand";
import { pickAiMove } from "./ai";
import { playDraw, playLoss, playPlace, playUi, playWin, setMuted } from "./audio";
import {
  applyMove,
  emptyBoard,
  findWinner,
  getOutcome,
  isLegal,
  other,
  type Cell,
  type Difficulty,
  type Mark,
  type Mode,
  type Outcome,
  type Phase,
  type Side,
} from "./engine";

const STORAGE_KEY = "xo-arena-v1";

export type AiScores = { human: number; ai: number; draws: number };
export type LocalScores = { x: number; o: number; draws: number };

type PersistShape = {
  scoresAi: AiScores;
  scoresLocal: LocalScores;
  muted: boolean;
  lastSetup: { mode: Mode; difficulty: Difficulty; side: Side };
};

type GameState = {
  phase: Phase;
  mode: Mode;
  difficulty: Difficulty;
  side: Side;
  humanMark: Mark;
  board: Cell[];
  turn: Mark;
  winner: Outcome | null;
  winningLine: number[] | null;
  lastMove: number | null;
  scoresAi: AiScores;
  scoresLocal: LocalScores;
  muted: boolean;
  hydrate: () => void;
  setMutedPref: (muted: boolean) => void;
  startMatch: (opts: { mode: Mode; difficulty: Difficulty; side: Side }) => void;
  playCell: (index: number, opts?: { fromAi?: boolean }) => void;
  playAgain: () => void;
  restartRound: () => void;
  backToSetup: () => void;
  resetScores: () => void;
};

const defaultAi: AiScores = { human: 0, ai: 0, draws: 0 };
const defaultLocal: LocalScores = { x: 0, o: 0, draws: 0 };

function persist(partial: PersistShape) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(partial));
  } catch {
    /* ignore quota */
  }
}

function snapshot(state: GameState): PersistShape {
  return {
    scoresAi: state.scoresAi,
    scoresLocal: state.scoresLocal,
    muted: state.muted,
    lastSetup: {
      mode: state.mode,
      difficulty: state.difficulty,
      side: state.side,
    },
  };
}

function pickHumanMark(side: Side, previous?: Mark): Mark {
  if (side === "X" || side === "O") return side;
  if (previous) return other(previous);
  return Math.random() < 0.5 ? "X" : "O";
}

function nextAiScores(
  scores: AiScores,
  outcome: Outcome,
  humanMark: Mark,
): AiScores {
  if (outcome === "draw") return { ...scores, draws: scores.draws + 1 };
  if (outcome === humanMark) return { ...scores, human: scores.human + 1 };
  return { ...scores, ai: scores.ai + 1 };
}

function nextLocalScores(scores: LocalScores, outcome: Outcome): LocalScores {
  if (outcome === "draw") return { ...scores, draws: scores.draws + 1 };
  if (outcome === "X") return { ...scores, x: scores.x + 1 };
  return { ...scores, o: scores.o + 1 };
}

function freshBoard(humanMark: Mark) {
  return {
    phase: "playing" as const,
    humanMark,
    board: emptyBoard(),
    turn: "X" as const,
    winner: null,
    winningLine: null,
    lastMove: null,
  };
}

export const useGame = create<GameState>((set, get) => ({
  phase: "setup",
  mode: "ai",
  difficulty: "medium",
  side: "mix",
  humanMark: "X",
  board: emptyBoard(),
  turn: "X",
  winner: null,
  winningLine: null,
  lastMove: null,
  scoresAi: defaultAi,
  scoresLocal: defaultLocal,
  muted: false,

  hydrate: () => {
    if (typeof window === "undefined") return;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const data = JSON.parse(raw) as Partial<PersistShape>;
      const mutedPref = Boolean(data.muted);
      setMuted(mutedPref);
      set({
        scoresAi: data.scoresAi ?? defaultAi,
        scoresLocal: data.scoresLocal ?? defaultLocal,
        muted: mutedPref,
        mode: data.lastSetup?.mode ?? "ai",
        difficulty: data.lastSetup?.difficulty ?? "medium",
        side: data.lastSetup?.side ?? "mix",
      });
    } catch {
      /* ignore */
    }
  },

  setMutedPref: (next) => {
    setMuted(next);
    set({ muted: next });
    persist(snapshot({ ...get(), muted: next }));
  },

  startMatch: ({ mode, difficulty, side }) => {
    playUi();
    set({
      mode,
      difficulty,
      side,
      ...freshBoard(pickHumanMark(side)),
    });
    persist(snapshot(get()));
  },

  playCell: (index, opts) => {
    const s = get();
    if (s.phase !== "playing") return;
    if (!isLegal(s.board, index)) return;
    if (s.mode === "ai") {
      const isAiTurn = s.turn !== s.humanMark;
      if (opts?.fromAi && !isAiTurn) return;
      if (!opts?.fromAi && isAiTurn) return;
    }

    const board = applyMove(s.board, index, s.turn);
    playPlace(s.turn);
    const win = findWinner(board);
    const outcome = getOutcome(board);

    if (outcome) {
      const scoresAi =
        s.mode === "ai"
          ? nextAiScores(s.scoresAi, outcome, s.humanMark)
          : s.scoresAi;
      const scoresLocal =
        s.mode === "local" ? nextLocalScores(s.scoresLocal, outcome) : s.scoresLocal;

      if (outcome === "draw") playDraw();
      else if (s.mode === "ai") {
        if (outcome === s.humanMark) playWin();
        else playLoss();
      } else {
        playWin();
      }

      const next = {
        ...s,
        board,
        lastMove: index,
        phase: "over" as const,
        winner: outcome,
        winningLine: win?.line ?? null,
        scoresAi,
        scoresLocal,
      };
      set(next);
      persist(snapshot(next));
      return;
    }

    set({
      board,
      lastMove: index,
      turn: other(s.turn),
    });
  },

  playAgain: () => {
    const s = get();
    playUi();
    set(freshBoard(pickHumanMark(s.side, s.humanMark)));
  },

  restartRound: () => {
    playUi();
    set(freshBoard(get().humanMark));
  },

  backToSetup: () => {
    playUi();
    set({
      phase: "setup",
      board: emptyBoard(),
      turn: "X",
      winner: null,
      winningLine: null,
      lastMove: null,
    });
  },

  resetScores: () => {
    const next = {
      ...get(),
      scoresAi: defaultAi,
      scoresLocal: defaultLocal,
    };
    set({ scoresAi: defaultAi, scoresLocal: defaultLocal });
    persist(snapshot(next));
  },
}));

export function suggestAiMove(): number {
  const s = useGame.getState();
  return pickAiMove(s.board, other(s.humanMark), s.difficulty);
}
