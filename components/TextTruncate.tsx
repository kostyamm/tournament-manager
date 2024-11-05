import { cn } from '@/lib/utils';

export const TextTruncate = ({ text, maxWidth, className }: { text: string, maxWidth: number, className?: string }) => {
    return (
        <div className={cn(
            className,
            `max-w-[${maxWidth}px]`,
            'truncate w-fit',
        )}>{text}</div>
    );
};
