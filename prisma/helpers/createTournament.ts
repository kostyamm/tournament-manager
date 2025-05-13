import { TournamentCreateSchema } from '@/app/api/tournaments/route.schema';
import { Tournament, TournamentType } from '@prisma/client';
import { prisma } from '@/prisma/prisma-client';
import { createRoundRobinMatches } from '@/prisma/helpers/createRoundRobinMatches';

export const createTournament = async (body: TournamentCreateSchema, creatorId: number): Promise<Tournament> => {
    const { participants, name, type, scoringSystem } = body;

    return prisma.$transaction(async (tx) => {
        const tournament = await tx.tournament.create({
            data: { name, creatorId, type, scoringSystem, totalParticipants: participants.length },
        });

        const participantsData = participants.map(({ name }) => ({ name, tournamentId: tournament.id }));
        await tx.participant.createMany({ data: participantsData });

        switch (type) {
            case TournamentType.ROUND_ROBIN:
                await createRoundRobinMatches(tx, tournament.id);
                break;

            // case TournamentType.SINGLE_ELIMINATION:
            //     await createSingleEliminationMatches(tx, tournament.id);
            //     break;

            default:
                throw new Error(`Tournament type ${type} is not supported yet`);
        }

        return tournament;
    });
};