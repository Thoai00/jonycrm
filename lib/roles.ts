import { PAGE_CATALOG } from "@/lib/pages";

export type RoleDef = {
  id: string;
  name: string;
  pages: string[];
  canApprove: boolean;
  builtIn?: boolean;
};

const STORAGE_KEY = "crm_roles";
const ALL_PAGES = PAGE_CATALOG.map((p) => p.path);

const BUILT_IN_ROLES: RoleDef[] = [
  { id: "admin", name: "Admin", pages: ALL_PAGES, canApprove: true, builtIn: true },
  {
    id: "employee",
    name: "Employee",
    pages: ["/dashboard/cash-in", "/dashboard/cash-out"],
    canApprove: false,
    builtIn: true,
  },
  {
    id: "agent",
    name: "Agent",
    pages: ["/dashboard/my-transactions"],
    canApprove: false,
    builtIn: true,
  },
];

export function getRoles(): RoleDef[] {
  if (typeof window === "undefined") return BUILT_IN_ROLES;

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(BUILT_IN_ROLES));
    return BUILT_IN_ROLES;
  }

  try {
    const parsed = JSON.parse(raw) as RoleDef[];
    if (parsed.length === 0) return BUILT_IN_ROLES;

    // Built-in roles aren't user-editable, so always resync them against the
    // current definitions (e.g. a newly added page that Admin should have).
    // Any custom roles the user created are left untouched.
    const builtInIds = new Set(BUILT_IN_ROLES.map((r) => r.id));
    const custom = parsed.filter((r) => !builtInIds.has(r.id));
    return [...BUILT_IN_ROLES, ...custom];
  } catch {
    return BUILT_IN_ROLES;
  }
}

function saveRoles(roles: RoleDef[]) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(roles));
}

export function getRoleById(id: string): RoleDef | null {
  return getRoles().find((r) => r.id === id) ?? null;
}

export function addRole(input: { name: string; pages: string[]; canApprove: boolean }): { error?: string } {
  const name = input.name.trim();
  if (!name) return { error: "Role name is required." };

  const roles = getRoles();
  if (roles.some((r) => r.name.toLowerCase() === name.toLowerCase())) {
    return { error: "A role with this name already exists." };
  }
  if (input.pages.length === 0) {
    return { error: "Select at least one page for this role." };
  }

  const role: RoleDef = {
    id: crypto.randomUUID(),
    name,
    pages: input.pages,
    canApprove: input.canApprove,
  };

  saveRoles([...roles, role]);
  return {};
}

export function deleteRole(id: string, accountsUsingRole: number): { error?: string } {
  const roles = getRoles();
  const role = roles.find((r) => r.id === id);
  if (!role) return {};
  if (role.builtIn) return { error: "Built-in roles can't be deleted." };
  if (accountsUsingRole > 0) return { error: "Can't delete a role that's assigned to existing accounts." };

  saveRoles(roles.filter((r) => r.id !== id));
  return {};
}

export function defaultPathForPages(pages: string[]): string {
  return pages[0] ?? "/login";
}
