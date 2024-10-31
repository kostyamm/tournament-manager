import { prisma } from '@/prisma/prisma-client';
import { TournamentType } from '@prisma/client';
import { GenerateTournament, GetTournamentById } from '@/prisma/prisma-types';

export const getTournaments = async () => {
    return prisma.tournament.findMany();
};

export const getTournamentById: GetTournamentById = async (tournamentId) => {
    return prisma.tournament.findUnique({
        where: { id: tournamentId },
        include: {
            participants: true,
            matches: {
                include: { opponentA: true, opponentB: true },
            },
        },
    });
};

export const generateTournament: GenerateTournament = async ({ creatorId, name, type, participants }) => {
    if (type !== TournamentType.ROUND_ROBIN) {
        return;
    }

    const tournament = await prisma.tournament.create({
        data: { name, type, creatorId, totalParticipants: participants.length },
    });

    const participantsData = participants.map((name) => ({
        name,
        tournamentId: tournament.id,
    }));

    await prisma.participant.createMany({
        data: participantsData,
    });

    const matchesData = await generateRoundRobinMatches(tournament.id);

    await prisma.match.createMany({
        data: matchesData,
    });

    return { tournamentId: tournament.id };
};

const generateRoundRobinMatches = async (tournamentId: number) => {
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