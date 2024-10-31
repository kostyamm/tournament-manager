import { getServerSession } from 'next-auth';
import { getTournamentById } from '@/prisma/prisma-actions';
import { prisma } from '@/prisma/prisma-client';

export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
    const slug = (await params).slug
    const session = await getServerSession()

    if (!session) {
        return Response.json(
            { message: "Unauthorized" },
            { status: 401 }
        );
    }

    try {
        const data = await getTournamentById(Number(slug))

        return Response.json(data)
    } catch (e) {
        console.log(e)
        return new Response("fail")
    }
}

export async function POST(request: Request, { params }: { params: Promise<{ slug: string }> }) {
    const slug = (await params).slug
    const body = await request.json()

    const session = await getServerSession()

    if (!session) {
        return Response.json(
            { message: "Unauthorized" },
            { status: 401 }
        );
    }

    try {
        const result = await prisma.tournament.update({
            where: { id: Number(slug) },
            data: body
        })

        return Response.json(result)
    } catch (e) {
        console.log(e)
        return new Response("fail")
    }
}

