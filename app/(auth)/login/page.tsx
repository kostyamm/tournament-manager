'use client';

import { Button } from '@nextui-org/button';
import { signIn, SignInOptions } from 'next-auth/react';

export default function Login({ searchParams }: { searchParams?: { callbackUrl: string } }) {
    const handleAuth = () => {
        const signInOptions: SignInOptions = {
            redirect: true,
            callbackUrl: searchParams?.callbackUrl || '/tournaments',
        };

        signIn('google', signInOptions);
    };

    return <Button onClick={handleAuth}>Sign In</Button>;
};
