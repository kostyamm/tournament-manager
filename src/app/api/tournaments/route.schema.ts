import { array, InferType, mixed, object, string } from 'yup';
import { ScoringSystem, TournamentType } from '@prisma/client';

export const tournamentCreateSchema = object({
    name: string().required().min(2).max(20).label('Name'),
    type: mixed<TournamentType>().oneOf(Object.values(TournamentType)).required().label('Type'),
    scoringSystem: mixed<ScoringSystem>().oneOf(Object.values(ScoringSystem)).required().label('Scoring system'),
    participants: array()
        .min(2, 'At least two participants are required')
        .required()
        .of(object().shape({
            name: string().min(2).max(15).required().label('Participant'),
        }))
        .label('Participants'),
});

export type TournamentCreateSchema = InferType<typeof tournamentCreateSchema>
