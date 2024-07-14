import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const handler = NextAuth({
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: '/login'
    },
    providers: [
        CredentialsProvider({

            credentials: {
                email: {},
                password: {},
            },
            async authorize(credentials, req) {
                const user = await prisma.user.findFirst({
                    where: { email: credentials.email },
                });

                console.log(user)

                if (!user) {
                    throw new Error('No user found with the provided email.');
                }
                // console.log(user);

                if (user && credentials.password) {
                    const isValid = credentials.password === user.password;

                    if (!isValid) {
                        throw new Error('Password is incorrect.');
                    }

                    const sessionDetals = {
                        id: user.id,
                        email: user.email,
                        isadmin: user.isadmin
                    }
                    return sessionDetals;

                }

            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.email = user.email;
                token.isadmin = user.isadmin;
            }
            return token;
        },
        async session({ session, token }) {
            console.log("token : " + token)
            if (token) {
                session.user = { ...token }; 
            }
            // console.log("session  is : " , session)
            return session;
        }
    }
});

export { handler as GET, handler as POST };  