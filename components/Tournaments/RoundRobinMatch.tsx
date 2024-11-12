import { FC, Fragment, useState } from 'react';
import { Button } from '@nextui-org/button';
import { TournamentMatch } from '@/prisma/prisma-types';
import { Crown, Equal, Gem, RefreshCcw } from 'lucide-react';
import { Winner } from '@prisma/client';

type RoundRobinMatchProps = {
    match: TournamentMatch;
    handleWinner: (matchId: number, winner: Winner) => Promise<void>;
}
export const RoundRobinMatch: FC<RoundRobinMatchProps> = ({ match, handleWinner }) => {
    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
                <Opponents match={match} />
                <OpponentWinner match={match} />
            </div>
            <RoundRobinMatchActions match={match} handleWinner={handleWinner} />
        </div>
    );
};

const Opponents = ({ match }: { match: TournamentMatch }) => {
    const { opponentA, opponentB } = match;

    return (
        <div className="flex items-center flex-wrap text-lg gap-2">
            <div className="text-xl">{opponentA.name}</div>
            <sub className="text-zinc-400 pb-[2px]">vs</sub>
            <div className="text-xl">{opponentB.name}</div>
        </div>
    );
};

const OpponentWinner = ({ match }: { match: TournamentMatch }) => {
    const { winner } = match;
    const isDraw = winner === Winner.Draw;

    if (!winner) {
        return <div><sub className="text-zinc-600 pb-[2px]">Haven`t played yet</sub></div>;
    }

    return (
        <div className="flex items-center gap-1">
            <span className="text-primary pb-[3px]">
                {isDraw ? <Gem size={18} /> : <Crown size={18} />}
            </span>
            <div className="text-xl text-primary">
                {isDraw ? 'Draw' : `${match[winner].name}`}
            </div>
            <sub className="text-zinc-600 pb-[2px]">wins</sub>
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
                variant="bordered"
                className="text-zinc-400"
            >
                <RefreshCcw size={18} />
                Change the winner
            </Button>
        );
    }

    return (
        <Fragment>
            <div className="flex justify-between gap-4">
                <Button
                    isLoading={isLoading(Winner.opponentA)}
                    isDisabled={isDisabled(Winner.opponentA)}
                    onClick={() => processWinner(Winner.opponentA)}
                    fullWidth
                    variant="faded"
                >
                    {match.opponentA.name} Wins
                </Button>
                <Button
                    isLoading={isLoading(Winner.opponentB)}
                    isDisabled={isDisabled(Winner.opponentB)}
                    onClick={() => processWinner(Winner.opponentB)}
                    fullWidth
                    variant="faded"
                >
                    {match.opponentB.name} Wins
                </Button>
            </div>
            <Button
                isLoading={isLoading(Winner.Draw)}
                isDisabled={isDisabled(Winner.Draw)}
                onClick={() => processWinner(Winner.Draw)}
                variant="bordered"
            >
                {!isLoading(Winner.Draw) && <Equal />}
                Draw
            </Button>
        </Fragment>
    );
};
