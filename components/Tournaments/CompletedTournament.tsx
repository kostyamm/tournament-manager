'use client';

import { TournamentResponse } from '@/prisma/prisma-types';
import { TournamentStatus } from '@prisma/client';
import { useParams } from 'next/navigation';
import useSWR from 'swr';
import { Card, CardBody } from '@nextui-org/card';
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
            <Card className="py-6 px-2 mb-8 md:mb-10">
                <CardBody className="flex flex-col items-center gap-2 text-center">
                    <div className="flex items-center gap-1">
                    <span className="text-primary">
                        <Crown />
                    </span>
                        <h2 className=" text-primary">{leader.name}</h2>
                    </div>
                    <p>Won with {leader.score} points</p>
                </CardBody>
            </Card>
        );
    }

    return (
        <Card className="py-6 px-2 mb-8 md:mb-10">
            <CardBody className="flex flex-col items-center md:w-[500px] m-auto gap-2">
                <h2 className="text-primary font-bold">Tournament Draw</h2>
                <h3 className="font-bold">Leaders</h3>
                <ScoreList participants={leaders} withIcon />
            </CardBody>
        </Card>
    );
};
