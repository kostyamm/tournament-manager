import { prisma } from '@/prisma/prisma-client';
import { GetTournamentById } from '@/prisma/prisma-types';
import { auth } from '@/configs/authOptions';

export const getTournamentById: GetTournamentById = async (tournamentId) => {
    const session = await auth();
    const creatorId = session?.user.id;

    if (!creatorId) {
        console.error('User id is missing');
        return null
    }

    return prisma.tournament.findUnique({
        where: { id: tournamentId, creatorId },
        include: {
            participants: {
                orderBy: { id: 'asc' },
            },
            matches: {
                orderBy: { id: 'asc' },
                include: {
                    matchParticipants: {
                        include: {
                            participant: true,
                        },
                    },
                    winner: true,
                    round: true,
                },
            },
        },
    });
};
