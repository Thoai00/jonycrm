import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createHmac, timingSafeEqual } from "crypto";
import { defaultPathForPages } from "@/lib/roles";
import { PAGE_CATALOG } from "@/lib/pages";

const COOKIE_NAME = "session";
const SESSION_DURATION_MS = 7 * 24 * 60 * 60 * 1000;
const VALID_PAGES = PAGE_CATALOG.map((p) => p.path);

type SessionPayload = {
  user: string;
  role: string;
  pages: string[];
  canApprove: boolean;
  percentage?: number;
  exp: number;
};

// Falls back to a built-in secret so the app still boots on a fresh Vercel
// deploy with no environment variables configured. Set SESSION_SECRET in the
// project's environment variables to use a real one instead.
const FALLBACK_SECRET = "2xlbet-crm-demo-fallback-secret-do-not-use-in-production";

function getSecret() {
  return process.env.SESSION_SECRET || FALLBACK_SECRET;
}

function sign(value: string) {
  return createHmac("sha256", getSecret()).update(value).digest("base64url");
}

function encode(payload: SessionPayload) {
  const body = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = sign(body);
  return `${body}.${signature}`;
}

function decode(token: string): SessionPayload | null {
  const [body, signature] = token.split(".");
  if (!body || !signature) return null;

  const expected = sign(body);
  const a = Buffer.from(signature);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;

  try {
    const payload = JSON.parse(Buffer.from(body, "base64url").toString()) as SessionPayload;
    if (typeof payload.exp !== "number" || Date.now() > payload.exp) return null;
    if (typeof payload.role !== "string" || !payload.role) return null;
    if (!Array.isArray(payload.pages) || !payload.pages.every((p) => VALID_PAGES.includes(p))) return null;
    if (typeof payload.canApprove !== "boolean") return null;
    return payload;
  } catch {
    return null;
  }
}

export async function createSession(
  user: string,
  role: string,
  pages: string[],
  canApprove: boolean,
  percentage?: number
) {
  const exp = Date.now() + SESSION_DURATION_MS;
  const token = encode({ user, role, pages, canApprove, percentage, exp });
  const cookieStore = await cookies();

  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: new Date(exp),
  });
}

export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return decode(token);
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

export function verifySessionToken(token: string | undefined) {
  if (!token) return null;
  return decode(token);
}

export async function requirePage(path: string) {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }
  if (!session.pages.includes(path)) {
    redirect(defaultPathForPages(session.pages));
  }
  return session;
}
