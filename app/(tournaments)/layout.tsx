import { Fragment, ReactNode } from 'react';
import { Header } from '@/components/Header';

export default function TournamentLayout({ children }: Readonly<{ children: ReactNode; }>) {
    return (
        <Fragment>
            <Header />
            <main>
                {children}
            </main>
        </Fragment>
    );
}
