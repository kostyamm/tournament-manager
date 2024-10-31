'use client';

import { TournamentWithMatches } from '@/prisma/prisma-types';
import { formatString } from '@/helpers/formatString';
import { useSWRTournament } from '@/services/useSWRTournament';

export const TournamentStatistics = ({ tournament }: { tournament: TournamentWithMatches }) => {
    const { data } = useSWRTournament(tournament.id, tournament);
    const { participants, status, type, createdAt } = data;

    return (
        <div className="sticky h-fit top-[104px] flex flex-col gap-2">
            <h2 className="text-primary">Statistics</h2>
            <div>Type: {formatString(type)}</div>
            <div>Status: {formatString(status)}</div>
            <div>Created: {new Date(createdAt).toDateString()}</div>
            <div>
                {participants.map(({ id, name, score }) => (
                    <div key={id}>{name}: {score}</div>
                ))}
            </div>
        </div>
    );
};