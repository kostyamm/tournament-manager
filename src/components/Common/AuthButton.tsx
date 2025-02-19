'use client';

import { signIn, SignInOptions } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export const AuthButton = ({ callbackUrl }: { callbackUrl?: string }) => {
    const handleAuth = () => {
        const signInOptions: SignInOptions = {
            redirect: true,
            callbackUrl: callbackUrl || '/tournaments',
        };

        signIn('google', signInOptions);
    };

    return (
        <Button onClick={handleAuth} variant="outline" size="lg" className="rounded-full">
            <Image
                src='/g_logo.svg'
                style={{ width: 18, height: 18 }}
                alt="Sign in With Google"
            />
            Sign in With Google
        </Button>
    )
};
