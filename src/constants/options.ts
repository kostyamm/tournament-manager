import { ScoringSystem, TournamentType } from '@prisma/client';

export const TOURNAMENT_TYPES = [
    { key: TournamentType.SINGLE_ELIMINATION, label: 'Single Elimination' },
    { key: TournamentType.DOUBLE_ELIMINATION, label: 'Double Elimination' },
    { key: TournamentType.ROUND_ROBIN, label: 'Round Robin' },
    { key: TournamentType.SWISS, label: 'Swiss' },
    { key: TournamentType.FREE_FOR_ALL, label: 'Free-for-all' },
];

export const AVAILABLE_TOURNAMENT_TYPES = TOURNAMENT_TYPES.filter(({key}) => {
    const AVAILABLE_TYPES = [
        TournamentType.ROUND_ROBIN,
    ] as Array<TournamentType>

    return AVAILABLE_TYPES.includes(key)
})

export const SCORING_SYSTEM = [
    { key: ScoringSystem.CLASSIC, label: 'Classic system (3-1-0)' },
    { key: ScoringSystem.CHESS, label: 'Chess system (1-0.5-0)' },
    { key: ScoringSystem.TWO_POINT, label: 'Two-point system (2-1-0)' },
];