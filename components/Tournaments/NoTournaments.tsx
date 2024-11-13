import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const NoTournaments = () => {
    return (
        <Card className="p-6 flex flex-col text-center gap-4 max-w-3xl mx-auto">
            <h2>No tournaments yet</h2>
            <p>Create your first tournament to get started</p>
            <div className="mt-2">
                <Button asChild>
                    <Link href="/tournaments/create">Create Tournament</Link>
                </Button>
            </div>
        </Card>
    );
};