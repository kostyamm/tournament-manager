import { ReactNode } from 'react';
import { FormControl, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

export const FormItemWrapper = ({ label, children }: { label: string, children: ReactNode }) => {
    return (
        <FormItem>
            <FormLabel className="font-semibold text-md">{label}</FormLabel>
            <FormControl>
                {children}
            </FormControl>
            <FormMessage />
        </FormItem>
    );
};