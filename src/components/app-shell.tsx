import { useEffect } from "react";
import { toast } from "sonner";
import { DeployPanel } from "@/components/deploy-panel";
import { HistoryList } from "@/components/history-list";
import { Inspector } from "@/components/inspector";
import { MobileInspector } from "@/components/mobile-inspector";
import { MobileNav, SideNav } from "@/components/nav";
import { QueueGrid } from "@/components/queue-grid";
import { SettingsPanel } from "@/components/settings-panel";
import { StatusBar } from "@/components/status-bar";
import { useDarkroom } from "@/lib/store";

export function AppShell() {
  const view = useDarkroom((s) => s.view);
  const tick = useDarkroom((s) => s.tick);
  const notice = useDarkroom((s) => s.notice);

  useEffect(() => {
    void useDarkroom.persist.rehydrate();
  }, []);

  useEffect(() => {
    const id = window.setInterval(() => tick(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, [tick]);

  useEffect(() => {
    if (!notice) return;
    toast(notice);
    useDarkroom.setState({ notice: null });
  }, [notice]);

  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <StatusBar />
      <div className="flex min-h-0 flex-1">
        <SideNav />
        <main className="min-w-0 flex-1 pb-16 md:pb-0">
          {view === "queue" ? (
            <div className="flex min-h-[calc(100dvh-5.5rem)]">
              <div className="min-w-0 flex-1">
                <QueueGrid />
                <MobileInspector />
              </div>
              <Inspector />
            </div>
          ) : null}
          {view === "done" ? <HistoryList /> : null}
          {view === "settings" ? <SettingsPanel /> : null}
          {view === "server" ? <DeployPanel /> : null}
        </main>
      </div>
      <MobileNav />
    </div>
  );
}
