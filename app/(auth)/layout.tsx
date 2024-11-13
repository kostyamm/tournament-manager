import { Fragment, ReactNode } from 'react';
import { HeaderLogo } from '@/components/HeaderLogo';
import { HeaderBase } from '@/components/Header';

export default function AuthLayout({ children }: Readonly<{ children: ReactNode; }>) {
    return (
        <Fragment>
            <HeaderBase>
                <HeaderLogo />
            </HeaderBase>
            <main className="p-10">
                {children}
            </main>
        </Fragment>
    );
}
