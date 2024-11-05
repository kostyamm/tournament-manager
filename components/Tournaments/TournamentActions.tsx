'use client';

import { TournamentResponse } from '@/prisma/prisma-types';
import { useSWRTournamentById } from '@/services/useSWRTournaments';
import { Button } from '@nextui-org/button';
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/dropdown';
import { Settings, Trash } from 'lucide-react';

export const TournamentActions = ({ tournament }: { tournament: TournamentResponse }) => {
    const { data } = useSWRTournamentById(tournament.id, tournament);

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
