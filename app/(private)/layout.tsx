import { auth } from "@/lib/auth";
import { SessionProvider } from "@/lib/session-provider";
import { Providers } from "@/app/providers";
import { AppSidebar } from "@/components/ui/app-sidebar";
import { SiteHeader } from "@/components/ui/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default async function PrivateLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <Providers>
        <SidebarProvider
          style={
            {
              "--sidebar-width": "calc(var(--spacing) * 72)",
              "--header-height": "calc(var(--spacing) * 12)",
            } as React.CSSProperties
          }
        >
          <AppSidebar variant="inset" />
          <SidebarInset>
            <SiteHeader />
            <div className="flex flex-1 flex-col">
              <div className="@container/main flex flex-1 flex-col gap-2 p-6">{children}</div>
            </div>
          </SidebarInset>
        </SidebarProvider>
      </Providers>
    </SessionProvider>
  );
}
