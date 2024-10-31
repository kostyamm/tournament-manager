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


export type TournamentWithMatches = Tournament & {
    participants: Array<Participant>;
    matches: Array<Match & {
        opponentA: Participant;
        opponentB: Participant;
    }>;
};

export type GetTournamentById = (tournamentId: number) => Promise<TournamentWithMatches | null>

