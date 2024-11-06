'use client';

import { Button } from '@nextui-org/button';
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/dropdown';
import { Settings, Trash } from 'lucide-react';
import { TournamentResponse } from '@/prisma/prisma-types';
import { useParams } from 'next/navigation';
import useSWR from 'swr';

export const TournamentActions = () => {
    const { slug } = useParams<{ slug: string }>()
    const { data } = useSWR<TournamentResponse>(`/tournaments/${slug}`);

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
                    description={`Tournament ${data.name}`}
                >
                    Delete
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
};
