import Image from "next/image";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { logout } from "@/app/actions/auth";
import { SidebarNav } from "@/app/dashboard/components/SidebarNav";
import { MobileDrawer } from "@/app/dashboard/components/MobileDrawer";
import { PageHeading } from "@/app/dashboard/components/PageHeading";

export default async function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen bg-casino-glow">
      <aside className="relative hidden w-64 shrink-0 flex-col bg-surface-1 px-4 py-6 md:flex">
        <div className="absolute inset-y-0 right-0 w-px bg-linear-to-b from-transparent via-border-hairline to-transparent" />

        <div className="mb-8 flex items-center gap-2.5 px-2">
          <Image src="/logo.png" alt="2XLbet Casino" width={36} height={36} />
          <div className="leading-tight">
            <p className="text-sm font-semibold tracking-wide text-text-primary">2XLbet</p>
            <p className="text-[11px] uppercase tracking-wider text-gold">CRM Admin</p>
          </div>
        </div>

        <SidebarNav pages={session.pages} />

        <div className="mt-6 border-t border-border-hairline pt-4">
          <div className="mb-3 flex items-center gap-2.5 rounded-lg px-2.5 py-2">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-linear-to-b from-gold-bright to-gold text-xs font-semibold text-surface-page">
              {session.user.slice(0, 1).toUpperCase()}
            </div>
            <div className="min-w-0 leading-tight">
              <p className="truncate text-sm font-medium text-text-primary">{session.user}</p>
              <p className="text-[11px] text-text-muted">{session.role}</p>
            </div>
          </div>
          <form action={logout}>
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-border-hairline px-3 py-2 text-sm font-medium text-text-secondary transition-colors hover:border-status-critical/40 hover:text-status-critical"
            >
              <LogoutIcon />
              Log out
            </button>
          </form>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center justify-between gap-3 px-4 py-4 sm:px-8">
          <div className="flex min-w-0 items-center gap-3">
            <MobileDrawer user={session.user} role={session.role} pages={session.pages} />
            <PageHeading />
          </div>
          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <span className="hidden text-sm font-medium text-text-primary sm:inline">{session.user}</span>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-linear-to-b from-gold-bright to-gold text-sm font-semibold text-surface-page">
              {session.user.slice(0, 1).toUpperCase()}
            </div>
          </div>
        </header>

        <main className="flex-1 px-4 py-4 sm:px-8 sm:py-8">{children}</main>
      </div>
    </div>
  );
}

function LogoutIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <path d="M16 17l5-5-5-5" />
      <path d="M21 12H9" />
    </svg>
  );
}
