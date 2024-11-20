import { ReactNode } from 'react';

export const PageTitle = ({ children, title, description }: {
    children?: ReactNode,
    title: string,
    description?: ReactNode | string
}) => {
    return (
        <div className="grid grid-cols-12 min-h-14 md:min-h-16 gap-2 block-indent">
            <div className="col-span-7 flex flex-col justify-center">
                <h1 className="truncate">{title}</h1>
                {!!description && <div className="text-foreground text-sm md:text-base">{description}</div>}
            </div>
            <div className="col-span-5 flex items-center justify-end">
                {children}
            </div>
        </div>
    );
};
