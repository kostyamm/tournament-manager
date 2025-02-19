import { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from 'next';
import { NextAuthOptions, getServerSession, Session } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { prisma } from '@/prisma/prisma-client';

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
    ],
    pages: {
        signIn: '/login',
    },
    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60,
    },
    callbacks: {
        redirect: async ({ url, baseUrl }) => {
            return url.startsWith(baseUrl) ? url : baseUrl;
        },
        signIn: async ({ user }) => {
            const { name, email } = user;

            const userData = await prisma.user.findUnique({ where: { email: email! } });

            if (!userData) {
                await prisma.user.create({
                    data: {
                        email: email!,
                        name: name!,
                    },
                }).catch((e) => console.log(e));
            }

            return true;
        },
        session: async ({ session, user, token }) => {
            const userData = await prisma.user.findUnique({
                where: { email: session.user?.email || '' },
            });

            return {
                ...session,
                token: token.accessToken,
                user: {
                    ...session.user,
                    id: userData?.id || user.id,
                    token: token.accessToken,
                },
            };
        },
    },
};

export const auth = (  // <-- use this function to access the jwt from React components
    ...args:
        | [GetServerSidePropsContext['req'], GetServerSidePropsContext['res']]
        | [NextApiRequest, NextApiResponse]
        | []
): Promise<Session & { token: string } | null> => {
    return getServerSession(...args, authOptions);
};
