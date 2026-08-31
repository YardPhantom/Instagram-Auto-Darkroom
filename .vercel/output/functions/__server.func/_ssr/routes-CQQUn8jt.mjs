import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as Send, c as Images, d as Download, f as Copy, i as Server, l as Image, m as Check, n as SkipForward, o as Play, p as Clapperboard, r as Settings2, s as Pause, u as FolderInput } from "../_libs/lucide-react.mjs";
import { r as Slot, t as Root } from "../_libs/@radix-ui/react-label+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { n as create, t as persist } from "../_libs/zustand.mjs";
import { n as SwitchThumb, t as Switch$1 } from "../_libs/@radix-ui/react-switch+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-CQQUn8jt.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function formatBytes(bytes) {
	if (bytes < 1024) return `${bytes} B`;
	if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
	return `${(bytes / 1048576).toFixed(1)} MB`;
}
function formatClock(totalSeconds) {
	const s = Math.max(0, Math.floor(totalSeconds));
	const h = Math.floor(s / 3600);
	const m = Math.floor(s % 3600 / 60);
	const sec = s % 60;
	if (h > 0) return `${h}:${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
	return `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
}
function inQuietHours(now, start, end) {
	const [sh, sm] = start.split(":").map(Number);
	const [eh, em] = end.split(":").map(Number);
	const cur = now.getHours() * 60 + now.getMinutes();
	const a = sh * 60 + sm;
	const b = eh * 60 + em;
	if (a === b) return false;
	if (a < b) return cur >= a && cur < b;
	return cur >= a || cur < b;
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[opacity,transform,background-color,color,box-shadow] duration-[var(--motion-quick)] ease-[var(--ease-out)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/70 disabled:pointer-events-none disabled:opacity-40 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:scale-[0.98]", {
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground hover:opacity-90",
			secondary: "bg-secondary text-secondary-foreground shadow-[var(--shadow-border)] hover:bg-accent",
			ghost: "text-foreground hover:bg-accent",
			outline: "shadow-[var(--shadow-border)] bg-transparent hover:bg-accent",
			destructive: "bg-destructive text-destructive-foreground hover:opacity-90"
		},
		size: {
			default: "h-11 px-4",
			sm: "h-9 px-3 text-[0.8125rem]",
			lg: "h-12 px-5",
			icon: "size-11",
			"icon-sm": "size-9"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
var Button = import_react.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		ref,
		...props
	});
});
Button.displayName = "Button";
var DEMO_QUEUE = [
	{
		id: "q-salt",
		filename: "salt-air.jpg",
		annotationFile: "salt-air.txt",
		kind: "photo",
		caption: "Salt air, slow coffee. The kind of morning that does not need a plan.\n\n#pnw #film #coast",
		firstComment: "",
		thumb: "/samples/salt-air.jpg",
		bytes: 652601,
		addedAt: "2026-08-30T16:12:00.000Z",
		status: "ready",
		error: null
	},
	{
		id: "q-peaches",
		filename: "peaches.jpg",
		annotationFile: "peaches.txt",
		kind: "photo",
		caption: "In season and gone too fast.\n\n#stilllife #market",
		firstComment: "",
		thumb: "/samples/peaches.jpg",
		bytes: 605629,
		addedAt: "2026-08-30T16:18:00.000Z",
		status: "ready",
		error: null
	},
	{
		id: "q-window",
		filename: "window-light.mp4",
		annotationFile: "window-light.txt",
		kind: "video",
		caption: "North light, empty stool. Last week's session, held still.",
		firstComment: "Shot on a 35. Audio is the room.",
		thumb: "/samples/window-light.jpg",
		bytes: 18432e3,
		addedAt: "2026-08-30T17:02:00.000Z",
		status: "ready",
		error: null
	},
	{
		id: "q-train",
		filename: "last-train.jpg",
		annotationFile: "last-train.txt",
		kind: "photo",
		caption: "The last train home is always a little kinder than the first.",
		firstComment: "",
		thumb: "/samples/last-train.jpg",
		bytes: 752232,
		addedAt: "2026-08-30T18:44:00.000Z",
		status: "ready",
		error: null
	},
	{
		id: "q-pour",
		filename: "pour-over.jpg",
		annotationFile: "pour-over.txt",
		kind: "photo",
		caption: "Ritual before the day starts asking for things.",
		firstComment: "",
		thumb: "/samples/pour-over.jpg",
		bytes: 616155,
		addedAt: "2026-08-30T19:10:00.000Z",
		status: "ready",
		error: null
	},
	{
		id: "q-linen",
		filename: "linen-table.jpg",
		annotationFile: null,
		kind: "photo",
		caption: "",
		firstComment: "",
		thumb: "/samples/linen-table.jpg",
		bytes: 653192,
		addedAt: "2026-08-30T20:05:00.000Z",
		status: "needs_caption",
		error: null
	}
];
var DEMO_HISTORY = [{
	id: "h-highway",
	filename: "highway-dusk.jpg",
	kind: "photo",
	caption: "Nothing on the radio. Everything on the road.",
	thumb: "/samples/highway-dusk.jpg",
	finishedAt: "2026-08-29T22:14:00.000Z",
	destination: "posted"
}, {
	id: "h-cedar",
	filename: "cedar-path.jpg",
	kind: "photo",
	caption: "After the rain, the path remembers every step.",
	thumb: "/samples/cedar-path.jpg",
	finishedAt: "2026-08-28T19:40:00.000Z",
	destination: "posted"
}];
var DEFAULT_SETTINGS = {
	watchFolder: "C:\\projects\\InstagramAuto",
	doneFolder: "C:\\projects\\InstagramAuto\\done",
	username: "",
	password: "",
	loggedIn: false,
	autoPost: false,
	studioIntervalSec: 45,
	serverIntervalMin: 240,
	quietStart: "23:00",
	quietEnd: "07:30",
	quietHoursOn: true,
	videosAsReels: true,
	alsoFirstComment: false,
	skipWithoutCaption: true
};
function nextReady(queue, skipWithoutCaption) {
	return queue.find((item) => {
		if (item.status === "posting" || item.status === "error") return false;
		if (item.status === "needs_caption" || !item.caption.trim()) return !skipWithoutCaption;
		return item.status === "ready";
	});
}
var useDarkroom = create()(persist((set, get) => ({
	settings: DEFAULT_SETTINGS,
	queue: DEMO_QUEUE,
	history: DEMO_HISTORY,
	view: "queue",
	selectedId: DEMO_QUEUE[0]?.id ?? null,
	postingId: null,
	nextPostAt: null,
	now: Date.now(),
	notice: null,
	hydrated: false,
	setView: (view) => set({ view }),
	select: (id) => set({ selectedId: id }),
	patchSettings: (patch) => set((s) => ({ settings: {
		...s.settings,
		...patch
	} })),
	setCaption: (id, caption) => set((s) => ({ queue: s.queue.map((item) => item.id === id ? {
		...item,
		caption,
		status: caption.trim() ? "ready" : "needs_caption",
		error: null,
		annotationFile: item.annotationFile ?? `${item.filename.replace(/\.[^.]+$/, "")}.txt`
	} : item) })),
	setFirstComment: (id, firstComment) => set((s) => ({ queue: s.queue.map((item) => item.id === id ? {
		...item,
		firstComment
	} : item) })),
	login: () => {
		const { username, password } = get().settings;
		if (!username.trim() || !password.trim()) return "Enter an Instagram username and password first.";
		set((s) => ({
			settings: {
				...s.settings,
				loggedIn: true
			},
			notice: `Session saved for @${username.trim()}`
		}));
		return null;
	},
	logout: () => set((s) => ({
		settings: {
			...s.settings,
			loggedIn: false,
			autoPost: false
		},
		nextPostAt: null,
		notice: "Session cleared."
	})),
	toggleAuto: () => {
		const { settings, nextPostAt } = get();
		if (settings.autoPost) {
			set((s) => ({
				settings: {
					...s.settings,
					autoPost: false
				},
				nextPostAt: null,
				notice: "Auto-post paused."
			}));
			return null;
		}
		if (!settings.loggedIn) return "Sign in to Instagram before starting the press.";
		const start = nextPostAt ?? Date.now() + settings.studioIntervalSec * 1e3;
		set((s) => ({
			settings: {
				...s.settings,
				autoPost: true
			},
			nextPostAt: start,
			notice: "Auto-post is live. Next frame goes when the timer lands."
		}));
		return null;
	},
	postItem: async (id) => {
		const state = get();
		if (state.postingId) return "Already posting a frame.";
		if (!state.settings.loggedIn) return "Sign in to Instagram before posting.";
		const item = state.queue.find((q) => q.id === id);
		if (!item) return "That file is no longer in the tray.";
		if (!item.caption.trim() && state.settings.skipWithoutCaption) return "Write a caption, or turn off “hold frames without annotation.”";
		set({
			postingId: id,
			queue: state.queue.map((q) => q.id === id ? {
				...q,
				status: "posting",
				error: null
			} : q)
		});
		await new Promise((r) => setTimeout(r, 1600));
		const after = get();
		const current = after.queue.find((q) => q.id === id);
		if (!current) {
			set({ postingId: null });
			return "File disappeared mid-post.";
		}
		const done = {
			id: `h-${current.id}-${Date.now()}`,
			filename: current.filename,
			kind: current.kind,
			caption: current.caption,
			thumb: current.thumb,
			finishedAt: (/* @__PURE__ */ new Date()).toISOString(),
			destination: "posted"
		};
		const remaining = after.queue.filter((q) => q.id !== id);
		set({
			postingId: null,
			queue: remaining,
			history: [done, ...after.history],
			selectedId: remaining[0]?.id ?? null,
			nextPostAt: after.settings.autoPost ? Date.now() + after.settings.studioIntervalSec * 1e3 : after.nextPostAt,
			notice: `Posted ${current.filename} and moved it to done.`
		});
		return null;
	},
	skipItem: (id) => {
		const state = get();
		const item = state.queue.find((q) => q.id === id);
		if (!item) return "Already gone.";
		const done = {
			id: `h-${item.id}-${Date.now()}`,
			filename: item.filename,
			kind: item.kind,
			caption: item.caption,
			thumb: item.thumb,
			finishedAt: (/* @__PURE__ */ new Date()).toISOString(),
			destination: "skipped"
		};
		const remaining = state.queue.filter((q) => q.id !== id);
		set({
			queue: remaining,
			history: [done, ...state.history],
			selectedId: remaining[0]?.id ?? null,
			notice: `Moved ${item.filename} to done without posting.`
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
		if (state.settings.quietHoursOn && inQuietHours(new Date(now), state.settings.quietStart, state.settings.quietEnd)) return;
		if (state.nextPostAt && now >= state.nextPostAt) get().postNext();
	},
	restoreDemo: () => set({
		queue: DEMO_QUEUE,
		history: DEMO_HISTORY,
		selectedId: DEMO_QUEUE[0]?.id ?? null,
		postingId: null,
		nextPostAt: null,
		notice: "Sample tray restored. Nothing was sent to Instagram.",
		settings: {
			...get().settings,
			autoPost: false
		}
	}),
	setHydrated: () => set({ hydrated: true })
}), {
	name: "darkroom-studio",
	skipHydration: true,
	partialize: (s) => ({
		settings: s.settings,
		queue: s.queue,
		history: s.history,
		view: s.view,
		selectedId: s.selectedId
	})
}));
var STEPS = [
	{
		n: "01",
		title: "Unpack the worker",
		body: "Download the Windows package and extract it to C:\\projects\\Darkroom. Keep it out of the media inbox so Python files are never posted."
	},
	{
		n: "02",
		title: "Create the folders",
		body: "Confirm C:\\projects\\InstagramAuto exists, with a done folder inside it. Drop photos, videos, and matching .txt or .json annotation files in the inbox — never in done."
	},
	{
		n: "03",
		title: "Install the Python venv",
		body: "On the server, run setup.ps1 from the package. It creates .venv and installs FastAPI, uvicorn, instagrapi, and watchdog."
	},
	{
		n: "04",
		title: "Point IIS 10 at the package",
		body: "Install HttpPlatformHandler, create a site whose physical path is C:\\projects\\Darkroom, and leave web.config as shipped. The worker binds to the port IIS assigns."
	},
	{
		n: "05",
		title: "Sign in and start the press",
		body: "Open the site in a browser, enter Instagram credentials, press Start. After each successful post, the media file and its annotation move into done."
	}
];
function DeployPanel() {
	const settings = useDarkroom((s) => s.settings);
	const [copied, setCopied] = (0, import_react.useState)(null);
	const configPreview = (0, import_react.useMemo)(() => JSON.stringify({
		watch_folder: settings.watchFolder,
		done_folder: settings.doneFolder,
		interval_minutes: settings.serverIntervalMin,
		quiet_hours: settings.quietHoursOn,
		quiet_start: settings.quietStart,
		quiet_end: settings.quietEnd,
		videos_as_reels: settings.videosAsReels,
		also_first_comment: settings.alsoFirstComment,
		skip_without_caption: settings.skipWithoutCaption,
		instagram_username: settings.username || "YOUR_USERNAME"
	}, null, 2), [settings]);
	async function copy(label, value) {
		try {
			await navigator.clipboard.writeText(value);
			setCopied(label);
			toast.success("Copied");
			setTimeout(() => setCopied(null), 1500);
		} catch {
			toast.error("Could not copy");
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto flex w-full max-w-2xl flex-col gap-8 p-4 pb-24 sm:p-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-serif text-2xl",
				children: "Windows server"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm leading-relaxed text-muted-foreground",
				children: "This preview is a studio. The Python worker is what IIS 10 runs against your folder. Same pairing rules, same done-folder move."
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-3 rounded-2xl bg-card p-5 shadow-[var(--shadow-border)] sm:flex-row sm:items-center sm:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-medium",
					children: "Darkroom for IIS 10"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[0.75rem] text-muted-foreground",
					children: "FastAPI worker, web.config, setup script, operator UI"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: "/darkroom-windows.zip",
						download: true,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, {}), "Download package"]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "flex flex-col gap-3",
				children: STEPS.map((step) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex gap-4 rounded-2xl bg-card p-4 shadow-[var(--shadow-border)]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-mono text-[0.75rem] text-muted-foreground",
						children: step.n
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-medium",
						children: step.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-[0.8125rem] leading-relaxed text-muted-foreground",
						children: step.body
					})] })]
				}, step.n))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-3 rounded-2xl bg-card p-5 shadow-[var(--shadow-border)]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex items-center justify-between",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-sm font-medium",
							children: "Pairing"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
						className: "overflow-x-auto rounded-xl bg-background p-4 font-mono text-[0.75rem] leading-relaxed text-muted-foreground",
						children: `C:\\projects\\InstagramAuto\\
  salt-air.jpg          photo
  salt-air.txt          caption
  window-light.mp4      video
  window-light.json     caption + optional comment
  done\\                 used files land here`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-[0.75rem] leading-relaxed text-muted-foreground",
						children: [
							"Annotation files: ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-foreground",
								children: ".txt"
							}),
							",",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-foreground",
								children: ".caption"
							}),
							", or",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-foreground",
								children: ".json"
							}),
							" with",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-foreground",
								children: "{ \"caption\", \"comment\" }"
							}),
							". Hidden files, ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-foreground",
								children: "done"
							}),
							", and",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-foreground",
								children: ".darkroom"
							}),
							" are ignored."
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-3 rounded-2xl bg-card p-5 shadow-[var(--shadow-border)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-sm font-medium",
						children: "config.json preview"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "ghost",
						size: "sm",
						onClick: () => copy("config", configPreview),
						children: [copied === "config" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {}), "Copy"]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
					className: "overflow-x-auto rounded-xl bg-background p-4 font-mono text-[0.75rem] leading-relaxed text-muted-foreground",
					children: configPreview
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[0.75rem] leading-relaxed text-muted-foreground",
				children: "Instagram does not offer a simple personal posting API. The worker uses instagrapi. Post slowly, keep a dedicated account, and expect a challenge the first time the server signs in."
			})
		]
	});
}
var badgeVariants = cva("inline-flex items-center rounded-full px-2.5 py-0.5 text-[0.6875rem] font-medium tracking-wide", {
	variants: { variant: {
		default: "bg-secondary text-muted-foreground",
		paper: "bg-primary/10 text-primary",
		sage: "bg-sage/15 text-sage",
		rust: "bg-destructive/15 text-destructive"
	} },
	defaultVariants: { variant: "default" }
});
function Badge({ className, variant, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn(badgeVariants({ variant }), className),
		...props
	});
}
function HistoryList() {
	const history = useDarkroom((s) => s.history);
	const restoreDemo = useDarkroom((s) => s.restoreDemo);
	if (history.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full min-h-[22rem] flex-col items-center justify-center gap-3 px-6 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-serif text-2xl",
				children: "Nothing in done yet."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-sm text-sm text-muted-foreground",
				children: "Posted and skipped files land here after they leave the watch folder."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "secondary",
				onClick: restoreDemo,
				children: "Restore sample tray"
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto flex w-full max-w-3xl flex-col gap-3 p-4 sm:p-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "font-serif text-2xl",
			children: "Done"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-sm text-muted-foreground",
			children: "Used media and their annotation files, filed away."
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "flex flex-col gap-2",
			children: history.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "flex gap-3 rounded-2xl bg-card p-2 pr-4 shadow-[var(--shadow-border)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "size-16 shrink-0 overflow-hidden rounded-xl bg-print p-1",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: item.thumb,
						alt: "",
						className: "print size-full rounded-lg object-cover"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0 flex-1 py-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "truncate font-mono text-[0.8125rem]",
							children: item.filename
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							variant: item.destination === "posted" ? "sage" : "default",
							children: item.destination === "posted" ? "Posted" : "Skipped"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 line-clamp-2 text-[0.75rem] text-muted-foreground",
						children: item.caption || "No caption"
					})]
				})]
			}, item.id))
		})]
	});
}
var Label = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
	ref,
	className: cn("text-[0.75rem] font-medium tracking-wide text-muted-foreground", className),
	...props
}));
Label.displayName = Root.displayName;
var Textarea = import_react.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		className: cn("flex min-h-32 w-full rounded-lg bg-secondary px-3 py-3 text-sm leading-relaxed text-foreground shadow-[var(--shadow-border)] transition-[box-shadow] duration-[var(--motion-quick)] placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/70 disabled:cursor-not-allowed disabled:opacity-40", className),
		ref,
		...props
	});
});
Textarea.displayName = "Textarea";
function Inspector() {
	const queue = useDarkroom((s) => s.queue);
	const selectedId = useDarkroom((s) => s.selectedId);
	const postingId = useDarkroom((s) => s.postingId);
	const setCaption = useDarkroom((s) => s.setCaption);
	const setFirstComment = useDarkroom((s) => s.setFirstComment);
	const postItem = useDarkroom((s) => s.postItem);
	const skipItem = useDarkroom((s) => s.skipItem);
	const settings = useDarkroom((s) => s.settings);
	const item = queue.find((q) => q.id === selectedId) ?? queue[0];
	if (!item) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", { className: "hidden w-[22rem] shrink-0 border-l border-border lg:block" });
	const count = item.caption.length;
	const over = count > 2200;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
		className: "hidden w-[22rem] shrink-0 flex-col border-l border-border lg:flex",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "border-b border-border px-5 py-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[0.75rem] tracking-wide text-muted-foreground",
				children: "Selected frame"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 font-mono text-sm",
				children: item.filename
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-1 flex-col gap-4 overflow-y-auto p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-hidden rounded-2xl bg-print p-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: item.thumb,
						alt: "",
						className: "print max-h-56 w-full rounded-lg object-cover"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							variant: item.kind === "video" ? "paper" : "default",
							children: item.kind === "video" ? "Video" : "Photo"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: formatBytes(item.bytes) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							variant: item.annotationFile ? "sage" : "rust",
							children: item.annotationFile ?? "No .txt"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-baseline justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "caption",
							children: "Caption"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: `font-mono text-[0.6875rem] tabular-nums ${over ? "text-destructive" : "text-muted-foreground"}`,
							children: [count, "/2200"]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
						id: "caption",
						value: item.caption,
						onChange: (e) => setCaption(item.id, e.target.value),
						placeholder: "Write the caption that lives in the annotation file."
					})]
				}),
				settings.alsoFirstComment ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "comment",
						children: "First comment"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
						id: "comment",
						className: "min-h-20",
						value: item.firstComment,
						onChange: (e) => setFirstComment(item.id, e.target.value)
					})]
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-[0.75rem] leading-relaxed text-muted-foreground",
					children: [
						"On the Windows server, this text is read from",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono text-foreground",
							children: item.annotationFile ?? item.filename.replace(/\.[^.]+$/, ".txt")
						}),
						" ",
						"sitting beside the media file. After a successful post, both files move to done."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-auto flex gap-2 pt-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						className: "flex-1",
						disabled: !!postingId,
						onClick: async () => {
							const err = await postItem(item.id);
							if (err) toast.error(err);
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, {}), "Post"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "secondary",
						className: "flex-1",
						onClick: () => {
							const err = skipItem(item.id);
							if (err) toast.error(err);
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkipForward, {}), "Skip"]
					})]
				})
			]
		})]
	});
}
function MobileInspector() {
	const queue = useDarkroom((s) => s.queue);
	const selectedId = useDarkroom((s) => s.selectedId);
	const postingId = useDarkroom((s) => s.postingId);
	const setCaption = useDarkroom((s) => s.setCaption);
	const postItem = useDarkroom((s) => s.postItem);
	const skipItem = useDarkroom((s) => s.skipItem);
	const item = queue.find((q) => q.id === selectedId) ?? queue[0];
	if (!item) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-3 border-t border-border p-4 lg:hidden",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-mono text-[0.75rem] text-muted-foreground",
				children: item.filename
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					htmlFor: "m-caption",
					children: "Caption"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					id: "m-caption",
					value: item.caption,
					onChange: (e) => setCaption(item.id, e.target.value)
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					className: "flex-1",
					disabled: !!postingId,
					onClick: async () => {
						const err = await postItem(item.id);
						if (err) toast.error(err);
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, {}), "Post"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "secondary",
					className: "flex-1",
					onClick: () => {
						const err = skipItem(item.id);
						if (err) toast.error(err);
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkipForward, {}), "Skip"]
				})]
			})
		]
	});
}
var ITEMS = [
	{
		id: "queue",
		label: "Tray",
		icon: Images
	},
	{
		id: "done",
		label: "Done",
		icon: FolderInput
	},
	{
		id: "settings",
		label: "Settings",
		icon: Settings2
	},
	{
		id: "server",
		label: "Windows",
		icon: Server
	}
];
function SideNav() {
	const view = useDarkroom((s) => s.view);
	const setView = useDarkroom((s) => s.setView);
	const queue = useDarkroom((s) => s.queue.length);
	const done = useDarkroom((s) => s.history.length);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
		className: "hidden w-52 shrink-0 flex-col gap-1 border-r border-border p-3 md:flex",
		children: ITEMS.map((item) => {
			const Icon = item.icon;
			const active = view === item.id;
			const count = item.id === "queue" ? queue : item.id === "done" ? done : null;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => setView(item.id),
				className: cn("flex h-11 items-center gap-3 rounded-xl px-3 text-sm transition-colors duration-[var(--motion-quick)]", active ? "bg-secondary text-foreground" : "text-muted-foreground hover:bg-accent hover:text-foreground"),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "flex-1 text-left",
						children: item.label
					}),
					count !== null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-mono text-[0.75rem] tabular-nums text-muted-foreground",
						children: count
					}) : null
				]
			}, item.id);
		})
	});
}
function MobileNav() {
	const view = useDarkroom((s) => s.view);
	const setView = useDarkroom((s) => s.setView);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
		className: "fixed inset-x-0 bottom-0 z-30 border-t border-border bg-background/95 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid grid-cols-4",
			children: ITEMS.map((item) => {
				const Icon = item.icon;
				const active = view === item.id;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => setView(item.id),
					className: cn("flex min-h-14 flex-col items-center justify-center gap-1 text-[0.6875rem] tracking-wide", active ? "text-foreground" : "text-muted-foreground"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4" }), item.label]
				}, item.id);
			})
		})
	});
}
function QueueGrid() {
	const queue = useDarkroom((s) => s.queue);
	const selectedId = useDarkroom((s) => s.selectedId);
	const select = useDarkroom((s) => s.select);
	const restoreDemo = useDarkroom((s) => s.restoreDemo);
	const setView = useDarkroom((s) => s.setView);
	if (queue.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full min-h-[22rem] flex-col items-center justify-center gap-4 px-6 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-serif text-2xl",
				children: "The tray is clear."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-sm text-sm leading-relaxed text-muted-foreground",
				children: "Drop a photo or video into the watch folder with a matching annotation file. Used frames move to done after they post."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap justify-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "secondary",
					onClick: () => setView("server"),
					children: "Windows setup"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: restoreDemo,
					children: "Restore sample tray"
				})]
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid grid-cols-2 gap-3 p-4 sm:grid-cols-3 sm:gap-4 sm:p-6 xl:grid-cols-3",
		children: queue.map((item, i) => {
			const active = item.id === selectedId;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => select(item.id),
				style: { animationDelay: `${i * 40}ms` },
				className: cn("group flex flex-col rounded-2xl bg-table p-2 text-left shadow-[var(--shadow-border)] transition-[transform,box-shadow] duration-[var(--motion-fast)] ease-[var(--ease-smooth-out)] hover:-translate-y-0.5", active && "shadow-[0_0_0_1px_var(--color-primary)]"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative overflow-hidden rounded-xl bg-print p-1.5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: item.thumb,
							alt: "",
							className: cn("print aspect-[3/4] w-full rounded-lg object-cover", item.kind === "video" && "aspect-video")
						}),
						item.kind === "video" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "absolute left-3 top-3",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								variant: "paper",
								children: "Reel"
							})
						}) : null,
						item.status === "posting" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "absolute inset-1.5 flex items-end rounded-lg bg-background/50 p-3",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[0.75rem] tracking-wide text-primary",
								children: "Exposing…"
							})
						}) : null,
						item.status === "needs_caption" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "absolute right-3 top-3",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								variant: "rust",
								children: "No caption"
							})
						}) : null
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start gap-2 px-1.5 pb-1 pt-3",
					children: [item.kind === "video" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clapperboard, { className: "mt-0.5 size-3.5 text-muted-foreground" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Image, { className: "mt-0.5 size-3.5 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "truncate font-mono text-[0.75rem]",
							children: item.filename
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-0.5 line-clamp-2 text-[0.75rem] leading-snug text-muted-foreground",
							children: item.caption || "Waiting for an annotation file."
						})]
					})]
				})]
			}, item.id);
		})
	});
}
var Input = import_react.forwardRef(({ className, type, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		type,
		className: cn("flex h-11 w-full rounded-md bg-secondary px-3 text-sm text-foreground shadow-[var(--shadow-border)] transition-[box-shadow] duration-[var(--motion-quick)] placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/70 disabled:cursor-not-allowed disabled:opacity-40", className),
		ref,
		...props
	});
});
Input.displayName = "Input";
var Switch = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch$1, {
	className: cn("peer inline-flex h-7 w-12 shrink-0 cursor-pointer items-center rounded-full shadow-[var(--shadow-border)] transition-colors duration-[var(--motion-quick)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/70 disabled:cursor-not-allowed disabled:opacity-40 data-[state=checked]:bg-primary data-[state=unchecked]:bg-secondary", className),
	...props,
	ref,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SwitchThumb, { className: cn("pointer-events-none block size-5 rounded-full bg-foreground shadow-sm transition-transform duration-[var(--motion-fast)] ease-[var(--ease-smooth-out)] data-[state=checked]:translate-x-6 data-[state=unchecked]:translate-x-1 data-[state=checked]:bg-primary-foreground") })
}));
Switch.displayName = Switch$1.displayName;
var STUDIO_INTERVALS = [
	{
		label: "15 seconds",
		value: 15
	},
	{
		label: "30 seconds",
		value: 30
	},
	{
		label: "45 seconds",
		value: 45
	},
	{
		label: "2 minutes",
		value: 120
	},
	{
		label: "5 minutes",
		value: 300
	}
];
var SERVER_INTERVALS = [
	{
		label: "30 minutes",
		value: 30
	},
	{
		label: "1 hour",
		value: 60
	},
	{
		label: "2 hours",
		value: 120
	},
	{
		label: "4 hours",
		value: 240
	},
	{
		label: "6 hours",
		value: 360
	},
	{
		label: "12 hours",
		value: 720
	},
	{
		label: "Daily",
		value: 1440
	}
];
function SettingsPanel() {
	const settings = useDarkroom((s) => s.settings);
	const patch = useDarkroom((s) => s.patchSettings);
	const login = useDarkroom((s) => s.login);
	const logout = useDarkroom((s) => s.logout);
	const restoreDemo = useDarkroom((s) => s.restoreDemo);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto flex w-full max-w-2xl flex-col gap-8 p-4 pb-24 sm:p-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-serif text-2xl",
				children: "Settings"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm leading-relaxed text-muted-foreground",
				children: "Paths and timing write into the Windows worker. This studio keeps a live tray so you can rehearse the press before IIS is on."
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-4 rounded-2xl bg-card p-5 shadow-[var(--shadow-border)]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-sm font-medium",
						children: "Watch folders"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Inbox",
						htmlFor: "watch",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "watch",
							value: settings.watchFolder,
							onChange: (e) => patch({ watchFolder: e.target.value }),
							spellCheck: false
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Done",
						htmlFor: "done",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "done",
							value: settings.doneFolder,
							onChange: (e) => patch({ doneFolder: e.target.value }),
							spellCheck: false
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-[0.75rem] leading-relaxed text-muted-foreground",
						children: [
							"Pairing is by basename. ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-foreground",
								children: "peaches.jpg"
							}),
							" ",
							"reads ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-foreground",
								children: "peaches.txt"
							}),
							" as the caption. JSON sidecars work too."
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-4 rounded-2xl bg-card p-5 shadow-[var(--shadow-border)]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-sm font-medium",
							children: "Instagram session"
						}), settings.loggedIn ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-[0.75rem] text-sage",
							children: ["Signed in as @", settings.username || "account"]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[0.75rem] text-muted-foreground",
							children: "Not signed in"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Username",
						htmlFor: "user",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "user",
							autoComplete: "username",
							value: settings.username,
							onChange: (e) => patch({
								username: e.target.value,
								loggedIn: false
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Password",
						htmlFor: "pass",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "pass",
							type: "password",
							autoComplete: "current-password",
							value: settings.password,
							onChange: (e) => patch({
								password: e.target.value,
								loggedIn: false
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex gap-2",
						children: settings.loggedIn ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "secondary",
							onClick: logout,
							children: "Clear session"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							onClick: () => {
								const err = login();
								if (err) toast.error(err);
								else toast.success("Studio session ready. The Windows worker uses the same fields.");
							},
							children: "Save session"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[0.75rem] leading-relaxed text-muted-foreground",
						children: "Use a dedicated posting account. Instagram may challenge logins from a new server. Two-factor codes can be entered on the Windows app when asked."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-4 rounded-2xl bg-card p-5 shadow-[var(--shadow-border)]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-sm font-medium",
						children: "Timing"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Studio interval (this preview)",
						htmlFor: "studio-int",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							id: "studio-int",
							className: "flex h-11 w-full rounded-md bg-secondary px-3 text-sm shadow-[var(--shadow-border)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/70",
							value: settings.studioIntervalSec,
							onChange: (e) => patch({ studioIntervalSec: Number(e.target.value) }),
							children: STUDIO_INTERVALS.map((opt) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: opt.value,
								children: opt.label
							}, opt.value))
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Windows interval (IIS worker)",
						htmlFor: "server-int",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							id: "server-int",
							className: "flex h-11 w-full rounded-md bg-secondary px-3 text-sm shadow-[var(--shadow-border)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/70",
							value: settings.serverIntervalMin,
							onChange: (e) => patch({ serverIntervalMin: Number(e.target.value) }),
							children: SERVER_INTERVALS.map((opt) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: opt.value,
								children: opt.label
							}, opt.value))
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						label: "Quiet hours",
						hint: `${settings.quietStart} – ${settings.quietEnd}`,
						checked: settings.quietHoursOn,
						onCheckedChange: (quietHoursOn) => patch({ quietHoursOn })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Start",
							htmlFor: "qs",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "qs",
								type: "time",
								value: settings.quietStart,
								onChange: (e) => patch({ quietStart: e.target.value })
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "End",
							htmlFor: "qe",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "qe",
								type: "time",
								value: settings.quietEnd,
								onChange: (e) => patch({ quietEnd: e.target.value })
							})
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-4 rounded-2xl bg-card p-5 shadow-[var(--shadow-border)]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-sm font-medium",
						children: "Posting rules"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						label: "Post videos as Reels",
						hint: "Feed video upload is used when this is off.",
						checked: settings.videosAsReels,
						onCheckedChange: (videosAsReels) => patch({ videosAsReels })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						label: "Also post caption as first comment",
						hint: "Useful when the annotation is long.",
						checked: settings.alsoFirstComment,
						onCheckedChange: (alsoFirstComment) => patch({ alsoFirstComment })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						label: "Hold frames without annotation",
						hint: "Skip auto-post until a caption exists.",
						checked: settings.skipWithoutCaption,
						onCheckedChange: (skipWithoutCaption) => patch({ skipWithoutCaption })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "secondary",
				onClick: restoreDemo,
				children: "Restore sample tray"
			})
		]
	});
}
function Field({ label, htmlFor, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
			htmlFor,
			children: label
		}), children]
	});
}
function Row({ label, hint, checked, onCheckedChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center justify-between gap-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-[0.75rem] text-muted-foreground",
			children: hint
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
			checked,
			onCheckedChange
		})]
	});
}
function StatusBar() {
	const settings = useDarkroom((s) => s.settings);
	const queue = useDarkroom((s) => s.queue);
	const postingId = useDarkroom((s) => s.postingId);
	const nextPostAt = useDarkroom((s) => s.nextPostAt);
	const now = useDarkroom((s) => s.now);
	const toggleAuto = useDarkroom((s) => s.toggleAuto);
	const postNext = useDarkroom((s) => s.postNext);
	const quiet = settings.quietHoursOn && inQuietHours(new Date(now), settings.quietStart, settings.quietEnd);
	const remaining = nextPostAt ? Math.max(0, Math.round((nextPostAt - now) / 1e3)) : null;
	const live = settings.autoPost && settings.loggedIn;
	let statusLabel = "Paused";
	if (postingId) statusLabel = "Exposing";
	else if (!settings.loggedIn) statusLabel = "No session";
	else if (live && quiet) statusLabel = "Quiet hours";
	else if (live) statusLabel = "Live";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "flex flex-col gap-4 border-b border-border px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex size-10 items-center justify-center rounded-xl bg-secondary shadow-[var(--shadow-border)]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ApertureMark, {})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-serif text-xl leading-none tracking-tight",
				children: "Darkroom"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-[0.75rem] text-muted-foreground",
				children: "Instagram press for a watch folder"
			})] })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-center gap-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mr-1 flex min-w-[9.5rem] items-center gap-2 rounded-full bg-secondary px-3 py-2 shadow-[var(--shadow-border)]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `size-1.5 rounded-full ${postingId ? "bg-primary" : live && !quiet ? "bg-sage" : "bg-muted-foreground/50"}` }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[0.75rem] font-medium tracking-wide",
							children: statusLabel
						}),
						live && remaining !== null && !postingId ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "ml-auto font-mono text-[0.75rem] tabular-nums text-muted-foreground",
							children: formatClock(remaining)
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "ml-auto font-mono text-[0.75rem] tabular-nums text-muted-foreground",
							children: queue.length
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "secondary",
					onClick: () => {
						const err = toggleAuto();
						if (err) toast.error(err);
					},
					children: [settings.autoPost ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pause, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, {}), settings.autoPost ? "Pause" : "Start"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					disabled: !!postingId || queue.length === 0,
					onClick: async () => {
						const err = await postNext();
						if (err) toast.error(err);
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, {}), "Post next"]
				})
			]
		})]
	});
}
function ApertureMark() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 24 24",
		className: "size-5 text-primary",
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "12",
				cy: "12",
				r: "9",
				fill: "none",
				stroke: "currentColor",
				strokeWidth: "1.4"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "12",
				cy: "12",
				r: "3.2",
				fill: "none",
				stroke: "currentColor",
				strokeWidth: "1.4"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M12 3.2 14.6 9.4M12 3.2 9.4 9.4M20.8 12l-6.2 2.6M20.8 12l-6.2-2.6M12 20.8l2.6-6.2M12 20.8l-2.6-6.2M3.2 12l6.2 2.6M3.2 12l6.2-2.6",
				stroke: "currentColor",
				strokeWidth: "1.1",
				strokeLinecap: "round"
			})
		]
	});
}
function AppShell() {
	const view = useDarkroom((s) => s.view);
	const tick = useDarkroom((s) => s.tick);
	const notice = useDarkroom((s) => s.notice);
	(0, import_react.useEffect)(() => {
		useDarkroom.persist.rehydrate();
	}, []);
	(0, import_react.useEffect)(() => {
		const id = window.setInterval(() => tick(Date.now()), 1e3);
		return () => window.clearInterval(id);
	}, [tick]);
	(0, import_react.useEffect)(() => {
		if (!notice) return;
		toast(notice);
		useDarkroom.setState({ notice: null });
	}, [notice]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-dvh flex-col bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBar, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-h-0 flex-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SideNav, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
					className: "min-w-0 flex-1 pb-16 md:pb-0",
					children: [
						view === "queue" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex min-h-[calc(100dvh-5.5rem)]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueueGrid, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MobileInspector, {})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Inspector, {})]
						}) : null,
						view === "done" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HistoryList, {}) : null,
						view === "settings" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsPanel, {}) : null,
						view === "server" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DeployPanel, {}) : null
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MobileNav, {})
		]
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {});
}
//#endregion
export { Home as component };
