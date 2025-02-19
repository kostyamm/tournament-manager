import { Crown, PlusCircle } from 'lucide-react';
import { ReactNode } from 'react';

export const MENU_ITEMS: Array<{
    href: string;
    name: string;
    Icon: ReactNode;
}> = [
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