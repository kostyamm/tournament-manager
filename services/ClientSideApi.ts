import { GenerateTournament } from '@/prisma/prisma-types';
import { fetcher } from '@/services/fetcher';
import { Match, Tournament } from '@prisma/client';

const createTournament: GenerateTournament = async (data) => {
    return await fetcher('/tournaments', {
        method: 'POST',
        body: JSON.stringify(data),
    });
};

const updateTournament = async (id: number, data: Partial<Tournament>): Promise<Partial<Tournament>> => {
    return await fetcher(`/tournaments/${id}`, {
        method: 'POST',
        body: JSON.stringify(data),
    });
};

const updateMatch = async (id: number, data: Partial<Match>): Promise<Partial<Match>> => {
    return await fetcher(`/tournaments/match/${id}`, {
        method: 'POST',
        body: JSON.stringify(data),
    });
};

export const ClientSideApi = {
    createTournament,
    updateTournament,
    updateMatch
};
