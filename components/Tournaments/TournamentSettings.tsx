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
import { useDialog } from '@/contexts/DialogProvider';

export const TournamentSettings = () => {
    const router = useRouter();
    const { confirmDialog } = useDialog()
    const { slug } = useParams<{ slug: string }>();
    const { data } = useSWR<TournamentResponse>(`/tournaments/${slug}`);

    if (!data) {
        return null;
    }

    const handleDelete = async () => {
        const confirm = await confirmDialog({
            title: `Delete tournament ${data.name}`,
            description: 'Are you sure you want to delete this tournament?',
        })

        if (!confirm) {
            return
        }

        const deletedTournament = await ClientSideApi.deleteTournament(slug);

        if (!deletedTournament.id) {
            return;
        }

        router.replace('/tournaments');
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button size="iconLarge" variant="outline">
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
