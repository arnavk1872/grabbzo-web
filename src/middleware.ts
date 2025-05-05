import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("AuthToken");
  const expiryToken = request.cookies.get("planExpired");
  const url = request.nextUrl;

  const allowedPaths = [
    "/",
    "/pricing",
    "/policies/terms-of-service",
    "/policies/privacy",
    "/policies/cancellation-and-refund",
    "/policies/channel-partner",
    "/policies/guidelines-and-policy",
    "/about",
    "/restaurant",
    "/plan-expired",
    "/about/smart-diners-preorder-2025",
    "/about/preorder-meals-smartest-move",
  ];

  const blockedPaths = [
    "/",
    "/restaurant",
    "/policies/terms-of-service",
    "/policies/privacy",
    "/policies/cancellation-and-refund",
    "/policies/channel-partner",
    "/policies/guidelines-and-policy",
    "/about",

  ];

  if (!accessToken && !allowedPaths.includes(url.pathname)) {
    const loginUrl = new URL("/restaurant", request.url);
    return NextResponse.redirect(loginUrl);
  }
  
  if (accessToken && blockedPaths.includes(url.pathname)) {
    const dashboardUrl = new URL("/dashboard", request.url);
    return NextResponse.redirect(dashboardUrl);
  }

  if (expiryToken && !allowedPaths.includes(url.pathname)) {
    const loginUrl = new URL("/plan-expired", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|static|favicon.ico|api|src).*)"],
};
