'use client';

import { InferType, mixed, object, string } from 'yup';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@nextui-org/button';
import { Card, CardBody, CardFooter } from '@nextui-org/card';
import { FormInput, FormSelect, FormTextarea } from '@/components/FormFields';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { TournamentType } from '@prisma/client';
import { ClientSideApi } from '@/services/ClientSideApi';
import { PageTitle } from '@/components/PageTitle';

const formSchema = object({
    name: string().required().min(2).max(20).label('Name'),
    type: mixed<TournamentType>().oneOf(Object.values(TournamentType)).required().label('Type'),
    participants: string()
        .required()
        .test(
            'is-enough',
            'Participants must have at least 2 lines',
            function (values: string): boolean {
                const participants = values.split('\n').filter((v) => !!v);

                return participants.length >= 2;
            },
        )
        .test(
            'is-enough',
            'Each participant`s name must not be less than 2 and more than 15 characters long',
            function (values: string): boolean {
                const participants = values?.split('\n').filter((v) => !!v);

                const notLess = participants.every((v) => v.length >= 2);
                const notMore = participants.every((v) => v.length <= 15);

                return notLess && notMore;
            },
        )
        .label('Participants'),
});

export type CreateTournamentFormSchema = InferType<typeof formSchema>

const TOURNAMENT_TYPES = [
    { key: TournamentType.SINGLE_ELIMINATION, label: 'Single Elimination' },
    { key: TournamentType.DOUBLE_ELIMINATION, label: 'Double Elimination' },
    { key: TournamentType.ROUND_ROBIN, label: 'Round Robin' },
    { key: TournamentType.SWISS, label: 'Swiss' },
    { key: TournamentType.FREE_FOR_ALL, label: 'Free-for-all' },
];

export const CreateTournamentForm = () => {
    const router = useRouter();
    const { data } = useSession();

    const methods = useForm<CreateTournamentFormSchema>({
        resolver: yupResolver(formSchema),
        defaultValues: {
            name: '',
            type: TournamentType.ROUND_ROBIN,
            participants: '',
        },
    });

    const onSubmit = async (values: CreateTournamentFormSchema) => {
        const creatorId = data?.user.id;

        if (!creatorId) {
            return;
        }

        const participants = values.participants.split('\n');

        const response = await ClientSideApi.createTournament({ ...values, creatorId, participants });
        const tournamentId = response?.tournamentId;

        if (!tournamentId) {
            return;
        }

        methods.reset();
        router.push(`/tournaments/${tournamentId}`);
    };

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} className="m-auto md:w-3/5">
                <PageTitle title="New Tournament" />
                <Card className="p-3 gap-4">
                    <CardBody className="flex flex-col gap-4">
                        <FormInput
                            name="name"
                            inputProps={{
                                label: 'Tournament Name',
                                labelPlacement: 'outside',
                                placeholder: 'Some name',
                                variant: 'bordered',
                            }}
                        />

                        <FormSelect
                            name="type"
                            options={TOURNAMENT_TYPES}
                            selectProps={{
                                isDisabled: true,
                                label: 'Tournament Type',
                                labelPlacement: 'outside',
                                placeholder: 'Select tournament type',
                                variant: 'bordered',
                                selectionMode: 'single',
                            }}
                        />

                        <FormTextarea
                            name="participants"
                            textareaProps={{
                                label: 'Participants (one per line)',
                                labelPlacement: 'outside',
                                placeholder: 'John Doe Jane Smith ...',
                                variant: 'bordered',
                            }}
                        />
                    </CardBody>

                    <CardFooter className="pb-6">
                        <Button type="submit" variant="shadow" color="primary" fullWidth>Create</Button>
                    </CardFooter>
                </Card>
            </form>
        </FormProvider>
    );
};
