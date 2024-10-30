import { Input, InputProps } from '@nextui-org/input';
import { Controller, useFormContext } from 'react-hook-form';

export const FormInput = ({ name, inputProps }: {
    name: string,
    inputProps: Partial<Omit<InputProps, 'name' | 'onChange' | 'value' | 'isInvalid' | 'errorMessage'>>
}) => {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState }) => (
                <Input
                    {...field}
                    {...inputProps}

                    isInvalid={fieldState.invalid}
                    errorMessage={fieldState.error?.message}
                />
            )}
        />
    );
};
