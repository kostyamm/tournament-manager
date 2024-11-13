'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Crown, LogOut, Menu, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { signOut } from 'next-auth/react';
import { HeaderLogo } from '@/components/HeaderLogo';
import { cn } from '@/lib/utils';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem, DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ReactNode } from 'react';

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

export const HeaderBase = ({ children }: { children: ReactNode }) => (
    <nav className="h-[64px] border-b">
        <header className="h-full mx-auto w-full max-w-[1280px] px-4 md:px-6 flex items-center justify-between">
            {children}
        </header>
    </nav>
);

export const Header = () => {
    const pathname = usePathname();

    const checkActive = (href: string) => pathname.endsWith(href);

    return (
        <HeaderBase>
            <HeaderLogo />
            <div className="block md:hidden">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button size="icon" variant="outline">
                            <Menu />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent side="bottom" align="end">
                        {menuItems.map(({ href, name, Icon }, index) => (
                            <DropdownMenuItem asChild key={index}>
                                <div>
                                    {Icon}
                                    <Link href={href}>{name}</Link>
                                </div>
                            </DropdownMenuItem>
                        ))}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => signOut()}>
                            <LogOut />
                            Log out
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className="h-full hidden md:flex items-center gap-4">
                <div className="h-full">
                    {menuItems.map(({ href, name }, index) => (
                        <Button
                            key={index}
                            asChild
                            variant="ghost"
                            className={cn(
                                'font-medium text-sm h-full rounded-none',
                                checkActive(href) && 'text-primary border-b-2 border-primary',
                            )}
                        >
                            <Link href={href}>{name}</Link>
                        </Button>
                    ))}
                </div>
                <div className="h-full border-r" />
                <Button onClick={() => signOut()} variant="link" className="text-foreground">
                    <LogOut size={18} />
                    Log out
                </Button>
            </div>
        </HeaderBase>
    );
};
