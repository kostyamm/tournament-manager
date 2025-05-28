import { prisma } from '@/prisma/prisma-client';
import { auth } from '@/configs/authOptions';
import { getTournamentById } from '@/prisma/actions';

export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
    const slug = (await params).slug
    const tournamentId = Number(slug)

    try {
        const data = await getTournamentById(tournamentId)

        return Response.json(data)
    } catch (e) {
        console.log(e)
        return new Response("fail")
    }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ slug: string }> }) {
    const slug = (await params).slug
    const tournamentId = Number(slug)

    const session = await auth();
    const creatorId = session?.user.id;

    try {
        const data = await prisma.tournament.delete({
            where: { id: tournamentId, creatorId },
        })

        return Response.json(data)
    } catch (e) {
        console.log(e)
        return new Response("fail")
    }
}

