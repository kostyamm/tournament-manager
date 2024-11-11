import { GenerateTournament, TournamentResponse } from '@/prisma/prisma-types';
import { fetcher } from '@/services/fetcher';
import { Match } from '@prisma/client';

const createTournament: GenerateTournament = async (data) => {
    return await fetcher('/tournaments', {
        method: 'POST',
        body: JSON.stringify(data),
    });
};

const updateTournamentMatch = async (id: string | number, data: Partial<Match>): Promise<TournamentResponse> => {
    return await fetcher(`/tournaments/match/${id}`, {
        method: 'POST',
        body: JSON.stringify(data),
    });
};

const deleteTournament = async (id: string | number): Promise<TournamentResponse> => {
    return await fetcher(`/tournaments/${id}`, {
        method: 'DELETE',
    });
};

export const ClientSideApi = {
    createTournament,
    updateTournamentMatch,
    deleteTournament,
};
