'use client';

import { Card } from '@nextui-org/card';
import Link from 'next/link';
import { Dot } from 'lucide-react';
import { FC } from 'react';
import { formatString } from '@/helpers/formatString';
import { useSWRTournaments } from '@/services/useSWRTournaments';
import { TournamentResponse } from '@/prisma/prisma-types';
import { Participant, TournamentStatus } from '@prisma/client';
import { formatDate } from '@/helpers/formatDate';
import { getTournamentLeaders } from '@/helpers/leaders';
import { ScoreList } from '@/components/ScoreList';

type TournamentsList = { tournaments: Array<TournamentResponse> }

export const TournamentsList: FC<TournamentsList> = ({ tournaments }) => {
    const { data } = useSWRTournaments(tournaments);

    if (!data) {
        return null;
    }

    return (
        // <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
        <div className="md:columns-2 xl:columns-3 gap-8 space-y-8">
            {data.map((tournament) => <TournamentsItem key={tournament.id} {...tournament} />)}
        </div>
    );
};

const TournamentsItem: FC<TournamentResponse> = ({
    id,
    name,
    type,
    totalParticipants,
    status,
    createdAt,
    participants,
}) => {
    return (
        <Card
            as={Link} href={`/tournaments/${id}`}
            className="p-4 mx-[-16px] md:mx-0 rounded-none md:rounded-xl"
            shadow="lg"
        >
            <div className="flex flex-col gap-2">
                <h2 className="truncate w-full font-bold">{name}</h2>
                <p className="flex flex-wrap items-center text-stone-400">
                    {formatString(type)}
                    <Dot />
                    {totalParticipants} participants
                    <Dot />
                    {formatDate(createdAt)}
                </p>
                <TournamentsItemStatus status={status} participants={participants} />
            </div>
        </Card>
    );
};

const TournamentsItemStatus = ({ status, participants }: {
    status: TournamentStatus,
    participants: Array<Participant>
}) => {
    const leaders = getTournamentLeaders(participants);
    const isCompleted = status === TournamentStatus.COMPLETED;

    if (!isCompleted) {
        return <div className="flex items-center flex-wrap gap-1 text-stone-400">{formatString(status)}</div>;
    }

    return (
        <div className="flex flex-col flex-wrap gap-1">
            <div className="text-primary/90">{formatString(status)}</div>
            <ScoreList participants={leaders} withIcon />
        </div>
    );
};