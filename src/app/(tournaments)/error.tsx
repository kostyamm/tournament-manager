'use client'; // Error boundaries must be Client Components

import { Button } from '@/components/ui/button';

export default function ErrorPage({ error, reset }: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    return (
        <div className="flex flex-col gap-2">
            <h1 className="text-destructive">Something went wrong!</h1>
            <p className="text-lg md:text-2xl mb-8">{`${error}`}</p>
            <Button
                size="lg"
                className="w-full md:w-fit"
                onClick={reset}
                variant="destructive"
            >
                Try again
            </Button>
        </div>
    );
};
