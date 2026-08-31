import { Clapperboard, ImageIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useDarkroom } from "@/lib/store";
import { cn } from "@/lib/utils";

export function QueueGrid() {
  const queue = useDarkroom((s) => s.queue);
  const selectedId = useDarkroom((s) => s.selectedId);
  const select = useDarkroom((s) => s.select);
  const restoreDemo = useDarkroom((s) => s.restoreDemo);
  const setView = useDarkroom((s) => s.setView);

  if (queue.length === 0) {
    return (
      <div className="flex h-full min-h-[22rem] flex-col items-center justify-center gap-4 px-6 text-center">
        <p className="font-serif text-2xl">The tray is clear.</p>
        <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
          Drop a photo or video into the watch folder with a matching annotation
          file. Used frames move to done after they post.
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          <Button variant="secondary" onClick={() => setView("server")}>
            Windows setup
          </Button>
          <Button onClick={restoreDemo}>Restore sample tray</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 p-4 sm:grid-cols-3 sm:gap-4 sm:p-6 xl:grid-cols-3">
      {queue.map((item, i) => {
        const active = item.id === selectedId;
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => select(item.id)}
            style={{ animationDelay: `${i * 40}ms` }}
            className={cn(
              "group flex flex-col rounded-2xl bg-table p-2 text-left shadow-[var(--shadow-border)] transition-[transform,box-shadow] duration-[var(--motion-fast)] ease-[var(--ease-smooth-out)] hover:-translate-y-0.5",
              active && "shadow-[0_0_0_1px_var(--color-primary)]",
            )}
          >
            <div className="relative overflow-hidden rounded-xl bg-print p-1.5">
              <img
                src={item.thumb}
                alt=""
                className={cn(
                  "print aspect-[3/4] w-full rounded-lg object-cover",
                  item.kind === "video" && "aspect-video",
                )}
              />
              {item.kind === "video" ? (
                <span className="absolute left-3 top-3">
                  <Badge variant="paper">Reel</Badge>
                </span>
              ) : null}
              {item.status === "posting" ? (
                <span className="absolute inset-1.5 flex items-end rounded-lg bg-background/50 p-3">
                  <span className="text-[0.75rem] tracking-wide text-primary">
                    Exposing…
                  </span>
                </span>
              ) : null}
              {item.status === "needs_caption" ? (
                <span className="absolute right-3 top-3">
                  <Badge variant="rust">No caption</Badge>
                </span>
              ) : null}
            </div>
            <div className="flex items-start gap-2 px-1.5 pb-1 pt-3">
              {item.kind === "video" ? (
                <Clapperboard className="mt-0.5 size-3.5 text-muted-foreground" />
              ) : (
                <ImageIcon className="mt-0.5 size-3.5 text-muted-foreground" />
              )}
              <div className="min-w-0">
                <p className="truncate font-mono text-[0.75rem]">{item.filename}</p>
                <p className="mt-0.5 line-clamp-2 text-[0.75rem] leading-snug text-muted-foreground">
                  {item.caption || "Waiting for an annotation file."}
                </p>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
