const audioCtx = () => new (window.AudioContext || (window as any).webkitAudioContext)();

let ctx: AudioContext | null = null;

function getCtx(): AudioContext {
  if (!ctx) ctx = audioCtx();
  return ctx;
}

function playTone(freq: number, duration: number, type: OscillatorType = 'sine', gain = 0.12) {
  try {
    const c = getCtx();
    const osc = c.createOscillator();
    const g = c.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, c.currentTime);
    g.gain.setValueAtTime(gain, c.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + duration);
    osc.connect(g);
    g.connect(c.destination);
    osc.start();
    osc.stop(c.currentTime + duration);
  } catch {
    // Audio not supported — silently ignore
  }
}

export function playBuySound() {
  playTone(880, 0.08, 'sine', 0.1);
  setTimeout(() => playTone(1174, 0.12, 'sine', 0.1), 60);
}

export function playSellSound() {
  playTone(1174, 0.08, 'sine', 0.1);
  setTimeout(() => playTone(880, 0.12, 'sine', 0.1), 60);
}

export function playErrorSound() {
  playTone(220, 0.15, 'square', 0.06);
}
