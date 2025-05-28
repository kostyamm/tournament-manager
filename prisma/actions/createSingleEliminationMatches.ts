import { Prisma } from "@prisma/client";
import { autoWin } from '@/prisma/actions/updateTournamentMatch';

export const createSingleEliminationMatches = async (tx: Prisma.TransactionClient, tournamentId: number) => {
    const participants = await tx.participant.findMany({ where: { tournamentId } });

    const round = await tx.round.create({
        data: {
            tournamentId,
            number: 1,
        },
    });

    const shuffled = [...participants].sort(() => Math.random() - 0.5);

    for (let i = 0; i < shuffled.length; i += 2) {
        const pair = shuffled.slice(i, i + 2);

        const match = await tx.match.create({
            data: {
                tournamentId,
                roundId: round.id,
                date: new Date(),
            },
        });

        await tx.matchParticipant.createMany({
            data: pair.map((p) => ({
                matchId: match.id,
                participantId: p.id,
            })),
        });

        if (pair.length === 1) {
            await autoWin({
                tx,
                matchId: match.id,
                winnerId: pair[0].id,
            })
        }
    }
};