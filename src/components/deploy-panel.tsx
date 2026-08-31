import { Check, Copy, Download } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useDarkroom } from "@/lib/store";

const STEPS = [
  {
    n: "01",
    title: "Unpack the worker",
    body: "Download the Windows package and extract it to C:\\projects\\Darkroom. Keep it out of the media inbox so Python files are never posted.",
  },
  {
    n: "02",
    title: "Create the folders",
    body: "Confirm C:\\projects\\InstagramAuto exists, with a done folder inside it. Drop photos, videos, and matching .txt or .json annotation files in the inbox — never in done.",
  },
  {
    n: "03",
    title: "Install the Python venv",
    body: "On the server, run setup.ps1 from the package. It creates .venv and installs FastAPI, uvicorn, instagrapi, and watchdog.",
  },
  {
    n: "04",
    title: "Point IIS 10 at the package",
    body: "Install HttpPlatformHandler, create a site whose physical path is C:\\projects\\Darkroom, and leave web.config as shipped. The worker binds to the port IIS assigns.",
  },
  {
    n: "05",
    title: "Sign in and start the press",
    body: "Open the site, confirm the account is Lookinggoodmodel, save the password, press Start. Darkroom rolls 1–3 posts a day at random times. After each success the media and annotation move to done.",
  },
];

export function DeployPanel() {
  const settings = useDarkroom((s) => s.settings);
  const [copied, setCopied] = useState<string | null>(null);

  const configPreview = useMemo(
    () =>
      JSON.stringify(
        {
          watch_folder: settings.watchFolder,
          done_folder: settings.doneFolder,
          posts_per_day_min: 1,
          posts_per_day_max: settings.postsPerDayMax,
          quiet_hours: settings.quietHoursOn,
          quiet_start: settings.quietStart,
          quiet_end: settings.quietEnd,
          videos_as_reels: settings.videosAsReels,
          also_first_comment: settings.alsoFirstComment,
          skip_without_caption: settings.skipWithoutCaption,
          instagram_username: settings.username || "Lookinggoodmodel",
        },
        null,
        2,
      ),
    [settings],
  );

  async function copy(label: string, value: string) {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(label);
      toast.success("Copied");
      setTimeout(() => setCopied(null), 1500);
    } catch {
      toast.error("Could not copy");
    }
  }

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-8 p-4 pb-24 sm:p-6">
      <div>
        <h2 className="font-serif text-2xl">Windows server</h2>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
          This preview is a studio. The Python worker is what IIS 10 runs
          against your folder. Same pairing rules, same done-folder move.
        </p>
      </div>

      <div className="flex flex-col gap-3 rounded-2xl bg-card p-5 shadow-[var(--shadow-border)] sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium">Darkroom for IIS 10</p>
          <p className="text-[0.75rem] text-muted-foreground">
            FastAPI worker, web.config, setup script, operator UI
          </p>
        </div>
        <Button asChild>
          <a href="/darkroom-windows.zip" download>
            <Download />
            Download package
          </a>
        </Button>
      </div>

      <ol className="flex flex-col gap-3">
        {STEPS.map((step) => (
          <li
            key={step.n}
            className="flex gap-4 rounded-2xl bg-card p-4 shadow-[var(--shadow-border)]"
          >
            <span className="font-mono text-[0.75rem] text-muted-foreground">
              {step.n}
            </span>
            <div>
              <p className="text-sm font-medium">{step.title}</p>
              <p className="mt-1 text-[0.8125rem] leading-relaxed text-muted-foreground">
                {step.body}
              </p>
            </div>
          </li>
        ))}
      </ol>

      <section className="space-y-3 rounded-2xl bg-card p-5 shadow-[var(--shadow-border)]">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium">Pairing</h3>
        </div>
        <pre className="overflow-x-auto rounded-xl bg-background p-4 font-mono text-[0.75rem] leading-relaxed text-muted-foreground">
{`C:\\projects\\InstagramAuto\\
  salt-air.jpg          photo
  salt-air.txt          caption
  window-light.mp4      video
  window-light.json     caption + optional comment
  done\\                 used files land here`}
        </pre>
        <p className="text-[0.75rem] leading-relaxed text-muted-foreground">
          Annotation files: <span className="font-mono text-foreground">.txt</span>,{" "}
          <span className="font-mono text-foreground">.caption</span>, or{" "}
          <span className="font-mono text-foreground">.json</span> with{" "}
          <span className="font-mono text-foreground">{"{ \"caption\", \"comment\" }"}</span>.
          Hidden files, <span className="font-mono text-foreground">done</span>, and{" "}
          <span className="font-mono text-foreground">.darkroom</span> are ignored.
        </p>
      </section>

      <section className="space-y-3 rounded-2xl bg-card p-5 shadow-[var(--shadow-border)]">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium">config.json preview</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => copy("config", configPreview)}
          >
            {copied === "config" ? <Check /> : <Copy />}
            Copy
          </Button>
        </div>
        <pre className="overflow-x-auto rounded-xl bg-background p-4 font-mono text-[0.75rem] leading-relaxed text-muted-foreground">
          {configPreview}
        </pre>
      </section>

      <p className="text-[0.75rem] leading-relaxed text-muted-foreground">
        Instagram does not offer a simple personal posting API. The worker uses
        instagrapi. Post slowly, keep a dedicated account, and expect a
        challenge the first time the server signs in.
      </p>
    </div>
  );
}
