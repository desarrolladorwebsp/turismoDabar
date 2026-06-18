import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const ALLOWED_EXACT = new Set([
  "/",
  "/robots.txt",
  "/sitemap.xml",
  "/favicon.ico",
  "/icon.png",
  "/apple-icon.png",
]);

const ALLOWED_PREFIXES = ["/_next", "/images", "/api"];

function isAllowedPath(pathname: string) {
  if (ALLOWED_EXACT.has(pathname)) return true;
  return ALLOWED_PREFIXES.some((prefix) => pathname.startsWith(prefix));
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (isAllowedPath(pathname)) {
    return NextResponse.next();
  }

  const homeUrl = request.nextUrl.clone();
  homeUrl.pathname = "/";
  homeUrl.search = "";
  homeUrl.hash = "";

  return NextResponse.redirect(homeUrl);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|.*\\.(?:png|jpg|jpeg|gif|webp|svg|ico|txt|xml|woff2?|mp4|mov|webm)$).*)",
  ],
};
