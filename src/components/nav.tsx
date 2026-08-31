import { FolderInput, Images, Server, Settings2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useDarkroom } from "@/lib/store";
import type { AppView } from "@/lib/types";

const ITEMS: { id: AppView; label: string; icon: typeof Images }[] = [
  { id: "queue", label: "Tray", icon: Images },
  { id: "done", label: "Done", icon: FolderInput },
  { id: "settings", label: "Settings", icon: Settings2 },
  { id: "server", label: "Windows", icon: Server },
];

export function SideNav() {
  const view = useDarkroom((s) => s.view);
  const setView = useDarkroom((s) => s.setView);
  const queue = useDarkroom((s) => s.queue.length);
  const done = useDarkroom((s) => s.history.length);

  return (
    <nav className="hidden w-52 shrink-0 flex-col gap-1 border-r border-border p-3 md:flex">
      {ITEMS.map((item) => {
        const Icon = item.icon;
        const active = view === item.id;
        const count = item.id === "queue" ? queue : item.id === "done" ? done : null;
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => setView(item.id)}
            className={cn(
              "flex h-11 items-center gap-3 rounded-xl px-3 text-sm transition-colors duration-[var(--motion-quick)]",
              active
                ? "bg-secondary text-foreground"
                : "text-muted-foreground hover:bg-accent hover:text-foreground",
            )}
          >
            <Icon className="size-4" />
            <span className="flex-1 text-left">{item.label}</span>
            {count !== null ? (
              <span className="font-mono text-[0.75rem] tabular-nums text-muted-foreground">
                {count}
              </span>
            ) : null}
          </button>
        );
      })}
    </nav>
  );
}

export function MobileNav() {
  const view = useDarkroom((s) => s.view);
  const setView = useDarkroom((s) => s.setView);

  return (
    <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-background/95 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden">
      <div className="grid grid-cols-4">
        {ITEMS.map((item) => {
          const Icon = item.icon;
          const active = view === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setView(item.id)}
              className={cn(
                "flex min-h-14 flex-col items-center justify-center gap-1 text-[0.6875rem] tracking-wide",
                active ? "text-foreground" : "text-muted-foreground",
              )}
            >
              <Icon className="size-4" />
              {item.label}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
