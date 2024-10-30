'use client';

import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    NavbarMenu,
    NavbarMenuItem,
    NavbarMenuToggle,
} from '@nextui-org/navbar';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Trophy } from 'lucide-react';
import { Button } from '@nextui-org/button';

const menuItems = [
    {
        href: '/tournaments',
        name: 'Tournaments',
    },
    {
        href: '/tournaments/create',
        name: 'Create Tournament',
    },
];

export const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();

    const checkActive = (href: string) => pathname.endsWith(href);

    const onClose = () => setIsMenuOpen(false);
    const onToggle = () => setIsMenuOpen(v => !v);

    useEffect(() => onClose(), [pathname]);

    return (
        <Navbar
            maxWidth="xl"
            isMenuOpen={isMenuOpen}
            onMenuOpenChange={onToggle}
            isBordered
            isBlurred
        >
            <NavbarContent>
                <NavbarMenuToggle aria-label={isMenuOpen ? 'Close menu' : 'Open menu'} className="sm:hidden" />
                <NavbarBrand>
                    <HeaderLogo />
                </NavbarBrand>
            </NavbarContent>
            <NavbarContent className="hidden sm:flex gap-3" justify="center">
                {menuItems.map(({ href, name }, index) => (
                    <NavbarItem key={index} isActive={checkActive(href)}>
                        <Button
                            as={Link}
                            href={href}
                            size="sm"
                            color={checkActive(href) ? 'primary' : 'default'}
                            className="font-medium text-sm"
                        >{name}</Button>
                    </NavbarItem>
                ))}
            </NavbarContent>
            <NavbarMenu>
                {menuItems.map(({ href, name }, index) => (
                    <NavbarMenuItem key={index} isActive={checkActive(href)}>
                        <Link href={href} className="w-full">
                            {name}
                        </Link>
                    </NavbarMenuItem>
                ))}
            </NavbarMenu>
        </Navbar>
    );
};

const HeaderLogo = () => {
    return (
        <div className="flex gap-2">
            <Trophy strokeWidth={1.2} />
            <Link href="/" className="text-white">Tournament Manager</Link>
        </div>
    );
};
