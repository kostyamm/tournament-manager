import { Select, SelectItem, SelectProps } from '@nextui-org/select';
import { Controller, useFormContext } from 'react-hook-form';

export const FormSelect = ({ name, options, selectProps }: {
    name: string,
    options: Array<{ key: string | number, label: string }>
    selectProps: Partial<Omit<SelectProps, 'name' | 'onChange' | 'value' | 'isInvalid' | 'errorMessage' | 'onSelectionChange' | 'selectedKeys'>>
}) => {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState }) => (
                <Select
                    {...field}
                    {...selectProps}

                    isInvalid={fieldState.invalid}
                    errorMessage={fieldState.error?.message}
                    selectedKeys={field.value ? [field.value] : []}
                    onSelectionChange={(selected) => {
                        const selectedValue = Array.isArray(selected) ? selected[0] : selected;
                        field.onChange(selectedValue);
                    }}
                >
                    {options.map(({ key, label }) => (
                        <SelectItem key={key} value={key}>{label}</SelectItem>
                    ))}
                </Select>
            )}
        />
    );
};
