import { PageTitle } from '@/components/PageTitle';
import { CompletedTournament, RoundRobin } from '@/components/Tournaments';
import { notFound } from 'next/navigation';
import { TournamentStatistics } from '@/components/Tournaments/TournamentStatistics';
import { fetcher } from '@/services/fetcher';
import { headers } from 'next/headers';
import { formatString } from '@/helpers/formatString';
import { TournamentActions } from '@/components/Tournaments/TournamentActions';
import { SWRProvider } from '@/contexts';
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
            <PageTitle title={tournament.name} description={formatString(tournament.type)}>
                <div className="flex items-center gap-2 md:gap-4 ml-auto">
                    <TournamentStatistics />
                    <TournamentActions />
                </div>
            </PageTitle>

            <CompletedTournament />

            <RoundRobin />
        </SWRProvider>
    );
};
