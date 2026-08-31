import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function formatClock(totalSeconds: number) {
  const s = Math.max(0, Math.floor(totalSeconds));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  if (h > 0) {
    return `${h}:${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  }
  return `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
}

export function formatClockTime(ts: number) {
  return new Date(ts).toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });
}

export function inQuietHours(now: Date, start: string, end: string) {
  const [sh, sm] = start.split(":").map(Number);
  const [eh, em] = end.split(":").map(Number);
  const cur = now.getHours() * 60 + now.getMinutes();
  const a = sh * 60 + sm;
  const b = eh * 60 + em;
  if (a === b) return false;
  if (a < b) return cur >= a && cur < b;
  return cur >= a || cur < b;
}

export function dayKey(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

const GAP_MS = 90 * 60 * 1000;
const STEP_MS = 5 * 60 * 1000;

export function planRandomSlots(opts: {
  now: Date;
  quietOn: boolean;
  quietStart: string;
  quietEnd: string;
  minPosts: number;
  maxPosts: number;
}) {
  const minPosts = Math.max(1, Math.min(3, opts.minPosts));
  const maxPosts = Math.max(minPosts, Math.min(3, opts.maxPosts));
  const count = minPosts + Math.floor(Math.random() * (maxPosts - minPosts + 1));

  const today = collectWindow(opts.now, opts.now, 1, opts);
  const todayPicked = pickSpaced(today, Math.min(count, capacity(today)), GAP_MS);
  if (todayPicked.length > 0) return todayPicked.sort((a, b) => a - b);

  const tomorrowStart = new Date(opts.now);
  tomorrowStart.setDate(tomorrowStart.getDate() + 1);
  tomorrowStart.setHours(0, 0, 0, 0);
  const tomorrow = collectWindow(tomorrowStart, tomorrowStart, 1, opts);
  return pickSpaced(tomorrow, count, GAP_MS).sort((a, b) => a - b);
}

function collectWindow(
  from: Date,
  dayAnchor: Date,
  days: number,
  opts: { quietOn: boolean; quietStart: string; quietEnd: string },
) {
  const startOfDay = new Date(dayAnchor);
  startOfDay.setHours(0, 0, 0, 0);
  const end = startOfDay.getTime() + days * 24 * 60 * 60 * 1000;
  const begin = Math.max(from.getTime() + 60 * 1000, startOfDay.getTime());
  const out: number[] = [];
  for (let ts = Math.ceil(begin / STEP_MS) * STEP_MS; ts < end; ts += STEP_MS) {
    const d = new Date(ts);
    if (opts.quietOn && inQuietHours(d, opts.quietStart, opts.quietEnd)) continue;
    out.push(ts);
  }
  return out;
}

function capacity(candidates: number[]) {
  if (candidates.length === 0) return 0;
  const span = candidates[candidates.length - 1] - candidates[0];
  return Math.max(1, Math.floor(span / GAP_MS) + 1);
}

function pickSpaced(candidates: number[], count: number, gap: number) {
  if (count <= 0 || candidates.length === 0) return [];
  const pool = [...candidates];
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = pool[i];
    pool[i] = pool[j];
    pool[j] = tmp;
  }
  const picked: number[] = [];
  for (const ts of pool) {
    if (picked.length >= count) break;
    if (picked.every((p) => Math.abs(p - ts) >= gap)) picked.push(ts);
  }
  if (picked.length < count) {
    for (const ts of candidates) {
      if (picked.length >= count) break;
      if (picked.every((p) => Math.abs(p - ts) >= gap)) picked.push(ts);
    }
  }
  return picked;
}
