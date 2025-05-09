import { notFound } from 'next/navigation';
import { TournamentTitle } from '@/components/TournamentTitle';
import { TournamentResults } from '@/components/Common';
import { RoundRobin } from '@/components/Tournaments';
import { fetcher } from '@/services/fetcher';
import { headers } from 'next/headers';
import { SWRProvider } from '@/contexts';
import { SWRConfiguration } from 'swr';
import { TournamentResponse } from '@/prisma/prisma-types';

export default async function Tournament(props: { params: Promise<{ slug: string }> }) {
    const { slug } = await props.params;
    const nextHeaders = await headers()
    const tournament = await fetcher<TournamentResponse>(`/tournaments/${slug}`, { headers: nextHeaders });

    const providerConfig: SWRConfiguration = {
        fallback: {
            [`/tournaments/${slug}`]: tournament,
        },
    };

    if (!tournament) {
        notFound();
    }

    return (
        <SWRProvider value={providerConfig}>
            <TournamentTitle />

            <TournamentResults />

            <RoundRobin />
        </SWRProvider>
    );
};
