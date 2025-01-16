import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("AuthToken");
  const url = request.nextUrl;

  const allowedPaths = ["/", "/pricing", "/login","/terms-and-conditions","/privacy-policy"];

  if (!accessToken && !allowedPaths.includes(url.pathname)) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next|static|favicon.ico|api|src).*)", // Exclude Next.js internal routes
  ],
};
