import { TournamentResponse } from '@/prisma/prisma-types';
import { BracketData, BracketRound, BracketTeam } from '@/components/Bracket';

export const convertToBracketData = (tournament: TournamentResponse): BracketData => {
    const roundsMap = new Map<number, BracketRound['matches']>();

    for (const match of tournament.matches) {
        const roundNumber = match.round?.number ?? 1;
        const participants = match.matchParticipants.map((mp) => mp.participant);

        const teams: [BracketTeam, BracketTeam] = [
            participants[0] ?? null,
            participants[1] ?? null,
        ];

        if (!roundsMap.has(roundNumber)) {
            roundsMap.set(roundNumber, []);
        }

        roundsMap.get(roundNumber)!.push({
            id: match.id,
            winner: match.winner,
            teams,
        });
    }

    return Array.from(roundsMap.entries())
        .sort(([a], [b]) => a - b)
        .map(([roundNumber, matches]) => ({
            title: `Round ${roundNumber}`,
            matches,
        }));
}