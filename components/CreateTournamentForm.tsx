'use client';

import { InferType, object, string } from 'yup';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@nextui-org/button';
import { Card, CardBody, CardFooter } from '@nextui-org/card';
import { FormInput, FormSelect, FormTextarea } from '@/components/FormFields';
import { Tournament } from '@/constants';

const formSchema = object({
    name: string().min(2, 'Username must be at least 2 characters.'),
    type: string().min(2, 'Username must be at least 2 characters.'),
    participants: string().min(2, 'Username must be at least 2 characters.'),
});

type FormSchema = InferType<typeof formSchema>

const TOURNAMENT_TYPES = [
    { key: Tournament.SingleElimination, label: 'Single Elimination' },
    { key: Tournament.DoubleElimination, label: 'Double Elimination' },
    { key: Tournament.RoundRobin, label: 'Round Robin' },
    { key: Tournament.Swiss, label: 'Swiss' },
    { key: Tournament.FreeForAll, label: 'Free-for-all' },
];

export const CreateTournamentForm = () => {
    const methods = useForm<FormSchema>({
        resolver: yupResolver(formSchema),
        defaultValues: {
            name: '',
            type: Tournament.RoundRobin,
            participants: '',
        },
    });

    const onSubmit = (values: FormSchema) => {
        console.log('vals', values);
    };

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} className="m-auto md:w-3/5">
                <h1 className="pb-10">New Tournament</h1>
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

                    <CardFooter>
                        <Button type="submit" color="primary" fullWidth>Create</Button>
                    </CardFooter>
                </Card>
            </form>
        </FormProvider>
    );
};
