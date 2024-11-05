import { generateTournament } from '@/prisma/prisma-actions';

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const data = await generateTournament(body);

        return Response.json(data);
    } catch (e) {
        console.log(e);
        return new Response('fail');
    }
}