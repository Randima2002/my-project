import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const handler = NextAuth({
    session:{
        strategy:"jwt",
    },
    pages:{
        signIn:'/login'
    },
    providers: [
        CredentialsProvider({

            credentials: {
                email: {},
                password: {}
            },
            async authorize(credentials, req) {
                const user = await prisma.user.findUnique({
                    where: { email:credentials.email },
                });
                
                // console.log(user);

                if (user && credentials.password) {
                    const isValid = credentials.password === user.password;
                    

                    if (isValid) {
                        return {
                            id: user.id,
                            email: user.email,
                            role: user.role
                        };
                    }
                }

                // If user is not found or password is incorrect, return null
                return null;
            }
        })
    ]
})

export { handler as GET, handler as POST };  