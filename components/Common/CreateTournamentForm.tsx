'use client';

import { InferType, mixed, object, string } from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { TournamentType } from '@prisma/client';
import { ClientSideApi } from '@/services/ClientSideApi';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

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

    const form = useForm<CreateTournamentFormSchema>({
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
                                        <Input placeholder="Some name" {...field} />
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
                                                <SelectValue placeholder="Select tournament type" />
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
                            name="participants"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Participants (one per line)</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            rows={6}
                                            placeholder="John Doe Jane Smith ..."
                                            className="resize-none"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </CardContent>

                    <CardFooter className="pb-6 px-4 md:px-6">
                        <Button size="lg" type="submit" className="w-full md:w-fit">Create</Button>
                    </CardFooter>
                </Card>
            </form>
        </Form>
    );
};
