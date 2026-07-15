import { requirePage } from "@/lib/session";
import { ImagesManager } from "@/app/dashboard/components/ImagesManager";

export default async function ImagesPage() {
  await requirePage("/dashboard/images");

  return <ImagesManager />;
}
