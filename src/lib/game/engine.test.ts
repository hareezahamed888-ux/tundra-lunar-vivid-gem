import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { pickAiMove } from "./ai.ts";
import {
  applyMove,
  emptyBoard,
  getOutcome,
  other,
  type Cell,
  type Mark,
} from "./engine.ts";

function play(cells: Array<Mark | ".">): Cell[] {
  return cells.map((c) => (c === "." ? null : c));
}

describe("XO engine", () => {
  it("detects a row win and a full-board draw", () => {
    assert.equal(getOutcome(play(["X", "X", "X", "O", "O", ".", ".", ".", "."])), "X");
    assert.equal(
      getOutcome(play(["X", "O", "X", "X", "O", "O", "O", "X", "X"])),
      "draw",
    );
  });
});

describe("XO AI", () => {
  it("takes mate-in-one on hard", () => {
    const board = play(["X", "X", ".", "O", "O", ".", ".", ".", "."]);
    assert.equal(pickAiMove(board, "X", "hard"), 2);
  });

  it("blocks mate-in-one on hard", () => {
    const board = play(["O", "O", ".", "X", ".", ".", ".", ".", "."]);
    assert.equal(pickAiMove(board, "X", "hard"), 2);
  });

  it("never loses on hard against random play", () => {
    for (let game = 0; game < 80; game++) {
      let board = emptyBoard();
      let turn: Mark = "X";
      const ai: Mark = game % 2 === 0 ? "X" : "O";
      while (!getOutcome(board)) {
        if (turn === ai) {
          const move = pickAiMove(board, ai, "hard");
          board = applyMove(board, move, turn);
        } else {
          const empties = board
            .map((c, i) => (c ? -1 : i))
            .filter((i) => i >= 0);
          const move = empties[Math.floor(Math.random() * empties.length)]!;
          board = applyMove(board, move, turn);
        }
        turn = other(turn);
      }
      const outcome = getOutcome(board);
      assert.notEqual(outcome, other(ai), `hard AI lost as ${ai}`);
    }
  });

  it("draws when both sides play perfectly", () => {
    let board = emptyBoard();
    let turn: Mark = "X";
    while (!getOutcome(board)) {
      const move = pickAiMove(board, turn, "hard");
      board = applyMove(board, move, turn);
      turn = other(turn);
    }
    assert.equal(getOutcome(board), "draw");
  });
});
