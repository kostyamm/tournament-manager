import { ReactNode } from 'react';

export const PageTitle = ({ children, title, description }: {
    children?: ReactNode,
    title: string,
    description?: string
}) => {
    return (
        <div className="flex flex-wrap justify-between items-start gap-2 pb-8 md:pb-10">
            <div className="max-w-full">
                <h1 className="truncate w-fit max-w-full mb-1">{title}</h1>
                {!!description && <p className="text-foreground">{description}</p>}
            </div>
            {children}
        </div>
    );
};
