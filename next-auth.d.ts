/// <reference types="next" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
// see https://nextjs.org/docs/app/building-your-application/configuring/typescript for more information.

import type { DefaultSession, AuthOptions } from 'next-auth';
import { DefaultJWT } from 'next-auth/src/jwt/types';

declare module 'next-auth/next' {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    type Session = { id: number } & DefaultSession['user']

    type NextAuthOptions = AuthOptions
    type NextDefaultSession = DefaultSession
    type NextDefaultJWT = DefaultJWT
}