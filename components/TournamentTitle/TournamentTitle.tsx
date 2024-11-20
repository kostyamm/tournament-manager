'use client'

import { TournamentResponse } from '@/prisma/prisma-types';
import { formatString } from '@/helpers/formatString';
import { Dot } from 'lucide-react';
import { PageTitle } from '@/components/PageTitle';
import { useParams } from 'next/navigation';
import useSWR from 'swr';
import { TournamentSettings, TournamentStatistics } from '@/components/TournamentTitle';

export const TournamentTitle = () => {
    const { slug } = useParams<{ slug: string }>()
    const { data: tournament } = useSWR<TournamentResponse>(`/tournaments/${slug}`);

    if (!tournament) {
        return
    }

    const Description = () => (
        <div className="flex items-center">
            {formatString(tournament.type)}
            <Dot />
            {formatString(tournament.status)}
        </div>
    );

    return (
        <PageTitle title={tournament.name} description={<Description />}>
            <div className="flex items-center gap-2 md:gap-4 ml-auto">
                <TournamentStatistics />
                <TournamentSettings />
            </div>
        </PageTitle>
    );
};
