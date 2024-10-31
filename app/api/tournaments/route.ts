import { generateTournament, getTournaments } from '@/prisma/prisma-actions';
import { getServerSession } from 'next-auth';

export async function GET(request: Request) {
    const session = await getServerSession()
    // const token =  await getToken({ req })

    if (!session) {
        return Response.json(
            { message: "Unauthorized" },
            { status: 401 }
        );
    }

    try {
        const data = await getTournaments()

        return Response.json(data)
    } catch (e) {
        console.log(e)
        return new Response("fail")
    }
}

export async function POST(request: Request) {
    const session = await getServerSession()

    if (!session) {
        return Response.json(
            { message: "Unauthorized" },
            { status: 401 }
        );
    }

    try {
        const body = await request.json()

        const data = await generateTournament(body)

        return Response.json(data)
    } catch (e) {
        console.log(e)
        return new Response("fail")
    }
}