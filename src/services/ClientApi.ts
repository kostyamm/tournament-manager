import { CreateTournament, DeleteTournament, UpdateMatch } from '@/prisma/prisma-types';
import { fetcher } from '@/services/fetcher';

const createTournament: CreateTournament = async (data) => {
    return await fetcher('/tournaments', {
        method: 'POST',
        body: JSON.stringify(data),
    });
};

const updateTournamentMatch: UpdateMatch = async (id, data) => {
    return await fetcher(`/tournaments/match/${id}`, {
        method: 'POST',
        body: JSON.stringify(data),
    });
};

const deleteTournament: DeleteTournament = async (id) => {
    return await fetcher(`/tournaments/${id}`, {
        method: 'DELETE',
    });
};

export const ClientApi = {
    createTournament,
    updateTournamentMatch,
    deleteTournament,
};
