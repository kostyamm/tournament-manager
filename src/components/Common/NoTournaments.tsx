import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const NoTournaments = () => {
    return (
        <Card className="container-half adaptive-card flex flex-col text-center gap-4">
            <h2 className="font-bold">No tournaments yet</h2>
            <p className="text-foreground/80">Create your first tournament <br /> to get started</p>
            <div className="mt-2">
                <Button asChild>
                    <Link href="/tournaments/create">Create Tournament</Link>
                </Button>
            </div>
        </Card>
    );
};