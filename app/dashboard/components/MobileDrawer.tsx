"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "@/app/dashboard/components/SidebarNav";
import { logout } from "@/app/actions/auth";

export function MobileDrawer({ user }: { user: string }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const [lastPathname, setLastPathname] = useState(pathname);

  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        className="flex h-9 w-9 items-center justify-center rounded-lg text-text-secondary transition-colors hover:bg-surface-2 hover:text-text-primary"
      >
        <MenuIcon />
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />

          <div className="relative flex w-72 max-w-[80vw] flex-col bg-surface-1 px-4 py-6 shadow-2xl">
            <div className="mb-6 flex items-center justify-between px-1">
              <div className="flex items-center gap-2.5">
                <Image src="/logo.png" alt="2XLbet Casino" width={32} height={32} />
                <div className="leading-tight">
                  <p className="text-sm font-semibold text-text-primary">2XLbet</p>
                  <p className="text-[11px] uppercase tracking-wider text-gold">CRM Admin</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="flex h-8 w-8 items-center justify-center rounded-lg text-text-muted transition-colors hover:bg-surface-2 hover:text-text-primary"
              >
                <CloseIcon />
              </button>
            </div>

            <nav className="flex flex-1 flex-col gap-1">
              <p className="mb-1 px-3 text-[11px] font-semibold uppercase tracking-wider text-text-muted">
                Menu
              </p>
              {NAV_ITEMS.map((item) => {
                const active = pathname === item.href;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`flex items-center gap-2.5 rounded-lg border-l-2 px-2.5 py-2.5 text-sm font-medium transition-colors ${
                      active
                        ? "border-gold bg-linear-to-r from-gold/12 to-transparent text-gold-bright"
                        : "border-transparent text-text-secondary hover:bg-surface-2 hover:text-text-primary"
                    }`}
                  >
                    <Icon className={`h-[18px] w-[18px] shrink-0 ${active ? "text-gold-bright" : "text-text-muted"}`} />
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="mt-6 border-t border-border-hairline pt-4">
              <div className="mb-3 flex items-center gap-2.5 rounded-lg px-2.5 py-2">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-linear-to-b from-gold-bright to-gold text-xs font-semibold text-surface-page">
                  {user.slice(0, 1).toUpperCase()}
                </div>
                <div className="min-w-0 leading-tight">
                  <p className="truncate text-sm font-medium text-text-primary">{user}</p>
                  <p className="text-[11px] text-text-muted">Administrator</p>
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
          </div>
        </div>
      )}
    </div>
  );
}

function MenuIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 6h18" />
      <path d="M3 12h18" />
      <path d="M3 18h18" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 6 6 18" />
      <path d="M6 6l12 12" />
    </svg>
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
