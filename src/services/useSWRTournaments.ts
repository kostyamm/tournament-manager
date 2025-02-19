import useSWR, { Fetcher } from 'swr';
import { TournamentResponse } from '@/prisma/prisma-types';
import { fetcher } from '@/services/fetcher';

const fetchTournamentById: Fetcher<TournamentResponse, Array<string | number>> = ([_, id]) => fetcher(`/tournaments/${id}`);
export const useSWRTournamentById = (id: number, fallbackData: TournamentResponse) => {
    return useSWR(
        ['/tournaments', id],
        fetchTournamentById,
        { fallbackData },
    );
};

const fetchTournaments: Fetcher<Array<TournamentResponse>, string> = () => fetcher(`/tournaments`);
export const useSWRTournaments = (fallbackData: Array<TournamentResponse>) => {
    return useSWR(
        '/tournaments',
        fetchTournaments,
        { fallbackData },
    );
};