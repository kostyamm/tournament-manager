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
import { Crown, LogOut, PlusCircle, Trophy } from 'lucide-react';
import { Button } from '@nextui-org/button';
import { signOut } from 'next-auth/react';
import { NavbarProps } from '@nextui-org/react';
import { cn } from '@/lib/utils';

const menuItems = [
    {
        href: '/tournaments',
        name: 'Tournaments',
        Icon: <Crown />,
    },
    {
        href: '/tournaments/create',
        name: 'Create Tournament',
        Icon: <PlusCircle />,
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
                <NavbarBrand>
                    <HeaderLogo />
                </NavbarBrand>
                <NavbarMenuToggle aria-label={isMenuOpen ? 'Close menu' : 'Open menu'} className="md:hidden" />
            </NavbarContent>
            <NavbarContent className="hidden md:flex gap-0" justify="center">
                {menuItems.map(({ href, name }, index) => (
                    <NavbarItem key={index} isActive={checkActive(href)}>
                        <Button
                            as={Link}
                            href={href}
                            variant="light"
                            className={cn(
                                'font-medium text-sm h-full rounded-none',
                                checkActive(href) && 'text-primary',
                            )}
                        >{name}</Button>
                    </NavbarItem>
                ))}
            </NavbarContent>
            <NavbarContent className="hidden md:flex" justify="center">
                <NavbarItem className="border-l border-stone-800 pl-4">
                    <Button onClick={() => signOut()} variant="light" className="h-full rounded-none">
                        <LogOut size={18} />
                        Log out
                    </Button>
                </NavbarItem>
            </NavbarContent>
            <NavbarMenu className="flex flex-col py-6 px-0 gap-6">
                {menuItems.map(({ href, name, Icon }, index) => (
                    <NavbarMenuItem
                        key={index}
                        isActive={checkActive(href)}
                        className="w-full text-xl pb-6 px-8 border-b border-stone-600"
                    >
                        <Link href={href} className="flex items-center gap-4">
                            {Icon}
                            {name}
                        </Link>
                    </NavbarMenuItem>
                ))}

                <NavbarMenuItem className="px-8">
                    <Button onClick={() => signOut()} color="danger" variant="shadow">
                        <LogOut size={18} />
                        Log out
                    </Button>
                </NavbarMenuItem>
            </NavbarMenu>
        </Navbar>
    );
};

const HeaderLogo = () => {
    return (
        <Link href="/" className="text-white flex items-center gap-2">
            <Trophy strokeWidth={1.2} />

            Tournament Manager
        </Link>
    );
};

const havbarClassNames: NavbarProps['classNames'] = {
    wrapper: ['px-4 md:px-6'],
    item: [
        'flex',
        'relative',
        'h-full',
        'items-center',
        'data-[active=true]:after:content-[\'\']',
        'data-[active=true]:after:absolute',
        'data-[active=true]:after:bottom-0',
        'data-[active=true]:after:left-0',
        'data-[active=true]:after:right-0',
        'data-[active=true]:after:h-[2px]',
        'data-[active=true]:after:rounded-[2px]',
        'data-[active=true]:after:bg-primary',
    ],
};