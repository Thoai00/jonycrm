"use server";

import { redirect } from "next/navigation";
import { createSession, deleteSession } from "@/lib/session";

export async function loginWithRole(
  username: string,
  role: string,
  pages: string[],
  canApprove: boolean,
  percentage?: number
) {
  await createSession(username, role, pages, canApprove, percentage);
  redirect("/dashboard");
}

export async function logout() {
  await deleteSession();
  redirect("/login");
}
