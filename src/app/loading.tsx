import { Fragment } from 'react';
import { Header } from '@/components/Header';

export default function Loading() {
    return (
        <Fragment>
            <Header />
            <main>
                <div>Loading...</div>
            </main>
        </Fragment>
);
}