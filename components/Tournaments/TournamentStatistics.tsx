'use client';

import { formatString } from '@/helpers/formatString';
import { Participant, TournamentStatus } from '@prisma/client';
import { Button } from '@/components/ui/button';
import { BookOpenText } from 'lucide-react';
import { TournamentResponse } from '@/prisma/prisma-types';
import { useParams } from 'next/navigation';
import useSWR from 'swr';
import { ScoreList } from '@/components/ScoreList';
import {
    Drawer, DrawerClose,
    DrawerContent,
    DrawerDescription, DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from '@/components/ui/drawer';

export const TournamentStatistics = () => {
    const { slug } = useParams<{ slug: string }>()
    const { data } = useSWR<TournamentResponse>(`/tournaments/${slug}`);

    if (!data) {
        return null
    }

    const { participants, status } = data;

    return (
        <Drawer>
            <DrawerTrigger asChild>
                <Button size="icon">
                    <BookOpenText />
                </Button>
            </DrawerTrigger>
            <DrawerContent className="border-l-0 border-r-0">
                <div className="mx-auto w-full max-w-3xl">
                    <DrawerHeader className="p-6">
                        <DrawerTitle>Tournament statistics</DrawerTitle>
                        <DrawerDescription>{data.name}</DrawerDescription>
                    </DrawerHeader>
                    <div className="p-6 pb-0 max-h-[calc(100dvh_-_400px)] overflow-y-auto">
                        <TournamentStatisticsContent participants={participants} status={status} />
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

const TournamentStatisticsContent = ({ participants, status }: {
    participants: Array<Participant>;
    status: TournamentStatus;
}) => {
    return (
        <div className="flex flex-col gap-4">
            <section>
                <h2 className="text-primary text-medium mb-2">Status</h2>
                <p>{formatString(status)}</p>
            </section>
            <section>
                <h2 className="text-primary text-medium mb-2">Participants score</h2>
                <ScoreList participants={participants} />
            </section>
        </div>
    );
};