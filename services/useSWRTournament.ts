import useSWR, { Fetcher } from 'swr';
import { TournamentWithMatches } from '@/prisma/prisma-types';
import { fetcher } from '@/services/fetcher';

const fetchTournament: Fetcher<TournamentWithMatches, Array<string | number>> = ([_, id]) => fetcher(`/tournaments/${id}`);

export const useSWRTournament = (id: number, fallbackData: TournamentWithMatches) => {
    return useSWR(
        ['/tournaments', id],
        fetchTournament,
        { fallbackData },
    )
}