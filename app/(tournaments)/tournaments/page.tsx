import { Fragment } from 'react';
import { PageTitle } from '@/components/PageTitle';
import { Button } from '@/components/ui/button';
import { CirclePlus } from 'lucide-react';
import Link from 'next/link';
import { NoTournaments, TournamentsList } from '@/components/Tournaments';

import { headers } from 'next/headers';
import { fetcher } from '@/services/fetcher';
import { TournamentResponse } from '@/prisma/prisma-types';

export default async function Tournaments() {
    const tournaments = await fetcher<Array<TournamentResponse>>('/tournaments', { headers: headers() });

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
            <Button asChild>
                <Link href="/tournaments/create" className="flex items-center gap-2"><CirclePlus /> Create</Link>
            </Button>
        </PageTitle>
    );
};


