import { Fragment } from 'react';
import { PageTitle } from '@/components/PageTitle';
import { TournamentCreateForm } from '@/components/TournamentCreateForm';

export default function CreateTournament() {
    return (
        <Fragment>
            <PageTitle title="New Tournament" />
            <TournamentCreateForm />
        </Fragment>
    );
};
