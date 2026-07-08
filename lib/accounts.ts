import { getRoleById } from "@/lib/roles";

export type Account = {
  id: string;
  username: string;
  password: string;
  role: string;
  percentage?: number;
  isActive: boolean;
  createdAt: string;
};

const STORAGE_KEY = "crm_accounts";

// Seed accounts so the app is usable before any account has been created via
// the UI. Demo credentials only — this store has no real security (see
// AccountsManager / login page for context). Role ids match the built-in
// roles seeded in lib/roles.ts.
const SEED_ACCOUNTS: Account[] = [
  { id: "seed-admin", username: "admin", password: "admin123", role: "admin", isActive: true, createdAt: new Date().toISOString() },
  { id: "seed-agent-1", username: "agent1", password: "agent123", role: "agent", percentage: 12, isActive: true, createdAt: new Date().toISOString() },
  { id: "seed-agent-2", username: "agent2", password: "agent123", role: "agent", percentage: 8, isActive: true, createdAt: new Date().toISOString() },
];

export function getAccounts(): Account[] {
  if (typeof window === "undefined") return SEED_ACCOUNTS;

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_ACCOUNTS));
    return SEED_ACCOUNTS;
  }

  try {
    const parsed = JSON.parse(raw) as Account[];
    if (parsed.length === 0) return SEED_ACCOUNTS;
    // Accounts saved before the active/inactive feature existed have no
    // isActive field — treat them as active rather than locking anyone out.
    return parsed.map((a) => ({ ...a, isActive: a.isActive ?? true }));
  } catch {
    return SEED_ACCOUNTS;
  }
}

function saveAccounts(accounts: Account[]) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(accounts));
}

export function findAccount(username: string, password: string): Account | null {
  return getAccounts().find((a) => a.username === username && a.password === password) ?? null;
}

export function addAccount(input: {
  username: string;
  password: string;
  role: string;
  percentage?: number;
}): { error?: string } {
  const accounts = getAccounts();
  if (accounts.some((a) => a.username.toLowerCase() === input.username.toLowerCase())) {
    return { error: "Username already exists." };
  }

  const roleDef = getRoleById(input.role);
  if (!roleDef) {
    return { error: "Select a valid role." };
  }

  const needsPercentage = roleDef.pages.includes("/dashboard/my-transactions");

  const account: Account = {
    id: crypto.randomUUID(),
    username: input.username,
    password: input.password,
    role: input.role,
    percentage: needsPercentage ? input.percentage : undefined,
    isActive: true,
    createdAt: new Date().toISOString(),
  };

  saveAccounts([...accounts, account]);
  return {};
}

export function deleteAccount(id: string) {
  saveAccounts(getAccounts().filter((a) => a.id !== id));
}

export function setAccountActive(id: string, isActive: boolean) {
  saveAccounts(getAccounts().map((a) => (a.id === id ? { ...a, isActive } : a)));
}

export function countAccountsUsingRole(roleId: string): number {
  return getAccounts().filter((a) => a.role === roleId).length;
}
