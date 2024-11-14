import { Fragment } from 'react';
import { PageTitle } from '@/components/PageTitle';
import { CreateTournamentForm } from '@/components/Common';

export default function CreateTournament() {
    return (
        <Fragment>
            <PageTitle title="New Tournament" />
            <CreateTournamentForm />
        </Fragment>
    );
};
