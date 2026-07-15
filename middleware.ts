import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
// Login temporarily disabled for local testing.
// To restore it, uncomment the auth import and the session check below.
// import { AUTH_COOKIE, isValidSession } from "@/lib/auth";

const PUBLIC_FILE = /\.(.*)$/;

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname === "/login" ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/images") ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  // const session = request.cookies.get(AUTH_COOKIE)?.value;
  // if (isValidSession(session)) {
  //   return NextResponse.next();
  // }

  // const loginUrl = request.nextUrl.clone();
  // loginUrl.pathname = "/login";
  // loginUrl.searchParams.set("next", `${pathname}${request.nextUrl.search}`);
  // return NextResponse.redirect(loginUrl);

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"]
};
