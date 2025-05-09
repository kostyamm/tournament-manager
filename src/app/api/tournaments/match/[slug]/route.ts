import { getTournamentById } from '@/prisma/prisma-actions';
import { prisma } from '@/prisma/prisma-client';
import { Match, ScoringSystem, TournamentStatus, Winner } from '@prisma/client';

export async function POST(request: Request, { params }: { params: Promise<{ slug: string }> }) {
    const slug = (await params).slug;
    const matchId = Number(slug);
    const body = await request.json();

    if (!body.winner) {
        return Response.json({}, {
            status: 400,
            statusText: 'The "winner" field is required',
        });
    }

    const match = await prisma.match.findUnique({
        where: { id: matchId },
        include: { opponentA: true, opponentB: true, tournament: true },
    });

    if (!match) {
        return Response.json(
            {},
            { status: 404, statusText: `Match ${slug} not found` },
        );
    }

    try {
        const tournamentStatus = await getTournamentStatus(match);
        const { scoreA, scoreB } = getScores(body.winner, match.tournament.scoringSystem);

        const opponentAScore = match.opponentA.score - (match.scoreA || 0) + scoreA
        const opponentBScore = match.opponentB.score - (match.scoreB || 0) + scoreB

        await prisma.match.update({
            where: { id: matchId },
            include: { opponentA: true, opponentB: true },
            data: {
                scoreA,
                scoreB,
                winner: body.winner,
                opponentA: {
                    update: { score: opponentAScore },
                },
                opponentB: {
                    update: { score: opponentBScore },
                },
                tournament: {
                    update: {
                        status: tournamentStatus,
                    },
                },
            },
        });

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

const getTournamentStatus = async (match: Match) => {
    const matches = await prisma.match.findMany({ where: { tournamentId: match.tournamentId } });

    const playedMatches = matches.filter(({ winner }) => !!winner);
    const incrementCurrentMatch = !match.winner ? 1 : 0;
    const isCompleted = (playedMatches.length + incrementCurrentMatch) >= matches.length;

    return isCompleted ? TournamentStatus.COMPLETED : TournamentStatus.IN_PROGRESS;
};

const getScores = (winner: Winner, scoringSystem: ScoringSystem): { scoreA: number, scoreB: number } => {
    const oppositeOpponent = winner === Winner.opponentA ? Winner.opponentB : Winner.opponentA;
    const { victory, defeat, draw } = ScoreMap[scoringSystem];

    if (winner === Winner.Draw) {
        return {
            scoreA: draw,
            scoreB: draw,
        };
    }

    const scores = {
        [Winner.opponentA]: victory,
        [Winner.opponentB]: victory,
    };

    scores[oppositeOpponent] = defeat;

    return {
        scoreA: scores[Winner.opponentA],
        scoreB: scores[Winner.opponentB],
    };
};

const ScoreMap: { [key in ScoringSystem]: { victory: number, defeat: number, draw: number } } = {
    [ScoringSystem.CLASSIC]: { victory: 3, defeat: 0, draw: 1 },
    [ScoringSystem.CHESS]: { victory: 1, defeat: 0, draw: 0.5 },
    [ScoringSystem.TWO_POINT]: { victory: 2, defeat: 0, draw: 1 },
};
