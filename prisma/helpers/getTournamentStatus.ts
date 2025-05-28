import { TournamentStatus, TournamentType } from '@prisma/client';
import { prisma } from '@/prisma/prisma-client';

type GetTournamentStatusOptions = {
    tournamentId: number;
    tournamentType: TournamentType;
    updatedMatch: { id: number; winnerId?: number; isDraw?: boolean };
}
type GetTournamentStatus = (options: GetTournamentStatusOptions) => Promise<TournamentStatus>

export const getTournamentStatus: GetTournamentStatus = async ({ tournamentId, tournamentType, updatedMatch }) => {
    if (tournamentType !== TournamentType.ROUND_ROBIN) {
        /* For grid types of tournaments, the COMPLETED status is set when creating a round */
        return TournamentStatus.IN_PROGRESS
    }

    const matches = await prisma.match.findMany({
        where: { tournamentId },
        select: {
            id: true,
            winnerId: true,
            isDraw: true,
        },
    });

    const total = matches.length;

    const played = matches.reduce((count, match) => {
        const isCurrent = match.id === updatedMatch.id;

        const winnerId = isCurrent ? updatedMatch.winnerId : match.winnerId;

        const isDraw = isCurrent ? updatedMatch.isDraw : match.isDraw;

        return count + (winnerId !== null || isDraw === true ? 1 : 0);
    }, 0);

    return played >= total ? TournamentStatus.COMPLETED : TournamentStatus.IN_PROGRESS;
};
