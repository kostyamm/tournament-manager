import { Card, CardBody, CardHeader } from '@nextui-org/card';
import Link from 'next/link';
import { Dot } from 'lucide-react';
import { FC } from 'react';
import { formatString } from '@/helpers/formatString';

type TournamentsItem = {
    id: number;
    name: string;
    type: string;
    status: string;
    createdAt: Date;
    totalParticipants: number;
}
type TournamentsList = { tournaments: Array<TournamentsItem> }

export const TournamentsList: FC<TournamentsList>    = ({ tournaments }) => {
    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tournaments.map((tournament) => <TournamentsItem key={tournament.id} {...tournament} />)}
        </div>
    );
};

const TournamentsItem: FC<TournamentsItem> = ({ id, name, type, totalParticipants, status, createdAt }) => {
    return (
        <Card as={Link} href={`/tournaments/${id}`} className="p-3">
            <CardHeader className="flex flex-col items-start gap-2">
                <h2>{name}</h2>
                <p className="flex flex-wrap items-center text-gray-400">{formatString(type)} <Dot /> {totalParticipants} participants</p>
            </CardHeader>
            <CardBody className="flex flex-col gap-2">
                <div className="flex justify-between">
                    <div>Status:</div>
                    <div>{formatString(status)}</div>
                </div>
                <div className="flex justify-between">
                    <div>Created:</div>
                    <div>{new Date(createdAt).toLocaleDateString()}</div>
                </div>
            </CardBody>
        </Card>
    );
};