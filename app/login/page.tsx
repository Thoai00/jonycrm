"use client";

import Image from "next/image";
import { useActionState, useState } from "react";
import { login } from "@/app/actions/auth";

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(login, undefined);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex min-h-screen flex-1 items-center justify-center bg-casino-glow px-4 py-8 sm:py-16">
      <div className="w-full max-w-sm rounded-2xl border border-border-hairline bg-surface-1 p-6 shadow-[0_0_60px_-15px_rgba(212,175,55,0.25)] sm:p-8">
        <div className="mb-8 flex flex-col items-center gap-3 text-center">
          <Image src="/logo.png" alt="2XLbet Casino" width={120} height={120} priority />
          <div>
            <h1 className="text-lg font-semibold tracking-wide text-text-primary">
              CRM Admin
            </h1>
            <p className="text-sm text-text-muted">Sign in to manage the casino dashboard</p>
          </div>
        </div>

        <form action={formAction} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="username" className="text-xs font-medium uppercase tracking-wider text-text-secondary">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              required
              className="rounded-lg border border-border-hairline bg-surface-2 px-3 py-2.5 text-sm text-text-primary outline-none placeholder:text-text-muted focus:border-gold"
              placeholder="admin"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="password" className="text-xs font-medium uppercase tracking-wider text-text-secondary">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                className="w-full rounded-lg border border-border-hairline bg-surface-2 px-3 py-2.5 pr-10 text-sm text-text-primary outline-none placeholder:text-text-muted focus:border-gold"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                aria-pressed={showPassword}
                className="absolute inset-y-0 right-0 flex w-10 items-center justify-center text-text-muted transition-colors hover:text-text-primary"
              >
                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </div>
          </div>

          {state?.error && (
            <p className="rounded-lg border border-status-critical/30 bg-status-critical/10 px-3 py-2 text-sm text-status-critical">
              {state.error}
            </p>
          )}

          <button
            type="submit"
            disabled={pending}
            className="mt-2 rounded-lg bg-linear-to-b from-gold-bright to-gold px-4 py-2.5 text-sm font-semibold text-surface-page transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            {pending ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}

function EyeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a17.8 17.8 0 0 1-3.16 4.19M6.61 6.61C3.9 8.28 2 12 2 12s4 8 11 8a9.16 9.16 0 0 0 4.24-1.02" />
      <path d="M14.12 14.12a3 3 0 1 1-4.24-4.24" />
      <path d="M1 1l22 22" />
    </svg>
  );
}
