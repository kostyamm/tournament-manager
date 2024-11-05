import { ReactNode } from 'react';

export const PageTitle = ({ children, title }: { children?: ReactNode, title: string }) => {
    return (
        <div className="flex flex-wrap justify-between items-start gap-2 pb-8 md:pb-10">
            <h1 className="truncate w-fit max-w-full">{title}</h1>
            {children}
        </div>
    );
};
