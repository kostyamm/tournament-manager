import { notFound } from 'next/navigation';
import { TournamentTitle } from '@/components/TournamentTitle';
import { TournamentResults } from '@/components/Common';
import { RoundRobin } from '@/components/Tournaments';
import { fetcher } from '@/services/fetcher';
import { headers } from 'next/headers';
import { SWRProvider } from '../../../../contexts';
import { SWRConfiguration } from 'swr';
import { TournamentResponse } from '@/prisma/prisma-types';

export default async function Tournament(props: { params: Promise<{ slug: string }> }) {
    const params = await props.params;
    const tournamentId = Number(params.slug);
    const tournament = await fetcher<TournamentResponse>(`/tournaments/${tournamentId}`, { headers: headers() });

    const providerConfig: SWRConfiguration = {
        fallback: {
            [`/tournaments/${tournamentId}`]: tournament,
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
