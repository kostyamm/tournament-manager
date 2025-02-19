import { FC, Fragment, useState } from 'react';
import { Button } from '@/components/ui/button';
import { TournamentMatch } from '@/prisma/prisma-types';
import { Crown, Equal, Gem, Loader2, RefreshCcw, Zap } from 'lucide-react';
import { Winner } from '@prisma/client';
import { Card } from '@/components/ui/card';
import { cropText } from '@/helpers/formatString';

type RoundRobinMatchProps = {
    match: TournamentMatch;
    handleWinner: (matchId: number, winner: Winner) => Promise<void>;
}
export const RoundRobinMatch: FC<RoundRobinMatchProps> = ({ match, handleWinner }) => {
    return (
        <Card className="flex flex-col gap-4 p-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
                <Opponents match={match} />
                <OpponentWinner match={match} />
            </div>
            <RoundRobinMatchActions match={match} handleWinner={handleWinner} />
        </Card>
    );
};

const Opponents = ({ match }: { match: TournamentMatch }) => {
    const { opponentA, opponentB } = match;

    return (
        <div className="flex items-center flex-wrap text-lg gap-2">
            <div className="text-xl">{opponentA.name}</div>
            <sub className="text-foreground/60 pb-[2px]">vs</sub>
            <div className="text-xl">{opponentB.name}</div>
        </div>
    );
};

const OpponentWinner = ({ match }: { match: TournamentMatch }) => {
    const { winner } = match;
    const isDraw = winner === Winner.Draw;

    if (!winner) {
        return <div><sub className="text-foreground/60 pb-[2px]">Haven`t played yet</sub></div>;
    }

    return (
        <div className="flex items-center gap-1">
            <span className="text-primary pb-[3px]">
                {isDraw ? <Gem size={18} /> : <Crown size={18} />}
            </span>
            <div className="text-xl text-primary">
                {isDraw ? 'Draw' : `${match[winner].name}`}
            </div>
            <sub className="text-foreground/60 pb-[2px]">wins</sub>
        </div>
    );
};

const RoundRobinMatchActions: FC<RoundRobinMatchProps> = ({ match, handleWinner }) => {
    const [loadingWinner, setLoadingWinner] = useState<Winner | null>();
    const [canChangeWinner, setCanChangeWinner] = useState(false);

    const processWinner = async (winner: Winner) => {
        setLoadingWinner(winner);

        await handleWinner(match.id, winner);

        setLoadingWinner(null);
        setCanChangeWinner(false);
    };

    const isLoading = (winner: Winner) => loadingWinner === winner;
    const isDisabled = (winner: Winner) => !!loadingWinner || match.winner === winner;

    if (match.winner && !canChangeWinner) {
        return (
            <Button
                onClick={() => setCanChangeWinner(true)}
                variant="outline"
                className="text-zinc-400"
            >
                <RefreshCcw />
                Change the winner
            </Button>
        );
    }

    return (
        <Fragment>
            <div className="flex flex-wrap justify-between gap-2">
                <Button
                    disabled={isDisabled(Winner.opponentA)}
                    onClick={() => processWinner(Winner.opponentA)}
                    variant="secondary"
                >
                    {isLoading(Winner.opponentA)
                        ? <Loader2 className="animate-spin" />
                        : <Zap />
                    }
                    {cropText(match.opponentA.name, 9)}
                </Button>
                <Button
                    disabled={isDisabled(Winner.opponentB)}
                    onClick={() => processWinner(Winner.opponentB)}
                    variant="secondary"
                >
                    {isLoading(Winner.opponentB)
                        ? <Loader2 className="animate-spin" />
                        : <Zap />
                    }
                    {cropText(match.opponentB.name, 9)}
                </Button>
            </div>
            <Button
                disabled={isDisabled(Winner.Draw)}
                onClick={() => processWinner(Winner.Draw)}
                variant="outline"
            >
                {isLoading(Winner.Draw)
                    ? <Loader2 className="animate-spin" />
                    : <Equal />
                }
                Draw
            </Button>
        </Fragment>
    );
};
