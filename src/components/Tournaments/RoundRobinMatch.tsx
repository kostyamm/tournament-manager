import { FC, Fragment, useState } from 'react';
import { Button } from '@/components/ui/button';
import { TournamentMatch, UpdateMatchBody } from '@/prisma/prisma-types';
import { Crown, Equal, Gem, Loader2, RefreshCcw, Zap } from 'lucide-react';
import { Participant } from '@prisma/client';
import { Card } from '@/components/ui/card';
import { cropText } from '@/lib';

type RoundRobinMatchProps = {
    match: TournamentMatch;
    handleWinner: (matchId: number, options: UpdateMatchBody) => Promise<void>;
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
    const [opponentA, opponentB] = match.matchParticipants;

    return (
        <div className="flex items-center flex-wrap text-lg gap-2">
            <div className="text-xl">{opponentA.participant.name}</div>
            <sub className="text-foreground/60 pb-[2px]">vs</sub>
            <div className="text-xl">{opponentB.participant.name}</div>
        </div>
    );
};

const OpponentWinner = ({ match }: { match: TournamentMatch }) => {
    const { winner, isDraw } = match;

    if (!winner && !isDraw) {
        return <div><sub className="text-foreground/60 pb-[2px]">Haven`t played yet</sub></div>;
    }

    return (
        <div className="flex items-center gap-1">
            <span className="text-primary pb-[3px]">
                {isDraw ? <Gem size={18} /> : <Crown size={18} />}
            </span>
            <div className="text-xl text-primary">
                {isDraw ? 'Draw' : `${winner?.name}`}
            </div>
            <sub className="text-foreground/60 pb-[2px]">wins</sub>
        </div>
    );
};

const RoundRobinMatchActions: FC<RoundRobinMatchProps> = ({ match, handleWinner }) => {
    const [loadingWinner, setLoadingWinner] = useState<number | null | 'draw'>(null);
    const [canChangeWinner, setCanChangeWinner] = useState(false);

    const [opponentA, opponentB] = match.matchParticipants;

    const processWinner = async (participant: Participant) => {
        setLoadingWinner(participant.id);

        await handleWinner(match.id, { participant });

        setLoadingWinner(null);
        setCanChangeWinner(false);
    };

    const processDraw = async () => {
        setLoadingWinner('draw');

        await handleWinner(match.id, { draw: true });

        setLoadingWinner(null);
        setCanChangeWinner(false);
    };

    const isLoading = (participant: Participant) => loadingWinner === participant.id;

    if ((match.isDraw || match.winner) && !canChangeWinner) {
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
                    disabled={!!opponentA.isWinner}
                    onClick={() => processWinner(opponentA.participant)}
                    variant="secondary"
                >
                    {isLoading(opponentA.participant)
                        ? <Loader2 className="animate-spin" />
                        : <Zap />
                    }
                    {cropText(opponentA.participant.name, 9)}
                </Button>
                <Button
                    disabled={!!opponentB.isWinner}
                    onClick={() => processWinner(opponentB.participant)}
                    variant="secondary"
                >
                    {isLoading(opponentB.participant)
                        ? <Loader2 className="animate-spin" />
                        : <Zap />
                    }
                    {cropText(opponentB.participant.name, 9)}
                </Button>
            </div>
            <Button
                disabled={!!match.isDraw}
                onClick={() => processDraw()}
                variant="outline"
            >
                {loadingWinner === 'draw'
                    ? <Loader2 className="animate-spin" />
                    : <Equal />
                }
                Draw
            </Button>
        </Fragment>
    );
};
