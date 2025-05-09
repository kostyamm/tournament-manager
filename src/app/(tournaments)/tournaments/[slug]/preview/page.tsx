import { PageTitle } from '@/components/PageTitle';
import { TournamentResponse } from '@/prisma/prisma-types';
import { headers } from 'next/headers';
import { fetcher } from '@/services/fetcher';
import { notFound } from 'next/navigation';
import { TournamentDescription } from '@/components/TournamentTitle/TournamentDescription';
import { Fragment } from 'react';
import { ScoreList } from '@/components/Common';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { SCORING_SYSTEM } from '@/constants/options';
import { formatDate } from '@/lib';

export default async function TournamentPreview(props: { params: Promise<{ slug: string }> }) {
    const { slug } = await props.params;

    const nextHeaders = await headers();
    const tournament = await fetcher<TournamentResponse>(`/tournaments/${slug}`, { headers: nextHeaders });

    if (!tournament) {
        return notFound();
    }

    const { name, type, status, participants, scoringSystem, createdAt } = tournament;
    const scoring = SCORING_SYSTEM.find(({ key }) => key === scoringSystem);

    return (
        <Fragment>
            <PageTitle title={name} description={<TournamentDescription type={type} status={status} />} />
            <Card className="container-half">
                <CardHeader className="border-b"><h2>Preview results</h2></CardHeader>
                <CardContent className="py-2">
                    <ScoreList participants={participants} />
                </CardContent>
                <CardFooter className="flex items-center justify-between border-t pt-4">
                    <section>
                        <h2 className="text-primary text-medium mb-2">Scoring system</h2>
                        <p>{scoring?.label}</p>
                    </section>
                    <section>
                        <h2 className="text-primary text-medium mb-2">Created At</h2>
                        <p className="float-end">{formatDate(createdAt)}</p>
                    </section>
                </CardFooter>
            </Card>
        </Fragment>
    );
};
