import Link from 'next/link';
import { Trophy } from 'lucide-react';

export const HeaderLogo = () => {
    return (
        <Link href="/tournaments" className="text-foreground text-lg flex items-center gap-2">
            <Trophy strokeWidth={1.2} />

            Tournament Manager
        </Link>
    );
};