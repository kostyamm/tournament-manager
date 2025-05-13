import { Prisma } from '@prisma/client';

export const createRoundRobinMatches = async (tx: Prisma.TransactionClient, tournamentId: number) => {
    const participants = await tx.participant.findMany({ where: { tournamentId } });

    const round = await tx.round.create({
        data: {
            tournamentId,
            number: 1,
        },
    });

    for (let i = 0; i < participants.length; i++) {
        for (let j = i + 1; j < participants.length; j++) {
            const match = await tx.match.create({
                data: {
                    tournamentId,
                    roundId: round.id,
                    date: new Date(),
                },
            });

            await tx.matchParticipant.createMany({
                data: [
                    { matchId: match.id, participantId: participants[i].id },
                    { matchId: match.id, participantId: participants[j].id },
                ],
            });
        }
    }
};