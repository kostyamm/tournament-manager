import { ScoringSystem } from '@prisma/client';

export const getMatchScore = ({ isDraw, isWinner, scoringSystem }: {
    isDraw: boolean;
    isWinner: boolean;
    scoringSystem: ScoringSystem;
}) => {
    const scoring = ScoreMap[scoringSystem];

    if (isDraw) return scoring.draw;
    return isWinner ? scoring.victory : scoring.defeat;
};

const ScoreMap: { [key in ScoringSystem]: { victory: number, defeat: number, draw: number } } = {
    [ScoringSystem.CLASSIC]: { victory: 3, defeat: 0, draw: 1 },
    [ScoringSystem.CHESS]: { victory: 1, defeat: 0, draw: 0.5 },
    [ScoringSystem.TWO_POINT]: { victory: 2, defeat: 0, draw: 1 },
};