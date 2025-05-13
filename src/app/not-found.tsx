import Link from 'next/link';
import { Fragment } from 'react';
import { Header } from '@/components/Header';

export default function NotFound() {
    return (
        <Fragment>
            <Header />
            <main className="flex flex-col gap-2">
                <h1>404</h1>
                <p className="text-lg md:text-2xl mb-2 md:mb-4">This page could not be found</p>
                <Link href="/" className="text-blue-500 hover:underline">
                    Go to home
                </Link>
            </main>
        </Fragment>
    );
}