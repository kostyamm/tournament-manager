import { prisma } from '@/prisma/prisma-client';
import { generateRoundRobinMatches } from '@/prisma/prisma-actions';
import { auth } from '@/configs/authOptions';
import { Tournament, TournamentType } from '@prisma/client';
import { ValidationError } from 'yup';
import { TournamentCreateSchema, tournamentCreateSchema } from '@/app/api/tournaments/route.schema';

export async function GET() {
    try {
        const data = await prisma.tournament.findMany({
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
    const creatorId = session?.user.id;

    if (!creatorId) {
        return Response.json({
            status: 401,
            message: 'User id is missing',
        });
    }

    try {
        const body: TournamentCreateSchema = await request.json();

        if (body.type !== TournamentType.ROUND_ROBIN) {
            return Response.json({
                status: 400,
                message: 'Only Round Robin tournament type is supported',
            });
        }

        await tournamentCreateSchema.validate(body, { abortEarly: false });

        const tournament = await createTournament(body, creatorId)

        await createMatches(tournament)

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

const createTournament = async (body: TournamentCreateSchema, creatorId: number): Promise<Tournament> => {
    const { participants, name, type, scoringSystem } = body;

    return prisma.$transaction(async (prisma) => {
        const tournament = await prisma.tournament.create({
            data: { name, creatorId, type, scoringSystem, totalParticipants: participants.length },
        });

        const participantsData = participants.map(({ name }) => ({ name, tournamentId: tournament.id }));
        await prisma.participant.createMany({ data: participantsData });

        return tournament;
    });
}

const createMatches = async (tournament: Tournament) => {
    const matchesData = await generateRoundRobinMatches(tournament.id);
    await prisma.match.createMany({ data: matchesData });
}