'use client';

import { Card, CardBody, CardHeader } from '@nextui-org/card';
import Link from 'next/link';
import { Dot } from 'lucide-react';
import { FC } from 'react';
import { formatString } from '@/helpers/formatString';
import { useSWRTournaments } from '@/services/useSWRTournaments';
import { TournamentResponse } from '@/prisma/prisma-types';

type TournamentsList = { tournaments: Array<TournamentResponse> }

export const TournamentsList: FC<TournamentsList> = ({ tournaments }) => {
    const { data } = useSWRTournaments(tournaments);

    if (!data) {
        return null;
    }

    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.map((tournament) => <TournamentsItem key={tournament.id} {...tournament} />)}
        </div>
    );
};

const TournamentsItem: FC<TournamentResponse> = ({ id, name, type, totalParticipants, status, createdAt }) => {
    return (
        <Card as={Link} href={`/tournaments/${id}`} className="p-3" shadow="lg">
            <CardHeader className="flex flex-col items-start gap-2">
                <h2 className="truncate w-full">{name}</h2>
                <p className="flex flex-wrap items-center text-stone-400">
                    {formatString(type)}
                    <Dot />
                    {totalParticipants} participants
                </p>
            </CardHeader>
            <CardBody className="flex flex-col gap-2">
                <div className="flex justify-between">
                    <div>Status:</div>
                    <div>{formatString(status)}</div>
                </div>
                <div className="flex justify-between">
                    <div>Created:</div>
                    <div>{new Date(createdAt).toDateString()}</div>
                </div>
            </CardBody>
        </Card>
    );
};