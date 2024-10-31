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
import { LogOut, Trophy } from 'lucide-react';
import { Button } from '@nextui-org/button';
import { signOut } from 'next-auth/react';
import { NavbarProps } from '@nextui-org/react';
import { cn } from '@/lib/utils';

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
            classNames={havbarClassNames}
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
            <NavbarContent className="hidden sm:flex gap-6" justify="center">
                {menuItems.map(({ href, name }, index) => (
                    <NavbarItem key={index} isActive={checkActive(href)}>
                        <Link
                            href={href}
                            className={cn(
                                'font-medium text-sm',
                                checkActive(href) && 'text-primary'
                            )}
                        >{name}</Link>
                    </NavbarItem>
                ))}
                <NavbarItem>
                    <Button onClick={() => signOut()} size="sm" variant="faded">
                        <LogOut size={18}/>
                        Log out
                    </Button>
                </NavbarItem>
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

const havbarClassNames: NavbarProps['classNames'] = {
    item: [
        "flex",
        "relative",
        "h-full",
        "items-center",
        "data-[active=true]:after:content-['']",
        "data-[active=true]:after:absolute",
        "data-[active=true]:after:bottom-0",
        "data-[active=true]:after:left-0",
        "data-[active=true]:after:right-0",
        "data-[active=true]:after:h-[2px]",
        "data-[active=true]:after:rounded-[2px]",
        "data-[active=true]:after:bg-primary",
    ],
}