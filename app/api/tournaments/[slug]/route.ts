import { getTournamentById } from '@/prisma/prisma-actions';

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
