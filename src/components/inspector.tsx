import { Send, SkipForward } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useDarkroom } from "@/lib/store";
import { formatBytes } from "@/lib/utils";

export function Inspector() {
  const queue = useDarkroom((s) => s.queue);
  const selectedId = useDarkroom((s) => s.selectedId);
  const postingId = useDarkroom((s) => s.postingId);
  const setCaption = useDarkroom((s) => s.setCaption);
  const setFirstComment = useDarkroom((s) => s.setFirstComment);
  const postItem = useDarkroom((s) => s.postItem);
  const skipItem = useDarkroom((s) => s.skipItem);
  const settings = useDarkroom((s) => s.settings);

  const item = queue.find((q) => q.id === selectedId) ?? queue[0];

  if (!item) {
    return (
      <aside className="hidden w-[22rem] shrink-0 border-l border-border lg:block" />
    );
  }

  const count = item.caption.length;
  const over = count > 2200;

  return (
    <aside className="hidden w-[22rem] shrink-0 flex-col border-l border-border lg:flex">
      <div className="border-b border-border px-5 py-4">
        <p className="text-[0.75rem] tracking-wide text-muted-foreground">
          Selected frame
        </p>
        <p className="mt-1 font-mono text-sm">{item.filename}</p>
      </div>
      <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-5">
        <div className="overflow-hidden rounded-2xl bg-print p-2">
          <img
            src={item.thumb}
            alt=""
            className="print max-h-56 w-full rounded-lg object-cover"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge variant={item.kind === "video" ? "paper" : "default"}>
            {item.kind === "video" ? "Video" : "Photo"}
          </Badge>
          <Badge>{formatBytes(item.bytes)}</Badge>
          <Badge variant={item.annotationFile ? "sage" : "rust"}>
            {item.annotationFile ?? "No .txt"}
          </Badge>
        </div>
        <div className="space-y-2">
          <div className="flex items-baseline justify-between">
            <Label htmlFor="caption">Caption</Label>
            <span
              className={`font-mono text-[0.6875rem] tabular-nums ${over ? "text-destructive" : "text-muted-foreground"}`}
            >
              {count}/2200
            </span>
          </div>
          <Textarea
            id="caption"
            value={item.caption}
            onChange={(e) => setCaption(item.id, e.target.value)}
            placeholder="Write the caption that lives in the annotation file."
          />
        </div>
        {settings.alsoFirstComment ? (
          <div className="space-y-2">
            <Label htmlFor="comment">First comment</Label>
            <Textarea
              id="comment"
              className="min-h-20"
              value={item.firstComment}
              onChange={(e) => setFirstComment(item.id, e.target.value)}
            />
          </div>
        ) : null}
        <p className="text-[0.75rem] leading-relaxed text-muted-foreground">
          On the Windows server, this text is read from{" "}
          <span className="font-mono text-foreground">
            {item.annotationFile ?? item.filename.replace(/\.[^.]+$/, ".txt")}
          </span>{" "}
          sitting beside the media file. After a successful post, both files
          move to done.
        </p>
        <div className="mt-auto flex gap-2 pt-2">
          <Button
            className="flex-1"
            disabled={!!postingId}
            onClick={async () => {
              const err = await postItem(item.id);
              if (err) toast.error(err);
            }}
          >
            <Send />
            Post
          </Button>
          <Button
            variant="secondary"
            className="flex-1"
            onClick={() => {
              const err = skipItem(item.id);
              if (err) toast.error(err);
            }}
          >
            <SkipForward />
            Skip
          </Button>
        </div>
      </div>
    </aside>
  );
}
