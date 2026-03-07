import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "./prisma";

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/login",
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) return null;

                // In a real app, verify password hash here
                // For the sake of this plan, we'll return a mock user
                const user = await prisma.user.findUnique({
                    where: { email: credentials.email },
                });

                if (user) {
                    return {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        image: user.image,
                    };
                }

                return null;
            },
        }),
    ],
    callbacks: {
        async session({ token, session }) {
            if (token && session.user) {
                session.user.id = token.id;
                session.user.plan = token.plan;
            }
            return session;
        },
        async jwt({ token, user }) {
            const dbUser = await prisma.user.findFirst({
                where: { email: token.email },
            });

            if (!dbUser) {
                if (user) token.id = user.id;
                return token;
            }

            return {
                id: dbUser.id,
                name: dbUser.name,
                email: dbUser.email,
                picture: dbUser.image,
                plan: dbUser.plan,
            };
        },
    },
};
