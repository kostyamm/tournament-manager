import { ReactNode } from 'react';

export const PageTitle = ({ children, title }: { children?: ReactNode, title: string }) => {
    return (
        <div className="flex justify-between items-center pb-10">
            <h1>{title}</h1>
            {children}
        </div>
    );
};
