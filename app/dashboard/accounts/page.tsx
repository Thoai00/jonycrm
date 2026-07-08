import { requirePage } from "@/lib/session";
import { AccountsManager } from "@/app/dashboard/components/AccountsManager";

export default async function AccountsPage() {
  const session = await requirePage("/dashboard/accounts");

  return (
    <div className="rounded-2xl border border-border-hairline bg-surface-1 p-5">
      <h2 className="mb-4 text-sm font-semibold text-text-primary">Manage accounts</h2>
      <AccountsManager currentUser={session.user} />
    </div>
  );
}
