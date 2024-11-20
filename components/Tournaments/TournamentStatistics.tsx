'use client';

import {
    Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter,
    DrawerHeader, DrawerTitle, DrawerTrigger,
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { BookOpenText } from 'lucide-react';
import { TournamentResponse } from '@/prisma/prisma-types';
import { useParams } from 'next/navigation';
import { ScoreList } from '@/components/ScoreList';
import { formatDate } from '@/helpers/formatDate';
import useSWR from 'swr';
import { useBreakpoint } from '@/hooks/useBreakpoint';
import {
    Dialog,
    DialogContent,
    DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { useState } from 'react';
import { SCORING_SYSTEM } from '@/constants/options';

export const TournamentStatistics = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { isMobile } = useBreakpoint();
    const { slug } = useParams<{ slug: string }>();
    const { data: tournament } = useSWR<TournamentResponse>(`/tournaments/${slug}`);

    if (!tournament) {
        return null;
    }

    if (!isMobile) {
        return (
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                    <Button size="iconLarge">
                        <BookOpenText />
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Tournament statistics</DialogTitle>
                        <DialogDescription>{tournament.name}</DialogDescription>
                    </DialogHeader>
                    <TournamentStatisticsContent tournament={tournament} />
                    <DialogFooter>
                        <Button variant="secondary" onClick={() => setIsOpen(false)}>
                            Close
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        );
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
                    <div className="px-6">
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
    const { participants, scoringSystem, createdAt } = tournament;
    const scoring = SCORING_SYSTEM.find(({ key }) => key === scoringSystem);

    return (
        <div className="flex flex-col gap-6">
            <section>
                <h2 className="text-primary text-medium mb-2">Participants score</h2>
                <div className="max-h-[calc(100dvh_-_500px)] overflow-y-auto px-6 mx-[-24px]">
                    <ScoreList participants={participants} />
                </div>
            </section>
            <div className="flex items-center justify-between">
                <section>
                    <h2 className="text-primary text-medium mb-2">Scoring system</h2>
                    <p>{scoring?.label}</p>
                </section>
                <section>
                    <h2 className="text-primary text-medium mb-2">Created At</h2>
                    <p>{formatDate(createdAt)}</p>
                </section>
            </div>
        </div>
    );
};