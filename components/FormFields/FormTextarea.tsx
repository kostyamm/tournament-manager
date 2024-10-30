import { Textarea, TextAreaProps } from '@nextui-org/input';
import { Controller, useFormContext } from 'react-hook-form';

export const FormTextarea = ({ name, textareaProps }: {
    name: string,
    textareaProps: Partial<Omit<TextAreaProps, 'name' | 'onChange' | 'value' | 'isInvalid' | 'errorMessage'>>
}) => {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState }) => (
                <Textarea
                    {...field}
                    {...textareaProps}

                    isInvalid={fieldState.invalid}
                    errorMessage={fieldState.error?.message}
                />
            )}
        />
    );
};