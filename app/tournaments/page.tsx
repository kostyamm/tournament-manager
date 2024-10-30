import { Fragment } from 'react';
import { PageTitle } from '@/components/PageTitle';
import { Button } from '@nextui-org/button';
import { CirclePlus } from 'lucide-react';
import Link from 'next/link';
import { TournamentsList, NoTournaments } from '@/components/Tournaments';

export default function Tournaments() {
    const tournaments = [
        {
            id: 1,
            name: 'First Tournament',
            type: 'round-robin',
            status: 'in-progress',
            created_at: '29/10/2024',
            total_participants: 5,
            participants: ['Alice', 'Bob', 'Charlie', 'David', 'Kostya'],
        },
        {
            id: 2,
            name: 'Second Tournament',
            type: 'single-elimination',
            status: 'completed',
            created_at: '29/10/2024',
            total_participants: 5,
            participants: ['Alice', 'Bob', 'Charlie', 'David', 'Kostya'],
        },
    ];

    return (
        <Fragment>
            <TournamentsTitle />
            {tournaments.length
                ? <TournamentsList tournaments={tournaments}/>
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


