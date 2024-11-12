'use client';

import { formatString } from '@/helpers/formatString';
import { Participant, TournamentStatus } from '@prisma/client';
import { Fragment } from 'react';
import { useDisclosure } from '@nextui-org/react';
import { Button } from '@nextui-org/button';
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/modal';
import { BookOpenText } from 'lucide-react';
import { TournamentResponse } from '@/prisma/prisma-types';
import { useParams } from 'next/navigation';
import useSWR from 'swr';
import { ScoreList } from '@/components/ScoreList';

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
            <Button onPress={onOpen} variant="shadow" color="primary" isIconOnly>
                <BookOpenText />
            </Button>
            <Modal
                scrollBehavior="inside"
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="center"
                backdrop="blur"
                className="m-0"
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
            <section>
                <h2 className="text-primary text-medium mb-2">Status</h2>
                <p>{formatString(status)}</p>
            </section>
            <section>
                <h2 className="text-primary text-medium mb-2">Participants score</h2>
                <ScoreList participants={participants} />
            </section>
        </div>
    );
};