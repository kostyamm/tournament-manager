import { Match, Participant, Tournament } from '@prisma/client';
import { TournamentCreateSchema } from '@/app/api/tournaments/route.schema';

export type CreateTournament = (props: TournamentCreateSchema) => Promise<{ tournamentId: number } | undefined>

export type TournamentMatch = Match & {
    opponentA: Participant;
    opponentB: Participant;
}

export type TournamentResponse = Tournament & {
    participants: Array<Participant>;
    matches: Array<TournamentMatch>;
};

export type GetTournamentById = (tournamentId: number) => Promise<TournamentResponse | null>

