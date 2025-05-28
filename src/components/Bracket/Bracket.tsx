import { FC, useState } from 'react';
import { Participant } from '@prisma/client';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BracketMatchProps, BracketProps, BracketRoundMatch } from '@/components/Bracket/Bracket.types';
import { Crown, Loader2, Zap } from 'lucide-react';
import { cn } from '@/lib';

export const Bracket: FC<BracketProps> = ({ rounds, handleWinner }) => {
    const [hoveredId, setHoveredId] = useState<number | null>();

    return (
        <div className="flex gap-8 overflow-auto pb-4">
            {rounds.map((round, index) => (
                <div key={index}
                     className="flex flex-col min-w-[calc(100vw_-_96px)] sm:min-w-[calc(100vw_-_192px)] md:min-w-[320px]">
                    <h3 className="text-lg font-semibold mb-6 pb-2 border-b">{round.title}</h3>
                    <div className="flex justify-center items-center flex-grow">
                        <Card className="flex flex-col w-full">
                            {round.matches.map((match) =>
                                <BracketMatch
                                    key={match.id}
                                    match={match}
                                    handleWinner={handleWinner}
                                    hoveredId={hoveredId}
                                    setHoveredId={setHoveredId}
                                />,
                            )}
                        </Card>
                    </div>
                </div>
            ))}
        </div>
    );
};

const BracketMatch: FC<BracketMatchProps> = ({ match, handleWinner, hoveredId, setHoveredId }) => {
    const [loadingWinner, setLoadingWinner] = useState<number | null>(null);

    const isLoading = (participant: Participant | null) => loadingWinner === participant?.id;
    const isHovered = (participant: Participant | null) => participant && hoveredId === participant?.id;
    const isDisable = (match: BracketRoundMatch) => !!match.winner || loadingWinner !== null;

    const processWinner = async (match: BracketRoundMatch, participant: Participant | null) => {
        if (isDisable(match) || !participant) return;

        setLoadingWinner(participant.id);

        await handleWinner(match.id, { participant });

        setLoadingWinner(null);
    };

    return (
        <div className="not-last:border-b p-4">
            <div className="flex flex-col gap-4">
                {match.teams.map((participant, index) => (
                    <Button
                        key={index}
                        variant="secondary"
                        onMouseEnter={() => setHoveredId(participant?.id)}
                        onMouseLeave={() => setHoveredId(null)}
                        className={cn(
                            'justify-start',
                            isDisable(match) && 'opacity-75',
                            isHovered(participant) && 'opacity-100 outline outline-primary',
                        )}
                        onClick={() => processWinner(match, participant)}
                    >
                        <ButtonIcon
                            isLoading={isLoading(participant)}
                            participant={participant}
                            winner={match.winner}
                        />
                        {participant?.name || 'TBD'}
                    </Button>
                ))}
            </div>
        </div>
    );
};

const ButtonIcon = ({ isLoading, participant, winner }: {
    isLoading: boolean,
    participant: Participant | null,
    winner: Participant | null
}) => {
    const isWinner = !!participant && participant?.id === winner?.id;
    const hasWinner = !!winner;

    if (isLoading) {
        return <Loader2 className="animate-spin" />;
    }

    if (hasWinner) {
        return isWinner ? <Crown /> : null;
    }

    return <Zap />;
};