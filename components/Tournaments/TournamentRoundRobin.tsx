import { Button } from '@nextui-org/button';
import { TournamentWithMatches } from '@/prisma/prisma-types';
import { Equal } from 'lucide-react';

export const TournamentRoundRobin = ({ tournament }: { tournament: TournamentWithMatches }) => {
    return (
        <div className="flex flex-col gap-10">
            {tournament.matches.map((match, index) => (
                <div key={index} className="flex flex-col gap-6">
                    <div className="flex flex-col gap-2 pb-4 border-b border-white/30">
                        <h2 className="text-primary">Match {index + 1}</h2>

                        <div className="flex flex-wrap gap-2">
                            <div className="first-letter:uppercase">{match.opponentA.name}</div>
                            <div className="text-white/40">vs</div>
                            <div className="first-letter:uppercase">{match.opponentB.name}</div>
                        </div>
                    </div>
                    <div className="flex justify-between gap-6">
                        <Button fullWidth variant="faded">
                            <span className="first-letter:uppercase">{match.opponentA.name} Wins</span>
                        </Button>
                        <Button fullWidth variant="faded">
                            <span className="first-letter:uppercase">{match.opponentB.name} Wins</span>
                        </Button>
                    </div>
                    <Button variant="bordered">
                        <Equal />
                        Draw
                    </Button>
                </div>
            ))}
        </div>
    );
};
