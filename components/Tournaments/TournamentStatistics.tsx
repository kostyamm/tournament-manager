'use client';

import { TournamentResponse } from '@/prisma/prisma-types';
import { formatString } from '@/helpers/formatString';
import { useSWRTournament } from '@/services/useSWRTournament';
import { cn } from '@/lib/utils';
import { Participant, TournamentStatus } from '@prisma/client';
import { Fragment } from 'react';
import { useDisclosure } from '@nextui-org/react';
import { Button } from '@nextui-org/button';
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/modal';
import { TextTruncate } from '@/components/TextTruncate';

export const TournamentStatistics = ({ tournament, className }: {
    tournament: TournamentResponse,
    className?: string
}) => {
    const { data } = useSWRTournament(tournament.id, tournament);
    const { participants, status } = data;

    return (
        <Fragment>
            <div className={cn(
                'md:sticky top-[104px] h-fit',
                className,
            )}>
                <TournamentStatisticsModal participants={participants} status={status} className="flex md:hidden" />
                <TournamentStatisticsContent participants={participants} status={status} className="hidden md:flex" />
            </div>
        </Fragment>
    );
};

const TournamentStatisticsModal = ({ participants, status, className }: {
    participants: Array<Participant>;
    status: TournamentStatus;
    className?: string;
}) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <Fragment>
            <Button onPress={onOpen} variant="shadow" color="primary" fullWidth className={cn('text-md', className)}>
                Statistics
            </Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="bottom-center" backdrop="blur" size="2xl">
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Tournament statistics</ModalHeader>
                            <ModalBody>
                                <TournamentStatisticsContent participants={participants} status={status} />
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </Fragment>
    );
};

const TournamentStatisticsContent = ({ participants, status, className }: {
    participants: Array<Participant>;
    status: TournamentStatus;
    className?: string;
}) => {
    return (
        <div className={cn('flex flex-col gap-4', className)}>
            <section className="">
                <h2 className="text-foreground text-medium mb-2">Status</h2>
                <p className="text-foreground text-primary">
                    {formatString(status)}
                </p>
            </section>
            <section>
                <h2 className="text-foreground text-medium mb-2">Participants score</h2>
                <div className="flex flex-col gap-2">
                    {participants.map(({ id, name, score }) => (
                        <div
                            key={id}
                            className="flex justify-between not-last:border-b border-dotted border-stone-600 pb-2"
                        >
                            <TextTruncate text={name} maxWidth={240} className="first-letter:uppercase"/>
                            <p>{score}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};