'use client';

import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Settings, Trash } from 'lucide-react';
import { TournamentResponse } from '@/prisma/prisma-types';
import { useParams, useRouter } from 'next/navigation';
import useSWR from 'swr';
import { ClientSideApi } from '@/services/ClientSideApi';

export const TournamentActions = () => {
    const router = useRouter();
    const { slug } = useParams<{ slug: string }>();
    const { data } = useSWR<TournamentResponse>(`/tournaments/${slug}`);

    const handleDelete = async () => {
        const deletedTournament = await ClientSideApi.deleteTournament(slug);

        if (!deletedTournament.id) {
            return;
        }

        router.replace('/tournaments');
    };

    if (!data) {
        return null;
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button size="icon" variant="outline">
                    <Settings />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="bottom" align="end">
                <DropdownMenuItem onClick={handleDelete} className="text-destructive">
                    <Trash size={18} />
                    <span>Delete {data.name}</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
