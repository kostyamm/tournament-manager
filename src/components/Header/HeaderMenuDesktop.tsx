'use client'

import { usePathname } from 'next/navigation';
import { MENU_ITEMS } from '@/components/Header/menuItems';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { LogOut } from 'lucide-react';

export const HeaderMenuDesktop = () => {
    const pathname = usePathname();
    const checkActive = (href: string) => pathname.endsWith(href);

    return (
        <div className={cn(
            'hidden md:flex',
            'h-full items-center gap-4'
        )}>
            <div className="h-full">
                {MENU_ITEMS.map(({ href, name }, index) => (
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
    );
};