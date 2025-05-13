import { Match, MatchParticipant, Participant, Tournament, Round } from '@prisma/client';
import { TournamentCreateSchema } from '@/app/api/tournaments/route.schema';

export type CreateTournament = (props: TournamentCreateSchema) => Promise<{ tournamentId: number } | undefined>;
export type DeleteTournament = (id: string | number) => Promise<TournamentResponse>

export type UpdateMatchBody = {
    participant?: Participant;
    draw?: boolean;
}

export type UpdateMatch = (id: string | number, data: UpdateMatchBody) => Promise<TournamentResponse>

export type TournamentMatch = Match & {
    matchParticipants: Array<MatchParticipant & { participant: Participant }>;
    winner: Participant | null;
    round: Round | null;
};

export type TournamentResponse = Tournament & {
    participants: Array<Participant>;
    matches: Array<TournamentMatch>;
};

export type GetTournamentById = (tournamentId: number) => Promise<TournamentResponse | null>;
