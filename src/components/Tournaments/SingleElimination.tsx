'use client';

import { useParams } from 'next/navigation';
import useSWR from 'swr';
import { TournamentResponse, UpdateMatchBody } from '@/prisma/prisma-types';
import { ClientApi } from '@/services/ClientApi';
import { convertToBracketData } from '@/lib';
import { Bracket } from '@/components/Bracket';

export const SingleElimination = () => {
    const { slug } = useParams<{ slug: string }>();
    const { data, mutate } = useSWR<TournamentResponse>(`/tournaments/${slug}`);

    const handleWinner = async (matchId: number, options: UpdateMatchBody) => {
        const result = await ClientApi.updateTournamentMatch(matchId, options);

        await mutate(result);
    };

    if (!data) {
        return null
    }

    const bracketRounds = convertToBracketData(data);

    return <Bracket rounds={bracketRounds} handleWinner={handleWinner} />;
};
