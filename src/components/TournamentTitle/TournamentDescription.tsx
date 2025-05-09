import { formatString } from '@/lib';
import { Dot} from 'lucide-react';
import { Tournament } from '@prisma/client';
import { FC } from 'react';

type TournamentDescriptionProps = Pick<Tournament, 'type' | 'status'>

export const TournamentDescription: FC<TournamentDescriptionProps> = ({ type, status }) => {
    return (
        <div className="flex items-center">
            {formatString(type)}
            <Dot />
            {formatString(status)}
        </div>
    );
};
