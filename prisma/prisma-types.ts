import { Match, Participant, Tournament, TournamentType } from '@prisma/client';

export type GenerateTournamentProps = {
    creatorId: number;
    name: string;
    type: TournamentType;
    participants: Array<string>;
}

export type GenerateTournament = (props: GenerateTournamentProps) => Promise<{
    tournamentId: number
} | undefined>

export type TournamentMatch = Match & {
    opponentA: Participant;
    opponentB: Participant;
}

export type TournamentResponse = Tournament & {
    participants: Array<Participant>;
    matches: Array<TournamentMatch>;
};

export type GetTournamentById = (tournamentId: number) => Promise<TournamentResponse | null>

