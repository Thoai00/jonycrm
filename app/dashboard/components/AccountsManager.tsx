"use client";

import { useEffect, useState } from "react";
import {
  addAccount,
  countAccountsUsingRole,
  deleteAccount,
  getAccounts,
  setAccountActive,
  type Account,
} from "@/lib/accounts";
import { addRole, deleteRole, getRoles, type RoleDef } from "@/lib/roles";
import { PAGE_CATALOG } from "@/lib/pages";

export function AccountsManager({ currentUser }: { currentUser: string }) {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [roles, setRoles] = useState<RoleDef[]>([]);

  useEffect(() => {
    setAccounts(getAccounts());
    setRoles(getRoles());
  }, []);

  function refresh() {
    setAccounts(getAccounts());
    setRoles(getRoles());
  }

  return (
    <div className="flex flex-col gap-8">
      <RolesPanel roles={roles} onChange={refresh} accountsUsingRole={(id) => countAccountsUsingRole(id)} />
      <AccountsPanel accounts={accounts} roles={roles} currentUser={currentUser} onChange={refresh} />
    </div>
  );
}

function RolesPanel({
  roles,
  onChange,
  accountsUsingRole,
}: {
  roles: RoleDef[];
  onChange: () => void;
  accountsUsingRole: (id: string) => number;
}) {
  const [name, setName] = useState("");
  const [pages, setPages] = useState<string[]>([]);
  const [canApprove, setCanApprove] = useState(false);
  const [error, setError] = useState<string>();

  function togglePage(path: string) {
    setPages((prev) => (prev.includes(path) ? prev.filter((p) => p !== path) : [...prev, path]));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const result = addRole({ name, pages, canApprove });
    if (result.error) {
      setError(result.error);
      return;
    }
    setError(undefined);
    setName("");
    setPages([]);
    setCanApprove(false);
    onChange();
  }

  function handleDelete(id: string) {
    const result = deleteRole(id, accountsUsingRole(id));
    if (result.error) {
      setError(result.error);
      return;
    }
    setError(undefined);
    onChange();
  }

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-sm font-semibold text-text-primary">Roles</h3>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3 rounded-xl border border-border-hairline bg-surface-2 p-4">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium uppercase tracking-wider text-text-secondary">Role name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Manager"
              required
              className="rounded-lg border border-border-hairline bg-surface-1 px-3 py-2.5 text-sm text-text-primary outline-none focus:border-gold"
            />
          </div>

          <label className="flex items-center gap-2 self-end pb-2.5 text-sm text-text-secondary">
            <input type="checkbox" checked={canApprove} onChange={(e) => setCanApprove(e.target.checked)} />
            Can approve pending transactions
          </label>
        </div>

        <div className="flex flex-col gap-1.5">
          <span className="text-xs font-medium uppercase tracking-wider text-text-secondary">Page access</span>
          <div className="flex flex-wrap gap-3">
            {PAGE_CATALOG.map((page) => (
              <label key={page.path} className="flex items-center gap-2 text-sm text-text-secondary">
                <input type="checkbox" checked={pages.includes(page.path)} onChange={() => togglePage(page.path)} />
                {page.label}
              </label>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="mt-1 w-fit rounded-lg bg-linear-to-b from-gold-bright to-gold px-4 py-2 text-sm font-semibold text-surface-page transition-opacity hover:opacity-90"
        >
          Create role
        </button>
      </form>

      {error && (
        <p className="rounded-lg border border-status-critical/30 bg-status-critical/10 px-3 py-2 text-sm text-status-critical">
          {error}
        </p>
      )}

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {roles.map((r) => (
          <div key={r.id} className="flex flex-col gap-3 rounded-xl border border-border-hairline bg-surface-2 p-3.5">
            <div className="flex items-start justify-between gap-2">
              <p className="font-medium text-text-primary">{r.name}</p>
              {r.builtIn && (
                <span className="shrink-0 rounded-full border border-border-hairline px-2 py-0.5 text-[11px] text-text-muted">
                  Built-in
                </span>
              )}
            </div>

            <div>
              <p className="mb-1.5 text-xs text-text-muted">Page access</p>
              <div className="flex flex-wrap gap-1.5">
                {r.pages.map((p) => (
                  <span
                    key={p}
                    className="rounded-full border border-border-hairline bg-surface-1 px-2 py-0.5 text-xs text-text-secondary"
                  >
                    {PAGE_CATALOG.find((c) => c.path === p)?.label ?? p}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between gap-2 border-t border-border-hairline pt-3">
              <span className="text-xs text-text-muted">
                Can approve: <span className="text-text-secondary">{r.canApprove ? "Yes" : "No"}</span>
              </span>
              {r.builtIn ? (
                <span className="text-xs text-text-muted">—</span>
              ) : (
                <button
                  type="button"
                  onClick={() => handleDelete(r.id)}
                  className="rounded-md border border-status-critical/40 bg-status-critical/10 px-2.5 py-1 text-xs font-medium text-status-critical transition-colors hover:bg-status-critical/20"
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AccountsPanel({
  accounts,
  roles,
  currentUser,
  onChange,
}: {
  accounts: Account[];
  roles: RoleDef[];
  currentUser: string;
  onChange: () => void;
}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [roleId, setRoleId] = useState(roles[0]?.id ?? "");
  const [percentage, setPercentage] = useState("");
  const [error, setError] = useState<string>();

  useEffect(() => {
    if (!roleId && roles.length > 0) setRoleId(roles[0].id);
  }, [roles, roleId]);

  const selectedRole = roles.find((r) => r.id === roleId);
  const needsPercentage = selectedRole?.pages.includes("/dashboard/my-transactions") ?? false;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const result = addAccount({
      username: username.trim(),
      password,
      role: roleId,
      percentage: needsPercentage ? Number(percentage) || 0 : undefined,
    });

    if (result.error) {
      setError(result.error);
      return;
    }

    setError(undefined);
    setUsername("");
    setPassword("");
    setPercentage("");
    onChange();
  }

  function handleDelete(id: string) {
    deleteAccount(id);
    onChange();
  }

  function handleToggleActive(id: string, isActive: boolean) {
    setAccountActive(id, isActive);
    onChange();
  }

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-sm font-semibold text-text-primary">Accounts</h3>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-5 xl:items-end">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium uppercase tracking-wider text-text-secondary">Username</label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="rounded-lg border border-border-hairline bg-surface-2 px-3 py-2.5 text-sm text-text-primary outline-none focus:border-gold"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium uppercase tracking-wider text-text-secondary">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-lg border border-border-hairline bg-surface-2 px-3 py-2.5 pr-10 text-sm text-text-primary outline-none focus:border-gold"
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

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium uppercase tracking-wider text-text-secondary">Role</label>
          <select
            value={roleId}
            onChange={(e) => setRoleId(e.target.value)}
            className="rounded-lg border border-border-hairline bg-surface-2 px-3 py-2.5 text-sm text-text-primary outline-none focus:border-gold"
          >
            {roles.map((r) => (
              <option key={r.id} value={r.id}>
                {r.name}
              </option>
            ))}
          </select>
        </div>

        {needsPercentage && (
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium uppercase tracking-wider text-text-secondary">Commission %</label>
            <input
              type="number"
              min={0}
              max={100}
              value={percentage}
              onChange={(e) => setPercentage(e.target.value)}
              required
              className="rounded-lg border border-border-hairline bg-surface-2 px-3 py-2.5 text-sm text-text-primary outline-none focus:border-gold"
            />
          </div>
        )}

        <button
          type="submit"
          className="h-fit rounded-lg bg-linear-to-b from-gold-bright to-gold px-4 py-2.5 text-sm font-semibold text-surface-page transition-opacity hover:opacity-90"
        >
          Create account
        </button>
      </form>

      {error && (
        <p className="rounded-lg border border-status-critical/30 bg-status-critical/10 px-3 py-2 text-sm text-status-critical">
          {error}
        </p>
      )}

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {accounts.map((a) => (
          <div key={a.id} className="flex flex-col gap-3 rounded-xl border border-border-hairline bg-surface-2 p-3.5">
            <div className="flex items-start justify-between gap-2">
              <p className="truncate font-medium text-text-primary">{a.username}</p>
              <div className="flex shrink-0 items-center gap-1.5">
                <span className="rounded-full border border-border-hairline px-2 py-0.5 text-[11px] text-text-secondary">
                  {roles.find((r) => r.id === a.role)?.name ?? a.role}
                </span>
                <span
                  className={`rounded-full border px-2 py-0.5 text-[11px] font-medium ${
                    a.isActive
                      ? "border-status-good/40 bg-status-good/10 text-status-good"
                      : "border-status-critical/40 bg-status-critical/10 text-status-critical"
                  }`}
                >
                  {a.isActive ? "Active" : "Inactive"}
                </span>
              </div>
            </div>

            <dl className="grid grid-cols-2 gap-x-3 gap-y-1.5 text-sm">
              <div>
                <dt className="text-xs text-text-muted">Commission</dt>
                <dd className="tabular-nums text-text-secondary">
                  {a.percentage !== undefined ? `${a.percentage}%` : "—"}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-text-muted">Created</dt>
                <dd className="tabular-nums text-text-secondary">{new Date(a.createdAt).toLocaleDateString()}</dd>
              </div>
            </dl>

            <div className="flex items-center justify-between gap-2 border-t border-border-hairline pt-3">
              {a.username === currentUser ? (
                <span className="text-xs text-text-muted">Current user</span>
              ) : (
                <button
                  type="button"
                  onClick={() => handleToggleActive(a.id, !a.isActive)}
                  className={`rounded-md border px-2.5 py-1 text-xs font-medium transition-colors ${
                    a.isActive
                      ? "border-status-critical/40 bg-status-critical/10 text-status-critical hover:bg-status-critical/20"
                      : "border-status-good/40 bg-status-good/10 text-status-good hover:bg-status-good/20"
                  }`}
                >
                  {a.isActive ? "Deactivate" : "Activate"}
                </button>
              )}

              {a.username !== currentUser && (
                <button
                  type="button"
                  onClick={() => handleDelete(a.id)}
                  className="rounded-md border border-status-critical/40 bg-status-critical/10 px-2.5 py-1 text-xs font-medium text-status-critical transition-colors hover:bg-status-critical/20"
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <p className="text-xs text-text-muted">
        Accounts and roles are stored locally in this browser for demo purposes — this is not a secured backend store.
      </p>
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
