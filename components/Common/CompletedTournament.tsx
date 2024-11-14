'use client';

import { TournamentResponse } from '@/prisma/prisma-types';
import { TournamentStatus } from '@prisma/client';
import { useParams } from 'next/navigation';
import useSWR from 'swr';
import { Card } from '@/components/ui/card';
import { Crown } from 'lucide-react';
import { getTournamentLeaders } from '@/helpers/leaders';
import { ScoreList } from '@/components/ScoreList';

export const CompletedTournament = () => {
    const { slug } = useParams<{ slug: string }>();
    const { data: tournament } = useSWR<TournamentResponse>(`/tournaments/${slug}`);
    const isCompleted = tournament?.status === TournamentStatus.COMPLETED;

    if (!tournament || !isCompleted) {
        return null;
    }

    const leaders = getTournamentLeaders(tournament.participants);

    if (leaders.length === 1) {
        const leader = leaders[0];

        return (
            <Card className="container-half adaptive-card block-indent flex flex-col items-center gap-4 text-center">
                <div className="flex items-center gap-1">
                    <Crown className="text-primary" />
                    <h2 className=" text-primary">{leader.name}</h2>
                </div>
                <p>Won with {leader.score} points</p>
            </Card>
        );
    }

    return (
        <Card className="container-half adaptive-card block-indent">
            <div className="flex flex-col items-center gap-2">
                <h2 className="text-primary font-bold">Tournament Draw</h2>
                <h3 className="font-bold">Leaders</h3>
                <ScoreList participants={leaders} withIcon />
            </div>
        </Card>
    );
};
