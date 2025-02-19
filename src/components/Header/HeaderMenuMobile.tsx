'use client'

import {
    DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem,
    DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { LogOut, Menu } from 'lucide-react';
import { MENU_ITEMS } from '@/components/Header';
import Link from 'next/link';
import { signOut } from 'next-auth/react';

export const HeaderMenuMobile = () => (
    <div className="block md:hidden">
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline">
                    <Menu />
                    Menu
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="bottom" align="end" className="min-w-[260px]">
                <DropdownMenuLabel>Navigation</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    {MENU_ITEMS.map(({ href, name, Icon }, index) => (
                        <DropdownMenuItem asChild key={index} className="h-10">
                            <Link href={href} className="w-full">{Icon}{name}</Link>
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => signOut()} className="text-destructive">
                    <LogOut />
                    Log out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    </div>
);