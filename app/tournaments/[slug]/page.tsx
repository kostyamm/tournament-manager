import { Fragment } from 'react';
import { PageTitle } from '@/components/PageTitle';
import { TournamentRoundRobin } from '@/components/Tournaments';
import { generateRoundRobin } from '@/helpers/generateRoundRobin';

export default async function Tournament(props: { params: Promise<{ slug: string }> }) {
    const params = await props.params;
    const tournamentId = Number(params.slug);

    const participants = ['Alice', 'Bob', 'Charlie', 'David', 'Kostya'];
    const tournamentSchedule = generateRoundRobin(participants);
    console.log('Расписание турнира:');
    tournamentSchedule.forEach((round, index) => {
        console.log(`Раунд ${index + 1}: ${round.map(people => `${people[0]} vs ${people[1]}`).join(', ')}`);
    });

    return (
        <Fragment>
            <PageTitle title={`Tournament ${tournamentId}`} />
            <TournamentRoundRobin schedule={tournamentSchedule} />
        </Fragment>
    );
};
