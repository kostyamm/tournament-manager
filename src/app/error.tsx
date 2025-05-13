'use client'; // Error boundaries must be Client Components

import { Button } from '@/components/ui/button';
import { Header } from '@/components/Header';
import { Fragment } from 'react';

export default function ErrorPage({ error, reset }: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    return (
        <Fragment>
            <Header />
            <main className="flex flex-col gap-2">
                <h1 className="text-destructive">Something went wrong!</h1>
                <p className="text-lg md:text-2xl mb-2 md:mb-4">{`${error}`}</p>
                <Button
                    size="lg"
                    className="w-full md:w-fit"
                    onClick={reset}
                    variant="destructive"
                >
                    Try again
                </Button>
            </main>
        </Fragment>
    );
};
