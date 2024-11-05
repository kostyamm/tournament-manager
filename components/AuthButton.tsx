'use client';

import { signIn, SignInOptions } from 'next-auth/react';
import { Button } from '@nextui-org/button';
import GLogo from '@/public/g_logo.svg';
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
        <Button onClick={handleAuth} variant="bordered" className="rounded-full" size="lg">
            <Image
                src={GLogo}
                style={{ width: 18, height: 18 }}
                alt="Sign in With Google"
            />
            Sign in With Google
        </Button>
    )
};
