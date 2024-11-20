import { Participant } from '@prisma/client';
import { Crown } from 'lucide-react';

export const ScoreList = ({ participants, withIcon }: { participants: Array<Participant>, withIcon?: boolean }) => {
    return (
        <div className="flex flex-col w-full">
            {participants.map(({ id, name, score }) => (
                <div
                    key={id}
                    className="flex justify-between items-center w-full not-last:border-b border-dotted border-stone-600 py-2"
                >
                    <div className="flex items-center w-full gap-2">
                        {withIcon && <Crown className="text-primary" />}
                        <div className="truncate w-[80%]">{name}</div>
                    </div>
                    <p>{score}</p>
                </div>
            ))}
        </div>
    );
};
