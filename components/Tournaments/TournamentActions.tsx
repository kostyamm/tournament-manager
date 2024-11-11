'use client';

import { Button } from '@nextui-org/button';
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/dropdown';
import { Settings, Trash } from 'lucide-react';
import { TournamentResponse } from '@/prisma/prisma-types';
import { useParams, useRouter } from 'next/navigation';
import useSWR from 'swr';
import { ClientSideApi } from '@/services/ClientSideApi';

export const TournamentActions = () => {
    const router = useRouter();
    const { slug } = useParams<{ slug: string }>()
    const { data } = useSWR<TournamentResponse>(`/tournaments/${slug}`);

    const handleDelete = async () => {
        const deletedTournament = await ClientSideApi.deleteTournament(slug)

        if (!deletedTournament.id) {
            return
        }

        router.replace('/tournaments');
    }

    if (!data) {
        return null
    }

    return (
        <Dropdown>
            <DropdownTrigger>
                <Button isIconOnly variant="bordered">
                    <Settings />
                </Button>
            </DropdownTrigger>
            <DropdownMenu>
                <DropdownItem
                    key="delete"
                    className="text-danger"
                    color="danger"
                    startContent={<Trash size={18} />}
                    description={data.name}
                    onClick={handleDelete}
                >
                    Delete
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
};
