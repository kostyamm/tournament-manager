import { Participant } from '@prisma/client';

export const getTournamentLeaders = (participants: Array<Participant>) => {
    const maxScore = Math.max(...participants.map(({ score }) => score));
    return participants.filter(({ score }) => score === maxScore);
}