import { Fragment } from 'react';
import { PageTitle } from '@/components/PageTitle';
import { Button } from '@/components/ui/button';
import { CirclePlus } from 'lucide-react';
import Link from 'next/link';
import { TournamentsList } from '@/components/Tournaments';
import { NoTournaments } from '@/components/Common';

import { headers } from 'next/headers';
import { fetcher } from '@/services/fetcher';
import { TournamentResponse } from '@/prisma/prisma-types';

export default async function Tournaments() {
    const nextHeaders = await headers()
    const tournaments = await fetcher<Array<TournamentResponse>>('/tournaments', { headers: nextHeaders });

    return (
        <Fragment>
            <TournamentsTitle />
            {tournaments.length
                ? <TournamentsList tournaments={tournaments} />
                : <NoTournaments />
            }
        </Fragment>
    );
};

const TournamentsTitle = () => {
    return (
        <PageTitle title="Tournaments">
            <Button size="lg" asChild>
                <Link href="/tournaments/create"><CirclePlus /> Create</Link>
            </Button>
        </PageTitle>
    );
};


