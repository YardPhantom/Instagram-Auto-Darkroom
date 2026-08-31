import { Pause, Play, Send } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useDarkroom } from "@/lib/store";
import { formatClock, inQuietHours } from "@/lib/utils";

export function StatusBar() {
  const settings = useDarkroom((s) => s.settings);
  const queue = useDarkroom((s) => s.queue);
  const postingId = useDarkroom((s) => s.postingId);
  const nextPostAt = useDarkroom((s) => s.nextPostAt);
  const schedule = useDarkroom((s) => s.schedule);
  const now = useDarkroom((s) => s.now);
  const toggleAuto = useDarkroom((s) => s.toggleAuto);
  const postNext = useDarkroom((s) => s.postNext);

  const quiet =
    settings.quietHoursOn &&
    inQuietHours(new Date(now), settings.quietStart, settings.quietEnd);
  const remaining = nextPostAt ? Math.max(0, Math.round((nextPostAt - now) / 1000)) : null;
  const live = settings.autoPost && settings.loggedIn;

  let statusLabel = "Paused";
  if (postingId) statusLabel = "Exposing";
  else if (!settings.loggedIn) statusLabel = "No session";
  else if (live && quiet) statusLabel = "Quiet hours";
  else if (live) statusLabel = `${schedule.length} left today`;

  return (
    <header className="flex flex-col gap-4 border-b border-border px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
      <div className="flex items-center gap-4">
        <div className="flex size-10 items-center justify-center rounded-xl bg-secondary shadow-[var(--shadow-border)]">
          <ApertureMark />
        </div>
        <div>
          <p className="font-serif text-xl leading-none tracking-tight">
            Darkroom
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            @{settings.username || "Lookinggoodmodel"} · 1–{settings.postsPerDayMax} posts a day
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <div className="mr-1 flex min-w-[9.5rem] items-center gap-2 rounded-full bg-secondary px-3 py-2 shadow-[var(--shadow-border)]">
          <span
            className={`size-1.5 rounded-full ${
              postingId
                ? "bg-primary"
                : live && !quiet
                  ? "bg-sage"
                  : "bg-muted-foreground/50"
            }`}
          />
          <span className="text-xs font-medium tracking-wide">{statusLabel}</span>
          {live && remaining !== null && !postingId ? (
            <span className="ml-auto font-mono text-xs tabular-nums text-muted-foreground">
              {formatClock(remaining)}
            </span>
          ) : (
            <span className="ml-auto font-mono text-xs tabular-nums text-muted-foreground">
              {queue.length}
            </span>
          )}
        </div>
        <Button
          variant="secondary"
          onClick={() => {
            const err = toggleAuto();
            if (err) toast.error(err);
          }}
        >
          {settings.autoPost ? <Pause /> : <Play />}
          {settings.autoPost ? "Pause" : "Start"}
        </Button>
        <Button
          disabled={!!postingId || queue.length === 0}
          onClick={async () => {
            const err = await postNext();
            if (err) toast.error(err);
          }}
        >
          <Send />
          Post next
        </Button>
      </div>
    </header>
  );
}

function ApertureMark() {
  return (
    <svg viewBox="0 0 24 24" className="size-5 text-primary" aria-hidden="true">
      <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="12" cy="12" r="3.2" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M12 3.2 14.6 9.4M12 3.2 9.4 9.4M20.8 12l-6.2 2.6M20.8 12l-6.2-2.6M12 20.8l2.6-6.2M12 20.8l-2.6-6.2M3.2 12l6.2 2.6M3.2 12l6.2-2.6"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
    </svg>
  );
}
