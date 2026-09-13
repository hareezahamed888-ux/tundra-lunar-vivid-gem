import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as RotateCcw, i as User, l as Bot, n as Volume2, o as Shuffle, r as Users, s as Settings2, t as VolumeX } from "../_libs/lucide-react.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { t as Slot } from "../_libs/radix-ui__react-slot.mjs";
import { t as create } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-CFh15Ruq.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function MarkX({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 100 100",
		className: cn("xo-mark text-mark-x", className),
		"aria-hidden": "true",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			className: "xo-stroke xo-stroke-a",
			d: "M22 22 L78 78"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			className: "xo-stroke xo-stroke-b",
			d: "M78 22 L22 78"
		})]
	});
}
function MarkO({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		viewBox: "0 0 100 100",
		className: cn("xo-mark text-mark-o", className),
		"aria-hidden": "true",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
			className: "xo-stroke xo-stroke-o",
			cx: "50",
			cy: "50",
			r: "30"
		})
	});
}
var LINES = [
	[
		0,
		1,
		2
	],
	[
		3,
		4,
		5
	],
	[
		6,
		7,
		8
	],
	[
		0,
		3,
		6
	],
	[
		1,
		4,
		7
	],
	[
		2,
		5,
		8
	],
	[
		0,
		4,
		8
	],
	[
		2,
		4,
		6
	]
];
function emptyBoard() {
	return [
		null,
		null,
		null,
		null,
		null,
		null,
		null,
		null,
		null
	];
}
function other(mark) {
	return mark === "X" ? "O" : "X";
}
function emptyCells(board) {
	const out = [];
	for (let i = 0; i < 9; i++) if (!board[i]) out.push(i);
	return out;
}
function findWinner(board) {
	for (const line of LINES) {
		const [a, b, c] = line;
		const v = board[a];
		if (v && v === board[b] && v === board[c]) return {
			winner: v,
			line: [
				a,
				b,
				c
			]
		};
	}
	return null;
}
function getOutcome(board) {
	const win = findWinner(board);
	if (win) return win.winner;
	if (emptyCells(board).length === 0) return "draw";
	return null;
}
function isLegal(board, index) {
	return index >= 0 && index < 9 && board[index] === null;
}
function applyMove(board, index, mark) {
	if (!isLegal(board, index)) return board.slice();
	const next = board.slice();
	next[index] = mark;
	return next;
}
function cellLabel(index, value) {
	const row = Math.floor(index / 3) + 1;
	const col = index % 3 + 1;
	if (!value) return `Empty cell, row ${row}, column ${col}`;
	return `${value} in row ${row}, column ${col}`;
}
var WIN_LINES = {
	"0,1,2": {
		x1: "8%",
		y1: "16.7%",
		x2: "92%",
		y2: "16.7%"
	},
	"3,4,5": {
		x1: "8%",
		y1: "50%",
		x2: "92%",
		y2: "50%"
	},
	"6,7,8": {
		x1: "8%",
		y1: "83.3%",
		x2: "92%",
		y2: "83.3%"
	},
	"0,3,6": {
		x1: "16.7%",
		y1: "8%",
		x2: "16.7%",
		y2: "92%"
	},
	"1,4,7": {
		x1: "50%",
		y1: "8%",
		x2: "50%",
		y2: "92%"
	},
	"2,5,8": {
		x1: "83.3%",
		y1: "8%",
		x2: "83.3%",
		y2: "92%"
	},
	"0,4,8": {
		x1: "14%",
		y1: "14%",
		x2: "86%",
		y2: "86%"
	},
	"2,4,6": {
		x1: "86%",
		y1: "14%",
		x2: "14%",
		y2: "86%"
	}
};
function Board({ board, winningLine, lastMove, locked, winner, onPlay }) {
	const winPath = WIN_LINES[winningLine ? winningLine.join(",") : ""];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("xo-board relative mx-auto w-full max-w-sm", winner && "xo-board-over"),
		role: "grid",
		"aria-label": "Tic-tac-toe board",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid aspect-square grid-cols-3 gap-px rounded-xl bg-border p-2",
			children: board.map((value, index) => {
				const isWin = winningLine?.includes(index) ?? false;
				const filled = value !== null;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					role: "gridcell",
					"data-testid": `cell-${index}`,
					"aria-label": cellLabel(index, value),
					disabled: locked || filled,
					onClick: () => onPlay(index),
					className: cn("xo-cell relative flex items-center justify-center rounded-md bg-surface", filled ? "cursor-default" : "hover:bg-surface-2", lastMove === index && "xo-cell-last", isWin && "xo-cell-win"),
					children: value === "X" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MarkX, {}) : value === "O" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MarkO, {}) : null
				}, index);
			})
		}), winPath ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
			className: "pointer-events-none absolute inset-0 size-full",
			"aria-hidden": "true",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
				className: "xo-win-line",
				x1: winPath.x1,
				y1: winPath.y1,
				x2: winPath.x2,
				y2: winPath.y2
			})
		}) : null]
	});
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors transition-transform duration-150 ease-out select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-40 active:scale-95", {
	variants: {
		variant: {
			default: "bg-accent text-accent-fg hover:bg-accent/90",
			outline: "border border-border bg-transparent text-foreground hover:border-border-strong hover:bg-surface",
			ghost: "text-muted hover:bg-surface hover:text-foreground",
			subtle: "bg-surface text-foreground hover:bg-surface-2"
		},
		size: {
			default: "h-11 px-5",
			sm: "h-9 px-3 text-xs",
			lg: "h-12 px-6 text-base",
			icon: "size-11"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
function Button({ className, variant, size, asChild = false, type, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size
		}), className),
		type: asChild ? void 0 : type ?? "button",
		...props
	});
}
function randomOf(items) {
	return items[Math.floor(Math.random() * items.length)];
}
function winningMove(board, mark) {
	for (const index of emptyCells(board)) if (getOutcome(applyMove(board, index, mark)) === mark) return index;
	return null;
}
function pickEasy(board, ai, empties) {
	if (Math.random() < .45) {
		const win = winningMove(board, ai);
		if (win != null) return win;
	}
	if (Math.random() < .2) {
		const block = winningMove(board, other(ai));
		if (block != null) return block;
	}
	return randomOf(empties);
}
function pickMedium(board, ai, empties) {
	const win = winningMove(board, ai);
	if (win != null) return win;
	const block = winningMove(board, other(ai));
	if (block != null && Math.random() < .82) return block;
	if (board[4] === null && Math.random() < .7) return 4;
	const corners = [
		0,
		2,
		6,
		8
	].filter((i) => board[i] === null);
	if (corners.length && Math.random() < .65) return randomOf(corners);
	return randomOf(empties);
}
function minimax(board, toMove, ai, depth, alpha, beta) {
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
function pickHard(board, ai, empties) {
	const mutable = board.slice();
	let bestScore = -Infinity;
	const bestMoves = [];
	for (const index of empties) {
		mutable[index] = ai;
		const score = minimax(mutable, other(ai), ai, 1, -Infinity, Infinity);
		mutable[index] = null;
		if (score > bestScore) {
			bestScore = score;
			bestMoves.length = 0;
			bestMoves.push(index);
		} else if (score === bestScore) bestMoves.push(index);
	}
	return randomOf(bestMoves);
}
function pickAiMove(board, ai, difficulty) {
	const empties = emptyCells(board);
	if (empties.length === 0) return -1;
	if (difficulty === "easy") return pickEasy(board, ai, empties);
	if (difficulty === "medium") return pickMedium(board, ai, empties);
	return pickHard(board, ai, empties);
}
var ctx = null;
var master = null;
var muted = false;
function getCtx() {
	if (typeof window === "undefined") return null;
	if (ctx) return ctx;
	const Ctor = window.AudioContext || window.webkitAudioContext;
	if (!Ctor) return null;
	ctx = new Ctor({ latencyHint: "interactive" });
	master = ctx.createGain();
	master.gain.value = muted ? 0 : .18;
	master.connect(ctx.destination);
	return ctx;
}
function setMuted(next) {
	muted = next;
	if (master && ctx) master.gain.setTargetAtTime(next ? 0 : .18, ctx.currentTime, .02);
}
function unlockAudio() {
	const audio = getCtx();
	if (!audio) return;
	if (audio.state === "suspended") audio.resume();
}
function tone(freq, duration, type, when = 0, gain = 1) {
	const audio = getCtx();
	if (!audio || !master || muted) return;
	const t = audio.currentTime + when;
	const osc = audio.createOscillator();
	const g = audio.createGain();
	const rate = 1 + (Math.random() * 2 - 1) * .04;
	osc.type = type;
	osc.frequency.setValueAtTime(freq * rate, t);
	g.gain.setValueAtTime(1e-4, t);
	g.gain.exponentialRampToValueAtTime(.22 * gain, t + .012);
	g.gain.exponentialRampToValueAtTime(1e-4, t + duration);
	osc.connect(g);
	g.connect(master);
	osc.start(t);
	osc.stop(t + duration + .02);
	osc.onended = () => {
		osc.disconnect();
		g.disconnect();
	};
}
function playPlace(mark) {
	if (mark === "X") {
		tone(540, .09, "sine", 0, .9);
		tone(810, .06, "triangle", .02, .35);
	} else {
		tone(360, .11, "sine", 0, .95);
		tone(540, .07, "triangle", .03, .3);
	}
}
function playWin() {
	tone(523, .12, "sine", 0, .8);
	tone(659, .14, "sine", .1, .85);
	tone(784, .22, "triangle", .2, .9);
}
function playLoss() {
	tone(220, .18, "sine", 0, .9);
	tone(164, .28, "triangle", .12, .7);
}
function playDraw() {
	tone(392, .12, "sine", 0, .7);
	tone(330, .18, "sine", .12, .7);
}
function playUi() {
	tone(660, .05, "sine", 0, .45);
}
var STORAGE_KEY = "xo-arena-v1";
var defaultAi = {
	human: 0,
	ai: 0,
	draws: 0
};
var defaultLocal = {
	x: 0,
	o: 0,
	draws: 0
};
function persist(partial) {
	if (typeof window === "undefined") return;
	try {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(partial));
	} catch {}
}
function snapshot(state) {
	return {
		scoresAi: state.scoresAi,
		scoresLocal: state.scoresLocal,
		muted: state.muted,
		lastSetup: {
			mode: state.mode,
			difficulty: state.difficulty,
			side: state.side
		}
	};
}
function pickHumanMark(side, previous) {
	if (side === "X" || side === "O") return side;
	if (previous) return other(previous);
	return Math.random() < .5 ? "X" : "O";
}
function nextAiScores(scores, outcome, humanMark) {
	if (outcome === "draw") return {
		...scores,
		draws: scores.draws + 1
	};
	if (outcome === humanMark) return {
		...scores,
		human: scores.human + 1
	};
	return {
		...scores,
		ai: scores.ai + 1
	};
}
function nextLocalScores(scores, outcome) {
	if (outcome === "draw") return {
		...scores,
		draws: scores.draws + 1
	};
	if (outcome === "X") return {
		...scores,
		x: scores.x + 1
	};
	return {
		...scores,
		o: scores.o + 1
	};
}
function freshBoard(humanMark) {
	return {
		phase: "playing",
		humanMark,
		board: emptyBoard(),
		turn: "X",
		winner: null,
		winningLine: null,
		lastMove: null
	};
}
var useGame = create((set, get) => ({
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
			const data = JSON.parse(raw);
			const mutedPref = Boolean(data.muted);
			setMuted(mutedPref);
			set({
				scoresAi: data.scoresAi ?? defaultAi,
				scoresLocal: data.scoresLocal ?? defaultLocal,
				muted: mutedPref,
				mode: data.lastSetup?.mode ?? "ai",
				difficulty: data.lastSetup?.difficulty ?? "medium",
				side: data.lastSetup?.side ?? "mix"
			});
		} catch {}
	},
	setMutedPref: (next) => {
		setMuted(next);
		set({ muted: next });
		persist(snapshot({
			...get(),
			muted: next
		}));
	},
	startMatch: ({ mode, difficulty, side }) => {
		playUi();
		set({
			mode,
			difficulty,
			side,
			...freshBoard(pickHumanMark(side))
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
			const scoresAi = s.mode === "ai" ? nextAiScores(s.scoresAi, outcome, s.humanMark) : s.scoresAi;
			const scoresLocal = s.mode === "local" ? nextLocalScores(s.scoresLocal, outcome) : s.scoresLocal;
			if (outcome === "draw") playDraw();
			else if (s.mode === "ai") {
				if (outcome === s.humanMark) playWin();
				else playLoss();
			} else playWin();
			const next = {
				...s,
				board,
				lastMove: index,
				phase: "over",
				winner: outcome,
				winningLine: win?.line ?? null,
				scoresAi,
				scoresLocal
			};
			set(next);
			persist(snapshot(next));
			return;
		}
		set({
			board,
			lastMove: index,
			turn: other(s.turn)
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
			lastMove: null
		});
	},
	resetScores: () => {
		const next = {
			...get(),
			scoresAi: defaultAi,
			scoresLocal: defaultLocal
		};
		set({
			scoresAi: defaultAi,
			scoresLocal: defaultLocal
		});
		persist(snapshot(next));
	}
}));
function GameScreen() {
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
	(0, import_react.useEffect)(() => {
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
	(0, import_react.useEffect)(() => {
		if (locked) return;
		const onKey = (event) => {
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
		winner
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-1 flex-col gap-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex items-start justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "font-display text-3xl leading-none tracking-tight",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-mark-x",
						children: "X"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-mark-o",
						children: "O"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-2xs tracking-kicker text-muted uppercase",
					children: mode === "ai" ? difficultyLabel(difficulty) : "Two players"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "icon",
						"aria-label": muted ? "Unmute" : "Mute",
						onClick: () => setMutedPref(!muted),
						children: muted ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VolumeX, {
							className: "size-4",
							strokeWidth: 1.75
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, {
							className: "size-4",
							strokeWidth: 1.75
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "icon",
						"aria-label": "Back to setup",
						onClick: backToSetup,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings2, {
							className: "size-4",
							strokeWidth: 1.75
						})
					})]
				})]
			}),
			mode === "ai" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-3 gap-3 rounded-xl border border-border bg-surface px-4 py-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScoreStat, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, {
							className: "size-3.5",
							strokeWidth: 1.75
						}),
						label: `You · ${humanMark}`,
						value: scoresAi.human,
						align: "start"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScoreStat, {
						label: "Draw",
						value: scoresAi.draws,
						align: "center"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScoreStat, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bot, {
							className: "size-3.5",
							strokeWidth: 1.75
						}),
						label: `AI · ${other(humanMark)}`,
						value: scoresAi.ai,
						align: "end"
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-3 gap-3 rounded-xl border border-border bg-surface px-4 py-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScoreStat, {
						label: "X",
						value: scoresLocal.x,
						align: "start"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScoreStat, {
						label: "Draw",
						value: scoresLocal.draws,
						align: "center"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScoreStat, {
						label: "O",
						value: scoresLocal.o,
						align: "end"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: cn("min-h-6 text-sm text-muted", aiTurn && "xo-shimmer text-foreground"),
				"data-testid": "status",
				"aria-live": "polite",
				children: status
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Board, {
				board,
				winningLine,
				lastMove,
				locked,
				winner,
				onPlay: playCell
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-col gap-3 pt-2",
				children: phase === "over" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					"data-testid": "play-again",
					size: "lg",
					className: "w-full",
					onClick: playAgain,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, {
						className: "size-4",
						strokeWidth: 1.75
					}), "Next round"]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline",
					className: "w-full",
					onClick: restartRound,
					"data-testid": "restart",
					children: "Restart round"
				})
			})
		]
	});
}
function ScoreStat({ label, value, icon, align }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("flex flex-col gap-1", align === "center" && "items-center text-center", align === "end" && "items-end text-right"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "flex items-center gap-1 text-2xs tracking-kicker text-muted uppercase",
			children: [icon, label]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "font-display text-2xl leading-none tabular-nums text-foreground",
			children: value
		})]
	});
}
function difficultyLabel(d) {
	if (d === "easy") return "Casual AI";
	if (d === "medium") return "Sharp AI";
	return "Perfect AI";
}
function statusCopy({ phase, mode, turn, humanMark, aiTurn, winner }) {
	if (phase === "over") {
		if (winner === "draw") return "Draw. Board is full.";
		if (mode === "ai") return winner === humanMark ? "You win this round." : "AI takes the round.";
		return `${winner} wins this round.`;
	}
	if (aiTurn) return `AI is thinking · you are ${humanMark}`;
	if (mode === "ai") return `Your move · you are ${humanMark}`;
	return `${turn} to move`;
}
var MODES = [{
	value: "ai",
	label: "You vs AI",
	icon: Bot
}, {
	value: "local",
	label: "Two players",
	icon: Users
}];
var SIDES = [
	{
		value: "X",
		label: "Play X"
	},
	{
		value: "O",
		label: "Play O"
	},
	{
		value: "mix",
		label: "Mix"
	}
];
var DIFFICULTIES = [
	{
		value: "easy",
		label: "Casual"
	},
	{
		value: "medium",
		label: "Sharp"
	},
	{
		value: "hard",
		label: "Perfect"
	}
];
function SetupScreen() {
	const storedMode = useGame((s) => s.mode);
	const storedSide = useGame((s) => s.side);
	const storedDifficulty = useGame((s) => s.difficulty);
	const scores = useGame((s) => s.scoresAi);
	const startMatch = useGame((s) => s.startMatch);
	const resetScores = useGame((s) => s.resetScores);
	const [mode, setMode] = (0, import_react.useState)(storedMode);
	const [side, setSide] = (0, import_react.useState)(storedSide);
	const [difficulty, setDifficulty] = (0, import_react.useState)(storedDifficulty);
	(0, import_react.useEffect)(() => {
		setMode(storedMode);
		setSide(storedSide);
		setDifficulty(storedDifficulty);
	}, [
		storedMode,
		storedSide,
		storedDifficulty
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-1 flex-col justify-center gap-8 py-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex flex-col gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-2xs font-medium tracking-kicker text-muted uppercase",
						children: "Noughts and crosses"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
						className: "font-display text-6xl leading-none tracking-tight text-foreground sm:text-7xl",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-mark-x",
							children: "X"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-mark-o",
							children: "O"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "max-w-sm text-base leading-relaxed text-muted",
						children: "Pick a mark. The other side is the AI. Mix swaps X and O every round so you play both."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-6 text-sm tabular-nums text-muted",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScoreChip, {
						label: "You",
						value: scores.human
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScoreChip, {
						label: "Draw",
						value: scores.draws
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScoreChip, {
						label: "AI",
						value: scores.ai
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChoiceRow, {
						label: "Match",
						cols: 2,
						children: MODES.map((opt) => {
							const Icon = opt.icon;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ChoiceButton, {
								active: mode === opt.value,
								onClick: () => setMode(opt.value),
								testId: `mode-${opt.value}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
									className: "size-4",
									strokeWidth: 1.75
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: opt.label })]
							}, opt.value);
						})
					}),
					mode === "ai" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChoiceRow, {
						label: "Your mark",
						children: SIDES.map((opt) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ChoiceButton, {
							active: side === opt.value,
							onClick: () => setSide(opt.value),
							testId: `side-${opt.value}`,
							children: [opt.value === "mix" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shuffle, {
								className: "size-3.5",
								strokeWidth: 1.75
							}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: opt.label })]
						}, opt.value))
					}) : null,
					mode === "ai" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChoiceRow, {
						label: "AI",
						children: DIFFICULTIES.map((opt) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChoiceButton, {
							active: difficulty === opt.value,
							onClick: () => setDifficulty(opt.value),
							testId: `diff-${opt.value}`,
							children: opt.label
						}, opt.value))
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs leading-relaxed text-subtle",
						children: mode === "ai" ? side === "mix" ? "Each new round you take the other mark. X still always moves first." : side === "O" ? "You play O. The AI opens as X." : "You play X and open the board." : "Sit together. X opens, then O. Same board, no AI."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					"data-testid": "play",
					size: "lg",
					className: "w-full",
					onClick: () => {
						unlockAudio();
						startMatch({
							mode,
							difficulty,
							side
						});
					},
					children: "Play"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					size: "sm",
					onClick: resetScores,
					children: "Reset scores"
				})]
			})
		]
	});
}
function ScoreChip({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-1",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-2xs tracking-kicker uppercase",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "font-display text-2xl leading-none text-foreground",
			children: value
		})]
	});
}
function ChoiceRow({ label, children, cols = 3 }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-2xs font-medium tracking-kicker text-muted uppercase",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: cn("grid gap-2", cols === 2 ? "grid-cols-2" : "grid-cols-3"),
			children
		})]
	});
}
function ChoiceButton({ active, onClick, children, testId }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		"data-testid": testId,
		onClick,
		className: cn("flex h-11 items-center justify-center gap-1.5 rounded-md border px-2 text-sm font-medium transition-colors duration-150", active ? "border-accent bg-accent text-accent-fg" : "border-border bg-surface text-foreground hover:border-border-strong"),
		children
	});
}
function XOApp() {
	const phase = useGame((s) => s.phase);
	(0, import_react.useEffect)(() => {
		useGame.getState().hydrate();
	}, []);
	(0, import_react.useEffect)(() => {
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative flex min-h-dvh justify-center overflow-x-hidden bg-background text-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "xo-vignette pointer-events-none",
			"aria-hidden": "true"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
			className: "xo-shell relative flex min-h-dvh w-full max-w-lg flex-col px-4 sm:py-10",
			children: phase === "setup" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SetupScreen, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GameScreen, {})
		})]
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(XOApp, {});
}
//#endregion
export { Home as component };
