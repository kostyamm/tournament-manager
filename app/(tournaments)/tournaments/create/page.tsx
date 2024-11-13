import { CreateTournamentForm } from '@/components/CreateTournamentForm';
import { Fragment } from 'react';
import { PageTitle } from '@/components/PageTitle';

export default function CreateTournament() {
    return (
        <Fragment>
            <PageTitle title="New Tournament" />
            <CreateTournamentForm />
        </Fragment>
    );
};
