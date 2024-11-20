'use client';

import { useFieldArray, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { ScoringSystem, TournamentType } from '@prisma/client';
import { ClientSideApi } from '@/services/ClientSideApi';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, Plus, X } from 'lucide-react';
import { SCORING_SYSTEM, TOURNAMENT_TYPES } from '@/constants/options';
import { tournamentCreateFormSchema, TournamentCreateFormSchema } from '@/components/TournamentCreateForm';


// TODO decomposition
export const TournamentCreateForm = () => {
    const router = useRouter();

    const form = useForm<TournamentCreateFormSchema>({
        resolver: yupResolver(tournamentCreateFormSchema),
        defaultValues: {
            name: '',
            type: TournamentType.ROUND_ROBIN,
            scoringSystem: ScoringSystem.CLASSIC,
            participants: [{ name: '' }, { name: '' }],
        },
    });

    const participants = useFieldArray({
        name: 'participants',
        control: form.control,
    });

    const isDisabled = form.formState.isSubmitting;

    const onSubmit = async (values: TournamentCreateFormSchema) => {
        const participants = values.participants.map((participant) => participant.name);

        const response = await ClientSideApi.createTournament({
            ...values,
            participants,
        });
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
                                <FormItem>
                                    <FormLabel>Tournament Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={isDisabled}
                                            placeholder="Some name"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="type"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Tournament Type</FormLabel>
                                    <Select disabled onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select type" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {TOURNAMENT_TYPES.map(({ key, label }) => (
                                                <SelectItem key={key} value={key}>{label}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="scoringSystem"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Scoring system</FormLabel>
                                    <Select
                                        disabled={isDisabled}
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select system" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {SCORING_SYSTEM.map(({ key, label }) => (
                                                <SelectItem key={key} value={key}>{label}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="participants"
                            render={() => (
                                <FormItem className="space-y-3">
                                    <FormLabel className="font-semibold text-md">Participants</FormLabel>
                                    {participants.fields.map((item, index) => (
                                        <div key={item.id} className="flex gap-2">
                                            <FormField
                                                control={form.control}
                                                name={`participants.${index}.name`}
                                                render={({ field }) => (
                                                    <FormItem className="flex-grow">
                                                        <FormControl>
                                                            <Input
                                                                disabled={isDisabled}
                                                                placeholder={`Participant ${index + 1}`}
                                                                {...field}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <Button
                                                type="button"
                                                variant="outline"
                                                size="icon"
                                                onClick={() => participants.remove(index)}
                                                disabled={isDisabled || participants.fields.length <= 2}
                                            >
                                                <X className="text-destructive" />
                                            </Button>
                                        </div>
                                    ))}

                                    <div className="flex items-center gap-4">
                                        <Button
                                            type="button"
                                            variant="secondary"
                                            onClick={() => participants.append({ name: '' })}
                                            disabled={isDisabled}
                                            size="sm"
                                        >
                                            <Plus />
                                            Add Participant
                                        </Button>

                                        <div className="text-sm text-destructive leading-4">
                                            {form.formState.errors.participants?.root?.message}
                                        </div>
                                    </div>
                                </FormItem>
                            )}
                        />
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
