import { NextRequest, NextResponse } from "next/server";
import { verifySessionToken } from "@/lib/session";

const PROTECTED_PREFIX = "/dashboard";
const LOGIN_PATH = "/login";

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const session = verifySessionToken(request.cookies.get("session")?.value);

  if (pathname.startsWith(PROTECTED_PREFIX) && !session) {
    return NextResponse.redirect(new URL(LOGIN_PATH, request.url));
  }

  if (pathname === LOGIN_PATH && session) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$|.*\\.svg$|.*\\.ico$).*)"],
};
