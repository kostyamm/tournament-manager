import { prisma } from '@/prisma/prisma-client';
import { UpdateMatchBody } from '@/prisma/prisma-types';
import { getTournamentById, updateTournamentMatch } from '@/prisma/actions';
import { auth } from '@/configs/authOptions';

export async function POST(request: Request, { params }: { params: Promise<{ slug: string }> }) {
    const slug = (await params).slug;
    const matchId = Number(slug);
    const body = await request.json() as UpdateMatchBody;

    const session = await auth();
    const creatorId = session?.user.id;

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
            round: true,
            tournament: true,
        },
    });

    if (!match || match.tournament.creatorId !== creatorId) {
        return Response.json(
            {},
            { status: 404, statusText: `Match ${slug} not found` },
        );
    }

    try {
        await updateTournamentMatch({
            match,
            winnerId: body.participant?.id,
            isDraw: body.draw === true
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

