import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: ({ token }) => Boolean(token?.accessToken),
  },
  pages: {
    // signIn: "/authentication",
    // error: "/403",
  },
});

export const config = {
  matcher: ["/employer/:path*", "/karjoo/:path*"], // مسیرهای محافظت‌شده
};
