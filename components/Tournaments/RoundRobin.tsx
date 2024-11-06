'use client';

import { ClientSideApi } from '@/services/ClientSideApi';
import { Winner } from '@prisma/client';
import { RoundRobinMatch } from '@/components/Tournaments/RoundRobinMatch';
import { TournamentResponse } from '@/prisma/prisma-types';
import { useParams } from 'next/navigation';
import useSWR from 'swr';

export const RoundRobin = () => {
    const { slug } = useParams<{ slug: string }>()
    const { data, mutate } = useSWR<TournamentResponse>(`/tournaments/${slug}`);

    const handleWinner = async (matchId: number, winner: Winner) => {
        const result = await ClientSideApi.updateTournamentMatch(matchId, {
            ...ScoreMap[winner],
            winner,
        });

        await mutate(result);
    };

    if (!data) {
        return null
    }

    return (
        <div className="flex flex-col gap-8">
            {data.matches.map((match) => <RoundRobinMatch key={match.id} match={match} handleWinner={handleWinner} />)}
        </div>
    );
};

const ScoreMap: { [key in Winner]: { scoreA: number, scoreB: number } } = {
    [Winner.opponentA]: {
        scoreA: 3,
        scoreB: 0,
    },
    [Winner.opponentB]: {
        scoreA: 0,
        scoreB: 3,
    },
    [Winner.Draw]: {
        scoreA: 1,
        scoreB: 1,
    },
};
