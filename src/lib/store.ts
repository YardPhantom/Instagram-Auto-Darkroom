import { create } from "zustand";
import { persist } from "zustand/middleware";
import { DEMO_HISTORY, DEMO_QUEUE } from "./demo-data";
import { dayKey, formatClockTime, inQuietHours, planRandomSlots } from "./utils";
import {
  DEFAULT_SETTINGS,
  type AppView,
  type HistoryItem,
  type QueueItem,
  type Settings,
} from "./types";

type Store = {
  settings: Settings;
  queue: QueueItem[];
  history: HistoryItem[];
  view: AppView;
  selectedId: string | null;
  postingId: string | null;
  nextPostAt: number | null;
  schedule: number[];
  scheduleDay: string | null;
  now: number;
  notice: string | null;
  setView: (view: AppView) => void;
  select: (id: string | null) => void;
  patchSettings: (patch: Partial<Settings>) => void;
  setCaption: (id: string, caption: string) => void;
  setFirstComment: (id: string, firstComment: string) => void;
  login: () => string | null;
  logout: () => void;
  toggleAuto: () => string | null;
  postItem: (id: string) => Promise<string | null>;
  skipItem: (id: string) => string | null;
  postNext: () => Promise<string | null>;
  tick: (now?: number) => void;
  restoreDemo: () => void;
};

function nextReady(queue: QueueItem[], skipWithoutCaption: boolean) {
  return queue.find((item) => {
    if (item.status === "posting" || item.status === "error") return false;
    if (item.status === "needs_caption" || !item.caption.trim()) {
      return !skipWithoutCaption;
    }
    return item.status === "ready";
  });
}

function buildSchedule(settings: Settings, now = Date.now()) {
  const slots = planRandomSlots({
    now: new Date(now),
    quietOn: settings.quietHoursOn,
    quietStart: settings.quietStart,
    quietEnd: settings.quietEnd,
    minPosts: settings.postsPerDayMin,
    maxPosts: settings.postsPerDayMax,
  });
  return {
    schedule: slots,
    scheduleDay: dayKey(new Date(now)),
    nextPostAt: slots[0] ?? null,
  };
}

function migrateSettings(raw: Partial<Settings> | undefined): Settings {
  const merged = { ...DEFAULT_SETTINGS, ...raw };
  return {
    ...merged,
    username: merged.username?.trim() || "Lookinggoodmodel",
    postsPerDayMin: Math.max(1, Math.min(3, merged.postsPerDayMin || 1)),
    postsPerDayMax: Math.max(1, Math.min(3, merged.postsPerDayMax || 3)),
  };
}

export const useDarkroom = create<Store>()(
  persist(
    (set, get) => ({
      settings: DEFAULT_SETTINGS,
      queue: DEMO_QUEUE,
      history: DEMO_HISTORY,
      view: "queue",
      selectedId: DEMO_QUEUE[0]?.id ?? null,
      postingId: null,
      nextPostAt: null,
      schedule: [],
      scheduleDay: null,
      now: Date.now(),
      notice: null,
      setView: (view) => set({ view }),
      select: (id) => set({ selectedId: id }),
      patchSettings: (patch) => {
        const settings = { ...get().settings, ...patch };
        const timingChanged =
          "quietHoursOn" in patch ||
          "quietStart" in patch ||
          "quietEnd" in patch ||
          "postsPerDayMin" in patch ||
          "postsPerDayMax" in patch;
        if (settings.autoPost && timingChanged) {
          const planned = buildSchedule(settings);
          const times = planned.schedule.map(formatClockTime).join(", ");
          set({
            settings,
            ...planned,
            notice: times
              ? `Schedule rebuilt: ${planned.schedule.length} post${planned.schedule.length === 1 ? "" : "s"} — ${times}.`
              : "No open window left today. The next roll happens after quiet hours.",
          });
          return;
        }
        set({ settings });
      },
      setCaption: (id, caption) =>
        set((s) => ({
          queue: s.queue.map((item) =>
            item.id === id
              ? {
                  ...item,
                  caption,
                  status: caption.trim() ? "ready" : "needs_caption",
                  error: null,
                  annotationFile:
                    item.annotationFile ??
                    `${item.filename.replace(/\.[^.]+$/, "")}.txt`,
                }
              : item,
          ),
        })),
      setFirstComment: (id, firstComment) =>
        set((s) => ({
          queue: s.queue.map((item) =>
            item.id === id ? { ...item, firstComment } : item,
          ),
        })),
      login: () => {
        const { username, password } = get().settings;
        if (!username.trim() || !password.trim()) {
          return "Enter an Instagram username and password first.";
        }
        set((s) => ({
          settings: { ...s.settings, loggedIn: true },
          notice: `Session saved for @${username.trim()}`,
        }));
        return null;
      },
      logout: () =>
        set((s) => ({
          settings: { ...s.settings, autoPost: false, loggedIn: false },
          nextPostAt: null,
          schedule: [],
          notice: "Session cleared.",
        })),
      toggleAuto: () => {
        const { settings } = get();
        if (settings.autoPost) {
          set((s) => ({
            settings: { ...s.settings, autoPost: false },
            nextPostAt: null,
            notice: "Auto-post paused.",
          }));
          return null;
        }
        if (!settings.loggedIn) {
          return "Sign in to Instagram before starting the press.";
        }
        const planned = buildSchedule(settings);
        const times = planned.schedule.map(formatClockTime).join(", ");
        set((s) => ({
          settings: { ...s.settings, autoPost: true },
          ...planned,
          notice: times
            ? `Live. ${planned.schedule.length} post${planned.schedule.length === 1 ? "" : "s"} today at ${times}.`
            : "Live, but the window is closed. Next roll is after quiet hours.",
        }));
        return null;
      },
      postItem: async (id) => {
        const state = get();
        if (state.postingId) return "Already posting a frame.";
        if (!state.settings.loggedIn) {
          return "Sign in to Instagram before posting.";
        }
        const item = state.queue.find((q) => q.id === id);
        if (!item) return "That file is no longer in the tray.";
        if (!item.caption.trim() && state.settings.skipWithoutCaption) {
          return "Write a caption, or turn off “hold frames without annotation.”";
        }
        set({
          postingId: id,
          queue: state.queue.map((q) =>
            q.id === id ? { ...q, status: "posting", error: null } : q,
          ),
        });
        await new Promise((r) => setTimeout(r, 1600));
        const after = get();
        const current = after.queue.find((q) => q.id === id);
        if (!current) {
          set({ postingId: null });
          return "File disappeared mid-post.";
        }
        const done: HistoryItem = {
          id: `h-${current.id}-${Date.now()}`,
          filename: current.filename,
          kind: current.kind,
          caption: current.caption,
          thumb: current.thumb,
          finishedAt: new Date().toISOString(),
          destination: "posted",
        };
        const remaining = after.queue.filter((q) => q.id !== id);
        const leftover = after.schedule.filter((ts) => ts > Date.now());
        set({
          postingId: null,
          queue: remaining,
          history: [done, ...after.history],
          selectedId: remaining[0]?.id ?? null,
          schedule: leftover,
          nextPostAt: after.settings.autoPost ? leftover[0] ?? null : after.nextPostAt,
          notice: `Posted ${current.filename} and moved it to done.`,
        });
        return null;
      },
      skipItem: (id) => {
        const state = get();
        const item = state.queue.find((q) => q.id === id);
        if (!item) return "Already gone.";
        const done: HistoryItem = {
          id: `h-${item.id}-${Date.now()}`,
          filename: item.filename,
          kind: item.kind,
          caption: item.caption,
          thumb: item.thumb,
          finishedAt: new Date().toISOString(),
          destination: "skipped",
        };
        const remaining = state.queue.filter((q) => q.id !== id);
        set({
          queue: remaining,
          history: [done, ...state.history],
          selectedId: remaining[0]?.id ?? null,
          notice: `Moved ${item.filename} to done without posting.`,
        });
        return null;
      },
      postNext: async () => {
        const { queue, settings } = get();
        const item = nextReady(queue, settings.skipWithoutCaption);
        if (!item) return "Nothing ready to post. Add a caption or drop more files.";
        return get().postItem(item.id);
      },
      tick: (now = Date.now()) => {
        const state = get();
        if (state.now === now) return;
        set({ now });
        if (!state.settings.autoPost || state.postingId) return;
        if (!state.settings.loggedIn) return;
        const today = dayKey(new Date(now));
        if (state.scheduleDay !== today || state.schedule.length === 0) {
          const planned = buildSchedule(state.settings, now);
          set({
            ...planned,
            notice:
              planned.schedule.length > 0
                ? `Today’s press: ${planned.schedule.length} post${planned.schedule.length === 1 ? "" : "s"} at ${planned.schedule.map(formatClockTime).join(", ")}.`
                : null,
          });
          return;
        }
        if (
          state.settings.quietHoursOn &&
          inQuietHours(new Date(now), state.settings.quietStart, state.settings.quietEnd)
        ) {
          return;
        }
        if (state.nextPostAt && now >= state.nextPostAt) {
          void get().postNext();
        }
      },
      restoreDemo: () =>
        set({
          queue: DEMO_QUEUE,
          history: DEMO_HISTORY,
          selectedId: DEMO_QUEUE[0]?.id ?? null,
          postingId: null,
          nextPostAt: null,
          schedule: [],
          scheduleDay: null,
          notice: "Sample tray restored. Nothing was sent to Instagram.",
          settings: { ...get().settings, autoPost: false },
        }),
    }),
    {
      name: "darkroom-studio",
      skipHydration: true,
      partialize: (s) => ({
        settings: s.settings,
        queue: s.queue,
        history: s.history,
        view: s.view,
        selectedId: s.selectedId,
        schedule: s.schedule,
        scheduleDay: s.scheduleDay,
        nextPostAt: s.nextPostAt,
      }),
      merge: (persisted, current) => {
        const p = (persisted ?? {}) as Partial<Store>;
        return {
          ...current,
          ...p,
          settings: migrateSettings(p.settings),
        };
      },
    },
  ),
);
