import {
    Match,
    MatchParticipant,
    Participant,
    Prisma,
    Round,
    Tournament,
    TournamentStatus,
    TournamentType,
} from '@prisma/client';
import { prisma } from '@/prisma/prisma-client';
import { getMatchScore, getTournamentStatus } from '@/prisma/helpers';

type UpdateTournamentMatchProps = {
    match: Match & {
        tournament: Tournament;
        matchParticipants: Array<MatchParticipant & { participant: Participant }>;
        round: Round | null;
    };
    winnerId?: number;
    isDraw: boolean;
}
type UpdateTournamentMatch = (options: UpdateTournamentMatchProps) => Promise<void>

type UpdateTournamentMatchTx = (options: UpdateTournamentMatchProps & { tx: Prisma.TransactionClient }) => Promise<void>

export const updateTournamentMatch: UpdateTournamentMatch = async ({ match, winnerId, isDraw }) => {
    await prisma.$transaction(async (tx) => {
        await updateTournamentMatchTx({ tx, match, winnerId, isDraw });
    });
};

const updateTournamentMatchTx: UpdateTournamentMatchTx = async ({ tx, match, winnerId, isDraw }) => {
    const nextRound = await tx.round.findFirst({
        where: {
            tournamentId: match.tournamentId,
            number: (match.round?.number ?? 0) + 1,
        },
        include: {
            matches: true,
        },
    });

    if (nextRound && nextRound.matches.length > 0) {
        throw new Error('You can not change the winner: the next round has already started');
    }

    const tournamentStatus = await getTournamentStatus({
        tournamentId: match.tournamentId,
        tournamentType: match.tournament.type,
        updatedMatch: { id: match.id, winnerId, isDraw },
    });

    for (const mp of match.matchParticipants) {
        const isWinner = !isDraw && mp.participantId === winnerId;
        const scoreDelta = getMatchScore({ isDraw, isWinner, scoringSystem: match.tournament.scoringSystem });

        const previousScore = mp.score ?? 0;
        const participantPrevScore = mp.participant.score;

        const updatedParticipantScore = participantPrevScore - previousScore + scoreDelta;

        await tx.matchParticipant.update({
            where: { id: mp.id },
            data: { score: scoreDelta, isWinner },
        });
        await tx.participant.update({
            where: { id: mp.participantId },
            data: { score: updatedParticipantScore },
        });
    }

    await tx.match.update({
        where: { id: match.id },
        data: { winnerId, isDraw },
    });
    await tx.tournament.update({
        where: { id: match.tournamentId },
        data: { status: tournamentStatus },
    });

    if (match.tournament.type === TournamentType.SINGLE_ELIMINATION) {
        await generateNextRound(tx, match.tournamentId);
    }
};

const generateNextRound = async (tx: Prisma.TransactionClient, tournamentId: number): Promise<void> => {
    const rounds = await tx.round.findMany({
        where: { tournamentId },
        include: {
            matches: {
                include: { matchParticipants: true },
            },
        },
        orderBy: { number: 'asc' },
    });

    const lastRound = rounds.at(-1);
    if (!lastRound) return;

    const isCompleted = lastRound.matches.every((match) => match.winnerId !== null || match.isDraw === true);

    if (!isCompleted) return;

    const winners = lastRound.matches
        .map((m) => m.winnerId)
        .filter((id) => id !== null);

    if (winners.length === 1) {
        await tx.tournament.update({
            where: { id: tournamentId },
            data: { status: TournamentStatus.COMPLETED },
        });
        return;
    }

    if (winners.length === 0) {
        throw new Error('No winners found to generate the next round');
    }

    const newRound = await tx.round.create({
        data: {
            tournamentId,
            number: lastRound.number + 1,
        },
    });

    for (let i = 0; i < winners.length; i += 2) {
        const p1 = winners[i];
        const p2 = winners[i + 1];

        const match = await tx.match.create({
            data: {
                tournamentId,
                roundId: newRound.id,
                date: new Date(),
            },
        });

        const participants = [{ matchId: match.id, participantId: p1 }];
        if (p2 !== undefined) {
            participants.push({ matchId: match.id, participantId: p2 });
        }

        await tx.matchParticipant.createMany({ data: participants });

        if (p2 === undefined) {
            await autoWin({
                tx,
                matchId: match.id,
                winnerId: p1,
            });
        }
    }
};

export const autoWin = async ({ tx, matchId, winnerId }: {
    tx: Prisma.TransactionClient;
    matchId: number;
    winnerId: number;
}): Promise<void> => {
    const match = await tx.match.findUnique({
        where: { id: matchId },
        include: {
            matchParticipants: {
                include: { participant: true },
            },
            tournament: true,
            round: true,
        },
    });

    if (!match) {
        throw new Error(`Match with ID ${matchId} not found`);
    }

    await updateTournamentMatchTx({
        tx,
        match,
        winnerId,
        isDraw: false,
    });
};