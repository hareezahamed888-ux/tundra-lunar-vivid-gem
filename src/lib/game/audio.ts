type AudioWindow = Window & { webkitAudioContext?: typeof AudioContext };

let ctx: AudioContext | null = null;
let master: GainNode | null = null;
let muted = false;

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (ctx) return ctx;
  const Ctor =
    window.AudioContext || (window as AudioWindow).webkitAudioContext;
  if (!Ctor) return null;
  ctx = new Ctor({ latencyHint: "interactive" });
  master = ctx.createGain();
  master.gain.value = muted ? 0 : 0.18;
  master.connect(ctx.destination);
  return ctx;
}

export function setMuted(next: boolean) {
  muted = next;
  if (master && ctx) {
    master.gain.setTargetAtTime(next ? 0 : 0.18, ctx.currentTime, 0.02);
  }
}

export function unlockAudio() {
  const audio = getCtx();
  if (!audio) return;
  if (audio.state === "suspended") void audio.resume();
}

function tone(
  freq: number,
  duration: number,
  type: OscillatorType,
  when = 0,
  gain = 1,
) {
  const audio = getCtx();
  if (!audio || !master || muted) return;
  const t = audio.currentTime + when;
  const osc = audio.createOscillator();
  const g = audio.createGain();
  const rate = 1 + (Math.random() * 2 - 1) * 0.04;
  osc.type = type;
  osc.frequency.setValueAtTime(freq * rate, t);
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(0.22 * gain, t + 0.012);
  g.gain.exponentialRampToValueAtTime(0.0001, t + duration);
  osc.connect(g);
  g.connect(master);
  osc.start(t);
  osc.stop(t + duration + 0.02);
  osc.onended = () => {
    osc.disconnect();
    g.disconnect();
  };
}

export function playPlace(mark: "X" | "O") {
  if (mark === "X") {
    tone(540, 0.09, "sine", 0, 0.9);
    tone(810, 0.06, "triangle", 0.02, 0.35);
  } else {
    tone(360, 0.11, "sine", 0, 0.95);
    tone(540, 0.07, "triangle", 0.03, 0.3);
  }
}

export function playWin() {
  tone(523, 0.12, "sine", 0, 0.8);
  tone(659, 0.14, "sine", 0.1, 0.85);
  tone(784, 0.22, "triangle", 0.2, 0.9);
}

export function playLoss() {
  tone(220, 0.18, "sine", 0, 0.9);
  tone(164, 0.28, "triangle", 0.12, 0.7);
}

export function playDraw() {
  tone(392, 0.12, "sine", 0, 0.7);
  tone(330, 0.18, "sine", 0.12, 0.7);
}

export function playUi() {
  tone(660, 0.05, "sine", 0, 0.45);
}
