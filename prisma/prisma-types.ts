import { Match, Participant, Tournament, ScoringSystem, TournamentType } from '@prisma/client';

export type GenerateTournament = (props: {
    name: string;
    type: TournamentType;
    scoringSystem: ScoringSystem;
    participants: Array<string>;
}) => Promise<{ tournamentId: number } | undefined>

export type TournamentMatch = Match & {
    opponentA: Participant;
    opponentB: Participant;
}

export type TournamentResponse = Tournament & {
    participants: Array<Participant>;
    matches: Array<TournamentMatch>;
};

export type GetTournamentById = (tournamentId: number) => Promise<TournamentResponse | null>

