'use client';

import {
    Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter,
    DrawerHeader, DrawerTitle, DrawerTrigger,
} from '@/components/ui/drawer';
import { formatString } from '@/helpers/formatString';
import { Button } from '@/components/ui/button';
import { BookOpenText } from 'lucide-react';
import { TournamentResponse } from '@/prisma/prisma-types';
import { useParams } from 'next/navigation';
import { ScoreList } from '@/components/ScoreList';
import { formatDate } from '@/helpers/formatDate';
import useSWR from 'swr';

export const TournamentStatistics = () => {
    const { slug } = useParams<{ slug: string }>();
    const { data: tournament } = useSWR<TournamentResponse>(`/tournaments/${slug}`);

    if (!tournament) {
        return null;
    }

    return (
        <Drawer>
            <DrawerTrigger asChild>
                <Button size="iconLarge">
                    <BookOpenText />
                </Button>
            </DrawerTrigger>
            <DrawerContent className="border-l-0 border-r-0">
                <div className="mx-auto w-full max-w-3xl">
                    <DrawerHeader className="p-6">
                        <DrawerTitle>Tournament statistics</DrawerTitle>
                        <DrawerDescription>{tournament.name}</DrawerDescription>
                    </DrawerHeader>
                    <div className="px-6 max-h-[calc(100dvh_-_400px)] overflow-y-auto">
                        <TournamentStatisticsContent tournament={tournament} />
                    </div>
                    <DrawerFooter className="p-6">
                        <DrawerClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DrawerClose>
                    </DrawerFooter>
                </div>
            </DrawerContent>
        </Drawer>
    );
};

const TournamentStatisticsContent = ({ tournament }: { tournament: TournamentResponse }) => {
    const { participants, status, createdAt } = tournament;
    return (
        <div className="flex flex-col gap-6">
            <section>
                <h2 className="text-primary text-medium mb-2">Participants score</h2>
                <ScoreList participants={participants} />
            </section>
            <div className="flex items-center justify-between">
                <section>
                    <h2 className="text-primary text-medium mb-2">Status</h2>
                    <p>{formatString(status)}</p>
                </section>
                <section>
                    <h2 className="text-primary text-medium mb-2">Created At</h2>
                    <p>{formatDate(createdAt)}</p>
                </section>
            </div>
        </div>
    );
};