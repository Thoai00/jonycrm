import { requirePage } from "@/lib/session";
import { MessagesPanel } from "@/app/dashboard/components/MessagesPanel";
import { conversations } from "@/app/dashboard/data";

export default async function MessagePage() {
  const session = await requirePage("/dashboard/message");

  return <MessagesPanel conversations={conversations} currentUser={session.user} />;
}
