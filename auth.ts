import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import { prisma } from "./lib/prisma";
import NextAuth from "next-auth";

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: "jwt",
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID!,
      clientSecret: process.env.AUTH_GITHUB_SECRET!,
    }),
    Credentials({
      credentials: {
        name: { label: "Name", type: "text" },
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
          if (!credentials?.email || !credentials?.password) {
            return null;
          }

          const user = await prisma.user.findFirst({
            where: { email: credentials.email as string }
          });

          if (!user || user.password !== credentials.password) {
            return null;
          }

          return {
            id: user.id,
            name: user.name,
            email: user.email,
          };
      }
    })
  ],
})