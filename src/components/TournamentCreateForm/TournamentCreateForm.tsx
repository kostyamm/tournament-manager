'use client';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { ScoringSystem, TournamentType } from '@prisma/client';
import { ClientSideApi } from '@/services/ClientSideApi';
import { Form, FormField } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Loader2 } from 'lucide-react';
import { SCORING_SYSTEM, TOURNAMENT_TYPES } from '@/constants/options';
import { FormParticipants } from '@/components/TournamentCreateForm/FormParticipants';
import { FormSelect } from '@/components/TournamentCreateForm/FormSelect';
import { FormItemWrapper } from '@/components/TournamentCreateForm/FormItemWrapper';
import { TournamentCreateSchema, tournamentCreateSchema } from '@/app/api/tournaments/route.schema';

export const TournamentCreateForm = () => {
    const router = useRouter();

    const form = useForm<TournamentCreateSchema>({
        resolver: yupResolver(tournamentCreateSchema),
        defaultValues: {
            name: '',
            type: TournamentType.ROUND_ROBIN,
            scoringSystem: ScoringSystem.CLASSIC,
            participants: [{ name: '' }, { name: '' }],
        },
    });

    const isDisabled = form.formState.isSubmitting;

    const onSubmit = async (values: TournamentCreateSchema) => {
        const response = await ClientSideApi.createTournament(values);
        const tournamentId = response?.tournamentId;

        if (!tournamentId) {
            return;
        }

        form.reset();
        router.push(`/tournaments/${tournamentId}`);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="container-half">
                <Card className="pt-6">
                    <CardContent className="flex flex-col gap-4 px-4 md:px-6">
                        <FormField
                            name="name"
                            control={form.control}
                            render={({ field }) => (
                                <FormItemWrapper label="Tournament Name">
                                    <Input
                                        disabled={isDisabled}
                                        placeholder="Some name"
                                        {...field}
                                    />
                                </FormItemWrapper>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="type"
                            render={({ field }) => (
                                <FormSelect
                                    label="Tournament Type"
                                    placeholder="Select type"
                                    disabled
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    options={TOURNAMENT_TYPES}
                                />
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="scoringSystem"
                            render={({ field }) => (
                                <FormSelect
                                    label="Scoring system"
                                    placeholder="Select system"
                                    disabled={isDisabled}
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    options={SCORING_SYSTEM}
                                />
                            )}
                        />

                        <FormParticipants form={form} />
                    </CardContent>

                    <CardFooter className="py-4 px-4 md:px-6 border-t">
                        <Button
                            disabled={isDisabled}
                            size="lg"
                            type="submit"
                            className="w-full md:w-fit ml-auto"
                        >
                            {form.formState.isSubmitting && <Loader2 className="animate-spin" />}
                            Create
                        </Button>
                    </CardFooter>
                </Card>
            </form>
        </Form>
    );
};
