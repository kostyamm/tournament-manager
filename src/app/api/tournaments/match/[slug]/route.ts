import { getTournamentById } from '@/prisma/prisma-actions';
import { prisma } from '@/prisma/prisma-client';
import { Match, MatchParticipant, Participant, ScoringSystem, Tournament, TournamentStatus } from '@prisma/client';
import { UpdateMatchBody } from '@/prisma/prisma-types';

export async function POST(request: Request, { params }: { params: Promise<{ slug: string }> }) {
    const slug = (await params).slug;
    const matchId = Number(slug);
    const body = await request.json() as UpdateMatchBody;

    if (!body.participant && !body.draw) {
        return Response.json({}, {
            status: 400,
            statusText: 'The "participant" or "draw" field is required',
        });
    }

    const match = await prisma.match.findUnique({
        where: { id: matchId },
        include: {
            matchParticipants: { include: { participant: true } },
            tournament: true,
        },
    });

    if (!match) {
        return Response.json(
            {},
            { status: 404, statusText: `Match ${slug} not found` },
        );
    }

    try {
        const updates = await getMatchUpdates({
            match,
            winnerId: body.participant?.id,
            isDraw: body.draw === true
        });

        await prisma.$transaction(updates);

        const result = await getTournamentById(match.tournamentId);

        return Response.json(result);
    } catch (error) {
        console.log(error);
        return Response.json({}, {
            status: 500,
            statusText: 'Error in match update',
        });
    }
}

const getMatchUpdates = async ({ match, winnerId, isDraw }: {
    match: Match & {
        tournament: Tournament;
        matchParticipants: Array<MatchParticipant & { participant: Participant }>
    };
    winnerId?: number;
    isDraw: boolean;
}) => {
    const tournamentStatus = await getTournamentStatus({
        tournamentId: match.tournamentId,
        updatedMatch: {
            id: match.id,
            winnerId,
            isDraw,
        },
    });

    const updates = [];

    match.matchParticipants.forEach((mp) => {
        const isWinner = !isDraw && mp.participantId === winnerId;
        const scoreDelta = getScoreDelta({ isDraw, isWinner, scoringSystem: match.tournament.scoringSystem });

        const previousScore = mp.score ?? 0;
        const participantPrevScore = mp.participant.score;

        const updatedParticipantScore = participantPrevScore - previousScore + scoreDelta;

        updates.push(
            prisma.matchParticipant.update({
                where: { id: mp.id },
                data: { score: scoreDelta, isWinner },
            }),
            prisma.participant.update({
                where: { id: mp.participantId },
                data: { score: updatedParticipantScore },
            }),
        );
    });

    updates.push(
        prisma.match.update({
            where: { id: match.id },
            data: { winnerId, isDraw },
        })
    );

    updates.push(
        prisma.tournament.update({
            where: { id: match.tournamentId },
            data: { status: tournamentStatus },
        })
    );

    return updates;
};

const getTournamentStatus = async ({
    tournamentId,
    updatedMatch,
}: {
    tournamentId: number;
    updatedMatch: { id: number; winnerId?: number; isDraw?: boolean };
}): Promise<TournamentStatus> => {
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

const getScoreDelta = ({
    isDraw,
    isWinner,
    scoringSystem,
}: {
    isDraw: boolean;
    isWinner: boolean;
    scoringSystem: ScoringSystem;
}) => {
    const scoring = ScoreMap[scoringSystem];

    if (isDraw) return scoring.draw;
    return isWinner ? scoring.victory : scoring.defeat;
};

const ScoreMap: { [key in ScoringSystem]: { victory: number, defeat: number, draw: number } } = {
    [ScoringSystem.CLASSIC]: { victory: 3, defeat: 0, draw: 1 },
    [ScoringSystem.CHESS]: { victory: 1, defeat: 0, draw: 0.5 },
    [ScoringSystem.TWO_POINT]: { victory: 2, defeat: 0, draw: 1 },
};
