import type { ReactNode } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useDarkroom } from "@/lib/store";
import { formatClockTime } from "@/lib/utils";

export function SettingsPanel() {
  const settings = useDarkroom((s) => s.settings);
  const schedule = useDarkroom((s) => s.schedule);
  const patch = useDarkroom((s) => s.patchSettings);
  const login = useDarkroom((s) => s.login);
  const logout = useDarkroom((s) => s.logout);
  const restoreDemo = useDarkroom((s) => s.restoreDemo);

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-8 p-4 pb-24 sm:p-6">
      <div>
        <h2 className="font-serif text-2xl">Settings</h2>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
          Paths and timing write into the Windows worker. This studio keeps a
          live tray so you can rehearse the press before IIS is on.
        </p>
      </div>

      <section className="space-y-4 rounded-2xl bg-card p-5 shadow-[var(--shadow-border)]">
        <h3 className="text-sm font-medium">Watch folders</h3>
        <Field label="Inbox" htmlFor="watch">
          <Input
            id="watch"
            value={settings.watchFolder}
            onChange={(e) => patch({ watchFolder: e.target.value })}
            spellCheck={false}
          />
        </Field>
        <Field label="Done" htmlFor="done">
          <Input
            id="done"
            value={settings.doneFolder}
            onChange={(e) => patch({ doneFolder: e.target.value })}
            spellCheck={false}
          />
        </Field>
        <p className="text-xs leading-relaxed text-muted-foreground">
          Pairing is by basename. <span className="font-mono text-foreground">peaches.jpg</span>{" "}
          reads <span className="font-mono text-foreground">peaches.txt</span> as
          the caption. JSON sidecars work too.
        </p>
      </section>

      <section className="space-y-4 rounded-2xl bg-card p-5 shadow-[var(--shadow-border)]">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-sm font-medium">Instagram session</h3>
          {settings.loggedIn ? (
            <span className="text-xs text-sage">
              Signed in as @{settings.username || "account"}
            </span>
          ) : (
            <span className="text-xs text-muted-foreground">Not signed in</span>
          )}
        </div>
        <Field label="Username" htmlFor="user">
          <Input
            id="user"
            autoComplete="username"
            value={settings.username}
            onChange={(e) => patch({ username: e.target.value, loggedIn: false })}
          />
        </Field>
        <Field label="Password" htmlFor="pass">
          <Input
            id="pass"
            type="password"
            autoComplete="current-password"
            value={settings.password}
            onChange={(e) => patch({ password: e.target.value, loggedIn: false })}
          />
        </Field>
        <div className="flex gap-2">
          {settings.loggedIn ? (
            <Button variant="secondary" onClick={logout}>
              Clear session
            </Button>
          ) : (
            <Button
              onClick={() => {
                const err = login();
                if (err) toast.error(err);
                else toast.success("Studio session ready. The Windows worker uses the same fields.");
              }}
            >
              Save session
            </Button>
          )}
        </div>
      </section>

      <section className="space-y-4 rounded-2xl bg-card p-5 shadow-[var(--shadow-border)]">
        <h3 className="text-sm font-medium">Daily press</h3>
        <p className="text-xs leading-relaxed text-muted-foreground">
          Each day Darkroom picks a random count from 1 to the cap, then
          random times outside quiet hours, at least 90 minutes apart.
        </p>
        <Field label="Max posts per day" htmlFor="max-posts">
          <select
            id="max-posts"
            className="flex h-11 w-full rounded-md bg-secondary px-3 text-sm shadow-[var(--shadow-border)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/70"
            value={settings.postsPerDayMax}
            onChange={(e) =>
              patch({
                postsPerDayMin: 1,
                postsPerDayMax: Number(e.target.value),
              })
            }
          >
            <option value={1}>1 post</option>
            <option value={2}>Up to 2 posts</option>
            <option value={3}>Up to 3 posts</option>
          </select>
        </Field>
        {settings.autoPost && schedule.length > 0 ? (
          <p className="rounded-xl bg-secondary px-3 py-2 font-mono text-xs text-muted-foreground">
            Today: {schedule.map(formatClockTime).join(" · ")}
          </p>
        ) : null}
        <Row
          label="Quiet hours"
          hint={`${settings.quietStart} – ${settings.quietEnd}`}
          checked={settings.quietHoursOn}
          onCheckedChange={(quietHoursOn) => patch({ quietHoursOn })}
        />
        <div className="grid grid-cols-2 gap-3">
          <Field label="Start" htmlFor="qs">
            <Input
              id="qs"
              type="time"
              value={settings.quietStart}
              onChange={(e) => patch({ quietStart: e.target.value })}
            />
          </Field>
          <Field label="End" htmlFor="qe">
            <Input
              id="qe"
              type="time"
              value={settings.quietEnd}
              onChange={(e) => patch({ quietEnd: e.target.value })}
            />
          </Field>
        </div>
      </section>

      <section className="space-y-4 rounded-2xl bg-card p-5 shadow-[var(--shadow-border)]">
        <h3 className="text-sm font-medium">Posting rules</h3>
        <Row
          label="Post videos as Reels"
          hint="Feed video upload is used when this is off."
          checked={settings.videosAsReels}
          onCheckedChange={(videosAsReels) => patch({ videosAsReels })}
        />
        <Row
          label="Also post caption as first comment"
          hint="Useful when the annotation is long."
          checked={settings.alsoFirstComment}
          onCheckedChange={(alsoFirstComment) => patch({ alsoFirstComment })}
        />
        <Row
          label="Hold frames without annotation"
          hint="Skip auto-post until a caption exists."
          checked={settings.skipWithoutCaption}
          onCheckedChange={(skipWithoutCaption) => patch({ skipWithoutCaption })}
        />
      </section>

      <Button variant="secondary" onClick={restoreDemo}>
        Restore sample tray
      </Button>
    </div>
  );
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
    </div>
  );
}

function Row({
  label,
  hint,
  checked,
  onCheckedChange,
}: {
  label: string;
  hint: string;
  checked: boolean;
  onCheckedChange: (value: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <p className="text-sm">{label}</p>
        <p className="text-xs text-muted-foreground">{hint}</p>
      </div>
      <Switch checked={checked} onCheckedChange={onCheckedChange} />
    </div>
  );
}
