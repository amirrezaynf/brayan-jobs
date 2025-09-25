"use client";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

function readUserRoleFromCookie() {
  try {
    const cookieValue = document.cookie
      .split("; ")
      .find((row) => row.startsWith("auth_user="))
      ?.split("=")[1];
    if (!cookieValue) return null;
    const decoded = decodeURIComponent(cookieValue);
    const parsed = JSON.parse(decoded);
    return parsed?.role ?? null; // 2 employer, 3 jobSeeker
  } catch {
    return null;
  }
}

export default function RoleGuard({ allowRoles = [], redirectTo = "/auth" }) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const role = readUserRoleFromCookie();
    // If role is not yet available on the client (e.g., right after login), do nothing.
    if (!role) return;
    // Only enforce when we have a concrete role and it is not allowed for this section
    if (allowRoles.length > 0 && !allowRoles.includes(role)) {
      // wrong role, route them appropriately based on destination
      const fallback = pathname.startsWith("/karjoo") ? "/employer" : "/karjoo";
      router.replace(fallback);
    }
  }, [pathname]);

  return null;
}
