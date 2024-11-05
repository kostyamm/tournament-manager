import { prisma } from '@/prisma/prisma-client';

export async function GET() {
    try {
        const data = await prisma.tournament.findMany({
            orderBy: { createdAt: 'desc' },
        });

        return Response.json(data);
    } catch (e) {
        console.log(e);
        return new Response('fail');
    }
}
