import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useDarkroom } from "@/lib/store";

export function HistoryList() {
  const history = useDarkroom((s) => s.history);
  const restoreDemo = useDarkroom((s) => s.restoreDemo);

  if (history.length === 0) {
    return (
      <div className="flex h-full min-h-[22rem] flex-col items-center justify-center gap-3 px-6 text-center">
        <p className="font-serif text-2xl">Nothing in done yet.</p>
        <p className="max-w-sm text-sm text-muted-foreground">
          Posted and skipped files land here after they leave the watch folder.
        </p>
        <Button variant="secondary" onClick={restoreDemo}>
          Restore sample tray
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-3 p-4 sm:p-6">
      <div>
        <h2 className="font-serif text-2xl">Done</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Used media and their annotation files, filed away.
        </p>
      </div>
      <ul className="flex flex-col gap-2">
        {history.map((item) => (
          <li
            key={item.id}
            className="flex gap-3 rounded-2xl bg-card p-2 pr-4 shadow-[var(--shadow-border)]"
          >
            <div className="size-16 shrink-0 overflow-hidden rounded-xl bg-print p-1">
              <img
                src={item.thumb}
                alt=""
                className="print size-full rounded-lg object-cover"
              />
            </div>
            <div className="min-w-0 flex-1 py-1">
              <div className="flex items-center gap-2">
                <p className="truncate font-mono text-[0.8125rem]">
                  {item.filename}
                </p>
                <Badge variant={item.destination === "posted" ? "sage" : "default"}>
                  {item.destination === "posted" ? "Posted" : "Skipped"}
                </Badge>
              </div>
              <p className="mt-1 line-clamp-2 text-[0.75rem] text-muted-foreground">
                {item.caption || "No caption"}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
