import { getTournamentById } from '@/prisma/prisma-actions';
import { prisma } from '@/prisma/prisma-client';
import { Match } from '@prisma/client';

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
            },
        });

        const result = await getTournamentById(match.tournamentId)

        return Response.json(result);
    } catch (e) {
        console.log(e);
        return new Response('fail');
    }
}

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


