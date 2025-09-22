import { redirect } from "next/navigation";

// Server-side redirect to dashboard
export default function EmployerRedirectPage() {
  // Server-side redirect - no client-side JavaScript needed
  redirect("/employer/dashboard");
}
