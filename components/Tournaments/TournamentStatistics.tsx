'use client';

import { formatString } from '@/helpers/formatString';
import { Participant, TournamentStatus } from '@prisma/client';
import { Fragment } from 'react';
import { useDisclosure } from '@nextui-org/react';
import { Button } from '@nextui-org/button';
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/modal';
import { TextTruncate } from '@/components/TextTruncate';
import { BookOpenText } from 'lucide-react';
import { TournamentResponse } from '@/prisma/prisma-types';
import { useParams } from 'next/navigation';
import useSWR from 'swr';

export const TournamentStatistics = () => {
    const { slug } = useParams<{ slug: string }>()
    const { data } = useSWR<TournamentResponse>(`/tournaments/${slug}`);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    if (!data) {
        return null
    }

    const { participants, status } = data;

    return (
        <Fragment>
            <Button onPress={onOpen} fullWidth variant="shadow" color="primary" className="text-md">
                <BookOpenText />
                Stats
            </Button>
            <Modal
                scrollBehavior="inside"
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="bottom-center"
                backdrop="blur"
                size="2xl"
            >
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

const TournamentStatisticsContent = ({ participants, status }: {
    participants: Array<Participant>;
    status: TournamentStatus;
}) => {
    return (
        <div className="flex flex-col gap-4">
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
                            <TextTruncate text={name} maxWidth={240} className="first-letter:uppercase" />
                            <p>{score}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};