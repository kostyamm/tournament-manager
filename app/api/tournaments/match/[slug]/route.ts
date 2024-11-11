import { getTournamentById } from '@/prisma/prisma-actions';
import { prisma } from '@/prisma/prisma-client';
import { Match, TournamentStatus } from '@prisma/client';

/**
 * TODO Required body
 * { scoreA: 0, scoreB: 3, winner: 'opponentB' }
 */
export async function POST(request: Request, { params }: { params: Promise<{ slug: string }> }) {
    const slug = (await params).slug;
    const matchId = Number(slug);
    const body = await request.json();

    const match = await prisma.match.findUnique({
        where: { id: matchId },
        include: { opponentA: true, opponentB: true },
    });

    if (!match) {
        return Response.json(
            { message: `Match ${slug} not found` },
            { status: 404 },
        );
    }

    if (!!match?.winner) {
        await resetOpponentsScore(match);
    }

    try {
        const tournamentStatus = await getTournamentStatus(match);

        await prisma.match.update({
            where: { id: matchId },
            include: { opponentA: true, opponentB: true },
            data: {
                opponentA: {
                    update: { score: { increment: body.scoreA } },
                },
                opponentB: {
                    update: { score: { increment: body.scoreB } },
                },
                ...body,
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
        return Response.json({
            status: 500,
            message: 'Error in match update',
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

const resetOpponentsScore = async ({ id, scoreA, scoreB }: Match) => {
    await prisma.match.update({
        where: { id },
        data: {
            opponentA: {
                update: { score: { increment: 0 - (scoreA ?? 0) } },
            },
            opponentB: {
                update: { score: { increment: 0 - (scoreB ?? 0) } },
            },
        },
    });
};


