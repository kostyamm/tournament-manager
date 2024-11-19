import { prisma } from '@/prisma/prisma-client';
import { GetTournamentById } from '@/prisma/prisma-types';

export const getTournamentById: GetTournamentById = async (tournamentId) => {
    return prisma.tournament.findUnique({
        where: { id: tournamentId },
        include: {
            participants: {
                orderBy: { id: 'asc' },
            },
            matches: {
                orderBy: { id: 'asc' },
                include: { opponentA: true, opponentB: true },
            },
        },
    });
};

export const generateRoundRobinMatches = async (tournamentId: number) => {
    const allParticipants = await prisma.participant.findMany({
        where: { tournamentId },
    });

    const matchesData = [];
    for (let i = 0; i < allParticipants.length; i++) {
        for (let j = i + 1; j < allParticipants.length; j++) {
            matchesData.push({
                tournamentId: tournamentId,
                opponentAId: allParticipants[i].id,
                opponentBId: allParticipants[j].id,
                date: new Date(),
            });
        }
    }

    return matchesData;
};