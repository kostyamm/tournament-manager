import { Fragment } from 'react';
import { PageTitle } from '@/components/PageTitle';
import { RoundRobin } from '@/components/Tournaments';
import { notFound } from 'next/navigation';
import { TournamentStatistics } from '@/components/Tournaments/TournamentStatistics';
import { fetcher } from '@/services/fetcher';
import { headers } from 'next/headers';
import { formatString } from '@/helpers/formatString';
import { TournamentActions } from '@/components/Tournaments/TournamentActions';

export default async function Tournament(props: { params: Promise<{ slug: string }> }) {
    const params = await props.params;
    const tournamentId = Number(params.slug);
    const tournament = await fetcher(`/tournaments/${tournamentId}`, { headers: headers() });

    if (!tournament) {
        notFound();
    }

    return (
        <Fragment>
            <PageTitle title={tournament.name} description={formatString(tournament.type)}>
                <div className="flex items-center gap-4 ml-auto">
                    <TournamentStatistics tournament={tournament} />
                    <TournamentActions tournament={tournament} />
                </div>
            </PageTitle>

            <div className="m-auto md:w-3/5">
                <RoundRobin tournament={tournament} />
            </div>
        </Fragment>
    );
};
