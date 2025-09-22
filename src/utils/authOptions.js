import CredentialsProvider from "next-auth/providers/credentials";
import { fetcher } from "./fetcher";
import { getRoleNumber } from "./auth";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials) {
        console.log("💡 [authorize] credentials:", credentials);

        let endpoint = "";
        let body = {};

        if (credentials.mode === "register") {
          endpoint = `${process.env.BASE_URL}/v1/auth/register/step-3`;
          body = {
            contact: credentials.contact,
            firstName: credentials.firstName,
            lastName: credentials.lastName,
            password: credentials.password,
            password_confirmation: credentials.confirmPassword,
            role: getRoleNumber(credentials.role),
          };
        } else if (credentials.mode === "login") {
          endpoint = `${process.env.BASE_URL}/v1/auth/login`;
          body = {
            contact: credentials.contact,
            password: credentials.password,
          };
        } else {
          console.log("❌ [authorize] unknown mode:", credentials.mode);
          return null;
        }

        console.log("💡 [authorize] endpoint:", endpoint);
        console.log("💡 [authorize] request body:", body);

        try {
          const { data, status } = await fetcher(endpoint, {
            method: "POST",
            body: JSON.stringify(body),
          });

          console.log("💡 [authorize] raw API response:", data);

          if (data?.data?.user) {
            return {
              id: data.data.user.id,
              name: data.data.user.name,
              family: data.data.user.family,
              mobile: data.data.user.mobile,
              role: data.data.user.role,
              token: data.data.token,
            };
          }

          if (data?.user) {
            return {
              id: data.user.id,
              name: data.user.name,
              family: data.user.family,
              mobile: data.user.mobile,
              role: data.user.role,
              token: data.token,
            };
          }

          console.log("❌ [authorize] no valid user found");
          return null;
        } catch (err) {
          console.error("❌ [authorize] error:", err);
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
        token.accessToken = user.token; // ← این باید با middleware هماهنگ باشه
      }
      return token;
    },

    async session({ session, token }) {
      session.user = token.user;
      session.accessToken = token.accessToken;
      return session;
    },

    async signIn({ user }) {
      return !!user;
    },
  },

  pages: {
    signIn: "/authentication",
    error: "/403",
  },

  session: {
    strategy: "jwt",
  },

  debug: true, // 🔹 برای لاگ‌های بیشتر
};
