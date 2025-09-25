import { NextResponse } from "next/server";

function getUserFromCookies(req) {
  try {
    const raw = req.cookies.get("auth_user")?.value;
    if (!raw) return null;
    const decoded = decodeURIComponent(raw);
    const user = JSON.parse(decoded);
    return user || null;
  } catch {
    return null;
  }
}

export function middleware(req) {
  const { pathname } = req.nextUrl;

  // Define role-protected areas
  const isEmployerArea =
    pathname.startsWith("/dashboard") || pathname.startsWith("/employer");
  const isJobSeekerArea = pathname.startsWith("/karjoo");

  // Allow public assets and API routes to pass
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/favicon") ||
    pathname.startsWith("/images") ||
    pathname === "/"
  ) {
    return NextResponse.next();
  }

  const user = getUserFromCookies(req);
  const role = user?.role; // 2=employer, 3=jobSeeker

  console.log("MIDDLEWARE USER:", user);
  console.log("MIDDLEWARE ROLE:", role, "PATH:", pathname);

  // Enforce role-based access
  if (role && isEmployerArea && role !== 2) {
    const url = req.nextUrl.clone();
    url.pathname = "/karjoo"; // jobSeeker home
    return NextResponse.redirect(url);
  }

  if (role && isJobSeekerArea && role !== 3) {
    const url = req.nextUrl.clone();
    url.pathname = "/employer"; // employer home
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/employer/:path*",
    "/karjoo/:path*",
    "/auth/:path*",
    "/((?!_next|images|favicon|api).*)",
  ],
};
