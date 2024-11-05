import { FC, Fragment, useState } from 'react';
import { Button } from '@nextui-org/button';
import { TournamentMatch } from '@/prisma/prisma-types';
import { Crown, Equal, Gem, RefreshCcw } from 'lucide-react';
import { Winner } from '@prisma/client';
import { TextTruncate } from '@/components/TextTruncate';

type RoundRobinMatchProps = {
    match: TournamentMatch;
    handleWinner: (matchId: number, winner: Winner) => Promise<void>;
}
export const RoundRobinMatch: FC<RoundRobinMatchProps> = ({ match, handleWinner }) => {
    return (
        <div className="flex flex-col gap-4 not-last:pb-8 not-last:border-b border-stone-800">
            <RoundRobinMatchInfo match={match} />
            <RoundRobinMatchActions match={match} handleWinner={handleWinner} />
        </div>
    );
};

const RoundRobinMatchInfo = ({ match }: { match: TournamentMatch }) => {
    const { winner } = match;
    const isDraw = winner === Winner.Draw;

    return (
        <div className="flex flex-col">
            <div className="flex items-center justify-between flex-wrap gap-2 text-lg">
                <div className="flex items-center flex-wrap text-lg gap-2">
                    <TextTruncate text={match.opponentA.name} maxWidth={240} className="first-letter:uppercase" />
                    <sub className="text-zinc-400 pb-[2px]">vs</sub>
                    <TextTruncate text={match.opponentB.name} maxWidth={240} className="first-letter:uppercase" />
                </div>
                {winner
                    ? (
                        <div className="flex items-center gap-1 ">
                            <span className="text-primary pb-[3px]">
                                {isDraw ? <Gem size={18} /> : <Crown size={18} />}
                            </span>
                            <TextTruncate
                                text={isDraw ? 'Draw' : `${match[winner].name}`}
                                maxWidth={240}
                                className="text-xl text-primary first-letter:uppercase"
                            />
                            <sub className="text-zinc-400 pb-[2px]">wins</sub>
                        </div>
                    )
                    : <sub className="text-zinc-600 pb-[2px]">Haven`t played yet</sub>}
            </div>
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
            <div className="flex justify-between gap-6">
                <Button
                    isLoading={isLoading(Winner.opponentA)}
                    isDisabled={isDisabled(Winner.opponentA)}
                    onClick={() => processWinner(Winner.opponentA)}
                    fullWidth
                    variant="faded"
                >
                    <span className="first-letter:uppercase">{match.opponentA.name} Wins</span>
                </Button>
                <Button
                    isLoading={isLoading(Winner.opponentB)}
                    isDisabled={isDisabled(Winner.opponentB)}
                    onClick={() => processWinner(Winner.opponentB)}
                    fullWidth
                    variant="faded"
                >
                    <span className="first-letter:uppercase">{match.opponentB.name} Wins</span>
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
