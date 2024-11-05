import useSWR, { Fetcher } from 'swr';
import { TournamentResponse } from '@/prisma/prisma-types';
import { fetcher } from '@/services/fetcher';

const fetchTournament: Fetcher<TournamentResponse, Array<string | number>> = ([_, id]) => fetcher(`/tournaments/${id}`);

export const useSWRTournament = (id: number, fallbackData: TournamentResponse) => {
    return useSWR(
        ['/tournaments', id],
        fetchTournament,
        { fallbackData },
    )
}