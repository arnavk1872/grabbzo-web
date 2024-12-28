import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  console.log("Requested Path:", request.nextUrl.pathname); // Log route
  const accessToken = request.cookies.get("accessToken");
  console.log("Access Token:", accessToken); // Log token value

  if (!accessToken) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!login|_next|static|favicon.ico|api|src).*)"], // Ensure this includes '/dashboard'
};

