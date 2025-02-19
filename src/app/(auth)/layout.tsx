import { Fragment, ReactNode } from 'react';
import { HeaderLogo, HeaderWrapper } from '@/components/Header';

export default function AuthLayout({ children }: Readonly<{ children: ReactNode; }>) {
    return (
        <Fragment>
            <HeaderWrapper>
                <HeaderLogo />
            </HeaderWrapper>
            <main className="p-10">
                {children}
            </main>
        </Fragment>
    );
}
