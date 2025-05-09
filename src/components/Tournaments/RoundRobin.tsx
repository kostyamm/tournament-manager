'use client';

import { ClientApi } from '@/services/ClientApi';
import { Winner } from '@prisma/client';
import { RoundRobinMatch } from '@/components/Tournaments/RoundRobinMatch';
import { TournamentResponse } from '@/prisma/prisma-types';
import { useParams } from 'next/navigation';
import useSWR from 'swr';

export const RoundRobin = () => {
    const { slug } = useParams<{ slug: string }>()
    const { data, mutate } = useSWR<TournamentResponse>(`/tournaments/${slug}`);

    const handleWinner = async (matchId: number, winner: Winner) => {
        const result = await ClientApi.updateTournamentMatch(matchId, { winner });

        await mutate(result);
    };

    if (!data) {
        return null
    }

    return (
        <div className="container-half flex flex-col gap-8">
            {data.matches.map((match) => <RoundRobinMatch key={match.id} match={match} handleWinner={handleWinner} />)}
        </div>
    );
};
