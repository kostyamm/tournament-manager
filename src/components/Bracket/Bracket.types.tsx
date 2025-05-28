import { Participant } from '@prisma/client';
import { UpdateMatchBody } from '@/prisma/prisma-types';
import { Dispatch, SetStateAction } from 'react';

export type BracketTeam = Participant | null;

export type BracketRoundMatch = {
    id: number;
    winner: Participant | null;
    teams: [BracketTeam, BracketTeam];
}

export type BracketRound = {
    title: string;
    matches: Array<BracketRoundMatch>;
}

export type BracketData = Array<BracketRound>;

export type BracketProps = {
    rounds: BracketData;
    handleWinner: (matchId: number, options: UpdateMatchBody) => Promise<void>;
}

export type BracketMatchProps = {
    match: BracketRoundMatch;
    hoveredId?: number | null;
    setHoveredId: Dispatch<SetStateAction<number | undefined | null>>;
    handleWinner: (matchId: number, options: UpdateMatchBody) => Promise<void>;
}
