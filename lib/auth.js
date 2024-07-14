import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";

export const options: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET as string,
  debug: process.env.NODE_ENV === "development",
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          console.log("Missing email or password");
          return null;
        }

        console.log(Received login request for email: ${credentials.email});

        const startQuery = Date.now();
        const user = await db.user.findUnique({
          where: { email: credentials.email },
        });
        const endQuery = Date.now();
        console.log(Database query time: ${endQuery - startQuery}ms);

        if (!user) {
          console.log("User not found");
          return null;
        }

        const startCompare = Date.now();
        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        );
        const endCompare = Date.now();
        console.log(Password compare time: ${endCompare - startCompare}ms);

        if (!isPasswordValid) {
          console.log("Invalid password");
          return null;
        }

        const customUser = {
          id: user.id,
          email: user.email,
          profile: user.profile,
          firstName: user.firstName,
          lastName: user.lastName,
          countryCode: user.countryCode,
          phone: user.phone,
          twoFact: user.twoFact,
          status: user.status,
          token: "user-specific-token", // Add a valid token if you have one
        };

        console.log("Login successful");
        return customUser as any;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        Object.assign(token, {
          id: user.id,
          email: user.email,
          profile: user.profile,
          firstName: user.firstName,
          lastName: user.lastName,
          countryCode: user.countryCode,
          phone: user.phone,
          twoFact: user.twoFact,
          status: user.status,
          token: user.token,
        });
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = { ...token };
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/login",
  },
};