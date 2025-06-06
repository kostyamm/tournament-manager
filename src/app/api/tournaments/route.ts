import { prisma } from '@/prisma/prisma-client';
import { auth } from '@/configs/authOptions';
import { ValidationError } from 'yup';
import { TournamentCreateSchema, tournamentCreateSchema } from '@/app/api/tournaments/route.schema';
import { AVAILABLE_TOURNAMENT_TYPES } from '@/constants/options';
import { createTournament } from '@/prisma/actions';

export async function GET() {
    const session = await auth();
    const creatorId = session?.user.id;

    try {
        const data = await prisma.tournament.findMany({
            where: { creatorId },
            orderBy: { createdAt: 'desc' },
            include: { participants: true },
        });

        return Response.json(data);
    } catch (e) {
        console.log(e);
        return new Response('fail');
    }
}

export async function POST(request: Request) {
    const session = await auth();
    const creatorId = session!.user.id;

    if (!creatorId) {
        console.error('User id is missing');
        return Response.json({}, {
            status: 401,
            statusText: 'Unauthorized',
        });
    }

    try {
        const body: TournamentCreateSchema = await request.json();

        if (!AVAILABLE_TOURNAMENT_TYPES.includes(body.type)) {
            return Response.json({}, {
                status: 400,
                statusText: `Only ${AVAILABLE_TOURNAMENT_TYPES.join(', ')} tournament type is supported`
            });
        }

        await tournamentCreateSchema.validate(body, { abortEarly: false });

        const tournament = await createTournament(body, creatorId)

        return Response.json({ tournamentId: tournament.id });
    } catch (err) {
        console.log(err);
        if (err instanceof ValidationError) {
            return new Response(
                JSON.stringify({
                    status: 400,
                    message: 'Invalid request data',
                    errors: err.errors,
                }),
                { status: 400, headers: { 'Content-Type': 'application/json' } }
            );
        }

        return new Response('fail');
    }
}
