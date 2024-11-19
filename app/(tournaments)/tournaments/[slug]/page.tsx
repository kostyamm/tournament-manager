import { PageTitle } from '@/components/PageTitle';
import { RoundRobin } from '@/components/Tournaments';
import { notFound } from 'next/navigation';
import { TournamentStatistics, TournamentSettings } from '@/components/Tournaments';
import { CompletedTournament } from '@/components/Common';
import { fetcher } from '@/services/fetcher';
import { headers } from 'next/headers';
import { formatString } from '@/helpers/formatString';
import { SWRProvider } from '@/contexts';
import { SWRConfiguration } from 'swr';
import { TournamentResponse } from '@/prisma/prisma-types';
import { Dot } from 'lucide-react';

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
            <TournamentTitle tournament={tournament} />

            <CompletedTournament />

            <RoundRobin />
        </SWRProvider>
    );
};

const TournamentTitle = ({ tournament }: { tournament: TournamentResponse }) => {
    const Description = () => (
        <div className="flex items-center">
            {formatString(tournament.type)}
            <Dot />
            {formatString(tournament.scoringSystem)}
        </div>
    );
    return (
        <PageTitle title={tournament.name} description={<Description />}>
            <div className="flex items-center gap-2 md:gap-4 ml-auto">
                <TournamentStatistics />
                <TournamentSettings />
            </div>
        </PageTitle>
    );
};
