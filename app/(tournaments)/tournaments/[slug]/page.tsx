import { Fragment } from 'react';
import { PageTitle } from '@/components/PageTitle';
import { RoundRobin } from '@/components/Tournaments';
import { notFound } from 'next/navigation';
import { TournamentStatistics } from '@/components/Tournaments/TournamentStatistics';
import { fetcher } from '@/services/fetcher';
import { headers } from 'next/headers';
import { formatString } from '@/helpers/formatString';

export default async function Tournament(props: { params: Promise<{ slug: string }> }) {
    const params = await props.params;
    const tournamentId = Number(params.slug);
    const tournament = await fetcher(`/tournaments/${tournamentId}`, { headers: headers() });

    if (!tournament) {
        notFound();
    }

    return (
        <Fragment>
            <PageTitle title={tournament.name} >
                <div className="text-lg text-foreground">{formatString(tournament.type)}</div>
            </PageTitle>

            <div className="grid md:grid-cols-2 gap-8 md:gap-16">
                <RoundRobin tournament={tournament} />
                <TournamentStatistics tournament={tournament} className="order-[-1] md:order-1" />
            </div>
        </Fragment>
    );
};
