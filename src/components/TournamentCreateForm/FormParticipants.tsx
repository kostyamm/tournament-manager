import { useFieldArray, UseFormReturn } from 'react-hook-form';
import { TournamentCreateSchema } from '@/app/api/tournaments/route.schema';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus, X } from 'lucide-react';

export const FormParticipants = ({ form }: { form: UseFormReturn<TournamentCreateSchema> }) => {
    const participants = useFieldArray({
        name: 'participants',
        control: form.control,
    });

    const isDisabled = form.formState.isSubmitting;

    return (
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
    );
};