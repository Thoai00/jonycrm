"use server";

import { timingSafeEqual } from "crypto";
import { redirect } from "next/navigation";
import { createSession, deleteSession } from "@/lib/session";

export type LoginState = { error?: string } | undefined;

function safeEqual(a: string, b: string) {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}

export async function login(_state: LoginState, formData: FormData): Promise<LoginState> {
  const username = String(formData.get("username") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  const validUser = process.env.ADMIN_USERNAME ?? "";
  const validPassword = process.env.ADMIN_PASSWORD ?? "";

  const usernameOk = username.length > 0 && safeEqual(username, validUser);
  const passwordOk = password.length > 0 && safeEqual(password, validPassword);

  if (!usernameOk || !passwordOk) {
    return { error: "Invalid username or password." };
  }

  await createSession(username);
  redirect("/dashboard");
}

export async function logout() {
  await deleteSession();
  redirect("/login");
}
