
import { fetchInstance } from "@/config/fetch";
import { apiRoutes } from "@/config/routes";
import type { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
  providers: [
      CredentialsProvider({
          name: "Credentials",
          credentials: {
              email: { label: "Email", type: "text" },
              password: { label: "Password", type: "password" },
          },
          async authorize(credentials, req) {
              try {
                  const formBody = new URLSearchParams();
                  formBody.append("username", credentials?.email as string);
                  formBody.append("password", credentials?.password as string);
                  const res = await fetchInstance(apiRoutes.auth.login, {
                      headers: {
                          "Content-Type": "application/x-www-form-urlencoded",
                      },
                      method: "POST",
                      body: formBody
                  });
                  
                  return { ...res.user, apiToken: res.access_token };
              } catch (error: any) {
                  console.log("error:", error);
                  throw new Error(error.message || error);
              }
          },
      }),
  ],
  callbacks: {
      async jwt({ token, user }) {
          if (user) {
              token.accessToken = (user as any).apiToken;
          }
          return token;
      },

      async session({ session, token }) {
          if (token) {
              session.accessToken = token.accessToken;
          }
          return session;
      },
  },
  pages: {
      signIn: "/auth/login",
  },
  jwt: {
      maxAge: 2 * 60 * 60, // 2 hours
  },
  session: { strategy: "jwt" },
};