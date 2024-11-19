import { prisma } from '@/prisma/prisma-client';
import { generateRoundRobinMatches } from '@/prisma/prisma-actions';
import { auth } from '@/configs/authOptions';
import { ScoringSystem, TournamentType } from '@prisma/client';

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

type CreateRequestBody = {
    name: string;
    type: TournamentType;
    scoringSystem: ScoringSystem;
    participants: Array<string>;
}

export async function POST(request: Request) {
    const session = await auth();
    const creatorId = session?.user.id;

    if (!creatorId) {
        return Response.json({
            status: 500,
            message: 'User id is missing',
        });
    }

    try {
        const body: CreateRequestBody = await request.json();

        if (body.type !== TournamentType.ROUND_ROBIN) {
            return Response.json({
                status: 400,
                message: 'Only Round Robin tournament type is supported',
            });
        }

        // TODO Use yup validation
        if (!body.name || body.participants.length === 0) {
            return Response.json({
                status: 400,
                message: 'Invalid request data',
            });
        }

        // TODO Rewrite to prisma.$transaction
        const { participants, name, type, scoringSystem } = body;
        const tournament = await prisma.tournament.create({
            data: { name, creatorId, type, scoringSystem, totalParticipants: participants.length },
        });

        const participantsData = participants.map((name) => ({ name, tournamentId: tournament.id }));
        await prisma.participant.createMany({ data: participantsData });


        const matchesData = await generateRoundRobinMatches(tournament.id);
        await prisma.match.createMany({ data: matchesData });

        return Response.json({ tournamentId: tournament.id });
    } catch (e) {
        console.log(e);
        return new Response('fail');
    }
}
