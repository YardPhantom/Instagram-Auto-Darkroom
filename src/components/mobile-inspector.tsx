import { Send, SkipForward } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useDarkroom } from "@/lib/store";

export function MobileInspector() {
  const queue = useDarkroom((s) => s.queue);
  const selectedId = useDarkroom((s) => s.selectedId);
  const postingId = useDarkroom((s) => s.postingId);
  const setCaption = useDarkroom((s) => s.setCaption);
  const postItem = useDarkroom((s) => s.postItem);
  const skipItem = useDarkroom((s) => s.skipItem);
  const item = queue.find((q) => q.id === selectedId) ?? queue[0];

  if (!item) return null;

  return (
    <div className="space-y-3 border-t border-border p-4 lg:hidden">
      <p className="font-mono text-[0.75rem] text-muted-foreground">{item.filename}</p>
      <div className="space-y-2">
        <Label htmlFor="m-caption">Caption</Label>
        <Textarea
          id="m-caption"
          value={item.caption}
          onChange={(e) => setCaption(item.id, e.target.value)}
        />
      </div>
      <div className="flex gap-2">
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
  );
}
