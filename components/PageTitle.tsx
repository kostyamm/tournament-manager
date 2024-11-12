import { ReactNode } from 'react';

export const PageTitle = ({ children, title, description }: {
    children?: ReactNode,
    title: string,
    description?: string
}) => {
    return (
        <div className="flex flex-wrap justify-between items-start gap-2 pb-8 md:pb-10">
            <div>
                <h1>{title}</h1>
                {!!description && <p className="text-foreground mt-1">{description}</p>}
            </div>
            {children}
        </div>
    );
};
