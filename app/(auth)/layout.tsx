import { Fragment, ReactNode } from 'react';
import { Navbar, NavbarBrand, NavbarContent } from '@nextui-org/navbar';
import { HeaderLogo } from '@/components/HeaderLogo';

export default function AuthLayout({ children }: Readonly<{ children: ReactNode; }>) {
    return (
        <Fragment>
            <NotAuthenticatedHeader />
            <main className="p-10">
                {children}
            </main>
        </Fragment>
    );
}

const NotAuthenticatedHeader = () => {
    return (
        <Navbar
            maxWidth="xl"
            isBordered
            isBlurred
        >
            <NavbarContent>
                <NavbarBrand>
                    <HeaderLogo />
                </NavbarBrand>
            </NavbarContent>
        </Navbar>
    );
};
