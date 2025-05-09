import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FormControl } from '@/components/ui/form';
import { FormItemWrapper } from '@/components/TournamentCreateForm/FormItemWrapper';

export const FormSelect = ({ label, defaultValue, onValueChange, options, disabled, placeholder }: {
    label: string;
    placeholder: string;
    defaultValue: string;
    onValueChange: (value: string) => void;
    options: Array<{ key: string, label: string }>;
    disabled?: boolean;
}) => {
    return (
        <FormItemWrapper label={label}>
            <Select disabled={disabled} onValueChange={onValueChange} defaultValue={defaultValue}>
                <FormControl>
                    <SelectTrigger>
                        <SelectValue placeholder={placeholder} />
                    </SelectTrigger>
                </FormControl>
                <SelectContent>
                    {options.map(({ key, label }) => (
                        <SelectItem key={key} value={key}>{label}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </FormItemWrapper>
    );
};
