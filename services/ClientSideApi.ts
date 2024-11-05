import { GenerateTournament, TournamentResponse } from '@/prisma/prisma-types';
import { fetcher } from '@/services/fetcher';
import { Match } from '@prisma/client';

const createTournament: GenerateTournament = async (data) => {
    return await fetcher('/tournaments/create', {
        method: 'POST',
        body: JSON.stringify(data),
    });
};


const updateTournamentMatch = async (id: number, data: Partial<Match>): Promise<TournamentResponse> => {
    return await fetcher(`/tournaments/match/${id}`, {
        method: 'POST',
        body: JSON.stringify(data),
    });
};

export const ClientSideApi = {
    createTournament,
    updateTournamentMatch,
};
