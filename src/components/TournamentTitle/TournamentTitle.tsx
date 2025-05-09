'use client';

import { TournamentResponse } from '@/prisma/prisma-types';
import { Eye } from 'lucide-react';
import { PageTitle } from '@/components/PageTitle';
import { useParams, useRouter } from 'next/navigation';
import useSWR from 'swr';
import { TournamentSettings } from '@/components/TournamentTitle';
import { Button } from '@/components/ui/button';
import { TournamentDescription } from '@/components/TournamentTitle/TournamentDescription';

export const TournamentTitle = () => {
    const router = useRouter();
    const { slug } = useParams<{ slug: string }>();
    const { data: tournament } = useSWR<TournamentResponse>(`/tournaments/${slug}`);

    if (!tournament) {
        return;
    }

    const { name, type, status } = tournament;

    return (
        <PageTitle
            title={name}
            description={<TournamentDescription type={type} status={status} />}
        >
            <div className="flex items-center gap-2 md:gap-4 ml-auto">
                <Button size="iconLarge" onClick={() => router.push(`/tournaments/${slug}/preview`)}>
                    <Eye />
                </Button>
                <TournamentSettings />
            </div>
        </PageTitle>
    );
};
