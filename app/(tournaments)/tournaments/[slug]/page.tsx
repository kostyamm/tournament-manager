import { Fragment } from 'react';
import { PageTitle } from '@/components/PageTitle';
import { TournamentRoundRobin } from '@/components/Tournaments';
import { notFound } from 'next/navigation';
import { TournamentStatistics } from '@/components/Tournaments/TournamentStatistics';
import { fetcher } from '@/services/fetcher';
import { headers } from 'next/headers';

export default async function Tournament(props: { params: Promise<{ slug: string }> }) {
    const params = await props.params;
    const tournamentId = Number(params.slug);
    const tournament = await fetcher(`/tournaments/${tournamentId}`, { headers: headers() });

    if (!tournament) {
        notFound();
    }

    return (
        <Fragment>
            <PageTitle title={`Tournament ${tournament.name}`} />

            <div className="relative  h-full grid md:grid-cols-2 gap-10">
                <TournamentRoundRobin tournament={tournament} />
                <TournamentStatistics tournament={tournament} />
            </div>
        </Fragment>
    );
};
