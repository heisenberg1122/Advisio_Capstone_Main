/**
 * Next.js Middleware — Auth Guard
 * Phase 1: passthrough stub — wire to Better Auth in Phase 2
 *
 * When Better Auth is integrated:
 *   1. Import session helpers from @/lib/auth
 *   2. Check session in the middleware
 *   3. Redirect unauthenticated users to /login
 */
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // TODO Phase 2: replace with Better Auth session check
  // const session = await auth.getSession(request);
  // if (!session) return NextResponse.redirect(new URL("/login", request.url));
  return NextResponse.next();
}

export const config = {
  // Protect all student routes
  matcher: ["/(student)/:path*"],
};
