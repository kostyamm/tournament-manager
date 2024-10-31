import { Fragment } from 'react';
import { PageTitle } from '@/components/PageTitle';
import { Button } from '@nextui-org/button';
import { CirclePlus } from 'lucide-react';
import Link from 'next/link';
import { NoTournaments, TournamentsList } from '@/components/Tournaments';
import { fetcher } from '@/services/fetcher';

import { headers } from 'next/headers';  // add headers to pass the authorization data

export default async function Tournaments() {
    const tournaments = await fetcher('/tournaments', { headers: headers() });

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
            <Button as={Link} href="/tournaments/create">
                <CirclePlus />
                Create Tournament
            </Button>
        </PageTitle>
    );
};

