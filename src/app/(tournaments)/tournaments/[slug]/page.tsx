import { ComponentType } from 'react';
import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';
import { TournamentTitle } from '@/components/TournamentTitle';
import { TournamentResults } from '@/components/Common';
import { fetcher } from '@/services/fetcher';
import { headers } from 'next/headers';
import { SWRProvider } from '@/contexts';
import { SWRConfiguration } from 'swr';
import { TournamentResponse } from '@/prisma/prisma-types';
import { TournamentType } from '@prisma/client';

const TOURNAMENT_MAP: Partial<Record<TournamentType, ComponentType<object>>> = {
    [TournamentType.ROUND_ROBIN]: dynamic(() => import('@/components/Tournaments').then(mod => mod.RoundRobin)),
    [TournamentType.SINGLE_ELIMINATION]: dynamic(() => import('@/components/Tournaments').then(mod => mod.SingleElimination)),
}

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

    const TournamentComponent = TOURNAMENT_MAP[tournament.type]

    return (
        <SWRProvider value={providerConfig}>
            <TournamentTitle />

            <TournamentResults />

            {TournamentComponent && <TournamentComponent/>}
        </SWRProvider>
    );
};
