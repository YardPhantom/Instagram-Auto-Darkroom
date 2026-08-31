export type MediaKind = "photo" | "video";
export type QueueStatus = "ready" | "needs_caption" | "posting" | "error";
export type HistoryKind = "posted" | "skipped";
export type AppView = "queue" | "done" | "settings" | "server";

export type QueueItem = {
  id: string;
  filename: string;
  annotationFile: string | null;
  kind: MediaKind;
  caption: string;
  firstComment: string;
  thumb: string;
  bytes: number;
  addedAt: string;
  status: QueueStatus;
  error: string | null;
};

export type HistoryItem = {
  id: string;
  filename: string;
  kind: MediaKind;
  caption: string;
  thumb: string;
  finishedAt: string;
  destination: HistoryKind;
};

export type Settings = {
  watchFolder: string;
  doneFolder: string;
  username: string;
  password: string;
  loggedIn: boolean;
  autoPost: boolean;
  postsPerDayMin: number;
  postsPerDayMax: number;
  quietStart: string;
  quietEnd: string;
  quietHoursOn: boolean;
  videosAsReels: boolean;
  alsoFirstComment: boolean;
  skipWithoutCaption: boolean;
};

export const DEFAULT_SETTINGS: Settings = {
  watchFolder: "C:\\projects\\InstagramAuto",
  doneFolder: "C:\\projects\\InstagramAuto\\done",
  username: "Lookinggoodmodel",
  password: "",
  loggedIn: false,
  autoPost: false,
  postsPerDayMin: 1,
  postsPerDayMax: 3,
  quietStart: "23:00",
  quietEnd: "07:30",
  quietHoursOn: true,
  videosAsReels: true,
  alsoFirstComment: false,
  skipWithoutCaption: true,
};
